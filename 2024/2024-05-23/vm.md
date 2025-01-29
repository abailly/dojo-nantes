# Le plan

* on interprète les opcodes les uns après les autres, en "découvrant" au fur et à mesure ce dont on a besoin

|    | 00     | 01     | 02     | 03     | 04     | 05     | 06     | 07     | 08     | 09     | 0a     | 0b     | 0c     | 0d     | 0e     | 0f     |
| 00 | BRK    | INC    | POP    | NIP    | SWP    | ROT    | DUP    | OVR    | EQU    | NEQ    | GTH    | LTH    | JMP    | JCN    | JSR    | STH    |
| 10 | LDZ    | STZ    | LDR    | STR    | LDA    | STA    | DEI    | DEO    | ADD    | SUB    | MUL    | DIV    | AND    | ORA    | EOR    | SFT    |
| 20 | JCI    | INC2   | POP2   | NIP2   | SWP2   | ROT2   | DUP2   | OVR2   | EQU2   | NEQ2   | GTH2   | LTH2   | JMP2   | JCN2   | JSR2   | STH2   |
| 30 | LDZ2   | STZ2   | LDR2   | STR2   | LDA2   | STA2   | DEI2   | DEO2   | ADD2   | SUB2   | MUL2   | DIV2   | AND2   | ORA2   | EOR2   | SFT2   |
| 40 | JMI    | INCr   | POPr   | NIPr   | SWPr   | ROTr   | DUPr   | OVRr   | EQUr   | NEQr   | GTHr   | LTHr   | JMPr   | JCNr   | JSRr   | STHr   |
| 50 | LDZr   | STZr   | LDRr   | STRr   | LDAr   | STAr   | DEIr   | DEOr   | ADDr   | SUBr   | MULr   | DIVr   | ANDr   | ORAr   | EORr   | SFTr   |
| 60 | JSI    | INC2r  | POP2r  | NIP2r  | SWP2r  | ROT2r  | DUP2r  | OVR2r  | EQU2r  | NEQ2r  | GTH2r  | LTH2r  | JMP2r  | JCN2r  | JSR2r  | STH2r  |
| 70 | LDZ2r  | STZ2r  | LDR2r  | STR2r  | LDA2r  | STA2r  | DEI2r  | DEO2r  | ADD2r  | SUB2r  | MUL2r  | DIV2r  | AND2r  | ORA2r  | EOR2r  | SFT2r  |
| 80 | LIT    | INCk   | POPk   | NIPk   | SWPk   | ROTk   | DUPk   | OVRk   | EQUk   | NEQk   | GTHk   | LTHk   | JMPk   | JCNk   | JSRk   | STHk   |
| 90 | LDZk   | STZk   | LDRk   | STRk   | LDAk   | STAk   | DEIk   | DEOk   | ADDk   | SUBk   | MULk   | DIVk   | ANDk   | ORAk   | EORk   | SFTk   |
| a0 | LIT2   | INC2k  | POP2k  | NIP2k  | SWP2k  | ROT2k  | DUP2k  | OVR2k  | EQU2k  | NEQ2k  | GTH2k  | LTH2k  | JMP2k  | JCN2k  | JSR2k  | STH2k  |
| b0 | LDZ2k  | STZ2k  | LDR2k  | STR2k  | LDA2k  | STA2k  | DEI2k  | DEO2k  | ADD2k  | SUB2k  | MUL2k  | DIV2k  | AND2k  | ORA2k  | EOR2k  | SFT2k  |
| c0 | LITr   | INCkr  | POPkr  | NIPkr  | SWPkr  | ROTkr  | DUPkr  | OVRkr  | EQUkr  | NEQkr  | GTHkr  | LTHkr  | JMPkr  | JCNkr  | JSRkr  | STHkr  |
| d0 | LDZkr  | STZkr  | LDRkr  | STRkr  | LDAkr  | STAkr  | DEIkr  | DEOkr  | ADDkr  | SUBkr  | MULkr  | DIVkr  | ANDkr  | ORAkr  | EORkr  | SFTkr  |
| e0 | LIT2r  | INC2kr | POP2kr | NIP2kr | SWP2kr | ROT2kr | DUP2kr | OVR2kr | EQU2kr | NEQ2kr | GTH2kr | LTH2kr | JMP2kr | JCN2kr | JSR2kr | STH2kr |
| f0 | LDZ2kr | STZ2kr | LDR2kr | STR2kr | LDA2kr | STA2kr | DEI2kr | DEO2kr | ADD2kr | SUB2kr | MUL2kr | DIV2kr | AND2kr | ORA2kr | EOR2kr | SFT2kr |
