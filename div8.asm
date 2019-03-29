        db      0       ;商高位
        db      0       ;商低位
        db      0       ;符号
        mov     r0,#9bh ;高位
        mov     r1,#0ddh ;低位
        mov     r2,#51h
        mov     r3,#80h
        mov     a,#00h
        push    a
dividend:
        test    r0,#80h
        jz      divisor
        not     r1
        not     r0
        add     r1,#01h
        adc     r0,#00h
        mov     a,02h
        not     a
        mov     02h,a
divisor:
        test    r2,#80h
        jz      sigend
        not     r2
        add     r2,#01h
        mov     a,02h
        not     a
        mov     02h,a
sigend:
        mov     a,#00h
div_start:
        shl     r1
        RCL     r0
        pop     a
        rcl     a
        push    a
        cmp     a,r2
        jc      div_next
        sub     a,r2
        push    a
        mov     a,00h
        add     a,r3
        mov     00h,a
div_next:
        shr     r3
        test    r3,#0ffh
        jz      div_low_start
        jmp     div_start
div_low_start:
        mov     r3,#80h
div_low_loop:
        shl     r0
        pop     a
        rcl     a
        push    a
        cmp     a,r2
        jc      div_low_next
        sub     a,r2
        push    a
        mov     a,01h
        add     a,r3
        mov     01h,a
div_low_next:
        shr     r3
        test    r3,#0ffh
        jz      div_end
        jmp     div_low_loop
div_end:
        mov     a,02h
        test    a,#80h
        jz      stop
change_sign:
        pop     a
        not     a
        add     a,#01h
        push    a
stop:
        pop     a
        mov     r3,a
        mov     a,00h
        mov     r0,a
        mov     a,01h
        mov     r1,a
        end


MOV R0,#0FFH
MOV R1,#81H
MOV R2,#74H
MOV R3,#00H
TEST R2,#80H
JC ENDP
LOOP:
MOV A,R0
JMP A,R2
JC NEXT  ; R0<R2
