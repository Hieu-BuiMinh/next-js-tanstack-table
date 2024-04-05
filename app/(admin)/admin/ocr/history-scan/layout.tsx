import PageLayout from '@/components/layout/page-layout'
import { OCRHistoryScanProvider } from '@/views/ocr/history-scan/components/ocr-history-scan-context'
import React from 'react'

interface IAdminLayout {
	children: React.ReactNode
}

function HistoryScanPageLayout({ children }: Readonly<IAdminLayout>) {
	const meta = { title: 'OCR' }
	return (
		<PageLayout meta={meta}>
			<OCRHistoryScanProvider>{children}</OCRHistoryScanProvider>
		</PageLayout>
	)
}

export default HistoryScanPageLayout
