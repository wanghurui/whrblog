# uptime-status-for-krunk

一个基于 UptimeRobot API 的在线状态面板
An uptime status dashboard based on UptimeRobot API

修改自 https://github.com/yb/uptime-status
Modified From  https://github.com/yb/uptime-status

------

### 基于 Cloudflare Workers 搭建 UptimeRobot API 代理，以解决官网 API 跨域问题

Build an UptimeRobot API proxy based on **Cloudflare Workers** to solve the cross-domain issue of official API

```
const handleRequest = async ({ request }) => {
  let url = new URL(request.url);
  let response = await fetch('https://api.uptimerobot.com' + url.pathname, request);
  if (url.pathname==""||url.pathname=="/"){
    response = new Response("你不应该看到这段话", { status: 404 });
  }else if (url.pathname=="/v2/getMonitors"||url.pathname=="/v2/getMonitors/"){
    response = new Response(response.body, response);
  }else{
    response = new Response("你不应该看到这段话", { status: 404 });
  }
  response.headers.set('Access-Control-Allow-Origin', '*'); // 可以在这里输入你的域名
  response.headers.set('Access-Control-Allow-Methods', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Access-Token');
  response.headers.set('Access-Control-Expose-Headers', '*');
  return response;
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});
```

修改 `config.js` 中的 `ApiDomian` 为你的域名；

Modify `ApiDomian` in `config.js` to your domain;
