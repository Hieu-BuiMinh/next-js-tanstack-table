import { UseQueryOptions, keepPreviousData, useQuery } from '@tanstack/react-query'
import AdminServices from '../services'

interface IParams {
	path: string
	option?: UseQueryOptions
}

export default function useOne({ path, option }: IParams) {
	return useQuery({
		queryKey: ['useOne', path],
		queryFn: () => {
			if (!path) {
				return
			}
			return AdminServices.getOne({
				path,
			})
		},
		placeholderData: keepPreviousData,
		enabled: option?.enabled
	})
}
