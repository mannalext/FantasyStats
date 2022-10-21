# FantasyStats

## Running The Application

- `npm run dev:fresh`

  - Brings up the app with a fresh database

- `npm run dev:watch`

  - Brings the app up with the existing database in watch mode and attaches a debugger

- `npm run test`

  - Runs the fake ports tests

- `npm run testWatch'

  - Runs the fake ports tests in watch mode

- `npm run testRealPorts`

  - Runs the real ports tests (real === uses the database and actual implementations)

- `npm run testWatchRealPorts`
  - Runs the real ports tests in watch mode

## Accessing the Swagger Documentation

- Bring the application up normally and navigate to `http://localhost:9090/swagger`. This can be configured in the private `enableSwaggerDocs` function

- `swagger.json` powers the spec and that file should be automatically updated every time a controller is edited
