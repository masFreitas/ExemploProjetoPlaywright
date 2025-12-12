// @ts-check
import { test, expect } from '@playwright/test';
import { ProductPage, BasePage } from '../../pages/BasePage'

test.describe('Produtos', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });


    test('Realizar busca com sucesso', async ({ page }) => {
        const basePage = new BasePage(page);
        const productPage = new ProductPage(page);

        await basePage.acessarProdutos();
        await productPage.buscarProduto('Top');
        await productPage.validarBusca();
    });

    test('Validar tela de detalhes do produto', async ({ page }) => {
        const basePage = new BasePage(page);
        const productPage = new ProductPage(page);

        await basePage.acessarProdutos();
        await productPage.acessarPrimeiroProduto();
        await productPage.validarDetalhesProduto();
    });

    test('Enviar review de produto', async ({ page }) => {
        const basePage = new BasePage(page);
        const productPage = new ProductPage(page);

        await basePage.acessarProdutos();
        await productPage.acessarPrimeiroProduto();
        await productPage.validarDetalhesProduto();
        await productPage.escreverReviewProduto('Mateus', 'email@email.com', 'Ótimo produto, recomendo!');
        await productPage.validarEnvioReview();
    });

});