import { Company } from "./company.model";

export class Contact {
    constructor(public id: number,
        public nomeCompleto: string,
        public email: string,
        public telefone: string,
        public empresa: Company) { }
}