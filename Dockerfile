FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV PORT 5173
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# RUN npm run build

# FROM nginx:stable-alpine

# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]