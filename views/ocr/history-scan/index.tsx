'use client'

import AdminTableGridView from '@/components/admin/admin-table'
import { OCRTableColumnDef } from './components/column-def'

function HistoryScanView() {

	return (
		<div className=''>
			<AdminTableGridView columns={OCRTableColumnDef} />
		</div>
	)
}

export default HistoryScanView
