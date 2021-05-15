FROM node:14
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies of exast version
RUN npm ci

# Copy project files
COPY ./ ./

# Run server
CMD [ "npm", "start" ]

