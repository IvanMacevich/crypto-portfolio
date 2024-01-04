const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app:any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://open-api.unisat.io",
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Убираем префикс /api
      },
    })
  );
};
