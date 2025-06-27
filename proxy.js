export default {
    async fetch(request, env, ctx) {
      // 配置项
      const B2_ENDPOINT = "https://s3.us-west-004.backblazeb2.com";
      const ALLOWED_DOMAINS = ["your-domain.com", "www.your-domain.com"]; // 允许的路由域名
      const ALLOWED_REFERERS = ["https://your-site.com", "https://www.your-site.com"]; // 允许的 Referer
      const REDIRECT_URL = "https://www.baidu.com"; // 重定向到百度
      
      // 辅助函数：检查路径是否包含文件扩展名
      function hasFileExtension(pathname) {
        const segments = pathname.split('/');
        const lastSegment = segments[segments.length - 1];
        return lastSegment.includes('.') && !lastSegment.endsWith('.');
      }
      
      const url = new URL(request.url);
      const referer = request.headers.get("referer");
      
      // 1. 检查域名限制
      if (!ALLOWED_DOMAINS.includes(url.hostname)) {
        return new Response("Forbidden: Domain not allowed", { status: 403 });
      }
      
      // 2. 检查 Referer 限制
      if (referer !== null && !ALLOWED_REFERERS.some(allowed => referer.startsWith(allowed))) {
        return new Response("Forbidden: Invalid referer", { status: 403 });
      }
      
      // 3. 检查路径，如果没有路径或只有根路径，跳转到百度
      if (url.pathname === "/" || url.pathname === "") {
        return Response.redirect(REDIRECT_URL, 302);
      }
      
      // 4. 检查是否为目录路径访问（以 / 结尾或不包含文件扩展名）
      if (url.pathname.endsWith("/") || !hasFileExtension(url.pathname)) {
        return Response.redirect(REDIRECT_URL, 302);
      }
      
      // 5. 构造目标 URL
      const targetUrl = B2_ENDPOINT + url.pathname + url.search;
      
      // 6. 转发请求
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
  