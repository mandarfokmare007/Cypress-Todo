const hostUrl = "http://localhost:3030";
describe("Input Form", () => {
  beforeEach(()=>{
    // cy.visit(hostUrl);
    cy.sendAndVisit('GET',200,[])
  })
  it("Input Form is focused", () => {
    cy.focused().should('have.class','new-todo')
  });

  it("let us type", () => {
    let inputValue = "Study React"
    cy.get(".new-todo").type(inputValue).should('have.value',inputValue);
  });

  context("Form submission",()=>{  
    beforeEach(()=>{
      cy.server()
    })
    it("Add new todo",()=>{
      const itemText = "Walk 5KM"
      cy.route('POST',"/api/todos",{
        name:itemText,
        id:1,
        isCompleted:false
      })
      cy.get(".new-todo").type(itemText).type('{enter}').should("have.value",'')
      cy.get(".todo-list li").should("have.length",1).and("contain",itemText)
    })

    it(("check error"),()=>{
      cy.route({url:"/api/todos",method:"POST",status:500,response:{}})

      cy.get(".new-todo").type("test{enter}")

      cy.get(".todo-list li").should("not.exist")

      cy.get(".error").should("be.visible")
    })
  })
});
