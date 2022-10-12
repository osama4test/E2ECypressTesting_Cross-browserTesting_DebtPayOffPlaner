class SignInPage {

    elements = {

        emailTextField: () => cy.get("input[type='email']"),

        passTextField: () => cy.get("input[type='password']"),

        signInBtn: () => cy.get("button[type='submit']")
    }

    SignInMethod(usernameValue, userPassValue) {


        this.elements.emailTextField().type(usernameValue).should('have.value', usernameValue);

        this.elements.passTextField().type(userPassValue).should('have.value', userPassValue);

        this.elements.signInBtn().click()



    }

}
export default SignInPage