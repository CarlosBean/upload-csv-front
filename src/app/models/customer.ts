export interface ICustomer {
    names: string[];
    lastnames: string[];
    addresses: string[];
    phones: string[];
    campaign: Campaign;
    active: boolean;
    _id: string;
}

export interface Campaign {
    name: string;
    _id: string;
}