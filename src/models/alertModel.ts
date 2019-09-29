export default class AlertModel {
    public type: string;
    public message: string;
    public action?: () => void;

    constructor(type: string, message: string, action?: () => void) {
        this.type = type;
        this.message = message;
        this.action = action;
    }
}
