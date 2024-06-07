.include "aunit.s"
.data
	MA_SUITE: .long _test_saitDetecterValeursDifferentes
		  .long _test_saitDetecterValeursEgales
	TAILLE_MA_SUITE: .long . - MA_SUITE
.text

	.global main

	_test_saitDetecterValeursDifferentes:
		push $3
		push $2
		call _assertEqual
		add $8, %esp

		cmp $1, %eax
		jne _fail
		_success:
			mov $0, %eax
			jmp _end_test
		_fail:
			mov $1, %eax
		_end_test:
			ret

	_test_saitDetecterValeursEgales:
		push $2
		push $2
		call _assertEqual
		add $8, %esp

		cmp $0, %eax
		jne _fail1
		_success1:
			mov $0, %eax
			jmp _end_test1
		_fail1:
			mov $1, %eax
		_end_test1:
			ret

	main:
		mov TAILLE_MA_SUITE, %eax
		shr $2, %eax

		push %eax
		push $MA_SUITE
		call _lanceSuite
		add $8, %esp

		mov %edx, %ebx
		mov $1, %eax
		int $0x80
