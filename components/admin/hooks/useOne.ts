import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AdminServices from '../services'

interface IParams {
	path: string
}

export default function useOne({ path }: IParams) {
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
		staleTime: 1000 * 60,
	})
}
