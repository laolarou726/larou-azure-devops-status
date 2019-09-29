export default class RandomHelper {
    public static randomSample<T>(arr: T[]): T | null {
        if (arr.length === 0) {
            return null;
        }

        return arr[this.randomNumber(0, arr.length)];
    }

    public static randomSamples<T>(arr: T[], count: number): T[] {
        const result: T[] = [];
        if (arr.length === 0) {
            return [];
        }

        for (let i = 0; i < count; i++) {
            result.push(this.randomSample(arr) as T);
        }

        return result;
    }

    public static randomNumber(min: number, max: number) {
        switch (arguments.length) {
            case 1:
                return parseInt(String(Math.random() * min + 1), 10);
            case 2:
                return parseInt(String(Math.random() * (max - min + 1) + min), 10);
            default:
                return 0;
        }
    }
}
