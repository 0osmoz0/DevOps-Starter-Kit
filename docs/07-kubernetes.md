# Kubernetes

## Objectif de ce document

Ce document explique Kubernetes de manière progressive, avec une approche orientée DevOps.

Il s'adresse à plusieurs niveaux :

- débutant : comprendre à quoi sert Kubernetes et ses objets de base ;
- intermédiaire : lire et écrire des manifests `Deployment` / `Service` ;
- avancé : appliquer des bonnes pratiques de sécurité, de probes, de ressources et d'intégration CI/CD.

L'objectif n'est pas d'administrer un cluster de production dès le premier jour. L'objectif est de comprendre comment Kubernetes orchestre des conteneurs Docker de façon fiable, versionnée et automatisée.

## Définition simple

Kubernetes (souvent abrégé **K8s**) est une plateforme d'orchestration de conteneurs.

Elle permet de :

- déployer des applications conteneurisées ;
- les maintenir disponibles ;
- les mettre à l'échelle ;
- les mettre à jour avec peu d'interruption ;
- exposer des services sur le réseau ;
- gérer configuration et secrets.

Relation avec Docker :

```text
Docker construit et exécute un conteneur sur une machine.
Kubernetes gère beaucoup de conteneurs sur un cluster de machines.
```

## Pourquoi Kubernetes est important en DevOps

Kubernetes répond à des problèmes qui apparaissent quand une application grandit :

- plusieurs instances à exécuter ;
- redémarrage automatique en cas de panne ;
- déploiements fréquents sans coupure longue ;
- configuration partagée entre environnements ;
- découverte réseau entre services ;
- standardisation des pratiques d'exploitation.

Dans une démarche DevOps, Kubernetes apporte :

- reproductibilité des déploiements ;
- infrastructure et configuration versionnées (manifests YAML) ;
- automatisation via CI/CD et GitOps ;
- observabilité (logs, métriques, probes) ;
- isolation par namespace ;
- bases solides pour la haute disponibilité.

## Quand utiliser Kubernetes (et quand éviter)

## Cas où Kubernetes est pertinent

- plusieurs microservices à orchestrer ;
- besoin de scaling horizontal ;
- déploiements fréquents avec stratégies contrôlées ;
- équipe prête à maintenir un cluster ou une offre managée (EKS, AKS, GKE) ;
- exigences de résilience et de standardisation.

## Cas où Kubernetes est prématuré

- une seule petite application monolithique ;
- une équipe sans compétence ops pour exploiter un cluster ;
- un simple hébergement Docker ou PaaS suffit ;
- coût opérationnel non justifié.

Règle pragmatique :

```text
Maîtriser Docker et la CI/CD avant d'ajouter la complexité d'un cluster Kubernetes.
```

Ce dépôt suit cette progression : `examples/docker/` puis `examples/kubernetes/`.

## Architecture d'un cluster (vue simplifiée)

Un cluster Kubernetes comprend :

## Control plane

Composants qui pilotent le cluster :

- API server : point d'entrée des requêtes ;
- scheduler : place les Pods sur les nœuds ;
- controller manager : réconcilie l'état souhaité ;
- etcd : stockage de l'état du cluster.

## Nœuds (workers)

Machines qui exécutent les charges :

- kubelet : agent sur chaque nœud ;
- container runtime : Docker, containerd, etc. ;
- kube-proxy : règles réseau pour les Services.

Vue d'ensemble :

```text
Utilisateur / CI
      |
      v
  kubectl / API
      |
      v
 Control Plane
      |
      v
  Nodes (Pods)
```

## Objets Kubernetes essentiels

## Pod

Le **Pod** est l'unité minimale de déploiement.

Un Pod peut contenir un ou plusieurs conteneurs qui partagent réseau et volumes.

En pratique, on déploie rarement un Pod seul en production. On utilise plutôt un **Deployment** qui gère des Pods.

## Deployment

Un **Deployment** décrit :

- l'image conteneur ;
- le nombre de réplicas ;
- les variables d'environnement ;
- les probes de santé ;
- les ressources CPU/mémoire ;
- la stratégie de mise à jour.

Exemple simplifié :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: app
          image: my-app:1.0.0
          ports:
            - containerPort: 3000
```

## Service

Un **Service** expose un ensemble de Pods de façon stable.

Même si les Pods changent d'adresse IP, le Service fournit un point d'accès stable.

Types courants :

- **ClusterIP** : accès interne au cluster (défaut) ;
- **NodePort** : expose un port sur chaque nœud ;
- **LoadBalancer** : provisionne un load balancer cloud ;
- **Ingress** : routage HTTP/HTTPS (via un contrôleur Ingress).

## Ingress

Un **Ingress** route le trafic HTTP(S) vers des Services.

Il nécessite un **contrôleur Ingress** (NGINX, Traefik, etc.) installé dans le cluster.

## Namespace

Un **namespace** isole des ressources dans un même cluster.

Exemples :

- `dev` ;
- `staging` ;
- `production` ;
- `docker-example` (pour un exemple pédagogique).

Bonne pratique : limiter le périmètre d'un environnement ou d'une équipe.

## ConfigMap et Secret

## ConfigMap

Stocke de la configuration non sensible :

- noms de fichiers ;
- URLs ;
- flags de fonctionnalités.

## Secret

Stocke des données sensibles :

- mots de passe ;
- tokens ;
- certificats.

Bonne pratique :

```text
Ne jamais committer de Secret réel dans Git.
```

Utiliser des outils dédiés (Sealed Secrets, External Secrets, Vault) en production.

## Labels et selectors

Les **labels** sont des paires clé/valeur attachées aux objets.

Les **selectors** permettent de relier des objets entre eux.

Exemple :

```yaml
metadata:
  labels:
    app: docker-example
    environment: dev
```

Un `Service` route vers les Pods dont les labels correspondent à son `selector`.

Convention courante :

```text
app: <nom-application>
environment: dev|staging|production
```

## Probes : liveness, readiness, startup

Kubernetes peut vérifier la santé des conteneurs.

## Liveness probe

Répond à la question :

```text
L'application est-elle vivante ?
```

Si la liveness échoue, Kubernetes **redémarre** le conteneur.

## Readiness probe

Répond à la question :

```text
L'application est-elle prête à recevoir du trafic ?
```

Si la readiness échoue, le Pod est retiré du Service (pas de trafic) sans redémarrage forcé.

## Startup probe

Utile pour les applications lentes au démarrage.

Elle évite que la liveness tue le conteneur trop tôt.

## Exemple HTTP (aligné avec l'exemple Docker)

L'exemple `examples/docker/` expose `/health` et `/ready`.

Dans Kubernetes :

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: http
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Ressources : requests et limits

Définir des **requests** (réservation) et **limits** (plafond) pour CPU et mémoire.

```yaml
resources:
  requests:
    cpu: 50m
    memory: 64Mi
  limits:
    cpu: 200m
    memory: 128Mi
```

Intérêt :

- scheduling plus fiable ;
- protection contre la consommation excessive ;
- base pour l'autoscaling (HPA).

Sans limits, un conteneur peut saturer un nœud.

## Sécurité dans Kubernetes

## Principes de base

- exécuter les conteneurs en **non-root** ;
- utiliser un **readOnlyRootFilesystem** quand possible ;
- supprimer les **capabilities** inutiles (`drop: ALL`) ;
- interdire l'escalade de privilèges ;
- limiter l'accès au API server (RBAC) ;
- scanner les images (Trivy, comme dans `security-scan.yml`).

## securityContext

Au niveau du Pod ou du conteneur :

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```

Ces réglages complètent les bonnes pratiques déjà montrées dans `examples/docker/`.

## RBAC

**Role** et **RoleBinding** (ou ClusterRole) définissent qui peut faire quoi.

En production, appliquer le principe du moindre privilège pour les utilisateurs et les service accounts.

## Réseau (vue pratique)

Flux typique :

```text
Client
  -> Ingress (optionnel)
  -> Service (ClusterIP)
  -> Pod(s)
```

Dans un cluster local (minikube, kind), on utilise souvent :

- `kubectl port-forward` pour tester ;
- ou un Service `NodePort` / tunnel.

## Stockage

## emptyDir

Volume temporaire lié au Pod (ex. `/tmp` pour une app en read-only root).

## PersistentVolumeClaim (PVC)

Stockage persistant pour bases de données, fichiers partagés, etc.

Pour l'exemple pédagogique de ce dépôt, `emptyDir` suffit pour monter `/tmp`.

## Manifests et Infrastructure as Code

Les fichiers YAML Kubernetes sont une forme d'**Infrastructure as Code**.

Ils sont :

- versionnés dans Git ;
- relus en pull request ;
- validés en CI (`kubectl apply --dry-run`, kubeconform) ;
- déployés par pipeline ou GitOps (Argo CD, Flux).

Structure recommandée pour un exemple simple :

```text
examples/kubernetes/
├── namespace.yaml
├── deployment.yaml
├── service.yaml
├── kustomization.yaml
└── README.md
```

## kubectl : commandes essentielles

## Contexte et cluster

```bash
kubectl config get-contexts
kubectl cluster-info
```

## Appliquer des manifests

```bash
kubectl apply -f examples/kubernetes/
kubectl apply -k examples/kubernetes/
```

## Inspecter

```bash
kubectl get all -n docker-example
kubectl describe deployment docker-example -n docker-example
kubectl logs -n docker-example -l app=docker-example
```

## Déboguer

```bash
kubectl get events -n docker-example --sort-by='.lastTimestamp'
kubectl port-forward -n docker-example svc/docker-example 3000:3000
```

Puis tester :

```bash
curl http://localhost:3000/health
```

## Déploiement local pour apprendre

## minikube

```bash
minikube start
docker build -t devops-starter-kit/docker-example:local examples/docker
minikube image load devops-starter-kit/docker-example:local
kubectl apply -k examples/kubernetes/
```

## kind (Kubernetes in Docker)

```bash
kind create cluster
docker build -t devops-starter-kit/docker-example:local examples/docker
kind load docker-image devops-starter-kit/docker-example:local
kubectl apply -k examples/kubernetes/
```

Ces commandes sont détaillées dans `examples/kubernetes/README.md`.

## Stratégies de déploiement

Kubernetes supporte plusieurs stratégies via le Deployment :

- **RollingUpdate** (défaut) : mise à jour progressive ;
- **Recreate** : arrêt puis recréation (fenêtre d'indisponibilité).

Paramètres courants :

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1
```

## Kubernetes et la CI/CD

Dans une pipeline, on valide souvent les manifests **sans** déployer sur chaque PR :

```bash
kubectl apply --dry-run=client -k examples/kubernetes/
kubeconform -kubernetes-version 1.29.0 -summary examples/kubernetes/
```

Étapes typiques :

```text
Pull Request
  -> lint YAML
  -> kubeconform / dry-run
  -> build image Docker
  -> scan image (Trivy)
  -> merge
  -> deploy staging (kubectl ou GitOps)
  -> smoke tests
```

La prochaine évolution de ce dépôt pourra ajouter `kubernetes-example.yml` sous `.github/workflows/`.

## GitOps (introduction)

**GitOps** : Git est la source de vérité, un opérateur réconcilie le cluster.

Outils courants :

- Argo CD ;
- Flux CD.

Avantages :

- traçabilité ;
- rollbacks via Git ;
- revue de code sur l'infrastructure.

## Erreurs fréquentes

## Image introuvable (`ImagePullBackOff`)

Causes :

- image non présente dans le cluster local ;
- mauvais nom de tag ;
- registry privé sans `imagePullSecrets`.

Solution pédagogique : charger l'image dans minikube/kind après `docker build`.

## Probes mal configurées

Symptôme : redémarrages en boucle (`CrashLoopBackOff`).

Causes :

- mauvais chemin HTTP ;
- port incorrect ;
- `initialDelaySeconds` trop court.

## Ressources insuffisantes

Symptôme : Pod en `Pending` ou OOMKilled.

Solution : ajuster `requests`/`limits` ou la taille du cluster.

## Labels incohérents

Symptôme : Service sans endpoints.

Cause : le `selector` du Service ne correspond pas aux labels des Pods.

## Secrets dans Git

Ne jamais versionner de credentials réels.

Préférer des exemples avec placeholders ou des outils de chiffrement.

## Bonnes pratiques Kubernetes

- un manifest par ressource ou Kustomize/Helm pour les projets réels ;
- labels cohérents (`app`, `environment`, `version`) ;
- probes sur des endpoints réels (`/health`, `/ready`) ;
- ressources CPU/mémoire définies ;
- utilisateur non-root et filesystem read-only quand possible ;
- namespaces par environnement ou équipe ;
- validation CI des YAML ;
- documentation à jour à côté des manifests.

## Lien avec les autres guides de ce dépôt

| Guide | Lien avec Kubernetes |
| --- | --- |
| `docs/04-docker.md` | Construire l'image exécutée par les Pods |
| `docs/05-ci-cd.md` | Valider et déployer les manifests en pipeline |
| `docs/06-infrastructure-as-code.md` | Manifests YAML versionnés comme code |
| `examples/docker/` | Application conteneurisée de référence |
| `examples/kubernetes/` | Déploiement K8s de cette application |
| `security-scan.yml` | Scan d'image avant déploiement |

## Conclusion

Kubernetes est un outil puissant pour orchestrer des conteneurs à l'échelle.

Il ne remplace pas les fondations DevOps :

- Git et revues de code ;
- Docker et images fiables ;
- CI/CD et tests automatisés ;
- sécurité et observabilité.

Une bonne progression consiste à :

1. maîtriser Docker (`examples/docker/`) ;
2. écrire des manifests simples (`examples/kubernetes/`) ;
3. valider en CI ;
4. n'adopter un cluster managé que lorsque le besoin est réel.

## Prochaine étape recommandée

La prochaine étape logique de ce dépôt est :

```text
docs/08-monitoring-observability.md
```

Elle pourra couvrir logs, métriques, traces et alertes pour des applications conteneurisées et Kubernetes.
