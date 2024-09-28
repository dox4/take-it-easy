<template>
  <n-layout has-sider>
    <n-layout-sider bordered content-style="padding: 24px">
      <n-menu
        :value="active"
        :options="menuOptions"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        @update:value="handleMenuSelect"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import router from "@/router"
import type { MenuOption } from "naive-ui"
import { ref } from "vue"

const menuOptions: MenuOption[] = [
  {
    label: "Cidr计算器",
    key: "/cidr",
  },
]
menuOptions.push({
  label: "About",
  key: "/about",
})

const active = ref("")
const handleMenuSelect = (to: string) => {
  active.value = to
  router.push(to)
}
</script>
