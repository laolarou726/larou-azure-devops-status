export default class LogSearchModel {
    public id: number;
    public log: object;

    constructor(id: number, log: object) {
        this.id = id;
        this.log = log;
    }
}
