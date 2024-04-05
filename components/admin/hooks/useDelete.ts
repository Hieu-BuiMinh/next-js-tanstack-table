import { useMutation, useQueryClient } from '@tanstack/react-query'
import AdminServices from '../services'

interface IParams {
	path: string
}

export default function useDelete() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useDelete'],
		mutationFn: ({ path }: IParams) => {
			return AdminServices.delete({
				path,
			})
		},
		onSuccess: ()=>{
			queryClient.refetchQueries({
				queryKey: ['useList'],
			})
		}
	})
}
