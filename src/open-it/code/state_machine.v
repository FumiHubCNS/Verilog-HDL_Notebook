module state_machine (
    clk,
    SYS_RST,
    Start,
    Stop,
    State
);

// ----- input / output -----
    input       clk;
    input       SYS_RST;
    input       Start;
    input       Stop;
    output [1:0]   State;

    reg   [1:0]   State;

//------------------------------------------------------------------------------
// Control signal
//------------------------------------------------------------------------------
    always@ (posedge clk) begin
        if(SYS_RST)begin
            State[1:0] <= 2'b01;
        end else begin
            case(State[1:0])
                2'b01:begin  // Clear
                    if(Start)begin
                        State[1:0] <= 2'b10;
                    end else begin
                        State[1:0] <= 2'b01;
                    end
                end

                2'b10:begin // Count
                    if(!Start & !Stop)begin
                        State[1:0] <= 2'b01;
                    end else if(Stop)begin
                        State[1:0] <= 2'b00;
                    end else begin
                        State[1:0] <= 2'b10;
                    end
                end

                2'b00:begin // Hold
                    if(!Start & !Stop)begin
                        State[1:0] <= 2'b01;
                    end else begin
                        State[1:0] <= 2'b00;
                    end
                end
                default:begin
                    State[1:0] <= 2'b01;
                end
            endcase
        end
    end

endmodule