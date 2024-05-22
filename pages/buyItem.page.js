import { expect } from '@playwright/test';
const buyItemData = require('../pages/objects/buyItem.json');

class BuyAmazonItem {

    async validarItemSelecionado(page, nomeProduto, sobreItem) {
        await page.click(buyItemData.selectItem);
        const elemento = await page.locator(buyItemData.resultItem); 
        await expect(elemento).toHaveText(nomeProduto); 
        const item = await page.locator(buyItemData.sobreItem);
        await expect(item).toHaveText(sobreItem);
    }


    async adicionarCarrinho(page, adicionadoCarrinho) {
        await page.click(buyItemData.addCart);
        const cart = await page.locator(buyItemData.resultAddCart);
        await expect(cart).toHaveText(adicionadoCarrinho);
    }

    async validarCarrinho(page, carrinhoCompras) {
        await page.click(buyItemData.goToCart);
        const shopCart = await page.locator(buyItemData.resultCart);
        await expect(shopCart).toContainText(carrinhoCompras);
    }

    async resultadoCarrinho(page, nomeProduto){
        const resultCart = await page.locator(buyItemData.resultProductCart);
        await expect(resultCart).toContainText(nomeProduto);
    }

    async removerItem(page){
        await page.waitForSelector(buyItemData.removeItem);
        await page.click(buyItemData.removeItem);

    }

    async validarCarrinhoVazio(page, carrinhoVazio){
        await page.waitForSelector(buyItemData.resultRemoveItem);
        const elemento = await page.locator(buyItemData.resultRemoveItem);
        await expect(elemento).toHaveText(carrinhoVazio);
    }


}

module.exports = { BuyAmazonItem };