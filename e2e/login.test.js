import { Selector } from 'testcafe';

const randomstring = require('randomstring');

var username = randomstring.generate();
var email = `${username}@test.com`;
const password = "longerthanten";
const TEST_URL = process.env.TEST_URL;

fixture('/login').page(`${TEST_URL}/login`);

test(`should display the sign-in form`, async(t)=>{
    await t
        .navigateTo(`${TEST_URL}/login`)
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('form').exists).ok()
        .expect(Selector('input[disabled]').exists).ok()
        .expect(Selector('.validation-list').exists).ok()
        .expect(Selector('.validation-list > .error').nth(0).withText('Email must be greater than 5 characters.').exists).ok()
});

test(`should display the page correctly if a user is not signed in`, async(t) => {
    await t
        .navigateTo(TEST_URL)
        .expect(Selector('H1').withText('All Users').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('.alert').exists).notOk()
});

test(`should allow a user to log in`, async(t)=>{
    //register user
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))
    
    //log user out
    await t
        .click(Selector('a').withText('Log Out'))

    //log user in
    await t
        .navigateTo(`${TEST_URL}/login`)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    const tableRow = Selector('td').withText(username).parent();
    await t
        .expect(Selector('H1').withText('All Users').exists).ok()
        .expect(tableRow.child().withText(username).exists).ok()
        .expect(tableRow.child().withText(email).exists).ok()
        .expect(Selector('a').withText('User Status').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).ok()
        .expect(Selector('a').withText('Register').exists).notOk()
        .expect(Selector('a').withText('Log In').exists).notOk()
});

test(`should allow a user to sign in`, async (t) => {
    username = randomstring.generate();
    email = `${username}@test.com`;
    
      // register user
      await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))
    
      // log a user out
      await t
        .click(Selector('a').withText('Log Out'))
    
      // log a user in
      await t
        .navigateTo(`${TEST_URL}/login`)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))
    
      // assert user is redirected to '/'
      // assert '/' is displayed properly
      const tableRow = Selector('td').withText(username).parent();
      await t
        .expect(Selector('H1').withText('All Users').exists).ok()
        .expect(tableRow.child().withText(username).exists).ok()
        .expect(tableRow.child().withText(email).exists).ok()
        .expect(Selector('a').withText('User Status').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).ok()
        .expect(Selector('a').withText('Register').exists).notOk()
        .expect(Selector('a').withText('Log In').exists).notOk()
        .expect(Selector('.alert-success').withText('Welcome!').exists).ok()
    
      // log a user out
      await t
        .click(Selector('a').withText('Log Out'))
    
      // assert '/logout' is displayed properly
      await t
        .expect(Selector('p').withText('You are now logged out').exists).ok()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
    
});

test(`should validate password input`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/login`)
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('form').exists).ok()
        .expect(Selector('input[disabled]').exists).ok()
        .expect(Selector('.validation-list > .error').nth(2).withText('Password must be greater than 10 characters.').exists).ok()
        .typeText('input[name="password"]', password)
        .expect(Selector('.validation-list').exists).ok()
        .expect(Selector('.validation-list > .error').nth(2).withText('Password must be greater than 10 characters.').exists).notOk()
        .expect(Selector('.validation-list > .success').nth(0).withText('Password must be greater than 10 characters.').exists).ok()
        .click(Selector('a').withText('Register'))
        .expect(Selector('.validation-list > .error').nth(3).withText('Password must be greater than 10 characters.').exists).ok()
});

test(`should show error if login credentials are incorrect`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/login`)
        .typeText('input[name="email"]', 'incorrect@email.com')
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))
    
    await t
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('.alert-success').exists).notOk()
        .expect(Selector('.alert-danger').withText('User does not exist.').exists).ok()

    await t
        .navigateTo(`${TEST_URL}/login`)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', 'badPassword123456')
        .click(Selector('input[type="submit"]'))
    
    await t
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('.alert-success').exists).notOk()
        .expect(Selector('.alert-danger').withText('User does not exist.').exists).ok()


});