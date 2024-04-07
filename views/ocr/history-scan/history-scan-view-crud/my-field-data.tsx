import React, { useState } from 'react'
import { Avatar, FileInput, TextInput } from '@mantine/core'
import { isNotEmpty } from '@mantine/form'
import { ConvertToBase64 } from '@/utils'
import ImgHoverPreview from '@/components/admin/img-hover-preview'

const FieldData = ({ type, item }: { type: string; item: any }) => {
	const [imgFile, setImgFile] = useState<string>()
	return [
		{
			propName: 'id',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="bill_id"
					className="col-span-6"
					placeholder="bill_id"
					{...form.getInputProps('id')}
				/>
			),
			value: item?.id,
			validation: isNotEmpty('bill_id không được bỏ trống'),
		},
		{
			propName: 'bill_img',
			control: (form: any) => (
				<div className="flex gap-2 items-end">
					<FileInput
						withAsterisk
						label="bill_img"
						placeholder={item?.bill_img}
						accept="image/png,image/jpeg,image/jpg"
						className="col-span-4 flex-1 max-w-[80%]"
						classNames={{ wrapper: 'truncate text-ellipsis' }}
						onChange={(file) => {
							if (file) {
								setImgFile(URL.createObjectURL(file))
								ConvertToBase64(file).then((base64) => {
									form.setValues({
										bill_img: base64,
									})
									setImgFile(base64)
								})
							}
						}}
						/>
					<ImgHoverPreview
						size="md"
						src={imgFile ?? item?.bill_img}
						alt=""
						className="border border-dashed rounded-md"
						{...form.getInputProps('bill_img')}
					/>
				</div>
			),
			value: item?.bill_img,
			validation: isNotEmpty('bill_img không được bỏ trống'),
		},
		{
			propName: 'brand_id',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="brand_id"
					className="col-span-6"
					placeholder="brand_id"
					{...form.getInputProps('brand_id')}
				/>
			),
			value: item?.brand_id,
			validation: isNotEmpty('brand_id không được bỏ trống'),
		},
		{
			propName: 'brand_name',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="brand_name"
					className="col-span-6"
					placeholder="brand_name"
					{...form.getInputProps('brand_name')}
				/>
			),
			value: item?.brand_name,
			validation: isNotEmpty('brand_name không được bỏ trống'),
		},
		{
			propName: 'phone_number',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="phone_number"
					className="col-span-6"
					placeholder="phone_number"
					{...form.getInputProps('phone_number')}
				/>
			),
			value: item?.phone_number,
			validation: isNotEmpty('phone_number không được bỏ trống'),
		},
		{
			propName: 'bill_value',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="bill_value"
					className="col-span-6"
					placeholder="bill_value"
					{...form.getInputProps('bill_value')}
				/>
			),
			value: item?.bill_value,
			validation: isNotEmpty('bill_value không được bỏ trống'),
		},
		{
			propName: 'date',
			control: (form: any) => (
				<TextInput
					withAsterisk
					label="date"
					className="col-span-6"
					placeholder="date"
					{...form.getInputProps('date')}
				/>
			),
			value: item?.date,
			validation: isNotEmpty('date không được bỏ trống'),
		},
	]
}

export default FieldData
