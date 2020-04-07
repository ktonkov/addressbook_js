const { Builder } = require('selenium-webdriver');
//const { browsers, tests } = require('./config');
const { asyncForEach, init } = require('./TestBase');
const Mocha = require('mocha');
var argv = require('minimist')(process.argv.slice(2));
let fail = false;
const config = require('config');

const run = async () => {
    await asyncForEach(config.get('browsers'), async browser => {
        global.driver = await new Builder().forBrowser(browser.name).build();
        await init(driver);
        await asyncForEach(config.get('tests'), async testCase => {
            // Driver used by the Selenium tests.
            /*
            global.driver = await new Builder()
                .usingServer('http://hub-cloud.browserstack.com/wd/hub')
                .withCapabilities(Object.assign({
                    name: testCase.file,
                    build: process.env.TRAVIS ? `${process.env.TRAVIS_JOB_NUMBER}` : 'local',
                    project: `Shopware:WirecardElasticEngine-${gateway}-${process.env.SHOPWARE_VERSION}`
                }, bsConfig))
                .build();
            */

            const mocha = new Mocha({
                timeout: testCase.timeout
            });

            return new Promise((resolve) => {
                mocha.suite.on('require', function (global, file) {
                    delete require.cache[file];
                });

                console.log(`Running ${testCase.file} against ${browser.name} (v${browser.version})`);

                mocha.addFile(`./tests/${testCase.file}.js`);

                mocha.run()
                    .on('fail', test => {
                        fail = true;
                        console.log(test);
                        resolve();
                    })
                    .on('end', () => {
                        resolve();
                    })
                ;
            });
        });
    });
    await driver.quit();
};

(async function() {
    await run();
    if (fail) {
        console.log('Some tests failed in the test suite');
        process.exitCode = 1;
    }
})();