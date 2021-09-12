import { defineComponent, h, Transition, onBeforeMount } from 'vue'
import { usePageData, defineClientAppEnhance } from '@vuepress/client'
import { getScrollTop, scrollToTop } from '../utils'

import '../styles/vars.css'
import '../styles/right-anchor.css'

export const RightAnchor = defineComponent({
  name: 'RightAnchor',

  setup() {
    onBeforeMount(() => {
      const page = usePageData<{ rightAnchor: any }>()
      console.log(page.value, page.value.rightAnchor, page.value.headers)
    }) 

    const RightAnchorEl = h('div', { class: 'right-anchor' })

    return () =>
      h(
        Transition,
        {
          name: 'right-anchor',
        },
        {
          default: () => RightAnchorEl,
        }
      )
  },
})
