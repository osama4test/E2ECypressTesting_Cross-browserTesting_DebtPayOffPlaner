class HomePage {

    elements = {

        homePageWelcomeText: () => cy.get("app-greeting h3"),
        addmyFirstDebtBtn: () => cy.get(".mat-button-wrapper"),
        addFirstDebtBtn: () => cy.get('.mat-focus-indicator'),
        tabNavition: () => cy.get('.tabs div span'),
        debtFreeCountDownContainer: () => cy.get('.bg-1'),
        payOfProgressContainer: () => cy.get('.payoff-progress'),
        homePageBeforeDeptImg: () => cy.get('.content-wrapper'),
        homeBtn: () => cy.get('.tabs > :nth-child(1)'),
        homePageAfterDeptImg: () => cy.get('.content-wrapper')
    }
    HomePageMethod() {


        this.elements.homePageWelcomeText().should('have.text', 'Hi QA Test! Primary');
        this.elements.addmyFirstDebtBtn().should('be.visible').contains('Add my first debt');
        this.elements.debtFreeCountDownContainer().should('be.visible').contains('DEBT-FREE COUNTDOWN');
        this.elements.payOfProgressContainer().should('be.visible').contains('Payoff progress');

        //@ts-ignore
        this.elements.homePageBeforeDeptImg().compareSnapshot({ force: true })


    }

    HomePageMethodAfterDebt() {
        this.elements.homeBtn().click()
        //@ts-ignore

        this.elements.homePageAfterDeptImg().compareSnapshot()



    }


}
export default HomePage