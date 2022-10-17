import SignInPage from '../pages/signInPage.cy'
import ValidateAccountPage from '../pages/validateAccountPage.cy'
import DeptPage from '../pages/deptPage.cy'
import HomePage from '../pages/homePage.cy'

type NewAccountCredentials = { username: string, password: string, vcode: number, uid: string };

const URLS = {
    remote: {
        client: "http://54.39.177.218:8080",
        server: "http://54.39.177.218:3020/api/v2"
    }
}

const urlTarget = "remote";

const clientUrl = URLS[urlTarget].client;
const serverUrl = URLS[urlTarget].server;

const signIn = new SignInPage()
const validateAccount = new ValidateAccountPage()
const deptPage = new DeptPage()
const homePage = new HomePage()





describe('Smoke test', () => {
    it('verifying debt page  after debt is added', async () => {

        /* BEFORE EACH TEST */
        let value
        cy.fixture('addDebtDetails').then(function (data) {

            value = data

        })





        cy.viewport(390, 844);
        // create a new non-validated account in the back-end
        let credentials = await new Promise<NewAccountCredentials>((resolve, reject) => {
            cy.request(serverUrl + '/test-accounts/free').then(response => {
                expect(response.body).to.have.property("username");
                resolve(response.body);
            })
        });



        // load the app - should default to the sign-in page

        cy.visit(clientUrl, {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
                win.localStorage.clear();
            }
        });


        // sign-in
        signIn.SignInMethod(credentials.username, credentials.password)

        // validate account
        validateAccount.validateAccountMethod(credentials.vcode.toString())

        // verify that we are on the home page and see the correct greeting and workspace name
        cy.get("app-greeting h3").should('have.text', 'Hi QA Test! Primary');



        deptPage.AddDeptMethod(value.nickName, value.currentBalance, value.annualPercentageRate, value.minimumPayment)

        deptPage.AddCalenderDetails(value.calenderYear, value.calenderMonth, value.calenderMonthAndDay)

        homePage.HomePageMethodAfterDebt()

        /* CLEANUP AFTER EACH TEST */

        // must always delete the created account even if any of the above testing fails
        await new Promise<void>((resolve, reject) => {
            cy.request("DELETE", `${serverUrl}/test-accounts/uid/${credentials.uid}`).then(response => {
                expect(response.status).to.be.equal(200);
                resolve();
            })
        });

    })
})