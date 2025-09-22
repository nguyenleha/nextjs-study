import { sleep } from '../lib/utils'

export async function loginService(username: string) {
    await sleep(300)
    return { id: '1', name: username }
}

export async function logoutService() {
    await sleep(150)
    return { success: true }
}
