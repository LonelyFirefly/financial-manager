# Nginx Service

This directory contains the Nginx reverse proxy configuration for the Financial Manager application.

## Purpose

The Nginx service serves as:
- **Reverse Proxy**: Routes API requests to the backend server
- **Static File Server**: Serves the built React application
- **Load Balancer**: Can be extended for multiple backend instances
- **SSL Termination Point**: Ready for HTTPS configuration

## Architecture

```
Browser -> Nginx (Port 80) -> {
  /api/* -> Backend Server (Port 8000)
  /*     -> Static React Files
}
```

## Configuration

- **nginx.conf**: Main configuration file with routing rules
- **Dockerfile**: Multi-stage build that compiles React app and serves via Nginx
- **.dockerignore**: Excludes unnecessary files from Docker context

## Features

- Gzip compression for better performance
- Static asset caching with 1-year expiration
- Security headers (XSS protection, frame options, etc.)
- SPA support with proper fallback routing
- Proxy timeouts and connection settings
- CORS-ready configuration

## Development

To modify the Nginx configuration:
1. Edit `nginx.conf`
2. Rebuild the container: `docker-compose build nginx`
3. Restart: `docker-compose up nginx`

## Production Considerations

- Add SSL/TLS configuration
- Configure proper log rotation
- Set up health checks
- Add rate limiting if needed
- Configure monitoring endpoints 