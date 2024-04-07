'use client'

import AdminCRUDForm from '@/components/admin/admin-crud-form'
import { useOCRHistoryScanContext } from '../components/ocr-history-scan-context'
import FieldData from './my-field-data'
interface IHistoryScanViewCRUD {
	type: 'create' | 'update' | 'view'
}

function HistoryScanViewCRUD({ type }: Readonly<IHistoryScanViewCRUD>) {

	const context = useOCRHistoryScanContext()

	return (
		<AdminCRUDForm fieldData={FieldData} type={type} context={context} />
	)
}

export default HistoryScanViewCRUD
