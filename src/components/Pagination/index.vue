<style lang="scss" scoped>
#pagination {
  position: relative;
  margin: 20px 0;
  text-align: center;
}
</style>

<style lang="scss">
.el-pagination {
  position: relative;
  padding: 0 80px;

  .el-pager li,
  button {
    width: 40px;
    height: 40px;
    padding: 0 !important;
    border: 1px solid $color-border--opacity-1;
    line-height: 38px;
    @include border-radius(50%);
    &:hover {
      background-color: $color-theme-opacity-2;
    }
  }
  .el-pager {
    margin: 0 10px;
    li {
      & + li {
        margin-left: 7px;
      }
      &.active {
        color: #c00;
      }
    }
  }
}
</style>

<template lang="pug">
#pagination
  el-pagination(
    :page-size="10"
    :page-sizes="[10, 20, 30,]"
    :current-page.sync="data.page"
    layout="sizes, prev, pager, next"
    :total="data.total"
    @size-change="sizeChange"
    @current-change="currentChange"
  )
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    sizeChange(size) {
      console.log(`${size} items per page`);
      this.$emit("sizeChange", size);
    },
    currentChange(page) {
      console.log(`currentChange :: ${page}`);
      this.$emit("currentChange", page);
    },
  },
};
</script>
