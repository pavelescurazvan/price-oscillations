#### server-base ####
FROM node:14-alpine AS server-base
WORKDIR /usr/local/api

# setup package.json and node_modules
COPY package.json package-lock.json ./
RUN npm ci

#### server-build ####
FROM server-base AS server-build
WORKDIR /usr/local/api

# copy necessary build files
COPY src/ src/
COPY tsconfig.json ./

# audit and build
RUN npm audit --production --audit-level=critical
RUN npm run build

# productionise node_modules
RUN npm ci --production

#### final stage ####
FROM node:14-alpine
WORKDIR /opt/api

# create runtime user
RUN addgroup -S root_user && adduser -S -G root_user api
USER api

# copy build artifacts
COPY --from=server-build /usr/local/api/package.json ./
COPY --from=server-build /usr/local/api/node_modules/ node_modules/
COPY --from=server-build /usr/local/api/dist ./

ENV PORT 8080
ENTRYPOINT ["node", "./index.js"]
