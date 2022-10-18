class DeleteAccount {

    elements = {

        profileIcon: () => cy.get('.fa-user-circle'),
        myAccountBtn: () => cy.get('.items > :nth-child(1)'),
        deleteAccountBtn: () => cy.get('.delete > .body-heavy'),
        inputPass: () => cy.get('.mat-form-field-infix'),
        confirmPassBtn: () => cy.get('form.ng-dirty > .mat-focus-indicator'),
        deleteMyAccBtn: () => cy.get('.danger')
    }
    DeleteAccountMethod(pass) {


        this.elements.profileIcon().click()
        this.elements.myAccountBtn().click()
        this.elements.deleteAccountBtn().click()
        this.elements.inputPass().type(pass)
        this.elements.confirmPassBtn().click()
        this.elements.deleteMyAccBtn().click()


        //@ts-ignore


    }


}
export default DeleteAccount