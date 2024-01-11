# Use an official PHP image as the base image
FROM php:7.4-apache

# Install required extensions and packages
RUN apt-get update \
    && apt-get install -y libzip-dev unzip libpng-dev libjpeg-dev libonig-dev libxml2-dev curl
&& docker-php-ext-install pdo_mysql zip exif pcntl bcmath gd

# Enable Apache modules
RUN a2enmod rewrite

# Set the working directory in the container
WORKDIR /var/www/html

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the composer.json and composer.lock files to leverage Docker cache
COPY composer.json composer.lock /var/www/html/

# Install dependencies
RUN composer install --no-interaction --no-scripts --no-suggest

# Copy the application files to the container
COPY . /var/www/html/

# Set the correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80 for web traffic
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
