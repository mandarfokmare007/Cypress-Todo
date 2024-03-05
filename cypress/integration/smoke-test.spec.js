describe(('Smoke Test'),()=>{
    beforeEach(()=>{
        cy.request('GET','/api/todos').its('body').each(todo=> cy.request('DELETE',`/api/todos/${todo.id}`))
    })
    context('with no Todos',()=>{
        it('save new todo',()=>{
            const items = [
                {text:"Have Fun",expLength:1},
                {text:"Go Run",expLength:2},
                {text:"Eat Bun",expLength:3}
            ]
            cy.visit('/')
            cy.server()
            cy.route('post','/api/todos').as('create')

            cy.wrap(items).each(todo=>{
            cy.focused().type(todo.text).type('{enter}')

            // cy.wait('@create')
            cy.get('.todo-list li').should('have.length',todo.expLength)
            })
            
        })
    })

    context('with active Todos',()=>{
        beforeEach(()=>{
            cy.fixture('todos').each(todo=>{
                const newTodo = Cypress._.merge(todo,{isCompleted:false})
                cy.request('POST','/api/todos/',newTodo)
            })
            cy.visit('/')
        })
       
        it('Loads Data',()=>{
            cy.get('.todo-list li').should('have.length',4)
        })

        it('Deletes Data',()=>{
            cy.server()
            cy.route('DELETE','/api/todos/*').as('delete')
            cy.get('.todo-list li')
                .each($el=>{
                cy.wrap($el)
                .find('.destroy')
                .invoke('show')
                .click()

                cy.wait('@delete')
            }).should('not.exist')
        })

        it('Toggle todos',()=>{
            const ClickAndWait =($todo)=>{
                cy.wrap($todo).as('item')
                .find('.toggle')
                .click()

                cy.wait('@update')
            }
            cy.server()
            cy.route('PUT','/api/todos/*').as('update')
            cy.get('.todo-list li')
                .each($todo=>{
                    ClickAndWait($todo)

                cy.get('@item').should('have.class','completed')
            }).each($todo=>{
                ClickAndWait($todo)

                cy.get('@item').should('not.have.class','completed')
            })
        })
    })
})