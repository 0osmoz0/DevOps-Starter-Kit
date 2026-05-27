# Exemple Kubernetes

## Objectif

Cet exemple déploie l'application Node.js de `examples/docker/` dans un cluster Kubernetes local.

Il complète le guide `docs/07-kubernetes.md` avec des manifests concrets :

- `namespace.yaml` ;
- `deployment.yaml` ;
- `service.yaml` ;
- `kustomization.yaml`.

L'objectif est d'apprendre les bases d'un déploiement K8s professionnel sans complexité cloud.

## Ce que contient l'exemple

```text
examples/kubernetes/
├── namespace.yaml
├── deployment.yaml
├── service.yaml
├── kustomization.yaml
└── README.md
```

Ressources créées :

- **Namespace** `docker-example` ;
- **Deployment** `docker-example` (1 réplica) ;
- **Service** `ClusterIP` sur le port `3000`.

## Prérequis

- `kubectl` installé ;
- un cluster local : [minikube](https://minikube.sigs.k8s.io/) ou [kind](https://kind.sigs.k8s.io/) ;
- Docker pour construire l'image (voir `examples/docker/`).

Vérifier le cluster :

```bash
kubectl cluster-info
kubectl get nodes
```

## Construire l'image Docker

Depuis la racine du dépôt :

```bash
docker build -t devops-starter-kit/docker-example:local examples/docker
```

Le manifest utilise cette image avec `imagePullPolicy: IfNotPresent`.

## Charger l'image dans le cluster local

## minikube

```bash
minikube image load devops-starter-kit/docker-example:local
```

## kind

```bash
kind load docker-image devops-starter-kit/docker-example:local
```

Sans cette étape, le Pod peut rester en `ImagePullBackOff` car le cluster ne voit pas l'image locale.

## Déployer

Depuis la racine du dépôt :

```bash
kubectl apply -k examples/kubernetes/
```

Vérifier :

```bash
kubectl get all -n docker-example
kubectl wait -n docker-example deployment/docker-example --for=condition=Available --timeout=120s
```

## Tester l'application

Port-forward vers le Service :

```bash
kubectl port-forward -n docker-example svc/docker-example 3000:3000
```

Dans un autre terminal :

```bash
curl http://localhost:3000/health
curl http://localhost:3000/ready
curl http://localhost:3000/
```

## Logs et débogage

```bash
kubectl logs -n docker-example -l app=docker-example --tail=50
kubectl describe pod -n docker-example -l app=docker-example
kubectl get events -n docker-example --sort-by='.lastTimestamp'
```

## Supprimer

```bash
kubectl delete -k examples/kubernetes/
```

## Bonnes pratiques illustrées

- namespace dédié ;
- labels cohérents (`app`, `app.kubernetes.io/*`) ;
- probes HTTP `/health` et `/ready` (alignées sur l'exemple Docker) ;
- `resources` requests/limits ;
- `securityContext` non-root, read-only root FS, capabilities supprimées ;
- volume `emptyDir` pour `/tmp` ;
- stratégie `RollingUpdate` avec `maxUnavailable: 0`.

## Lien avec la CI (prochaine étape)

Un workflow `kubernetes-example.yml` pourra valider ces manifests avec :

```bash
kubectl apply --dry-run=client -k examples/kubernetes/
kubeconform -kubernetes-version 1.29.0 -summary examples/kubernetes/
```

## Aller plus loin

- Lire `docs/07-kubernetes.md` ;
- Ajouter un Ingress (NGINX, Traefik) ;
- Introduire ConfigMap / Secret pour la configuration ;
- Déployer via Helm ou Kustomize overlays par environnement.
