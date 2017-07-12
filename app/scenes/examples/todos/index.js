import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import Todo from './todo'

import sceneLogic from './logic'

const {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED
} = sceneLogic.constants

const ENTER = 13

@connect({
  actions: [
    sceneLogic, [
      'showAll',
      'showActive',
      'showCompleted',
      'addTodo',
      'toggleAll',
      'clearCompleted'
    ]
  ],
  props: [
    sceneLogic, [
      'visibilityFilter',
      'visibleTodos',
      'todoCount',
      'activeTodoCount',
      'completedTodoCount'
    ]
  ]
})
export default class TodosScene extends Component {
  handleToggleAll = (e) => {
    const { toggleAll } = this.props.actions
    toggleAll(e.target.checked)
  }

  handleKeyDown = (e) => {
    const { addTodo } = this.props.actions

    if (e.keyCode === ENTER) {
      const node = this.refs.newTodo

      if (node.value.trim()) {
        addTodo(node.value.trim())
        node.value = ''
      }
    }
  }

  render () {
    const { visibilityFilter, visibleTodos, todoCount, activeTodoCount, completedTodoCount } = this.props
    const { showAll, showActive, showCompleted, clearCompleted } = this.actions

    return (
      <div className='todo-scene'>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input ref='newTodo' className='new-todo' placeholder='What needs to be done?' onKeyDown={this.handleKeyDown} />
          </header>
          {todoCount > 0 ? (
            <section className='main'>
              <input className='toggle-all' type='checkbox' onChange={this.handleToggleAll} checked={activeTodoCount === 0} />
              <ul className='todo-list'>
                {visibleTodos.map(todo => <Todo key={todo.id} todo={todo} />)}
              </ul>
            </section>
          ) : null}
          {todoCount > 0 ? (
            <footer className='footer'>
              <span className='todo-count'>
                {activeTodoCount} {activeTodoCount === 1 ? 'todo' : 'todos'} left
              </span>
              <ul className='filters'>
                <li>
                  <a href='#' onClick={showAll} className={visibilityFilter === SHOW_ALL ? 'selected' : ''}>All</a>
                </li>
                <li>
                  <a href='#' onClick={showActive} className={visibilityFilter === SHOW_ACTIVE ? 'selected' : ''}>Active</a>
                </li>
                <li>
                  <a href='#' onClick={showCompleted} className={visibilityFilter === SHOW_COMPLETED ? 'selected' : ''}>Completed</a>
                </li>
              </ul>
              {completedTodoCount > 0 ? (
                <button className='clear-completed' onClick={clearCompleted}>Clear completed</button>
              ) : null}
            </footer>
          ) : null}
        </section>
        <footer className='info'>
          <p>
            Double-click to edit a todo
          </p>
          <p>
            Created by <a href='https://github.com/mariusandra'>mariusandra</a>
          </p>
        </footer>
      </div>
    )
  }
}
