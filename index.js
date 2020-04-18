const { path } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData($page) {
      $page.rightAnchor = {
        isIgnore: options.ignore.includes($page.regularPath),
        showLevel: options.showLevel + 1 || 2,
      }
    },
    globalUIComponents: 'RightAnchor'
  }
}
