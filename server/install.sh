docker compose up -d --build
docker exec -it workspace composer install
docker exec -it workspace php artisan migrate
docker exec -it workspace php artisan key:generate