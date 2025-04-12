variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment for deployment"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
}