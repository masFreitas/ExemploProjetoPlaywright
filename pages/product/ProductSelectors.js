export class ProductSelectors {
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
}