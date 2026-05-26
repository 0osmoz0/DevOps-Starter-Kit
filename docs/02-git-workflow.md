# Workflow Git professionnel

## Objectif de ce document

Ce document explique comment utiliser Git proprement dans ce dépôt, avec une approche inspirée des pratiques DevOps modernes.

L'objectif est double :

- apprendre une méthode de travail claire, simple et professionnelle ;
- faire en sorte que ce dépôt applique lui-même les bonnes pratiques qu'il enseigne.

Ce guide est écrit pour plusieurs niveaux :

- débutant : comprendre quoi faire et dans quel ordre ;
- intermédiaire : comprendre pourquoi ces choix sont faits ;
- avancé : structurer un workflow robuste avec revue, CI, versioning et release.

## Pourquoi Git est essentiel en DevOps

Git n'est pas seulement un outil pour sauvegarder du code.

Dans une démarche DevOps, Git devient la source de vérité du projet. Il permet de suivre :

- le code ;
- la documentation ;
- les fichiers d'infrastructure ;
- les pipelines CI/CD ;
- les configurations ;
- les décisions techniques ;
- l'historique des changements.

Un bon workflow Git permet de répondre à des questions importantes :

- Qui a modifié quoi ?
- Pourquoi cette modification a-t-elle été faite ?
- Quand une fonctionnalité a-t-elle été ajoutée ?
- Quelle version est stable ?
- Quel changement a introduit un problème ?
- Comment revenir à un état précédent ?

## Stratégie choisie pour ce dépôt

Ce dépôt utilise une stratégie simple et professionnelle proche de GitHub Flow.

Le principe :

```text
main
├── docs/introduction-devops
├── docs/git-workflow
├── feat/docker-examples
├── feat/github-actions-ci
├── feat/kubernetes-basics
└── chore/repo-standards
```

La branche `main` représente l'état stable du dépôt.

Tout changement doit être fait dans une branche dédiée, puis proposé via une pull request avant d'être fusionné dans `main`.

## Pourquoi GitHub Flow ?

GitHub Flow est un workflow simple :

```text
1. Créer une branche depuis main
2. Faire des commits propres
3. Pousser la branche sur GitHub
4. Ouvrir une pull request
5. Lancer les vérifications automatiques
6. Faire une revue
7. Fusionner dans main
8. Créer un tag si nécessaire
```

Ce workflow est adapté à ce dépôt parce qu'il est :

- facile à comprendre ;
- adapté aux projets documentaires et pédagogiques ;
- compatible avec les pull requests ;
- compatible avec la CI/CD ;
- plus léger que Git Flow ;
- proche des pratiques utilisées sur beaucoup de projets modernes.

## Pourquoi ne pas utiliser `develop` par défaut ?

La branche `develop` vient du modèle Git Flow.

Git Flow est souvent organisé comme ceci :

```text
main       -> version de production
develop    -> intégration des développements
feature/*  -> nouvelles fonctionnalités
release/*  -> préparation des releases
hotfix/*   -> corrections urgentes
```

Ce modèle peut être utile pour :

- de grosses équipes ;
- plusieurs environnements ;
- des releases planifiées ;
- des cycles de livraison longs ;
- une application déjà en production ;
- une organisation avec beaucoup de contraintes.

Pour ce dépôt pédagogique, une branche `develop` ajouterait de la complexité sans vrai bénéfice.

La règle recommandée ici est donc :

```text
main = version stable
branches courtes = travail en cours
pull requests = validation
tags = versions publiées
```

Il est important de connaître `develop`, mais il n'est pas nécessaire de l'utiliser dans tous les projets.

## Rôle de la branche `main`

La branche `main` doit toujours rester propre, stable et compréhensible.

Elle doit contenir :

- la documentation validée ;
- les exemples fonctionnels ;
- les fichiers de configuration stables ;
- les workflows CI/CD validés ;
- les versions prêtes à être consultées.

Elle ne doit pas contenir :

- des fichiers incomplets ;
- des tests cassés ;
- des secrets ;
- des commits temporaires ;
- des expérimentations non validées ;
- des fichiers générés inutiles.

Règle simple :

```text
Si une personne découvre le dépôt depuis main, elle doit pouvoir lui faire confiance.
```

## Branches de travail

Chaque changement doit être fait dans une branche dédiée.

Une branche doit avoir un objectif clair.

Exemples :

```text
docs/introduction-devops
docs/git-workflow
docs/security-best-practices
feat/docker-examples
feat/github-actions-ci
feat/kubernetes-manifests
chore/repo-standards
fix/readme-typos
ci/markdown-quality
```

## Convention de nommage des branches

Format recommandé :

```text
type/short-description
```

Exemples :

```text
docs/git-workflow
feat/docker-examples
fix/docker-compose-port
ci/docs-validation
chore/add-license
```

Types recommandés :

- `docs` : documentation ;
- `feat` : nouvel exemple ou nouvelle fonctionnalité ;
- `fix` : correction ;
- `ci` : pipeline CI/CD ;
- `chore` : maintenance du dépôt ;
- `refactor` : amélioration sans changement fonctionnel ;
- `test` : ajout ou modification de tests.

Bonnes pratiques :

- utiliser des noms courts ;
- écrire en minuscules ;
- séparer les mots avec des tirets ;
- éviter les espaces ;
- éviter les noms vagues comme `update`, `test`, `changes` ou `wip`.

## Exemples de bons et mauvais noms de branches

Bons exemples :

```text
docs/git-workflow
feat/docker-examples
ci/markdown-lint
fix/readme-links
chore/add-changelog
```

Mauvais exemples :

```text
dev
test
new
update
branch1
final-version
my-work
```

Un bon nom de branche permet de comprendre le sujet sans ouvrir le code.

## Cycle de contribution recommandé

Voici le cycle complet recommandé pour contribuer à ce dépôt.

### 1. Se placer sur `main`

```bash
git checkout main
```

### 2. Récupérer la dernière version

```bash
git pull origin main
```

### 3. Créer une branche dédiée

```bash
git checkout -b docs/git-workflow
```

### 4. Modifier les fichiers

Exemple :

```text
docs/02-git-workflow.md
```

### 5. Vérifier l'état du dépôt

```bash
git status
```

Cette commande permet de voir :

- les fichiers modifiés ;
- les nouveaux fichiers ;
- les fichiers supprimés ;
- les fichiers déjà ajoutés au commit.

### 6. Relire les changements

```bash
git diff
```

Cette étape est importante. Elle permet d'éviter de committer :

- une erreur ;
- une modification non voulue ;
- un secret ;
- du texte temporaire ;
- un fichier généré inutile.

### 7. Ajouter les fichiers

```bash
git add docs/02-git-workflow.md
```

Ou, si plusieurs fichiers liés doivent être ajoutés :

```bash
git add docs/ README.md
```

Il faut éviter `git add .` si l'on n'a pas vérifié précisément les fichiers modifiés.

### 8. Créer un commit clair

```bash
git commit -m "docs(git): add repository workflow guide"
```

### 9. Pousser la branche

La première fois :

```bash
git push -u origin docs/git-workflow
```

Les fois suivantes :

```bash
git push
```

### 10. Ouvrir une pull request

La pull request doit expliquer :

- ce qui a été ajouté ;
- pourquoi cela a été ajouté ;
- comment vérifier le changement ;
- les limites ou points à relire.

### 11. Attendre les vérifications

Avant de fusionner, il faut vérifier :

- que la CI passe ;
- que la documentation est lisible ;
- que les fichiers modifiés sont cohérents ;
- qu'aucun secret n'a été ajouté.

### 12. Fusionner dans `main`

Une fois la pull request validée, elle peut être fusionnée.

### 13. Supprimer la branche

Après le merge, la branche peut être supprimée pour garder le dépôt propre.

```bash
git branch -d docs/git-workflow
```

Sur GitHub, la branche distante peut aussi être supprimée après fusion.

## Conventional Commits

Ce dépôt utilise Conventional Commits.

Format :

```text
type(scope): description courte
```

Exemples :

```text
docs(git): add repository workflow guide
docs(devops): add complete introduction
feat(docker): add multi-stage Dockerfile example
ci(github): add markdown validation workflow
fix(readme): correct roadmap item
chore(repo): add license file
```

## Pourquoi utiliser Conventional Commits ?

Cette convention permet :

- de rendre l'historique Git lisible ;
- de comprendre rapidement le type de changement ;
- de générer plus facilement un changelog ;
- de préparer le versioning sémantique ;
- de faciliter les revues de code ;
- d'avoir une discipline commune dans l'équipe.

## Types de commits recommandés

### `docs`

Utilisé pour la documentation.

Exemples :

```text
docs(readme): add project overview
docs(git): explain branch naming
docs(security): add secrets management best practices
```

### `feat`

Utilisé pour ajouter un nouvel exemple ou une nouvelle fonctionnalité.

Exemples :

```text
feat(docker): add docker compose example
feat(terraform): add basic infrastructure example
feat(k8s): add deployment manifest
```

### `fix`

Utilisé pour corriger une erreur.

Exemples :

```text
fix(readme): correct broken documentation link
fix(k8s): correct service selector
fix(ci): correct workflow trigger
```

### `ci`

Utilisé pour les pipelines CI/CD.

Exemples :

```text
ci(github): add markdown lint workflow
ci(security): add secret scanning workflow
ci(docker): add image build check
```

### `chore`

Utilisé pour les tâches de maintenance.

Exemples :

```text
chore(repo): add gitignore
chore(repo): add license
chore(deps): update tooling configuration
```

### `refactor`

Utilisé pour améliorer une structure sans changer le comportement.

Exemple :

```text
refactor(docs): reorganize devops guide sections
```

### `test`

Utilisé pour les tests ou validations automatisées.

Exemple :

```text
test(docs): add markdown link validation
```

## Règles pour écrire un bon commit

Un bon commit doit être :

- petit ;
- cohérent ;
- compréhensible ;
- relié à un seul objectif ;
- facile à relire ;
- facile à annuler si nécessaire.

Un commit ne doit pas mélanger :

- documentation et refactorisation ;
- correction et nouvelle fonctionnalité ;
- mise à jour de dépendances et changement applicatif ;
- formatage massif et changement logique.

## Exemples de bons commits

```text
docs(git): add branch naming convention
docs(devops): explain continuous integration
feat(docker): add node application Dockerfile
ci(github): run markdown checks on pull requests
fix(readme): correct docs folder path
```

## Exemples de mauvais commits

```text
update
fix
final
changes
work
commit
test
ajout trucs
```

Ces messages ne permettent pas de comprendre l'intention du changement.

## Pull requests

Une pull request sert à proposer une modification avant de l'intégrer dans `main`.

Elle permet :

- de relire le travail ;
- de discuter d'un choix technique ;
- de lancer les vérifications CI ;
- de garder un historique clair ;
- de documenter les changements importants.

## Contenu recommandé d'une pull request

Une bonne pull request doit contenir :

```md
## Résumé

- Ajout du guide Git.
- Documentation du workflow de branches.
- Ajout des conventions de commits et de versioning.

## Vérifications

- [ ] Documentation relue.
- [ ] Liens vérifiés.
- [ ] Aucun secret ajouté.
- [ ] CI validée.

## Notes

Ce changement prépare la mise en place d'un workflow DevOps plus structuré.
```

## Taille des pull requests

Une pull request doit rester raisonnable.

Bonne pratique :

```text
1 pull request = 1 objectif clair
```

Exemples :

- une PR pour le guide Git ;
- une PR pour les exemples Docker ;
- une PR pour la pipeline CI ;
- une PR pour la documentation sécurité.

Il faut éviter les pull requests qui changent trop de sujets à la fois.

## Revue de code

Même pour un dépôt de documentation, une revue est utile.

La revue doit vérifier :

- la clarté du contenu ;
- la cohérence avec le README ;
- la qualité des exemples ;
- les fautes importantes ;
- les commandes dangereuses ;
- la présence éventuelle de secrets ;
- la cohérence avec les standards du dépôt.

Une bonne revue ne cherche pas seulement à trouver des erreurs. Elle aide à améliorer le projet.

## Protection de la branche `main`

Dans un dépôt professionnel, `main` devrait être protégée.

Règles recommandées :

- interdire le push direct sur `main` ;
- obliger les pull requests ;
- exiger au moins une revue ;
- exiger que la CI passe avant merge ;
- empêcher le merge si la branche n'est pas à jour ;
- activer la suppression automatique des branches fusionnées ;
- activer le scan de secrets si disponible.

Sur GitHub, ces règles se configurent dans :

```text
Settings -> Branches -> Branch protection rules
```

## Merge strategy

Il existe plusieurs manières de fusionner une pull request.

### Merge commit

Conserve tous les commits de la branche et ajoute un commit de merge.

Avantages :

- garde tout l'historique ;
- montre clairement les branches.

Inconvénients :

- historique parfois plus bruyant.

### Squash and merge

Regroupe tous les commits de la pull request en un seul commit.

Avantages :

- historique de `main` plus propre ;
- très adapté aux petites branches ;
- pratique pour les dépôts pédagogiques.

Inconvénients :

- les petits commits intermédiaires disparaissent de `main`.

### Rebase and merge

Rejoue les commits de la branche sur `main`.

Avantages :

- historique linéaire ;
- utile pour des équipes habituées à Git.

Inconvénients :

- peut être plus difficile pour les débutants.

## Recommandation pour ce dépôt

Pour ce dépôt, la stratégie recommandée est :

```text
Squash and merge
```

Pourquoi :

- historique plus lisible ;
- une pull request devient un changement clair ;
- adapté à un repo pédagogique ;
- simplifie la lecture de `main`.

Le message final du squash doit rester compatible avec Conventional Commits.

Exemple :

```text
docs(git): add repository workflow guide
```

## Versioning

Le versioning permet de marquer les étapes importantes du dépôt.

Ce dépôt peut utiliser le versioning sémantique :

```text
MAJOR.MINOR.PATCH
```

Exemple :

```text
v1.2.3
```

Signification :

- `MAJOR` : changement important ou rupture ;
- `MINOR` : ajout de contenu compatible ;
- `PATCH` : correction ou amélioration mineure.

## Versioning recommandé pour ce dépôt

Pendant la construction du dépôt :

```text
v0.1.0 -> README et introduction DevOps
v0.2.0 -> workflow Git et standards de contribution
v0.3.0 -> exemples Docker
v0.4.0 -> pipeline CI/CD
v0.5.0 -> sécurité et scans
v0.6.0 -> infrastructure as code
v0.7.0 -> Kubernetes
v1.0.0 -> base DevOps complète et stable
```

## Créer un tag

Un tag permet de marquer une version.

Exemple :

```bash
git tag v0.2.0
git push origin v0.2.0
```

Pour créer un tag annoté :

```bash
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0
```

Le tag annoté est souvent préférable pour une release propre, car il contient un message.

## Changelog

Un `CHANGELOG.md` permet de documenter les changements importants entre les versions.

Structure recommandée :

```md
# Changelog

## [0.2.0] - 2026-05-26

### Added

- Ajout du guide Git.
- Ajout des conventions de branches.
- Ajout des règles de versioning.

### Changed

- Amélioration de la structure documentaire.

### Fixed

- Correction de liens ou formulations.
```

Le changelog aide les lecteurs à comprendre l'évolution du dépôt sans analyser tout l'historique Git.

## CI/CD dans le workflow Git

Dans une bonne démarche DevOps, une pull request doit déclencher des vérifications automatiques.

Pour ce dépôt, une CI pourrait vérifier :

- la syntaxe Markdown ;
- les liens cassés ;
- les fichiers YAML ;
- la présence de secrets ;
- la cohérence des exemples Docker ;
- la validité des fichiers Terraform ;
- la validité des manifests Kubernetes.

Exemple de logique :

```text
Pull request ouverte
  ↓
CI lancée automatiquement
  ↓
Markdown vérifié
  ↓
Secrets vérifiés
  ↓
YAML vérifié
  ↓
Résultat affiché dans la PR
```

## Règles avant de merger

Avant de fusionner une branche dans `main`, vérifier :

- le nom de branche est clair ;
- les commits sont lisibles ;
- la pull request a un objectif unique ;
- la documentation est compréhensible ;
- les commandes sont correctes ;
- aucun secret n'est présent ;
- les checks CI sont verts ;
- la branche est à jour avec `main`.

## Sécurité Git

La sécurité est une partie importante du workflow Git.

Il ne faut jamais committer :

- fichier `.env` ;
- mot de passe ;
- token API ;
- clé privée ;
- fichier de credentials ;
- certificat sensible ;
- secret Kubernetes réel ;
- clé cloud ;
- dump de base de données.

## Fichiers à ignorer

Un fichier `.gitignore` doit exclure les fichiers inutiles ou sensibles.

Exemples :

```gitignore
.env
.env.*
node_modules/
dist/
build/
coverage/
.DS_Store
*.log
```

Attention :

```text
.env.example peut être versionné
.env ne doit pas être versionné
```

Le fichier `.env.example` sert à montrer les variables nécessaires sans exposer de valeurs sensibles.

## Que faire si un secret a été committé ?

Si un secret a été committé, il ne suffit pas de le supprimer dans un nouveau commit.

Il faut :

```text
1. Considérer le secret comme compromis
2. Révoquer ou changer le secret
3. Supprimer le secret du dépôt
4. Nettoyer l'historique si nécessaire
5. Vérifier les accès
6. Ajouter une protection pour éviter que cela se reproduise
```

Exemples d'outils utiles :

- Gitleaks ;
- TruffleHog ;
- GitHub secret scanning ;
- detect-secrets.

## Gestion des conflits

Un conflit Git arrive lorsque deux branches modifient la même partie d'un fichier.

Pour réduire les conflits :

- créer des branches courtes ;
- faire des pull requests petites ;
- récupérer souvent `main` ;
- éviter les gros changements de formatage ;
- communiquer avec l'équipe.

Commandes utiles :

```bash
git checkout main
git pull origin main
git checkout docs/git-workflow
git merge main
```

Après résolution :

```bash
git status
git add fichier-resolu.md
git commit
git push
```

## Rebase ou merge depuis `main` ?

Deux approches existent pour mettre à jour une branche.

### Merge

```bash
git merge main
```

Avantage :

- plus simple pour les débutants ;
- moins risqué si l'on ne maîtrise pas Git.

### Rebase

```bash
git rebase main
```

Avantage :

- historique plus linéaire.

Attention :

Il faut éviter de rebase une branche partagée si l'on ne comprend pas les conséquences, car cela réécrit l'historique de la branche.

Pour ce dépôt, la recommandation simple est :

```text
Utiliser merge depuis main pour les débutants.
Utiliser rebase seulement si l'équipe le maîtrise.
```

## Commandes Git essentielles

Voir la branche actuelle :

```bash
git branch
```

Voir l'état du dépôt :

```bash
git status
```

Voir les changements non ajoutés :

```bash
git diff
```

Voir les commits récents :

```bash
git log --oneline --graph --decorate
```

Créer une branche :

```bash
git checkout -b docs/git-workflow
```

Changer de branche :

```bash
git checkout main
```

Ajouter un fichier :

```bash
git add docs/02-git-workflow.md
```

Créer un commit :

```bash
git commit -m "docs(git): add repository workflow guide"
```

Pousser une nouvelle branche :

```bash
git push -u origin docs/git-workflow
```

Récupérer les changements :

```bash
git pull origin main
```

## Workflow complet recommandé

Exemple complet pour ajouter ce document :

```bash
git checkout main
git pull origin main
git checkout -b docs/git-workflow
```

Créer ou modifier :

```text
docs/02-git-workflow.md
```

Vérifier :

```bash
git status
git diff
```

Committer :

```bash
git add docs/02-git-workflow.md
git commit -m "docs(git): add repository workflow guide"
```

Pousser :

```bash
git push -u origin docs/git-workflow
```

Ensuite :

```text
1. Ouvrir une pull request
2. Relire les changements
3. Attendre la CI
4. Fusionner avec squash and merge
5. Supprimer la branche
6. Mettre à jour main en local
```

## Politique de commits pour ce dépôt

Pour garder un historique propre :

- chaque commit doit avoir un message clair ;
- chaque commit doit correspondre à un changement logique ;
- les commits temporaires doivent être évités dans `main` ;
- les messages doivent être en anglais pour rester proches des conventions open source ;
- le contenu de la documentation peut rester en français.

Exemple :

```text
Message de commit en anglais :
docs(git): add repository workflow guide

Contenu de documentation en français :
Guide expliquant le workflow Git du dépôt.
```

## Politique de langue

Ce dépôt peut utiliser :

- français pour la documentation destinée aux étudiants ;
- anglais pour les commits, branches et noms techniques ;
- anglais pour les noms de fichiers quand c'est une convention courante.

Exemples :

```text
docs/git-workflow
docs(devops): add introduction
README.md
CHANGELOG.md
CONTRIBUTING.md
```

Cette approche prépare les étudiants aux standards professionnels, car beaucoup d'outils et de conventions DevOps utilisent l'anglais.

## Checklist avant commit

Avant chaque commit :

- [ ] J'ai vérifié `git status`.
- [ ] J'ai relu `git diff`.
- [ ] Le commit a un seul objectif.
- [ ] Le message suit Conventional Commits.
- [ ] Aucun secret n'est présent.
- [ ] Aucun fichier inutile n'est ajouté.
- [ ] La documentation est claire.
- [ ] Les exemples sont cohérents.

## Checklist avant pull request

Avant d'ouvrir une pull request :

- [ ] La branche part de `main`.
- [ ] Le nom de branche est clair.
- [ ] Les commits sont propres.
- [ ] La PR a un titre clair.
- [ ] La description explique le changement.
- [ ] Les fichiers modifiés sont liés au même objectif.
- [ ] Les checks locaux utiles ont été lancés.
- [ ] La branche a été poussée sur GitHub.

## Checklist avant merge

Avant de fusionner dans `main` :

- [ ] La pull request a été relue.
- [ ] La CI est verte.
- [ ] Les discussions sont résolues.
- [ ] Aucun secret n'est détecté.
- [ ] Le message de merge est propre.
- [ ] La branche peut être supprimée après merge.
- [ ] Un tag est créé si la modification correspond à une version importante.

## Erreurs fréquentes à éviter

### Travailler directement sur `main`

Il faut éviter de modifier directement `main`.

Risque :

- casser la version stable ;
- contourner les revues ;
- éviter la CI ;
- rendre l'historique moins clair.

### Faire des commits trop gros

Un commit trop gros est difficile à relire et à comprendre.

Il vaut mieux plusieurs commits cohérents qu'un seul commit qui mélange tout.

### Utiliser des messages vagues

Un message comme `update` ou `fix` n'explique rien.

Un bon message explique le type, le sujet et l'intention.

### Oublier de pull avant de créer une branche

Si `main` local n'est pas à jour, la nouvelle branche peut partir d'une ancienne version.

Bonne pratique :

```bash
git checkout main
git pull origin main
git checkout -b docs/new-topic
```

### Ajouter des fichiers inutiles

Avant un commit, toujours vérifier :

```bash
git status
git diff
```

Cela évite d'ajouter :

- fichiers temporaires ;
- logs ;
- dossiers de dépendances ;
- fichiers système ;
- secrets ;
- builds générés.

### Ne pas créer de tag pour les versions importantes

Les tags aident à retrouver les étapes importantes du projet.

Sans tags, il devient plus difficile de savoir quelle version correspond à quel état.

## Bonnes pratiques avancées

## Branch protection

Protéger `main` évite les erreurs humaines.

Règles recommandées :

- pull request obligatoire ;
- CI obligatoire ;
- revue obligatoire ;
- pas de force push ;
- pas de suppression accidentelle ;
- conversation résolue avant merge.

## CODEOWNERS

Un fichier `CODEOWNERS` permet de définir qui doit relire certains fichiers.

Exemple :

```text
docs/ @team-docs
.github/workflows/ @team-devops
examples/terraform/ @team-cloud
```

Pour un petit projet, ce fichier n'est pas obligatoire, mais il est utile à connaître.

## Templates de pull request

Un template de pull request aide les contributeurs à fournir les bonnes informations.

Exemple de futur fichier :

```text
.github/pull_request_template.md
```

Contenu possible :

```md
## Résumé

## Type de changement

- [ ] Documentation
- [ ] Exemple
- [ ] CI/CD
- [ ] Correction

## Vérifications

- [ ] Documentation relue
- [ ] CI passée
- [ ] Aucun secret ajouté
```

## Releases

Une release est une version publiée du dépôt.

Elle peut contenir :

- un tag ;
- un titre ;
- une description ;
- une liste des changements ;
- des fichiers attachés si nécessaire.

Exemple :

```text
Release v0.2.0

Added:
- Git workflow documentation
- Branch naming convention
- Commit convention
- Versioning strategy
```

## Workflow idéal final du dépôt

A terme, ce dépôt pourrait fonctionner ainsi :

```text
1. Une branche est créée depuis main
2. Une documentation ou un exemple est ajouté
3. Un commit Conventional Commit est créé
4. Une pull request est ouverte
5. La CI vérifie Markdown, YAML et secrets
6. Une revue est faite
7. La PR est fusionnée avec squash and merge
8. Le changelog est mis à jour
9. Un tag est créé pour les versions importantes
10. Une release GitHub est publiée si nécessaire
```

Ce workflow montre une vraie approche DevOps :

- traçabilité ;
- automatisation ;
- sécurité ;
- collaboration ;
- qualité ;
- versioning.

## Résumé pour débutants

Si tu débutes, retiens surtout :

- ne travaille pas directement sur `main` ;
- crée une branche pour chaque sujet ;
- fais des commits clairs ;
- pousse ta branche sur GitHub ;
- ouvre une pull request ;
- vérifie les changements avant merge ;
- utilise des tags pour les versions importantes.

Workflow minimal :

```bash
git checkout main
git pull origin main
git checkout -b docs/example-topic
git add docs/example-topic.md
git commit -m "docs(example): add example topic"
git push -u origin docs/example-topic
```

## Résumé pour niveau intermédiaire

Si tu as déjà des bases, concentre-toi sur :

- la taille des branches ;
- la cohérence des commits ;
- la qualité des pull requests ;
- les checks CI ;
- la protection de `main` ;
- le changelog ;
- les tags.

## Résumé pour niveau avancé

Pour un niveau avancé, les sujets à approfondir sont :

- politiques de merge ;
- release automation ;
- semantic versioning automatisé ;
- génération automatique de changelog ;
- scan de secrets ;
- signature de commits ;
- règles CODEOWNERS ;
- environnements protégés ;
- audit de l'historique Git ;
- stratégie mono-repo ou multi-repo.

## Conclusion

Un bon workflow Git n'est pas seulement une suite de commandes. C'est une méthode de travail qui rend un projet plus clair, plus fiable et plus professionnel.

Pour ce dépôt, la meilleure approche est volontairement simple :

```text
main stable
branches courtes
commits clairs
pull requests
CI obligatoire
tags de version
changelog
```

Cette stratégie permet d'apprendre les bases correctement tout en restant proche des pratiques DevOps utilisées dans des projets réels.

## Prochaine étape recommandée

Après ce guide, la prochaine étape logique est de créer :

```text
CONTRIBUTING.md
```

Ce fichier expliquera comment contribuer au dépôt, quelles règles suivre, comment écrire une pull request et comment respecter les standards du projet.
