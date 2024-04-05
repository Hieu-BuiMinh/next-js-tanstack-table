'use client'

import { IMetaContextType } from '@/views/types/context.type'
import React, { createContext, useContext, useRef } from 'react'

const OCRHistoryScanContext = createContext<IMetaContextType | null>(null)
const useOCRHistoryScanContext = () => {
	return useContext(OCRHistoryScanContext)
}

function OCRHistoryScanProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const value = useRef({
		meta: {
			title: 'ocr-history-scan',
			name: 'history scan',
			path: 'history-scan',
			list: '/OCR',
			create: '/OCR',
			edit: '/OCR',
			delete: '/OCR',
			deleteMany: '/OCR',
			view: '/OCR',
		},
	})

	return <OCRHistoryScanContext.Provider value={value.current}>{children}</OCRHistoryScanContext.Provider>
}

export { OCRHistoryScanProvider, useOCRHistoryScanContext }

