// @ts-check
import { test, expect } from '@playwright/test';
import { BasePage, LoginPage } from '../../pages/BasePage'

test.describe('Login', () => {

  // Executado antes de cada teste
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Testes das funcionalidades de login, como login com sucesso, login com dados inválidos, etc.
  test('Realizar login com sucesso', async ({ page }) => {

    // Instância da página de login, para utilizar seus métodos e seletores
    const loginPage = new LoginPage(page);
    
    // Método reutilizável para realizar o login e verificar o sucesso
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarLoginComSucesso();
  });

    test('Realizar login com dados inválidos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Método reutilizável para realizar o login e verificar a mensagem de erro
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarMensagemErro();
  });

});