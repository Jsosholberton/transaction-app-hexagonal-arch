# Define AWS Providers
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  required_version = ">= 0.13"
}

provider "aws" {
  region = var.region
  default_tags {
    tags = {
      "Terraform"   = "true"
      "Environment" = var.environment[terraform.workspace]
      "Project"     = local.envs["PROJECT_NAME"]
    }
  }
}
