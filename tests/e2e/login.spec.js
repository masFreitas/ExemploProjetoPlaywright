// @ts-check
import { test, expect } from '@playwright/test';
import { BasePage, LoginPage } from '../../pages/basePage'

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
  });


  test('Realizar login com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.realizarLogin('mateustc@testing.com', '123123123');
    await loginPage.verificarLoginComSucesso();
  });

    test('Realizar login com dados inválidos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarMensagemErro();
  });

});