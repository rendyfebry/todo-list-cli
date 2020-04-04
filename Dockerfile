FROM node:10

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .