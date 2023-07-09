import { type App } from 'vue'
import { loadElementPlus } from './element-plus'
import { loadElementPlusIcon } from './element-plus-icon'
import { loadVxeTable } from './vxe-table'
import { loadSvg } from './svg-icons'
export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
  loadVxeTable(app)
  loadSvg(app)
}
