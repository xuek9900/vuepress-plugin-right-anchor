<template>
  <div v-if="listData && listData.length > 0" class="page-toc-wrapper" 
    @mouseover="hover = true"
    @mouseleave="hover = false" >

    <ul v-if="hover" class="page-toc-menu">
      <li
        class="page-toc-menu-item"
        v-for="(item, index) in listData"
        :key="index"
        @click="itemClick(index, item.slug)"
        :class="{ active: index === activeIndex, sub: item.level === 3 }"
      >{{ item.title }}</li>
    
    </ul>  
    
    <button v-else="hover" class="page-toc-button">&#9776;</button>

  </div>

</template>

<script>

import debounce from "lodash.debounce";

export default {
  name: "right-anchor",
  data() {
    return {
      listData: [],
      activeIndex: null,
      hover: false,
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

$pageMenuBgColor = dimgray;
$pageMenuTextColor = white;
//$pageMenuBgColor = lightblue;


.page-toc-menu {
  z-index: 1;
  background-color: $pageMenuBgColor;
  margin: 10px 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  
  &-item {
    display: block;
    padding: 4px 16px;
    //font-size: 12px;
    margin-left: -1px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    color: $pageMenuTextColor;

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

.page-toc-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  padding: 8px 0;
  margin: 0;
  top: $navbarHeight;
  max-height: 75vh;
  right: 0;
  overflow-y: auto;
  
  
}
.page-toc-button {
  font-size: 25px;
  color: #fff;
  border-radius: 45%;
  background-color: #00000070;
  border-color: #00000080;
  padding: 10px;
  margin: 25px 20px;
}


@media (max-width: $MQMobile) {
  .page-toc-wrapper {
    display: none;
  }
}
</style>
