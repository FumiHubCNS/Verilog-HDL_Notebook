function _1(md){return(
md`# Baba-san's lecture example 1`
)}

function _2(md){return(
md`馬場さんからもらったFGPA練習キットと\`VHDL\`コードの再現してみる。

\`VHDL\`と\`Verilog-HDL\`は別の言語であり、VHDLの方が型などが厳密らしい。


## ソースコード

もらったコードが以下の通りです。

### VHDL

\`\`\`vhdl
--Copyright 1986-2022 Xilinx, Inc. All Rights Reserved.
--Copyright 2022-2024 Advanced Micro Devices, Inc. All Rights Reserved.
----------------------------------------------------------------------------------
--Tool Version: Vivado v.2024.1 (win64) Build 5076996 Wed May 22 18:37:14 MDT 2024
--Date        : Thu Oct  3 10:58:58 2024
--Host        : bebi running 64-bit major release  (build 9200)
--Command     : generate_target intro_wrapper.bd
--Design      : intro_wrapper
--Purpose     : IP block netlist
----------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
library UNISIM;
use UNISIM.VCOMPONENTS.ALL;
entity intro_wrapper is
  port (
    btn : in STD_LOGIC_VECTOR ( 1 downto 0 );
    clk : in STD_LOGIC;
    led : out STD_LOGIC_VECTOR ( 3 downto 0 );
    led0_b : out STD_LOGIC_VECTOR ( 0 to 0 );
    led0_g : out STD_LOGIC_VECTOR ( 0 to 0 );
    led0_r : out STD_LOGIC_VECTOR ( 0 to 0 )
  );
end intro_wrapper;

architecture STRUCTURE of intro_wrapper is
  component intro is
  port (
    clk : in STD_LOGIC;
    btn : in STD_LOGIC_VECTOR ( 1 downto 0 );
    led0_b : out STD_LOGIC_VECTOR ( 0 to 0 );
    led0_g : out STD_LOGIC_VECTOR ( 0 to 0 );
    led0_r : out STD_LOGIC_VECTOR ( 0 to 0 );
    led : out STD_LOGIC_VECTOR ( 3 downto 0 )
  );
  end component intro;
begin
intro_i: component intro
     port map (
      btn(1 downto 0) => btn(1 downto 0),
      clk => clk,
      led(3 downto 0) => led(3 downto 0),
      led0_b(0) => led0_b(0),
      led0_g(0) => led0_g(0),
      led0_r(0) => led0_r(0)
    );
end STRUCTURE;
\`\`\`

### Verilog-HDL

上記のコードを\`Verilog-HDL\`で再現すると以下のようになります。

\`\`\`verilog
module intro_wrapper (
    input  [1:0] btn,
    input        clk,
    output [3:0] led,
    output       led0_b,
    output       led0_g,
    output       led0_r
);

    introtest u_introtest (
        .clk(clk),
        .btn(btn),
        .led(led)
    );

    assign led0_b = 1'b1;
    assign led0_g = 1'b0;
    assign led0_r = 1'b0;

endmodule

module introtest (
    input        clk,
    input  [1:0] btn,
    output [3:0] led
);

    reg [31:0] cnt = 32'd0;

    assign led[0] = clk;
    assign led[1] = cnt[3];
    assign led[2] = ~btn[0];
    assign led[3] = btn[1];

    always @(posedge clk) begin
        cnt <= cnt + 32'd1;
    end

endmodule
\`\`\``
)}

function _3(md){return(
md`## コード可視化

上記のコードを可視化します。

### データ読み込み
`
)}

async function _circuitJson(FileAttachment){return(
await FileAttachment("intro_wrapper.digitaljs.json").json()
)}

function _5(md){return(
md`### 実装図

Cmod S7用には二つのボタンがあり、上記のコードはボタンを押したときの挙動を示していいます。

- inputは二つのボタン、outputは4つの単色LEDと1つの3色LEDです。
- 2つのボタンは\`btn[1:0]\`の2bitで表されています。
  - ボタンはONで1、OFFで0になります。
  - 2bitなので、ON-ONだと11、OFF-OFFだと00
- 4つの単色LEDは\`led[3:0]\`として4bit表現されています。
- 1つの3色LEDは青に固定しています。

下の実装図は以下のように動かすことができます。

1. btnブロックをクリックし右上に出る進数選択を行います。
2. ブロックないの右下に出てくるボックスを頑張ってクリックして値を入れます。

このようにすると\`clk\`にどうきして\`led\`の値が変化します。
`
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
  iframe.style.height = "400px";
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
      height: 300px;
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
      height: 260px;
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
    ["intro_wrapper.digitaljs.json", {url: new URL("./files/7820ae23f3105b3de485ff6c0e10ebc84b2196c3112490f7097e8a71000b0ba154a719bf41e1f1ec869fa2a83006297d9eb132424582e6776b4301d5880425d2.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("circuitJson")).define("circuitJson", ["FileAttachment"], _circuitJson);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewer")).define("viewer", ["circuitJson"], _viewer);
  return main;
}
