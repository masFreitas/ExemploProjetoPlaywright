import { expect, Page } from '@playwright/test';
export { ProductPage } from './ProductPage';
export { LoginPage } from './LoginPage';

export class BasePage {
    constructor(page) {
        this.page = page;

        this.btnHome = page.getByRole('link', { name: ' Home' });
        this.btnProducts = page.getByRole('link', { name: ' Products' });
        this.btnLogin = page.getByRole('link', { name: ' Signup / Login' });

    }

    async acessarHome() {
        await expect(this.btnHome).toBeVisible();
        await this.btnHome.click();
    }

    async acessarLogin() {
        await expect(this.btnLogin).toBeVisible();
        await this.btnLogin.click();
    }

        async acessarProdutos() {
        await expect(this.btnProducts).toBeVisible();
        await this.btnProducts.click();
    }

}