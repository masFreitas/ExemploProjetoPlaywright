import { expect } from '@playwright/test';
import { ProductSelectors } from './ProductSelectors';

export class ProductPage {
    constructor(page) {
        this.page = page;

        this.productSelectors = new ProductSelectors(page);
    }

    async buscarProduto(produto) {
        await expect(this.productSelectors.inputBusca).toBeVisible();
        await this.productSelectors.inputBusca.fill(produto);
        await this.productSelectors.btnBuscar.click();
    }

    async validarBusca() {
        await expect(this.page).toHaveURL(/products\?search=/);
    }

    async acessarPrimeiroProduto() {
        await expect(this.productSelectors.primeiroProduto).toBeVisible();
        await this.productSelectors.primeiroProduto.click();
    }

    async validarDetalhesProduto() {
        await expect(this.productSelectors.btnAdicionarCarrinho).toBeVisible();
        await expect(this.productSelectors.produtoImagem).toBeVisible();
        await expect(this.productSelectors.escreverReview).toBeVisible();
    }

    async escreverReviewProduto(nome, email, descricao) {
        await expect(this.productSelectors.inputNomeReview).toBeVisible();
        await this.productSelectors.inputNomeReview.fill(nome);
        await this.productSelectors.inputEmailReview.fill(email);
        await this.productSelectors.inputDescricaoReview.fill(descricao);
        await this.productSelectors.btnEnviarReview.click();
    }

    async validarEnvioReview() {
        await expect(this.productSelectors.mensagemSucessoReview).toBeVisible();
    }

}