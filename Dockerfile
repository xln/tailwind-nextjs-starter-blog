# 使用官方 Node.js LTS 镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apk add --no-cache python3 make g++

# 安装 yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# 复制 Yarn 配置文件（如果是 Yarn v2+）
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# 安装依赖
RUN yarn install --immutable

# 复制项目文件
COPY . .

# 构建 Next.js 应用
RUN yarn build

# --------------------------
# 生产环境镜像
# --------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# 复制构建产物和依赖
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["yarn", "start"]
