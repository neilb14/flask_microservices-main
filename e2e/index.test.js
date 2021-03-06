import { Selector } from 'testcafe';

const TEST_URL = process.env.TEST_URL;

fixture('/').page(`${TEST_URL}/`);

test(`should display the page correctly if a user is not logged in`, async (t) => {
    await t
      .navigateTo(TEST_URL)
      .expect(Selector('H1').withText('All Users').exists).ok()
      .expect(Selector('a').withText('User Status').exists).notOk()
      .expect(Selector('a').withText('Log Out').exists).notOk()
      .expect(Selector('a').withText('Register').exists).ok()
      .expect(Selector('a').withText('Log In').exists).ok()
});

test(`users should be able to view the '/about' page`, async (t) => {
      await t
        .navigateTo(TEST_URL + '/about')
        .expect(Selector('H1').withText('About').exists)
        .ok()
});
    

test(`users should be able to navigate to the '/about' page`, async(t) => {
    await t
        .navigateTo(TEST_URL)
        .click(Selector('a').withText('About'))
        .expect(Selector('H1').withText('About').exists)
        .ok()
});