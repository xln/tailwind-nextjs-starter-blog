# 使用官方 Node.js LTS 镜像
FROM node:20-alpine AS builder

# ========== 前置不变的步骤（复用缓存）==========
# 设置工作目录
WORKDIR /app

# 安装系统依赖（仅第一次构建/基础镜像更新时执行）
RUN apk add --no-cache python3 make g++

# 启用 Corepack + 固定 Yarn 3.6.1
RUN corepack enable && corepack prepare yarn@3.6.1 --activate

# 清理旧缓存（新增）
RUN yarn cache clean || true

# 检查 Yarn 版本
RUN yarn --version

# ========== 依赖安装层（仅 yarn 配置变更时执行）==========
# 先复制 Yarn 配置文件（缓存关键：这些文件不变则不重装依赖）
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# 安装依赖（仅上面的配置文件变更时，才重新安装）
RUN yarn install

# ========== 项目构建层（代码变更时执行）==========
# 复制项目文件（代码变更才会触发这层及之后的重建）
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
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["yarn", "serve"]