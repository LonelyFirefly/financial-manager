export namespace CategoryApiModel {
    export interface Category {
    id: string;
    name: string;
    description: string;
    value: string;
    type: 'essential' | 'non-essential';
    isArchived?: boolean;
    image?: string;
    }
}

