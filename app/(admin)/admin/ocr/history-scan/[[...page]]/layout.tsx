import PageLayout from '@/components/layout/page-layout'
import React from 'react'

interface IAdminLayout {
	children: React.ReactNode
}

function SSRPageLayout({ children }: Readonly<IAdminLayout>) {
	const meta = { title: 'OCR' }
	return <PageLayout meta={meta}>{children}</PageLayout>
}

export default SSRPageLayout
