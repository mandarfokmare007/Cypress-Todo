export const filterTodo = (match,todos)=>
    match?todos.filter(e=>e.isComplete===(match==="completed")):todos
