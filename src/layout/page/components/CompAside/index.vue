<style lang="scss" scoped>
.c-quick {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  width: 250px;
  height: 100%;
  padding: 17px 20px;
  &__inner {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    .sec {
      padding: 10px;
      @include border-radius(15px);
    }
  }
  &__top {
    display: flex;
    justify-content: space-between;
    height: 33px;
    a {
      display: flex;
      width: 33px;
      height: 33px;
      justify-content: center;
      align-items: center;
      background-color: $color-bg;
      color: $color-txt-opacity-5;
      @include border-radius(50%);
    }
  }
  &__weather {
    overflow: hidden;
    position: relative;
    min-height: 148px;
    margin-top: 15px;
    padding: 17px 20px;
    background-color: $color-theme-sub;
    color: $color-bg;
    font-size: 11px;
    letter-spacing: 1px;
    @include border-radius(15px);

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 100%;
      width: 120px;
      height: 120px;
      margin: -75px 0 0 -75px;
      border: 20px solid $color-bg-opacity-1;
      @include border-radius(50%);
      @include box-sizing;
    }

    a {
      position: absolute;
      top: 17px;
      right: 15px;
      z-index: 2;
      color: $color-bg;
    }
    dl {
      dt {
        margin-bottom: 10px;
      }
      dd {
        & + dd {
          margin-top: 5px;
        }
        &.type--number {
          display: flex;
          justify-content: space-between;
          position: relative;
          width: 100%;
          p {
            vertical-align: middle;
            & + p {
              margin-left: 30px;
              &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 6px;
                height: 6px;
                background-color: $color-bg;
                @include border-radius(50%);
              }
            }
          }
        }
        &.type--weather {
          padding-top: 8px;
          border-top: 1px solid $color-bg-opacity-5;
          .time-list {
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
            justify-content: space-between;
            li {
              position: relative;
              &::after {
                display: block;
                text-align: center;
              }
              &:nth-child(1)::after {
                content: "9";
              }
              &:nth-child(2)::after {
                content: "12";
              }
              &:nth-child(3)::after {
                content: "15";
              }
              &:nth-child(4)::after {
                content: "18";
              }
            }
          }
        }
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 90px;
        height: 90px;
        background-color: $color-bg-opacity-1;
        @include border-radius(20px);
      }
      &::before {
        bottom: 80%;
        left: 70%;
      }
      &::after {
        top: 80%;
        right: 70%;
      }
    }
  }
}
</style>
<style lang="scss">
.el-scrollbar.pst--scroll {
  overflow: visible;
  > .el-scrollbar__bar.is-vertical {
    right: -10px;
  }
}
.el-badge__content {
  right: 13px !important;
  font-size: 10px;
}
</style>

<template lang="pug">
.c-quick
  .c-quick__inner
    .c-quick__top
      el-badge(v-for="item of utilList" :value="item.value" :max="9")
        a(href="javascript:;" :class="item.class" :title="item.name" @click="item.act") #[mdicon(:name="item.icon" size="15")]
    .c-quick__weather
      dl
        dt Weather Info
        dd.type--number
          el-tooltip(content="현재 수온" placement="bottom" effect="light")
            p #[strong 9.1] #[span ℃]
          el-tooltip(content="현재 기온" placement="bottom" effect="light")
            p #[strong 20] #[span ℃]
        dd.type--weather
          ul.time-list
            li(v-for="item of timeList") #[mdicon(:name="item.icon" size="30")]
      a(href="javascript:;" title="More") #[mdicon(name="dots-horizontal" size="15")]
    QuickDevice(title="My Device")
</template>

<script>
import QuickDevice from "@/components/QuickDevice.vue";

export default {
  name: "MyDevice",
  components: {
    QuickDevice,
  },
  data() {
    return {
      utilList: [
        {
          name: "Search",
          class: "btn-search",
          icon: "magnify",
          value: "",
          act: () => {
            alert("Search");
          },
        },
        {
          name: "Noti",
          class: "btn-noti",
          icon: "bell-outline",
          value: 1,
          act: () => {
            alert("Noti");
          },
        },
        {
          name: "Account",
          class: "btn-account",
          icon: "account-settings",
          value: 10,
          act: () => {
            alert("Account");
          },
        },
      ],
      timeList: [
        {
          name: "sunny",
          icon: "weather-sunny",
        },
        {
          name: "cloudy",
          icon: "weather-cloudy",
        },
        {
          name: "dust",
          icon: "weather-dust",
        },
        {
          name: "pouring",
          icon: "weather-pouring",
        },
      ],
    };
  },
  methods: {},
};
</script>
