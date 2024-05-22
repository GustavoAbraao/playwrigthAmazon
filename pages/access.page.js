import { expect } from '@playwright/test';
const buyItemData = require('../pages/objects/buyItem.json');

class AmazonPage {
    async acessarPagina(page) {
        await page.setDefaultTimeout(10000);
        try {
            await page.goto(buyItemData.url);  // Acessa a página da Amazon
        } catch (erro) {
            console.log("Erro ao carregar a página da Amazon ", erro);
        }
    }

    async pesquisarItem(page, textoPesquisa) {
        await page.fill(buyItemData.searchBar, textoPesquisa);
        await page.press(buyItemData.searchBar, 'Enter');
    }

    async validarItemPesquisado(page, nomeProduto) {
        const elemento = await page.locator(buyItemData.resultProduct, { name: nomeProduto, exact: true });
        await expect(elemento).toBeVisible();
        
    }

   
}

module.exports = { AmazonPage };
