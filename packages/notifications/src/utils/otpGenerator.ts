export function NumericOTP(length: number): number {
    try {
        let randomInt = "";
        const numbers = "1234567890";
        for (let i = 0; i < length; i++) {
            randomInt += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return Number(randomInt);
    } catch (_error) {
        return 0;
    }
}

export function AlphabeticOTP(length: number): string {
    try {
        let randomString = "";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < length; i++) {
            randomString += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return randomString;
    } catch (_error) {
        return "";
    }
}

export function AlphanumericOTP(length: number): string {
    try {
        let randomString = "";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        for (let i = 0; i < length; i++) {
            randomString += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return randomString;
    } catch (_error) {
        return "";
    }
}
