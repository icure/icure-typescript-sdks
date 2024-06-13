import { Delegation } from '../../src'
import { generateDelegation } from './Delegation.model'

export function generateRandomStringArray(): string[] {
    return Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 15))
}

export function generateRandomStringMap(): Record<string, string> {
    const map: Record<string, string> = {}
    for (let i = 0; i < 5; i++) {
        map[Math.random().toString(36).substring(2, 15)] = Math.random().toString(36).substring(2, 15)
    }
    return map
}

export function generateRandomNumberArray(): number[] {
    return Array.from({ length: 5 }, () => Math.random() * 100)
}

export function generateRandomNumberMatrix(): number[][] {
    return Array.from({ length: 5 }, () => generateRandomNumberArray())
}

export function generateRandomBoolean(): boolean {
    return Math.random() < 0.5
}

export function generateRandomInteger(): number {
    return Math.floor(Math.random() * 100)
}

export function generateRandomDouble(): number {
    return Math.random() * 100
}

export function generateRandomString(): string {
    return Math.random().toString(36).substring(7)
}

export function generateRandomDate(): number {
    return new Date().getTime()
}

export function generateRandomEncryptedSelf(): string {
    return generateRandomString()
}

export function generateDelegationSet(): Array<Delegation> {
    return Array.from({ length: 5 }, () => generateDelegation())
}

export function generateDelegationMap(): Record<string, Array<Delegation>> {
    const map: Record<string, Array<Delegation>> = {}
    for (let i = 0; i < 5; i++) {
        map[Math.random().toString(36).substring(2, 15)] = generateDelegationSet()
    }
    return map
}
