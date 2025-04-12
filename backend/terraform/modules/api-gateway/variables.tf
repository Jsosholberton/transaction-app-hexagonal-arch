variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment for API Gateway deployment"
  type        = string
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
}

variable "helloWorldLambdaArn" {
  description = "ARN of the Hello World Lambda function"
  type        = string
}