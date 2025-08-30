FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# For development, we'll run the dev server which watches for changes.
# For production, you would use `npm run build` and `npm run start:prod`.
CMD ["npm", "run", "start:dev"]
