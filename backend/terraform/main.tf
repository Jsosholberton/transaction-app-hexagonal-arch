module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
  environment  = var.environment[terraform.workspace]
  aws_region   = var.region
}

module "api-gateway" {
  source              = "./modules/api-gateway"
  project_name        = var.project_name
  environment         = var.environment[terraform.workspace]
  region              = var.region
  helloWorldLambdaArn = module.lambda.helloWorldLambdaArn
}

module "lambda" {
  source       = "./modules/lambda"
  project_name = var.project_name
  environment  = var.environment[terraform.workspace]
  subnets_ids = [module.vpc.public_subnet_id]
  vpc_id       = module.vpc.vpc_id
}