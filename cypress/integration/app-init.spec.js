describe(("App Initialization"),()=>{

    it(("load todos"),()=>{
        cy.sendAndVisit('GET',200,'fixture:todos')
        cy.get(".todo-list li").should("have.length",4)
    })
   
    it(("check error message"),()=>{
        cy.sendAndVisit('GET',500,{})
        cy.get(".todo-list li").should("have.length",0)
        cy.get('.error').should('be.visible')
    })
})