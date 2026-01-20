import { test } from '@playwright/test';
import { BasePage, ProductPage } from '../../pages/BasePage.js';

test.describe('Produtos', () => {

    let basePage;
    let productPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        basePage = new BasePage(page);
        productPage = new ProductPage(page);
    });


    test('Realizar busca com sucesso', async ({ page }) => {
        await basePage.acessarProdutos();
        await productPage.buscarProduto('Top');
        await productPage.validarBusca();
    });

    test('Validar tela de detalhes do produto', async ({ page }) => {
        await basePage.acessarProdutos();
        await productPage.acessarPrimeiroProduto();
        await productPage.validarDetalhesProduto();
    });

    test('Enviar review de produto', async ({ page }) => {
        await basePage.acessarProdutos();
        await productPage.acessarPrimeiroProduto();
        await productPage.validarDetalhesProduto();
        await productPage.escreverReviewProduto('Mateus', 'email@email.com', 'Ótimo produto, recomendo!');
        await productPage.validarEnvioReview();
    });
});