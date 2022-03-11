const techs = require('./techs.json');

let scrapedData = [];
const BASE_URL = 'https://uk.indeed.com/';

const scraperObject = {
    url: 'https://uk.indeed.com/jobs?q=Software+engineer&start=10',
    async scraper(browser) {
        let data = await scrapeListingPage(browser,this.url);
        console.log("Data: ", data);
        return data;
    }
}

async function scrapeListingPage(browser,url) {
    if(scrapedData.length >= 1) return scrapedData;
    console.log("Current Scraped Jobs: ", scrapedData.length)
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    // Navigate to the selected page
    await page.goto(url);

    await page.waitForSelector('.mosaic-zone');

    const links = await page.evaluate(() => Array.from(
        document.querySelectorAll('#mosaic-provider-jobcards > a'),
        a => a.getAttribute('href')));
        
    for (const href of links) {
        if (href.substring(1, 3) == 'rc') {
            scrapedData.push(await scrapeJob(browser,href))
        }
    }

    let nextButtonExist = false;
    let nextHref = '';
    try{
        nextHref = await page.evaluate(()=>Array.from(
            document.querySelectorAll('.pagination-list > li:last-child > a'),
            a => a.getAttribute('href'))); 
    	nextButtonExist = true;
    }
    catch(err){
    	nextButtonExist = false;
    }
    if(nextButtonExist){
    	return scrapeListingPage(browser, BASE_URL+nextHref); // Call this function recursively
    }
    await page.close();
    return scrapedData;
}

async function scrapeJob(browser,href){
    let jobId = href.substring(11, 27); // Fixed I
    let jobLink = `${BASE_URL}viewjob?jk=${jobId}`;
    console.log(jobLink);
    let newPage = await browser.newPage();
    await newPage.goto(jobLink);
    let currentJob = {};
    await newPage.waitForSelector('#viewJobSSRRoot');

    currentJob.title = await newPage.$eval('.jobsearch-JobInfoHeader-title', text => text.textContent);
    currentJob.location = await newPage.$eval('.jobsearch-DesktopStickyContainer-subtitle > div:nth-child(2)', text => text.textContent)
    currentJob.description = `${String(await newPage.evaluate(el => el.textContent, await newPage.$('#jobDescriptionText')))}`.split(/\n/).join(" ");
    currentJob.technologies = technologiesExtractor(currentJob.description);
    currentJob.post_date = await newPage.$eval('.jobsearch-JobMetadataFooter > div:nth-child(2)', text => text.textContent);
    currentJob.company_name = await newPage.$eval('.jobsearch-JobMetadataFooter > div:nth-child(1)', text => text.textContent);
    // currentJob.experience;
    // currentJob.responsibilities;
    await newPage.close();
    return currentJob;
}

function technologiesExtractor(desc){
    let techsFound = [];
    techs.forEach(tech => {
        if (desc.includes(`${tech}`)) techsFound.push(tech);
    });
    return techsFound.join(",");
}

module.exports = scraperObject;

