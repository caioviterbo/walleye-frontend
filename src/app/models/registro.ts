export class Registro {

  constructor(
    public nome: string,
    public email: string,
    public senha: string
  ) {}

  paraDTO() {
    return {
      nome: this.nome.trim(),
      email: this.email.toLowerCase(),
      senha: this.senha
    };
  }
}
