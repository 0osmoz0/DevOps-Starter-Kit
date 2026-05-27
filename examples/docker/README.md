# Exemple Docker

## Objectif

Cet exemple montre une base Docker simple, professionnelle et exécutable pour une petite application Node.js.

Il complète le guide `docs/04-docker.md` avec des fichiers concrets :

- `Dockerfile` ;
- `docker-compose.yml` ;
- `.dockerignore` ;
- `.env.example` ;
- `Makefile` ;
- `package.json` ;
- `src/server.js`.

L'objectif est de montrer les bonnes pratiques essentielles d'un usage Docker DevOps sans ajouter une complexité inutile.

## Ce que contient l'exemple

```text
examples/docker/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── Makefile
├── package.json
├── package-lock.json
└── src/
    └── server.js
```

Le service expose deux routes :

- `/` : retourne des informations simples sur le service ;
- `/health` : retourne l'état de santé du service.
- `/ready` : retourne l'état de disponibilité du service.

## Prérequis

- Docker Desktop lancé ;
- Docker Compose disponible ;
- Node.js uniquement si vous voulez lancer la validation JavaScript hors Docker.

Vérifier Docker :

```bash
docker info
docker compose version
```

## Construire l'image

Depuis le dossier `examples/docker/` :

```bash
docker build -t devops-starter-kit/docker-example:local .
```

Avec les métadonnées de build :

```bash
docker build \
  --build-arg BUILD_VERSION=local \
  --build-arg VCS_REF="$(git rev-parse --short HEAD)" \
  --build-arg BUILD_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
  -t devops-starter-kit/docker-example:local .
```

## Lancer le conteneur

```bash
docker run --rm \
  --name docker-example-app \
  -p 3000:3000 \
  -e APP_ENV=development \
  devops-starter-kit/docker-example:local
```

Tester le service :

```bash
curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/ready
```

## Lancer avec Docker Compose

```bash
docker compose up --build
```

Arrêter :

```bash
docker compose down
```

## Utiliser le Makefile

Le `Makefile` regroupe les commandes utiles pour éviter les erreurs de saisie.

Construire l'image :

```bash
make build
```

Lancer l'environnement :

```bash
make up
```

Afficher les logs :

```bash
make logs
```

Tester le healthcheck :

```bash
make health
```

Arrêter :

```bash
make down
```

## Configuration

La configuration d'exemple est dans `.env.example`.

```env
APP_ENV=development
PORT=3000
SERVICE_NAME=docker-example-service
SERVICE_VERSION=local
```

Pour un projet réel, il est courant de copier ce fichier vers `.env` en local :

```bash
cp .env.example .env
```

Le fichier `.env` ne doit pas être committé.

## Métadonnées d'image

Le `Dockerfile` ajoute des labels OCI.

Ces labels permettent de relier une image à :

- une version ;
- un commit Git ;
- une date de build ;
- une source.

Inspecter l'image :

```bash
docker image inspect devops-starter-kit/docker-example:local
```

## Bonnes pratiques montrées

Cet exemple applique plusieurs bonnes pratiques Docker :

- image de base versionnée avec `node:20-alpine` ;
- utilisation de `.dockerignore` ;
- installation reproductible avec `npm ci` ;
- séparation des étapes avec un build multi-stage ;
- `npm` utilisé uniquement au build, retiré de l'image runtime ;
- exécution avec un utilisateur non-root ;
- labels OCI pour la traçabilité ;
- port documenté avec `EXPOSE` ;
- healthcheck défini dans le `Dockerfile` et dans Compose ;
- configuration via variables d'environnement ;
- logs JSON envoyés sur la sortie standard ;
- arrêt propre avec `SIGTERM` et `SIGINT` ;
- options Compose de durcissement : `read_only`, `cap_drop` et `no-new-privileges`.

## Points à ne pas faire

Eviter de modifier cet exemple pour :

- ajouter un vrai secret dans l'image ;
- committer un fichier `.env` réel ;
- utiliser `latest` comme tag d'image de base ;
- exécuter l'application en root sans nécessité ;
- copier `node_modules` depuis la machine locale.
- monter le socket Docker dans le conteneur sans raison.

## Lien avec la CI/CD

Dans une pipeline CI/CD, cet exemple pourrait être utilisé pour :

- vérifier que l'image Docker se construit correctement ;
- valider `docker compose config` ;
- scanner l'image avec Trivy ou Docker Scout ;
- tester le healthcheck ;
- publier l'image dans un registry ;
- préparer un futur déploiement Kubernetes.

Exemple de workflow CI possible :

```text
Pull Request
  ↓
docker compose config
  ↓
docker build
  ↓
docker run + healthcheck
  ↓
scan de sécurité
```

## Sécurité

Cet exemple montre plusieurs protections de base :

- l'application tourne avec un utilisateur `app`, pas en root ;
- les capacités Linux sont supprimées dans Compose avec `cap_drop: ALL` ;
- `no-new-privileges` limite l'escalade de privilèges ;
- le système de fichiers du conteneur est en lecture seule avec `read_only: true` ;
- `/tmp` reste disponible via `tmpfs` ;
- aucun secret réel n'est stocké dans l'image.

Ces protections ne remplacent pas une analyse de sécurité complète, mais elles montrent une base saine.

## Observabilité

Le service écrit des logs JSON sur la sortie standard.

Exemple :

```json
{
  "level": "info",
  "message": "request completed",
  "service": "docker-example-service",
  "timestamp": "2026-05-26T21:00:00.000Z",
  "method": "GET",
  "path": "/health",
  "statusCode": 200
}
```

Cette pratique facilite la collecte par Docker, Kubernetes ou une plateforme de monitoring.

## Workflows GitHub Actions actifs

Ce dépôt exécute déjà sur les pull requests :

```text
.github/workflows/docker-example.yml   # build, run, smoke tests
.github/workflows/security-scan.yml   # Gitleaks + Trivy (filesystem et image)
```
