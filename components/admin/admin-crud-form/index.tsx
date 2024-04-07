import { Button } from '@mantine/core'
import { UseFormReturnType, useForm } from '@mantine/form'
import React, { memo, useCallback, useEffect } from 'react'
import { useCreate, useOne, useUpdate } from '../hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { IMetaContextType } from '@/views/types/context.type'
import { FormFieldTransformer } from '@/utils'
import { RiArrowGoBackLine } from '@remixicon/react'

interface IAdminCRUDForm {
	fieldData?: any
	type: string
	context: IMetaContextType | null
}

function AdminCRUDForm({ fieldData, type, context }: IAdminCRUDForm) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const { data: item } = useOne({
		path: `${context?.meta?.view}/${searchParams.get('_id')}`,
		option: { enabled: type !== 'create', queryKey: ['useOne'] },
	})

	const { mutate: createNew, isSuccess: createNewSuccess } = useCreate()
	const { mutate: update, isSuccess: updateSuccess } = useUpdate()

	const onSubmit = (data: any) => {
		console.log(data)
		// if (type === 'create') {
		//   createNew({ path: `${context?.meta?.create}`, data })
		// }
		// if (type === 'update') {
		//   update({ path: `${context?.meta?.edit}/${searchParams.get('_id')}`, data })
		// }
	}

	const formFieldData = useCallback(() => {
		return fieldData({ type, item })
	}, [item])
	const fieldFormated: any = FormFieldTransformer(formFieldData)
	const form = useForm<any>({
		initialValues: fieldFormated?.initialValues,

		validate: fieldFormated?.validate,
	})

	useEffect(() => {
		if (createNewSuccess || updateSuccess) {
			router.back()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createNewSuccess, updateSuccess])

	useEffect(() => {
		if (item) {
			form.initialize({
				...item,
			})
		}
	}, [item])

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

			<form onSubmit={form?.onSubmit(onSubmit)}>
				<div className="grid grid-cols-12 gap-3">
					{fieldData({ item })?.map((field: any) => (
						<div className="col-span-6" key={field.propName}>
							{field.control(form)}
						</div>
					))}
				</div>

				<div className="flex justify-end">
					{type !== 'view' && (
						<Button type="submit" variant="filled" size="xs" radius="xs">
							{type}
						</Button>
					)}
				</div>
			</form>
		</div>
	)
}

export default memo(AdminCRUDForm)
