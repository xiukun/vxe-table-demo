// import { VxeUI, VxeTooltip, VxeForm } from 'vxe-pc-ui'
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeTable,{
	type VxeUIExport,
} from 'vxe-table'
import 'vxe-table/lib/style.css'
// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/styles/cssvar.scss'

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'
import enUS from 'vxe-pc-ui/lib/language/en-US'
import type { App } from 'vue'

// 是否加载过
let isInit = false

export function initVxeTable(app: App) {
	if (isInit) {
		return
	}
	// 设置国际化
	const localMap = {
		'zh-CN': zhCN,
		'en-US': enUS,
	}
	const locale = 'zh-CN'
	VxeUI.setI18n(locale, localMap[locale])
	VxeUI.setLanguage(locale)

	// 导入vxe组件
	// VxeUI.component(VxeTooltip)
	// VxeUI.component(VxeForm)
  app.use(VxeUI).use(VxeTable)
	isInit = true

	// 配置vxe-table
	configVxeTable(VxeUI.VxeUI)
}

export function configVxeTable(vxeUI: VxeUIExport) {
	vxeUI.setConfig({
    table: {
      size: 'mini',
      border: 'inner',
      stripe: true,
      columnConfig: {
				resizable: true,
			},
      sortConfig: {
        showIcon: true,
        trigger: 'cell'
      },
      editConfig: {
        trigger: 'click'
      },
      scrollY: {
        enabled: true,
        gt: 20
      },
			minHeight: 180,
			round: true,
			showOverflow: true,
    },
		grid: {
			align: 'center',
			border: 'inner',
      stripe: true,
			columnConfig: {
				resizable: true,
			},
      sortConfig: {
        remote: true,
        multiple: true
      },
      editConfig: {
        trigger: 'click'
      },
      scrollY: {
        enabled: true,
        gt: 20
      },
			minHeight: 180,
			// formConfig: {
			// 	// 全局禁用vxe-table的表单配置，使用formOptions
			// 	enabled: false,
			// },
			proxyConfig: {
				autoLoad: true,
				response: {
					result: 'rows',
					total: 'count',
					list: 'rows',
				},
				showActiveMsg: true,
				showResponseMsg: false,
			},
			round: true,
			showOverflow: true,
			size: 'mini',
      pagerConfig: {
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100, 200],
        layouts: ['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Sizes'],
      },
		},
	})
}
