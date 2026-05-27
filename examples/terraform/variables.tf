variable "project_name" {
  description = "Logical project name used in generated configuration files."
  type        = string
  default     = "devops-starter-kit"

  validation {
    condition     = length(trimspace(var.project_name)) > 0
    error_message = "project_name must not be empty."
  }
}

variable "environment" {
  description = "Target environment name, for example dev, staging, or production."
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "environment must be one of: dev, staging, production."
  }
}

variable "owner" {
  description = "Team or person responsible for the generated infrastructure metadata."
  type        = string
  default     = "platform"
}

variable "cost_center" {
  description = "Cost center tag used for governance and cost tracking."
  type        = string
  default     = "education"
}

variable "output_root" {
  description = "Directory where Terraform will generate local infrastructure files."
  type        = string
  default     = "generated"
}
