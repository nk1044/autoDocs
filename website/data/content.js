export const Content = [
  {
    title: 'Docker',
    path: 'Docker',
    content: `
# Docker Images

To list available images, use \[code]docker images\[/code]. You can run an image in a container using \[code]docker run -it <image_name/id>\[/code]. If the image is not present locally, it will be pulled from Docker Hub. Learn more [link]here(https://docs.docker.com) [/link].

### Code Example

\`\`\`bash
# List available images
docker images

# Run an image in a container
docker run -it <image_name/id>

# Run an image with port mapping
docker run -it -p 1025:1025 <image_name/id>
\`\`\`

### Options Table

| Option                         | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| --name                         | Set a custom name for the container              |
| --rm                           | Remove the container after use                   |
| -it                            | Interactive mode                                 |
| -d                             | Detach mode (run in background)                  |
| -p host_port:container_port    | Port mapping between local machine and container |

### Key Points about Images

* A container is a running environment for an image.
* \[code]-it\[/code] enables an interactive terminal.
* \[code]-d\[/code] allows running in detached mode.
* If the image is not found locally, Docker pulls it from Docker Hub.
* \[code]-p\[/code] flag is used for port mapping (host:container).

---

# Docker Containers

To list all running containers, use \[code]docker container ls\[/code] or \[code]docker ps\[/code]. To see all containers, including stopped ones, use \[code]docker container ls -a\[/code]. Learn more \[link]here(https://docs.docker.com) \[/link].

### Code Example

\`\`\`bash
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
\`\`\`

### Commands Table

| Command                                     | Description                                   |
| ------------------------------------------- | --------------------------------------------- |
| docker container ls                         | Lists all running containers                  |
| docker ps                                   | Lists all running containers (alternative)    |
| docker container ls -a                      | Lists all containers (running + stopped)      |
| docker start <container_name/id>           | Starts a stopped container                    |
| docker stop <container_name/id>            | Stops a running container                     |
| docker exec <container_name/id> <command>  | Executes a command inside a running container |

### Key Points about Containers

* Containers are instances of images running in isolated environments.
* Use \[code]docker start\[/code] and \[code]docker stop\[/code] to manage container states.
* \[code]docker exec\[/code] allows running commands inside a running container.
* \[code]docker container ls -a\[/code] shows both running and stopped containers.
* \[code]docker ps\[/code] is a shortcut for listing active containers.

---

# Port Mapping, Environment Variables, and Docker Volumes

When running a container, we can map ports, set environment variables, and use volumes for persistent data storage. These features enhance container functionality and interaction with the host system. Learn more \[link]here(https://docs.docker.com)\[/link].

### Code Example

\`\`\`bash
# Port Mapping
docker run -it -p 1025:1025 <image_name/id>

# Environment Variables
docker run -it -e key=value <image_name/id>

# Docker Volume (Persistent Storage)
docker run -it -v <volume_name>:<path_in_workdir> <image_name>

# Bind Mount (Local Machine to Container)
docker run -it -v <local_machine_path>:<path_in_workdir> <image_name>
\`\`\`

### Feature Table

| Feature              | Command                                                 | Description                                      |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------ |
| Port Mapping         | docker run -p 1025:1025 <image>                         | Maps port 1025 of host machine to container      |
| Environment Variable | docker run -e key=value <image>                         | Sets an environment variable in the container    |
| Docker Volume        | docker run -v <volume_name>:<path>                      | Creates a persistent volume inside the container |
| Bind Mount           | docker run -v <local_path>:<container_path> <image>     | Maps local folder to a container directory       |

### Lists

**Understanding Port Mapping**

* Port mapping allows external access to container services.
* \[code]-p local_port:container_port\[/code] binds a container's port to the host.
* Example: \[code]-p 8080:80\[/code] makes a web server accessible on \[code]localhost:8080\[/code].

**Understanding Environment Variables**

* Use \[code]-e key=value\[/code] to pass variables into a container.
* Useful for dynamic configuration.
* Example: \[code]docker run -e DB_HOST=localhost -e DB_USER=root <image>\[/code].

**Understanding Docker Volumes**

* Volumes persist data beyond container life.
* Use \[code]docker volume create <volume_name>\[/code] to create a volume.
* Example: \[code]docker run -v mydata:/data <image>\[/code].
* Volumes stored at \[code]/var/lib/docker/volumes\[/code].

**Understanding Bind Mounts**

* Bind mounts map local directories to containers.
* Good for real-time file updates.
* Example: \[code]docker run -v ~/app:/usr/src/app <image>\[/code].
* Unlike volumes, bind mounts use direct paths.

\`\`\`dockerfile
# Example of a Dockerfile using Volumes
FROM ubuntu
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
\`\`\`

---

# Docker Networking

Docker provides different networking options to facilitate communication between containers and external networks. Learn more \[link]here(https://docs.docker.com/network/)\[/link].

### Network Types Table

| Network Type | Description                                           |
| ------------ | ----------------------------------------------------- |
| Bridge       | Default mode; containers can communicate using names. |
| Host         | Shares host network, no port mapping needed.          |
| None         | Disables networking completely.                       |

### Basic Docker Network Commands

* \[code]docker network --help\[/code] - Displays help for network management.
* \[code]docker network ls\[/code] - Lists available networks.
* \[code]docker network create <network_name>\[/code] - Creates a new user-defined network.
* \[code]docker network inspect <network_name>\[/code] - Detailed network info.
* \[code]docker network rm <network_name>\[/code] - Removes a network.

\`\`\`bash
# Create a new Docker network
docker network create my_network

# List available networks
docker network ls

# Inspect a network
docker network inspect my_network
\`\`\`

### Connecting Containers

* Default network is \[code]bridge\[/code].
* Use \[code]--network <network_name>\[/code] to specify network.
* Containers in same network can use names to connect.

\`\`\`bash
# Run a container in a specific network
docker run -it --network my_network ubuntu bash

# Connect an existing container to a network
docker network connect my_network <container_name/id>

# Disconnect a container from a network
docker network disconnect my_network <container_name/id>
\`\`\`

**Host Networking Mode**

* \[code]--network host\[/code] shares host network.
* No port mapping needed.
* Example: \[code]docker run -it --network host nginx\[/code].

**Bridge Networking Mode**

* Bridge networks isolate and allow name-based communication.
* Example: two containers in a bridge network can ping each other by name.

\`\`\`bash
# Create a bridge network
docker network create my_bridge

# Run two containers in the same network
docker run -it --network my_bridge --name container1 ubuntu bash
docker run -it --network my_bridge --name container2 ubuntu bash

# Inside container1
ping container2
\`\`\`

**None Networking Mode**

* \[code]--network none\[/code] isolates the container.
* Useful for high-security apps.
* Example: \[code]docker run -it --network none ubuntu bash\[/code].

---

# Working with Multiple Containers & Pushing Images to Docker Hub

When working with multiple containers, set up a network or use IPs for communication. You can also push images to Docker Hub. Learn more \[link]here(https://docs.docker.com/)\[/link].

### Managing Multiple Containers

* Each container has a unique IP: \[code]docker inspect <container_name>\[/code].
* Same-network containers can talk by name.
* Use user-defined networks.
* Use \[code]docker-compose\[/code] for multi-container setups.

\`\`\`bash
# Get IP address of a container
docker inspect <container_name> | grep "IPAddress"
\`\`\`

### Connecting Containers

\`\`\`bash
docker network create my_network
docker run -it --network my_network --name container1 ubuntu bash
docker run -it --network my_network --name container2 ubuntu bash

# Inside container1
ping container2
\`\`\`

### Pushing to Docker Hub

* Create repo on \[link]Docker Hub(https://hub.docker.com/) \[/link].
* Name image as \[code]<username>/<image_name>\[/code].
* Login using \[code]docker login\[/code].

\`\`\`bash
docker login
docker build -t myusername/myimage .
docker images
docker push myusername/myimage
\`\`\`

### Pulling from Docker Hub

* \[code]docker pull <image_name>\[/code] to download.
* \[code]docker run <image_name>\[/code] to run it.
* Use \[code]-d\[/code] for detached mode.

\`\`\`bash
docker pull myusername/myimage
docker run -it myusername/myimage
docker run -it -d myusername/myimage
\`\`\`

### Docker Compose

* Define services in \[code]docker-compose.yml\[/code].
* Each service = a container.
* Use \[code]docker-compose up -d\[/code] to start.

\`\`\`yaml
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
\`\`\`

\`\`\`bash
# Start services
docker-compose up -d

# Stop all
docker-compose down
\`\`\`
`
  },
  {
    title: 'Git & Github',
    path: 'Git&Github',
    content: `
# Git Basics

Git is a distributed version control system that helps developers track changes in their codebase. It follows a flow:
Workdir → \[code]git add\[/code] → Staging Area → \[code]git commit\[/code] → Repository → \[code]git push\[/code] → Remote (e.g., GitHub).

\`\`\`bash
# Initialize a new repository
git init

# Check the status of the repository
git status

# Add files to staging area
git add .

# Commit changes with a message
git commit -m "Initial commit"

# View commit history (compact view)
git log --oneline
\`\`\`

# Git Branching and Merging

Git allows working on different features using branches. Branching helps maintain a clean development workflow.

| Command                                      | Description                       |
| -------------------------------------------- | --------------------------------- |
| \[code]git branch\[/code]                    | List all branches                 |
| \[code]git branch \<branch\_name>\[/code]    | Create a new branch               |
| \[code]git switch \<branch\_name>\[/code]    | Switch to an existing branch      |
| \[code]git switch -c \<branch\_name>\[/code] | Create and switch to a new branch |
| \[code]git merge \<branch\_name>\[/code]     | Merge a branch into the current   |
| \[code]git merge --abort\[/code]             | Abort a merge conflict            |
| \[code]git branch -d \<branch\_name>\[/code] | Delete a branch                   |

\`\`\`bash
# Create and switch to a new branch
git branch feature-branch
git switch feature-branch

# Merge feature-branch into main
git switch main
git merge feature-branch

# Delete a branch after merging
git branch -d feature-branch
\`\`\`

# Git Stash and Temporary Changes

Git Stash helps in saving unfinished work temporarily so that you can switch branches or work on urgent changes.

* \[code]git stash\[/code] - Save uncommitted changes
* \[code]git stash save "message"\[/code] - Save with a message
* \[code]git stash list\[/code] - View all stashes
* \[code]git stash pop\[/code] - Apply the most recent stash and remove it
* \[code]git stash drop\[/code] - Remove the most recent stash
* \[code]git stash apply stash@{0}\[/code] - Apply a specific stash
* \[code]git stash clear\[/code] - Remove all stashes

\`\`\`bash
# Stash changes before switching branches
git stash save "WIP: Fixing UI issue"

# View all stashes
git stash list

# Apply and remove stash
git stash pop
\`\`\`

# Git Rebase and Reset

Rebasing helps keep the commit history clean, while reset allows reverting to a previous state.

| Command                                         | Description                               |
| ----------------------------------------------- | ----------------------------------------- |
| \[code]git rebase \<branch\_name>\[/code]       | Rebase current branch onto another branch |
| \[code]git reset --hard \<commit\_hash>\[/code] | Reset repository to a specific commit     |
| \[code]git reflog\[/code]                       | View commit history with references       |
| \[code]git reflog <commit-hash>\[/code]         | Show changes of a specific commit         |

\`\`\`bash
# Rebase feature branch onto main
git switch feature-branch
git rebase main

# Reset repository to a previous commit
git reset --hard abc1234
\`\`\`

# GitHub Repository Setup

When creating a new repository on GitHub, use the following template to initialize and push your project.

\`\`\`bash
echo "# my-repo" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yourusername/my-repo.git
git push -u origin main
\`\`\`

### Git Best Practices

1. Always write meaningful commit messages.
2. Use feature branches for development.
3. Keep the main branch clean and stable.
4. Pull the latest changes before pushing your code.
5. Use \[code]git rebase\[/code] instead of \[code]git merge\[/code] to maintain a linear history.
6. Regularly push code to avoid losing progress.
    `
  },
  {
    title: 'PostgreSQL',
    path: 'PostgreSQL',
    content: `
# Introduction

PostgreSQL is a powerful, open-source relational database. Docker allows us to run PostgreSQL in a containerized environment efficiently. This guide covers the installation, configuration, and useful commands to manage PostgreSQL with Docker.

# Setting up PostgreSQL with Docker

To install PostgreSQL in a Docker container, create a \`docker-compose.yml\` file with the following content:

\`\`\`yaml
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
\`\`\`

Run the following command to start PostgreSQL:

\`\`\`bash
docker-compose up -d
\`\`\`

# Accessing PostgreSQL

Once the container is running, you can access PostgreSQL using the following connection URL:

\`\`\`plaintext
postgresql://TestUser\:TestUserPassword\@localhost:5432/TestDB
\`\`\`

Alternatively, use the \[code]psql\[/code] command inside the running container:

\`\`\`bash
docker exec -it \<container\_id> psql -U TestUser -d TestDB
\`\`\`

# Important PostgreSQL Commands

* \[code]CREATE DATABASE mydb;\[/code] - Create a new database.
* \[code]DROP DATABASE mydb;\[/code] - Delete a database.
* \[code]CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);\[/code] - Create a table.
* \[code]INSERT INTO users (name) VALUES ('John Doe');\[/code] - Insert a record.
* \[code]SELECT \* FROM users;\[/code] - Retrieve data.

# Stopping and Removing Containers

To stop and remove the running PostgreSQL container, use:

\`\`\`bash
docker-compose down
\`\`\`

To remove volumes and associated data:

\`\`\`bash
docker-compose down -v
\`\`\`
    `
  },
  {
    title: 'Kubernetes',
    path: 'Kubernetes',
    content: `
# Introduction to Kubernetes
Kubernetes (K8s) is an open-source platform for automating deployment, scaling, and managing containerized applications. It provides \[code]container orchestration\[/code], \[code]scalability\[/code], \[code]load balancing\[/code], \[code]high availability\[/code], and seamless \[code]rollouts and rollbacks\[/code].

# Kubernetes Architecture
Kubernetes follows a master-worker architecture with the following components:

**Control Plane Components**
1. \[code]Kube-API Server\[/code] - User interaction interface.
2. \[code]etcd\[/code] - Key-value store for cluster data.
3. \[code]Controller Manager\[/code] - Handles controllers for nodes, endpoints, etc.
4. \[code]Scheduler\[/code] - Assigns workloads to worker nodes.
5. \[code]Cloud Controller Manager\[/code] - Manages cloud provider-specific components.

**Worker Node Components**
1. \[code]Kubelet\[/code] - Ensures containers are running in pods.
2. \[code]Kube Proxy\[/code] - Manages network rules for pod communication.
3. \[code]CRI\[/code] - Manages container runtime.

# Key Kubernetes Objects

| Kubernetes Object | Description |
|-------------------|-------------|
| \[code]Pods\[/code]         | Basic deployable unit, abstraction over containers. |
| \[code]Services\[/code]     | Expose a set of pods to network with a stable IP. |
| \[code]ConfigMap\[/code]    | External configuration storage. |
| \[code]Secrets\[/code]      | Securely store sensitive information. |
| \[code]Volume\[/code]       | Persistent storage for pods. |
| \[code]Deployment\[/code]   | Manages replicas and updates of pods. |
| \[code]StatefulSet\[/code]  | For stateful applications like databases. |

# Minikube: Setting Up a Local Kubernetes Cluster(#kubernetes-minikube)
Minikube allows running Kubernetes locally for testing and development. Below are the commands to set it up:

\`\`\`bash
minikube start
minikube status
minikube stop
minikube dashboard
\`\`\`

# Basic kubectl Commands
\[code]kubectl\[/code] is the CLI tool to interact with Kubernetes. Below are common commands:

| Command | Description |
|---------|-------------|
| \[code]kubectl create deployment my-nginx --image=nginx\[/code] | Create a deployment. |
| \[code]kubectl get deployments\[/code] | List all deployments. |
| \[code]kubectl get pods\[/code] | List all pods. |
| \[code]kubectl describe pods\[/code] | Get details about pods. |
| \[code]kubectl delete deployment my-nginx\[/code] | Delete a deployment. |

# Scaling and Rolling Updates
To scale and update applications in Kubernetes, use the following commands:

\`\`\`bash
kubectl scale deployment my-app --replicas=4
kubectl set image deployment my-app my-container=myimage:v2
kubectl rollout undo deployment my-app
\`\`\`

# Deploying Applications with YAML
Use YAML files to define deployments and services. Below is an example:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
template:
  spec:
    containers:
      - name: nginx
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: my-nginx-service
spec:
  selector:
    app: my-nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
\`\`\`

Apply the deployment using:

\`\`\`bash
kubectl apply -f deployment.yml
\`\`\`
`
  },
];