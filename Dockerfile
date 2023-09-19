FROM node:18.17
WORKDIR /app 
COPY . .
RUN npm install 
CMD node index.js
