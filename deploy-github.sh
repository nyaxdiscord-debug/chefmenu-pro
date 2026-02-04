#!/bin/bash

echo "🚀 ChefMenu Pro - Subir a GitHub"
echo "==================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 PASO 1: Crear repositorio en GitHub${NC}"
echo "1. Ve a https://github.com/new"
echo "2. Nombre del repositorio: chefmenu-pro"
echo "3. Descripción: Gestor de recetas y menús para chefs - Full Stack Java/Spring Boot + React"
echo "4. Marca 'Public' o 'Private' según prefieras"
echo "5. ❌ NO marcar 'Initialize this repository with a README'"
echo "6. Click en 'Create repository'"
echo ""

read -p "Presiona Enter cuando hayas creado el repositorio en GitHub..."

echo ""
echo -e "${BLUE}📋 PASO 2: Agregar remote origin${NC}"
echo "Copia la URL de tu repositorio (ej: https://github.com/tu-usuario/chefmenu-pro.git)"
echo ""
read -p "Pega la URL de tu repositorio: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo -e "${YELLOW}⚠️  No ingresaste una URL. Por favor, ejecuta:${NC}"
    echo "cd chefmenu-pro"
    echo "git remote add origin https://github.com/tu-usuario/chefmenu-pro.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    exit 1
fi

cd chefmenu-pro

echo ""
echo -e "${GREEN}✓ Agregando remote origin...${NC}"
git remote add origin $REPO_URL

echo ""
echo -e "${GREEN}✓ Cambiando nombre de rama a main...${NC}"
git branch -M main

echo ""
echo -e "${BLUE}📋 PASO 3: Subir código a GitHub${NC}"
echo -e "${YELLOW}⚠️  Es posible que te pida tus credenciales de GitHub${NC}"

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ¡ÉXITO! Tu código está en GitHub${NC}"
    echo ""
    echo "📦 Siguientes pasos:"
    echo "1. Frontend en Vercel: https://vercel.com/new"
    echo "2. Backend en Render: https://render.com"
    echo "3. Revisa docs/DEPLOY_VERCEL.md para instrucciones detalladas"
    echo ""
    echo "📖 Documentación disponible:"
    echo "- README.md - Información general del proyecto"
    echo "- docs/DEPLOY_VERCEL.md - Instrucciones de deploy"
    echo "- docs/REVISION_SEGURIDAD_Y_BUGS.md - Revisión de seguridad"
else
    echo ""
    echo -e "${YELLOW}⚠️  Hubo un error al hacer push. Verifica tus credenciales de GitHub${NC}"
    echo "Intenta:"
    echo "1. Usar SSH en lugar de HTTPS (si tienes SSH configurado)"
    echo "2. Crear un Personal Access Token en GitHub"
fi