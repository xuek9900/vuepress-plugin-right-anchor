import { defineClientAppEnhance } from '@vuepress/client'
import {RightAnchor} from './components'

export default defineClientAppEnhance(({ app }) => {
  app.component(RightAnchor.name, RightAnchor)
})
