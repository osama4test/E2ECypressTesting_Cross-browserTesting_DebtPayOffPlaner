import SignInPage from '../../pages/signInPage.cy'
import ValidateAccountPage from '../../pages/validateAccountPage.cy'
import DeleteAccount from '../../pages/deleteAccount.cy'


type NewAccountCredentials = {
  username: string,
  password: string,
  vcode: number,
  uid: string
};



const clientUrl = "http://54.39.177.218:8080";
const serverUrl = "http://54.39.177.218:3020/api/v2";

const signIn = new SignInPage()
const validateAccount = new ValidateAccountPage()
const deleteAccount = new DeleteAccount()

describe('Smoke test', () => {

  let credentials
  let value
  beforeEach(() => {
    cy.viewport(390, 844);

    cy.fixture('addDebtDetails')
      .then((data) => value = data)
    // create a new non-validated account in the back-end
    cy.request(serverUrl + '/test-accounts/free')
      .then(response => {
        expect(response.body).to.have.property("username");
        credentials = response.body;
      })

    cy.visit(clientUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      }
    });
  });

  afterEach(() => {
    /* CLEANUP AFTER EACH TEST */

    deleteAccount.DeleteAccountMethod(credentials.password)
    cy.wait(3000)
    // must always delete the created account even if any of the above testing fails
    cy.request("DELETE", `${serverUrl}/test-accounts/uid/${credentials.uid}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
      })
  })

  it('verifying a new user is able to login followed by validation being performed', () => {

    // sign-in
    signIn.SignInMethod(credentials.username, credentials.password)

    // validate account
    validateAccount.validateAccountMethod(credentials.vcode.toString())

    cy.wait(3000)
    // verify that we are on the home page and see the correct greeting and workspace name
    cy.get("app-greeting h3").should('have.text', 'Hi QA Test! Primary');


  })

})