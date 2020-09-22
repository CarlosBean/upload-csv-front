export declare type AlertType = 'success' | 'danger' | 'warning' | 'info';

export interface ICustomAlert {
    alertType: AlertType;
    title: string;
    text: string;
    icon?: string;
}

export class CustomAlert implements ICustomAlert {
    constructor(
        public alertType: AlertType,
        public title: string,
        public text: string,
        public icon?: string
    ) { }
}