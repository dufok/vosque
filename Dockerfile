# Use the official Node.js image as a base
FROM node:18

# Set the working directory
#WORKDIR /usr/src/app
WORKDIR /workspaces/vosque

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# yarn install
# yarn db-push
# yarn web

# Start the application
#CMD ["npm", "start"]