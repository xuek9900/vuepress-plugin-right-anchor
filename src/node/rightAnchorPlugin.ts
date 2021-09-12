import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type RightAnchorPluginOptions = Record<any, any>

export const rightAnchorPlugin: Plugin<RightAnchorPluginOptions> = (options = {}) => {
  return {
    name: 'vuepress-plugin-right-anchor',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    extendPageData: (page) => {
      const { rightAnchor: frontmatterOptions = {} } = page.frontmatter

      const rightAnchor = {
        ...options,
        ...frontmatterOptions,
        isIgnore: Array.isArray(options.ignore) && options.ignore.includes(page.regularPath),
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true,
          ...options.expand,
          ...frontmatterOptions.expand
        },
      }

      return {
        rightAnchor
      }
    },
  }
}
