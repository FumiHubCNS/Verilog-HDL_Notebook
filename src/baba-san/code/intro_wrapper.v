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