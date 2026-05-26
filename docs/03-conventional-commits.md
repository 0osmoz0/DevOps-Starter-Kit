# Conventional Commits

## Objectif de ce document

Ce document explique comment écrire des messages de commit clairs, professionnels et utiles dans une démarche DevOps.

Il s'adresse à plusieurs niveaux :

- débutant : comprendre comment nommer un commit correctement ;
- intermédiaire : structurer un historique Git lisible ;
- avancé : relier les commits au changelog, au versioning sémantique et aux releases automatisées.

L'objectif n'est pas seulement d'avoir de jolis messages. L'objectif est de rendre l'historique du projet compréhensible, exploitable et maintenable.

## Qu'est-ce qu'un commit ?

Un commit est un point d'historique dans Git.

Il représente une modification du projet à un instant donné.

Un commit contient principalement :

- les fichiers modifiés ;
- l'auteur ;
- la date ;
- un identifiant unique ;
- un message décrivant le changement.

Le message de commit est très important, car il explique l'intention du changement.

## Pourquoi les messages de commit sont importants ?

Dans un projet professionnel, l'historique Git sert à comprendre l'évolution du projet.

Un bon historique permet de répondre à des questions comme :

- Pourquoi ce fichier a-t-il été modifié ?
- Quand cette documentation a-t-elle été ajoutée ?
- Quelle modification a introduit une erreur ?
- Quelle version contient une fonctionnalité ?
- Quels changements doivent apparaître dans le changelog ?
- Quel commit doit être annulé en cas de problème ?

Des messages vagues comme `update`, `fix`, `test` ou `final` ne permettent pas de répondre clairement à ces questions.

## Définition de Conventional Commits

Conventional Commits est une convention pour écrire des messages de commit structurés.

Le format de base est :

```text
type(scope): description
```

Exemple :

```text
docs(git): add repository workflow guide
```

Ce message indique :

- `docs` : le type de changement ;
- `git` : le sujet concerné ;
- `add repository workflow guide` : l'action réalisée.

## Format recommandé

Format simple :

```text
type(scope): short description
```

Format complet :

```text
type(scope): short description

Longer explanation if needed.

Footer if needed.
```

Exemple complet :

```text
docs(contributing): add contribution guidelines

Add contribution rules, branch naming conventions, pull request guidance,
security reminders, and checklists for future contributors.
```

Pour ce dépôt, le format simple est suffisant dans la plupart des cas.

## Pourquoi utiliser Conventional Commits en DevOps ?

Conventional Commits est utile en DevOps parce que cette convention améliore :

- la lisibilité de l'historique Git ;
- la qualité des revues de code ;
- la traçabilité des changements ;
- la génération d'un changelog ;
- la gestion des versions ;
- l'automatisation des releases ;
- la collaboration entre plusieurs personnes.

Dans une démarche DevOps, les commits deviennent une source d'information fiable pour comprendre ce qui change dans le projet.

## Structure d'un message

Un message Conventional Commit contient trois parties principales.

## 1. Le type

Le type indique la nature du changement.

Exemples :

```text
docs
feat
fix
ci
chore
test
refactor
```

## 2. Le scope

Le scope indique la zone concernée par le changement.

Exemples :

```text
readme
devops
git
docker
ci
k8s
terraform
security
contributing
```

Le scope est placé entre parenthèses :

```text
docs(git): add branch naming convention
```

## 3. La description

La description explique brièvement ce qui change.

Elle doit être :

- courte ;
- claire ;
- écrite en anglais dans ce dépôt ;
- sans point final ;
- formulée comme une action.

Exemple :

```text
docs(commits): add conventional commits guide
```

## Types recommandés dans ce dépôt

## `docs`

Utilisé pour tout changement de documentation.

Exemples :

```text
docs(readme): add project overview
docs(devops): add complete introduction to devops
docs(git): add repository workflow guide
docs(contributing): add contribution guidelines
docs(commits): add conventional commits guide
```

## `feat`

Utilisé pour ajouter un nouvel exemple, une nouvelle fonctionnalité ou un nouveau contenu pratique.

Exemples :

```text
feat(docker): add multi-stage Dockerfile example
feat(terraform): add basic infrastructure example
feat(k8s): add deployment manifest
feat(ansible): add server setup playbook
```

## `fix`

Utilisé pour corriger une erreur.

Exemples :

```text
fix(readme): correct broken docs link
fix(docker): correct exposed port
fix(k8s): correct service selector
fix(ci): correct workflow trigger
```

## `ci`

Utilisé pour les workflows CI/CD.

Exemples :

```text
ci(github): add markdown validation workflow
ci(security): add secret scanning workflow
ci(docker): add image build check
```

## `chore`

Utilisé pour les tâches de maintenance qui ne changent pas directement le contenu principal.

Exemples :

```text
chore(repo): add license
chore(repo): add gitignore
chore(deps): update tooling configuration
```

## `test`

Utilisé pour ajouter ou modifier des tests et validations.

Exemples :

```text
test(docs): add markdown link validation
test(terraform): add validation command
test(k8s): add manifest validation example
```

## `refactor`

Utilisé pour réorganiser ou améliorer une structure sans changer le comportement attendu.

Exemples :

```text
refactor(docs): reorganize security sections
refactor(examples): simplify docker folder structure
```

## `style`

Utilisé pour les changements de style qui ne modifient pas le contenu ou le comportement.

Exemples :

```text
style(docs): improve markdown formatting
style(readme): normalize heading spacing
```

## `perf`

Utilisé pour une amélioration de performance.

Ce type sera plus utile lorsque le dépôt contiendra des exemples applicatifs.

Exemple :

```text
perf(docker): reduce image size
```

## Scopes recommandés

Les scopes doivent rester simples et compréhensibles.

Scopes recommandés pour ce dépôt :

```text
readme
devops
git
commits
contributing
changelog
docker
ci
github
terraform
k8s
ansible
security
monitoring
docs
repo
```

Exemples :

```text
docs(changelog): add project changelog
feat(docker): add compose example
ci(github): add docs quality workflow
docs(security): add secrets management guide
```

## Bonnes pratiques de description

Une bonne description doit expliquer l'action réalisée.

Bonnes descriptions :

```text
add repository workflow guide
explain branch naming convention
correct broken documentation link
add markdown validation workflow
document secrets management practices
```

Descriptions à éviter :

```text
update
fix
changes
work
final
test
new stuff
```

## Langue des commits

Dans ce dépôt, les messages de commit sont recommandés en anglais.

Pourquoi ?

- les conventions DevOps sont souvent en anglais ;
- les outils de release automatique utilisent généralement l'anglais ;
- les messages restent compatibles avec les standards open source ;
- l'historique Git est plus facile à lire pour un public plus large.

La documentation peut rester en français.

Exemple :

```text
Commit :
docs(commits): add conventional commits guide

Documentation :
Ce document explique comment écrire des commits professionnels.
```

## Exemples de bons commits

```text
docs(readme): add project overview
docs(devops): add complete introduction to devops
docs(git): add repository workflow guide
docs(contributing): add contribution guidelines
docs(changelog): add project changelog
docs(commits): add conventional commits guide
feat(docker): add production Dockerfile example
ci(github): add markdown validation workflow
fix(readme): correct roadmap item
chore(repo): add gitignore
```

## Exemples de mauvais commits

```text
update
fix
final version
commit
work
test
ajout
correction
modifs
wip
```

Pourquoi ces messages sont mauvais :

- ils ne donnent pas le sujet ;
- ils ne donnent pas l'intention ;
- ils ne permettent pas de générer un changelog utile ;
- ils rendent l'historique difficile à comprendre.

## Différence entre type et scope

Le type décrit la nature du changement.

Le scope décrit la zone concernée.

Exemple :

```text
docs(git): add branch naming convention
```

Ici :

- `docs` = c'est de la documentation ;
- `git` = cela concerne Git ;
- `add branch naming convention` = cela ajoute une convention de nommage.

Autre exemple :

```text
ci(github): add markdown validation workflow
```

Ici :

- `ci` = cela concerne la CI/CD ;
- `github` = cela concerne GitHub Actions ;
- `add markdown validation workflow` = cela ajoute un workflow de validation Markdown.

## Commits atomiques

Un commit atomique est un commit qui représente un seul changement logique.

Bonne pratique :

```text
1 commit = 1 objectif clair
```

Exemples de bons commits atomiques :

```text
docs(git): add branch naming convention
docs(git): explain pull request workflow
docs(git): add merge strategy recommendations
```

Mauvais exemple :

```text
docs(repo): update readme git docker ci and security docs
```

Ce mauvais exemple mélange trop de sujets.

## Ce qu'il faut éviter dans un commit

Un commit ne doit pas mélanger :

- documentation et configuration CI ;
- correction et nouvelle fonctionnalité ;
- refactorisation et ajout de contenu ;
- formatage massif et changement logique ;
- plusieurs sujets sans lien direct.

Exemple à éviter :

```text
feat(repo): add docker examples and fix readme and update changelog
```

Préférer plusieurs commits :

```text
feat(docker): add compose example
fix(readme): correct docker docs link
docs(changelog): document docker examples
```

## Corps du commit

Le corps du commit est optionnel.

Il sert à ajouter une explication plus longue quand le titre ne suffit pas.

Exemple :

```text
docs(git): add repository workflow guide

Document the branch strategy, pull request process, commit rules,
versioning recommendations, and security checks used by this repository.
```

Le corps est utile quand :

- le changement est important ;
- la décision mérite une explication ;
- il existe une limitation connue ;
- le commit sera lu plus tard pour comprendre un choix.

## Footer du commit

Le footer est utilisé pour ajouter des informations particulières.

Exemples :

```text
Closes #12
Refs #42
BREAKING CHANGE: rename examples folder structure
```

Dans ce dépôt, le footer sera surtout utile plus tard si le projet utilise des issues GitHub.

## Breaking changes

Un breaking change est un changement qui casse une compatibilité existante.

Dans Conventional Commits, il peut être indiqué avec `!` :

```text
feat(api)!: rename deployment configuration format
```

Ou avec un footer :

```text
feat(api): rename deployment configuration format

BREAKING CHANGE: the old configuration format is no longer supported.
```

Dans ce dépôt pédagogique, les breaking changes seront rares, mais il est important de connaître cette convention.

## Lien avec le versioning sémantique

Conventional Commits aide à déterminer la prochaine version.

Avec le versioning sémantique :

```text
MAJOR.MINOR.PATCH
```

Correspondance courante :

- `fix` correspond souvent à un changement `PATCH` ;
- `feat` correspond souvent à un changement `MINOR` ;
- `BREAKING CHANGE` correspond à un changement `MAJOR`.

Exemples :

```text
fix(readme): correct broken link
```

Peut justifier :

```text
v0.3.1
```

```text
feat(docker): add compose example
```

Peut justifier :

```text
v0.4.0
```

```text
feat(repo)!: reorganize documentation structure
```

Peut justifier une version majeure plus tard :

```text
v1.0.0 -> v2.0.0
```

## Lien avec le changelog

Un changelog décrit les changements importants du projet.

Des commits bien structurés facilitent sa rédaction.

Exemple de commits :

```text
docs(devops): add complete introduction to devops
docs(git): add repository workflow guide
docs(contributing): add contribution guidelines
```

Entrée possible dans `CHANGELOG.md` :

```md
### Added

- Ajout d'une introduction complète au DevOps.
- Ajout d'un guide de workflow Git.
- Ajout d'un guide de contribution.
```

Plus les commits sont clairs, plus le changelog est facile à maintenir.

## Lien avec les pull requests

Dans ce dépôt, le titre d'une pull request doit idéalement suivre la même convention que les commits.

Exemples :

```text
docs(commits): add conventional commits guide
feat(docker): add docker examples
ci(github): add markdown validation workflow
```

Cela permet d'utiliser `Squash and merge` avec un message final propre.

## Squash and merge

Quand une pull request est fusionnée avec `Squash and merge`, tous les commits de la branche sont regroupés en un seul commit sur `main`.

Le message final doit être propre.

Exemple :

```text
docs(commits): add conventional commits guide
```

Cette pratique est adaptée à ce dépôt parce qu'elle garde l'historique de `main` lisible.

## Exemples par situation

## Ajouter un document

```text
docs(security): add secrets management guide
```

## Corriger une faute

```text
fix(readme): correct typo in roadmap
```

## Ajouter un exemple Docker

```text
feat(docker): add multi-stage Dockerfile example
```

## Ajouter une pipeline GitHub Actions

```text
ci(github): add markdown validation workflow
```

## Ajouter un fichier de maintenance

```text
chore(repo): add gitignore
```

## Réorganiser un dossier

```text
refactor(docs): reorganize documentation sections
```

## Ajouter une validation

```text
test(docs): add markdown link validation
```

## Cas particuliers

## Correction d'un document existant

Si le changement corrige une erreur dans la documentation :

```text
fix(git): correct branch cleanup command
```

Si le changement ajoute du contenu documentaire :

```text
docs(git): explain branch cleanup process
```

## Ajout d'un outil CI

Si le changement concerne un workflow :

```text
ci(github): add secret scanning workflow
```

Si le changement documente l'outil :

```text
docs(security): explain secret scanning workflow
```

## Ajout d'un exemple

Si l'exemple est un nouveau contenu pratique :

```text
feat(terraform): add basic aws infrastructure example
```

Si le changement explique seulement l'exemple :

```text
docs(terraform): explain basic infrastructure example
```

## Checklist avant commit

Avant de créer un commit, vérifier :

- [ ] Je suis sur la bonne branche.
- [ ] Mon changement a un seul objectif.
- [ ] J'ai vérifié `git status`.
- [ ] J'ai relu `git diff`.
- [ ] Aucun secret n'est présent.
- [ ] Aucun fichier inutile n'est ajouté.
- [ ] Le type de commit est correct.
- [ ] Le scope est clair.
- [ ] La description est courte et compréhensible.

## Checklist pour choisir le type

Se poser les questions suivantes :

- Est-ce uniquement de la documentation ? Utiliser `docs`.
- Est-ce un nouvel exemple ou une nouvelle fonctionnalité ? Utiliser `feat`.
- Est-ce une correction ? Utiliser `fix`.
- Est-ce un workflow CI/CD ? Utiliser `ci`.
- Est-ce de la maintenance du dépôt ? Utiliser `chore`.
- Est-ce une réorganisation sans changement de comportement ? Utiliser `refactor`.
- Est-ce lié aux tests ou validations ? Utiliser `test`.

## Workflow complet avec commit

Exemple pour ajouter ce document :

```bash
git checkout main
git pull origin main
git checkout -b docs/conventional-commits
```

Créer ou modifier :

```text
docs/03-conventional-commits.md
```

Vérifier :

```bash
git status
git diff
```

Ajouter et committer :

```bash
git add docs/03-conventional-commits.md
git commit -m "docs(commits): add conventional commits guide"
```

Pousser :

```bash
git push -u origin docs/conventional-commits
```

## Automatisation possible

Dans un projet plus avancé, il est possible d'automatiser la validation des messages de commit.

Outils fréquents :

- Commitlint ;
- Husky ;
- semantic-release ;
- release-please ;
- standard-version.

Ces outils peuvent :

- vérifier le format des commits ;
- générer un changelog ;
- créer des tags ;
- publier des releases ;
- calculer automatiquement la prochaine version.

Pour ce dépôt, ces outils peuvent être ajoutés plus tard, lorsque la base documentaire sera stable.

## Exemple avec commitlint

Un projet JavaScript peut utiliser Commitlint pour vérifier les messages.

Exemple de règle :

```text
type(scope): description
```

Si un commit ne respecte pas le format, il peut être refusé.

Exemple refusé :

```text
update file
```

Exemple accepté :

```text
docs(commits): add conventional commits guide
```

## Erreurs fréquentes

## Utiliser un type incorrect

Exemple :

```text
feat(readme): fix typo
```

Meilleur message :

```text
fix(readme): correct typo
```

## Utiliser un scope trop vague

Exemple :

```text
docs(stuff): add guide
```

Meilleur message :

```text
docs(git): add branch naming guide
```

## Ecrire une description trop longue

Exemple :

```text
docs(git): add a very long documentation file that explains everything about how branches and pull requests and commits should work in this repository
```

Meilleur message :

```text
docs(git): add repository workflow guide
```

## Mettre un point final

A éviter :

```text
docs(git): add repository workflow guide.
```

Préférer :

```text
docs(git): add repository workflow guide
```

## Mélanger plusieurs changements

A éviter :

```text
docs(repo): add git guide docker examples and changelog
```

Préférer :

```text
docs(git): add repository workflow guide
feat(docker): add docker examples
docs(changelog): add project changelog
```

## Bonnes pratiques pour ce dépôt

Pour ce dépôt, appliquer les règles suivantes :

- écrire les messages de commit en anglais ;
- garder la documentation en français ;
- utiliser Conventional Commits ;
- créer une branche par sujet ;
- utiliser `Squash and merge` pour garder `main` propre ;
- mettre à jour le changelog lors des changements importants ;
- éviter les commits temporaires dans `main`.

## Résumé pour débutants

Si tu débutes, retiens cette formule :

```text
type(scope): ce qui change
```

Exemples simples :

```text
docs(readme): add project overview
docs(git): add workflow guide
fix(readme): correct typo
```

Evite :

```text
update
fix
final
test
```

## Résumé pour niveau intermédiaire

Si tu as déjà les bases, concentre-toi sur :

- choisir le bon type ;
- choisir un scope précis ;
- faire des commits atomiques ;
- garder un historique lisible ;
- relier les commits aux pull requests ;
- maintenir le changelog.

## Résumé pour niveau avancé

Pour aller plus loin, approfondir :

- validation automatique avec Commitlint ;
- génération automatique de changelog ;
- semantic-release ;
- release-please ;
- signature des commits ;
- règles de protection de branche ;
- automatisation du versioning.

## Conclusion

Conventional Commits est une pratique simple, mais très puissante.

Elle rend l'historique Git plus clair, facilite les revues de code, prépare le changelog et permet d'automatiser les releases.

Pour ce dépôt, la règle principale est :

```text
Un changement clair = une branche claire = un commit clair = une pull request claire
```

Cette discipline rend le projet plus professionnel et montre concrètement une bonne pratique DevOps.

## Prochaine étape recommandée

La prochaine étape logique est d'ajouter un template de pull request :

```text
.github/pull_request_template.md
```

Ce fichier aidera chaque future pull request à avoir une description claire, des vérifications et une structure cohérente.
