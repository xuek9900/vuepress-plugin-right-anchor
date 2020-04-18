const { path } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData ($page) {
      $page.rightAnchorShowLevel = options.showLevel + 1 || 2
    },
    globalUIComponents: 'RightAnchor'
  }
}
