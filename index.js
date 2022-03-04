const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/healthz', (request, response) => {
  console.log("Received request at: /healthz")
  const healthz = {
		uptime: process.uptime(),
		version: process.env.npm_package_version,
		timestamp: Date.now()
	};
  response.json(healthz)
})

app.get('/todos', db.getTodos)
app.get('/todos/:id', db.getTodoById)
app.post('/todos', db.createTodo)
app.put('/todos/:id', db.updateTodo)
app.delete('/todos/:id', db.deleteTodo)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})