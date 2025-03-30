FROM --platform=linux/amd64 node:22

# При деплое ОБЯЗАТЕЛЬНО указывать все ENV через Jenkins
# Ставится в pipeline на Jenkins
ARG BRANCH=main

RUN apt -yqq update \
    && apt -yqq install git curl nginx \
    && apt clean

# NGINX CONFIGURE
RUN rm /etc/nginx/sites-enabled/default
COPY nginx/default /etc/nginx/sites-enabled

# INSTALL YARN
RUN corepack enable
RUN yarn init -2

# CHECKOUT
RUN git clone https://github.com/uniteam31/uniconf-backend.git
WORKDIR /uniconf-backend
RUN git fetch --all
RUN git pull
RUN git checkout ${BRANCH}

# INSTALL DEPS
RUN yarn install
RUN yarn build

WORKDIR /uniconf-backend/dist

EXPOSE 5050

CMD ["node", "main.js"]
