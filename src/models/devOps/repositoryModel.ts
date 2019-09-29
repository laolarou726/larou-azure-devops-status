export interface IRepositoryModel {
    id: string;
    type: string;
    name: string;
    url: string;
    clean: object;
    checkoutSubmodules: boolean;
}
