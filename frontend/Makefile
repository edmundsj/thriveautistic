# Name of the Docker image
IMAGE_NAME=nextjs-app

# Docker build command
build:
	@docker build -t $(IMAGE_NAME) .
	@docker run $(IMAGE_NAME) npm run build

# Docker run command to start the Next.js development server
run: build
	@docker run -p 3000:3000 $(IMAGE_NAME)

# Shortcut to start the production server after building
start-prod: build
	@docker run -p 3000:3000 $(IMAGE_NAME) npm start

start:
	@docker run -p 3000:3000 -v $(PWD):/app $(IMAGE_NAME) npm run dev

.PHONY: docker-build docker-run docker-build-next docker-start-prod
