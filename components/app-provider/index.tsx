'use client'

import React from 'react'
import AppMantineProvider from './mantine-provider'
import ProviderQueryClient from './query-client-provider'
import AdminProvider from './admin-provider'

interface IAppProvider {
	children: React.ReactNode
}

function AppProvider({ children }: Readonly<IAppProvider>) {
	const menu = [
		{
			name: 'OCR',
			path: 'ocr',
			children: [
				{
					name: 'history scan',
					path: 'history-scan',
					list: '/OCR',
					create: '/OCR',
					edit: '/OCR',
					delete: '/OCR',
					deleteMany: '/OCR',
					view: '/OCR',
				},
			],
		},
	]

	return (
		<AppMantineProvider>
			<AdminProvider resources={menu}>
				<ProviderQueryClient>{children}</ProviderQueryClient>
			</AdminProvider>
		</AppMantineProvider>
	)
}

export default AppProvider
