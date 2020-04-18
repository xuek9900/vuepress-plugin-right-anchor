<template>
  <ul class="right-anchor">
    <li
      class="right-anchor-item"
      v-for="(item, index) in listData"
      :key="index"
      @click="itemClick(index, item.slug)"
      :class="{ active: index === activeIndex }"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  name: "right-anchor",
  data() {
    return {
      listData: [],
      activeIndex: null,
      curPagePath: null
    };
  },
  watch: {
    "$page.regularPath": function(newVal) {
      this.filterDataByLevel(newVal);
    }
  },
  methods: {
    itemClick(index, slug) {
      this.activeIndex = index;

      window.scrollTo({
        top: document.getElementById(slug).offsetTop,
        behavior: "smooth"
      });
    },
    filterDataByLevel(curPagePath) {
      this.listData = [];

      if (this.$page.rightAnchor.isIgnore) return;

      let data = [];

      for (let i in this.$site.pages) {
        if (this.$site.pages[i].regularPath === curPagePath) {
          data = this.$site.pages[i].headers || [];
        }
      }

      data.map(item => {
        if (item.level === this.$page.rightAnchor.showLevel)
          this.listData.push(item);
      });

      this.$nextTick(() =>
        this.listData.map(
          item =>
            (item.offsetTop = document.getElementById(item.slug).offsetTop)
        )
      );
    },
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    }
  },
  mounted() {
    window.addEventListener(
      "scroll",
      debounce(() => {
        const scrollTop = this.getScrollTop();

        this.listData.map((item, index) => {
          if (scrollTop >= item.offsetTop) this.activeIndex = index;
        });
      }, 100)
    );
    this.filterDataByLevel();
  }
};
</script>

<style lang="stylus" scoped>
.right-anchor {
  position: fixed;
  padding: 0;
  top: 84px;
  right: 0;
  min-width: 132px;
  border-left: 1px solid #ccc;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.7);

  &-item {
    display: block;
    padding: 4px 16px;
    font-size: 12px;
    margin-left: -1px;
    text-decoration: none;
    display: block;
    color: #333;

    &:hover, &.active {
      color: $accentColor;
      border-left: 1px solid $accentColor;
    }
  }
}
</style>