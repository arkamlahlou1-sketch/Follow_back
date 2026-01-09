# استخدم صورة PHP مع Apache
FROM php:8.2-apache

# نسخ الملفات
COPY . /var/www/html/

# تشغيل mod_rewrite
RUN a2enmod rewrite

# صلاحيات الملفات
RUN chown -R www-data:www-data /var/www/html/

# تثبيت امتداد MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# مجلد العمل
WORKDIR /var/www/html

# فتح المنفذ
EXPOSE 80

# بدء Apache
CMD ["apache2-foreground"]
