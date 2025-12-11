import { expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.inputEmail = page.locator('form', { hasText: 'Login' }).getByPlaceholder('Email Address');
        this.inputSenha = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.btnLogout = page.getByRole('link', { name: ' Logout' });
        this.msgErroLogin = page.locator('form', { hasText: 'Your email or password is incorrect!' });
    }

    async preencherEmail(email) {
        await expect(this.inputEmail).toBeVisible();
        await this.inputEmail.fill(email);
    }

    async preencherSenha(senha) {
        await this.inputSenha.fill(senha);
    }

    async clicarBotaoLogin() {
        await this.btnLogin.click();
    }

    async verificarLoginComSucesso() {
        await expect(this.btnLogout).toBeVisible();
    }

    async verificarMensagemErro() {
        await expect(this.msgErroLogin).toBeVisible();
    }

    async realizarLogin(email, senha) {
        const basePage = new BasePage(this.page);
        await basePage.acessarLogin();
        await expect(this.inputEmail).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.btnLogin.click();

    }
}