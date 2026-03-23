# Run: docker build -t e2e . && docker run --rm e2e
FROM mcr.microsoft.com/playwright:v1.51.0-jammy
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV CI=true
CMD ["npx", "playwright", "test"]
