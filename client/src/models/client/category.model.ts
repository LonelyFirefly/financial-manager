export namespace CategoryClientModel {
    export interface Category { 
    id: string;
    name: string;
    description: string;
    value: number;
    type: 'essential' | 'non-essential';
    isArchived?: boolean;
    image?: string;
    }
}
