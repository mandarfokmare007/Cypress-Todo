import React from 'react'

export default props =>
  <form onSubmit={props.HandleSubmit}>
    <input
      type='text'
      autoFocus
      value={props.currentTodo}
      onChange={(e)=>{props.HandleInput(e)}}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
