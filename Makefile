# Makefile for The Opportunity Engine Docker Environment
# ----------------------------------------------------
# This provides simple commands to manage the multi-container application.
# Run these commands from the root directory of the project.

# Build and start all services in detached mode
up:
	@echo "🚀 Starting all services in the background..."
	docker compose up --build -d

# Stop and remove all services and networks
down:
	@echo "🛑 Stopping all services..."
	docker compose down

# Restart all services
restart: down up

# View the logs for all running services
logs:
	@echo "📜 Tailing logs for all services... (Press Ctrl+C to stop)"
	docker compose logs -f

# View the logs for a specific service (e.g., make logs service=frontend)
logs-service:
	@echo "📜 Tailing logs for ${service}..."
	docker compose logs -f ${service}

# Check the status of running services
status:
	@echo "📊 Displaying status of all services..."
	docker compose ps

# A helpful command to completely clean the Docker system
# WARNING: This will remove all stopped containers, networks, dangling images,
# and build cache. It will also remove all volumes, including your database data.
# Use with caution!
prune: down
	@echo "🧹 Pruning Docker system... This will remove all unused data including volumes."
	docker system prune -af --volumes

.PHONY: up down restart logs logs-service status prune
