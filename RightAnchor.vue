<template>
  <ul class="right-anchor">
    <li
      class="right-anchor-item"
      v-for="(item, index) in listData"
      :key="index"
      @click="itemClick(index, item.slug)"
      :class="{ active: index === activeIndex, sub: item.level === 3 }"
    >{{ item.title }}</li>
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
    };
  },
  watch: {
    "$page.regularPath": function () {
      this.filterDataByLevel();
    },
  },
  methods: {
    itemClick(index, slug) {
      this.activeIndex = index;

      window.scrollTo({
        top: document.getElementById(slug).offsetTop,
        behavior: "smooth",
      });
    },
    filterDataByLevel() {
      this.listData = [];

      if (this.$page.rightAnchor.isIgnore || !this.$page.headers) return;

      if (this.$page.rightAnchor.showLevel === null) {
        this.listData = JSON.parse(JSON.stringify(this.$page.headers));
      } else {
        this.$page.headers.forEach((item) => {
          if (item.level === this.$page.rightAnchor.showLevel) {
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
  },
};
</script>

<style lang="stylus" scoped>
.right-anchor {
  position: fixed;
  padding: 8px 0;
  margin: 0;
  top: $navbarHeight;
  max-height: 75vh;
  right: 0;
  min-width: 132px;
  border-left: 1px solid #eaecef;
  background-color: $rightAnchorBgColor;
  overflow-y: auto;
  z-index: 1;

  &-item {
    display: block;
    padding: 4px 16px;
    font-size: 12px;
    margin-left: -1px;
    text-decoration: none;
    display: block;
    cursor: pointer;

    &.sub {
      padding-left: 24px;
    }

    &:hover,
    &.active {
      color: $accentColor;
      border-left: 1px solid $accentColor;
      padding-left: 15px;

      &.sub {
        padding-left: 23px;
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .right-anchor {
    display: none;
  }
}
</style>
