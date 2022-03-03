const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

const getTodos = (request, response) => {
  pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTodoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTodo = (request, response) => {
  const { task } = request.body

  pool.query('INSERT INTO todos (task, complete) VALUES ($1, $2) RETURNING id', [task, false], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Todo added with ID: ${results.rows[0].id}`)
  })
}

const updateTodo = (request, response) => {
  const id = parseInt(request.params.id)
  const { complete } = request.body

  pool.query(
    'UPDATE todos SET complete = $1 WHERE id = $2',
    [complete.toLowerCase() === 'true', id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Todo modified with ID: ${id}`)
    }
  )
}

const deleteTodo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount > 0) {
      response.status(200).send(`Todo deleted with ID: ${id}`)
    }
    else {
      response.status(404).send()
    }
  })
}

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
}