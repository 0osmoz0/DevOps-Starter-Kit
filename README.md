# DevOps Starter Kit

DevOps Starter Kit est un dépôt pédagogique conçu pour apprendre, comprendre et appliquer les bonnes pratiques DevOps utilisées dans des projets modernes.

L'objectif de ce dépôt n'est pas de fournir une solution complète à un projet spécifique, mais de proposer une base claire de documentation, d'exemples et de standards professionnels pour mieux structurer un projet logiciel.

## Objectifs

Ce dépôt a pour objectif de présenter les bases essentielles du DevOps de manière progressive et pratique :

- comprendre la culture DevOps et ses principes ;
- structurer un projet avec des conventions professionnelles ;
- utiliser Git avec une stratégie de branches claire ;
- écrire des commits lisibles avec Conventional Commits ;
- conteneuriser une application avec Docker ;
- automatiser les tests, le lint et le build avec une pipeline CI/CD ;
- découvrir l'Infrastructure as Code avec Terraform ;
- comprendre les bases du déploiement avec Kubernetes ;
- appliquer des bonnes pratiques de sécurité ;
- introduire le monitoring, les logs et l'observabilité.

## A qui s'adresse ce dépôt ?

Ce dépôt s'adresse principalement :

- aux étudiants qui découvrent le DevOps ;
- aux développeurs qui veulent mieux structurer leurs projets ;
- aux équipes qui souhaitent documenter leurs pratiques techniques ;
- aux personnes qui veulent comprendre les outils utilisés dans une chaîne DevOps moderne.

## Structure prévue

```text
devops-starter-kit/
├── README.md
├── docs/
│   ├── 01-introduction-devops.md
│   ├── 02-git-workflow.md
│   ├── 03-conventional-commits.md
│   ├── 04-docker.md
│   ├── 05-ci-cd.md
│   ├── 06-infrastructure-as-code.md
│   ├── 07-kubernetes.md
│   ├── 08-monitoring-observability.md
│   └── 09-security.md
├── examples/
│   ├── docker/
│   ├── github-actions/
│   ├── terraform/
│   ├── kubernetes/
│   └── ansible/
├── scripts/
└── .github/
    └── workflows/
```

## Organisation du contenu

### Documentation

Le dossier `docs/` contiendra des explications progressives sur les principaux concepts DevOps.

Chaque document suivra une structure simple :

- définition du concept ;
- intérêt dans un projet réel ;
- exemple concret ;
- bonnes pratiques ;
- erreurs fréquentes à éviter.

### Exemples

Le dossier `examples/` contiendra des exemples de fichiers utilisés dans des environnements DevOps :

- `Dockerfile` ;
- `docker-compose.yml` ;
- workflows GitHub Actions ;
- fichiers Terraform ;
- manifests Kubernetes ;
- playbooks Ansible.

Ces exemples seront volontairement simples, lisibles et réutilisables comme base d'apprentissage.

### Scripts

Le dossier `scripts/` contiendra des scripts d'automatisation simples pour illustrer certaines pratiques :

- vérification de qualité ;
- lancement de tests ;
- exemples de déploiement ;
- commandes utiles pour un environnement local.

## Standards utilisés

Ce dépôt suit plusieurs standards couramment utilisés dans les projets professionnels :

- Conventional Commits pour les messages de commit ;
- Markdown pour la documentation ;
- YAML pour les fichiers CI/CD, Docker Compose, Kubernetes et Ansible ;
- Infrastructure as Code pour la gestion d'infrastructure ;
- séparation claire entre documentation, exemples et scripts.

## Exemple de workflow Git

Une organisation simple du travail peut être :

```text
main
├── docs/introduction-devops
├── feat/docker-examples
├── feat/github-actions-ci
├── feat/kubernetes-manifests
└── docs/security-best-practices
```

Chaque modification doit idéalement passer par une branche dédiée, puis être relue avant d'être fusionnée dans `main`.

## Convention de commits

Ce dépôt utilise la convention suivante :

```text
type(scope): short description
```

Exemples :

```text
docs(readme): add project overview
docs(git): explain branching strategy
feat(docker): add production Dockerfile example
feat(ci): add GitHub Actions workflow
feat(k8s): add deployment manifest
chore(repo): add project structure
```

Types recommandés :

- `docs` : modification de documentation ;
- `feat` : ajout d'un nouvel exemple ou d'une nouvelle fonctionnalité ;
- `fix` : correction ;
- `chore` : maintenance du dépôt ;
- `refactor` : amélioration sans changement fonctionnel ;
- `test` : ajout ou modification de tests ;
- `ci` : modification de pipeline CI/CD.

## Bonnes pratiques DevOps présentées

Ce dépôt couvrira progressivement les pratiques suivantes :

- versionner proprement son code avec Git ;
- documenter les décisions techniques ;
- automatiser les tâches répétitives ;
- exécuter les tests à chaque changement ;
- construire des images Docker reproductibles ;
- gérer les variables d'environnement proprement ;
- éviter de committer des secrets ;
- séparer configuration et code applicatif ;
- déployer de manière automatisée ;
- surveiller les logs, métriques et erreurs ;
- améliorer continuellement la qualité du projet.

## Ce que ce dépôt n'est pas

Ce dépôt n'est pas :

- une solution complète à un projet scolaire ;
- un projet applicatif prêt à être rendu ;
- une infrastructure de production complète ;
- un remplacement de la compréhension personnelle.

Il sert de support d'apprentissage, de référence et de base de bonnes pratiques.

## Prérequis recommandés

Pour profiter pleinement de ce dépôt, il est recommandé d'avoir des bases sur :

- la ligne de commande ;
- Git et GitHub ;
- les bases du développement web ou backend ;
- les fichiers YAML ;
- les notions simples de réseau : ports, HTTP, DNS.

## Roadmap

- [ ] Ajouter une introduction complète au DevOps.
- [ ] Ajouter un guide Git et Conventional Commits.
- [ ] Ajouter des exemples Docker.
- [ ] Ajouter une pipeline CI/CD avec GitHub Actions.
- [ ] Ajouter une introduction à Terraform.
- [ ] Ajouter des manifests Kubernetes.
- [ ] Ajouter une section sécurité.
- [ ] Ajouter une section monitoring et observabilité.
- [ ] Ajouter des exercices pratiques.

## Licence

Ce dépôt peut être utilisé librement comme support d'apprentissage.

## Auteur

Maintenu par une personne souhaitant aider d'autres étudiants à mieux comprendre les pratiques DevOps sans faire leur projet à leur place.