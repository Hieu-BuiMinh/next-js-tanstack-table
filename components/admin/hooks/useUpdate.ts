import { useMutation, useQueryClient } from "@tanstack/react-query"
import AdminServices from "../services"

interface IParams {
	path: string,
  data: any,
}

export default function useUpdate() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useUpdate'],
		mutationFn: ({ path, data }: IParams) => {
			return AdminServices.update({
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