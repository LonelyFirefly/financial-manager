# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all other source code files
COPY . .

# Build the application
RUN npm run build

# Production stage - copy built files to volume
FROM alpine:latest

# Install bash for shell operations
RUN apk add --no-cache bash rsync

# Create directory structure
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create a script to copy files to the volume and keep container running
RUN echo '#!/bin/bash' > /entrypoint.sh && \
    echo 'echo "Copying built files to volume..."' >> /entrypoint.sh && \
    echo 'rsync -av /app/dist/ /app/dist/' >> /entrypoint.sh && \
    echo 'echo "Files copied successfully."' >> /entrypoint.sh && \
    echo 'echo "Keeping container alive..."' >> /entrypoint.sh && \
    echo 'tail -f /dev/null' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]