import { NumberInput, Popover, TextInput } from '@mantine/core'
import { RiCloseLine, RiMore2Line } from '@remixicon/react'
import { Column, Table } from '@tanstack/react-table'
import { useState } from 'react'

interface IColFilterMore {
	column: Column<any, unknown>
	table: Table<any>
}

function ColFilterMore({ column, table }: Readonly<IColFilterMore>) {
	const [opened, setOpened] = useState(false)

	const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

	const columnFilterValue = column.getFilterValue()

	// const sortedUniqueValues = useMemo(
	// 	() => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
	// 	[column.getFacetedUniqueValues()]
	// )

	return (
		<Popover opened={opened} onChange={setOpened} withArrow shadow="md" arrowSize={8}>
			<Popover.Target>
				<button
					onClick={() => {
						setOpened(true)
					}}
				>
					<RiMore2Line size={14} color="#333" />
				</button>
			</Popover.Target>

			<Popover.Dropdown>
				{typeof firstValue === 'number' ? (
					<NumberInput label="Input label" description="Input description" placeholder="Input placeholder" />
				) : (
					<TextInput
						description={`Filter:  ${column.id}`}
						value={(columnFilterValue ?? '') as string}
						onChange={(event) => column.setFilterValue(event.target.value)}
						placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
						list={column.id + 'list'}
						rightSection={
							<RiCloseLine
								className="cursor-pointer"
								onClick={() => {
									column.getFilterValue() !== '' && column.setFilterValue('')
								}}
							/>
						}
					/>
				)}
			</Popover.Dropdown>
		</Popover>
	)
}

export default ColFilterMore
