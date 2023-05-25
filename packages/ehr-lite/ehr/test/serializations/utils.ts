export function generateRandomStringArray(): string[] {
    return Array.from({ length: 5 }, () => Math.random().toString(36).substring(2, 15))
}

export function generateRandomStringMap(): Map<string, string> {
    const map: Map<string, string> = new Map()
    for (let i = 0; i < 5; i++) {
        map.set(Math.random().toString(36).substring(2, 15), Math.random().toString(36).substring(2, 15))
    }
    return map
}

export function generateRandomNumberArray(): number[] {
    return Array.from({ length: 5 }, () => Math.random() * 100)
}

export function generateRandomNumberMatrix(): number[][] {
    return Array.from({ length: 5 }, () => generateRandomNumberArray())
} // Function to generate a random TypeEnum
// Function to generate a random boolean
export function generateRandomBoolean(): boolean {
    return Math.random() < 0.5
}

// Function to generate a random integer
export function generateRandomInteger(): number {
    return Math.floor(Math.random() * 100)
}

// Function to generate a random double
export function generateRandomDouble(): number {
    return Math.random() * 100
}

// Function to generate a random string
export function generateRandomString(): string {
    return Math.random().toString(36).substring(7)
}

// Function to generate a random date as a number (timestamp)
export function generateRandomDate(): number {
    return new Date().getTime()
}

// Function to generate a random encryptedSelf
export function generateRandomEncryptedSelf(): string {
    // This is a placeholder. Replace this with the appropriate logic to generate a valid encryptedSelf
    return generateRandomString()
}
