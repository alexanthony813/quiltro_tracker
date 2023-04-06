FROM node:18.15.0-alpine3.17
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json ./
COPY --chown=app:node yarn*.lock ./
RUN npm install
# COPY --chown=app:node . .
COPY . .

ENV API_URL=http://testing123.com
EXPOSE 3000
CMD ["npm", "start"]