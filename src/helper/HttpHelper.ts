import axios from "axios";
import Config from "../config";
import cryptoHelper from "./cryptoHelper";

export default class HttpHelper {
    private static readonly options = {
        headers: {
            "Content-Type": "application/json; charset = utf-8",
            "Authorization": `Basic ${cryptoHelper.getBase64(":" + Config.accessToken)}`,
        },
    };

    public static async Get<T>(url: string, header?: object): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {
            axios.get(url, header || this.options)
                .then((result) => {
                    if (result.status !== 200) {
                        reject(new Error(`状态码不为200，原因：${result.statusText}`));
                    }

                    resolve(result.data as T);
                }).catch((err) => {
                reject(err);
            });
        });
    }
}
