#!/bin/bash

echo "🚀 Portfolio Setup Script"
echo "========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to create env file from example
create_env_file() {
    local dir=$1
    local example_file="$dir/.env.example"
    local env_file="$dir/.env"
    
    if [ -f "$env_file" ]; then
        echo -e "${YELLOW}⚠️  $env_file already exists. Skipping...${NC}"
    else
        if [ -f "$example_file" ]; then
            cp "$example_file" "$env_file"
            echo -e "${GREEN}✅ Created $env_file${NC}"
        else
            echo -e "${YELLOW}⚠️  $example_file not found${NC}"
        fi
    fi
}

# Create environment files
echo "📝 Setting up environment files..."
create_env_file "server"
create_env_file "client"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo ""

echo "Installing server dependencies..."
cd server && npm install
echo ""

echo "Installing client dependencies..."
cd ../client && npm install
cd ..
echo ""

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your MongoDB connection string"
echo "2. Edit server/.env with a secure JWT_SECRET"
echo "3. Run 'npm run dev' in the server directory"
echo "4. Run 'npm run dev' in the client directory"
echo "5. Visit http://localhost:5173"
echo ""
echo "For production deployment, see DEPLOYMENT.md"
