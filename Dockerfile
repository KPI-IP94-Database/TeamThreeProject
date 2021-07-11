# Install Postgres+Alpine
FROM postgres:alpine

# Set DB password
ENV POSTGRES_PASSWORD postgres

# Set DB name
ENV POSTGRES_DB applicants

# Install Node.JS
RUN apk add --update nodejs npm

# Set current working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies of exact version
RUN npm ci

# Copy project files
COPY ./ ./

# Run server
CMD [ "npm", "start" ]
