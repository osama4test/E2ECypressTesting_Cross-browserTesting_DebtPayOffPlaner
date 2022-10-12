class ValidateAccountPage {

    elements = {

        verifyText: () => cy.get("app-validate header h4"),
        vcodeField: () => cy.get("input[type='number']:nth-child(1)"),
        verifyBtn: () => cy.get("button[type='submit']")

    }
    validateAccountMethod(vcodeValue) {


        this.elements.verifyText().should('have.text', 'Verify your email')
        this.elements.vcodeField().type(vcodeValue);
        this.elements.verifyBtn().click();


    }

}
export default ValidateAccountPage