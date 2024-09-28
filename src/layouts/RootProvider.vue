<template>
  <n-config-provider :locale="lang" :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <n-layout>
              <slot />
            </n-layout>
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import useConfig from "@/hooks/config"
const { lang, theme } = useConfig()
</script>
