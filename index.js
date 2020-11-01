const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData($page) {
      const { rightAnchor: frontmatterOptions = {} } = $page.frontmatter

      $page.rightAnchor = {
        ...options,
        ...frontmatterOptions,
        isIgnore: Array.isArray(options.ignore) && options.ignore.includes($page.regularPath),
        expand: {
          default: true,
          trigger: 'hover',
          ...options.expand,
          ...frontmatterOptions.expand
        },
      }

      // TODO: Delete below when no longer support `showLevel`
      $page.rightAnchor.showDepth = $page.rightAnchor.showLevel
    },
    globalUIComponents: 'RightAnchor'
  }
}
