const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData($page) {
      if (!$page.frontmatter.rightAnchor) {

        const defaultExpand = {
          default: true,
          trigger: 'hover'
        }

        const { showDepth = null, showLevel = null, ignore = [], expand = defaultExpand, customClass = null } = options

        $page.rightAnchor = {
          isIgnore: ignore.includes($page.regularPath),
          showDepth: showDepth || showLevel,
          expand,
          customClass
        }
      }
    },
    globalUIComponents: 'RightAnchor'
  }
}
