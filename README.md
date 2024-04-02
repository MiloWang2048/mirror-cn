# mirror-cn

[![Build & push to DockerHub](https://github.com/MiloWang2048/mirror-cn/actions/workflows/build-and-push.yml/badge.svg)](https://github.com/MiloWang2048/mirror-cn/actions/workflows/build-and-push.yml)

Mirror CN 提供一系列已更换为国内镜像源的基础 Docker 镜像，例如 `node`、`ubuntu` 或 `python`。这些镜像的包管理器源已经被替换为国内可用的版本，而其他特性与原镜像保持一致。

例如，`mirrorcn/node:20-alpine` 与 `node:20-alpine` 几乎一致，除了前者已经将 npm registry 替换为 `https://registry.npmmirror.com`。

要查看对每个镜像执行的操作，请参考 `target` 目录中的配置文件。

## 使用方法

在支持的镜像列表中选择你的想要的镜像，然后使用 `mirrorcn/${镜像名称}:${标签}` 即可引用。

如果没有找到需要的镜像，可以修改 `target` 目录中的 yaml 文件并发起PR到本仓库。

## 支持的镜像列表

<!-- Generated content begin -->
- `node`:
  ```
  18-alpine, 20-alpine
  ```
<!-- Generated content end -->
