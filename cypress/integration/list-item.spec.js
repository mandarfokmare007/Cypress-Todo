describe(("Test list items"),()=>{
beforeEach(()=>{
    cy.sendAndVisit('GET',200,'fixture:todos')
})
const TodoWithOneChecked = [
    {
      "name":"Study React",
      "id":1,
      "isComplete":false
    },
    {
      "name":"Walk 5KM",
      "id":2,
      "isComplete":true
    },
    {
      "name":"Drink 5 litre water",
      "id":3,
      "isComplete":false
    },
    {
      "name":"Grocery",
      "id":4,
      "isComplete":false
    }
   ]
    context('with one Completed',()=>{
        // beforeEach(()=>{
        //     cy.fixture('todos').each(todo=>{
        //        const newTodo =  Cypress._.merge(todo,{isComplete:true})
        //         cy.request('PUT',`/api/todos/${newTodo.id}`,newTodo)
        //     })
        //     cy.visit('/')
        // })

    it(("Display checked on completed items"),()=>{
        cy.get('.todo-list li').first().find('.toggle').click()
        cy.get('.todo-list li').filter('.completed').should('have.length',1)
        .find('.toggle').should('be.checked')
    })
    })
   


    it(("Check Footer Count"),()=>{
        cy.get('.todo-list li:not(.completed)').its('length').then((count) => {
            cy.get('.todo-count').should('contain',count)
          });
      
    })

    it(("Remove Todo"),()=>{
        cy.route('DELETE','api/todos/1',{})
        cy.get('.todo-list li').as('list')
        cy.get('@list').first().find('.destroy').invoke('show').click()
        cy.get('@list').should('have.length',3).and('not.contain','study')
      
    })

    it(("Mark Completed"),()=>{
       cy.fixture('todos').then(todos=>{
        const target = Cypress._.head(todos)
        cy.route(
            'PUT',
            `/api/todos/${target.id}`,
            Cypress._.merge(target, {isComplete:true})
        )
       })    
       
       cy.get('.todo-list li').first().as('first-todo')

       cy.get('@first-todo').find('.toggle').click()

       cy.get('@first-todo').should('have.class','completed')

       cy.get('.todo-count').should('contain',3)

      
    })
})