const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData($page) {
      if (!$page.frontmatter.rightAnchor) {
        const { showDepth = null, showLevel = null, ignore = [], customClass = null } = options

        $page.rightAnchor = {
          isIgnore: ignore.includes($page.regularPath),
          showDepth: showDepth || showLevel,
          customClass
        }
      }
    },
    globalUIComponents: 'RightAnchor'
  }
}
