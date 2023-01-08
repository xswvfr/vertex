FROM alpine:3.13
LABEL maintainer="lswl.in"
LABEL build_from="https://github.com/xswvfr/vertex"

ENV TZ=Asia/Shanghai
RUN \
  apk add --no-cache gcc g++ python3 git cmake make npm libc-dev redis shadow bash xvfb tzdata nodejs chromium libstdc++ harfbuzz nss freetype ttf-freefont font-noto-emoji && \
  rm -rf /var/cache/* && \
  mkdir /var/cache/apk && \
  git clone https://github.com/xswvfr/vertex.git /app/vertex && \
  cd /app/vertex && \
  cp /app/vertex/docker/local.conf /etc/fonts/local.conf && \
  npm set audit false && \
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm i --save && \
  cd /app/vertex/webui && \
  npm set audit false && \
  npm i --save --legacy-peer-deps && \
  npm run build && \
  cd /app/vertex && \
  rm .git webui -rf && \
  mkdir /vertex && \
  ln -s /vertex/data /app/vertex/app/data && \
  ln -s /vertex/db /app/vertex/app/db && \
  ln -s /vertex/logs /app/vertex/logs && \
  ln -s /vertex/torrents /app/vertex/torrents && \
  mv /app/vertex/app/config /app/vertex/app/config_backup && \
  ln -s /vertex/config /app/vertex/app/config && \
  ln -s /app/localtime /etc/localtime && \
  ln -s /usr/bin/chromium-browser /usr/bin/chromium && \
  chmod +x /usr/bin/chromium && \
  apk del gcc g++ python3 git cmake make npm libc-dev && \
  echo 'bind 127.0.0.1' >> /app/redis.conf && \
  echo 'daemonize yes' >> /app/redis.conf && \
  echo -e "\033[42;37m Build Completed :).\033[0m\n"

RUN \
  useradd -d /app/vertex -s /bin/sh vt && \
  chown -R vt /vertex && \
  chmod +x /vertex
EXPOSE 3000
CMD \
  bash /app/vertex/docker/start.sh