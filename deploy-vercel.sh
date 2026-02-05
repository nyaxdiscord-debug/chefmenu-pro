#!/bin/bash

set -e

echo "══════════════════════════════════════════════════════════════"
echo "🚀 ChefMenu Pro - DEPLOY FRONTEND EN VERCEL"
echo "══════════════════════════════════════════════════════════════"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

cd /home/usuario/chefmenu-pro/frontend

# Verificar si Vercel CLI está instalado
echo -e "${BLUE}📋 PASO 1: Verificar Vercel CLI${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✓ Vercel CLI ya está instalado${NC}"
    vercel --version
else
    echo "Instalando Vercel CLI..."
    npm install -g vercel
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error: No se pudo instalar Vercel CLI${NC}"
        echo ""
        echo "Solución alternativa:"
        echo "1. Ve a https://vercel.com/new"
        echo "2. Conecta tu repo: https://github.com/nyaxdiscord-debug/chefmenu-pro"
        echo "3. Configura:"
        echo "   - Root Directory: frontend"
        echo "   - Framework Preset: Vite"
        echo "4. Deploy"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Vercel CLI instalado${NC}"
fi

echo ""
echo -e "${BLUE}📋 PASO 2: Autenticación con Vercel${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Siguiente: Vercel te pedirá autenticarte en el navegador"
echo ""

# Hacer login en Vercel
vercel login

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error: Fallo en la autenticación${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Autenticación completada${NC}"

echo ""
echo -e "${BLUE}📋 PASO 3: Deploy en producción${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Hacer deploy en producción
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}🎉 ¡ÉXITO! Tu frontend está en Vercel${NC}"
    echo -e "${GREEN}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${GREEN}✓ Frontend deployado en producción${NC}"
    echo -e "${GREEN}✓ Deploy automático desde GitHub${NC}"
    echo -e "${GREEN}✅ HTTPS activado${NC}"
    echo -e "${GREEN}✅ Dominio personalizado disponible${NC}"
    echo ""
    echo "📦 Siguiente paso: Deploy del backend en Render"
    echo "   Ver docs/DEPLOY_VERCEL.md para instrucciones"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Error al hacer deploy${NC}"
    echo ""
    echo "Solución alternativa: Usa el dashboard de Vercel"
    echo "https://vercel.com/new"
    exit 1
fi