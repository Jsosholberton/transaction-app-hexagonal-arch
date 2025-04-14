// Generate a random password
resource "random_password" "db-user-password" {
  length           = 16
  special          = true
  override_special = "_%"
}

resource "aws_secretsmanager_secret" "rds_instance_password_postgres" {
  name = "${var.project_name}-rds-instance-password-postgres-${var.environment}"

  tags = {
    Name = "${var.project_name}-rds-instance-password-postgres-${var.environment}"
  }
}

resource "aws_secretsmanager_secret_version" "rds_instance_password" {
  secret_id     = aws_secretsmanager_secret.rds_instance_password_postgres.id
  secret_string = random_password.db-user-password.result
}

resource "aws_db_subnet_group" "postgresql_db_subnet_group" {
  name       = "${var.environment}-${var.project_name}-postgresql-db-subnet"
  subnet_ids = var.private_subnets_ids

  tags = {
    Name = "PostgreSQL DB Subnet Group"
  }
}

// Define the RDS Cluster
module "rds" {
  source                      = "terraform-aws-modules/rds/aws"
  version                     = "6.5"
  identifier                  = "${var.environment}-${var.project_name}"
  engine                      = "postgres"
  engine_version              = "16.3"
  instance_class              = "db.t3.micro"
  allocated_storage           = 5
  db_name                     = "${var.environment}${var.project_name}DB"
  username                    = "${var.environment}${var.project_name}DBUser"
  password                    = random_password.db-user-password.result
  manage_master_user_password = false
  port                        = 5432
  skip_final_snapshot         = true
  backup_window               = "07:00-09:00"
  maintenance_window          = "Mon:00:00-Mon:03:00"
  db_subnet_group_name        = aws_db_subnet_group.postgresql_db_subnet_group.name
  vpc_security_group_ids = [var.security_group_rds_id]

  // Associate the custom parameter group
  family               = "postgres16"
  option_group_name    = "default:postgres-16"
  major_engine_version = "16"
}