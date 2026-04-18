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