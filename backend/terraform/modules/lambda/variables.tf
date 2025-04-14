variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment to deploy resources"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the Lambda function will be deployed"
  type        = string
}

variable "subnets_ids" {
  description = "List of subnet IDs where the Lambda function will be deployed"
  type = list(string)
}

variable "rds_instance_secretsmanager_arn" {
  description = "ARN of the RDS instance in Secrets Manager"
  type        = string
}

variable "rds_instance_username" {
  description = "Username for the RDS instance"
  type        = string
}

variable "db_instance_endpoint" {
  description = "Endpoint of the RDS instance"
  type        = string
}

variable "db_instance_port" {
  description = "Port of the RDS instance"
  type        = number
}

variable "db_instance_name" {
  description = "Name of the RDS instance"
  type        = string
}