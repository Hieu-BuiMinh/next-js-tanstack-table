import { useMutation, useQueryClient } from "@tanstack/react-query"
import AdminServices from "../services"

interface IParams {
	path: string,
  data: any
}

export default function useCreate() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useCreate'],
		mutationFn: ({ path, data }: IParams) => {
			return AdminServices.create({
				path,
        data,
			})
		},
		onSuccess: ()=>{
			queryClient.refetchQueries({
				queryKey: ['useList'],
			})
		}
	})
}