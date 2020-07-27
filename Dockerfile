FROM node:14-alpine as build

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn cache clean && yarn --update-checksums
COPY . ./
RUN yarn --prod
RUN cp -r node_modules prod_node_modules
RUN yarn && yarn build

# Stage - Production
FROM node:14-alpine
WORKDIR /app
COPY --from=build /usr/src/app/dist /app/dist
COPY --from=build /usr/src/app/prod_node_modules /app/node_modules
EXPOSE 80
CMD ["node", "dist/index.js"]