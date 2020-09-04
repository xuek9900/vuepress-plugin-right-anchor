const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData($page) {
      const { showLevel, ignore = [] } = options

      $page.rightAnchor = {
        isIgnore: ignore.includes($page.regularPath),
        showLevel: showLevel ? showLevel + 1 : null
      }
    },
    globalUIComponents: 'RightAnchor'
  }
}
