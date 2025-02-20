import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import fs from 'fs';

export async function runLighthouseSEO(url: string) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'json', port: chrome.port };
    const runnerResult = await lighthouse(url, options);
    const lhr = runnerResult.lhr;

    fs.writeFileSync('lighthouse-seo-report.json', JSON.stringify(lhr, null, 2));
    await chrome.kill();
    return lhr.categories.seo.score * 100;
}
