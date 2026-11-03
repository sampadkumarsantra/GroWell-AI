import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";

const server = await createServer({
    root: process.cwd(),
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom",
});

try {
    const { default: Market } = await server.ssrLoadModule("/src/pages/Market.jsx");
    const html = renderToString(React.createElement(Market));
    console.log("RENDER_OK length=" + html.length);
    console.log(html.slice(0, 1200));
} catch (e) {
    console.error("RENDER_FAILED");
    console.error(e);
} finally {
    await server.close();
}
