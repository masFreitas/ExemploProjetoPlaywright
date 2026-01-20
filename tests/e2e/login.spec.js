import { test } from '@playwright/test';
import { LoginPage } from '../../pages/BasePage'

test.describe('Login', () => {

  let loginPage;

  // Executado antes de cada teste
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Instância da página de login, para utilizar seus métodos e seletores
    loginPage = new LoginPage(page);
  });

  // Testes das funcionalidades de login, como login com sucesso, login com dados inválidos, etc.
  test('Realizar login com sucesso', async ({ page }) => {
    // Método reutilizável para realizar o login e verificar o sucesso
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarLoginComSucesso();
  });

    test('Realizar login com dados inválidos', async ({ page }) => {
    // Método reutilizável para realizar o login e verificar a mensagem de erro
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarMensagemErro();
  });

});