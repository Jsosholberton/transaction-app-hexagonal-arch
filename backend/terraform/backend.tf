terraform {
  backend "s3" {
    bucket         = "wompi-terraform"
    key            = "states/wompi/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-state-lock-wompi"
  }
}
