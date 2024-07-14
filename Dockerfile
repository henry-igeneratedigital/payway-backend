FROM rockylinux:9

RUN dnf update -y && \
	dnf install wget git nodejs -y && \
	npm install -g n && \
	n lts && \ 
	hash -r && \
	git clone https://github.com/henry-igeneratedigital/payway-backend

WORKDIR payway-backend/

RUN npm install && \
	npm run build

WORKDIR dist/
CMD ["node", "index.js"]