output "lambda_vpc_id" {
  description = "Lambda VPC ID"
  value       = aws_vpc.lambda_vpc.id
}

output "subnets_ids" {
  description = "List of subnet IDs for Lambda"
  value       = [aws_subnet.lambda_subnet_a.id, aws_subnet.lambda_subnet_b.id]
}

output "subnet_id" {
  description = "Subnet ID for Lambda and RDS"
  value = aws_subnet.lambda_subnet_a.id
}

output "security_group_primary_default_id" {
  value = aws_security_group.primary_default.id  # Assuming you have a security group defined
}

output "security_group_rds_id" {
  value = aws_security_group.postgres_sg.id
}
