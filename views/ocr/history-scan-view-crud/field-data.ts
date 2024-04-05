interface IItem {
	id: string
	bill_img: string
	brand_name: string
	brand_id: string
	phone_number: string
	sub_rows: string
	bill_value: string
	date: string
	defaultValue?: string
	disable?: boolean
	hidden?: boolean
}

export const OCRFieldData = (item: IItem | undefined, type: string) => [
	{
		name: 'bill_id',
		label: 'bill_id',
		placeholder: 'Enter bill_id',
		type: 'text',
		required: true,
		hidden: type === 'create' || type === 'view' || type === 'update',
		defaultValue: item?.id,
	},
	{
		name: 'bill_img',
		label: 'bill_img',
		placeholder: 'upload bill_img',
		type: 'upload-img',
		required: true,
		defaultValue: item?.bill_img,
	},
	{
		name: 'brand_id',
		label: 'brand_id',
		placeholder: 'brand_id',
		type: 'text',
		required: true,
		disable: type === 'update',
		defaultValue: item?.brand_id,
	},
	{
		name: 'brand_name',
		label: 'brand_name',
		placeholder: 'Select brand_name',
		type: 'select',
		required: true,
		defaultValue: item?.brand_name,
		data: [
			{ label: 'Vietnam', value: 'Vietnam' },
			{ label: 'Sweden', value: 'Sweden' },
			{ label: 'Argentina', value: 'Argentina' },
			{ label: 'United States', value: 'United States' },
			{ label: 'France', value: 'France' },
			{ label: 'China', value: 'China' },
		],
	},
	{
		name: 'phone_number',
		label: 'phone_number',
		placeholder: 'Phone_number',
		type: 'text',
		required: true,
		defaultValue: item?.phone_number,
	},
	{
		name: 'bill_value',
		label: 'bill_value',
		placeholder: 'bill_value',
		type: 'text',
		required: true,
		defaultValue: item?.bill_value,
	},
	{
		name: 'date',
		label: 'date',
		placeholder: 'Enter date',
		type: 'text',
		required: true,
		defaultValue: item?.date,
	},
]
