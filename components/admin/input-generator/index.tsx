import { ConvertToBase64 } from '@/utils'
import { Avatar, FileInput, Select, TextInput } from '@mantine/core'
import { RiFileImageLine } from '@remixicon/react'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface IInputGenerator {
	allFieldsRequired?: boolean
	field: {
		name: string
		label: string
		placeholder: string
		type: string
		required: boolean
		data?: { label: string; value: string }[]
		disable?: boolean
		hidden?: boolean
	}
	defaultValue: string
	allFieldsdisabled?: boolean
}

function InputGenerator({ allFieldsRequired, field, defaultValue, allFieldsdisabled }: Readonly<IInputGenerator>) {
	const [imgFile, setImgFile] = useState<string>()
	const { register, setValue } = useFormContext()

	useEffect(() => {
		setValue(field.name, defaultValue)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	switch (field.type) {
		case 'text':
			return (
				<TextInput
					disabled={allFieldsdisabled || field.disable}
					size="sm"
					label={field.label}
					placeholder={field.placeholder}
					key={field.name}
					{...register(field.name)}
					name={field.name}
					required={allFieldsRequired && field.required}
					defaultValue={defaultValue}
				/>
			)
		case 'select':
			return (
				<Select
					disabled={allFieldsdisabled || field.disable}
					label={field.label}
					placeholder={field.placeholder}
					data={field?.data}
					key={field.name}
					size="sm"
					{...register(field.name, {
						required: allFieldsRequired && field.required,
					})}
					name={field.name}
					onChange={(value) => {
						setValue(field.name, value, { shouldValidate: true })
					}}
					allowDeselect={false}
					searchable
					defaultValue={defaultValue ?? ''}
					required={allFieldsRequired && field.required}
				></Select>
			)
		case 'upload-img':
			return (
				<div className="flex gap-2 items-end">
					<FileInput
						disabled={allFieldsdisabled || field.disable}
						accept="image/png,image/jpeg,image/jpg"
						className="col-span-4 flex-1 max-w-[80%]"
						size="sm"
						label={field.label}
						placeholder={field.placeholder}
						key={field.name}
						rightSection={<RiFileImageLine size={15} />}
						{...register(field.name, {
							required: allFieldsRequired && field.required,
						})}
						name={field.name}
						onChange={(file) => {
							// imgFile && URL.revokeObjectURL(imgFile)
							if (file) {
								// setImgFile(URL.createObjectURL(file))
								ConvertToBase64(file).then((base64) => {
									setValue(field.name, base64, { shouldValidate: true })
									setImgFile(base64)
								})
							}
						}}
						classNames={{ wrapper: 'truncate text-ellipsis' }}
						required={allFieldsRequired && field.required}
					/>
					<Avatar
						size="md"
						src={imgFile ?? defaultValue}
						alt=""
						className="border border-dashed rounded-md"
					/>
				</div>
			)
		default:
			return null
	}
}

export default InputGenerator
