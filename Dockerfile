FROM rockylinux:9

RUN dnf update -y && \
	dnf install wget git npm -y && \
	npm install -g n@latest && \
	n lts && \ 
	hash -r && \
	git clone https://github.com/henry-igeneratedigital/payway-backend

WORKDIR payway-backend
RUN npm install && \
	npm run build

CMD ['node', 'dist/index.js']