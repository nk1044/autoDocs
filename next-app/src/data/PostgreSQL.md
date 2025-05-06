# Introduction

PostgreSQL is a powerful, open-source relational database. Docker allows us to run PostgreSQL in a containerized environment efficiently. This guide covers the installation, configuration, and useful commands to manage PostgreSQL with Docker.

# Setting up PostgreSQL with Docker

To install PostgreSQL in a Docker container, create a \`docker-compose.yml\` file with the following content:

```yaml
version: '3.8'
services:
  db:
    image: postgres\:latest
    restart: always
    ports:
      \- "5432:5432"
    environment:
      POSTGRES\_DB: TestDB
      POSTGRES\_USER: TestUser
      POSTGRES\_PASSWORD: TestUserPassword
    volumes:
      \- ./data/db:/var/lib/postgresql/data
    healthcheck:
      test: \["CMD-SHELL", "pg\_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
  adminer:
    image: adminer
    restart: always
    ports:
      \- "8080:8080"
```

Run the following command to start PostgreSQL:

```bash
docker-compose up -d
```

# Accessing PostgreSQL

Once the container is running, you can access PostgreSQL using the following connection URL:

```plaintext
postgresql://TestUser\:TestUserPassword\@localhost:5432/TestDB
```

Alternatively, use the `psql` command inside the running container:

```bash
docker exec -it \<container\_id> psql -U TestUser -d TestDB
```

# Important PostgreSQL Commands

* `CREATE DATABASE mydb;` - Create a new database.
* `DROP DATABASE mydb;` - Delete a database.
* `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);` - Create a table.
* `INSERT INTO users (name) VALUES ('John Doe');` - Insert a record.
* `SELECT \* FROM users;` - Retrieve data.

# Stopping and Removing Containers


```bash
# To stop and remove the running PostgreSQL container, use:
docker-compose down

# To remove volumes and associated data:
docker-compose down -v
```