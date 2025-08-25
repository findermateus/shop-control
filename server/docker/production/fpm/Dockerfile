FROM php:fpm-alpine AS development

RUN apk update --no-cache && \
    apk add --no-cache \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    icu-dev \
    libzip-dev \
    && rm -rf /var/cache/apk/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install -j$(nproc) gd pdo_mysql zip intl opcache # Install common PHP extensions

RUN chown -R www-data:www-data /var/www/html/

CMD ["php-fpm"]