class DeptPage {

    //All the css selectors 

    elements = {

        addFirstDebtBtn: () => cy.get('.mat-focus-indicator'),

        debtsHeader: () => cy.get('h3'),
        addDebtBtn: () => cy.get('.mobile > app-pro-gated-button > .mat-focus-indicator'),
        nickNameTextField: () => cy.get('#formly_18_input_debt_name_0'),
        currentBalanceField: () => cy.get('#formly_18_input_current_balance_1'),
        annualPercentageRate: () => cy.get('#formly_18_input_no_promo_apr_2'),
        miniumumPayment: () => cy.get('#formly_18_input_minimum_payment_amount_7'),
        datePicker: () => cy.get('#formly_18_datepicker_next_due_date_12'),
        calenderAfterOpen: () => cy.get('.mat-calendar-header'),
        calenderAfterOpenYearDropdown: () => cy.get('.mat-calendar-period-button'),
        calenderYear: () => cy.get('.mat-calendar-body td'),
        calenderMonthAndDay: () => cy.get('.mat-calendar-content'),
        saveBtn: () => cy.get('.add-simple-button'),



        //Debt plan created elements
        planCard: () => cy.get('app-account-card'),
        completeDebtAfterPageImg: () => cy.get('.wrapper'),
        //below code path to be changed
        balanceByCategoryImg: () => cy.get('.swiper-slide-visible > .chart-content > app-pie-chart.ng-star-inserted > .pie-chart > .chart > .chartjs-render-monitor')
    }

    //Clicking add debt button for adding debt details 
    verifyAddDeptHeader() {
        this.elements.addFirstDebtBtn().click()

        this.elements.debtsHeader().should('have.text', 'Debts ')




    }

    //Adding all the debt details
    AddDeptMethod(nickname, currBal, annPercent, miniPay) {
        this.elements.addDebtBtn().click()
        this.elements.nickNameTextField().type(nickname)
        this.elements.currentBalanceField().type(currBal)
        this.elements.annualPercentageRate().type(annPercent)
        this.elements.miniumumPayment().type(miniPay)




    }
    //Adding calender details after calender opens
    AddCalenderDetails(calenYear, calenMon, calenDay) {
        this.elements.datePicker().click()
        this.elements.calenderAfterOpen().click()
        this.elements.calenderAfterOpenYearDropdown().click()
        this.elements.calenderYear().contains(calenYear).click()
        this.elements.calenderMonthAndDay().contains(calenMon).click()
        this.elements.calenderMonthAndDay().contains(calenDay).click()
        this.elements.saveBtn().click()
        cy.wait(4000)
        this.elements.planCard().last().should('be.visible')
        //After Debt is added taking screenshots for compare
        // @ts-ignore
        this.elements.completeDebtAfterPageImg().compareSnapshot('.wrapper')


    }

}
export default DeptPage