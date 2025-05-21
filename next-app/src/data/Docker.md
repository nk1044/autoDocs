# Docker Images

To list available images, use `docker images`. You can run an image in a container using `docker run -it <image_name/id>`. If the image is not present locally, it will be pulled from **Docker Hub**. Learn more [here](https://docs.docker.com/reference/cli/docker/image/).


## Code Example 

```bash
# List available images
docker images

# Run an image in a container
docker run -it <image_name/id>

# Run an image with port mapping
docker run -it -p 1025:1025 <image_name/id>
```

## Options Table

| Option                         | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| --name                         | Set a custom name for the container              |
| --rm                           | Remove the container after use                   |
| -it                            | Interactive mode                                 |
| -d                             | Detach mode (run in background)                  |
| -p host_port:container_port    | Port mapping between local machine and container |

## Key Points about Images

* A container is a running environment for an image.
* `-it` enables an interactive terminal.
* `-d` allows running in detached mode.
* If the image is not found locally, Docker pulls it from Docker Hub.
* `-p` flag is used for port mapping (host:container).


# Docker Containers

To list all running containers, use `docker container ls` or `docker ps`. To see all containers, including stopped ones, use `docker container ls -a`. Learn more [here](https://docs.docker.com/reference/cli/docker/container/).

## Code Example 

```bash
# List all running containers
docker container ls
docker ps

# List all containers (running + stopped)
docker container ls -a

# Start a container
docker start <container_name/id>

# Stop a container
docker stop <container_name/id>

# Execute a command inside a running container
docker exec <container_name/id> <command>
```

## Commands Table

| Command                                     | Description                                   |
| ------------------------------------------- | --------------------------------------------- |
| docker container ls                         | Lists all running containers                  |
| docker ps                                   | Lists all running containers (alternative)    |
| docker container ls -a                      | Lists all containers (running + stopped)      |
| docker start <container_name/id>           | Starts a stopped container                    |
| docker stop <container_name/id>            | Stops a running container                     |
| docker exec <container_name/id> <command>  | Executes a command inside a running container |

## Key Points about Containers

* Containers are instances of images running in isolated environments.
* Use `docker start` and `docker stop` to manage container states.
* `docker exec` allows running commands inside a running container.
* `docker container ls -a` shows both running and stopped containers.
* `docker ps` is a shortcut for listing active containers.


# Port Mapping, Environment Variables, and Docker Volumes

When running a container, we can map ports, set environment variables, and use volumes for persistent data storage. These features enhance container functionality and interaction with the host system. Learn more [here](https://docs.docker.com/manuals/).

## Code Example 

```bash
# Port Mapping
docker run -it -p 1025:1025 <image_name/id>

# Environment Variables
docker run -it -e key=value <image_name/id>

# Docker Volume (Persistent Storage)
docker run -it -v <volume_name>:<path_in_workdir> <image_name>

# Bind Mount (Local Machine to Container)
docker run -it -v <local_machine_path>:<path_in_workdir> <image_name>
```

## Feature Table

| Feature              | Command                                                 | Description                                      |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------ |
| Port Mapping         | docker run -p 1025:1025 <image>                         | Maps port 1025 of host machine to container      |
| Environment Variable | docker run -e key=value <image>                         | Sets an environment variable in the container    |
| Docker Volume        | docker run -v <volume_name>:<path>                      | Creates a persistent volume inside the container |
| Bind Mount           | docker run -v <local_path>:<container_path> <image>     | Maps local folder to a container directory       |


## Understanding Port Mapping

* Port mapping allows external access to container services.
* `-p local_port:container_port` binds a container's port to the host.
* Example: `-p 8080:80` makes a web server accessible on `localhost:8080`.

## Understanding Environment Variables

* Use `-e key=value` to pass variables into a container.
* Useful for dynamic configuration.
* Example: `docker run -e DB_HOST=localhost -e DB_USER=root <image>`.

## Understanding Docker Volumes**

* Volumes persist data beyond container life.
* Use `docker volume create <volume_name>` to create a volume.
* Example: `docker run -v mydata:/data <image>`.
* Volumes stored at `/var/lib/docker/volumes`.

## Understanding Bind Mounts

* Bind mounts map local directories to containers.
* Good for real-time file updates.
* Example: `docker run -v ~/app:/usr/src/app <image>`.
* Unlike volumes, bind mounts use direct paths.

```dockerfile
# Example of a Dockerfile using Volumes
FROM ubuntu
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
```

---

# Docker Networking

Docker provides different networking options to facilitate communication between containers and external networks. Learn more [here](https://docs.docker.com/manuals/).

## Network Types Table 

| Network Type | Description                                           |
| ------------ | ----------------------------------------------------- |
| Bridge       | Default mode; containers can communicate using names. |
| Host         | Shares host network, no port mapping needed.          |
| None         | Disables networking completely.                       |

## Basic Docker Network Commands

* `docker network --help` - Displays help for network management.
* `docker network ls` - Lists available networks.
* `docker network create <network_name>` - Creates a new user-defined network.
* `docker network inspect <network_name>` - Detailed network info.
* `docker network rm <network_name>` - Removes a network.

```bash
# Create a new Docker network
docker network create my_network

# List available networks
docker network ls

# Inspect a network
docker network inspect my_network
```

## Connecting Containers

* Default network is `bridge`.
* Use `--network <network_name>` to specify network.
* Containers in same network can use names to connect.

```bash
# Run a container in a specific network
docker run -it --network my_network ubuntu bash

# Connect an existing container to a network
docker network connect my_network <container_name/id>

# Disconnect a container from a network
docker network disconnect my_network <container_name/id>
```

## Host Networking Mode

* `--network host` shares host network.
* No port mapping needed.
* Example: `docker run -it --network host nginx`.

## Bridge Networking Mode

* Bridge networks isolate and allow name-based communication.
* Example: two containers in a bridge network can ping each other by name.

```bash
# Create a bridge network
docker network create my_bridge

# Run two containers in the same network
docker run -it --network my_bridge --name container1 ubuntu bash
docker run -it --network my_bridge --name container2 ubuntu bash

# Inside container1
ping container2
```

## None Networking Mode

* `--network none` isolates the container.
* Useful for high-security apps.
* Example: `docker run -it --network none ubuntu bash`.


# Working with Multiple Containers & Pushing Images to Docker Hub

When working with multiple containers, set up a network or use IPs for communication. You can also push images to Docker Hub. Learn more [here](https://docs.docker.com/manuals/).

## Managing Multiple Containers 

* Each container has a unique IP: `docker inspect <container_name>`.
* Same-network containers can talk by name.
* Use user-defined networks.
* Use `docker-compose` for multi-container setups.

```bash
# Get IP address of a container
docker inspect <container_name> | grep "IPAddress"
```

## Connecting Containers 

```bash
docker network create my_network
docker run -it --network my_network --name container1 ubuntu bash
docker run -it --network my_network --name container2 ubuntu bash

# Inside container1
ping container2
```

## Pushing to Docker Hub 

* Create repo on [Docker Hub](https://hub.docker.com/).
* Name image as `<username>/<image_name>`.
* Login using `docker login`.

```bash
docker login
docker build -t myusername/myimage .
docker images
docker push myusername/myimage
```

## Pulling from Docker Hub

* `docker pull <image_name>` to download.
* `docker run <image_name>` to run it.
* Use `-d` for detached mode.

```bash
docker pull myusername/myimage
docker run -it myusername/myimage
docker run -it -d myusername/myimage
```

## Docker Compose 

* Define services in `docker-compose.yml`.
* Each service = a container.
* Use `docker-compose up -d` to start.

```yaml
version: '3'
services:
  app:
    image: myusername/myapp
    networks:
      - mynetwork
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks:
      - mynetwork
networks:
  mynetwork:
```

```bash
# Start services
docker-compose up -d

# Stop all
docker-compose down
```