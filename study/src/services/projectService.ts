import { sleep } from '../lib/utils'

export type Project = { id: string; name: string }

export async function listProjects(): Promise<Project[]> {
    await sleep(200)
    return [
        { id: 'p1', name: 'Demo Project 1' },
        { id: 'p2', name: 'Demo Project 2' },
    ]
}
