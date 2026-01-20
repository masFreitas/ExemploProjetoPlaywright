export class LoginSelectors {
    constructor(page) {
        this.page = page;

        // Seletores da página de login (ex: input de email, senha, botões, mensagens de erro, etc.)
        this.inputEmail = page.locator('form', { hasText: 'Login' }).getByPlaceholder('Email Address');
        this.inputSenha = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.btnLogout = page.getByRole('link', { name: ' Logout' });
        this.msgErroLogin = page.locator('form', { hasText: 'Your email or password is incorrect!' });
    }
}