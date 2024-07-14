FROM rockylinux:latest

RUN dnf update -y && \
	dnf install curl wget git npm && \
	npm install -g n@latest && \
	n lts && \ 
	hash -r && \
	git clone https://github.com/henry-igeneratedigital/payway-backend

WORKDIR [/payway-backend/]
RUN npm install && \
	npm run build

CMD ['node', 'dist/index.js']