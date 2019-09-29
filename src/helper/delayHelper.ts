export default class DelayHelper {
    public static sleep(time = 0): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
}
