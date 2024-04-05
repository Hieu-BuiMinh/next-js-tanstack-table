import { httpClient } from '@/http'

const AdminServices = {
	list: async (payload: { path: string; params: { _page: string | number; _per_page: string | number } }) => {
		const res = await httpClient.get(payload?.path, {
			params: payload?.params,
		})

		if (res?.status !== 200) {
			throw new Error('AdminServices.list')
		}

		return res?.data satisfies {
			first: number
			prev: number
			next: number
			last: number
			pages: number
			items: number
			data: any[]
		}
	},
	delete: async (payload: { path: string }) => {
		const res = await httpClient.delete(payload?.path)

		if (res?.status !== 200) {
			throw new Error('AdminServices.delete')
		}

		return res?.data
	},
	getOne: async (payload: { path: string }) => {
		const res = await httpClient.get(payload?.path)

		if (res?.status !== 200) {
			throw new Error('AdminServices.getOne')
		}

		return res?.data as {
			id: string
			bill_img: string
			brand_name: string
			brand_id: string
			phone_number: string
			sub_rows: string
			bill_value: string
			date: string
		}
	},
	create: async (payload: { path: string, data: any }) => {
		const res = await httpClient.post(payload?.path, payload.data)

		if (res?.status !== 200) {
			throw new Error('AdminServices.create')
		}

		return res?.data 
	},
	update: async (payload: { path: string, data: any }) => {
		const res = await httpClient.put(payload?.path, payload.data)

		if (res?.status !== 200) {
			throw new Error('AdminServices.create')
		}

		return res?.data 
	},
}

export default AdminServices
