function _1(md){return(
md`# Counter.v

[3.3 順序回路](https://openit.kek.jp/training/2012/FPGA-Training/docs/web_intro_verilog-hdl/3-3.html)のカウンタの実装を行ってみる。

ソースコードは以下のようになる。

\`\`\`verilog
module counter(
    clk,
    RST,
    CE,
    Q
);

// ----- input / output -----
    input        clk;
    input        RST;
    input        CE;
    output [7:0] Q;

    reg     [7:0]   Q           ;

//------------------------------------------------------------------------------
// State control
//------------------------------------------------------------------------------
    always@ (posedge clk) begin
        if(RST)begin
            Q[7:0]  <= 8'd0;
        end else begin
            if(CE)begin
                Q[7:0]  <= Q[7:0] + 8'd1;
            end
        end
    end

endmodule
\`\`\`

- \`RST\`はリセット信号であり、1になるとカウンタが0になる。
- \`CE\`が押されている間のみ\`clk\`が1になった回数を数える`
)}

async function _circuitJson(FileAttachment){return(
await FileAttachment("counter@1.digitaljs.json").json()
)}

function _viewer(circuitJson)
{
  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.style.border = "0";

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
    }
    body {
      padding: 16px;
      box-sizing: border-box;
    }
    #paper {
      width: 100%;
      height: 700px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    #error {
      color: red;
      white-space: pre-wrap;
      margin-top: 12px;
      font-family: monospace;
    }
    #status {
      color: #666;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div id="status">loading...</div>
  <div id="paper"></div>
  <div id="error"></div>

  <script src="https://tilk.github.io/digitaljs/main.js"></script>
  <script>
    try {
      document.getElementById("status").textContent = "initializing...";
      const circuitJson = ${JSON.stringify(circuitJson)};
      const circuit = new digitaljs.Circuit(circuitJson);
      circuit.displayOn(document.getElementById("paper"));
      circuit.start();
      document.getElementById("status").textContent = "ready";
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
  return iframe;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["counter@1.digitaljs.json", {url: new URL("./files/9c20a2f24bb1980920e3d057d00b858a819fea0759edc844989f03fb5289c2593db2d0ac887597efb0095bd931905ea9de8f3babefa6d14f4a68db158e93ca1d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("circuitJson")).define("circuitJson", ["FileAttachment"], _circuitJson);
  main.variable(observer("viewer")).define("viewer", ["circuitJson"], _viewer);
  return main;
}
