import { defineComponent, h, ref, onMounted, computed } from 'vue'
import { usePageData, PageHeader } from '@vuepress/client'
import { RightAnchorPluginOptions } from '../../node/rightAnchorPlugin'
import { getScrollTop, scrollToTitle } from '../utils'
import { debounce } from 'ts-debounce'

import '../styles/vars.css'
import '../styles/right-anchor.css'

export type RightAnchorPageHeader = Omit<PageHeader, 'children'>

export const RightAnchor = defineComponent({
  name: 'RightAnchor',

  setup() {
    const page = usePageData<{ rightAnchor: RightAnchorPluginOptions }>()
    const { rightAnchor, headers } = page.value
    const { customClass = '', expand } = rightAnchor

    const menuShow = ref(false)
    if (expand.trigger === 'click') menuShow.value = expand.clickModeDefaultOpen

    const scrollTop = ref(0)
    const activeIndex = ref(0)
    const headersList = ref<RightAnchorPageHeader[]>([])

    const filterDataByLevel = (headers: PageHeader[]) => {
      if (headers.length === 0) return;

      headers.forEach((item) => {
        const { ignore, showDepth } = rightAnchor
        if (!ignore && (!showDepth || item.level <= showDepth + 1)) {
          headersList.value.push({ ...item })
        }
        filterDataByLevel(item.children)
      })
    }

    filterDataByLevel(headers)

    const onbtnMouseover = () => {
      if (expand.trigger === "hover") menuShow.value = true;
      console.log('onbtnMouseover', menuShow.value)
    }
    const onbtnMouseleave = () => {
      if (expand.trigger === "hover") menuShow.value = false;
      console.log('onbtnMouseleave', menuShow.value)
    }
    const onBtnClick = () => {
      if (expand.trigger === "click") menuShow.value = !menuShow.value;
      console.log('onBtnClick', menuShow.value)
    }
    const headersListItemClick = (index: number, slug: string) => {
      activeIndex.value = index
      scrollToTitle(slug)
      console.log('headersListItemClick', activeIndex.value)
    }

    const RightAnchorBtnEl = () => h(
      'div',
      {
        class: 'right-anchor-button',
        onClick: onBtnClick,
        onMouseover: onbtnMouseover,
        onMouseleave: onbtnMouseleave,
        innerHTML: `
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 448 512"
>
  <path
    fill="currentColor"
    d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
  />
</svg>`
      }
    )
    const RightAnchorMenuEl = h(
      'ul',
      {
        class: 'right-anchor-menu',
        // style: `display: ${menuShow.value ? 'block' : 'none'}`
      },
      headersList.value.map((item, index) =>
        h(
          'li',
          {
            class: `right-anchor-menu-item ${item.level > 2 ? 'sub' : ''} h${item.level} ${index === activeIndex.value ? 'active' : ''}`,
            onClick: () => headersListItemClick(index, item.slug)
          },
          item.title
        )
      )
    )

    onMounted(() => {
      scrollTop.value = getScrollTop()

      window.addEventListener(
        'scroll',
        debounce(() => {
          scrollTop.value = getScrollTop()
        }, 100)
      )
    })

    return () => h(
      'div',
      { class: `right-anchor is-global ${customClass}` },
      [
        RightAnchorBtnEl(),
        computed(() => menuShow.value).value && RightAnchorMenuEl
      ]
    )
  }

})

export default RightAnchor
