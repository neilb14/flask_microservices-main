import { Selector } from 'testcafe';

const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const currentDate = new Date();
const TEST_URL = process.env.TEST_URL;

fixture('/status').page(`${TEST_URL}/status`);

test(`should display the page when user is not logged in`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/status`)
        .expect(Selector('p').withText('You must be logged in to view this.').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('User Status').exists).notOk()
});
