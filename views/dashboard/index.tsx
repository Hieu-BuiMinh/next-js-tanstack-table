'use client'

import { useAdminStore } from '@/components/admin/store/useAdminStore'
import { AppConfig } from '@/utils'
import { Tabs } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

function AdminDashboardView() {
	return (
		<div className="w-full h-screen">
			<Tabs defaultValue="gallery">
				<Tabs.List>
					<Tabs.Tab value="gallery">Gallery</Tabs.Tab>
					<Tabs.Tab value="messages">Messages</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="gallery">
					{AppConfig.menu.map((_menu) => {
						return (
							<div key={_menu.name}>
								<div className="font-semibold">
									{_menu.name}
								</div>
								{_menu.children.map((_child) => {
									return (
										<Link href={_child.path} key={_child.name} >
											{_child.title}
										</Link>
									)
								})}
							</div>
						)
					})}
				</Tabs.Panel>

				<Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
			</Tabs>
		</div>
	)
}

export default AdminDashboardView
