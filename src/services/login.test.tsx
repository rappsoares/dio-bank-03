import { login } from "./login";

describe("login", () => {
  const validEmail = "nath@dio.bank";
  const validPassword = "123456";

  it("deve retornar sucesso quando email e senha são válidos", async () => {
    const response = await login(validEmail, validPassword);
    expect(response).toBeTruthy();
  });

  it("deve retornar erro de email quando o email é inválido", async () => {
    const response = await login("email@invalido.com", validPassword);
    expect(response).toEqual({ error: "email", sucess: false });
  });

  it("deve retornar erro de senha quando a senha é inválida", async () => {
    const response = await login(validEmail, "senhaInvalida");
    expect(response).toEqual({ error: "password", sucess: false });
  });

  it("deve retornar erro quando email e senha são inválidos", async () => {
    const response = await login("email@invalido.com", "senhaInvalida");
    expect(response).toEqual({ error: "both", sucess: false });
  });
});
