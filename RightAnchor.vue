<template>
  <div
    v-if="visible"
    class="ra-wrapper"
    :class="[rightAnchorOption.customClass, global && 'is-global']"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <div
      v-if="!expandOption.default || expandOption.trigger === 'click'"
      class="ra-button"
      @click="btnClick"
    >
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
          class=""
        />
      </svg>
    </div>
    <ul v-if="expanded" class="ra-menu">
      <li
        class="ra-menu-item"
        v-for="(item, index) in listData"
        :key="index"
        @click="itemClick(index, item.slug)"
        :class="{ active: index === activeIndex, sub: item.level === 3 }"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import throttle from "lodash.throttle";

export default {
  name: "right-anchor",
  props: {
    global: Boolean
  },
  data() {
    return {
      listData: [],
      activeIndex: null,
      expanded: true,
    };
  },
  watch: {
    "$page.regularPath"() {
      this.filterDataByLevel();
    },
  },
  computed: {
    visible () {
      return this.listData &&
      this.listData.length &&
      !(this.rightAnchorOption.disableGlobalUI && this.global)
    },
    rightAnchorOption() {
      return this.$page.rightAnchor;
    },
    expandOption() {
      return this.$page.rightAnchor?.expand
    },
  },
  methods: {
    mouseover() {
      if (this.expandOption.trigger === "hover" && !this.expandOption.default) {
        this.expanded = true;
      }
    },
    mouseleave() {
      if (this.expandOption.trigger === "hover" && !this.expandOption.default) {
        this.expanded = false;
      }
    },
    btnClick() {
      if (this.expandOption.trigger === "click") {
        this.expanded = !this.expanded;
      }
    },
    itemClick(index, slug) {
      this.activeIndex = index;

      window.scrollTo({
        top: document.getElementById(slug).offsetTop,
        behavior: "smooth",
      });
    },
    filterDataByLevel() {
      this.listData = [];

      const { headers } = this.$page;
      const { isIgnore, showDepth } = this.rightAnchorOption;

      if (isIgnore || showDepth === 0 || !headers) return;

      if (!showDepth) {
        this.listData = JSON.parse(JSON.stringify(headers));
      } else {
        headers.forEach((item) => {
          if (item.level <= showDepth + 1) {
            this.listData.push(JSON.parse(JSON.stringify(item)));
          }
        });
      }

      this.$nextTick(() => {
        this.listData.forEach((item) => {
          this.getEleById(item.slug).then((el) => {
            item.offsetTop = el.offsetTop;
          });
        });
      });
    },
    getEleById(id) {
      return new Promise((resolve) => {
        const t = setInterval(() => {
          const el = document.getElementById(id);
          if (el) {
            clearInterval(t);
            resolve(el);
          }
        }, 100);
      });
    },
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },
  },
  created() {
    this.expanded = this.expandOption?.default;
  },
  mounted() {
    this.filterDataByLevel();

    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrollTop = this.getScrollTop();

        this.listData.map((item, index) => {
          if (item.offsetTop && scrollTop >= item.offsetTop)
            this.activeIndex = index;
        });
      }, 100)
    );
  },
};
</script>

<style lang="stylus" scoped>
$rightAnchorBgColor ?= #fff;
$rightAnchorTextColor ?= $textColor;
$rightAnchorFontSize ?= 14px;

.ra {
  &-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0;
    max-height: 75vh;

    &.is-global {
      position: fixed;
      top: $navbarHeight;
      right: 0;
      z-index: 1;

      .ra-menu {
        align-items: center;
      }
    }
  }

  &-button {
    cursor: pointer;
    margin-left: calc(100% - 1.75rem - 0.8rem * 2);
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.8rem;
    color: $rightAnchorTextColor;

    .icon {
      width: 1.75rem;
      height: 1.75rem;
    }

    &:hover {
      color: $accentColor;
    }
  }

  &-menu {
    padding: 12px 0 12px 0;
    background-color: $rightAnchorBgColor;
    border-left: 1px solid $borderColor;
    font-size: $rightAnchorFontSize;
    overflow-y: auto;
    max-height: calc(100% - 1.75rem - 0.8rem * 2);
    margin: 0;

    &-item {
      display: block;
      padding: 4px 12px 4px 24px;
      margin-left: -1px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      color: $rightAnchorTextColor;

      &.sub {
        padding: 2px 12px 2px 32px;
      }

      &:hover, &.active {
        color: $accentColor;
        border-left: 2px solid $accentColor;
        padding-left: 22px;

        &.sub {
          padding-left: 30px;
        }
      }
    }
  }

  @media (max-width: $MQMobile) {
    .ra-wrapper {
      display: none;
    }
  }
}
</style>
