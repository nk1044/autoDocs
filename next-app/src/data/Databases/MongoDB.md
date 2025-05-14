# Introduction

`MongoDB` is a popular **NoSQL** database known for its flexibility and scalability. With Docker, we can run MongoDB in a containerized environment quickly and efficiently. This guide covers the installation, configuration, and essential commands to manage MongoDB using Docker.


# Setting up MongoDB with Docker

To set up MongoDB using Docker, create a `docker-compose.yml` file with the following configuration:

```yaml
version: '3.8'
services:
  mongo:
    image: mongo:latest
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: rootpassword
    volumes:
      - ./data/mongo:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: rootpassword
      ME_CONFIG_MONGODB_URL: mongodb://root:rootpassword@mongo:27017/
```

Start the MongoDB container with:

```bash
docker-compose up -d
```


# Accessing MongoDB

## MongoDB URI

```plaintext
mongodb://root:rootpassword@localhost:27017/
```

## Access via CLI 

You can connect to the MongoDB container using:

```bash
docker exec -it <container_id> mongosh -u root -p rootpassword
```

Or, if you're using the default service name from the compose file:

```bash
docker exec -it <project-name>_mongo_1 mongosh -u root -p rootpassword
```


# Important MongoDB Commands

* `show dbs` – List all databases
* `use mydb` – Switch to (or create) a database
* `db.createCollection("users")` – Create a collection
* `db.users.insertOne({ name: "John Doe" })` – Insert a document
* `db.users.find()` – Retrieve all documents in a collection
* `db.dropDatabase()` – Drop the current database


# Stopping and Removing Containers

```bash
# Stop and remove all services
docker-compose down

# Remove containers, networks, and volumes
docker-compose down -v
```
