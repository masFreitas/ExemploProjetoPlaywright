import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage {
    constructor(page) {
        this.page = page;

        // Seletores da página de login (ex: input de email, senha, botões, mensagens de erro, etc.)
        this.inputEmail = page.locator('form', { hasText: 'Login' }).getByPlaceholder('Email Address');
        this.inputSenha = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.btnLogout = page.getByRole('link', { name: ' Logout' });
        this.msgErroLogin = page.locator('form', { hasText: 'Your email or password is incorrect!' });
    }

    // Métodos para interagir com a página de login (ex: preencher campos, clicar em botões, validar mensagens, etc.)
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

    // Método que combina as ações de login, para facilitar a reutilização nos testes
    async realizarLogin(email, senha) {
        const basePage = new BasePage(this.page);
        await basePage.acessarLogin();
        await expect(this.inputEmail).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.btnLogin.click();
    }
}