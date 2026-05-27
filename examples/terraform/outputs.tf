output "environment_path" {
  description = "Absolute path to the generated environment directory."
  value       = local.environment_path
}

output "config_file" {
  description = "Path to the generated JSON configuration file."
  value       = local_file.app_config.filename
}

output "deployment_manifest" {
  description = "Path to the generated Kubernetes-style deployment manifest."
  value       = local_file.deployment_manifest.filename
}

output "tags" {
  description = "Common tags applied to generated resources."
  value       = local.common_tags
}
