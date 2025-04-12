# Permissions for the lambda function to access VPC resources and write logs to CloudWatch

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role_${var.project_name}-${var.environment}"

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda-exec-role"
    Environment = var.environment
    Project     = var.project_name
  }

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_security_group" "lambda_sg" {
  vpc_id = var.vpc_id
  name   = "lambda_sg_${var.project_name}-${var.environment}"

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Cloudwatch logs permission
resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_logging_policy-${var.project_name}-${var.environment}"
  description = "Allow lambda to write logs on CloudWatch"

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda-logging-policy"
    Environment = var.environment
    Project     = var.project_name
  }

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logging" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

# VPC access policy
resource "aws_iam_policy" "lambda_vpc_access" {
  name        = "lambda_vpc_policy-${var.project_name}-${var.environment}"
  description = "Allow lambda to access VPC resources"

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda-vpc-policy"
    Environment = var.environment
    Project     = var.project_name
  }

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ec2:CreateNetworkInterface",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DeleteNetworkInterface",
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_vpc_access.arn
}

# Lambdas
resource "aws_lambda_function" "hello_world" {
  function_name = "HelloWorld-${var.project_name}-${var.environment}"
  description   = "Lambda function to manage courses for ${var.project_name}"
  role          = aws_iam_role.lambda_exec.arn

  filename = "../dist/${var.project_name}-lambda.zip"
  source_code_hash = filebase64sha256("../dist/${var.project_name}-lambda.zip")
  handler  = "main.handler"
  runtime  = "nodejs18.x"

  logging_config {
    log_format = "JSON"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-lambda"
    Environment = var.environment
    Project     = var.project_name
  }

  vpc_config {
    subnet_ids = var.subnets_ids
    security_group_ids = [aws_security_group.lambda_sg.id]
  }

  timeout = 900
}

# Permissions for the Lambda function to access other AWS services
resource "aws_lambda_permission" "apigw_courses" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.hello_world.function_name
  principal     = "apigateway.amazonaws.com"
}