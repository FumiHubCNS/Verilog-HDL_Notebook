function _1(md){return(
md`# Flip flop with clock enable


[3.2 記憶素子を使った回路](https://openit.kek.jp/training/2012/FPGA-Training/docs/web_intro_verilog-hdl/3-2.html)の同期リセット付きD-type Flip Flop (DFF)回路の実装です。

ソースコードは以下のようになる。

\`\`\`verilog
module dff_clkena (
    clk,
    RESET,
    CE,
    D,
    Q
);

// ----- input / output -----
    input       clk;
    input       RESET;
    input       CE;
    input       D;
    output      Q;

    reg         Q;

//------------------------------------------------------------------------------
// Control signal
//------------------------------------------------------------------------------
    always @(posedge clk)begin
       if(RESET) begin
           Q <= 1'b0;
       end else begin
           if(CE)begin
               Q <= D;
           end
      end
   end

endmodule
\`\`\``
)}

function _2(md){return(
md`
- \`RESET\`はリセット信号であり、1になると\`Q\`を0にする。
- \`CE\`はフリップフロップ回路をアクティベートする。
- \`D\`が押されている間のみ\`Q\`が1になる。`
)}

async function _circuitJson(FileAttachment){return(
await FileAttachment("d_flip_flop_clkena.digitaljs.json").json()
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
  iframe.style.height = "440px";
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
      height: 340px;
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
      height: 200px;
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
    ["d_flip_flop_clkena.digitaljs.json", {url: new URL("./files/5b010b63948cbdbba78caf594963a945b4a1d3906510b788ac7e6f387b4783f944c1ffc0dca1825c8d3e45780a1b1cc0272e0ffd0024174949809539b8b252f2.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("circuitJson")).define("circuitJson", ["FileAttachment"], _circuitJson);
  main.variable(observer("viewer")).define("viewer", ["circuitJson"], _viewer);
  return main;
}
