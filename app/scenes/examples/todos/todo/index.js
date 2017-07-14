import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'kea'

import sceneLogic from '~/scenes/examples/todos/logic'

const ESCAPE = 27
const ENTER = 13

@connect({
  actions: [
    sceneLogic, [
      'renameTodo',
      'removeTodo',
      'completeTodo',
      'unCompleteTodo',
      'setEditing',
      'updateEditValue',
      'clearEditing'
    ]
  ]
})
export default class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  }

  componentDidUpdate (prevProps) {
    if (this.props.todo.editing && !prevProps.todo.editing) {
      const node = this.refs.editField
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  updateEditValue = (e) => {
    const { todo } = this.props
    const { updateEditValue } = this.actions

    updateEditValue(todo.id, e.target.value)
  }

  onKeyDown = (e) => {
    const { todo } = this.props
    const { clearEditing } = this.actions

    if (e.keyCode === ESCAPE) {
      clearEditing(todo.id)
    } else if (e.keyCode === ENTER) {
      this.saveTodo()
    }
  }

  saveTodo = () => {
    const { todo } = this.props
    const { renameTodo, clearEditing, removeTodo } = this.actions
    const { value } = this.refs.editField

    if (value.trim()) {
      renameTodo(todo.id, value.trim())
      clearEditing(todo.id)
    } else {
      removeTodo(todo.id)
    }
  }

  render () {
    const { todo } = this.props
    const { unCompleteTodo, completeTodo, setEditing, removeTodo } = this.actions

    return (
      todo.editing ? (
        <li className='editing'>
          <input className='edit'
                 type='text'
                 ref='editField'
                 value={todo.editValue}
                 onKeyDown={this.onKeyDown}
                 onChange={this.updateEditValue}
                 onBlur={this.saveTodo} />
        </li>
      ) : (
        <li className={todo.completed ? 'completed' : ''}>
          <div className='view'>
            <input className='toggle'
                   checked={todo.completed}
                   type='checkbox'
                   onChange={() => todo.completed ? unCompleteTodo(todo.id) : completeTodo(todo.id)} />
            <label onTouchEnd={() => setEditing(todo.id)}
                   onDoubleClick={() => setEditing(todo.id)}>
              {todo.value}
            </label>
            <button className='destroy'
                    onClick={() => removeTodo(todo.id)} />
          </div>
        </li>
      )
    )
  }
}
