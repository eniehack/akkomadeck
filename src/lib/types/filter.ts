export interface Filter {
    id: string
    title: string
    context: string
}
export interface FilteredResult {
    filter: Filter
    keyword_matches:  null | string[]
    status_matches: null | string[]
}
