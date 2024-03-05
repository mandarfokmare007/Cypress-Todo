import React from 'react'

const TodoItem = props =>
  <li className={props.isComplete?"completed":""}>
    <div className="view">
      <input className="toggle" type="checkbox" checked={props.isComplete} onClick={()=>{props.HandleChecked(props.id)}} />
      <label>
        {props.name}
      </label>
      <button className="destroy" onClick={()=>props.HandleDelete(props.id)}/>
    </div>
  </li>

export default props =>

  <ul className="todo-list">
    {props.todos.map(todo =>
    <TodoItem key={todo.id} {...todo} HandleDelete={props.HandleDelete} HandleChecked={props.HandleChecked}/>
    )}
  </ul>
