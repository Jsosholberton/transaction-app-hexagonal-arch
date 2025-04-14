# Cloudwatch logs
resource "aws_iam_role" "api_gateway_cloudwatch_role" {
  name = "APIGatewayCloudWatchLogsRole-${var.project_name}-${var.environment}"

  tags = {
    Name        = "${var.project_name}-${var.environment}-api-gateway-cloudwatch-role"
    Environment = var.environment
    Project     = var.project_name
  }

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "api_gateway_cloudwatch_role_policy" {
  role       = aws_iam_role.api_gateway_cloudwatch_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

resource "aws_api_gateway_account" "api_gw_account" {
  cloudwatch_role_arn = aws_iam_role.api_gateway_cloudwatch_role.arn
}

resource "aws_cloudwatch_log_group" "api_logs" {
  name = "/aws/api_gateway/${var.environment}/${var.project_name}-api"
  tags = {
    Name        = "${var.project_name}-${var.environment}-api-gateway-logs"
    Environment = var.environment
    Project     = var.project_name
  }
}

# API Gateway

resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.environment}-${var.project_name}-api"
  binary_media_types = ["multipart/form-data"]
  description = "${var.project_name} API Gateway for ${var.environment}"
  body = templatefile("./template/swagger.yaml", {
    region    = var.region
    LambdaArn = var.LambdaArn
  })

  tags = {
    Name        = "${var.project_name}-${var.environment}-api-gateway"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_api_gateway_deployment" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha256(file("./template/swagger.yaml"))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api_gateway_stage" {
  deployment_id = aws_api_gateway_deployment.api.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = var.environment

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_logs.arn
    format          = "{ \"requestId\":\"$context.requestId\", \"ip\": \"$context.identity.sourceIp\", \"caller\":\"$context.identity.caller\", \"user\":\"$context.identity.user\", \"requestTime\":\"$context.requestTime\", \"httpMethod\":\"$context.httpMethod\", \"resourcePath\":\"$context.resourcePath\", \"status\":\"$context.status\", \"protocol\":\"$context.protocol\", \"responseLength\":\"$context.responseLength\" }"
  }

  xray_tracing_enabled = true

  tags = {
    Name        = "${var.project_name}-${var.environment}-api-gateway-stage"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_api_gateway_method_settings" "method_settings" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_stage.api_gateway_stage.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled = true
    logging_level   = "INFO"
  }
}