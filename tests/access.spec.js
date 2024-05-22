const { test } = require("@playwright/test");
const { AmazonPage } = require('../pages/access.page');
const { BuyAmazonItem } = require('../pages/buyItem.page');

test.beforeEach(async({ page }) => {
    const amazonPage = new AmazonPage();
    await amazonPage.acessarPagina(page);
});

test("Pesquisar Item e adicionar ao carrinho", async({ page }) => {
    const amazonPage = new AmazonPage();
    const buyAmazonItem = new BuyAmazonItem();

    await test.step("Pesquisar o item", async() => {
        await amazonPage.pesquisarItem(page, 'Xbox Series S');
        await amazonPage.validarItemPesquisado(page, 'Console Xbox Series S');

    });

    await test.step("Adicionar o item ao carrinho", async() => {
        await buyAmazonItem.validarItemSelecionado(page, 'Console Xbox Series S', 'Sobre este item');
        await buyAmazonItem.adicionarCarrinho(page, 'Adicionado ao carrinho');
        await buyAmazonItem.validarCarrinho(page, 'Carrinho de compras');
        await buyAmazonItem.resultadoCarrinho(page, 'Console Xbox Series S');

    });

    await test.step("Remover item do carrinho", async() =>{
        await buyAmazonItem.removerItem(page);
        await buyAmazonItem.validarCarrinhoVazio(page, 'Seu carrinho de compras da Amazon está vazio.')
    })
});
