FROM webdevops/php-apache:8.2-alpine

COPY ./dockerizer/php.ini /opt/docker/etc/php/php.ini
COPY ./dockerizer/vhost.conf /opt/docker/etc/httpd/vhost.conf
COPY . /app