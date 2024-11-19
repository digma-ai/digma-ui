FROM nginx:1.27.2

COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf.template /etc/nginx/conf.d/default.conf.template
RUN rm /usr/share/nginx/html/index.html

CMD ["/bin/sh" , "-c" , "cp /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]