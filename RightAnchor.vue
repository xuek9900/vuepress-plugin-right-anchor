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
      activeIndex: null
    };
  },
  watch: {
    "$page.regularPath": function() {
      this.filterDataByLevel();
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
    filterDataByLevel() {
      this.listData = [];

      if (this.$page.rightAnchor.isIgnore || !this.$page.headers) return;

      this.$page.headers.map(item => {
        if (item.level === this.$page.rightAnchor.showLevel)
          this.listData.push(item);
      });

      this.$nextTick(() => {
        this.listData.map(item => {
          this.getEleById(item.slug).then(
            el => (item.offsetTop = el.offsetTop)
          );
        });
      });
    },
    getEleById(id) {
      return new Promise(res => {
        const t = setInterval(() => {
          const el = document.getElementById(id);
          if (el) {
            clearInterval(t);
            res(el);
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
    }
  },
  mounted() {
    this.filterDataByLevel();

    window.addEventListener(
      "scroll",
      debounce(() => {
        const scrollTop = this.getScrollTop();

        this.listData.map((item, index) => {
          if (item.offsetTop && scrollTop >= item.offsetTop)
            this.activeIndex = index;
        });
      }, 300)
    );
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
  border-left: 1px solid #eaecef;
  z-index: 100;

  &-item {
    display: block;
    padding: 4px 16px;
    font-size: 12px;
    margin-left: -1px;
    text-decoration: none;
    display: block;
    color: $textColor;
    cursor: pointer;

    &:hover, &.active {
      color: $accentColor;
      border-left: 1px solid $accentColor;
    }
  }
}
</style>