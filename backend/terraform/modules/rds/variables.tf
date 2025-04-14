variable "environment" {
  description = "Environment to deploy resources"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "security_group_rds_id" {
  description = "Security group ID for RDS instance"
  type        = string
}

variable "private_subnets_ids" {
  description = "List of private subnet IDs for RDS instance"
  type = list(string)
}