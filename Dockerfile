# Stage 1: Build the NestJS application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy built application code from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Define the command to run the application
CMD ["node", "dist/main"]
