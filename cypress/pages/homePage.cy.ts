class HomePage {

    elements = {

        homePageWelcomeText: () => cy.get("app-greeting h3"),
        addmyFirstDebtBtn: () => cy.get(".mat-button-wrapper"),
        addFirstDebtBtn: () => cy.get('.mat-focus-indicator'),
        tabNavition: () => cy.get('.tabs div span'),
        debtFreeCountDownContainer: () => cy.get('.bg-1'),
        payOfProgressContainer: () => cy.get('.payoff-progress'),
        homePageImg: () => cy.get('.content-wrapper'),
        homeBtn: () => cy.get('.tabs > :nth-child(1)'),
        homePage_DebtFreeCountDown: () => cy.get('.content-wrapper')
    }
    HomePageMethod() {


        this.elements.homePageWelcomeText().should('have.text', 'Hi QA Test! Primary');
        this.elements.addmyFirstDebtBtn().should('be.visible').contains('Add my first debt');
        this.elements.debtFreeCountDownContainer().should('be.visible').contains('DEBT-FREE COUNTDOWN');
        this.elements.payOfProgressContainer().should('be.visible').contains('Payoff progress');

        //@ts-ignore
        this.elements.homePageImg().compareSnapshot('Home Page Before Debt', 0.5)


    }

    HomePageMethodAfterDebt() {
        cy.wait(2000)
        this.elements.homeBtn().click()
        cy.wait(2000)
        //@ts-ignore
        this.elements.homePageImg().compareSnapshot('Home Page After Debt', 0.5)



    }


}
export default HomePage