const logic = require('./logic')

test('creat new item', () => {
  expect(logic.createTodo(1, 'Kakashi')).toEqual({
    id: 1,
    description: 'Kakashi',
    done: false,
  })
})
test('creat new item', () => {
  expect(logic.createTodo(1, '')).toEqual('add to do')
})
test('Testing Jest is working', function () {
  expect(logic.deleteTodo([{ id: 1 }], 1)).toEqual([])
})
test('add new item to array', () => {
  expect(logic.addTodo([], { name: 'kakashi' })).toEqual([{ name: 'kakashi' }])
})

test('add new item to array', () => {
  expect(logic.markTodo([{ id: 1 }], 1)).toEqual({ id: 1 })
})
test('add new item to array', () => {
  expect(logic.sortTodos([{ id: 20 }, { id: 40 }, { id: 30 }])).toEqual([
    { id: 20 },
    { id: 30 },
    { id: 40 },
  ])
})

// make sure to test all functions in logic.js below
