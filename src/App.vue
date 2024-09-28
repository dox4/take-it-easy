<script setup lang="ts">
import LayoutHeader from './layouts/LayoutHeader.vue';
import LayoutMain from './layouts/LayoutMain.vue';
import RootProvider from './layouts/RootProvider.vue';

const title = "Take It Easy"
</script>
<template>
  <root-provider>
    <layout-header :title="title"></layout-header>
    <layout-main></layout-main>
  </root-provider>
</template>
