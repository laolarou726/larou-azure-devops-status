export interface IQueueModel {
    id: number;
    name: string;
    pool: {
        id: number;
        name: string;
        isHosted: boolean;
    };
}
