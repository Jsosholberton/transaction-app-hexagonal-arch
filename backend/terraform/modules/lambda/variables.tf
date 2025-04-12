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

}