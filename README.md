## Use

在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 创建一个新的 Worker，选择 **"Hello World"** 模板。

粘贴 `proxy.js` 中的代码，修改 `B2_ENDPOINT` 并部署。

```
const B2_ENDPOINT = "https://s3.us-west-004.backblazeb2.com";
//填入你的 B2 Endpoint
```

Workers 地址就是 CDN 加速域名。
`b2-proxy.user.workers.dev`

## 添加路由（可选）

刚才添加的 Worker 设置 >> 域和路由 >> 添加 >> 路由

* 区域：选择一个给路由使用的域名，如 `example.com`
* 路由：如果要通过 `proxy.example.com` 访问，则填写 `proxy.example.com/*`，末尾必须有 **/***

路由添加好之后，对 `example.com` 添加 DNS 记录，有三种方法，选择一种：

1. 类型选择`CNAME`，名称正常写（和添加的路由对应，如 `proxy`），

   目标：填刚才的 Workers 地址， `b2-proxy.user.workers.dev`

2. `CNAME` 到优选域名

3. 类型选择`A`，名称正常写（和添加的路由对应，如 `proxy`）

   IP地址，填优选的 Cloudflare IP

## For Cloudreve V3

添加 Backblaze B2 存储时：

- **选择 S3 Endpoint 地址的格式**：强制路径格式

- **是否要对下载/直链使用 CDN？**：使用

- **CDN 加速域名**：填你的 Worker 绑定域名（如 `b2-proxy.example.com`、`b2-proxy.user.workers.dev`）

- 其余按官方文档正常配置
  
## 参考

- https://docs.cloudreve.org/zh/usage/storage/b2#reverse-proxy
- https://docsv3.cloudreve.org/use/policy/s3#backblaze-b2
- https://anwen-anyi.github.io/index/11-durl.html
