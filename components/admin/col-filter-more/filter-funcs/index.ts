import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils'
import { FilterFn, SortingFn, sortingFns } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
	interface FilterFns {
		fuzzy: FilterFn<unknown>
	}
	interface FilterMeta {
		itemRank: RankingInfo
	}
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value)

	// Store the itemRank info
	addMeta({
		itemRank,
	})

	// Return if the item should be filtered in/out
	return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
	let dir = 0

	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(rowA.columnFiltersMeta[columnId]?.itemRank!, rowB.columnFiltersMeta[columnId]?.itemRank!)
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

export { fuzzyFilter, fuzzySort }
