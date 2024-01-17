FROM webdevops/php-apache:8.2-alpine

COPY ./dockerizer/php.ini /opt/docker/etc/php/php.ini

COPY ./dockerizer/vhost.conf /opt/docker/etc/httpd/vhost.conf


ENV WEB_PHP_SOCKET /var/run/php-fpm.sock

COPY . /app

# Set the correct permissions
# RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
