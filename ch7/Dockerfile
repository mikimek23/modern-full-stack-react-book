#we use 2 stage 1. build project using vite 2 final image
FROM node:20-alpine AS build

#seting environment variables
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1

# working directory
WORKDIR /build
# COPY
COPY package.json .
COPY package-lock.json .

#install depa
RUN npm install

COPY . .
# we execute npm run build to create a static build of our vite app
RUN npm run build

FROM nginx AS final

# working dir which is the folder that nginx serves static files form
WORKDIR /usr/share/nginx/html

#copy everthing from the /build/dist folder( which is vite puts the built static files)
COPY --from=build /build/dist .
