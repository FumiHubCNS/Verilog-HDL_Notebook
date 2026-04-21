module shift_reg (
    clk,
    D,
    Q
);

// ----- input / output -----
    input       clk;
    input       D;
    output [3:0] Q;

    reg    [3:0] Q;

//------------------------------------------------------------------------------
// Shift register
//------------------------------------------------------------------------------
    always@ (posedge clk) begin
        Q[3:0]  <= {Q[2:0],D};
    end

endmodule