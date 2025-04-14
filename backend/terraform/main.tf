module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
  environment  = var.environment[terraform.workspace]
  aws_region   = var.region
}

module "api-gateway" {
  source       = "./modules/api-gateway"
  project_name = var.project_name
  environment  = var.environment[terraform.workspace]
  region       = var.region
  LambdaArn    = module.lambda.LambdaArn
}

module "rds" {
  source                = "./modules/rds"
  project_name          = var.project_name
  environment           = var.environment[terraform.workspace]
  private_subnets_ids   = module.vpc.subnets_ids
  security_group_rds_id = module.vpc.security_group_rds_id
}

module "lambda" {
  source       = "./modules/lambda"
  project_name = var.project_name
  environment  = var.environment[terraform.workspace]
  subnets_ids  = module.vpc.subnets_ids
  vpc_id = module.vpc.lambda_vpc_id

  # RDS
  rds_instance_secretsmanager_arn = module.rds.rds_instance_secretsmanager_arn
  rds_instance_username           = module.rds.rds_instance_username
  db_instance_endpoint            = module.rds.db_instance_endpoint
  db_instance_port                = module.rds.db_instance_port
  db_instance_name                = module.rds.db_instance_name
}