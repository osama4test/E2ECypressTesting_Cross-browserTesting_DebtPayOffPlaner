import SignInPage from '../../pages/signInPage.cy'
import ValidateAccountPage from '../../pages/validateAccountPage.cy'
import DebtPage from '../../pages/debtPage.cy'
import HomePage from '../../pages/homePage.cy'
import DeleteAccount from '../../pages/deleteAccount.cy'


const clientUrl = "http://54.39.177.218:8080";
const serverUrl = "http://54.39.177.218:3020/api/v2";


const deleteAccount = new DeleteAccount()
const signIn = new SignInPage()
const validateAccount = new ValidateAccountPage()
const homePage = new HomePage()
const debtPage = new DebtPage()




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

        // must always delete the created account even if any of the above testing fails
        cy.request("DELETE", `${serverUrl}/test-accounts/uid/${credentials.uid}`)
            .then(response => {
                expect(response.status).to.be.equal(200);
            })
    })


    it('verifying home page before debts have been added', () => {



        // sign-in
        signIn.SignInMethod(credentials.username, credentials.password)

        // validate account
        validateAccount.validateAccountMethod(credentials.vcode.toString())
        cy.wait(3000)

        // verify that we are on the home page and see the correct greeting and workspace name

        homePage.HomePageMethod()


    })



    it('verifying debt page  after debt is added', () => {


        // sign-in
        signIn.SignInMethod(credentials.username, credentials.password)

        // validate account
        validateAccount.validateAccountMethod(credentials.vcode.toString())

        cy.wait(3000)
        // verify that we are on the home page and see the correct greeting and workspace name

        debtPage.AddDebtMethod(value.nickName, value.currentBalance, value.annualPercentageRate, value.minimumPayment)

        debtPage.AddCalenderDetails(value.calenderYear, value.calenderMonth, value.calenderMonthAndDay)

        cy.wait(2000)

        homePage.HomePageMethodAfterDebt()
        cy.wait(2000)
        deleteAccount.DeleteAccountMethod(credentials.password)

    })


})