describe(("Footer"),()=>{

context('with a single Todo',()=>{
    it(('check singular todo'),()=>{
        cy.sendAndVisit('GET',200,[{
            id:1,
            name:"Have Fun",
            isComplete:false
        }])
        
        cy.get('.todo-count').should('contain','1 todo left')
    })
})
 
context('with a multiple Todos',()=>{
    beforeEach(()=>{
        cy.sendAndVisit('GET',200,'fixture:todoWithOneChecked')
    })
    it(('check multiple todo'),()=>{
        // cy.sendAndVisit('GET',200,[{
        //     id:1,
        //     name:"Have Fun",
        //     isComplete:false
        // },{
        //     id:2,
        //     name:"Go Run",
        //     isComplete:false
        // },{
        //     id:3,
        //     name:"Eat Bun",
        //     isComplete:false
        // }])
        cy.get('.todo-count').should('contain','3 todos left')
    })

    it(('Check filter for active'),()=>{
        cy.contains('Active').click()

        cy.get('.todo-list li').should('have.length',3)
    })

    it(('Check filter for complete'),()=>{
        cy.contains('Completed').click()

        cy.get('.todo-list li').should('have.length',1)
    })
    it(('Check filters'),()=>{
        const filters=[
            {link:'Active', expLength:3},
            {link:'Completed', expLength:1},
            {link:'All', expLength:4}
        ]
        cy.wrap(filters).each(filter=>{

            cy.contains(filter.link).click()

            cy.get('.todo-list li').should('have.length',filter.expLength)
        })
    
    })

 
})
})