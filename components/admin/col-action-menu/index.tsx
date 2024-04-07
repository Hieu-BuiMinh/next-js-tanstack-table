import { Menu, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { RiMore2Line } from '@remixicon/react'
import { Row } from '@tanstack/react-table'
import { usePathname, useRouter } from 'next/navigation'
import { memo, useState } from 'react'
import useDelete from '../hooks/useDelete'
import { useAdminStore } from '../store/useAdminStore'

interface IAdminTableActionMenu {
	row: Row<any>
}

function AdminTableActionMenu({ row }: Readonly<IAdminTableActionMenu>) {
	const pathName = usePathname()
	const router = useRouter()
	const { findMenuByPath } = useAdminStore()
	const menu = findMenuByPath(pathName)

	const [opened, setOpened] = useState(false)
	const { mutate: deleteItem } = useDelete()

	const handleDeleteItem = () => {
		modals.openConfirmModal({
			title: 'Do you want to delete?',
			centered: true,
			children: (
				<Text size="sm">
					Are you sure you want to delete? This action is destructive and you will have to contact support to
					restore your data.
				</Text>
			),
			labels: { confirm: 'Delete', cancel: "No don't delete it" },
			confirmProps: { color: 'red' },
			onCancel: () => console.log('Cancel'),
			onConfirm: () => deleteItem({ path: `${menu.delete}/${row.original.id}` }),
		})
	}

	const hadleDirectToView = (type: string) => {
		router.push(`${pathName}/${type}?_id=${row.original.id}`)
	}

	return (
		<Menu shadow="md" width={150} withArrow opened={opened} onChange={setOpened}>
			<Menu.Target>
				<button className="flex m-auto">
					<RiMore2Line color="#75D940" />
				</button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Application</Menu.Label>
				<Menu.Item>Settings</Menu.Item>

				<Menu.Divider />
				<Menu.Label>Action</Menu.Label>
				<Menu.Item onClick={() => hadleDirectToView('view')}>View</Menu.Item>
				<Menu.Item onClick={() => hadleDirectToView('update')}>Update</Menu.Item>
				<Menu.Item color="red" onClick={handleDeleteItem}>
					Delete
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}

export default memo(AdminTableActionMenu)
