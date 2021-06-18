#  Dockerfile for Node Express Backend

FROM node:lts-buster-slim

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

# RUN npm start

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]