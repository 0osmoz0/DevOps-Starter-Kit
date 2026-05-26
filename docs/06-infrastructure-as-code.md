# Infrastructure as Code

## Objectif de ce document

Ce document explique l'Infrastructure as Code, souvent appelée IaC, avec une approche progressive et orientée DevOps.

Il s'adresse à plusieurs niveaux :

- débutant : comprendre pourquoi on décrit l'infrastructure avec du code ;
- intermédiaire : comprendre Terraform, OpenTofu, Ansible, state, modules et environnements ;
- avancé : intégrer l'IaC dans une pipeline CI/CD avec sécurité, revue, drift detection et gouvernance.

L'objectif n'est pas seulement de connaître un outil. L'objectif est de comprendre comment gérer une infrastructure de manière reproductible, versionnée, traçable et sécurisée.

## Définition simple

L'Infrastructure as Code consiste à décrire l'infrastructure avec des fichiers versionnés au lieu de la créer manuellement depuis une interface graphique.

Exemples d'éléments d'infrastructure :

- serveur ;
- réseau ;
- base de données ;
- bucket de stockage ;
- load balancer ;
- firewall ;
- cluster Kubernetes ;
- utilisateur cloud ;
- règle IAM ;
- DNS ;
- monitoring.

Avec l'IaC, ces éléments sont décrits dans des fichiers.

Exemple simplifié :

```hcl
resource "aws_s3_bucket" "logs" {
  bucket = "example-logs-bucket"
}
```

Au lieu de cliquer dans une console cloud, on décrit ce que l'on veut obtenir.

## Pourquoi l'IaC est importante en DevOps

L'IaC est une pratique clé du DevOps, car elle rend l'infrastructure :

- versionnée ;
- relisible ;
- automatisable ;
- reproductible ;
- testable ;
- documentée ;
- collaborative ;
- auditable.

Sans IaC, l'infrastructure est souvent créée à la main.

Problèmes fréquents :

- personne ne sait exactement ce qui a été configuré ;
- les environnements sont différents ;
- les changements ne sont pas relus ;
- les erreurs sont difficiles à retrouver ;
- la reconstruction d'un environnement prend trop de temps ;
- la documentation devient rapidement obsolète.

Avec l'IaC, Git devient la source de vérité.

## Infrastructure manuelle vs Infrastructure as Code

## Approche manuelle

Dans une approche manuelle :

```text
1. Ouvrir une console cloud
2. Cliquer pour créer des ressources
3. Configurer les paramètres à la main
4. Noter éventuellement ce qui a été fait
5. Refaire la même chose pour un autre environnement
```

Risques :

- erreurs humaines ;
- oubli d'une étape ;
- configuration non documentée ;
- environnement difficile à reproduire ;
- différences entre staging et production.

## Approche Infrastructure as Code

Dans une approche IaC :

```text
1. Ecrire les fichiers d'infrastructure
2. Relire les changements en pull request
3. Lancer une validation automatique
4. Voir le plan des changements
5. Appliquer les changements de manière contrôlée
6. Historiser le tout dans Git
```

Avantages :

- meilleure traçabilité ;
- revue possible ;
- automatisation ;
- rollback plus clair ;
- environnement reproductible ;
- documentation vivante.

## Principes fondamentaux

## Déclaratif vs impératif

Deux styles existent souvent.

## Approche déclarative

On décrit l'état souhaité.

Exemple :

```text
Je veux un bucket, un réseau et une base de données.
```

L'outil détermine les actions nécessaires pour atteindre cet état.

Terraform, OpenTofu, Kubernetes et CloudFormation sont principalement déclaratifs.

## Approche impérative

On décrit les étapes à exécuter.

Exemple :

```text
Créer un serveur.
Installer Nginx.
Copier un fichier.
Redémarrer le service.
```

Ansible est souvent utilisé de manière plus procédurale, même s'il cherche aussi l'idempotence.

## Idempotence

Une opération idempotente peut être exécutée plusieurs fois avec le même résultat final.

Exemple :

```text
Créer un utilisateur s'il n'existe pas.
```

Si l'utilisateur existe déjà, l'outil ne doit pas le recréer inutilement.

L'idempotence est essentielle pour éviter des changements imprévisibles.

## Reproductibilité

Une infrastructure reproductible peut être recréée de manière fiable à partir des fichiers versionnés.

Cela permet :

- de créer un environnement de test ;
- de reconstruire après incident ;
- de standardiser les environnements ;
- d'intégrer l'infrastructure dans la CI/CD.

## Les outils IaC courants

## Terraform

Terraform est l'un des outils IaC les plus utilisés.

Il permet de gérer des ressources cloud avec un langage déclaratif appelé HCL.

Exemples de providers :

- AWS ;
- Azure ;
- Google Cloud ;
- Kubernetes ;
- GitHub ;
- Cloudflare ;
- Datadog.

Commande typique :

```bash
terraform plan
terraform apply
```

## OpenTofu

OpenTofu est un fork open source de Terraform.

Il utilise une logique très proche :

```bash
tofu plan
tofu apply
```

Pour un dépôt pédagogique, il est utile de connaître les deux noms, car beaucoup d'équipes discutent aujourd'hui du choix entre Terraform et OpenTofu.

## Ansible

Ansible est souvent utilisé pour configurer des machines.

Exemples :

- installer des paquets ;
- configurer Nginx ;
- créer des utilisateurs ;
- copier des fichiers ;
- redémarrer des services.

Exemple de playbook :

```yaml
- name: Configure web server
  hosts: web
  tasks:
    - name: Install nginx
      ansible.builtin.package:
        name: nginx
        state: present
```

Terraform est souvent utilisé pour créer l'infrastructure, Ansible pour configurer les serveurs.

## Pulumi

Pulumi permet de définir l'infrastructure avec des langages comme :

- TypeScript ;
- Python ;
- Go ;
- C#.

Exemple d'intérêt :

- utiliser un vrai langage de programmation ;
- créer des abstractions avancées ;
- intégrer l'IaC dans des projets applicatifs.

## CloudFormation

CloudFormation est le service IaC natif d'AWS.

Il permet de décrire des ressources AWS en YAML ou JSON.

Avantage :

- très intégré à AWS.

Inconvénient :

- moins portable vers d'autres clouds.

## Kubernetes manifests

Les fichiers Kubernetes sont aussi une forme d'IaC.

Exemple :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
```

Ils décrivent l'état souhaité du cluster.

## Terraform : concepts essentiels

## Provider

Un provider permet à Terraform de communiquer avec une plateforme.

Exemple :

```hcl
provider "aws" {
  region = "eu-west-3"
}
```

Le provider sait comment créer, modifier et supprimer des ressources sur la plateforme cible.

## Resource

Une resource représente un élément d'infrastructure.

Exemple :

```hcl
resource "aws_s3_bucket" "example" {
  bucket = "example-devops-bucket"
}
```

Une ressource a :

- un type ;
- un nom local ;
- des paramètres ;
- un état dans le fichier de state.

## Data source

Une data source permet de lire une information existante.

Exemple :

```hcl
data "aws_caller_identity" "current" {}
```

Elle ne crée pas une ressource. Elle récupère une donnée.

## Variable

Une variable permet de rendre le code configurable.

Exemple :

```hcl
variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}
```

Utilisation :

```hcl
name = "app-${var.environment}"
```

## Output

Un output affiche une valeur utile après l'application.

Exemple :

```hcl
output "bucket_name" {
  value = aws_s3_bucket.example.bucket
}
```

## Module

Un module regroupe du code Terraform réutilisable.

Exemple :

```hcl
module "network" {
  source = "./modules/network"

  environment = var.environment
}
```

Les modules permettent :

- de réduire la duplication ;
- de standardiser les ressources ;
- d'encapsuler de la complexité ;
- de partager des bonnes pratiques.

## State

Le state est un élément central de Terraform.

Il contient l'état connu de l'infrastructure.

Exemple de fichier :

```text
terraform.tfstate
```

Terraform compare :

```text
configuration souhaitée
vs
state connu
vs
infrastructure réelle
```

Le state permet de savoir quoi créer, modifier ou supprimer.

## Pourquoi le state est sensible

Le state peut contenir :

- IDs de ressources ;
- paramètres ;
- informations d'infrastructure ;
- parfois des valeurs sensibles.

Il ne faut généralement pas committer `terraform.tfstate` dans Git.

Bonne pratique :

- utiliser un backend distant ;
- chiffrer le state ;
- limiter les accès ;
- verrouiller les modifications.

## Backend distant

Un backend distant stocke le state ailleurs que localement.

Exemples :

- S3 + DynamoDB pour lock ;
- Terraform Cloud ;
- Azure Storage ;
- Google Cloud Storage ;
- GitLab managed state.

Avantages :

- travail en équipe ;
- verrouillage ;
- historique ;
- meilleure sécurité ;
- moins de risque de perte locale.

## Lock

Le lock empêche plusieurs personnes ou pipelines de modifier l'infrastructure en même temps.

Sans lock :

```text
Deux apply en parallèle peuvent corrompre ou désynchroniser le state.
```

Avec lock :

```text
Une seule opération d'écriture à la fois.
```

## Plan et apply

## `terraform init`

Initialise le projet.

```bash
terraform init
```

Cette commande :

- télécharge les providers ;
- configure le backend ;
- prépare le dossier de travail.

## `terraform fmt`

Formate les fichiers.

```bash
terraform fmt -recursive
```

## `terraform validate`

Valide la syntaxe et la cohérence.

```bash
terraform validate
```

## `terraform plan`

Montre les changements prévus.

```bash
terraform plan
```

Le plan est essentiel en revue.

Il permet de voir :

- ce qui sera créé ;
- ce qui sera modifié ;
- ce qui sera détruit ;
- les risques potentiels.

## `terraform apply`

Applique les changements.

```bash
terraform apply
```

En production, `apply` doit être contrôlé.

Bonne pratique :

```text
plan automatique sur pull request
apply contrôlé après merge ou approbation
```

## `terraform destroy`

Supprime les ressources gérées.

```bash
terraform destroy
```

Cette commande est dangereuse et doit être utilisée avec beaucoup de précaution.

## Structure recommandée d'un projet Terraform

Exemple simple :

```text
examples/terraform/
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
├── versions.tf
└── terraform.tfvars.example
```

Exemple avec modules :

```text
infra/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── production/
└── modules/
    ├── network/
    ├── database/
    └── app/
```

## Fichiers Terraform courants

## `versions.tf`

Définit les versions de Terraform et des providers.

Exemple :

```hcl
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}
```

## `main.tf`

Contient les ressources principales.

## `variables.tf`

Contient les variables d'entrée.

## `outputs.tf`

Contient les valeurs de sortie.

## `terraform.tfvars.example`

Fichier d'exemple pour montrer les variables attendues.

Attention :

```text
terraform.tfvars peut contenir des valeurs sensibles.
terraform.tfvars.example ne doit contenir que des valeurs fictives.
```

## Environnements

Les environnements représentent des contextes différents.

Exemples :

- `dev` ;
- `staging` ;
- `production`.

Chaque environnement peut avoir :

- variables différentes ;
- tailles de ressources différentes ;
- secrets différents ;
- règles de sécurité différentes ;
- backend state différent.

## Séparer les environnements

Il existe plusieurs approches.

## Dossiers séparés

```text
environments/
├── dev/
├── staging/
└── production/
```

Avantage :

- séparation claire ;
- moins de risque de confusion ;
- permissions plus faciles à gérer.

## Workspaces Terraform

Terraform propose aussi les workspaces.

Exemple :

```bash
terraform workspace new dev
terraform workspace select dev
```

Avantage :

- un seul code pour plusieurs états.

Attention :

Les workspaces peuvent rendre la compréhension plus difficile pour les débutants.

Pour un projet pédagogique, les dossiers séparés sont souvent plus clairs.

## Variables et secrets

Les variables rendent l'infrastructure configurable.

Mais il ne faut pas confondre variable et secret.

Exemples de variables non sensibles :

- nom d'environnement ;
- région cloud ;
- taille d'instance ;
- nombre de replicas ;
- nom de projet.

Exemples de secrets :

- mot de passe ;
- token API ;
- clé privée ;
- secret de base de données ;
- credentials cloud.

## Bonnes pratiques secrets

Ne jamais committer :

- `.env` réel ;
- `terraform.tfvars` sensible ;
- fichier de credentials ;
- clé privée ;
- state contenant des secrets.

Utiliser :

- GitHub Secrets ;
- Vault ;
- AWS Secrets Manager ;
- Azure Key Vault ;
- Google Secret Manager ;
- SOPS ;
- Sealed Secrets pour Kubernetes.

## Drift

Le drift signifie que l'infrastructure réelle ne correspond plus au code.

Exemple :

```text
Une personne modifie une règle firewall à la main dans la console cloud.
Le code Terraform ne contient pas cette modification.
```

Résultat :

- Git ne reflète plus la réalité ;
- un futur apply peut écraser la modification ;
- le comportement devient difficile à prédire.

## Détecter le drift

Méthodes :

- lancer régulièrement `terraform plan` ;
- comparer l'état réel et l'état attendu ;
- interdire les changements manuels ;
- auditer les logs cloud ;
- utiliser des pipelines de drift detection.

## Gérer le drift

Si un drift est détecté :

```text
1. Comprendre pourquoi il existe
2. Décider si le changement doit être conservé
3. Mettre à jour le code si nécessaire
4. Appliquer proprement
5. Eviter que cela se reproduise
```

Ne pas corriger à l'aveugle.

## CI/CD pour IaC

L'IaC doit être intégrée à la CI/CD.

Pipeline recommandée sur pull request :

```text
1. terraform fmt -check
2. terraform init
3. terraform validate
4. terraform plan
5. scan sécurité IaC
6. commentaire du plan dans la PR
7. revue humaine
```

Pipeline recommandée après merge :

```text
1. validation complète
2. plan
3. approbation
4. apply
5. vérification
```

## Pourquoi ne pas faire apply sur toutes les PR

Une pull request n'est pas encore validée.

Faire un `apply` automatiquement sur une PR peut :

- créer des ressources inutiles ;
- coûter de l'argent ;
- exposer des secrets ;
- provoquer des conflits ;
- modifier un environnement stable.

Bonne pratique :

```text
PR = plan et validation
main = apply contrôlé
production = approbation humaine
```

## Exemple GitHub Actions Terraform

Exemple simplifié :

```yaml
name: Terraform Plan

on:
  pull_request:
    branches:
      - main
    paths:
      - "infra/**"

permissions:
  contents: read
  pull-requests: write

jobs:
  terraform:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Terraform fmt
        run: terraform fmt -check -recursive

      - name: Terraform init
        working-directory: infra
        run: terraform init

      - name: Terraform validate
        working-directory: infra
        run: terraform validate

      - name: Terraform plan
        working-directory: infra
        run: terraform plan -no-color
```

## Sécurité IaC

L'IaC peut créer des ressources dangereuses si elle est mal écrite.

Exemples :

- bucket public ;
- base de données exposée ;
- firewall trop ouvert ;
- IAM avec trop de permissions ;
- secrets dans le code ;
- absence de chiffrement ;
- logs désactivés ;
- backups non configurés.

## Outils de scan IaC

Outils courants :

- Checkov ;
- tfsec ;
- Terrascan ;
- Trivy config ;
- KICS ;
- Conftest ;
- OPA.

Exemple avec Checkov :

```bash
checkov -d infra/
```

Exemple avec Trivy :

```bash
trivy config infra/
```

## Policy as Code

La Policy as Code consiste à décrire des règles de gouvernance sous forme de code.

Exemples de règles :

- interdire les buckets publics ;
- obliger le chiffrement ;
- interdire les ports ouverts à `0.0.0.0/0` ;
- exiger des tags ;
- bloquer les instances trop coûteuses ;
- imposer des labels.

Outils :

- OPA ;
- Conftest ;
- Sentinel ;
- Checkov policies ;
- Kyverno pour Kubernetes.

## Tags et labels

Les tags aident à organiser l'infrastructure.

Exemples :

```text
project     = devops-starter-kit
environment = dev
owner       = platform
managed-by  = terraform
cost-center = education
```

Avantages :

- suivi des coûts ;
- gouvernance ;
- recherche ;
- automatisation ;
- responsabilité claire.

## Coûts

L'IaC peut créer des ressources payantes.

Bonnes pratiques :

- comprendre le coût avant apply ;
- utiliser des environnements temporaires avec expiration ;
- tagger les ressources ;
- détruire les environnements de test inutiles ;
- éviter les ressources surdimensionnées ;
- surveiller les coûts.

Outils possibles :

- Infracost ;
- budgets cloud ;
- alertes de facturation ;
- tags de coût.

## Documentation IaC

L'infrastructure doit être documentée.

Un bon dossier IaC devrait expliquer :

- ce qui est créé ;
- pourquoi cela existe ;
- comment initialiser ;
- comment planifier ;
- comment appliquer ;
- comment détruire ;
- quelles variables sont nécessaires ;
- quels secrets sont utilisés ;
- quels coûts sont attendus ;
- quelles limites existent.

## README d'un module ou exemple IaC

Structure recommandée :

```md
# Nom de l'infrastructure

## Objectif

## Ressources créées

## Prérequis

## Variables

## Utilisation

## Sécurité

## Coûts

## Nettoyage
```

## Bonnes pratiques IaC

## Versionner l'infrastructure

Les fichiers IaC doivent être dans Git.

Cela permet :

- historique ;
- revue ;
- rollback ;
- traçabilité ;
- collaboration.

## Relire les plans

Un `plan` doit être lu avant `apply`.

Points à vérifier :

- ressources supprimées ;
- changements réseau ;
- permissions ;
- coûts ;
- ressources sensibles ;
- impact production.

## Séparer les responsabilités

Eviter un seul fichier énorme.

Préférer :

```text
versions.tf
variables.tf
main.tf
outputs.tf
```

Puis introduire des modules quand la duplication devient réelle.

## Eviter les changements manuels

Une fois qu'une ressource est gérée par IaC, éviter de la modifier à la main.

Sinon :

- drift ;
- confusion ;
- comportement imprévisible.

## Protéger les environnements sensibles

Production doit avoir :

- state protégé ;
- permissions limitées ;
- approbation ;
- logs ;
- monitoring ;
- backups ;
- plan relu.

## Utiliser des versions précises

Exemple :

```hcl
terraform {
  required_version = ">= 1.6.0"
}
```

Pour les providers :

```hcl
version = "~> 5.0"
```

Eviter les versions totalement ouvertes.

## Erreurs fréquentes

## Committer le state

Mauvaise pratique :

```text
terraform.tfstate dans Git
```

Risque :

- fuite d'information ;
- conflit d'équipe ;
- corruption ;
- secrets exposés.

## Utiliser des credentials locaux non documentés

Si l'IaC fonctionne uniquement sur la machine d'une personne, ce n'est pas assez reproductible.

Il faut documenter :

- authentification ;
- variables ;
- permissions ;
- backend ;
- commandes.

## Appliquer sans lire le plan

`terraform apply` sans comprendre le plan peut supprimer ou modifier des ressources critiques.

## Donner trop de permissions

Mauvais :

```text
Administrateur complet pour toute la CI
```

Meilleur :

```text
Permissions minimales nécessaires pour l'environnement ciblé.
```

## Mélanger tous les environnements

Mettre dev, staging et production dans le même state peut être risqué.

Préférer une séparation claire.

## Ne pas gérer les secrets

Les secrets ne doivent pas être stockés en clair dans les fichiers IaC.

## Checklist avant pull request IaC

- [ ] Le code est formaté.
- [ ] Le code est validé.
- [ ] Le plan a été généré.
- [ ] Le plan ne détruit rien d'inattendu.
- [ ] Les secrets ne sont pas présents.
- [ ] Le state n'est pas committé.
- [ ] Les permissions sont minimales.
- [ ] Les ressources sont taggées.
- [ ] Les coûts sont compris.
- [ ] La documentation est à jour.

## Checklist avant apply

- [ ] La pull request est approuvée.
- [ ] La CI est verte.
- [ ] Le plan est relu.
- [ ] L'environnement cible est confirmé.
- [ ] Le backend state est disponible.
- [ ] Le lock fonctionne.
- [ ] Les secrets sont configurés.
- [ ] Le rollback est compris.
- [ ] Les impacts production sont acceptés.

## Commandes utiles Terraform

Initialiser :

```bash
terraform init
```

Formatter :

```bash
terraform fmt -recursive
```

Valider :

```bash
terraform validate
```

Voir le plan :

```bash
terraform plan
```

Appliquer :

```bash
terraform apply
```

Détruire :

```bash
terraform destroy
```

Voir les outputs :

```bash
terraform output
```

Voir les ressources du state :

```bash
terraform state list
```

## Commandes utiles OpenTofu

OpenTofu utilise des commandes très proches.

```bash
tofu init
tofu fmt -recursive
tofu validate
tofu plan
tofu apply
tofu destroy
```

## Commandes utiles Ansible

Vérifier l'inventaire :

```bash
ansible-inventory --list
```

Lancer un playbook :

```bash
ansible-playbook playbook.yml
```

Mode dry run :

```bash
ansible-playbook playbook.yml --check
```

Afficher les différences :

```bash
ansible-playbook playbook.yml --diff
```

## Exemple de workflow IaC complet

```text
Créer une branche
  -> modifier les fichiers IaC
  -> terraform fmt
  -> terraform validate
  -> ouvrir une pull request
  -> CI lance terraform plan
  -> scan sécurité IaC
  -> revue humaine
  -> merge dans main
  -> apply contrôlé
  -> monitoring et drift detection
```

## Résumé pour débutants

Si tu débutes, retiens :

- l'IaC permet de gérer l'infrastructure avec du code ;
- Git devient la source de vérité ;
- Terraform/OpenTofu créent et modifient des ressources ;
- Ansible configure souvent des serveurs ;
- le state Terraform est sensible ;
- il faut lire le plan avant apply ;
- ne jamais committer de secrets ni de state.

## Résumé pour niveau intermédiaire

Si tu as déjà les bases, concentre-toi sur :

- providers ;
- variables ;
- outputs ;
- modules ;
- backend distant ;
- séparation des environnements ;
- scan IaC ;
- plan en pull request ;
- apply contrôlé.

## Résumé pour niveau avancé

Pour aller plus loin, approfondir :

- policy as code ;
- drift detection automatique ;
- modules partagés ;
- registry de modules ;
- state locking avancé ;
- multi-account cloud ;
- GitOps ;
- OPA ;
- SOPS ;
- gestion des coûts ;
- audit et conformité.

## Conclusion

L'Infrastructure as Code est une pratique essentielle pour gérer une infrastructure moderne de manière fiable.

Elle permet de passer d'une infrastructure manuelle, fragile et difficile à reproduire à une infrastructure :

- versionnée ;
- relue ;
- automatisée ;
- sécurisée ;
- documentée ;
- reproductible.

Une bonne démarche IaC ne consiste pas seulement à écrire des fichiers Terraform. Elle implique aussi Git, pull requests, CI/CD, sécurité, gestion des secrets, state distant, revue humaine et monitoring.

## Prochaine étape recommandée

La prochaine étape logique est d'ajouter un exemple pratique Terraform :

```text
examples/terraform/
```

Cet exemple pourra montrer une structure propre avec :

- `versions.tf` ;
- `main.tf` ;
- `variables.tf` ;
- `outputs.tf` ;
- `terraform.tfvars.example` ;
- `README.md`.

Il pourra utiliser le provider `local` pour rester pédagogique, testable et sans coût cloud.
