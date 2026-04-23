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
