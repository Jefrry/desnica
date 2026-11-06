FROM docker.io/library/wordpress:6.7.1-php8.3-apache@sha256:545e0358dcb1c114e3aaf78c87627ba3a9f5d69483779dd49e45e4446d6683bd

# Theme edits are read on every request, including when OPcache is enabled.
COPY php-local.ini /usr/local/etc/php/conf.d/resource-center-local.ini
COPY apache-local.conf /etc/apache2/conf-enabled/resource-center-local.conf
