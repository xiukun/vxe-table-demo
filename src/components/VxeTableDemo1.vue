<template>
  <div>
    <vxe-form v-bind="formOptions" v-on="formEvents"></vxe-form>

    <vxe-table
      show-overflow
      height="500"
      :data="tableData"
      :loading="loading"
      :page="page"
      :pagesize="pagesize"
      @page-change="handlePageChange">
      <vxe-column field="seq" type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="num" title="Num"></vxe-column>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>
    <vxe-pager
      :current-page="page"
      :page-size="pagesize"
      :total="total"
      @page-change="handlePageChange"
      :layouts="paginationLayout"
      size="mini"
    ></vxe-pager>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { VxeFormProps, VxeFormListeners } from 'vxe-pc-ui'
import axios from 'axios'
import usePagination from '@/hooks/useVxePagination'
defineOptions({
  name: 'VxeTableDemo1'
})
const { page, pagesize, paginationLayout, loading, handlePageChange, resetPagination } = usePagination({
  initialPage:1, 
  initialPageSize:10,
  total: 0,
  onPageChange: (page: any, pageSize: any) => {
    loadData(page, pageSize)
  }
})

const total = ref(0)

const tableData = ref<any[]>([])

const loadData = async (page: number=1, pageSize: number=10) => {
      loading.value = true
      const { data } = await axios({
        url: `https://apifoxmock.com/m1/3546534-2258203-default/common/list`,
        method: 'get',
        params: {
          page,
          perPage:pageSize,
          ...formOptions.data
        }
      })
      tableData.value = data.data.rows
      total.value = data.data.count
      loading.value = false
    }

onMounted(() => {
  loadData()
})


const formOptions = reactive<VxeFormProps<any>>({
  data: {
    name: '',
  },
  items: [
    { field: 'name', title: '名称', span: 8, itemRender: { name: 'VxeInput' } },
    { field: 'email', title: '邮件', span: 8, itemRender: { name: 'VxeInput' } },
    { field: 'nickname', title: '昵称', span: 8, itemRender: { name: 'VxeInput' } },
    { field: 'role', title: '角色', span: 8, folding: true, itemRender: { name: 'VxeInput' } },
    { field: 'id', title: 'ID', span: 8, folding: true, itemRender: { name: 'VxeInput' } },
    { field: 'age', title: '年龄', span: 8, folding: true, itemRender: { name: 'VxeInput' } },
    {
      span: 24,
      collapseNode: true,
      align: 'right',
      itemRender: {
        name: 'VxeButtonGroup',
        options: [
          { type: 'submit', content: '搜索', status: 'primary' },
          { type: 'reset', content: '重置' }
        ]
      }
    }
  ]
})

const formEvents: VxeFormListeners = {
  submit () {
    resetPagination()
    loadData()
    console.log(formOptions,'form submit')
  },
  reset () {
    resetPagination()
    console.log(formOptions,'form reset')
    loadData()
    
  }
}
</script>
