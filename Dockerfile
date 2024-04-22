# Use an existing image as a base
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

VOLUME /usr/src/app

# Copy the files
COPY app.js .
COPY package.json .

RUN npm install

# Expose the port that the app listens on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]
