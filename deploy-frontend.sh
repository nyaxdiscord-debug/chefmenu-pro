#!/bin/bash

echo "🚀 ChefMenu Pro - Deploy Script"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si está instalado Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo -e "${YELLOW}⚠️  Vercel CLI no encontrado. Instalando...${NC}"
    npm install -g vercel
fi

echo -e "${GREEN}✓ Vercel CLI instalado${NC}"
echo ""

# Deploy en Vercel
echo -e "${GREEN}📦 Deployando frontend en Vercel...${NC}"
cd frontend
vercel --prod --yes
echo ""

# Obtener la URL del frontend
echo -e "${GREEN}✓ Frontend deployado correctamente${NC}"
echo ""
echo "📝 Siguiente paso:"
echo "1. Deploya el backend en Railway: https://railway.app"
echo "2. Actualiza VITE_API_URL en .env.production con la URL del backend"
echo "3. Actualiza vercel.json con la URL del backend en 'destination'"
echo "4. Vuelve a hacer deploy del frontend:"
echo "   vercel --prod"
echo ""
echo "🎉 ¡Frontend listo para producción en Vercel!"