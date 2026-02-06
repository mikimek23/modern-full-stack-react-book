# node.js image
FROM node:20-alpine

# working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# copp all files
COPY . .

#start the app
CMD ["npm", "start"]

