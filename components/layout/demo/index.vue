<template>
  <template v-if="iframeName === 'fixed-sider'">
    <FixedSider />
  </template>
  <template v-else-if="iframeName === 'fixed-header'">
    <Fixed />
  </template>
  <template v-else-if="iframeName === 'sider'">
    <Side />
  </template>
  <template v-else-if="iframeName === 'custom-sider-icon'">
    <CustomSiderIcon></CustomSiderIcon>
  </template>
  <demo-sort v-else :cols="1">
    <basic />
    <top />
    <top-side2 />
    <top-side />
    <Side />
    <custom-trigger />
    <responsive />
    <FixedSider />
    <Fixed />
    <CustomSiderIcon></CustomSiderIcon>
  </demo-sort>
</template>

<script>
import Basic from './basic.vue';
import CustomTrigger from './custom-trigger.vue';
import Responsive from './responsive.vue';
import TopSide2 from './top-side-2.vue';
import TopSide from './top-side.vue';
import Top from './top.vue';
import FixedSider from './fixed-sider.vue';
import Fixed from './fixed.vue';
import Side from './side.vue';
import CustomSiderIcon from './custom-sider-icon.vue';

import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent, provide } from 'vue';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    CustomTrigger,
    Responsive,
    TopSide2,
    TopSide,
    Top,
    FixedSider,
    Fixed,
    Side,
    CustomSiderIcon,
  },
  props: {
    iframeName: String,
  },
  setup(props) {
    provide(
      'iframeDemo',
      !props.iframeName
        ? {
            'fixed-sider': '/iframe/layout/#fixed-sider',
            'fixed-header': '/iframe/layout/#fixed-header',
            sider: '/iframe/layout/#sider',
            'custom-sider-icon': '/iframe/layout/#custom-sider-icon',
          }
        : {},
    );
  },
  // props: {
  //   iframeName: String,
  // },
  // created() {
  //   provide(
  //     'iframeDemo',
  //     !this.iframeName
  //       ? {
  //           'fixed-sider': '/iframe/layout/#fixed-sider',
  //           'fixed-header': '/iframe/layout/#fixed-header',
  //           sider: '/iframe/layout/#sider',
  //         }
  //       : {},
  //   );
  // },
});
</script>
