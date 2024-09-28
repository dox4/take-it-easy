<template>
  <n-layout-header bordered>
    <n-text>
      <span class="app-layout-sider__title">{{ title }}</span>
    </n-text>
  </n-layout-header>
</template>

<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<style scoped>
.app-layout-sider__title {
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
  padding-left: 24px;
  font-weight: 500;
  font-size: 20px;
}
.n-layout-header {
  justify-content: flex-end;
}
.n-layout-header span {
  cursor: pointer;
}
</style>
