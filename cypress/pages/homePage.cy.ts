class HomePage {

    elements = {

        homePageWelcomeText: () => cy.get("app-greeting h3"),
        addmyFirstDebtBtn: () => cy.get(".mat-button-wrapper"),
        addFirstDebtBtn: () => cy.get('.mat-focus-indicator'),
        tabNavition: () => cy.get('.tabs div span')
    }
    HomePageMethod() {


        this.elements.homePageWelcomeText().should('have.text', 'Hi QA Test! Primary');
        this.elements.addmyFirstDebtBtn().should('be.visible').contains('Add my first debt');
        this.elements.addFirstDebtBtn().should('be.visible').click()
        // this.elements.tabNavition().should('have.length', '10')



    }
    // GoToDebtsPage() {


    //     this.elements.tabNavition().each(function ($el, index, $listsOfElements) {
    //         // cy.log($el.text())

    //         if ($el.text() == 'Debts') {

    //             cy.wrap($el).click()
    //         }
    //     })


    // }

}
export default HomePage