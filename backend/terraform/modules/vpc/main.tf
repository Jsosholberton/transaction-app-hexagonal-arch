resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_subnet.id  # Point to public subnet
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.lambda_vpc.id
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.lambda_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id  # Route to Internet Gateway for public subnet
  }
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.lambda_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.lambda_subnet_a.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.lambda_subnet_b.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.lambda_vpc.id
  cidr_block = "10.0.3.0/24"  # CIDR block for public subnet
  availability_zone = "${var.aws_region}c"  # Choose an appropriate AZ
  map_public_ip_on_launch = true  # Important for public subnet

  tags = {
    Name = "${var.project_name}_${var.environment}_public_subnet"
  }
}

resource "aws_vpc" "lambda_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}_${var.environment}_lambda_vpc"
  }
}

resource "aws_subnet" "lambda_subnet_a" {
  vpc_id     = aws_vpc.lambda_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"  # <- specify AZ

  tags = {
    Name = "${var.project_name}_${var.environment}_lambda_subnet_a"
  }
}

resource "aws_subnet" "lambda_subnet_b" {
  vpc_id     = aws_vpc.lambda_vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"  # <- specify a different AZ

  tags = {
    Name = "${var.project_name}_${var.environment}_lambda_subnet_b"
  }
}

/*Security-Group
Ingress - Port 80 -- limited to instance
          Port 22 -- Open to ssh without limitations
Egress  - Open to All*/

resource "aws_security_group" "primary_default" {
  name_prefix = "${var.project_name}-${var.environment}-default-"
  description = "Default security group for all instances in ${aws_vpc.lambda_vpc.id}"
  vpc_id      = aws_vpc.lambda_vpc.id
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "tcp"
    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "postgres_sg" {
  name_prefix = "${var.project_name}-${var.environment}-db-"
  vpc_id      = aws_vpc.lambda_vpc.id

  ingress {
    from_port = 5432
    to_port   = 5432
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}