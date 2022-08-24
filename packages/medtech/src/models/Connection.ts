import {ConnectionStatus, ReactiveSocket} from "rsocket-types/ReactiveSocketTypes";

export interface Connection {
  close(): void;
  onConnecting(callback: () => void): Connection
  onNotConnected(callback: () => void): Connection
  onConnected(callback: () => void): Connection
  onClosed(callback: () => void): Connection
  onError(callback: (e: Error) => void): Connection
}

export class ConnectionImpl implements Connection {
  rs: ReactiveSocket<any, any>
  connectionStatus: string

  constructor(rs: ReactiveSocket<any, any>) {
    this.rs = rs;
    this.connectionStatus = 'NOT_CONNECTED'
  }

  close() {
    this.rs.close()
  }

  onConnecting(callback:() => void): Connection {
    this.rs?.connectionStatus()?.subscribe((cs: ConnectionStatus) => {
      if (cs.kind === 'CONNECTING') {
        this.connectionStatus = 'CONNECTING'
        callback()
      }
    })
    return this
  }

  onNotConnected(callback:() => void): Connection {
    this.rs?.connectionStatus()?.subscribe((cs: ConnectionStatus) => {
      if (cs.kind === 'NOT_CONNECTED') {
        this.connectionStatus = 'NOT_CONNECTED'
        callback()
      }
    })
    return this
  }

  onConnected(callback:() => void): Connection {
    this.rs?.connectionStatus()?.subscribe((cs: ConnectionStatus) => {
      if (cs.kind === 'CONNECTED') {
        this.connectionStatus = 'CONNECTED'
        callback()
      }
    })
    return this
  }

  onClosed(callback:() => void): Connection {
    this.rs?.connectionStatus()?.subscribe((cs: ConnectionStatus) => {
      if (cs.kind === 'CLOSED') {
        this.connectionStatus = 'CLOSED'
        callback()
      }
    })
    return this
  }

  onError(callback:(e: Error) => void): Connection {
    this.rs?.connectionStatus()?.subscribe((cs: ConnectionStatus) => {
      if (cs.kind === 'ERROR') {
        this.connectionStatus = 'ERROR'
        callback(cs.error)
      }
    })
    return this
  }
}
