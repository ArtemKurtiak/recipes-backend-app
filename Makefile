run:
	docker run -v recipes:/app/data -d -p 5000:5000 --name recipes_backend recipes_backend_image
run-dev:
	docker run --rm -d -p 5000:5000 -v "D:/Programming/JS/ReactLearn/recipes/backend:/app" -v /app/node_modules -v recipes:/app/data --name recipes_backend recipes_backend_image