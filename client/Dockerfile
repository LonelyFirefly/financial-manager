# Build stage
FROM node:20-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all other source code files
COPY . .

# Build the application
RUN pnpm build

# Production stage - copy built files to volume
FROM alpine:latest

# Install bash for shell operations
RUN apk add --no-cache bash

# Create directory structure
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create a simple entrypointx script
RUN echo '#!/bin/bash' > /entrypoint.sh && \
    echo 'echo "Built files are ready in /app/dist"' >> /entrypoint.sh && \
    echo 'echo "Files will be served via shared volume"' >> /entrypoint.sh && \
    echo 'echo "Container staying alive to maintain volume access..."' >> /entrypoint.sh && \
    echo 'tail -f /dev/null' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]