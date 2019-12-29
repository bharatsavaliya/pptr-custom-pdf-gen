const puppeteer =  require('puppeteer');
const fs = require('fs-extra')

async function generateReport (runs) {

    // Get HTML Contents for Report
    let content = getReportContent(runs);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Pass HTML contents
    await page.setContent(content);

    // Set page size
    await page.setViewport({ width:1024, height:800 });

    // Render PDF
    await page.pdf({ path: 'report.pdf', margin: {top: '12px', right: '12px', bottom: '12px', left: '12px'} });
    
    await browser.close();
};

function getReportContent (runs) {
    let rowsHtml = prepareHtml(runs);

    let template = fs.readFileSync('template.html', 'utf-8');
    template = template.replace('##RESULTS##', rowsHtml);

    return template;
};

function prepareHtml (runs) {
    let rowsHtml = '';

    runs.forEach(run => {
        rowsHtml = rowsHtml + '<tr>' + '<td>' + run.attempt + '</td><td>' + run.searchTerm + '</td><td>' + run.result + '</td></tr>';
    });

    return rowsHtml;
};

module.exports = {
    generateReport
};