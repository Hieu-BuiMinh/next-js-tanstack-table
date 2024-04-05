import React from 'react'
import { TextInput } from '@mantine/core'
import { isNotEmpty } from '@mantine/form'

function fieldData() {
	const initForm = () => [
		{
			propName: 'bill_id',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('bill_id')}
				/>
			),
			value: '',
			validation: isNotEmpty('bill_id không được bỏ trống'),
		},
		{
			propName: 'bill_img',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('bill_img')}
				/>
			),
			value: '',
			validation: isNotEmpty('bill_img không được bỏ trống'),
		},
		{
			propName: 'brand_id',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('brand_id')}
				/>
			),
			value: '',
			validation: isNotEmpty('brand_id không được bỏ trống'),
		},
		{
			propName: 'brand_name',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('brand_name')}
				/>
			),
			value: '',
			validation: isNotEmpty('brand_name không được bỏ trống'),
		},
		{
			propName: 'phone_number',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('phone_number')}
				/>
			),
			value: '',
			validation: isNotEmpty('phone_number không được bỏ trống'),
		},
		{
			propName: 'bill_value',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('bill_value')}
				/>
			),
			value: '',
			validation: isNotEmpty('bill_value không được bỏ trống'),
		},
		{
			propName: 'date',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="Ngày"
					className="col-span-6"
					placeholder="Nhập ngày"
					{...form.getInputProps('date')}
				/>
			),
			value: '',
			validation: isNotEmpty('date không được bỏ trống'),
		},
	]
}

export default fieldData
