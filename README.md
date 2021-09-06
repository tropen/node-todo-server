# Node Todo Server 🛠

1. `git clone https://github.com/tropen/node-todo-server.git`
2. `cd node-todo-server && cp .env-example .env`
3. paste mongo uri to .env file
4. `npm install` dependencies installment
5. `npm start` start server

## Optionally 🔩 
`npm run start:dev` starts server in development mode with nodemon for faster development process.
To fix cors set `NODE_ENV=dev` in .env file 

## Endpoints 🔨
Api is available at `HOST:PORT` (default: `http://localhost:5000`) with the only prefix `/api/v1/`.
Server is configured to be development. This disables CORS blocking for client-url `http://localhost:3000`

public:
 * `POST /api/v1/signin` - returns AUTH_KEY

under authKey middleware:
* `GET HOST:PORT/api/v1/user` - get all users

* `GET /api/v1/todo` - returns all todos with populated refs of user owners.
* `POST /api/v1/todo` - inserts one new todo. Body should have essential fields. `user_id` is ref to users collection = `user.id`
* `PATCH /api/v1/todo/toggle` - updates `done` field in doc. request.body must have the `id` of todo 
* `DELETE /api/v1/todo` - deletes doc from collection. request.body must have the `id` of todo
