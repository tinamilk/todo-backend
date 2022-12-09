
# ToDo List
Be a productive and successful worker 👨‍💻 Backend project for ToDo List.

You can use it with [Frontend project](https://github.com/tinamilk/todolist.git).

### Demo

Fullstack [Demo](https://tinamilk.github.io/todolist/)


### Run locally

```bash
  npm install // Install all dependencies
  npx sequelize-cli db:migrate // Create a migration
  npx sequelize-cli db:seed:all // Create demo task
  npm run dev // Run development
```
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`HOST` - Ffor example, 'localhost' for local usage
`USER_NAME` - PSQL user
`PASSWORD`- PSQL password
`DB` - Database name

`PORT` - Port to run app
`PSQL_DATA`- PSQL url for external database
`HOST_URL` - url for cors usage
