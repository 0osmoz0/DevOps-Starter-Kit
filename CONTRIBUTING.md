# Guide de contribution

## Objectif

Merci de vouloir contribuer à ce dépôt.

Ce guide explique comment proposer des changements de manière propre, lisible et compatible avec une démarche DevOps professionnelle.

L'objectif est de garder le dépôt :

- clair ;
- stable ;
- documenté ;
- facile à relire ;
- cohérent dans son historique Git ;
- sécurisé contre les erreurs courantes comme les secrets committés.

Ce dépôt étant un support pédagogique DevOps, il doit lui-même appliquer les bonnes pratiques qu'il présente.

## Principes généraux

Avant toute contribution, il faut respecter quelques principes simples :

- une contribution doit avoir un objectif clair ;
- une branche doit correspondre à un sujet précis ;
- un commit doit représenter un changement logique ;
- une pull request doit être facile à relire ;
- aucun secret ne doit être versionné ;
- la documentation doit rester compréhensible pour tous les niveaux.

## Workflow recommandé

Ce dépôt utilise un workflow proche de GitHub Flow.

Le cycle recommandé est :

```text
main
  ↓
créer une branche courte
  ↓
faire des commits clairs
  ↓
pousser la branche
  ↓
ouvrir une pull request
  ↓
relire et vérifier
  ↓
fusionner dans main
  ↓
supprimer la branche
```

## Branche principale

La branche `main` représente la version stable du dépôt.

Elle doit contenir uniquement :

- de la documentation validée ;
- des exemples cohérents ;
- des fichiers de configuration stables ;
- des workflows CI/CD validés ;
- des changements relus.

Il faut éviter de travailler directement sur `main`.

## Créer une branche

Avant de créer une branche, il faut partir de `main` à jour :

```bash
git checkout main
git pull origin main
```

Créer ensuite une branche dédiée :

```bash
git checkout -b docs/contributing-guide
```

## Convention de nommage des branches

Format recommandé :

```text
type/short-description
```

Exemples :

```text
docs/contributing-guide
docs/git-workflow
feat/docker-examples
ci/markdown-quality
fix/readme-links
chore/add-license
```

Types recommandés :

- `docs` : documentation ;
- `feat` : ajout d'un exemple ou d'une fonctionnalité ;
- `fix` : correction ;
- `ci` : pipeline CI/CD ;
- `chore` : maintenance du dépôt ;
- `refactor` : réorganisation sans changement de comportement ;
- `test` : tests ou validations.

Eviter les noms vagues :

```text
update
test
final
changes
branch1
my-work
```

## Modifier le dépôt

Une contribution peut concerner :

- un document dans `docs/` ;
- le `README.md` ;
- un exemple dans `examples/` ;
- un script dans `scripts/` ;
- un workflow CI/CD dans `.github/workflows/` ;
- un fichier de gouvernance comme `CONTRIBUTING.md` ou `CHANGELOG.md`.

Chaque modification doit rester liée au sujet de la branche.

Exemple :

```text
docs/contributing-guide -> CONTRIBUTING.md uniquement
feat/docker-examples -> examples/docker/ uniquement
ci/markdown-quality -> .github/workflows/ uniquement
```

## Vérifier les changements

Avant de créer un commit, vérifier l'état du dépôt :

```bash
git status
```

Relire les différences :

```bash
git diff
```

Cette étape permet d'éviter de committer :

- des fichiers temporaires ;
- des modifications non voulues ;
- des secrets ;
- des logs ;
- des fichiers générés ;
- du contenu incomplet.

## Ajouter les fichiers au commit

Ajouter uniquement les fichiers nécessaires.

Exemple :

```bash
git add CONTRIBUTING.md
```

Eviter `git add .` si les changements n'ont pas été vérifiés avant.

## Convention de commits

Ce dépôt utilise Conventional Commits.

Format :

```text
type(scope): description courte
```

Exemples :

```text
docs(contributing): add contribution guidelines
docs(git): add repository workflow guide
docs(devops): add complete introduction to devops
feat(docker): add docker compose example
ci(github): add markdown validation workflow
fix(readme): correct documentation link
chore(repo): add license file
```

## Types de commits

Types recommandés :

- `docs` : modification de documentation ;
- `feat` : nouvel exemple ou nouvelle fonctionnalité ;
- `fix` : correction ;
- `ci` : modification de CI/CD ;
- `chore` : maintenance ;
- `refactor` : amélioration interne sans changement fonctionnel ;
- `test` : ajout ou modification de tests.

## Règles pour un bon commit

Un bon commit doit être :

- petit ;
- cohérent ;
- compréhensible ;
- lié à un seul objectif ;
- facile à relire ;
- facile à annuler si nécessaire.

Eviter les messages comme :

```text
update
fix
final
changes
test
work
```

Préférer :

```text
docs(contributing): add contribution guidelines
fix(readme): correct roadmap item
ci(github): add docs validation workflow
```

## Créer un commit

Exemple :

```bash
git commit -m "docs(contributing): add contribution guidelines"
```

## Pousser la branche

Pour la première fois :

```bash
git push -u origin docs/contributing-guide
```

Ensuite :

```bash
git push
```

## Pull request

Une pull request sert à proposer un changement avant de le fusionner dans `main`.

Elle permet :

- de relire les changements ;
- de discuter si nécessaire ;
- de lancer les vérifications automatiques ;
- de garder une trace claire de l'évolution du dépôt ;
- de protéger la branche principale.

## Titre de pull request

Le titre doit suivre la même logique que les commits.

Exemples :

```text
docs(contributing): add contribution guidelines
docs(git): add repository workflow guide
feat(docker): add docker examples
ci(github): add markdown quality workflow
```

## Description de pull request

Format recommandé :

```md
## Résumé

- Décrire les changements principaux.
- Expliquer pourquoi ils sont utiles.

## Vérifications

- [ ] Documentation relue.
- [ ] Aucun secret ajouté.
- [ ] Changements cohérents avec le README.
- [ ] Branche à jour avec main.

## Notes

Ajouter ici les limites, questions ou points à relire.
```

## Exemple de description

```md
## Résumé

- Ajout du guide de contribution.
- Documentation du workflow Git attendu.
- Ajout des règles de commits, pull requests et sécurité.

## Vérifications

- [x] Documentation relue.
- [x] Aucun secret ajouté.
- [x] Contenu cohérent avec le guide Git.
- [x] Branche dédiée utilisée.

## Notes

Ce document prépare les futures contributions au dépôt.
```

## Revue de contribution

Avant de fusionner, vérifier :

- le changement a un objectif clair ;
- la documentation est compréhensible ;
- le style est cohérent avec le reste du dépôt ;
- les commandes proposées sont correctes ;
- aucun secret n'est présent ;
- les fichiers modifiés sont bien liés au sujet ;
- les messages de commit sont propres.

## Fusion dans `main`

La méthode recommandée pour ce dépôt est :

```text
Squash and merge
```

Cette méthode garde un historique `main` plus lisible.

Le message final doit rester clair et suivre Conventional Commits.

Exemple :

```text
docs(contributing): add contribution guidelines
```

## Supprimer la branche après merge

Après la fusion de la pull request, la branche peut être supprimée.

Sur GitHub, utiliser le bouton :

```text
Delete branch
```

En local :

```bash
git checkout main
git pull origin main
git branch -d docs/contributing-guide
```

Si la branche distante existe encore :

```bash
git push origin --delete docs/contributing-guide
```

## Sécurité

La sécurité est obligatoire dans toute contribution.

Ne jamais committer :

- fichier `.env` ;
- mot de passe ;
- token API ;
- clé privée ;
- fichier de credentials ;
- certificat sensible ;
- secret Kubernetes réel ;
- clé cloud ;
- dump de base de données.

## Variables d'environnement

Un fichier `.env` réel ne doit pas être versionné.

Un fichier d'exemple peut être versionné :

```text
.env.example
```

Exemple :

```env
APP_ENV=development
APP_PORT=3000
DATABASE_URL=replace_me
```

Les valeurs doivent être fictives et non sensibles.

## Que faire si un secret a été committé ?

Si un secret a été ajouté par erreur :

```text
1. Ne pas ignorer le problème
2. Considérer le secret comme compromis
3. Révoquer ou remplacer le secret
4. Supprimer le secret du dépôt
5. Nettoyer l'historique si nécessaire
6. Ajouter une protection pour éviter que cela se reproduise
```

Supprimer le secret dans un nouveau commit ne suffit pas toujours, car il reste dans l'historique Git.

## Qualité de la documentation

La documentation doit être :

- claire ;
- structurée ;
- progressive ;
- compréhensible par plusieurs niveaux ;
- cohérente avec les autres fichiers ;
- utile dans un contexte réel.

Chaque document important devrait idéalement contenir :

- un objectif ;
- une définition ;
- des exemples ;
- des bonnes pratiques ;
- des erreurs à éviter ;
- une conclusion ou prochaine étape.

## Style rédactionnel

Recommandations :

- écrire des phrases simples ;
- expliquer les acronymes ;
- éviter le jargon inutile ;
- donner des exemples concrets ;
- utiliser des listes quand elles améliorent la lisibilité ;
- ne pas supposer que le lecteur connaît déjà tous les outils.

## Langue du dépôt

La documentation principale est rédigée en français.

Les éléments techniques peuvent rester en anglais lorsqu'il s'agit de conventions courantes :

- noms de branches ;
- messages de commit ;
- noms de fichiers standards ;
- commandes ;
- concepts DevOps largement utilisés.

Exemples :

```text
docs(contributing): add contribution guidelines
docs/git-workflow
README.md
CHANGELOG.md
CONTRIBUTING.md
```

## Structure recommandée des futurs documents

Pour un fichier dans `docs/`, utiliser une structure proche de celle-ci :

```md
# Titre du document

## Objectif

## Définition

## Pourquoi c'est important

## Exemple concret

## Bonnes pratiques

## Erreurs fréquentes

## Résumé

## Prochaine étape
```

Cette structure rend la documentation plus facile à lire et à maintenir.

## Contribution aux exemples

Les exemples doivent être simples, réalistes et pédagogiques.

Un bon exemple doit :

- être lisible ;
- éviter la complexité inutile ;
- contenir des noms clairs ;
- ne pas inclure de secrets ;
- être accompagné d'une explication ;
- représenter une pratique réellement utilisée.

## Contribution aux scripts

Les scripts doivent être :

- utiles ;
- lisibles ;
- documentés si nécessaire ;
- prudents avec les suppressions ;
- compatibles avec l'objectif pédagogique du dépôt.

Eviter les scripts qui :

- suppriment des fichiers sans confirmation ;
- dépendent d'un environnement trop spécifique ;
- contiennent des secrets ;
- mélangent trop de responsabilités.

## Contribution aux workflows CI/CD

Les workflows doivent rester compréhensibles.

Un workflow CI/CD doit idéalement :

- avoir un nom clair ;
- se déclencher au bon moment ;
- contenir des étapes lisibles ;
- échouer clairement en cas de problème ;
- éviter les permissions inutiles ;
- utiliser des secrets GitHub seulement si nécessaire.

Exemples de futurs contrôles utiles :

- lint Markdown ;
- validation YAML ;
- scan de secrets ;
- vérification Dockerfile ;
- validation Terraform ;
- validation Kubernetes.

## Versioning

Ce dépôt peut utiliser le versioning sémantique :

```text
MAJOR.MINOR.PATCH
```

Exemple :

```text
v0.2.0
```

Signification :

- `MAJOR` : changement important ou rupture ;
- `MINOR` : ajout de contenu compatible ;
- `PATCH` : correction ou amélioration mineure.

## Changelog

Les changements importants doivent être documentés dans un futur `CHANGELOG.md`.

Cela permet de suivre :

- les documents ajoutés ;
- les exemples ajoutés ;
- les corrections ;
- les changements de structure ;
- les versions du dépôt.

## Checklist avant commit

- [ ] Je suis sur une branche dédiée.
- [ ] J'ai vérifié `git status`.
- [ ] J'ai relu `git diff`.
- [ ] Mon changement a un objectif clair.
- [ ] Le message de commit suit Conventional Commits.
- [ ] Aucun secret n'est présent.
- [ ] Aucun fichier inutile n'est ajouté.
- [ ] La documentation est lisible.

## Checklist avant pull request

- [ ] La branche part de `main` à jour.
- [ ] Le nom de branche est clair.
- [ ] La pull request a un titre clair.
- [ ] La description explique le changement.
- [ ] Les fichiers modifiés sont cohérents entre eux.
- [ ] Aucun secret n'est ajouté.
- [ ] Les vérifications utiles ont été faites.

## Checklist avant merge

- [ ] La pull request a été relue.
- [ ] Les discussions sont résolues.
- [ ] Le message final est propre.
- [ ] La branche peut être supprimée après merge.
- [ ] Un tag est créé si le changement correspond à une version importante.

## Commandes utiles

Mettre `main` à jour :

```bash
git checkout main
git pull origin main
```

Créer une branche :

```bash
git checkout -b docs/contributing-guide
```

Voir l'état du dépôt :

```bash
git status
```

Voir les changements :

```bash
git diff
```

Ajouter un fichier :

```bash
git add CONTRIBUTING.md
```

Créer un commit :

```bash
git commit -m "docs(contributing): add contribution guidelines"
```

Pousser la branche :

```bash
git push -u origin docs/contributing-guide
```

Supprimer une branche locale après merge :

```bash
git branch -d docs/contributing-guide
```

## Résumé rapide

Pour contribuer proprement :

```text
1. Partir de main à jour
2. Créer une branche dédiée
3. Faire une modification cohérente
4. Relire les changements
5. Faire un commit clair
6. Pousser la branche
7. Ouvrir une pull request
8. Relire et vérifier
9. Fusionner dans main
10. Supprimer la branche
```

## Prochaine étape recommandée

Après ce guide, la prochaine amélioration logique du dépôt est :

```text
CHANGELOG.md
```

Ce fichier permettra de suivre les versions et les changements importants du projet.
