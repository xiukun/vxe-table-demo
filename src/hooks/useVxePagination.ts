import { ref,shallowRef } from 'vue'
import type { VxePagerProps } from 'vxe-pc-ui'

interface PaginationOptions {
  initialPage: number
  initialPageSize: number
  total: number
  onPageChange: (page: number, pageSize: number) => void
}
/**
 * vxe-table paging hooks
 * @param options paging configuration item
 * @returns 
 */
const useVxePagination = (options: PaginationOptions) => {
  const { initialPage, initialPageSize, onPageChange } = options

  const page = ref(initialPage)
  const pagesize = ref(initialPageSize)
  const loading = ref(false)
  const paginationLayout = shallowRef<VxePagerProps['layouts']>(['Home', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'End', 'Sizes', 'FullJump', 'Total'])

  /**
   * page change event
   * @param param0 
   */
  const handlePageChange = ({ currentPage, pageSize }: { currentPage: number, pageSize: number }) => {
    page.value = currentPage
    pagesize.value = pageSize
    onPageChange(currentPage, pageSize)
  }

  /**
   * resets the paging state to its initial value
   */
  const resetPagination = () => {
    page.value = initialPage
    pagesize.value = initialPageSize
  }

  return {
    page,
    pagesize,
    loading,
    paginationLayout,
    handlePageChange,
    resetPagination
  }
}

export default useVxePagination
export { useVxePagination }