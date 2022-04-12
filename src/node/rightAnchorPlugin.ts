import type { Page, Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { RightAnchorPluginOptions, RightAnchorPageOptions } from '../client/types'

export const rightAnchorPlugin: Plugin<RightAnchorPluginOptions> = (options = {}, app) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['ts-debounce'],
        },
      }
    )
  }

  return {
    name: 'vuepress-plugin-right-anchor',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/RightAnchor.js'
    ),

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
