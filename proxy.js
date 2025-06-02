export default {
    async fetch(request, env, ctx) {
      // 1. 你的 B2 Endpoint，必须不带 Bucket 名
      const B2_ENDPOINT = "https://s3.us-west-004.backblazeb2.com";
  
      // 2. Cloudreve 生成的签名 URL 路径会是 /bucket-name/xxx
      // 目标请求就是 B2_ENDPOINT + request.url 的路径和查询
  
      // 3. 构造目标 URL
      const url = new URL(request.url);
      const targetUrl = B2_ENDPOINT + url.pathname + url.search;
  
      // 4. 直接转发请求（不覆盖 Host，保持 Cloudflare 默认行为即可）
      // 可移除 Host 头，使用 fetch 默认行为更安全
      const newHeaders = new Headers(request.headers);
      newHeaders.delete("host");
  
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: "manual"
      });
  
      return response;
    }
  }
  