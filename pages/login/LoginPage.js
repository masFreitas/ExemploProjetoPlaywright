import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LoginSelectors } from './LoginSelectors';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginSelectors = new LoginSelectors(page);
    }

    // Métodos para interagir com a página de login (ex: preencher campos, clicar em botões, validar mensagens, etc.)
    async preencherEmail(email) {
        await expect(this.loginSelectors.inputEmail).toBeVisible();
        await this.loginSelectors.inputEmail.fill(email);
    }

    async preencherSenha(senha) {
        await this.loginSelectors.inputSenha.fill(senha);
    }

    async clicarBotaoLogin() {
        await this.loginSelectors.btnLogin.click();
    }

    async verificarLoginComSucesso() {
        await expect(this.loginSelectors.btnLogout).toBeVisible();
    }

    async verificarMensagemErro() {
        await expect(this.loginSelectors.msgErroLogin).toBeVisible();
    }

    // Método que combina as ações de login, para facilitar a reutilização nos testes
    async realizarLogin(email, senha) {
        const basePage = new BasePage(this.page);
        await basePage.acessarLogin();
        await expect(this.loginSelectors.inputEmail).toBeVisible();
        await this.loginSelectors.inputEmail.fill(email);
        await this.loginSelectors.inputSenha.fill(senha);
        await this.loginSelectors.btnLogin.click();
    }
}