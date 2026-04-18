module dff (
    clk,
    RESET,
    D,
    Q
);

// ----- input / output -----
    input       clk;
    input       RESET;
    input       D;
    output      Q;

    reg         Q;

//------------------------------------------------------------------------------
// Control signal
//------------------------------------------------------------------------------
    always @(posedge clk) begin
        if (RESET) begin
            Q <= 1'b0;
        end else begin
            Q <= D;
        end
    end

endmodule