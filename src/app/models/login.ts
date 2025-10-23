export class Login {
  constructor(
    public email: string,
    public senha: string
  ) {}

  paraDTO() {
    return {
      email: this.email.toLowerCase(),
      senha: this.senha
    };
  }
}
