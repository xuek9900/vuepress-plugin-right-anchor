import { defineComponent, h, ref, onMounted, watch, computed } from 'vue'
import { usePageData, PageHeader, useRoute } from '@vuepress/client'
import { RightAnchorPageOptions } from '../../node/rightAnchorPlugin'
import { getScrollTop, scrollToTitle } from '../utils'
import { debounce } from 'ts-debounce'

import '../styles/vars.css'
import '../styles/right-anchor.css'

export type RightAnchorPageHeader = Omit<PageHeader, 'children'>

export const RightAnchor = defineComponent({
  name: 'RightAnchor',

  setup() {
    const route = useRoute()

    const page = usePageData<{ rightAnchor: RightAnchorPageOptions }>()
    console.log('usePageData', page)
    const { rightAnchor, headers } = page.value
    const { customClass = '', expand, isIgnore } = rightAnchor

    const menuShow = ref(false)
    if (expand.trigger === 'click') menuShow.value = expand.clickModeDefaultOpen

    const scrollTop = ref(0)
    const activeIndex = ref(0)
    const headersList = ref<RightAnchorPageHeader[]>([])

    const filterDataByLevel = (headers: PageHeader[]) => {
      if (headers.length === 0) return;

      headers.forEach((item) => {
        const { showDepth } = rightAnchor
        if (!showDepth || item.level <= showDepth + 1) {
          headersList.value.push({ ...item })
        }
        filterDataByLevel(item.children)
      })
    }

    filterDataByLevel(headers)

    const show = computed(() => !isIgnore && headersList.value.length > 0)

    watch(route, () => {
      console.log('watch route', route)
      filterDataByLevel(headers)
    })

    const onRaMouseover = () => {
      if (expand.trigger === "hover") menuShow.value = true;
    }
    const onRaMouseleave = () => {
      if (expand.trigger === "hover") menuShow.value = false;
    }
    const onBtnClick = () => {
      if (expand.trigger === "click") menuShow.value = !menuShow.value;
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

        }, 100)
      )
    })

    return () => show.value ? h(
      'div',
      {
        class: `right-anchor is-global ${customClass}`,
        onMouseover: onRaMouseover,
        onMouseleave: onRaMouseleave,
      },
      [
        RightAnchorBtnEl(),
        RightAnchorMenuEl()
      ]
    ) : null
  }

})

export default RightAnchor
