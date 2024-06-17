import { Connection, sleep } from '@icure/api'
import { CommonApi } from '@icure/typescript-common'

export async function doXOnYAndSubscribe<Y>(api: CommonApi, options: {}, connectionPromise: Promise<Connection>, onConnected: () => Promise<Y>, statusListener: (status: string) => void, eventReceivedPromiseReject: (reason?: any) => void, eventReceivedPromise: Promise<void>) {
    const connection = (await connectionPromise)
        .onClosed(async () => {
            statusListener('CLOSED')
            await sleep(3_000)
        })
        .onConnected(async () => {
            statusListener('CONNECTED')
            await sleep(2_000)
            await onConnected()
        })

    const timeout = setTimeout(eventReceivedPromiseReject, 20_000)
    await eventReceivedPromise.then(() => clearTimeout(timeout)).catch(() => {})

    connection.close()

    await sleep(3_000)
}
