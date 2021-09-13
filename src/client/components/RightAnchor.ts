import { defineComponent, h, ref, onMounted, watch } from 'vue'
import { usePageData, PageHeader, useRoute } from '@vuepress/client'
import { RightAnchorPageOptions } from '../../node/rightAnchorPlugin'
import { getScrollTop, scrollToTitle } from '../utils'
import { debounce } from 'ts-debounce'

import '../styles/vars.css'
import '../styles/right-anchor.css'

export type RightAnchorPageHeaders = Omit<PageHeader, 'children'>[]

export const RightAnchor = defineComponent({
  name: 'RightAnchor',

  setup() {
    const route = useRoute()

    const page = usePageData<{ rightAnchor: RightAnchorPageOptions }>()
    const rightAnchor = ref(page.value.rightAnchor)

    const raShow = ref(!rightAnchor.value.isIgnore)
    const menuShow = ref(false)

    const raCustomClass = ref(rightAnchor.value.customClass ?? '')

    const scrollTop = ref(0)
    const activeIndex = ref(0)
    const headersList = ref<RightAnchorPageHeaders>([])

    const filterDataByLevel = (headers: PageHeader[]) => {
      if (headers.length === 0) return;

      headers.forEach((item) => {
        if (!rightAnchor.value.showDepth || item.level <= rightAnchor.value.showDepth + 1) {
          headersList.value.push({ ...item })
        }
        filterDataByLevel(item.children)
      })
    }

    filterDataByLevel(page.value.headers)

    watch(route, () => {
      headersList.value = []

      const page = usePageData<{ rightAnchor: RightAnchorPageOptions }>()
      rightAnchor.value = page.value.rightAnchor

      filterDataByLevel(page.value.headers)
    })

    watch(rightAnchor, (state) => {
      raShow.value = !state.isIgnore

      if (state.expand.trigger === 'click') menuShow.value = state.expand.clickModeDefaultOpen
      else menuShow.value = false

      raCustomClass.value = state.customClass ?? ''
    })

    const onRaMouseover = () => {
      if (rightAnchor.value.expand.trigger === "hover") menuShow.value = true;
    }
    const onRaMouseleave = () => {
      if (rightAnchor.value.expand.trigger === "hover") menuShow.value = false;
    }
    const onBtnClick = () => {
      if (rightAnchor.value.expand.trigger === "click") menuShow.value = !menuShow.value;
    }
    const headersListItemClick = (index: number, slug: string) => {
      activeIndex.value = index
      scrollToTitle(slug)
    }

    const RightAnchorBtnEl = () => h(
      'div',
      {
        class: 'right-anchor-button',
        onClick: onBtnClick,
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
    const RightAnchorMenuEl = () => h(
      'ul',
      {
        class: 'right-anchor-menu',
        style: `display: ${menuShow.value ? 'block' : 'none'}`
      },
      headersList.value.map((item, index) =>
        h(
          'li',
          {
            class: `right-anchor-menu-item${item.level > 2 ? ' sub' : ''} h${item.level}${index === activeIndex.value ? ' active' : ''}`,
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

          headersList.value.forEach((item, index) => {
            const elOffsetTop = document.getElementById(item.slug)?.offsetTop
            if (elOffsetTop) {
              if (index === 0 && scrollTop.value < elOffsetTop) activeIndex.value = 0
              else if (scrollTop.value >= elOffsetTop) activeIndex.value = index
            }
          });
        }, 100)
      )
    })

    return () =>
      raShow.value && headersList.value.length > 0
        ?
        h(
          'div',
          {
            class: `right-anchor is-global ${raCustomClass.value}`,
            onMouseover: onRaMouseover,
            onMouseleave: onRaMouseleave,
          },
          [
            RightAnchorBtnEl(),
            RightAnchorMenuEl()
          ]
        )
        :
        null
  }
})

export default RightAnchor
