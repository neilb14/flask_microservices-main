import {Selector} from 'testcafe';

const TEST_URL = process.env.TEST_URL;

fixture('/register').page(`${TEST_URL}/register`);

test(`should display the registration form`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/register`)
        .expect(Selector('H1').withText('Register').exists).ok()
        .expect(Selector('form').exists).ok()
});