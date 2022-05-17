import type { App, Page } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { RightAnchorPluginOptions, RightAnchorPageOptions } from '../client/types'

export const rightAnchorPlugin = (options: RightAnchorPluginOptions) => {
  return (app: App) => {
    // if (app.env.isDev && app.options.bundler.name.endsWith('vite')) {
    //   app.options.bundler.dev = require('vite').mergeConfig(
    //       app.options.bundler.dev,
    //       {
    //         optimizeDeps: {
    //           exclude: ['ts-debounce'],
    //         },
    //       }
    //   )
    // }

    return {
      name: 'vuepress-plugin-right-anchor',

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      extendsPage: (page: Page<{ rightAnchor: RightAnchorPageOptions }>) => {

        const { rightAnchor: frontmatterOptions = {} } = page.frontmatter

        const rightAnchor: RightAnchorPageOptions = {
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

        page.data.rightAnchor = rightAnchor
      },
    }
  }
}
