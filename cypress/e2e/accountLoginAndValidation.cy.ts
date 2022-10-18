import SignInPage from '../pages/signInPage.cy'
import ValidateAccountPage from '../pages/validateAccountPage.cy'
import DeleteAccount from '../pages/deleteAccount.cy'


type NewAccountCredentials = {
  username: string,
  password: string,
  vcode: number,
  uid: string
};



const clientUrl = "http://54.39.177.218:8080";
const serverUrl = "http://54.39.177.218:3020/api/v2";
let credentials

describe('Smoke test', () => {

  /* BEFORE EACH TEST */

  // create a new non-validated account in the back-end
  beforeEach("function", async () => {
    cy.viewport(390, 844);
    credentials = await new Promise<NewAccountCredentials>((resolve) => {
      cy.request(serverUrl + '/test-accounts/free').then(response => {
        expect(response.body).to.have.property("username");
        resolve(response.body);
      })

    });

    cy.visit(clientUrl, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      }
    });

  })



  it('verifying a new user is able to login followed by validation being performed', async () => {
    const signIn = new SignInPage()
    const validateAccount = new ValidateAccountPage()
    const deleteAccount = new DeleteAccount()

    // sign-in
    signIn.SignInMethod(credentials.username, credentials.password)

    // validate account
    validateAccount.validateAccountMethod(credentials.vcode.toString())

    // verify that we are on the home page and see the correct greeting and workspace name
    cy.get("app-greeting h3").should('have.text', 'Hi QA Test! Primary');



    //account deleted
    deleteAccount.DeleteAccountMethod(credentials.password)

    //wait added for the account to get deleted firs then the session
    cy.wait(4000)

    // must always delete the created account even if any of the above testing fails
    await new Promise<void>((resolve) => {
      cy.request("DELETE", `${serverUrl}/test-accounts/uid/${credentials.uid}`).then(response => {
        expect(response.status).to.be.equal(200);
        resolve();
      })
    });


  })



})