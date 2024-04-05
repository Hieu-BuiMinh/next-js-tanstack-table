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
		cell: (prop) => <AvatarPopover src={prop.getValue()} />,
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

const AvatarPopover = ({ src }: { src: string }) => {
	const [opened, { close, open }] = useDisclosure(false)

	return (
		<Popover position="right" withArrow shadow="md" opened={opened}>
			<Popover.Target>
				<button className="m-auto" type="button" onMouseEnter={open} onMouseLeave={close}>
					<Image width={40} height={40} alt="123" src={src} unoptimized />
				</button>
			</Popover.Target>
			<Popover.Dropdown style={{ pointerEvents: 'none' }}>
				<Image
					unoptimized
					width={150}
					height={150}
					src={src}
					alt="avatar"
					className="h-[100px] w-[100px] rounded-md border border-dashed object-contain"
				/>
			</Popover.Dropdown>
		</Popover>
	)
}
