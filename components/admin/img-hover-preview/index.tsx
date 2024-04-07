import { Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import React from 'react'

function ImgHoverPreview({ src, ...props }: { src: string }) {
	const [opened, { close, open }] = useDisclosure(false)

	return (
		<Popover position="right" withArrow shadow="md" opened={opened}>
			<Popover.Target>
				<div className="flex justify-center" onMouseEnter={open} onMouseLeave={close}>
					<Image className='object-cover' width={40} height={40} alt="123" src={src} unoptimized />
				</div>
			</Popover.Target>
			<Popover.Dropdown style={{ pointerEvents: 'none' }}>
				<Image
					unoptimized
					width={150}
					height={150}
					src={src}
					alt="avatar"
					className="h-[100px] w-[100px] rounded-md border border-dashed object-cover"
				/>
			</Popover.Dropdown>
		</Popover>
	)
}

export default ImgHoverPreview
