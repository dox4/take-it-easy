import { enUS, zhCN, darkTheme } from "naive-ui"
import type { NLocale, GlobalTheme } from "naive-ui"

import { ref, type Ref } from "vue"
const theme: Ref<GlobalTheme | null> = ref<GlobalTheme | null>(null)
const lang: Ref<NLocale> = ref(zhCN)
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
