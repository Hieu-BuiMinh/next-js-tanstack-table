'use client'

import useCreate from '@/components/admin/hooks/useCreate'
import useOne from '@/components/admin/hooks/useOne'
import useUpdate from '@/components/admin/hooks/useUpdate'
import InputGenerator from '@/components/admin/input-generator'
import { useAdminStore } from '@/components/admin/store/useAdminStore'
import { Button } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { RiArrowGoBackLine } from '@remixicon/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useOCRHistoryScanContext } from '../components/ocr-history-scan-context'
import { OCRFieldData } from './field-data'

interface IHistoryScanViewCRUD {
	type: 'create' | 'update' | 'view'
}

function HistoryScanViewCRUD({ type }: Readonly<IHistoryScanViewCRUD>) {
	const context = useOCRHistoryScanContext()

	const router = useRouter()
	const searchParams = useSearchParams()
	
	// const pathName = usePathname()
	// const { findMenuByPath } = useAdminStore()
	// const menu = findMenuByPath(pathName)

	const { data: item } = useOne({
		path: `${context?.meta?.view}/${searchParams.get('_id')}`,
		option: { enabled: type !== 'create', queryKey: ['useList'] },
	})

	const { mutate: createNewOCR, isSuccess: createNewOCRSuccess } = useCreate()
	const { mutate: updateOCR, isSuccess: updateOCRSuccess } = useUpdate()

	const methods = useForm<any>()
	const onSubmit = (data: any) => {
		if (type === 'create') {
			createNewOCR({ path: `${context?.meta?.view}`, data })
		}
		if (type === 'update') {
			updateOCR({ path: `${context?.meta?.view}/${searchParams.get('_id')}`, data })
		}
	}

	useEffect(() => {
		console.log('object')
		if (createNewOCRSuccess || updateOCRSuccess) {
			router.back()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createNewOCRSuccess, updateOCRSuccess])

	return (
		<div className="flex flex-col gap-3">
			<div className="w-full flex gap-2">
				<button onClick={() => router.back()}>
					<RiArrowGoBackLine size={20} color="#75D940" />
				</button>
				{type}{' '}
				{(type === 'view' || type === 'update') && (
					<span className="italic text-gray-400 text-sm">{': ' + searchParams.get('_id')}</span>
				)}
			</div>

			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-12 gap-3">
						{OCRFieldData(item, type).map((field, i) => {
							if (field.hidden) return null

							return (
								<div className="col-span-3" key={randomId()}>
									<InputGenerator
										allFieldsRequired={true}
										field={field}
										defaultValue={field.defaultValue ?? ''}
										allFieldsdisabled={type === 'view'}
									/>
								</div>
							)
						})}
					</div>

					<div className="flex justify-end">
						{type !== 'view' && (
							<Button type="submit" variant="filled" size="xs" radius="xs">
								{type}
							</Button>
						)}
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default HistoryScanViewCRUD
