FROM node:14.17.0-alpine3.12

RUN addgroup app && adduser -S -G app app
USER app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /app

# Expose ports for Expo server and debugger
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

# # install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest

# Install Expo CLI
RUN npm install -g yarn
RUN npm install -g expo-cli --force

# Copy package.json and yarn.lock files and install dependencies
COPY package*.json yarn.lock app.json ./
RUN yarn install --frozen-lockfile --non-interactive --cache-folder ./ycache

# Copy the rest of the project files
COPY . app

# Start the app with the Expo CLI
CMD ["yarn", "web", "--no-dev", "--minify"] 

# "host", "0.0.0.0"



