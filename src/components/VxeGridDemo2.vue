<template>
  <div>
    <vxe-form v-bind="formOptions" v-on="formEvents"></vxe-form>
    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'
import type { VxeGridProps, VxeGridListeners, VxeGridInstance } from 'vxe-table'
import type { VxeFormProps, VxeFormListeners } from 'vxe-pc-ui'
import axios from 'axios'
const gridRef = ref<VxeGridInstance<any>>()
const formOptions = reactive<VxeFormProps<any>>({
  data: {
    name: 'bbbb',
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
const gridOptions = reactive<VxeGridProps<any>>({
  showOverflow: true,
  border: true,
  height: 500,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'age', title: 'age' },
    { field: 'num', title: 'Num' },
    { field: 'address', title: 'Address' },
    { field: 'action', title: '操作', fixed: 'right', width: 160, slots: { default: 'action' } }
  ],
  pagerConfig: {},
  columnConfig: {
    resizable: true
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    custom: true,
    export: true,
    print: true
  },
  printConfig: {},
  exportConfig: {},
  proxyConfig: {
    form: true,
    sort: true,
    ajax: {
     async query ({ page, sorts }) {
      console.log(formOptions.data,'wwwwwwwww')
        
        const params = {
          page:page.currentPage,
          perPage:page.pageSize,
          ...formOptions.data,
          orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
        }
        const { data } = await axios({
        url: `https://apifoxmock.com/m1/3546534-2258203-default/common/list`,
        method: 'get',
        params: params
      })
        return data.data
      },
      delete ({ body }) {
        return axios({
        url: `https://apifoxmock.com/m1/3546534-2258203-default/common/list`,
        method: 'get',
        params: {...body,delete:true}
      })
      }
    }
  }
})

const formEvents: VxeFormListeners = {
  submit () {
    const $grid = gridRef.value
    $grid?.commitProxy('reload')
    console.log(formOptions,'form submit')
  },
  reset () {
    const $grid = gridRef.value
    $grid?.commitProxy('delete')
    console.log(formOptions,'form reset')
  }
}
</script>
