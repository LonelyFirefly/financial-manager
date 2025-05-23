# Nginx Service

This directory contains the Nginx reverse proxy configuration for the Financial Manager application with HTTPS support and comprehensive caching.

## Purpose

The Nginx service serves as:
- **HTTPS Redirect**: Automatically redirects all HTTP traffic to HTTPS
- **SSL Termination**: Handles SSL/TLS encryption and decryption
- **Reverse Proxy**: Routes API requests to the backend server
- **Static File Server**: Serves the built React application with optimized caching
- **Caching Layer**: Implements multi-level caching for optimal performance

## Architecture

```
Browser -> Nginx (Port 80) -> HTTPS Redirect (301)
        -> Nginx (Port 443) -> {
  /api/* -> Backend Server (Port 8000) [with proxy caching]
  /*     -> Static React Files [with browser caching]
}
```

## Caching Strategy

### 🚀 **Browser Caching (Client-Side)**

| Content Type | Cache Duration | Headers | Use Case |
|-------------|---------------|---------|----------|
| **Static Assets** (js, css, images, fonts) | 1 year | `immutable, no-transform` | Versioned assets with hash |
| **Assets Directory** | 30 days | `public, no-transform` | Non-versioned assets |
| **HTML Files** | 1 hour | `public, must-revalidate` | Allow quick updates |
| **Service Worker** | No cache | `no-cache, no-store` | Always fresh |
| **Main App** | 1 hour | `public, must-revalidate` | Balance updates/performance |

### 🗄️ **Proxy Caching (Server-Side)**

- **API GET Requests**: 5 minutes cache
- **API 404 Responses**: 1 minute cache
- **Cache Size**: 100MB maximum
- **Cache Location**: `/var/cache/nginx`
- **Cache Levels**: 2-level directory structure

### 🗜️ **Compression**

- **Gzip Compression**: Level 6 (balanced size/CPU)
- **File Types**: HTML, CSS, JS, JSON, XML, SVG, fonts
- **Minimum Size**: 1024 bytes
- **Vary Header**: Automatic encoding detection

## Cache Headers Explained

### Response Headers You'll See:

```http
# Static Assets (1 year cache)
Cache-Control: public, immutable, no-transform
Expires: Sat, 23 May 2026 12:39:40 GMT
ETag: "version-hash"

# API Responses (proxy cache)
X-Cache-Status: HIT|MISS|BYPASS
Cache-Control: max-age=300

# HTML Files (1 hour cache)
Cache-Control: public, must-revalidate
Expires: Fri, 23 May 2025 13:39:02 GMT
```

## SSL Configuration

### Development (Self-Signed Certificates)
- Certificates are automatically generated during Docker build
- Valid for `localhost` and development use
- ⚠️ Browsers will show security warnings for self-signed certificates

### Production Setup
1. Use the provided script: `./generate-ssl.sh yourdomain.com`
2. Or use Let's Encrypt for free trusted certificates
3. Replace the self-signed certificates with trusted ones

## Configuration Files

- **nginx.conf**: Main configuration with caching, SSL, and routing
- **Dockerfile**: Multi-stage build with SSL and cache directory setup
- **generate-ssl.sh**: Script for generating custom SSL certificates
- **cache-monitor.sh**: Monitor cache performance and usage
- **.dockerignore**: Excludes unnecessary files from Docker context

## Security Features

- **HTTP Strict Transport Security (HSTS)**: Forces HTTPS for 1 year
- **Modern SSL/TLS**: Only TLS 1.2 and 1.3 supported
- **Enhanced Security Headers**: XSS protection, frame options, CSP
- **Secure Ciphers**: Only strong encryption ciphers allowed
- **Perfect Forward Secrecy**: Uses ECDHE ciphers

## Port Configuration

- **Port 80 (HTTP)**: Redirects to HTTPS
- **Port 443 (HTTPS)**: Main application traffic

## Cache Management

### Monitoring Cache Performance
```bash
# Run the cache monitor
./nginx/cache-monitor.sh

# Check cache size
docker exec financial-manager-nginx-1 du -sh /var/cache/nginx

# View cache files
docker exec financial-manager-nginx-1 find /var/cache/nginx -type f
```

### Testing Cache Headers
```bash
# Test static asset caching (1 year)
curl -I -k https://localhost/test.css

# Test HTML caching (1 hour)
curl -I -k https://localhost/

# Test API caching (5 minutes)
curl -I -k https://localhost/api/health
```

### Cache Management Commands
```bash
# Clear all cache
docker exec financial-manager-nginx-1 rm -rf /var/cache/nginx/*

# Reload nginx configuration
docker exec financial-manager-nginx-1 nginx -s reload

# View cache configuration
docker exec financial-manager-nginx-1 cat /etc/nginx/conf.d/default.conf
```

## Usage

### Development
```bash
# Build and start (generates self-signed certificates)
docker compose up -d

# Monitor cache performance
./nginx/cache-monitor.sh

# Access via HTTPS (accept security warning for self-signed cert)
https://localhost

# HTTP traffic automatically redirects to HTTPS
http://localhost -> https://localhost
```

### Performance Benefits

🚀 **Static Assets**: 1-year browser cache reduces server load by 99%  
⚡ **API Responses**: 5-minute proxy cache reduces backend calls  
🗜️ **Gzip Compression**: 60-80% smaller file sizes  
🔒 **HTTP/2**: Multiplexed connections for faster loading  
📱 **ETags**: Efficient cache validation without full downloads  

## Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Certificates | Self-signed | Trusted CA (Let's Encrypt) |
| Domain | localhost | Your domain |
| Cache Monitoring | Enabled | Enabled + Metrics |
| Security Warnings | Yes | No |
| Browser Trust | Manual accept | Automatic |
| HSTS | 1 year | 1 year |
| SSL Protocols | TLS 1.2/1.3 | TLS 1.2/1.3 |

## Production Considerations

1. **Trusted SSL Certificates**:
   ```bash
   # Generate custom certificates
   ./generate-ssl.sh yourdomain.com
   
   # Or use Let's Encrypt
   certbot certonly --standalone -d yourdomain.com
   ```

2. **Cache Optimization**:
   - Increase cache size for high-traffic sites
   - Add cache purging mechanisms
   - Implement cache warming strategies

3. **Monitoring**:
   - Set up cache hit ratio monitoring
   - Configure log analysis for performance
   - Add cache size alerts

4. **CDN Integration**:
   - Consider CloudFlare or AWS CloudFront
   - Implement edge caching for global users

## Troubleshooting

### Cache Issues
- **Cache not working**: Check `X-Cache-Status` header
- **Stale content**: Clear cache or check cache durations
- **High memory usage**: Reduce cache size or add cleanup scripts

### Certificate Issues
- **"Not Secure" warning**: Normal for self-signed certificates in development
- **Certificate expired**: Rebuild the nginx container to generate new certificates
- **Wrong domain**: Update the certificate generation with correct domain name

### Performance Issues
- **Slow loading**: Check gzip compression and cache hit rates
- **High server load**: Verify static assets are being cached properly

The caching system provides enterprise-grade performance optimization with minimal configuration! 🚀 