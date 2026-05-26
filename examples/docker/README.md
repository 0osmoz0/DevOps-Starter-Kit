# Exemple Docker

## Objectif

Cet exemple montre une base Docker simple, professionnelle et exécutable pour une petite application Node.js.

Il complète le guide `docs/04-docker.md` avec des fichiers concrets :

- `Dockerfile` ;
- `docker-compose.yml` ;
- `.dockerignore` ;
- `package.json` ;
- `src/server.js`.

L'objectif est de montrer les bonnes pratiques essentielles sans ajouter une complexité inutile.

## Ce que contient l'exemple

```text
examples/docker/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── package-lock.json
└── src/
    └── server.js
```

Le service expose deux routes :

- `/` : retourne des informations simples sur le service ;
- `/health` : retourne l'état de santé du service.

## Construire l'image

Depuis le dossier `examples/docker/` :

```bash
docker build -t devops-starter-kit/docker-example:local .
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
```

## Lancer avec Docker Compose

```bash
docker compose up --build
```

Arrêter :

```bash
docker compose down
```

## Bonnes pratiques montrées

Cet exemple applique plusieurs bonnes pratiques Docker :

- image de base versionnée avec `node:20-alpine` ;
- utilisation de `.dockerignore` ;
- installation reproductible avec `npm ci` ;
- séparation des étapes avec un build multi-stage ;
- exécution avec un utilisateur non-root ;
- port documenté avec `EXPOSE` ;
- healthcheck défini dans le `Dockerfile` et dans Compose ;
- configuration via variables d'environnement ;
- logs envoyés sur la sortie standard.

## Points à ne pas faire

Eviter de modifier cet exemple pour :

- ajouter un vrai secret dans l'image ;
- committer un fichier `.env` réel ;
- utiliser `latest` comme tag d'image de base ;
- exécuter l'application en root sans nécessité ;
- copier `node_modules` depuis la machine locale.

## Lien avec la CI/CD

Dans une pipeline CI/CD, cet exemple pourrait être utilisé pour :

- vérifier que l'image Docker se construit correctement ;
- scanner l'image avec Trivy ou Docker Scout ;
- tester le healthcheck ;
- publier l'image dans un registry ;
- préparer un futur déploiement Kubernetes.

## Prochaine amélioration possible

Une prochaine étape pourrait ajouter un workflow GitHub Actions dédié :

```text
.github/workflows/docker-example.yml
```

Ce workflow pourrait construire l'image à chaque pull request et lancer un scan de sécurité.
