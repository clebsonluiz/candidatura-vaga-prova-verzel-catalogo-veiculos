FROM node:lts-alpine

ENV PORT 5555

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

WORKDIR /app/frontend

COPY /frontend/package.json /frontend/package-lock.json /app/frontend/

# COPY /frontend/vite.config.js /app/frontend/

# # Installing dependencies
RUN npm install

# # Copying source files
COPY /frontend /app/frontend

# # Building app
# RUN npm run build
EXPOSE 5555

# # Running the app
# CMD ["npm", "run", "dev"]