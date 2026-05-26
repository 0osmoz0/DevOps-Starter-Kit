IMAGE_NAME ?= devops-starter-kit/docker-example
IMAGE_TAG ?= local
COMPOSE_FILE ?= docker-compose.yml

.PHONY: build up down logs ps check health inspect clean

build:
	docker build \
		--build-arg BUILD_VERSION=$(IMAGE_TAG) \
		--build-arg VCS_REF=$$(git rev-parse --short HEAD 2>/dev/null || echo local) \
		--build-arg BUILD_DATE=$$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
		-t $(IMAGE_NAME):$(IMAGE_TAG) .

up:
	docker compose -f $(COMPOSE_FILE) up --build

down:
	docker compose -f $(COMPOSE_FILE) down

logs:
	docker compose -f $(COMPOSE_FILE) logs -f app

ps:
	docker compose -f $(COMPOSE_FILE) ps

check:
	npm run check
	docker compose -f $(COMPOSE_FILE) config

health:
	curl --fail http://localhost:3000/health

inspect:
	docker image inspect $(IMAGE_NAME):$(IMAGE_TAG)

clean:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans
