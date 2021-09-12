import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
export interface RightAnchorPluginOptions {
  showDepth?: number
  ignore?: string[]
  expand: {
    trigger: 'hover' | 'click'
    clickModeDefaultOpen: boolean
  }
  customClass?: string
}

export const rightAnchorPlugin: Plugin<RightAnchorPluginOptions> = (options = {}) => {
  return {
    name: 'vuepress-plugin-right-anchor',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/RightAnchor.js'
    ),

    extendsPageData: (page) => {
      const { rightAnchor: frontmatterOptions = {} } = page.frontmatter

      const rightAnchor: RightAnchorPluginOptions = {
        ...options,
        ...frontmatterOptions as any,
        isIgnore: Array.isArray(options.ignore) && options.ignore.includes((page as any).path),
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true,
          ...options.expand,
          ...(frontmatterOptions as any).expand,
        },
      }

      return {
        rightAnchor
      }
    },
  }
}
