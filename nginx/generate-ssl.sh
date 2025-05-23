#!/bin/bash

# SSL Certificate Generation Script for Financial Manager App

echo "🔐 SSL Certificate Generator for Financial Manager"
echo "=================================================="

# Check if domain is provided
DOMAIN=${1:-localhost}
echo "📋 Generating certificate for domain: $DOMAIN"

# Create SSL directory if it doesn't exist
mkdir -p ssl

# Generate private key
echo "🔑 Generating private key..."
openssl genrsa -out ssl/server.key 2048

# Generate certificate signing request
echo "📝 Generating certificate signing request..."
openssl req -new -key ssl/server.key -out ssl/server.csr -subj "/C=US/ST=Production/L=Server/O=FinancialManager/OU=IT/CN=$DOMAIN"

# Generate self-signed certificate (valid for 1 year)
echo "📜 Generating self-signed certificate..."
openssl x509 -req -days 365 -in ssl/server.csr -signkey ssl/server.key -out ssl/server.crt

# Set proper permissions
chmod 600 ssl/server.key
chmod 644 ssl/server.crt
chmod 644 ssl/server.csr

echo "✅ SSL certificates generated successfully!"
echo ""
echo "📂 Files created:"
echo "   - ssl/server.key (private key)"
echo "   - ssl/server.crt (certificate)"
echo "   - ssl/server.csr (certificate signing request)"
echo ""
echo "🚀 For production, replace the self-signed certificate with a certificate from a trusted CA like Let's Encrypt"
echo "💡 For Let's Encrypt: https://letsencrypt.org/"
echo ""
echo "🔧 To use these certificates, copy them to your nginx container:"
echo "   docker cp ssl/server.crt nginx_container:/etc/nginx/ssl/"
echo "   docker cp ssl/server.key nginx_container:/etc/nginx/ssl/" 