# Makefile for managing Terraform backend

# Basic commands for Terraform

# Import the environment variables from the .env file
include ./terraform/.env

init:
	@echo terraform init
	cd terraform && terraform init

plan:
	@echo terraform plan
	cd terraform && terraform plan

apply:
	@echo "Starting Terraform apply process..."
	cd terraform && terraform apply && \
	terraform output > ../src/.env.local

destroy:
	@echo terraform destroy
	cd terraform && terraform destroy

validate:
	@echo terraform validate
	cd terraform && terraform validate

# Node package commands
pkg:
	@echo "Making package"
	rm -rf dist && npx tsc && \
	cp -r node_modules dist && \
	cd dist && zip -r $(PROJECT_NAME)-lambda.zip .

# Migrations
migrations:
	@echo "Starting Docker containers"
	docker-compose up -d
	@trap 'docker-compose down -v; exit 1' ERR; \
	echo "Running initial migrations"; \
	npm run run-migrations; \
	echo "Generating new migration"; \
	npm run gen-migration; \
	echo "Running new migrations"; \
	npm run run-migrations; \
	docker-compose down -v

