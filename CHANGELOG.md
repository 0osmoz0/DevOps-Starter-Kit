# Changelog

Tous les changements importants de ce dépôt seront documentés dans ce fichier.

Le format est inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et ce dépôt suit autant que possible le [versioning sémantique](https://semver.org/lang/fr/).

## Objectif du changelog

Le changelog permet de comprendre rapidement l'évolution du dépôt sans devoir lire tout l'historique Git.

Il aide à répondre à des questions simples :

- Qu'est-ce qui a été ajouté ?
- Qu'est-ce qui a été modifié ?
- Qu'est-ce qui a été corrigé ?
- Quelle version contient quel contenu ?
- Quelle étape du projet est considérée comme stable ?

Dans une démarche DevOps, le changelog améliore la traçabilité, la communication et la qualité des releases.

## Convention de versioning

Ce dépôt utilise une logique de versioning sémantique :

```text
MAJOR.MINOR.PATCH
```

Exemple :

```text
v1.2.3
```

Signification :

- `MAJOR` : changement important ou rupture de structure ;
- `MINOR` : ajout de contenu compatible avec l'existant ;
- `PATCH` : correction, précision ou amélioration mineure.

Pendant la construction initiale du dépôt, les versions `0.x.x` représentent des étapes de préparation avant une première version stable `v1.0.0`.

## Types de changements

Les sections recommandées sont :

- `Added` : nouveaux documents, exemples, scripts ou workflows ;
- `Changed` : modifications de structure, contenu ou conventions ;
- `Deprecated` : éléments conservés mais destinés à être supprimés ;
- `Removed` : éléments supprimés ;
- `Fixed` : corrections ;
- `Security` : changements liés à la sécurité.

## [Unreleased]

Changements en cours de préparation pour la prochaine version.

### Added

- Ajout d'un changelog pour suivre l'évolution du dépôt.

## [0.3.0] - 2026-05-26

### Added

- Ajout du guide de contribution `CONTRIBUTING.md`.
- Documentation du workflow de contribution.
- Ajout des règles de branches, commits, pull requests et merge.
- Ajout des checklists avant commit, pull request et fusion.
- Ajout de bonnes pratiques de sécurité pour éviter les secrets dans Git.

## [0.2.0] - 2026-05-26

### Added

- Ajout du guide `docs/02-git-workflow.md`.
- Documentation du workflow Git recommandé pour ce dépôt.
- Explication du choix de GitHub Flow.
- Explication du rôle de la branche `main`.
- Documentation du choix de ne pas utiliser `develop` par défaut.
- Ajout des conventions de branches.
- Ajout des règles de Conventional Commits.
- Ajout des recommandations de pull requests.
- Ajout des règles de versioning, tags et changelog.
- Ajout des bonnes pratiques de sécurité Git.
- Ajout de checklists pour commit, pull request et merge.

## [0.1.0] - 2026-05-26

### Added

- Ajout du `README.md` professionnel du dépôt.
- Présentation des objectifs du projet.
- Présentation de la structure prévue du dépôt.
- Ajout de la roadmap initiale.
- Ajout du document `docs/01-introduction-devops.md`.
- Introduction complète aux principes DevOps.
- Explication de la CI/CD, de l'Infrastructure as Code, du monitoring, de l'observabilité, de la sécurité et du versioning.
- Ajout de sections adaptées aux niveaux débutant, intermédiaire et avancé.

## Roadmap de versioning

Cette roadmap donne une vision possible des prochaines étapes du dépôt.

```text
v0.1.0 -> README et introduction DevOps
v0.2.0 -> workflow Git et standards de collaboration
v0.3.0 -> guide de contribution
v0.4.0 -> changelog et suivi des versions
v0.5.0 -> guide Conventional Commits dédié
v0.6.0 -> exemples Docker
v0.7.0 -> première pipeline CI/CD
v0.8.0 -> sécurité et scan de secrets
v0.9.0 -> Infrastructure as Code
v1.0.0 -> base DevOps complète et stable
```

## Comment maintenir ce changelog

Chaque pull request importante doit mettre à jour la section `[Unreleased]`.

Lorsqu'une version est publiée :

1. déplacer les changements de `[Unreleased]` vers une nouvelle version ;
2. ajouter la date de publication ;
3. créer un tag Git correspondant ;
4. publier une release GitHub si nécessaire.

Exemple :

```text
git tag -a v0.4.0 -m "Release v0.4.0"
git push origin v0.4.0
```

## Exemple d'entrée future

```md
## [0.5.0] - 2026-05-26

### Added

- Ajout du guide dédié aux Conventional Commits.
- Ajout d'exemples de messages de commit professionnels.
- Ajout d'une section sur le lien entre commits, changelog et versioning.
```
