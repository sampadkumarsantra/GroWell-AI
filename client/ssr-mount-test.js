import { createServer } from "vite";
import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id=root></div></body></html>", {
    url: "http://localhost:5173/",
    pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;
try { global.navigator = dom.window.navigator; } catch {}
try { global.localStorage = dom.window.localStorage; } catch {}
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.SVGElement = dom.window.SVGElement;
global.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.IS_REACT_ACT_ENVIRONMENT = true;

const BASE = "http://localhost:3000";
const nativeFetch = global.fetch;

function realFetch(input, init) {
    const url = typeof input === "string" ? input : input.url;
    const target = url.startsWith("/") ? BASE + url : url;
    return nativeFetch(target, init);
}

global.fetch = realFetch;

const server = await createServer({
    root: process.cwd(),
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom",
});

try {
    const { default: Market } = await server.ssrLoadModule("/src/pages/Market.jsx");
    const container = document.getElementById("root");
    let root;
    await act(async () => {
        root = createRoot(container);
        root.render(React.createElement(Market));
    });

    for (let i = 0; i < 60; i++) {
        await act(async () => {
            await new Promise((r) => setTimeout(r, 250));
        });
    }

    const html = container.innerHTML;
    console.log("DOM_LENGTH=" + html.length);
    console.log("HAS_ERROR_CARD=" + html.includes("error-card"));
    console.log("HAS_CHART=" + html.includes("chart-card"));
    console.log("HAS_LOADING=" + html.includes("chart-loading"));
    console.log("HAS_NODATA=" + html.includes("No price data"));
    console.log("HAS_H1=" + html.includes("GroWell Market Intelligence"));
    console.log("HAS_COMMODITY_CARD=" + html.includes("commodity-card"));
    console.log("HAS_KPI=" + html.includes("kpi-card"));
    const idx = html.indexOf("chart-container");
    console.log("CHART_SNIPPET=" + html.slice(Math.max(0, idx - 100), idx + 1200));
} catch (e) {
    console.error("MOUNT_FAILED");
    console.error(e);
} finally {
    await server.close();
}
