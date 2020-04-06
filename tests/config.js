exports.config = {
    url: 'http://localhost/addressbook',
    testAccount: {
        login: 'admin',
        password: 'secret'
    }
};

const CHROME = {
    name: 'chrome',
    currentVersion: '80.0'
};

exports.browsers = [
    {
        browserName: CHROME.name,
        browser_version: CHROME.currentVersion,
    }
];

exports.tests = [
    {
        file: 'ContactCreationTests',
        timeout: 120000
    },
    {
        file: 'ContactDeletionTests',
        timeout: 120000
    },
    {
        file: 'ContactModificationTests',
        timeout: 120000
    },
    {
        file: 'GroupCreationTests',
        timeout: 120000
    },
    {
        file: 'GroupDeletionTests',
        timeout: 120000
    },
    {
        file: 'GroupModificationTests',
        timeout: 120000
    }
];
