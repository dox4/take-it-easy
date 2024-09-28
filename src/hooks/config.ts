import { enUS, zhCN, darkTheme } from "naive-ui"
import type { GlobalTheme } from "naive-ui"

import { ref } from "vue"
const theme = ref<GlobalTheme | null>(null)
const lang = ref(zhCN)
const changeTheme = () => {
  if (theme.value === null) {
    theme.value = darkTheme as GlobalTheme
  } else {
    theme.value = null
  }
}
const changeLang = () => {
  if (lang.value.name === "zh-CN") {
    lang.value = enUS
  } else {
    lang.value = zhCN
  }
}

export default () => {
  return {
    theme,
    lang,
    changeTheme,
    changeLang,
  }
}
