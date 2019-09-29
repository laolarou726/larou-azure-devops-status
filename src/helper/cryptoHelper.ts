export default class CryptoHelper {
    public static getBase64(str: string): string {
        const buff = new Buffer(str);
        return buff.toString("base64");
    }
}
