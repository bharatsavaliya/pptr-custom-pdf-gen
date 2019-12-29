const searchUtl = require('./search');
const reportUtl = require('./report');

(async () => {

    let runs = [];

    const run1 = await searchUtl.doSearch(1, 'Puppeteer is awesome');
    runs.push(run1);

    const run2 = await searchUtl.doSearch(2, 'Technology News');
    runs.push(run2);

    const run3 = await searchUtl.doSearch(3, 'Startup News');
    runs.push(run3);
    
    await reportUtl.generateReport(runs);
    
})();