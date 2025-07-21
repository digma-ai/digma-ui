FROM openresty/openresty:1.21.4.2-alpine
# Create a non-root user
RUN addgroup -g 1001 appgroup && \
  adduser -D -u 1000 -G appgroup -s /bin/sh app
# Set correct permissions
COPY ./dist/ /app/
RUN chown -R app:appgroup /app
# Switch to non-root user
USER 1000:1001
# Optional: set workdir
WORKDIR /app