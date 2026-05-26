# Docker

## Objectif de ce document

Ce document explique Docker de manière progressive, avec une approche orientée DevOps.

Il s'adresse à plusieurs niveaux :

- débutant : comprendre ce qu'est Docker et pourquoi il est utilisé ;
- intermédiaire : savoir lire et écrire un `Dockerfile` propre ;
- avancé : appliquer des bonnes pratiques de sécurité, d'optimisation et d'intégration CI/CD.

L'objectif n'est pas seulement de lancer un conteneur. L'objectif est de comprendre comment Docker aide à rendre une application plus reproductible, plus portable et plus simple à déployer.

## Définition simple

Docker est une plateforme qui permet d'exécuter une application dans un environnement isolé appelé conteneur.

Un conteneur contient tout ce dont l'application a besoin pour fonctionner :

- le code ;
- le runtime ;
- les dépendances ;
- les bibliothèques système ;
- la configuration nécessaire au démarrage.

L'idée principale est simple :

```text
Si l'application fonctionne dans le conteneur, elle devrait fonctionner de la même manière sur n'importe quelle machine capable d'exécuter Docker.
```

## Pourquoi Docker est important en DevOps

Docker répond à un problème très courant :

```text
Ca marche sur ma machine, mais pas sur le serveur.
```

Ce problème arrive souvent parce que les environnements sont différents :

- version différente de Node.js, Python, Java ou PHP ;
- dépendances système manquantes ;
- variables d'environnement différentes ;
- configuration réseau différente ;
- commandes de démarrage différentes.

Docker réduit ces différences en décrivant l'environnement dans des fichiers versionnés.

Dans une démarche DevOps, Docker apporte :

- reproductibilité ;
- portabilité ;
- standardisation ;
- automatisation ;
- isolation ;
- déploiements plus fiables ;
- meilleure intégration avec la CI/CD.

## Image et conteneur

Il faut bien comprendre la différence entre une image et un conteneur.

## Image Docker

Une image est un modèle.

Elle contient :

- le système de base ;
- les dépendances ;
- le code ou l'application ;
- les instructions de démarrage.

Une image est immuable : une fois construite, elle ne devrait pas être modifiée directement.

Exemple :

```text
node:20-alpine
python:3.12-slim
nginx:1.27-alpine
postgres:16
```

## Conteneur Docker

Un conteneur est une instance en cours d'exécution d'une image.

On peut comparer :

```text
Image = classe ou modèle
Conteneur = instance exécutée
```

Une même image peut servir à lancer plusieurs conteneurs.

Exemple :

```bash
docker run nginx:1.27-alpine
```

Cette commande télécharge l'image `nginx:1.27-alpine` si nécessaire, puis lance un conteneur basé sur cette image.

## Dockerfile

Un `Dockerfile` est un fichier qui décrit comment construire une image Docker.

Exemple simple :

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Chaque instruction a un rôle.

## Instructions principales

## `FROM`

Définit l'image de base.

Exemple :

```dockerfile
FROM node:20-alpine
```

Bonne pratique :

- utiliser une version précise ;
- éviter `latest` ;
- choisir une image officielle ou maintenue ;
- préférer une image légère quand c'est adapté.

Eviter :

```dockerfile
FROM node:latest
```

Préférer :

```dockerfile
FROM node:20-alpine
```

## `WORKDIR`

Définit le dossier de travail dans le conteneur.

Exemple :

```dockerfile
WORKDIR /app
```

Cela évite d'écrire des chemins longs et rend le Dockerfile plus lisible.

## `COPY`

Copie des fichiers depuis le projet vers l'image.

Exemple :

```dockerfile
COPY package*.json ./
```

Bonne pratique :

- copier d'abord les fichiers de dépendances ;
- installer les dépendances ;
- copier ensuite le reste du code.

Cela améliore le cache Docker.

## `RUN`

Exécute une commande pendant la construction de l'image.

Exemple :

```dockerfile
RUN npm ci
```

`RUN` est utilisé au moment du build, pas au démarrage du conteneur.

## `EXPOSE`

Documente le port utilisé par l'application.

Exemple :

```dockerfile
EXPOSE 3000
```

Attention :

`EXPOSE` ne publie pas automatiquement le port sur la machine hôte. Il sert surtout de documentation dans l'image.

Pour publier un port :

```bash
docker run -p 3000:3000 my-app
```

## `CMD`

Définit la commande par défaut au démarrage du conteneur.

Exemple :

```dockerfile
CMD ["npm", "start"]
```

Bonne pratique :

- utiliser le format JSON array ;
- éviter les commandes trop complexes ;
- garder une commande de démarrage claire.

## `ENTRYPOINT`

`ENTRYPOINT` définit le programme principal du conteneur.

Il est souvent utilisé pour les images qui se comportent comme une commande.

Exemple :

```dockerfile
ENTRYPOINT ["nginx"]
```

Pour la plupart des applications simples, `CMD` est suffisant.

## `.dockerignore`

Le fichier `.dockerignore` permet d'exclure des fichiers du contexte de build Docker.

Il fonctionne un peu comme `.gitignore`.

Exemple :

```dockerignore
node_modules
dist
build
coverage
.git
.env
*.log
.DS_Store
```

Pourquoi c'est important :

- build plus rapide ;
- image plus propre ;
- moins de risques de copier des secrets ;
- contexte Docker plus léger ;
- meilleure sécurité.

Un `.dockerignore` est une bonne pratique indispensable.

## Construire une image

Commande :

```bash
docker build -t my-app:1.0.0 .
```

Explication :

- `docker build` construit une image ;
- `-t my-app:1.0.0` donne un nom et un tag ;
- `.` indique le dossier de build.

## Lancer un conteneur

Commande :

```bash
docker run --name my-app -p 3000:3000 my-app:1.0.0
```

Explication :

- `--name my-app` donne un nom au conteneur ;
- `-p 3000:3000` mappe le port local vers le port du conteneur ;
- `my-app:1.0.0` indique l'image à utiliser.

## Voir les conteneurs

```bash
docker ps
```

Voir aussi les conteneurs arrêtés :

```bash
docker ps -a
```

## Arrêter et supprimer un conteneur

Arrêter :

```bash
docker stop my-app
```

Supprimer :

```bash
docker rm my-app
```

## Voir les logs

```bash
docker logs my-app
```

Suivre les logs en direct :

```bash
docker logs -f my-app
```

Les logs sont essentiels pour comprendre le comportement d'une application conteneurisée.

## Variables d'environnement

Les variables d'environnement permettent de configurer une application sans modifier son code.

Exemple :

```bash
docker run -e APP_ENV=production -e APP_PORT=3000 my-app:1.0.0
```

Bonnes pratiques :

- ne pas mettre de secrets dans le Dockerfile ;
- ne pas committer de `.env` réel ;
- fournir un `.env.example` sans valeurs sensibles ;
- utiliser un gestionnaire de secrets en production.

Mauvaise pratique :

```dockerfile
ENV DATABASE_PASSWORD=super-secret-password
```

Bonne pratique :

```dockerfile
ENV APP_ENV=production
```

Puis fournir les secrets à l'exécution via un système sécurisé.

## Volumes

Un conteneur est normalement éphémère.

Si le conteneur est supprimé, les données créées à l'intérieur peuvent disparaître.

Les volumes permettent de persister des données.

Exemple :

```bash
docker volume create postgres-data
docker run -v postgres-data:/var/lib/postgresql/data postgres:16
```

Les volumes sont utiles pour :

- bases de données ;
- fichiers générés ;
- stockage persistant ;
- développement local.

Attention :

Dans un vrai environnement de production, la gestion du stockage doit être pensée avec soin.

## Ports

Un conteneur peut écouter sur un port interne.

Pour accéder à ce port depuis la machine hôte, il faut publier le port.

Exemple :

```bash
docker run -p 8080:80 nginx:1.27-alpine
```

Cela signifie :

```text
Port 8080 de la machine -> port 80 du conteneur
```

## Docker Compose

Docker Compose permet de définir plusieurs services dans un fichier YAML.

Exemple :

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      APP_ENV: development
    depends_on:
      - database

  database:
    image: postgres:16
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: example
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Lancer :

```bash
docker compose up
```

Arrêter :

```bash
docker compose down
```

Docker Compose est très utile pour le développement local et les environnements pédagogiques.

## Docker en développement local

Docker peut aider à standardiser un environnement local.

Exemples :

- lancer une base PostgreSQL ;
- lancer Redis ;
- exécuter une application sans installer toutes les dépendances localement ;
- tester une configuration proche de la production ;
- partager un environnement avec l'équipe.

Exemple :

```bash
docker compose up --build
```

Cette commande construit les images si nécessaire et lance les services.

## Docker en CI/CD

Docker est très utilisé dans les pipelines CI/CD.

Exemples d'étapes :

```text
1. Récupérer le code
2. Installer les dépendances
3. Lancer les tests
4. Construire l'image Docker
5. Scanner l'image
6. Publier l'image dans un registry
7. Déployer l'image
```

Dans GitHub Actions, on peut construire une image à chaque Pull Request pour vérifier que le Dockerfile fonctionne.

Exemple de logique :

```text
Pull Request ouverte
  ↓
Build Docker
  ↓
Tests
  ↓
Scan de sécurité
  ↓
Validation ou échec
```

## Registry Docker

Un registry est un endroit où stocker des images Docker.

Exemples :

- Docker Hub ;
- GitHub Container Registry ;
- GitLab Container Registry ;
- Amazon ECR ;
- Google Artifact Registry ;
- Azure Container Registry.

Commande pour envoyer une image :

```bash
docker push ghcr.io/organization/my-app:1.0.0
```

Bonne pratique :

- utiliser des tags clairs ;
- éviter de déployer uniquement avec `latest` ;
- scanner les images ;
- limiter les permissions de publication.

## Tags d'image

Un tag identifie une version d'image.

Exemples :

```text
my-app:1.0.0
my-app:1.1.0
my-app:main
my-app:sha-abc123
```

Bonnes pratiques :

- utiliser un tag de version ;
- ajouter parfois un tag basé sur le commit SHA ;
- éviter de dépendre uniquement de `latest` ;
- garder une trace entre image, commit Git et release.

Exemple :

```text
Image Docker : my-app:1.2.0
Commit Git   : a1b2c3d
Release      : v1.2.0
```

## Multi-stage build

Un build multi-stage permet de construire une image finale plus légère.

Exemple Node.js :

```dockerfile
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]
```

Avantages :

- image finale plus petite ;
- moins de dépendances inutiles ;
- meilleure sécurité ;
- séparation claire entre build et exécution.

## Sécurité Docker

Docker améliore l'isolation, mais il ne remplace pas la sécurité.

Bonnes pratiques importantes :

- ne pas exécuter l'application en root si possible ;
- utiliser des images officielles et maintenues ;
- scanner les images ;
- éviter les secrets dans les images ;
- utiliser `.dockerignore` ;
- réduire la taille des images ;
- mettre à jour les images de base ;
- limiter les permissions ;
- éviter de monter le socket Docker sans raison.

## Eviter l'utilisateur root

Par défaut, beaucoup d'images exécutent les processus en root.

Quand c'est possible, créer un utilisateur dédié :

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN addgroup -S app && adduser -S app -G app
USER app

CMD ["npm", "start"]
```

Cela réduit l'impact en cas de compromission de l'application.

## Scanner les images

Il faut scanner les images pour détecter les vulnérabilités.

Outils fréquents :

- Trivy ;
- Grype ;
- Snyk ;
- Docker Scout.

Exemple avec Trivy :

```bash
trivy image my-app:1.0.0
```

Dans une pipeline CI/CD, un scan peut être exécuté automatiquement avant publication.

## Optimiser la taille des images

Une image plus petite est souvent :

- plus rapide à télécharger ;
- plus rapide à déployer ;
- plus simple à scanner ;
- moins exposée aux vulnérabilités.

Bonnes pratiques :

- utiliser `.dockerignore` ;
- choisir une image de base adaptée ;
- supprimer les fichiers inutiles ;
- utiliser un build multi-stage ;
- éviter d'installer des outils non nécessaires en production.

## Cache Docker

Docker utilise un cache pour accélérer les builds.

L'ordre des instructions dans le `Dockerfile` est important.

Mauvais exemple :

```dockerfile
COPY . .
RUN npm ci
```

Si un fichier change, Docker relance souvent l'installation des dépendances.

Meilleur exemple :

```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
```

Les dépendances ne sont réinstallées que si `package.json` ou `package-lock.json` change.

## Docker et Kubernetes

Docker permet de créer des images de conteneurs.

Kubernetes permet d'orchestrer ces conteneurs à plus grande échelle.

Relation simple :

```text
Docker construit l'image.
Kubernetes exécute et orchestre les conteneurs.
```

Avant d'apprendre Kubernetes, il est important de comprendre :

- image ;
- conteneur ;
- port ;
- volume ;
- variable d'environnement ;
- logs ;
- healthcheck.

## Healthcheck

Un healthcheck permet de vérifier si une application est en bonne santé.

Exemple :

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1
```

Un healthcheck est utile pour :

- détecter une application bloquée ;
- améliorer l'orchestration ;
- faciliter les redémarrages automatiques ;
- mieux intégrer Docker avec Kubernetes ou Docker Compose.

## Logs

Une application conteneurisée doit écrire ses logs sur la sortie standard.

Bonne pratique :

```text
stdout pour les logs normaux
stderr pour les erreurs
```

Cela permet à Docker, Kubernetes ou une plateforme de monitoring de collecter les logs proprement.

Eviter :

- logs uniquement dans un fichier interne au conteneur ;
- logs non structurés pour les erreurs importantes ;
- logs contenant des secrets.

## Bonnes pratiques Dockerfile

Résumé des règles importantes :

- utiliser une image de base précise ;
- éviter `latest` en production ;
- utiliser `.dockerignore` ;
- optimiser l'ordre des instructions ;
- utiliser `npm ci` plutôt que `npm install` en CI ;
- séparer build et runtime avec multi-stage ;
- ne pas mettre de secrets dans l'image ;
- exécuter avec un utilisateur non-root quand possible ;
- scanner les images ;
- garder une commande de démarrage simple ;
- documenter le port avec `EXPOSE`.

## Mauvaises pratiques fréquentes

## Utiliser `latest` partout

Mauvais :

```dockerfile
FROM node:latest
```

Risque :

- build non reproductible ;
- changement inattendu ;
- comportement différent dans le temps.

Meilleur :

```dockerfile
FROM node:20-alpine
```

## Copier tout le projet sans `.dockerignore`

Mauvais :

```dockerfile
COPY . .
```

Sans `.dockerignore`, cela peut copier :

- `.git` ;
- `node_modules` ;
- `.env` ;
- logs ;
- fichiers temporaires.

## Mettre des secrets dans l'image

Mauvais :

```dockerfile
ENV API_KEY=real-secret-key
```

Meilleur :

```text
Fournir le secret à l'exécution via GitHub Secrets, Kubernetes Secrets ou un gestionnaire de secrets.
```

## Installer trop d'outils inutiles

Une image de production ne doit pas contenir tous les outils de développement si elle n'en a pas besoin.

Risque :

- image plus lourde ;
- surface d'attaque plus grande ;
- scans de sécurité plus bruyants.

## Ne jamais scanner les images

Un Dockerfile peut fonctionner tout en contenant des dépendances vulnérables.

Le scan d'image doit faire partie de la CI/CD dès que possible.

## Checklist Docker

Avant de valider un Dockerfile :

- [ ] L'image de base utilise une version précise.
- [ ] Le fichier `.dockerignore` existe.
- [ ] Les dépendances sont installées avant la copie complète du code.
- [ ] Aucun secret n'est présent dans l'image.
- [ ] Le conteneur n'exécute pas l'application en root si possible.
- [ ] Le port est documenté avec `EXPOSE`.
- [ ] La commande de démarrage est claire.
- [ ] L'image peut être construite localement.
- [ ] L'image peut être lancée localement.
- [ ] Les logs sortent sur stdout/stderr.
- [ ] Un scan de sécurité est prévu.

## Commandes essentielles

Construire une image :

```bash
docker build -t my-app:1.0.0 .
```

Lister les images :

```bash
docker images
```

Lancer un conteneur :

```bash
docker run --name my-app -p 3000:3000 my-app:1.0.0
```

Lister les conteneurs actifs :

```bash
docker ps
```

Lister tous les conteneurs :

```bash
docker ps -a
```

Voir les logs :

```bash
docker logs -f my-app
```

Exécuter une commande dans un conteneur :

```bash
docker exec -it my-app sh
```

Arrêter un conteneur :

```bash
docker stop my-app
```

Supprimer un conteneur :

```bash
docker rm my-app
```

Supprimer une image :

```bash
docker rmi my-app:1.0.0
```

Lancer Docker Compose :

```bash
docker compose up --build
```

Arrêter Docker Compose :

```bash
docker compose down
```

## Résumé pour débutants

Si tu débutes, retiens :

- Docker permet d'exécuter une application dans un conteneur ;
- une image est un modèle ;
- un conteneur est une instance lancée depuis une image ;
- un `Dockerfile` décrit comment construire une image ;
- `.dockerignore` évite de copier des fichiers inutiles ou sensibles ;
- Docker Compose permet de lancer plusieurs services ensemble ;
- les secrets ne doivent jamais être dans l'image.

## Résumé pour niveau intermédiaire

Si tu as déjà les bases, concentre-toi sur :

- optimiser le cache Docker ;
- écrire un Dockerfile lisible ;
- utiliser des tags clairs ;
- séparer configuration et code ;
- utiliser Docker Compose pour le local ;
- scanner les images ;
- comprendre les volumes, ports et variables d'environnement.

## Résumé pour niveau avancé

Pour aller plus loin, approfondir :

- multi-stage builds ;
- images distroless ;
- SBOM ;
- signature d'images ;
- provenance des builds ;
- registry privé ;
- scans CI/CD ;
- rootless containers ;
- politiques de sécurité Kubernetes ;
- optimisation de taille et de temps de build.

## Conclusion

Docker est une brique essentielle dans beaucoup de pratiques DevOps modernes.

Il permet de standardiser l'environnement d'exécution, de réduire les différences entre machines, d'améliorer la reproductibilité et de préparer des déploiements plus fiables.

Mais Docker doit être utilisé avec discipline :

- images versionnées ;
- Dockerfile propre ;
- `.dockerignore` ;
- pas de secrets ;
- sécurité ;
- scans ;
- CI/CD ;
- documentation.

Un bon usage de Docker ne consiste pas seulement à faire fonctionner une application dans un conteneur. Il consiste à rendre son exécution compréhensible, reproductible, sécurisée et maintenable.

## Prochaine étape recommandée

La prochaine étape logique est d'ajouter des exemples pratiques :

```text
examples/docker/Dockerfile
examples/docker/docker-compose.yml
examples/docker/.dockerignore
```

Ces fichiers permettront de passer de la théorie à la pratique avec une base Docker professionnelle et réutilisable.
