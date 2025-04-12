locals {
  envs = {
    for tuple in regexall("(.*)=(.*)", file(".env")) : tuple[0] => sensitive(tuple[1])
  }
}

variable "environment" {
  description = "Environment to deploy resources"
  type = map(string)
  default = {
    production = "prod"
    default    = "dev"
  }
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "wompi"
}