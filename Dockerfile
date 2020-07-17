# Builder image
FROM node:12.16.0 AS builder

WORKDIR /reactApp/

COPY . .

RUN npm i tyarn -g \
    && tyarn global add umi@^2.0.0 \
    && tyarn install \
    && npm run build


# Final image
FROM nginx:1.16

COPY --from=builder /reactApp/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/cmdb-fg.conf
COPY Shanghai /etc/localtime

EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
