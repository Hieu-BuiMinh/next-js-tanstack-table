import { Button, Checkbox, Pagination, Select, Table } from '@mantine/core'
import { RiExpandUpDownLine, RiSortAsc, RiSortDesc } from '@remixicon/react'
import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import AdminTableActionMenu from '../action-menu'
import ColFilterMore from '../col-filter-more'
import { fuzzyFilter } from '../col-filter-more/filter-funcs'
import useList from '../hooks/useList'
import { useAdminStore } from '../store/useAdminStore'
import { IMetaContextType } from '@/views/types/context.type'

interface IAdminTableGridView {
	columns: ColumnDef<any, any>[]
	context: IMetaContextType | null
}

function AdminTableGridView({ columns, context }: Readonly<IAdminTableGridView>) {
	// const { findMenuByPath } = useAdminStore()
	// const menu = findMenuByPath(usePathname())
	const pathName = usePathname()
	const router = useRouter()

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 1,
		pageSize: 10,
	})
	const [rowSelection, setRowSelection] = useState({})
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [globalFilter, setGlobalFilter] = useState('')

	const columnHelper = createColumnHelper<any>()

	const { data: tableQueryData } = useList({
		path: context?.meta?.list ?? '',
		params: { _page: pagination.pageIndex, _per_page: pagination.pageSize },
	})

	const columnsDef = [
		columnHelper.accessor('select', {
			header: ({ table }) => (
				<Checkbox
					label={`${table.getSelectedRowModel().flatRows.length}/${table.getPreFilteredRowModel().rows.length}`}
					size="xs"
					color="lime"
					radius="xs"
					{...{
						checked: table.getIsAllRowsSelected(),
						indeterminate: table.getIsSomeRowsSelected(),
						onChange: table.getToggleAllRowsSelectedHandler(),
					}}
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					size="xs"
					color="lime"
					radius="xs"
					className="flex justify-center"
					{...{
						checked: row.getIsSelected(),
						disabled: !row.getCanSelect(),
						// indeterminate: row.getIsSomeSelected(),
						onChange: row.getToggleSelectedHandler(),
					}}
				/>
			),
			enableSorting: false,
			enableColumnFilter: false,
		}),
		...columns,
		columnHelper.accessor('action', {
			header: 'action',
			cell: ({ row }) => <AdminTableActionMenu row={row} />,
			enableSorting: false,
			enableColumnFilter: false,
		}),
	]

	const tableInstance = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		data: tableQueryData?.data ?? [],
		columns: columnsDef,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			pagination,
			rowSelection,
			sorting,
			columnFilters,
			globalFilter,
		},
		// paging
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		manualPagination: true,
		// selecting
		enableRowSelection: true, //enable row selection for all rows
		onRowSelectionChange: setRowSelection,
		// sorting
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		// filter
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		// globalFilterFn: fuzzyFilter,
		getFilteredRowModel: getFilteredRowModel(),
	})

	const handleChangePageSize = (value: string | null) => {
		if (!value) return
		if (value === 'All') {
			value = tableQueryData?.items.toString() ?? '0'
		}
		tableInstance.setPageSize(Number(value))
		tableInstance.setPageIndex(1)
	}

	const handleChangePageIndex = (value: number) => {
		tableInstance.setPageIndex(value)
	}

	const hadleDirectToView = (type: string) => {
		router.push(`${pathName}/${type}`)
	}

	const rows = tableInstance.getRowModel().rows.map((row) => (
		<Table.Tr key={row.id}>
			{row.getVisibleCells().map((cell) => {
				return (
					<Table.Td
						className={clsx(
							{ 'sticky left-0 bg-white': cell.id.includes('_select') },
							{ 'sticky right-0 bg-white': cell.id.includes('_action') }
						)}
						key={cell.id}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</Table.Td>
				)
			})}
		</Table.Tr>
	))

	return (
		<div className='flex flex-col gap-2'>
			<div className="flex justify-end">
				<Button onClick={()=>hadleDirectToView('create')} variant="filled" size="xs" radius="xs">
					Create
				</Button>
			</div>
			<div className="w-full h-[calc(100vh-220px)]">
				<Table.ScrollContainer minWidth={600} className="relative h-full">
					<Table className="bg-white" highlightOnHover withColumnBorders withTableBorder>
						<Table.Thead className="sticky top-0 bg-white">
							{tableInstance?.getHeaderGroups()?.map((_headerRow, i) => {
								return (
									<Table.Tr key={_headerRow.id} className="relative">
										{_headerRow.headers.map((_headerCol) => {
											return (
												<Table.Th
													colSpan={_headerCol.colSpan}
													key={_headerCol.id}
													className={clsx({
														'border-2 border-dashed border-green-300 box-border':
															columnFilters.filter((col) => col.id === _headerCol.id)
																?.length > 0,
														'sticky left-0 bg-white': _headerCol.id === 'select',
														'sticky right-0 bg-white': _headerCol.id === 'action',
													})}
												>
													<div className="flex items-center justify-between">
														<button
															className="w-full flex gap-3 items-center justify-between"
															type="button"
															onClick={_headerCol.column.getToggleSortingHandler()}
														>
															{flexRender(
																_headerCol.column.columnDef.header,
																_headerCol.getContext()
															)}
															{_headerCol.column.getCanSort() && (
																<>
																	{{
																		asc: <RiSortAsc size={14} color="#75D940" />,
																		desc: <RiSortDesc size={14} color="#FFB01B" />,
																	}[_headerCol.column.getIsSorted() as string] ?? (
																		<RiExpandUpDownLine size={14} color="#aaaaaa" />
																	)}
																</>
															)}
														</button>
														{_headerCol.column.getCanFilter() && (
															<ColFilterMore
																column={_headerCol.column}
																table={tableInstance}
															/>
														)}
													</div>
												</Table.Th>
											)
										})}
									</Table.Tr>
								)
							})}
						</Table.Thead>

						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</div>

			<div className="mt-5 flex gap-3 items-end justify-start">
				<Select
					placeholder="Per page"
					data={['5', '10', '20', '30', '40', '50', 'All']}
					size="xs"
					allowDeselect={false}
					checkIconPosition="right"
					w={120}
					onChange={handleChangePageSize}
					defaultValue={String(pagination.pageSize)}
					disabled={tableInstance?.getIsAllRowsSelected() || tableInstance?.getIsSomeRowsSelected()}
				/>
				<Pagination
					size="sm"
					value={pagination.pageIndex}
					onChange={handleChangePageIndex}
					total={tableQueryData?.pages ?? 1}
					siblings={2}
					defaultValue={1}
					disabled={tableInstance?.getIsAllRowsSelected() || tableInstance?.getIsSomeRowsSelected()}
				/>
			</div>
		</div>
	)
}

export default AdminTableGridView
