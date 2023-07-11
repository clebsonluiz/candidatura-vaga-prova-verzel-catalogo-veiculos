FROM node:alpine

ENV PORT 5555

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

WORKDIR /app/frontend
COPY /frontend/package.json /app/frontend/package.json

# # Installing dependencies
RUN npm install

# # Copying source files
COPY /frontend /app/frontend

# # Building app
# RUN npm run build
EXPOSE 5555

# # Running the app
# CMD ["npm", "run", "dev"]