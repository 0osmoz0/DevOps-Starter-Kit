# Introduction au DevOps

## Objectif de ce document

Ce document explique les bases du DevOps de manière progressive, pour être compréhensible par des débutants tout en restant utile pour des personnes ayant déjà des notions de développement, d'administration système ou de cloud.

L'objectif n'est pas seulement de connaître des outils comme Docker, Kubernetes ou GitHub Actions. L'objectif principal est de comprendre la logique DevOps : mieux collaborer, automatiser ce qui peut l'être, livrer plus souvent, réduire les erreurs et améliorer continuellement la qualité d'un projet.

## Définition simple

Le DevOps est une approche qui rapproche deux mondes historiquement séparés :

- le développement, qui consiste à créer et faire évoluer une application ;
- les opérations, qui consistent à déployer, configurer, surveiller et maintenir cette application en fonctionnement.

Le mot DevOps vient de :

```text
Development + Operations = DevOps
```

En pratique, le DevOps cherche à rendre le cycle de vie d'une application plus fluide, plus rapide et plus fiable, depuis l'écriture du code jusqu'à son exécution en production.

## Pourquoi le DevOps existe ?

Dans beaucoup de projets traditionnels, les équipes travaillent de manière séparée :

- les développeurs écrivent le code ;
- les administrateurs système préparent les serveurs ;
- les testeurs valident l'application ;
- une autre équipe s'occupe du déploiement ;
- une autre équipe surveille les incidents.

Cette séparation peut créer plusieurs problèmes :

- manque de communication entre les équipes ;
- déploiements manuels longs et risqués ;
- différences entre les environnements de développement, test et production ;
- bugs découverts trop tard ;
- difficultés à comprendre l'origine d'un incident ;
- temps de livraison trop long.

Le DevOps propose une autre manière de travailler : automatiser, documenter, standardiser et collaborer dès le début du projet.

## DevOps n'est pas seulement un outil

Une erreur fréquente consiste à penser que DevOps signifie seulement utiliser Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions ou Terraform.

Ces outils sont importants, mais ils ne suffisent pas.

DevOps repose sur trois piliers :

- une culture de collaboration ;
- des pratiques d'automatisation ;
- des outils adaptés au besoin du projet.

Un projet peut utiliser Kubernetes et avoir de mauvaises pratiques DevOps. A l'inverse, un petit projet peut appliquer une très bonne démarche DevOps avec Git, Docker, une pipeline CI simple et une documentation claire.

## Les objectifs principaux du DevOps

Le DevOps cherche à atteindre plusieurs objectifs concrets.

### Livrer plus rapidement

L'objectif est de réduire le temps entre une modification du code et sa mise à disposition dans un environnement utilisable.

Cela ne signifie pas livrer sans réfléchir. Cela signifie mettre en place un processus fiable pour livrer régulièrement, avec moins d'effort manuel.

### Améliorer la qualité

Une bonne approche DevOps automatise les vérifications importantes :

- tests ;
- lint ;
- analyse de sécurité ;
- build ;
- validation de configuration ;
- vérification des fichiers d'infrastructure.

Plus les vérifications sont automatisées tôt, plus les erreurs sont détectées rapidement.

### Réduire les erreurs humaines

Les tâches manuelles répétées finissent souvent par provoquer des erreurs :

- oublier une commande ;
- utiliser une mauvaise variable ;
- déployer sur le mauvais environnement ;
- oublier une étape de configuration ;
- copier une mauvaise version d'un fichier.

Le DevOps encourage l'automatisation pour rendre ces actions plus reproductibles.

### Rendre les déploiements reproductibles

Un déploiement reproductible signifie qu'une application peut être déployée plusieurs fois de la même manière, avec le même résultat attendu.

Cela passe par :

- des scripts ;
- des pipelines CI/CD ;
- des images Docker ;
- de l'Infrastructure as Code ;
- une configuration claire ;
- une documentation à jour.

### Améliorer la collaboration

Le DevOps ne concerne pas seulement la technique. Il cherche aussi à améliorer la communication entre les personnes.

Une bonne équipe DevOps partage :

- les responsabilités ;
- les informations ;
- les erreurs ;
- les décisions techniques ;
- les procédures de déploiement ;
- les retours d'incident.

## Les grands principes DevOps

## 1. Collaboration

Le DevOps encourage les développeurs, administrateurs système, testeurs, responsables sécurité et chefs de projet à travailler ensemble.

Une bonne collaboration implique :

- des objectifs communs ;
- une documentation partagée ;
- des revues de code ;
- des discussions techniques ouvertes ;
- une compréhension minimale du travail des autres rôles.

Exemple :

Un développeur ne doit pas seulement écrire du code. Il doit aussi comprendre comment son application sera lancée, configurée, testée, déployée et surveillée.

## 2. Automatisation

L'automatisation est au centre du DevOps.

Elle permet de remplacer les tâches répétitives par des processus fiables :

- lancer les tests automatiquement ;
- construire une application automatiquement ;
- créer une image Docker automatiquement ;
- déployer automatiquement ;
- vérifier la sécurité automatiquement ;
- générer une documentation automatiquement.

Exemple simple :

```text
Un développeur pousse son code sur GitHub.
La pipeline CI se lance automatiquement.
Les tests sont exécutés.
Le build est vérifié.
Si tout est valide, la branche peut être fusionnée.
```

## 3. Intégration continue

L'intégration continue, souvent appelée CI pour Continuous Integration, consiste à intégrer régulièrement les changements de code dans une branche principale.

Chaque changement doit être vérifié automatiquement.

Une pipeline CI peut par exemple exécuter :

```text
1. Installation des dépendances
2. Vérification du format du code
3. Analyse statique
4. Tests unitaires
5. Build de l'application
6. Rapport de résultat
```

Le but est de détecter rapidement les erreurs avant qu'elles ne deviennent difficiles à corriger.

## 4. Livraison continue

La livraison continue, ou Continuous Delivery, consiste à préparer automatiquement une version livrable de l'application.

La différence importante :

- la CI vérifie que le code est correct ;
- la livraison continue prépare une version prête à être déployée ;
- le déploiement continu déploie automatiquement cette version.

Il ne faut pas confondre :

```text
CI = vérifier le code régulièrement
CD = préparer ou déployer une version automatiquement
```

## 5. Infrastructure as Code

L'Infrastructure as Code, souvent appelée IaC, consiste à décrire l'infrastructure avec du code ou des fichiers de configuration.

Au lieu de créer manuellement un serveur, une base de données ou un réseau depuis une interface graphique, on les décrit dans des fichiers versionnés.

Exemples d'outils :

- Terraform ;
- Ansible ;
- Pulumi ;
- CloudFormation ;
- OpenTofu.

Avantages :

- l'infrastructure est documentée ;
- les changements sont historisés dans Git ;
- les environnements sont plus faciles à reproduire ;
- les erreurs manuelles sont réduites ;
- les revues de code deviennent possibles sur l'infrastructure.

## 6. Monitoring et observabilité

Déployer une application ne suffit pas. Il faut aussi savoir ce qui se passe après le déploiement.

Le monitoring consiste à surveiller l'état d'un système.

L'observabilité permet de comprendre pourquoi un système se comporte d'une certaine manière.

Les trois piliers les plus connus sont :

- les logs ;
- les métriques ;
- les traces.

Exemples de questions importantes :

- L'application est-elle disponible ?
- Le temps de réponse est-il correct ?
- Y a-t-il beaucoup d'erreurs ?
- Le serveur manque-t-il de mémoire ?
- Une nouvelle version a-t-elle introduit un problème ?

## 7. Sécurité intégrée

Dans une démarche moderne, la sécurité ne doit pas arriver seulement à la fin.

On parle souvent de DevSecOps lorsque la sécurité est intégrée dans le cycle DevOps.

Exemples de pratiques :

- ne jamais committer de secrets ;
- utiliser des variables d'environnement ;
- scanner les dépendances vulnérables ;
- scanner les images Docker ;
- limiter les droits des comptes techniques ;
- utiliser des revues de code ;
- protéger les branches principales ;
- gérer les accès avec soin.

## Le cycle DevOps

Le DevOps est souvent représenté comme un cycle continu.

```text
Planifier
  ↓
Coder
  ↓
Construire
  ↓
Tester
  ↓
Livrer
  ↓
Déployer
  ↓
Surveiller
  ↓
Améliorer
  ↺
```

Chaque étape alimente la suivante.

Le monitoring permet par exemple de découvrir un problème en production. Ce retour permet ensuite de planifier une correction, modifier le code, tester, livrer et déployer une nouvelle version.

## Exemple concret d'un workflow DevOps

Imaginons une petite application web.

Un workflow DevOps simple pourrait être :

```text
1. Un développeur crée une branche Git.
2. Il modifie le code.
3. Il ajoute ou met à jour les tests.
4. Il pousse sa branche sur GitHub.
5. Une pipeline CI se lance automatiquement.
6. La pipeline installe les dépendances.
7. Elle vérifie le format du code.
8. Elle lance les tests.
9. Elle construit l'application.
10. Une pull request est ouverte.
11. Le code est relu.
12. La branche est fusionnée dans main.
13. Une image Docker est construite.
14. Une version est publiée.
15. L'application est déployée.
16. Les logs et métriques sont surveillés.
```

Ce workflow peut être simple au début, puis évoluer avec le projet.

## Les outils DevOps les plus courants

Il existe beaucoup d'outils DevOps. L'important est de comprendre leur rôle avant de les utiliser.

### Gestion de version

Git permet de suivre l'historique du code, travailler en équipe et revenir en arrière si nécessaire.

Outils associés :

- GitHub ;
- GitLab ;
- Bitbucket ;
- Azure DevOps.

### CI/CD

Les outils de CI/CD automatisent les vérifications, builds et déploiements.

Exemples :

- GitHub Actions ;
- GitLab CI/CD ;
- Jenkins ;
- CircleCI ;
- Azure Pipelines.

### Conteneurisation

Docker permet d'emballer une application avec son environnement d'exécution.

Avantages :

- environnement plus reproductible ;
- déploiement plus simple ;
- moins de différences entre machines ;
- base solide pour Kubernetes.

### Orchestration

Kubernetes permet de gérer des conteneurs à grande échelle.

Il peut gérer :

- le déploiement ;
- la mise à l'échelle ;
- la disponibilité ;
- la configuration ;
- le réseau entre services.

Kubernetes est puissant, mais il ne doit pas être utilisé trop tôt sans besoin réel.

### Infrastructure as Code

Terraform ou OpenTofu permettent de décrire des ressources cloud.

Ansible permet d'automatiser la configuration de machines.

Ces outils rendent l'infrastructure plus claire, versionnée et reproductible.

### Monitoring

Les outils de monitoring et d'observabilité aident à comprendre l'état du système.

Exemples :

- Prometheus ;
- Grafana ;
- Loki ;
- Datadog ;
- New Relic ;
- Sentry ;
- OpenTelemetry.

### Sécurité

Les outils de sécurité DevOps peuvent vérifier :

- les secrets exposés ;
- les dépendances vulnérables ;
- les images Docker ;
- les permissions ;
- les configurations dangereuses.

Exemples :

- Trivy ;
- Gitleaks ;
- Dependabot ;
- Snyk ;
- Checkov.

## Git dans une démarche DevOps

Git est souvent la première brique DevOps.

Une bonne pratique consiste à utiliser :

- une branche principale stable ;
- des branches courtes pour les changements ;
- des messages de commit clairs ;
- des pull requests ;
- des revues de code ;
- des tags pour les versions.

Exemple de branches :

```text
main
├── docs/introduction-devops
├── docs/git-workflow
├── feat/docker-examples
├── feat/github-actions-ci
└── chore/repo-standards
```

Pour un projet pédagogique ou un petit projet moderne, un workflow simple de type GitHub Flow est souvent suffisant :

```text
main -> branche stable
branches courtes -> travail en cours
pull request -> validation
tag -> version publiée
```

Une branche `develop` peut être utile dans certains projets plus complexes, mais elle n'est pas obligatoire. Elle est surtout liée au modèle Git Flow, souvent utilisé quand il existe plusieurs environnements, des releases planifiées et une organisation plus lourde.

## Conventional Commits

Les Conventional Commits sont une convention pour écrire des messages de commit clairs.

Format :

```text
type(scope): description courte
```

Exemples :

```text
docs(devops): add introduction to devops principles
feat(docker): add production Dockerfile example
ci(github): add markdown validation workflow
fix(k8s): correct service port configuration
chore(repo): add project structure
```

Types fréquents :

- `docs` pour la documentation ;
- `feat` pour une nouvelle fonctionnalité ou un nouvel exemple ;
- `fix` pour une correction ;
- `ci` pour la CI/CD ;
- `chore` pour la maintenance ;
- `test` pour les tests ;
- `refactor` pour une amélioration interne sans changement fonctionnel.

Cette convention rend l'historique Git plus lisible et facilite la création d'un changelog.

## Versioning

Le versioning permet de suivre l'évolution d'un projet.

Une convention très utilisée est le versioning sémantique :

```text
MAJOR.MINOR.PATCH
```

Exemple :

```text
v1.4.2
```

Signification :

- `MAJOR` change quand il y a une rupture importante ;
- `MINOR` change quand on ajoute du contenu compatible ;
- `PATCH` change quand on corrige un problème.

Pour ce dépôt pédagogique, une progression simple pourrait être :

```text
v0.1.0 -> introduction et structure initiale
v0.2.0 -> documentation Git et commits
v0.3.0 -> premiers exemples Docker
v0.4.0 -> première pipeline CI/CD
v1.0.0 -> base DevOps complète et stable
```

## Exemple de progression pour ce dépôt

Ce dépôt peut lui-même appliquer les bonnes pratiques qu'il enseigne.

Progression recommandée :

```text
1. Créer un README clair
2. Ajouter une introduction au DevOps
3. Documenter le workflow Git
4. Ajouter les conventions de commit
5. Ajouter un changelog
6. Ajouter des exemples Docker
7. Ajouter une pipeline CI/CD
8. Ajouter des exemples Terraform
9. Ajouter des exemples Kubernetes
10. Ajouter une section sécurité
11. Ajouter une section monitoring
```

Cette approche permet d'apprendre progressivement sans mélanger tous les sujets dès le départ.

## Bonnes pratiques DevOps essentielles

### Documenter les décisions

Une bonne documentation explique :

- ce qui a été fait ;
- pourquoi cela a été fait ;
- comment l'utiliser ;
- quelles sont les limites ;
- comment le faire évoluer.

Une documentation utile doit aider une personne extérieure à comprendre le projet sans dépendre uniquement d'explications orales.

### Automatiser progressivement

Il n'est pas nécessaire d'automatiser tout dès le début.

Une progression réaliste :

```text
1. Automatiser les tests
2. Automatiser le lint
3. Automatiser le build
4. Automatiser la création d'image Docker
5. Automatiser le déploiement
6. Automatiser les contrôles de sécurité
```

### Garder les pipelines simples

Une pipeline CI/CD doit être claire et maintenable.

Il vaut mieux une pipeline simple qui fonctionne bien qu'une pipeline très complexe que personne ne comprend.

### Séparer le code et la configuration

Le code applicatif ne doit pas contenir de configuration sensible ou spécifique à un environnement.

Exemples de données à ne pas mettre en dur :

- mot de passe ;
- token API ;
- URL de base de données ;
- clé privée ;
- secret JWT ;
- identifiants cloud.

Ces valeurs doivent être gérées avec des variables d'environnement ou un gestionnaire de secrets.

### Tester avant de déployer

Un déploiement ne doit pas être la première fois où l'on découvre si le projet fonctionne.

Avant de déployer, il faut idéalement vérifier :

- les tests ;
- le build ;
- la configuration ;
- les dépendances ;
- les fichiers d'infrastructure ;
- les permissions ;
- les migrations si le projet utilise une base de données.

### Observer après le déploiement

Après un déploiement, il faut vérifier que l'application fonctionne réellement.

Exemples de signaux à surveiller :

- taux d'erreur ;
- temps de réponse ;
- consommation CPU ;
- consommation mémoire ;
- logs d'erreur ;
- disponibilité du service ;
- comportement utilisateur.

## Erreurs fréquentes à éviter

### Penser que DevOps veut dire "tout automatiser immédiatement"

L'automatisation doit répondre à un besoin.

Automatiser trop tôt, sans comprendre le projet, peut créer une complexité inutile.

### Copier des fichiers sans comprendre

Il est courant de copier un Dockerfile, un fichier Kubernetes ou une pipeline CI trouvée sur internet.

Le problème est que ces fichiers contiennent souvent des choix techniques adaptés à un autre contexte.

Avant d'utiliser un fichier, il faut comprendre :

- ce qu'il fait ;
- pourquoi il le fait ;
- quelles variables il utilise ;
- quels risques il introduit ;
- comment le maintenir.

### Négliger la sécurité

Quelques erreurs graves :

- committer un fichier `.env` ;
- exposer une clé API ;
- utiliser des mots de passe faibles ;
- donner trop de permissions à un token ;
- utiliser une image Docker non maintenue ;
- ignorer les vulnérabilités des dépendances.

### Créer une infrastructure trop complexe

Kubernetes, Terraform ou les architectures microservices ne sont pas toujours nécessaires.

Un bon choix DevOps est un choix adapté au besoin réel du projet.

Pour un petit projet, Docker Compose et une CI simple peuvent être suffisants.

### Ne pas maintenir la documentation

Une documentation obsolète peut devenir dangereuse.

Si la documentation ne correspond plus au projet, elle peut provoquer :

- de mauvaises manipulations ;
- des incompréhensions ;
- des erreurs de déploiement ;
- une perte de temps pour l'équipe.

## Différence entre DevOps, SRE et DevSecOps

### DevOps

DevOps est une culture et un ensemble de pratiques visant à rapprocher développement et opérations.

### SRE

SRE signifie Site Reliability Engineering.

Le SRE se concentre fortement sur la fiabilité, la disponibilité, les incidents, les objectifs de service et l'automatisation de l'exploitation.

Exemples de sujets SRE :

- disponibilité ;
- temps de réponse ;
- gestion des incidents ;
- SLO ;
- alerting ;
- post-mortems.

### DevSecOps

DevSecOps intègre la sécurité dans la démarche DevOps.

L'idée est de traiter la sécurité dès le début, au lieu de l'ajouter seulement à la fin.

## Niveau débutant : ce qu'il faut retenir

Pour un débutant, les idées les plus importantes sont :

- DevOps n'est pas un outil unique ;
- DevOps améliore la collaboration ;
- Git est une base essentielle ;
- l'automatisation réduit les erreurs ;
- les tests doivent être lancés souvent ;
- les déploiements doivent être reproductibles ;
- il ne faut jamais mettre de secrets dans le code ;
- la documentation fait partie du projet.

## Niveau intermédiaire : ce qu'il faut savoir faire

Une personne intermédiaire doit progressivement savoir :

- créer une branche Git propre ;
- écrire des commits compréhensibles ;
- ouvrir une pull request ;
- créer un Dockerfile simple ;
- écrire un fichier `docker-compose.yml` ;
- comprendre une pipeline CI/CD ;
- utiliser des variables d'environnement ;
- lire des logs ;
- identifier une erreur de build ;
- comprendre les bases de Terraform ou Kubernetes.

## Niveau avancé : ce qu'il faut approfondir

Une personne avancée peut approfondir :

- stratégies de déploiement ;
- rollback ;
- blue-green deployment ;
- canary release ;
- infrastructure multi-environnements ;
- gestion avancée des secrets ;
- observabilité distribuée ;
- policy as code ;
- optimisation des coûts cloud ;
- haute disponibilité ;
- gestion des incidents.

## Mini-glossaire

### CI

Continuous Integration. Pratique qui consiste à vérifier automatiquement le code à chaque changement.

### CD

Continuous Delivery ou Continuous Deployment. Pratique qui consiste à préparer ou effectuer automatiquement les livraisons.

### Pipeline

Suite d'étapes automatisées exécutées pour vérifier, construire ou déployer un projet.

### Build

Processus qui transforme le code source en application exécutable ou livrable.

### Artifact

Résultat produit par un build, par exemple une archive, un binaire ou une image Docker.

### Container

Environnement isolé permettant d'exécuter une application avec ses dépendances.

### Image Docker

Modèle utilisé pour créer un conteneur.

### Infrastructure as Code

Pratique qui consiste à décrire l'infrastructure avec des fichiers versionnés.

### Monitoring

Surveillance de l'état d'un système.

### Observabilité

Capacité à comprendre le comportement interne d'un système à partir de signaux comme les logs, métriques et traces.

### Secret

Information sensible comme un mot de passe, une clé API ou un token.

## Conclusion

Le DevOps est une approche complète qui combine culture, pratiques et outils.

Son objectif principal est d'aider les équipes à livrer des applications plus fiables, plus rapidement et avec moins d'erreurs.

Pour bien commencer, il ne faut pas chercher à utiliser tous les outils en même temps. Il faut d'abord comprendre les bases :

- Git ;
- documentation ;
- automatisation ;
- tests ;
- CI/CD ;
- sécurité ;
- monitoring.

Un bon projet DevOps n'est pas forcément le plus complexe. C'est un projet clair, reproductible, documenté, automatisé progressivement et compréhensible par les personnes qui doivent le maintenir.

## Prochaine étape recommandée

La prochaine étape logique est de documenter le workflow Git du dépôt :

```text
docs/02-git-workflow.md
```

Ce document pourra expliquer :

- le rôle de la branche `main` ;
- le choix de ne pas utiliser `develop` par défaut ;
- la création de branches courtes ;
- les pull requests ;
- les messages de commit ;
- les tags de version ;
- le changelog.
