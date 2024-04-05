import { AdminProviderResources } from '@/components/app-provider/admin-provider'
import { create } from 'zustand'

type AdminStore = {
	menuResources: AdminProviderResources[]

	setMenuResources: (data: AdminProviderResources[]) => void
	findMenuByPath: (path: string) => {
		name: string
		path: string
		list?: string
		create?: string
		edit?: string
		delete?: string
		deleteMany?: string
		view?: string
	}
}

const useAdminStore = create<AdminStore>()((set, get) => ({
	menuResources: [],

	setMenuResources: (data) => {
		set((state) => ({ ...state, menuResources: data }))
	},
	findMenuByPath: (path) => {
		const pathArr = path.split('/').slice(2)
		const parents = get().menuResources.filter((_m) => _m.path === pathArr[0])
		const child = parents.map((parent) => parent.children.filter((_c) => _c.path === pathArr[1])[0])[0]
		return child
	},
}))

export { useAdminStore }
