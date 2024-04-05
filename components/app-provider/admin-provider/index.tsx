'use client'

import { useAdminStore } from '@/components/admin/store/useAdminStore'
import React, { useEffect } from 'react'

export interface AdminProviderResources {
	name: string
	path: string
  children: {
    name: string
    path: string
    list?: string
    create?: string
    edit?: string
    delete?: string
    deleteMany?: string
    view?: string
  }[]
}

interface Props {
	children: React.ReactNode
	resources: AdminProviderResources[]
}

const AdminProvider: React.FC<Props> = ({ children, resources }) => {
	const { setMenuResources } = useAdminStore()

	useEffect(() => {
		setMenuResources(resources)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <>{children}</>
}

export default AdminProvider
