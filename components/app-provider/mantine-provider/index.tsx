import { MantineProvider, createTheme } from '@mantine/core'
import React from 'react'
import '@mantine/core/styles.css'
import { ModalsProvider } from '@mantine/modals'


interface IAppMantineProvider {
	children: React.ReactNode
}

function AppMantineProvider({ children }: Readonly<IAppMantineProvider>) {
	const theme = createTheme({
		primaryColor: 'lime-theme',
		colors: {
			'lime-theme': [
				'#effee7',
				'#e0f8d4',
				'#c2efab',
				'#a2e67e',
				'#87de57',
				'#75d940',
				'#6bd731',
				'#59be23',
				'#4da91b',
				'#3d920c',
			],
		},
	})
	
	return (
		<MantineProvider theme={theme}>
			<ModalsProvider>{children}</ModalsProvider>
		</MantineProvider>
	)
}

export default AppMantineProvider
