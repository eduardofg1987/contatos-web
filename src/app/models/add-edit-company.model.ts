export class AddEditCompany {
    constructor(public tipo: string,
        public nome: string,
        public telefone: string,
        public enderecoLogradouro: string,
        public enderecoNumero: string,
        public enderecoComplemento: string,
        public enderecoBairro: string,
        public enderecoCidade: string,
        public enderecoUf: string,
        public enderecoCep: string) { }
}