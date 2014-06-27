.text
	_assertEqual:
		mov 4(%esp), %eax
		mov 8(%esp), %ebx
		cmp %eax, %ebx
		jne _differents

		_egaux:
			mov $0, %eax
			jmp _fin_assertEqual

		_differents:
			mov $1, %eax

		_fin_assertEqual:
		ret


	_lanceSuite:
		mov $0, %edx
		mov $0, %edi
		_execute_test_suivant:	
			mov 4(%esp), %eax
			call *(%eax, %edi, 4)
			or %eax, %edx
			add $1, %edi
			cmp 8(%esp), %edi
			jne _execute_test_suivant

		ret

