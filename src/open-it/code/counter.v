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