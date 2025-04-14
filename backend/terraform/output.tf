output "rds_instance_secretsmanager_arn" {
  description = "The ARN of the RDS instance password secret"
  value       = module.rds.rds_instance_secretsmanager_arn
}

output "rds_instance_password" {
  value     = module.rds.db_user_password
  sensitive = true
}

output "rds_instance_username" {
  description = "The RDS instance username"
  value       = module.rds.rds_instance_username
}

output "db_instance_endpoint" {
  description = "The RDS instance endpoint"
  value       = module.rds.db_instance_endpoint
}

output "db_instance_port" {
  description = "The RDS instance port"
  value       = module.rds.db_instance_port
}

output "db_instance_name" {
  description = "The RDS instance name"
  value       = module.rds.db_instance_name
}

output "db_instance_address" {
  description = "The RDS instance address"
  value       = module.rds.db_instance_address
}

output "end_point" {
  value = module.rds.db_instance_address
}