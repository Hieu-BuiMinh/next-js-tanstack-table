'use client'

import AdminTableGridView from '@/components/admin/admin-table'
import { OCRTableColumnDef } from './components/column-def'
import { useOCRHistoryScanContext } from '../components/ocr-history-scan-context'

function HistoryScanView() {
	const context = useOCRHistoryScanContext()

	return (
		<div className="">
			<AdminTableGridView columns={OCRTableColumnDef} context={context} />
		</div>
	)
}

export default HistoryScanView
