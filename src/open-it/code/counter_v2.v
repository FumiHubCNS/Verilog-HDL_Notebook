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