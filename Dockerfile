# Use a specific Node.js version (v18.13 or later)
FROM node:18.13

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the entire application code
COPY . .

# Install development dependencies and Angular CLI
RUN npm install --only=development
RUN npm install -g @angular/cli

# Build the Angular app
RUN ng build --configuration=production --output-path=dist/crudfrontend

# Use a lightweight web server to serve the built Angular app
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/dist/crudfrontend /usr/share/nginx/html

# Expose the port on which the Angular application will run
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]