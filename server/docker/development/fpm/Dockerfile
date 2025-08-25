FROM php:fpm-alpine AS development

USER root

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
    docker-php-ext-install -j$(nproc) gd pdo_mysql zip intl opcache

ARG UID=1000
ARG GID=1000
RUN addgroup -g ${GID} www && \
    adduser -D -u ${UID} -G www www

RUN sed -i "s/user = www-data/user = www/g" /usr/local/etc/php-fpm.d/www.conf && \
    sed -i "s/group = www-data/group = www/g" /usr/local/etc/php-fpm.d/www.conf

RUN chown -R www:www /var/www/html/

EXPOSE 9000
CMD ["php-fpm"]
