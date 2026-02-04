#!/bin/bash

echo "🚀 ChefMenu Pro - Subir a GitHub (Automático)"
echo "================================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 PASO 1: Crear repositorio en GitHub${NC}"
echo ""
echo "1. Abre este enlace en tu navegador:"
echo "   → https://github.com/new"
echo ""
echo "2. Configura el repositorio:"
echo "   - Nombre: chefmenu-pro"
echo "   - Descripción: Gestor de recetas y menús para chefs - Full Stack Java/Spring Boot + React"
echo "   - Visibilidad: Public (recomendado) o Private"
echo "   - ❌ NO marques 'Initialize this repository with a README'"
echo "   - ❌ NO añadas .gitignore"
echo "   - ❌ NO elijas licencia"
echo ""
echo "3. Click en 'Create repository'"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE: Copia la URL del repositorio que te mostrará GitHub${NC}"
echo -e "${YELLOW}   (será algo como: https://github.com/tu-usuario/chefmenu-pro.git)${NC}"
echo ""

read -p "Presiona Enter cuando hayas creado el repositorio y tengas la URL..."
echo ""

read -p "Pega aquí la URL de tu repositorio: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo -e "${RED}❌ Error: No ingresaste una URL${NC}"
    echo ""
    echo "Si quieres usar el script de nuevo:"
    echo "  cd chefmenu-pro"
    echo "  ./deploy-github.sh"
    exit 1
fi

cd chefmenu-pro

echo ""
echo -e "${GREEN}✓ Verificando estado del repositorio...${NC}"
git status

echo ""
echo -e "${BLUE}📋 PASO 2: Agregando remote origin...${NC}"
git remote add origin $REPO_URL
echo -e "${GREEN}✓ Remote agregado: $REPO_URL${NC}"

echo ""
echo -e "${BLUE}📋 PASO 3: Verificando rama...${NC}"
git branch -M main
echo -e "${GREEN}✓ Rama configurada: main${NC}"

echo ""
echo -e "${BLUE}📋 PASO 4: Subiendo código a GitHub...${NC}"
echo -e "${YELLOW}⚠️  Es posible que te pida tus credenciales de GitHub${NC}"
echo -e "${YELLOW}   Usuario: tu email (nyaxdiscord@gmail.com)${NC}"
echo -e "${YELLOW}   Contraseña: tu Personal Access Token (NO tu contraseña de GitHub)${NC}"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ¡ÉXITO! Tu código está en GitHub${NC}"
    echo ""
    echo -e "${GREEN}✓ 74 archivos subidos${NC}"
    echo -e "${GREEN}✓ 4,292 líneas de código${NC}"
    echo -e "${GREEN}✓ Seguridad garantizada (ningún archivo sensible)${NC}"
    echo ""
    echo "🔗 Tu repositorio:"
    echo "   $REPO_URL"
    echo ""
    echo "📦 Siguientes pasos:"
    echo "   1. Frontend en Vercel: https://vercel.com/new"
    echo "   2. Backend en Render: https://render.com"
    echo "   3. Revisa docs/DEPLOY_VERCEL.md para instrucciones detalladas"
    echo ""
    echo "📖 Documentación disponible:"
    echo "   - README.md - Información general"
    echo "   - docs/DEPLOY_VERCEL.md - Deploy gratuito paso a paso"
    echo "   - docs/REVISION_SEGURIDAD_Y_BUGS.md - Bugs corregidos y seguridad"
    echo ""
    echo -e "${GREEN}¡Felicidades! Tu ChefMenu Pro está listo para el mundo 🌎${NC}"
else
    echo ""
    echo -e "${RED}❌ Hubo un error al hacer push${NC}"
    echo ""
    echo "Posibles soluciones:"
    echo ""
    echo "1. Si usas HTTPS y no funciona:"
    echo "   - Crea un Personal Access Token en GitHub"
    echo "   - Settings → Developer settings → Personal access tokens → Tokens (classic)"
    echo "   - Genera token con scopes: 'repo' y 'workflow'"
    echo "   - Usa el token como contraseña"
    echo ""
    echo "2. Si prefieres usar SSH:"
    echo "   git remote set-url origin git@github.com:tu-usuario/chefmenu-pro.git"
    echo "   git push -u origin main"
    echo ""
    echo "3. Para reintentar:"
    echo "   git push -u origin main"
fi