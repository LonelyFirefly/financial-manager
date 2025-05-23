#!/bin/bash

# Nginx Cache Monitor Script for Financial Manager App

echo "🗄️  Nginx Cache Monitor"
echo "======================"
echo ""

# Get container name
CONTAINER_NAME="financial-manager-nginx-1"

echo "📊 Cache Statistics:"
echo "-------------------"

# Check if container is running
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "❌ Nginx container is not running!"
    echo "Run: docker compose up -d"
    exit 1
fi

# Cache directory size
echo "💾 Cache Directory Size:"
docker exec $CONTAINER_NAME du -sh /var/cache/nginx 2>/dev/null || echo "Cache directory not found or empty"

echo ""
echo "🔍 Cache File Count:"
docker exec $CONTAINER_NAME find /var/cache/nginx -type f | wc -l

echo ""
echo "📈 Recent Cache Activity (last 50 requests):"
echo "--------------------------------------------"
docker logs --tail 50 $CONTAINER_NAME | grep -E "(HIT|MISS|BYPASS|EXPIRED)" || echo "No cache activity found in recent logs"

echo ""
echo "🧹 Cache Management Commands:"
echo "-----------------------------"
echo "Clear all cache:    docker exec $CONTAINER_NAME rm -rf /var/cache/nginx/*"
echo "Reload nginx:       docker exec $CONTAINER_NAME nginx -s reload"
echo "View cache config:  docker exec $CONTAINER_NAME cat /etc/nginx/conf.d/default.conf | grep -A5 -B5 cache"

echo ""
echo "🔗 Test Cache Headers:"
echo "----------------------"
echo "Test static file:   curl -I -k https://localhost/favicon.ico"
echo "Test API endpoint:  curl -I -k https://localhost/api/health"
echo "Test HTML file:     curl -I -k https://localhost/"

echo ""
echo "📋 Cache Status Headers to Look For:"
echo "-----------------------------------"
echo "X-Cache-Status: HIT    - Served from cache"
echo "X-Cache-Status: MISS   - Not in cache, fetched from backend"
echo "X-Cache-Status: BYPASS - Cache bypassed (e.g., for POST requests)"
echo "Cache-Control: max-age - Browser cache duration"
echo "ETag: value            - Cache validation tag" 