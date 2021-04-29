FROM mysql/mysql-server:latest

ENV MYSQL_ROOT_PASSWORD="root"
ENV MYSQL_DATABASE="Portfolio2Webshop"
ENV MYSQL_ROOT_HOST="%"

ADD init.sql /docker-entrypoint-initdb.d
