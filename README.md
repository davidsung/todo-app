# Simple Todo CRUD API
In this repository, I demonstrate how to build a very TODO API with simple CRUD functionality using `node.js` and `postgresql` and spin it up using `docker-compose`

## How to create a `node.js` application from scratch
1. Create a folder for this application
```sh
mkdir todo-app
cd todo-app
```
2. Initialize git repository and `.gitignore`
```sh
git init
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore
```

3. Initialize a node.js express app with postgres client
```sh
npm init -y
npm i express pg -s
```
4. Update description/author/license in `package.json`
5. Coding persistence layer in `queries.js`
6. Coding app and route layer in `index.js`
7. Add `Dockerfile` & `.dockerignore`
8. Use Docker Compose for dev environment, create a file `docker-compose.yml` with 2 services 
  * `web`
```yml
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: todo
      POSTGRES_HOST: pg
      POSTGRES_PORT: 5432
    links:
      - pg
```
  * `postgres`
```yml
  pg:
    image: postgres:12
    ports:
      - "5432:5432"
    volumes:
      - postgres:/var/lib/postgresql/data
      - ./init-todo-db.sql:/docker-entrypoint-initdb.d/init-todo-db.sql
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: todo
```

9. Add db initialization script `init-todo-db.sql` 
10. Add `README.md` and `LICENSE.md`

## Spin up using `docker-compose`
```sh
docker-compose build
docker-compose up
```

## Create some tasks
```sh
curl -d "task=awesome task 1" -X POST localhost:3000/todos
curl -d "task=awesome task 2" -X POST localhost:3000/todos
```

## Get tasks
```sh
curl localhost:3000/todos
```

## Update tasks
```sh
curl -d "complete=true" -X PUT localhost:3000/todos/[id]
```

## Create github repository and push
Everything looks fine, time to commit code locally
```sh
git add .
git commit -m "Initial commit"
```
Go ahead to create a Github repository and push commits to remote
```sh
gh repo create
```

Example outputs
```sh
➜  todo-app git:(main) gh repo create
? What would you like to do? Push an existing local repository to GitHub
? Path to local repository .
? Repository name todo-app
? Description Simple Todo CRUD API using node.js and PostgreSQL
? Visibility Private
✓ Created repository davidsung/todo-app on GitHub
? Add a remote? Yes
? What should the new remote be called? origin
✓ Added remote https://github.com/somegeek/awesome-repo.git
? Would you like to push commits from the current branch to the "origin"? Yes
✓ Pushed commits to https://github.com/somegeek/awesome-repo.git
```  

Open up a browser to check
```sh
gh repo view --web
```
