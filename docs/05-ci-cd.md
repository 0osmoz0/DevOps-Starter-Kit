# CI/CD

## Objectif de ce document

Ce document explique la CI/CD de manière progressive, pratique et professionnelle.

Il s'adresse à plusieurs niveaux :

- débutant : comprendre ce que signifient CI, CD et pipeline ;
- intermédiaire : savoir lire et structurer un workflow CI/CD ;
- avancé : intégrer qualité, sécurité, Docker, releases, environnements et stratégie de déploiement.

L'objectif n'est pas seulement de lancer une automatisation. L'objectif est de construire une chaîne fiable qui vérifie, construit, sécurise et prépare les livraisons d'un projet.

## Définition simple

CI/CD signifie généralement :

```text
CI = Continuous Integration
CD = Continuous Delivery ou Continuous Deployment
```

En français :

- CI : intégration continue ;
- Continuous Delivery : livraison continue ;
- Continuous Deployment : déploiement continu.

La CI/CD permet d'automatiser les étapes importantes d'un projet logiciel :

- installation des dépendances ;
- vérification du code ;
- tests ;
- build ;
- génération d'artefacts ;
- scan de sécurité ;
- publication d'image Docker ;
- préparation de release ;
- déploiement.

## Pourquoi la CI/CD est essentielle en DevOps

La CI/CD est l'une des pratiques les plus importantes du DevOps.

Elle permet de répondre à plusieurs problèmes classiques :

- les tests sont oubliés ;
- les builds cassent trop tard ;
- les déploiements sont manuels ;
- les erreurs arrivent en production ;
- les environnements ne sont pas cohérents ;
- les releases sont difficiles à reproduire ;
- les secrets sont mal gérés ;
- les changements ne sont pas assez vérifiés.

Une bonne pipeline CI/CD rend le projet plus fiable, car les mêmes vérifications sont lancées automatiquement pour chaque changement.

## Différence entre CI et CD

## Continuous Integration

L'intégration continue consiste à intégrer régulièrement les changements dans une branche principale, généralement `main`.

Chaque changement doit être vérifié automatiquement.

Exemples de vérifications CI :

- lint ;
- tests unitaires ;
- tests d'intégration ;
- build ;
- validation YAML ;
- validation Dockerfile ;
- scan de secrets ;
- scan de dépendances.

Objectif :

```text
Détecter les erreurs le plus tôt possible.
```

## Continuous Delivery

La livraison continue consiste à produire automatiquement une version prête à être déployée.

La pipeline prépare la livraison, mais le déploiement final peut rester manuel.

Exemples :

- créer une archive ;
- construire une image Docker ;
- publier un artefact ;
- préparer une release ;
- générer un changelog ;
- pousser une image dans un registry.

Objectif :

```text
Avoir une version prête à déployer à tout moment.
```

## Continuous Deployment

Le déploiement continu va plus loin.

Chaque changement validé peut être automatiquement déployé dans un environnement.

Exemples :

- merge dans `main` ;
- pipeline complète verte ;
- image Docker publiée ;
- déploiement automatique en staging ;
- éventuellement déploiement automatique en production.

Objectif :

```text
Déployer automatiquement les changements validés.
```

Attention :

Le déploiement continu demande une très bonne maturité technique : tests solides, rollback, monitoring, alerting et sécurité.

## Résumé CI/CD

```text
CI = vérifier le code
Delivery = préparer une version livrable
Deployment = déployer automatiquement
```

## Qu'est-ce qu'une pipeline ?

Une pipeline est une suite d'étapes automatisées.

Exemple simple :

```text
Pull Request
  -> installation
  -> lint
  -> tests
  -> build
  -> scan sécurité
  -> résultat
```

Une pipeline peut être exécutée :

- à chaque push ;
- à chaque pull request ;
- lors de la création d'un tag ;
- manuellement ;
- selon une planification ;
- après un autre workflow.

## Anatomie d'une pipeline

Une pipeline est généralement composée de plusieurs éléments.

## Workflow

Un workflow est le fichier qui décrit l'automatisation.

Avec GitHub Actions, il se trouve dans :

```text
.github/workflows/
```

Exemple :

```text
.github/workflows/docs-quality.yml
```

## Trigger

Le trigger définit quand la pipeline se lance.

Exemples :

```yaml
on:
  pull_request:
  push:
  workflow_dispatch:
```

## Job

Un job est un groupe d'étapes exécutées sur un runner.

Exemple :

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
```

## Step

Une step est une action ou une commande dans un job.

Exemple :

```yaml
- name: Run tests
  run: npm test
```

## Runner

Un runner est la machine qui exécute le workflow.

Exemples :

- `ubuntu-latest` ;
- `windows-latest` ;
- `macos-latest` ;
- runner auto-hébergé.

## Artifact

Un artifact est un fichier produit par la pipeline.

Exemples :

- rapport de tests ;
- archive ;
- build applicatif ;
- couverture de code ;
- fichier SBOM ;
- résultat de scan.

## GitHub Actions

GitHub Actions est l'outil CI/CD intégré à GitHub.

Il permet de définir des workflows avec des fichiers YAML.

Exemple minimal :

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run check
        run: echo "CI is running"
```

Ce workflow :

- se lance sur pull request ;
- se lance sur push vers `main` ;
- exécute un job sur Ubuntu ;
- affiche un message.

## Triggers recommandés

## Pull request

Le trigger le plus important pour ce dépôt :

```yaml
on:
  pull_request:
    branches:
      - main
```

Objectif :

- vérifier une contribution avant merge ;
- protéger `main` ;
- donner un retour rapide ;
- éviter les régressions.

## Push sur main

Exemple :

```yaml
on:
  push:
    branches:
      - main
```

Objectif :

- vérifier ce qui vient d'être fusionné ;
- publier une version ;
- créer un artefact ;
- déclencher une release.

## Tags

Exemple :

```yaml
on:
  push:
    tags:
      - "v*.*.*"
```

Objectif :

- publier une release ;
- construire une image versionnée ;
- générer un changelog ;
- envoyer un artefact dans un registry.

## Lancement manuel

Exemple :

```yaml
on:
  workflow_dispatch:
```

Objectif :

- relancer une vérification ;
- exécuter une maintenance ;
- déclencher un déploiement contrôlé.

## Planification

Exemple :

```yaml
on:
  schedule:
    - cron: "0 6 * * 1"
```

Objectif :

- scanner les dépendances régulièrement ;
- vérifier des liens ;
- lancer des contrôles de sécurité ;
- auditer le projet.

## Pipeline recommandée pour une pull request

Pour une pull request, la pipeline doit répondre à une question :

```text
Est-ce que ce changement peut être fusionné sans dégrader le projet ?
```

Etapes recommandées :

```text
1. Checkout du code
2. Installation des dépendances
3. Lint
4. Tests
5. Build
6. Validation des fichiers de configuration
7. Scan de secrets
8. Scan de dépendances
9. Résultat visible dans la PR
```

## Pipeline recommandée pour main

Pour `main`, la pipeline doit répondre à une autre question :

```text
Est-ce que la version stable peut être préparée ou publiée ?
```

Etapes possibles :

```text
1. Vérifications complètes
2. Build de l'application
3. Build Docker
4. Scan de l'image
5. Publication d'artefacts
6. Mise à jour du changelog
7. Création de tag ou release
8. Déploiement staging
```

## Pipeline recommandée pour un tag

Pour un tag comme `v1.0.0`, la pipeline peut publier une version.

Exemple :

```text
1. Vérifier le tag
2. Construire l'application
3. Construire l'image Docker
4. Tagger l'image avec la version
5. Scanner l'image
6. Publier l'image dans un registry
7. Créer une GitHub Release
8. Attacher les artefacts
```

## Exemple de workflow qualité

Ce dépôt contient déjà un workflow de qualité documentaire :

```text
.github/workflows/docs-quality.yml
```

Il vérifie :

- Markdown ;
- liens Markdown ;
- YAML ;
- workflows GitHub Actions ;
- hygiène de fichiers sensibles ;
- secrets avec Gitleaks.

C'est une première vraie étape CI/CD, car le dépôt applique automatiquement ses propres standards.

## Exemple de pipeline Node.js

Exemple pour une application Node.js :

```yaml
name: Node.js CI

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
```

Cette pipeline vérifie qu'une application Node.js peut être installée, testée et construite.

## Exemple de pipeline Docker

Pour un projet Docker, il faut vérifier que l'image se construit.

Exemple :

```yaml
name: Docker CI

on:
  pull_request:
    branches:
      - main

permissions:
  contents: read

jobs:
  docker-build:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t app:test .
```

Pour ce dépôt, un futur workflow pourrait cibler :

```text
examples/docker/
```

## Exemple de pipeline Docker Compose

Docker Compose peut être validé en CI.

Exemple :

```yaml
name: Docker Compose CI

on:
  pull_request:
    branches:
      - main

permissions:
  contents: read

jobs:
  compose:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Validate Compose file
        run: docker compose -f examples/docker/docker-compose.yml config

      - name: Build services
        run: docker compose -f examples/docker/docker-compose.yml build
```

Cela vérifie que le fichier Compose est valide et que les images se construisent.

## Exemple de scan Docker avec Trivy

Trivy permet de scanner une image Docker.

Exemple :

```yaml
name: Container Security

on:
  pull_request:
    branches:
      - main

permissions:
  contents: read
  security-events: write

jobs:
  trivy:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t docker-example:test examples/docker

      - name: Scan Docker image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: docker-example:test
          format: table
          exit-code: "1"
          severity: HIGH,CRITICAL
```

Ce scan échoue si une vulnérabilité importante est détectée.

## Secrets dans la CI/CD

Les secrets sont des informations sensibles.

Exemples :

- token API ;
- mot de passe ;
- clé privée ;
- clé cloud ;
- token de registry ;
- webhook ;
- identifiant de base de données.

Règles importantes :

- ne jamais écrire un secret en clair dans un workflow ;
- utiliser GitHub Secrets ;
- limiter les permissions ;
- éviter d'afficher les secrets dans les logs ;
- utiliser des secrets différents par environnement ;
- révoquer un secret en cas de fuite.

## GitHub Secrets

Dans GitHub, les secrets se configurent dans :

```text
Settings -> Secrets and variables -> Actions
```

Exemple d'utilisation :

```yaml
env:
  REGISTRY_TOKEN: ${{ secrets.REGISTRY_TOKEN }}
```

Attention :

Même si GitHub masque souvent les secrets dans les logs, il ne faut jamais les afficher volontairement.

## Permissions minimales

Un workflow ne doit pas avoir plus de permissions que nécessaire.

Bonne pratique :

```yaml
permissions:
  contents: read
```

Pour publier une image dans GitHub Container Registry :

```yaml
permissions:
  contents: read
  packages: write
```

Pour envoyer des résultats de scan de sécurité :

```yaml
permissions:
  contents: read
  security-events: write
```

Eviter :

```yaml
permissions: write-all
```

sauf cas exceptionnel et justifié.

## Cache dans une pipeline

Le cache accélère les pipelines.

Exemple avec Node.js :

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: npm
```

Le cache est utile pour :

- dépendances Node.js ;
- dépendances Python ;
- dépendances Maven ;
- layers Docker ;
- outils téléchargés.

Attention :

Un cache mal configuré peut provoquer des comportements difficiles à comprendre. Il faut toujours privilégier la reproductibilité.

## Matrix builds

Une matrix permet de tester plusieurs versions ou environnements.

Exemple :

```yaml
strategy:
  matrix:
    node-version:
      - "18"
      - "20"
      - "22"
```

Utilisation :

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: ${{ matrix.node-version }}
```

Cela permet de vérifier qu'un projet fonctionne avec plusieurs versions.

## Artefacts

Les artefacts permettent de conserver des fichiers produits par la pipeline.

Exemple :

```yaml
- name: Upload test report
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: reports/
```

Exemples d'artefacts utiles :

- rapport de tests ;
- couverture de code ;
- build frontend ;
- fichier SBOM ;
- logs de diagnostic ;
- archive de release.

## Environments

GitHub Actions permet de définir des environnements.

Exemples :

- `development` ;
- `staging` ;
- `production`.

Les environnements peuvent avoir :

- des secrets dédiés ;
- des variables dédiées ;
- des règles de validation ;
- des approbations manuelles ;
- des protections.

Exemple :

```yaml
environment: production
```

Bonne pratique :

Un déploiement production doit souvent demander une validation manuelle.

## Branch protection

La CI/CD est plus utile quand `main` est protégée.

Règles recommandées :

- pull request obligatoire ;
- checks CI obligatoires ;
- revue obligatoire ;
- conversations résolues ;
- pas de force push ;
- suppression de branche après merge.

Objectif :

```text
Impossible de casser main sans passer par les vérifications.
```

## Status checks

Un status check est un résultat de workflow visible dans une pull request.

Exemples :

- `Markdown lint` ;
- `YAML lint` ;
- `Docker build` ;
- `Secret hygiene` ;
- `Tests`.

Dans un projet pro, certains checks deviennent obligatoires avant merge.

## Sécurité de la supply chain

La CI/CD fait partie de la supply chain logicielle.

Risques possibles :

- dépendances compromises ;
- action GitHub malveillante ;
- secret exposé ;
- image Docker vulnérable ;
- artefact modifié ;
- permissions trop larges ;
- runner compromis.

Bonnes pratiques :

- utiliser des actions connues ;
- éviter les permissions trop larges ;
- scanner les dépendances ;
- scanner les images ;
- générer un SBOM ;
- signer les images si nécessaire ;
- protéger les environnements sensibles.

## Pinning des actions

Les actions GitHub sont souvent utilisées comme ceci :

```yaml
uses: actions/checkout@v4
```

C'est lisible et courant.

Pour un niveau de sécurité plus élevé, on peut pinner une action à un commit SHA.

Exemple :

```yaml
uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11
```

Avantage :

- l'action ne change pas de manière inattendue.

Inconvénient :

- maintenance plus lourde.

Pour ce dépôt pédagogique, utiliser les versions majeures comme `@v4` est acceptable. Il est important de connaître le compromis.

## Déploiement en CI/CD

Un déploiement automatisé doit être préparé avec soin.

Avant de déployer, il faut vérifier :

- tests verts ;
- build valide ;
- image scannée ;
- secrets configurés ;
- environnement cible disponible ;
- stratégie de rollback ;
- monitoring actif.

Une pipeline de déploiement ne doit pas simplement envoyer du code en production sans contrôle.

## Stratégies de déploiement

## Déploiement simple

Remplacer l'ancienne version par la nouvelle.

Avantage :

- simple.

Risque :

- interruption possible ;
- rollback parfois manuel.

## Rolling update

Mettre à jour progressivement les instances.

Avantage :

- réduit l'indisponibilité.

Utilisé souvent avec Kubernetes.

## Blue-green deployment

Maintenir deux environnements :

- blue : version actuelle ;
- green : nouvelle version.

Le trafic bascule vers la nouvelle version après validation.

Avantage :

- rollback rapide.

## Canary release

Déployer la nouvelle version à une petite partie des utilisateurs.

Avantage :

- limiter l'impact d'un problème ;
- observer le comportement réel avant généralisation.

## Rollback

Un rollback permet de revenir à une version précédente.

Une bonne CI/CD doit permettre de répondre à cette question :

```text
Si le déploiement casse, comment revient-on en arrière ?
```

Bonnes pratiques :

- garder les anciennes images ;
- tagger les versions ;
- documenter la procédure ;
- tester le rollback ;
- surveiller après rollback.

## Releases

Une release représente une version publiée du projet.

Elle peut contenir :

- un tag Git ;
- un changelog ;
- des artefacts ;
- une image Docker ;
- une note de release.

Exemple de tag :

```text
v1.0.0
```

Exemple de pipeline release :

```text
push tag v1.0.0
  -> tests
  -> build
  -> docker build
  -> scan
  -> docker push
  -> GitHub Release
```

## Versioning et CI/CD

Le versioning sémantique aide à automatiser les releases.

Format :

```text
MAJOR.MINOR.PATCH
```

Lien avec Conventional Commits :

- `fix` peut produire un patch ;
- `feat` peut produire une minor ;
- `BREAKING CHANGE` peut produire une major.

Dans un projet avancé, des outils peuvent automatiser cela.

Exemples :

- semantic-release ;
- release-please ;
- standard-version ;
- changesets.

## Observabilité de la pipeline

Une pipeline doit être observable.

Il faut pouvoir comprendre :

- quelle étape a échoué ;
- pourquoi elle a échoué ;
- combien de temps elle a duré ;
- quel commit est concerné ;
- quel environnement est touché.

Bonnes pratiques :

- noms de jobs clairs ;
- logs lisibles ;
- timeouts ;
- artefacts de diagnostic ;
- messages d'erreur utiles ;
- notifications si nécessaire.

## Timeouts

Chaque job important devrait avoir un timeout.

Exemple :

```yaml
timeout-minutes: 10
```

Pourquoi :

- éviter les workflows bloqués ;
- réduire les coûts ;
- détecter les hangs ;
- garder des feedbacks rapides.

## Concurrency

La concurrence permet d'annuler un workflow ancien quand un nouveau commit arrive.

Exemple :

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

Avantage :

- moins de runs inutiles ;
- résultats plus pertinents ;
- feedback plus rapide.

## Path filters

Les path filters permettent de lancer une pipeline seulement quand certains fichiers changent.

Exemple :

```yaml
on:
  pull_request:
    paths:
      - "**/*.md"
      - ".github/workflows/**"
```

Avantage :

- moins de runs inutiles ;
- pipeline plus rapide ;
- coût réduit.

Attention :

Il ne faut pas filtrer trop agressivement si cela peut masquer un problème.

## Qualité des workflows

Les workflows eux-mêmes doivent être vérifiés.

Outil recommandé :

```text
actionlint
```

Il permet de détecter :

- erreurs YAML ;
- erreurs GitHub Actions ;
- erreurs shell ;
- variables invalides ;
- problèmes de syntaxe.

Ce dépôt utilise déjà `actionlint` dans son workflow qualité documentaire.

## Validation Markdown et YAML

Dans un repo DevOps, Markdown et YAML sont très présents.

Markdown :

- documentation ;
- README ;
- guides ;
- changelog.

YAML :

- GitHub Actions ;
- Docker Compose ;
- Kubernetes ;
- Ansible ;
- configuration CI/CD.

Il est donc important de les valider automatiquement.

## Scan de secrets

Un scan de secrets cherche des informations sensibles dans le dépôt.

Outils possibles :

- Gitleaks ;
- TruffleHog ;
- detect-secrets ;
- GitHub secret scanning.

Le scan de secrets doit idéalement être lancé :

- sur pull request ;
- sur push vers `main` ;
- régulièrement ;
- avant une release.

## Scan de dépendances

Les dépendances peuvent contenir des vulnérabilités.

Outils possibles :

- Dependabot ;
- npm audit ;
- pip-audit ;
- osv-scanner ;
- Snyk ;
- Trivy.

Bonne pratique :

Automatiser la détection, mais garder une revue humaine pour comprendre l'impact réel.

## Scan Infrastructure as Code

Quand le dépôt contiendra Terraform ou Kubernetes, il faudra scanner les fichiers IaC.

Outils possibles :

- Checkov ;
- tfsec ;
- Terrascan ;
- kube-score ;
- kube-linter ;
- conftest.

Objectif :

- détecter des configurations dangereuses ;
- éviter les permissions trop larges ;
- repérer les erreurs avant déploiement.

## Exemple d'architecture CI/CD complète

Voici une chaîne CI/CD réaliste pour un projet conteneurisé :

```text
Pull Request
  -> lint
  -> tests
  -> build application
  -> build image Docker
  -> scan secrets
  -> scan dependencies
  -> scan image Docker
  -> validation IaC
  -> review
  -> merge main
  -> tag release
  -> publish image
  -> deploy staging
  -> smoke tests
  -> approval production
  -> deploy production
  -> monitoring
```

Toutes les étapes ne sont pas nécessaires au début, mais cette vision aide à comprendre une chaîne DevOps mature.

## CI/CD pour ce dépôt

Pour ce dépôt pédagogique, la progression recommandée est :

```text
1. docs-quality.yml
2. docker-example.yml
3. security-scan.yml
4. terraform-validation.yml
5. kubernetes-validation.yml
6. release.yml
```

Chaque workflow doit avoir :

- un objectif clair ;
- un nom explicite ;
- des permissions minimales ;
- des timeouts ;
- des logs lisibles ;
- une documentation associée.

## Bonnes pratiques CI/CD

## Garder les pipelines rapides

Une pipeline trop lente décourage les contributions.

Objectifs :

- feedback rapide ;
- étapes parallèles quand possible ;
- cache utile ;
- path filters intelligents ;
- timeouts.

## Garder les pipelines lisibles

Une pipeline doit être maintenable.

Bonne pratique :

- noms de jobs clairs ;
- étapes courtes ;
- scripts complexes déplacés dans `scripts/` ;
- commentaires rares mais utiles ;
- logique répétée factorisée si nécessaire.

## Ne pas cacher les erreurs

Eviter :

```yaml
continue-on-error: true
```

sauf cas très précis.

Une pipeline doit échouer clairement quand une règle importante est cassée.

## Ne pas abuser des secrets

Un workflow de pull request venant d'une branche externe ne doit pas recevoir des secrets sensibles sans précaution.

Bonne pratique :

- ne pas exposer de secrets aux PR non fiables ;
- limiter les permissions ;
- utiliser des environnements protégés ;
- séparer vérification et déploiement.

## Tester localement quand possible

Certaines commandes peuvent être testées localement avant push :

```bash
docker compose config
docker build -t app:test .
npm test
yamllint file.yml
```

Cela réduit les aller-retours avec GitHub Actions.

## Erreurs fréquentes

## Pipeline trop complexe trop tôt

Une pipeline doit évoluer avec le projet.

Mauvaise approche :

```text
Ajouter Kubernetes, Terraform, scan avancé, release et déploiement avant d'avoir une base stable.
```

Meilleure approche :

```text
Commencer par lint, tests et build.
Ajouter la sécurité et le déploiement progressivement.
```

## Secrets en clair dans YAML

Mauvais :

```yaml
env:
  API_TOKEN: "real-token-value"
```

Meilleur :

```yaml
env:
  API_TOKEN: ${{ secrets.API_TOKEN }}
```

## Pas de timeout

Un job sans timeout peut rester bloqué longtemps.

Meilleur :

```yaml
timeout-minutes: 10
```

## Permissions trop larges

Mauvais :

```yaml
permissions: write-all
```

Meilleur :

```yaml
permissions:
  contents: read
```

## Utiliser uniquement latest

Pour Docker :

```text
latest
```

peut être pratique localement, mais ce n'est pas suffisant pour des releases.

Préférer :

```text
my-app:1.0.0
my-app:sha-a1b2c3d
```

## Ne pas vérifier les déploiements

Un déploiement doit être suivi par des vérifications.

Exemples :

- endpoint `/health` ;
- smoke test ;
- logs ;
- métriques ;
- alertes ;
- rollback possible.

## Checklist pull request

Avant de merger une pull request, vérifier :

- [ ] La CI est verte.
- [ ] Les tests importants sont passés.
- [ ] Le lint est passé.
- [ ] Aucun secret n'est détecté.
- [ ] Les fichiers YAML sont valides.
- [ ] Les workflows sont valides.
- [ ] Les changements sont relus.
- [ ] La branche est à jour avec `main` si nécessaire.

## Checklist workflow GitHub Actions

Avant d'ajouter un workflow :

- [ ] Le nom du workflow est clair.
- [ ] Les triggers sont adaptés.
- [ ] Les permissions sont minimales.
- [ ] Les jobs ont des noms explicites.
- [ ] Les jobs ont des timeouts.
- [ ] Les steps sont lisibles.
- [ ] Les secrets ne sont pas exposés.
- [ ] Le workflow est validé avec `actionlint`.
- [ ] La documentation explique son objectif.

## Checklist release

Avant une release :

- [ ] `main` est stable.
- [ ] Le changelog est à jour.
- [ ] Le tag respecte le versioning.
- [ ] Les tests sont passés.
- [ ] L'image Docker est construite.
- [ ] L'image est scannée.
- [ ] Les artefacts sont publiés.
- [ ] La release est documentée.
- [ ] Le rollback est possible.

## Commandes utiles

Valider un fichier Compose :

```bash
docker compose -f examples/docker/docker-compose.yml config
```

Construire une image Docker :

```bash
docker build -t docker-example:test examples/docker
```

Lancer un workflow manuellement :

```text
GitHub -> Actions -> Workflow -> Run workflow
```

Voir les runs GitHub Actions avec GitHub CLI :

```bash
gh run list
```

Voir les logs d'un run :

```bash
gh run view --log
```

Relancer un run :

```bash
gh run rerun <run-id>
```

## Résumé pour débutants

Si tu débutes, retiens :

- la CI vérifie automatiquement le code ;
- la CD prépare ou déploie une version ;
- une pipeline est une suite d'étapes automatisées ;
- une pull request doit déclencher des checks ;
- `main` doit rester stable ;
- les secrets ne doivent jamais être en clair ;
- un workflow GitHub Actions est un fichier YAML.

## Résumé pour niveau intermédiaire

Si tu as déjà les bases, concentre-toi sur :

- triggers adaptés ;
- jobs clairs ;
- permissions minimales ;
- timeouts ;
- cache ;
- artefacts ;
- scans de sécurité ;
- Docker build ;
- branch protection.

## Résumé pour niveau avancé

Pour aller plus loin, approfondir :

- release automation ;
- semantic-release ;
- GitHub environments ;
- deployment strategies ;
- SBOM ;
- signature d'images ;
- provenance SLSA ;
- policy as code ;
- runners auto-hébergés ;
- déploiements Kubernetes ;
- rollback automatisé.

## Conclusion

La CI/CD transforme un projet en système plus fiable, plus traçable et plus professionnel.

Une bonne pipeline ne sert pas seulement à automatiser. Elle sert à protéger le projet, accélérer les retours, réduire les erreurs et rendre les livraisons plus prévisibles.

Pour ce dépôt, la stratégie recommandée est progressive :

```text
qualité documentation
  -> Docker build
  -> scans sécurité
  -> validation IaC
  -> Kubernetes
  -> releases
  -> déploiement
```

Une CI/CD professionnelle doit rester claire, sécurisée, maintenable et adaptée au niveau réel du projet.

## Prochaine étape recommandée

La prochaine étape logique est d'ajouter des exemples GitHub Actions dédiés :

```text
examples/github-actions/
```

Puis un workflow réel pour l'exemple Docker :

```text
.github/workflows/docker-example.yml
```

Ce workflow pourra construire l'image Docker, valider Docker Compose et scanner l'image avec Trivy.
