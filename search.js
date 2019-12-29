const puppeteer =  require('puppeteer');

async function doSearch (attempt, searchTerm) {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://google.com');

    const searchInput = await page.$('input[type=text]');
    await searchInput.type(searchTerm);
    const searchButton = await page.$('input[type=submit][name=btnK]');
    await searchButton.click();
    await page.waitForNavigation();
    await page.waitForSelector('#resultStats');
    let resultStats = await page.$eval('#resultStats', e => e.innerText);

    await browser.close();

    return { attempt: attempt, searchTerm: searchTerm, result: resultStats };
}


module.exports = {
    doSearch
};