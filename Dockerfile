FROM nixos/nix:latest AS builder

# Set working directory
WORKDIR /app

# Copy Nix files for development environment
COPY flake.nix flake.lock package.json pnpm-lock.yaml .
RUN nix develop --extra-experimental-features "nix-command flakes" --command pnpm install --prod=false

# Copy project files
COPY . .

# Build the Astro app
RUN nix develop --extra-experimental-features "nix-command flakes" --command pnpm build

RUN nix develop --extra-experimental-features "nix-command flakes" --command pnpm install --prod=true

# Final stage: Production image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy build output and dependencies from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port and start the app
EXPOSE 3000
CMD ["node", "dist/server/entry.mjs"]

