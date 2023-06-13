import log, {LogLevelDesc} from 'loglevel'
import {
  AbstractFilterHealthElement,
  AbstractFilterMaintenanceTask,
  AbstractFilterPatient,
  AbstractFilterService,
  AbstractFilterUser,
} from "@icure/api";
import {WebSocket} from "ws";

log.setLevel((process.env.WEBSOCKET_LOG_LEVEL as LogLevelDesc) ?? 'info')

export type EventTypes = 'CREATE' | 'UPDATE' | 'DELETE'
export type Subscribable = 'Patient' | 'DataSample' | 'User' | 'HealthcareElement' | 'Notification'
export type SubscriptionConfig = {
  filter?: AbstractFilterUser | AbstractFilterPatient | AbstractFilterService | AbstractFilterMaintenanceTask | AbstractFilterHealthElement,
  qualifiedName: string,
}

export function subscribeToEntityEvents<O>(
    basePath: string,
    tokenProvider: () => Promise<string>,
    entityClass: Subscribable,
    eventTypes: EventTypes[],
    config: SubscriptionConfig,
    eventFired: (entity: O) => Promise<void>,
    options: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number } = {},
): Promise<WebSocketWrapper> {

  const {filter, qualifiedName} = config

  return WebSocketWrapper.create(
      basePath.replace('http', 'ws').replace('rest', 'ws') + '/notification/subscribe',
      tokenProvider,
      options.connectionMaxRetry ?? 5,
      options.connectionRetryIntervalMs ?? 1_000,
      {
        CONNECTED: [
          async (ws: WebSocketWrapper) => {
            const subscription = {
              eventTypes,
              entityClass: qualifiedName,
              filter: filter,
            }

            ws.send(JSON.stringify(subscription))
          },
        ],
      },
      async (data: any) => {
        try {
          await eventFired(data)
        } catch (e) {
          log.error(e)
        }
      }
  )
}

export type ConnectionStatus = 'NOT_CONNECTED' | 'CONNECTED' | 'CLOSED' | 'ERROR'
export type StatusCallback = (ws: WebSocketWrapper) => void
export type ErrorStatusCallback = (ws: WebSocketWrapper, error?: Error) => void
export type ConnectionStatusFunction = {
  [K in ConnectionStatus]: K extends 'ERROR' ? ErrorStatusCallback : StatusCallback
}
export type ConnectionStatusFunctions = {
  [K in ConnectionStatus]?: K extends 'ERROR' ? Array<ErrorStatusCallback> : Array<StatusCallback>
}
export type WebSocketWrapperMessageCallback = (data: any) => void

export class WebSocketWrapper {
  private readonly pingLifetime: number = 20_000
  private socket: WebSocket | null = null
  private retries = 0
  private closed = false
  private lastPingReceived = Date.now()
  private intervalIds: (NodeJS.Timeout | number)[] = []

  private constructor(
      private readonly url: string,
      private readonly tokenProvider: () => Promise<string>,
      private readonly maxRetries = 3,
      private readonly retryDelay = 1000,
      private readonly statusCallbacks: ConnectionStatusFunctions = {},
      private readonly messageCallback: WebSocketWrapperMessageCallback = () => {
      }
  ) {
  }

  public static async create(
      url: string,
      tokenProvider: () => Promise<string>,
      maxRetries?: number,
      retryDelay?: number,
      statusCallbacks?: ConnectionStatusFunctions,
      messageCallback?: WebSocketWrapperMessageCallback
  ): Promise<WebSocketWrapper> {
    const ws = new WebSocketWrapper(url, tokenProvider, maxRetries, retryDelay, statusCallbacks, messageCallback)
    await ws.connect()
    return ws
  }

  public send(data: Buffer | ArrayBuffer | string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data)
    }
  }

  public close() {
    if (this.socket) {
      this.closed = true
      this.socket.close(1001, 'Client closed connection')
    }
  }

  public addStatusCallback(status: ConnectionStatus, callback: ConnectionStatusFunction[ConnectionStatus]) {
    switch (status) {
      case 'CONNECTED':
      case 'CLOSED':
        if (!this.statusCallbacks[status]) this.statusCallbacks[status] = []
        this.statusCallbacks?.[status]?.push(callback)
        break
      case 'ERROR':
        this.statusCallbacks?.ERROR?.push(callback)
        break
    }
  }

  private async connect() {
    if (this.retries >= this.maxRetries) {
      throw new Error('WebSocket connection failed after ' + this.maxRetries + ' retries')
    }

    this.socket = new WebSocket(`${this.url};tokenid=${await this.tokenProvider()}`)

    this.socket.on('open', async () => {
      log.debug('WebSocket connection opened')

      this.intervalIds.push(
          setTimeout(() => {
            this.retries = 0
          }, (this.maxRetries + 1) * this.retryDelay)
      )

      this.callStatusCallbacks('CONNECTED')
    })

    this.socket.on('message', (event: Buffer) => {
      log.debug('WebSocket message received', event)

      const dataAsString = event.toString('utf8')

      // Handle ping messages
      if (dataAsString === 'ping') {
        log.debug('Received ping, sending pong')

        this.send('pong')
        this.lastPingReceived = Date.now()

        this.intervalIds.push(
            setTimeout(() => {
              if (Date.now() - this.lastPingReceived > this.pingLifetime) {
                log.error(`No ping received in the last ${this.pingLifetime} ms`)
                this.socket?.close()
              }
            }, this.pingLifetime)
        )

        return
      }

      // Call the message callback for other messages
      try {
        const data = JSON.parse(dataAsString)
        this.messageCallback(data)
      } catch (error) {
        log.error('Failed to parse WebSocket message', error)
      }
    })

    this.socket.on('close', (code, reason) => {
      log.debug('WebSocket connection closed', code, reason.toString('utf8'))

      this.callStatusCallbacks('CLOSED')

      this.intervalIds.forEach((id) => clearTimeout(id as number))
      this.intervalIds = []

      if (this.closed) {
        return
      }

      setTimeout(async () => {
        ++this.retries
        return await this.connect()
      }, this.retryDelay)
    })

    this.socket.on('error', async (err) => {
      log.error('WebSocket error', err)

      this.callStatusCallbacks('ERROR', err)

      if (this.socket) {
        this.socket.close()
      }
    })
  }

  private callStatusCallbacks(event: ConnectionStatus, error?: Error) {
    switch (event) {
      case 'CONNECTED':
      case 'CLOSED':
        this.statusCallbacks?.[event]?.forEach((callback) => callback(this))
        break
      case 'ERROR':
        this.statusCallbacks?.ERROR?.forEach((callback) => callback(this, error))
        break
    }
  }
}
