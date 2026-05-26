# Exemples GitHub Actions

## Objectif

Ce dossier contient des exemples de workflows GitHub Actions pour apprendre à construire une CI/CD DevOps propre, progressive et sécurisée.

Ces fichiers sont des exemples pédagogiques. Pour les activer dans un vrai projet, il faut les copier dans :

```text
.github/workflows/
```

Puis adapter les chemins, secrets, noms d'images et commandes au projet réel.

## Contenu

```text
examples/github-actions/
├── README.md
├── docs-quality.example.yml
├── docker-build.example.yml
├── security-scan.example.yml
└── release.example.yml
```

## Workflows disponibles

## `docs-quality.example.yml`

Ce workflow montre comment vérifier la qualité documentaire.

Il couvre :

- lint Markdown ;
- lint YAML ;
- validation des workflows GitHub Actions avec `actionlint`.

Objectif :

```text
Bloquer une pull request si la documentation ou les fichiers YAML sont invalides.
```

## `docker-build.example.yml`

Ce workflow montre comment vérifier un exemple Docker.

Il couvre :

- validation Docker Compose ;
- build Docker avec Buildx ;
- cache GitHub Actions ;
- lancement d'un conteneur ;
- smoke test sur `/health` ;
- logs en cas d'échec.

Objectif :

```text
Vérifier qu'une image Docker se construit et démarre correctement avant merge.
```

## `security-scan.example.yml`

Ce workflow montre une base de sécurité CI/CD.

Il couvre :

- scan de secrets avec Gitleaks ;
- scan filesystem avec Trivy ;
- build d'image Docker ;
- scan d'image Docker avec Trivy.

Objectif :

```text
Détecter tôt les secrets, dépendances vulnérables et images à risque.
```

## `release.example.yml`

Ce workflow montre une base de release.

Il couvre :

- déclenchement sur tag `v*.*.*` ;
- validation du format de version ;
- publication d'image Docker dans GitHub Container Registry ;
- création d'une GitHub Release ;
- usage de labels OCI.

Objectif :

```text
Transformer un tag Git en release traçable avec image Docker publiée.
```

## Comment utiliser ces exemples

Copier un exemple dans `.github/workflows/`.

Exemple :

```bash
cp examples/github-actions/docker-build.example.yml .github/workflows/docker-build.yml
```

Puis adapter :

- le nom du workflow ;
- les chemins du projet ;
- les commandes de test ;
- le nom de l'image Docker ;
- les secrets nécessaires ;
- les permissions GitHub Actions.

## Bonnes pratiques montrées

Ces workflows montrent plusieurs pratiques professionnelles :

- permissions minimales ;
- timeouts ;
- `concurrency` pour annuler les runs obsolètes ;
- triggers ciblés ;
- cache Docker ;
- scans de sécurité ;
- logs utiles ;
- validation des versions ;
- séparation des responsabilités par workflow.

## Sécurité

Ne jamais écrire un secret directement dans un fichier YAML.

Mauvais exemple :

```yaml
env:
  TOKEN: "example-placeholder"
```

Bon exemple :

```yaml
env:
  TOKEN: ${{ secrets.TOKEN }}
```

Les secrets GitHub se configurent dans :

```text
Settings -> Secrets and variables -> Actions
```

## Permissions

Commencer avec des permissions minimales :

```yaml
permissions:
  contents: read
```

Ajouter seulement ce qui est nécessaire.

Exemples :

```yaml
permissions:
  contents: read
  packages: write
```

Ou :

```yaml
permissions:
  contents: read
  security-events: write
```

Eviter :

```yaml
permissions: write-all
```

## Quand utiliser chaque workflow

Pour un dépôt documentaire :

```text
docs-quality.example.yml
```

Pour une application Docker :

```text
docker-build.example.yml
security-scan.example.yml
```

Pour une publication versionnée :

```text
release.example.yml
```

## Checklist avant activation

Avant de copier un exemple dans `.github/workflows/` :

- [ ] Les chemins correspondent au projet.
- [ ] Les commandes fonctionnent localement.
- [ ] Les secrets nécessaires sont configurés.
- [ ] Les permissions sont minimales.
- [ ] Les triggers sont adaptés.
- [ ] Les timeouts sont présents.
- [ ] Le workflow est relu.
- [ ] Le workflow est testé dans une pull request.

## Prochaine étape recommandée

Après ces exemples, la prochaine étape logique est de créer un workflow actif pour l'exemple Docker :

```text
.github/workflows/docker-example.yml
```

Ce workflow pourra être réellement exécuté sur les pull requests du dépôt.
