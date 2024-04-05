import HistoryScanView from '@/views/ocr/history-scan/history-scan-view'
import HistoryScanViewCRUD from '@/views/ocr/history-scan/history-scan-view-crud'

interface Props {
	params: {
		page?: string[]
	}
}

export default async function Page({ params }: Props) {
	if (Array.isArray(params?.page) && params?.page?.length > 0) {
		if (params.page.includes('create')) {
			return <HistoryScanViewCRUD type="create" />
		}

		if (params.page.includes('view')) {
			return <HistoryScanViewCRUD type="view" />
		}

		return <HistoryScanViewCRUD type="update" />
	}
	return <HistoryScanView />
}
