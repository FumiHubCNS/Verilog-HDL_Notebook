
module blocking(
    reset,
    btn,
    ref_val,
    reg_val_1,
    reg_val_2
);

// ----- input / output -----
    input        reset;
    input        btn;
    input  [3:0] ref_val;
    output  [3:0] reg_val_1;
    output  [3:0] reg_val_2;

    reg [3:0] reg_val_1;
    reg [3:0] reg_val_2;

//------------------------------------------------------------------------------
// State control
//------------------------------------------------------------------------------
    always @(posedge btn) begin
        if (reset) begin
            reg_val_1 <= 4'b0000;
            reg_val_2 <= 4'b0000;
        end else begin
            reg_val_1 = ref_val;
            reg_val_2 = reg_val_1;
        end
    end
    
endmodule