import { expect, Page } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;

        this.inputBusca = page.getByRole('textbox', { name: 'Search Product' })
        this.btnBuscar = page.locator('#submit_search');
        this.primeiroProduto = page.getByRole('link', { name: ' View Product' }).first();
        this.btnAdicionarCarrinho = page.getByRole('button', { name: ' Add to cart' });
        this.produtoImagem = page.getByRole('img', { name: 'ecommerce website products' }).first();
        this.escreverReview = page.getByRole('link', { name: 'Write Your Review' });
        this.inputNomeReview = page.getByRole('textbox', { name: 'Your Name' });
        this.inputEmailReview = page.getByRole('textbox', { name: 'Email Address', exact: true });
        this.inputDescricaoReview = page.getByRole('textbox', { name: 'Add Review Here!' });
        this.btnEnviarReview = page.getByRole('button', { name: 'Submit' });
        this.mensagemSucessoReview = page.getByText('Thank you for your review.');

    }

    async buscarProduto(produto) {
        await expect(this.inputBusca).toBeVisible();
        await this.inputBusca.fill(produto);
        await this.btnBuscar.click();
    }

    async validarBusca() {
        await expect(this.page).toHaveURL(/products\?search=/);
    }

    async acessarPrimeiroProduto() {
        await expect(this.primeiroProduto).toBeVisible();
        await this.primeiroProduto.click();
    }

    async validarDetalhesProduto() {
        await expect(this.btnAdicionarCarrinho).toBeVisible();
        await expect(this.produtoImagem).toBeVisible();
        await expect(this.escreverReview).toBeVisible();
    }

    async escreverReviewProduto(nome, email, descricao) {
        await expect(this.inputNomeReview).toBeVisible();
        await this.inputNomeReview.fill(nome);
        await this.inputEmailReview.fill(email);
        await this.inputDescricaoReview.fill(descricao);
        await this.btnEnviarReview.click();
    }

    async validarEnvioReview() {
        await expect(this.mensagemSucessoReview).toBeVisible();
    }

}