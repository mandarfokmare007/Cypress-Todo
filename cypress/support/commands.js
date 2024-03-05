
Cypress.Commands.add("sendAndVisit", (method,status,response) => { 
    cy.server()
    cy.route({method:method, url:'/api/todos',response:response,status:status})
    cy.visit("/") })

