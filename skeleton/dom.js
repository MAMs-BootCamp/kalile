// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
let a = true
;(function () {
  // This is the dom node where we will keep our todo
  const container = document.getElementById('todo-container')
  const addTodoForm = document.getElementById('add-todo')
  const todoInput = document.querySelector('.input__description')
  const valid = document.querySelector('.vild')
  console.log(addTodoForm)
  let state = [] // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  const createTodoNode = function (todo) {
    const todoNode = document.createElement('li')

    // this add todo description node
    const todoTitle = document.createElement('span')
    todoTitle.classList.add('desc__span')
    todoNode.appendChild(todoTitle)
    todoTitle.setAttribute('id', todo.id)
    todoTitle.textContent = todo.description
    if (todo.done) {
      todoTitle.classList.toggle('done')
    }
    const boxBtn = document.createElement('div')

    container.appendChild(todoNode)
    // this adds the delete button
    const deleteButtonNode = document.createElement('button')
    boxBtn.appendChild(deleteButtonNode)
    todoNode.appendChild(boxBtn)

    deleteButtonNode.classList.add('button_delete')
    deleteButtonNode.textContent = 'delete'
    deleteButtonNode.addEventListener('click', function () {
      state = todoFunctions.deleteTodo(state, todo.id - 1)
      todoNode.remove()

      // make sure to make delete button full functional
      // hint: todoFunctions.deleteTodo
    })

    // add markTodo button
    const toggleDoneBtn = document.createElement('button')
    boxBtn.appendChild(toggleDoneBtn)
    toggleDoneBtn.textContent = todo.done ? 'undone' : 'done'
    toggleDoneBtn.classList.add('button_done')

    // mark todo ad done or not done
    let m = true

    toggleDoneBtn.addEventListener('click', (event) => {
      todoTitle.classList.toggle('done')
      if (!m) {
        toggleDoneBtn.textContent = 'done'
        m = true
      } else {
        toggleDoneBtn.textContent = 'undone'
        m = false
      }
      console.log(m)

      if (!todo.done) {
        state = [
          ...todoFunctions.deleteTodo(state, todo.id - 1),
          { ...todo, done: true, id: todo.id - 1 },
        ]
      } else {
        state = [
          ...todoFunctions.deleteTodo(state, todo.id - 1),
          { ...todo, done: false, id: todo.id - 1 },
        ]
      }
      todoFunctions.sortTodos(state)
      console.log(state)

      // hint: todoFunctions.markTodo and maybe you need to update dom!
    })

    return todoNode
  }

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {
      event.preventDefault()
      if (todoInput.value) {
        todoFunctions.addTodo(
          state,
          todoFunctions.createTodo(todoFunctions.generateId(), todoInput.value),
        )
        createTodoNode(
          todoFunctions.createTodo(todoFunctions.generateId(), todoInput.value),
        )
        todoInput.value = ''
      } else {
        valid.textContent = createTodo(
          todoFunctions.generateId(),
          todoInput.value,
        )
      }

      console.log(state)
      // console.log(todoFunctions.createTodo(new Date(), todoInput.value))
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?

      // what is inside event.target?
      const description = 'some desc' // event.target ....

      // hint: todoFunctions.addTodo

      // It's a good to clear input if everything is done
    })
  }

  // you should not need to change this function, BUT you do need to call it whenever the state change!
  const update = function (newState) {
    state = newState
    renderState(state)
  }

  // you do not need to change this function
  const renderState = function (state) {
    const todoListNode = document.createElement('ul')
    todoListNode.classList.add('ul__todo')

    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo))
    })

    container.replaceChild(todoListNode, container.firstChild)
  }

  if (container) renderState(state)
})()
