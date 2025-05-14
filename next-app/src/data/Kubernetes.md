# Introduction to Kubernetes
Kubernetes (K8s) is an open-source platform for automating deployment, scaling, and managing containerized applications. It provides `container orchestration`, `scalability`, `load balancing`, `high availability`, and seamless `rollouts and rollbacks`.

# Kubernetes Architecture
Kubernetes follows a master-worker architecture with the following components:

## Control Plane Components
1. `Kube-API Server` - User interaction interface.
2. `etcd` - Key-value store for cluster data.
3. `Controller Manager` - Handles controllers for nodes, endpoints, etc.
4. `Scheduler` - Assigns workloads to worker nodes.
5. `Cloud Controller Manager` - Manages cloud provider-specific components.

## Worker Node Components
1. `Kubelet` - Ensures containers are running in pods.
2. `Kube Proxy` - Manages network rules for pod communication.
3. `CRI` - Manages container runtime.

# Key Kubernetes Objects

| Kubernetes Object | Description |
|-------------------|-------------|
| `Pods`         | Basic deployable unit, abstraction over containers. |
| `Services`     | Expose a set of pods to network with a stable IP. |
| `ConfigMap`    | External configuration storage. |
| `Secrets`      | Securely store sensitive information. |
| `Volume`       | Persistent storage for pods. |
| `Deployment`   | Manages replicas and updates of pods. |
| `StatefulSet`  | For stateful applications like databases. |

# Minikube: Setting Up a Local Kubernetes Cluster(#kubernetes-minikube)
Minikube allows running Kubernetes locally for testing and development. Below are the commands to set it up:

```bash
minikube start
minikube status
minikube stop
minikube dashboard
```

# Basic kubectl Commands
`kubectl` is the CLI tool to interact with Kubernetes. Below are common commands:

| Command | Description |
|---------|-------------|
| `kubectl create deployment my-nginx --image=nginx` | Create a deployment. |
| `kubectl get deployments` | List all deployments. |
| `kubectl get pods` | List all pods. |
| `kubectl describe pods` | Get details about pods. |
| `kubectl delete deployment my-nginx` | Delete a deployment. |

# Scaling and Rolling Updates
To scale and update applications in Kubernetes, use the following commands:

```bash
kubectl scale deployment my-app --replicas=4
kubectl set image deployment my-app my-container=myimage:v2
kubectl rollout undo deployment my-app
```

# Deploying Applications with YAML
Use YAML files to define deployments and services. Below is an example:

```yaml
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
```

Apply the deployment using:

```bash
kubectl apply -f deployment.yml
```