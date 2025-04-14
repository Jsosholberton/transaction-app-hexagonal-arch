output "db_instance_address" {
  description = "The address of the RDS instance"
  value       = module.rds.db_instance_address
}

output "db_instance_availability_zone" {
  description = "The availability zone of the RDS instance"
  value       = module.rds.db_instance_availability_zone
}

output "db_instance_endpoint" {
  description = "The connection endpoint"
  value       = module.rds.db_instance_endpoint
}

output "end_point" {
  value = module.rds.db_instance_address
}

output "db_instance_identifier" {
  description = "The RDS instance ID"
  value       = module.rds.db_instance_identifier
}

output "db_instance_name" {
  description = "The RDS instance name"
  value       = module.rds.db_instance_name
}

output "rds_instance_username" {
  description = "The RDS instance username"
  value       = module.rds.db_instance_username
}

output "db_instance_port" {
  description = "The RDS instance port"
  value       = module.rds.db_instance_port
}

output "db_subnet_group_arn" {
  description = "The RDS instance subnet group ARN"
  value       = module.rds.db_subnet_group_arn
}

output "db_subnet_group_id" {
  description = "The RDS instance subnet group ID"
  value       = module.rds.db_subnet_group_id
}

output "db_user_password" {
  description = "The RDS instance user password"
  value       = random_password.db-user-password.result
}

output "rds_instance_secretsmanager_arn" {
  description = "The ARN of the RDS instance password secret"
  value = aws_secretsmanager_secret.rds_instance_password_postgres.arn
}