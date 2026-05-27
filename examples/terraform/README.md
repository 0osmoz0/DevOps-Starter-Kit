# Exemple Terraform

## Objectif

Cet exemple montre une base Terraform simple, professionnelle et exécutable **sans créer de ressources cloud payantes**.

Il complète le guide `docs/06-infrastructure-as-code.md` avec des fichiers concrets :

- `versions.tf` ;
- `variables.tf` ;
- `main.tf` ;
- `outputs.tf` ;
- `terraform.tfvars.example` ;
- `Makefile` ;
- `.gitignore`.

Le provider [`local`](https://registry.terraform.io/providers/hashicorp/local/latest/docs) génère des fichiers sur la machine locale pour simuler des artefacts d'infrastructure (configuration JSON, manifeste Kubernetes, README).

## Ce que contient l'exemple

```text
examples/terraform/
├── versions.tf
├── variables.tf
├── main.tf
├── outputs.tf
├── terraform.tfvars.example
├── Makefile
├── .gitignore
└── README.md
```

Après un `terraform apply`, Terraform crée un dossier local (par défaut `generated/<environment>/`) contenant :

- `config.json` : métadonnées du projet et tags ;
- `deployment.yaml` : manifeste Kubernetes minimal (pédagogique, non déployé) ;
- `README.txt` : résumé des valeurs appliquées.

## Prérequis

- [Terraform](https://developer.hashicorp.com/terraform/install) `>= 1.6.0` ;
- accès réseau pour le premier `terraform init` (téléchargement du provider).

Vérifier Terraform :

```bash
terraform version
```

## Démarrage rapide

Depuis le dossier `examples/terraform/` :

```bash
cp terraform.tfvars.example terraform.tfvars
make init
make validate
make plan
make apply
```

Consulter les outputs :

```bash
terraform output
```

Inspecter les fichiers générés :

```bash
ls -la generated/dev/
cat generated/dev/config.json
```

Nettoyer les ressources gérées par Terraform :

```bash
make destroy
```

## Commandes utiles

| Commande | Rôle |
| --- | --- |
| `terraform init` | Initialise le backend local et télécharge les providers |
| `terraform fmt` | Formate les fichiers `.tf` |
| `terraform validate` | Vérifie la syntaxe et la cohérence |
| `terraform plan` | Affiche les changements prévus |
| `terraform apply` | Applique les changements |
| `terraform destroy` | Supprime les ressources gérées |

Le `Makefile` encapsule ces commandes pour un usage plus rapide.

## Variables

| Variable | Description | Défaut |
| --- | --- | --- |
| `project_name` | Nom logique du projet | `devops-starter-kit` |
| `environment` | Environnement (`dev`, `staging`, `production`) | `dev` |
| `owner` | Équipe ou responsable | `platform` |
| `cost_center` | Centre de coût (gouvernance) | `education` |
| `output_root` | Dossier racine des artefacts générés | `generated` |

Copier `terraform.tfvars.example` vers `terraform.tfvars` pour personnaliser les valeurs.

**Ne commitez pas** `terraform.tfvars` s'il contient des données sensibles. Dans cet exemple, les valeurs sont publiques et pédagogiques.

## Bonnes pratiques illustrées

- **Séparation des fichiers** : versions, variables, ressources, outputs ;
- **Validations** sur les variables (`environment`, `project_name`) ;
- **Tags / métadonnées** centralisés dans un `locals` ;
- **Outputs** pour exposer les chemins des artefacts ;
- **`.gitignore`** pour exclure state, cache provider et dossier `generated/` ;
- **Provider local** : idéal pour apprendre `init`, `plan`, `apply`, `destroy` sans facturation cloud.

## Fichiers à ne pas versionner

- `.terraform/` : cache des providers ;
- `*.tfstate` / `*.tfstate.*` : state local (dans un vrai projet, préférer un **backend distant** avec verrouillage) ;
- `generated/` : artefacts recréés par `apply` ;
- `terraform.tfvars` : optionnel si vous y mettez des secrets.

Le fichier `.terraform.lock.hcl` peut être versionné pour figer les versions exactes des providers en équipe.

## Lien avec la CI

Le workflow actif `.github/workflows/terraform-example.yml` exécute sur les pull requests qui modifient `examples/terraform/` :

```bash
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
terraform plan
```

Un modèle copiable est disponible dans `examples/github-actions/terraform.example.yml`.

## Aller plus loin

- Lire `docs/06-infrastructure-as-code.md` pour le state distant, les modules, le drift et la sécurité ;
- Remplacer le provider `local` par AWS, Azure ou GCP quand vous êtes prêts ;
- Découper le code en `modules/` et `environments/` pour un projet réel.
