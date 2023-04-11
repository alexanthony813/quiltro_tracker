FROM node:14.17.0-alpine3.12

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
RUN mkdir data

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
# RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN npm install -g yarn --force
RUN npm install -g expo-cli --force
# Expose ports for Expo server and debugger
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002


RUN yarn install
COPY . .

# see below, yarn installing the optimized way not possible due to duplicate package.json's
# Logs for your project will appear below. Press Ctrl+C to exit.
# metro-file-map: Haste module naming collision: amigos
#   The following files share their name; please adjust your hasteImpl:
#     * <rootDir>/app/package.json
#     * <rootDir>/package.json

# Failed to construct transformer:  DuplicateError: Duplicated files or mocks. Please check the console for more info
#     at setModule (/app/node_modules/metro-file-map/src/index.js:510:17)
#     at workerReply (/app/node_modules/metro-file-map/src/index.js:570:9)
#     at async Promise.all (index 47492)
#     at async /app/node_modules/metro-file-map/src/index.js:344:18
#     at async DependencyGraph.ready (/app/node_modules/metro/src/node-haste/DependencyGraph.js:99:5)
#     at async Bundler.ready (/app/node_modules/metro/src/Bundler.js:69:5)
#     at async IncrementalBundler.ready (/app/node_modules/metro/src/IncrementalBundler.js:287:5)
#     at async Server.ready (/app/node_modules/metro/src/Server.js:1206:5) {
#   mockPath1: 'app/package.json',
#   mockPath2: 'package.json'
# }

CMD ["yarn", "web", "--no-dev", "--minify"] 


