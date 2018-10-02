init:
	docker-compose up --build

up:
	docker-compose up -d

down:
	docker-compose down

ps:
	docker-compose ps

logs:
	docker-compose logs -f

du:
	docker-compose down && docker-compose up -d

dul:
	docker-compose down && docker-compose up -d && docker-compose logs -f

