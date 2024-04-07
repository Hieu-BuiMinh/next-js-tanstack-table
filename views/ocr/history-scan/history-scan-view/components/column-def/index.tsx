import ImgHoverPreview from '@/components/admin/img-hover-preview'
import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createColumnHelper } from '@tanstack/react-table'
import Image from 'next/image'

const columnHelper = createColumnHelper<any>()

export const OCRTableColumnDef = [
	columnHelper.accessor('id', {
		header: 'bill_id',
		cell: (prop) => <div className="line-clamp-1">{prop.getValue()}</div>,
	},
  ),
	columnHelper.accessor('bill_img', {
		header: 'bill_img',
		cell: (prop) => <ImgHoverPreview src={prop.getValue()} />,
	}),
	columnHelper.accessor('brand_id', {
		header: 'brand_id',
		cell: (prop) => <>{prop.getValue()}</>,
	}),
	columnHelper.accessor('brand_name', {
		header: 'brand_name',
		cell: (prop) => <>{prop.getValue()}</>,
	}),
	columnHelper.accessor('phone_number', {
		header: 'phone_number',
		cell: (prop) => <>{prop.getValue()}</>,
	}),
	columnHelper.accessor('sub_rows', {
		header: 'sub_rows',
		cell: (prop) => <div className="line-clamp-1">{prop.getValue()}</div>,
	}),
	columnHelper.accessor('bill_value', {
		header: 'bill_value',
		cell: (prop) => <>{prop.getValue()}</>,
	}),
	columnHelper.accessor('date', {
		header: 'date',
		cell: (prop) => <>{prop.getValue()}</>,
	}),
]
