import  axios from 'axios'
const baseUrl = 'http://localhost:3030'

export const saveTodo=(todo)=>{
   return axios.post(baseUrl+'/api/todos',todo)
}
export const getTodo=()=>
     axios.get(baseUrl+'/api/todos')

export const deleteTodo=(id)=>
     axios.delete(baseUrl+`/api/todos/${id}`)

export const updateTodo=(todo)=> 
       axios.put(baseUrl+`/api/todos/${todo.id}`,todo)
 