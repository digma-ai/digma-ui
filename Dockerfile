FROM openresty/openresty:1.21.4.2-alpine

COPY ./dist/ /app/
