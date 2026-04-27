module operator(
    clk,
    state,
    value_1,
    value_2,
    result
);

// ----- input / output -----
    input        clk;
    input  [2:0] state;
    input  [3:0] value_1;
    input  [3:0] value_2;
    output [7:0] result;

    reg    [7:0] result;

    assign a = value_1;
    assign b = value_2;

//------------------------------------------------------------------------------
// State control
//------------------------------------------------------------------------------
    always @(posedge clk) begin
        ///////////////////////////////////// initialize
        if (state == 3'b000) begin
            result <= 8'd0;
        ///////////////////////////////////// sum
        end else if (state == 3'b001) begin
            result <= value_1 + value_2;
        ///////////////////////////////////// sub
        end else if (state == 3'b010) begin
            result <= value_1 - value_2;
        ///////////////////////////////////// div
        end else if (state == 3'b011) begin
            result <= value_1 / value_2;
        ///////////////////////////////////// mul
        end else if (state == 3'b100) begin
            result <= value_1 * value_2;
        ///////////////////////////////////// mod
        end else if (state == 3'b101) begin
            result <= value_1 % value_2;
        ///////////////////////////////////// other
        end else begin
            result <= 8'd0;
        end
        /////////////////////////////////////
    end
    
endmodule