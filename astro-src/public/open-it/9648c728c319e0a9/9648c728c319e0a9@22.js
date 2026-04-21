function _1(md){return(
md`# Counter_v2.v

[3.3 順序回路](https://openit.kek.jp/training/2012/FPGA-Training/docs/web_intro_verilog-hdl/3-3.html)のカウンタの別パターン実装を行ってみる。

ソースコードは以下のようになる。

\`\`\`verilog
module counter_v2 (
    clk,
    RST,
    CE,
    Q,
    carry
);

// ----- input / output -----
    input        clk;
    input        RST;
    input        CE;
    output [6:0] Q;
    output       carry;

    reg [6:0] Q;
    reg       carry;


//------------------------------------------------------------------------------
// State control
//------------------------------------------------------------------------------
    always@ (posedge clk) begin
        if(RST)begin
            {carry,Q[6:0]}  <= 8'd0;
        end else begin
            if(CE)begin
                {carry,Q[6:0]}  <= {carry,Q[6:0]} + 8'd1;
            end
        end
    end

endmodule
\`\`\`

- \`RST\`はリセット信号であり、1になるとカウンタが0になる。
- \`CE\`が押されている間のみ\`clk\`が1になった回数を数える`
)}

async function _circuitJson(FileAttachment){return(
await FileAttachment("counter_v2.digitaljs.json").json()
)}

function _viewer(circuitJson)
{
  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "8px";
  controls.style.alignItems = "center";
  controls.style.marginBottom = "8px";

  const zoomOut = document.createElement("button");
  zoomOut.textContent = "−";

  const zoomIn = document.createElement("button");
  zoomIn.textContent = "+";

  const fit = document.createElement("button");
  fit.textContent = "Fit";

  const label = document.createElement("span");
  label.textContent = "100%";

  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "820px";
  iframe.style.border = "0";

  controls.append(zoomOut, zoomIn, fit, label);
  wrapper.append(controls, iframe);

  const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background: white;
      overflow: hidden;
    }
    body {
      padding: 16px;
      box-sizing: border-box;
    }
    #status {
      color: #666;
      margin-bottom: 8px;
    }
    #viewport {
      width: 100%;
      height: 740px;
      border: 1px solid #ccc;
      overflow: auto;
      position: relative;
      background: white;
    }
    #zoom-root {
      transform-origin: top left;
      width: max-content;
    }
    #paper {
      width: 1400px;
      height: 700px;
      box-sizing: border-box;
    }
    #error {
      color: red;
      white-space: pre-wrap;
      margin-top: 12px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div id="status">loading...</div>
  <div id="viewport">
    <div id="zoom-root">
      <div id="paper"></div>
    </div>
  </div>
  <div id="error"></div>

  <script src="https://tilk.github.io/digitaljs/main.js"></script>
  <script>
    let scale = 1;

    function setScale(next) {
      scale = next;
      const root = document.getElementById("zoom-root");
      root.style.transform = "scale(" + scale + ")";
      window.parent.postMessage({type: "digitaljs-zoom", scale}, "*");
    }

    function fitToWidth() {
      const viewport = document.getElementById("viewport");
      const paper = document.getElementById("paper");
      const available = viewport.clientWidth - 8;
      const natural = paper.scrollWidth || 1400;
      const next = Math.min(1, available / natural);
      setScale(next);
    }

    window.addEventListener("message", (event) => {
      const msg = event.data;
      if (!msg || msg.type !== "digitaljs-control") return;
      if (msg.action === "zoomIn") setScale(scale * 1.2);
      if (msg.action === "zoomOut") setScale(scale / 1.2);
      if (msg.action === "fit") fitToWidth();
    });

    try {
      document.getElementById("status").textContent = "initializing...";
      const circuitJson = ${JSON.stringify(circuitJson)};
      const circuit = new digitaljs.Circuit(circuitJson);
      circuit.displayOn(document.getElementById("paper"));
      circuit.start();

      setTimeout(() => {
        fitToWidth();
        document.getElementById("status").textContent = "ready";
      }, 50);
    } catch (e) {
      console.error(e);
      document.getElementById("status").textContent = "failed";
      document.getElementById("error").textContent =
        "DigitalJS 初期化エラー:\\n" + (e && e.stack ? e.stack : String(e));
    }
  </script>
</body>
</html>`;

  iframe.srcdoc = html;

  let currentScale = 1;
  function updateLabel() {
    label.textContent = Math.round(currentScale * 100) + "%";
  }

  window.addEventListener("message", (event) => {
    const msg = event.data;
    if (!msg || msg.type !== "digitaljs-zoom") return;
    currentScale = msg.scale;
    updateLabel();
  });

  zoomIn.onclick = () => {
    iframe.contentWindow.postMessage({type: "digitaljs-control", action: "zoomIn"}, "*");
  };

  zoomOut.onclick = () => {
    iframe.contentWindow.postMessage({type: "digitaljs-control", action: "zoomOut"}, "*");
  };

  fit.onclick = () => {
    iframe.contentWindow.postMessage({type: "digitaljs-control", action: "fit"}, "*");
  };

  return wrapper;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["counter_v2.digitaljs.json", {url: new URL("./files/979acece27db1c86ed3b76e6fbe88faaacfa042cb0703d8be0769e9797c38f385f6596eb8053eb418dc5648db53f0b7ec8413b9967aadd36c5ec970b1b04a28c.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("circuitJson")).define("circuitJson", ["FileAttachment"], _circuitJson);
  main.variable(observer("viewer")).define("viewer", ["circuitJson"], _viewer);
  return main;
}
