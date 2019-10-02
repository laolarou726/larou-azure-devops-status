export default class StatusHelper {
    public static getStatus(status: string, result?: string): boolean | null {
        if (status === "inProgress" || status === "notStarted") {
            return null;
        } else {
            return (result || "") === "succeeded";
        }
    }
}
