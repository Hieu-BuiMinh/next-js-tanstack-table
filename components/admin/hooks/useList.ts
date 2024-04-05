import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AdminServices from '../services'

interface IParams {
	path: string
	params: {
		_page: number
		_per_page: number
	}
}

export default function useList({ path, params }: IParams) {
	return useQuery({
		queryKey: ['useList', path, params],
		queryFn: () => {
			return AdminServices.list({
				path,
				params,
			})
		},
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60,
	})
}
