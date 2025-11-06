export class Dispositivo {
  constructor(
    public nome: string,
    public localizacao: string
  ) {}

  paraDTO() {
    return {
      nome: this.nome.trim(),
      localizacao: this.localizacao
    };
  }
}
