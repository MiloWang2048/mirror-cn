# mirror-cn

[![Build & push to DockerHub](https://github.com/MiloWang2048/mirror-cn/actions/workflows/build-and-push.yml/badge.svg)](https://github.com/MiloWang2048/mirror-cn/actions/workflows/build-and-push.yml)

Mirror CN 提供一系列已更换为国内镜像源的基础 Docker 镜像，例如 `node`、`ubuntu` 或 `python`。这些镜像的包管理器源已经被替换为国内可用的版本，而其他特性与原镜像保持一致。

## Todo

- [X] 每次 build 之前清空镜像缓存
- [ ] 添加对其他cpu架构的支持
- [ ] 添加对其他环境的支持
  - [ ] python
  - [ ] ubuntu
