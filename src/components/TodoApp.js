import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { getTodo, saveTodo,deleteTodo,updateTodo } from '../lib/service'
import {filterTodo} from '../lib/utils'


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTodo:'',
      todos: []
    }
    this.HandleInput = this.HandleInput.bind(this)
    this.HandleSubmit = this.HandleSubmit.bind(this)
    this.HandleChecked = this.HandleChecked.bind(this)
    this.HandleDelete = this.HandleDelete.bind(this)
  }

  HandleInput(event){
    this.setState({currentTodo : event.target.value})
  }

 HandleSubmit(event){
  event.preventDefault()
  debugger
  const newTodo = {name:this.state.currentTodo,isComplete:false}
  saveTodo(newTodo).then((data)=>{
    this.setState({todos:this.state.todos.concat(data.data),currentTodo:""})
  }).catch((error)=>{this.setState({error:true})})
 }
 HandleChecked(id){
  
  const targetTodo = this.state.todos.find( t => t.id===id)
  const updatedTodo = {...targetTodo,isComplete:!targetTodo.isComplete}
  updateTodo(updatedTodo).then(({data})=>{
    const updatedTodos = this.state.todos.map(t=>t.id==data.id?data:t)
    this.setState({todos:updatedTodos})
    debugger
  }).catch(error=>{
    
  })

 }
 HandleDelete(id){
  deleteTodo(id).then(()=>{
    this.setState({todos:this.state.todos.filter(t=>t.id!=id)})
  }).catch((error)=>{})
  // this.setState({todos:this.state.todos.filter(t=>t.id!=1)})
 }
componentDidMount(){
  debugger
  getTodo().then((data)=>{
    this.setState({todos:data.data})
  }).catch((error)=>{this.setState({error:true})})

}
  render () {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>To-do Tasks</h1>
            {this.state.error ? <span className='error'>Error !</span>:null}
            <TodoForm currentTodo={this.state.currentTodo} HandleInput={this.HandleInput}
            HandleSubmit={this.HandleSubmit}/>
          </header>
          <section className="main">
            <Route path='/:filter?' render={({match})=>
              <TodoList 
              // todos={this.state.todos}
              todos={filterTodo(match.params.filter,this.state.todos)}
              HandleDelete={this.HandleDelete} HandleChecked={this.HandleChecked}/>
            }
            />
          </section>
          <Footer remaining={this.state.todos.filter(e => !e.isComplete).length}/>
        </div>
      </Router>
    )
  }
}
