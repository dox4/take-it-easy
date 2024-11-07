<script setup lang="ts">
import { ref } from "vue"
import { Address4, Address6 } from "ip-address"

const ipCount = (cidr: Address4 | Address6) => {
  const exp = (cidr.v4 ? 32 : 128) - cidr.subnetMask
  return exp >= 53 ? 2n ** BigInt(exp) : BigInt(2 ** exp)
}
class ParseCidrInfo {
  canonical: string = ""
  gateway: string = "" // default gateway
  available1: string = "" // first available ip address, ip address next to gateway
  available0: string = "" // last available ip address, previous to broadcast
  broadcast: string = "" // broadcast ip
  count: string = "" // ip count in cidr
  available: string = "" // available ip count in cidr
  update(cidr: Address4 | Address6) {
    const cnt = ipCount(cidr)
    const start = cidr.startAddress()
    this.canonical = start.correctForm() + "/" + cidr.subnetMask
    this.gateway = start.correctForm()
    this.available1 = cnt < 3 ? "-" : cidr.startAddressExclusive().correctForm()
    this.available0 = cnt < 3 ? "-" : cidr.endAddressExclusive().correctForm()
    this.broadcast = cidr.endAddress().correctForm()
    this.count = cnt.toLocaleString()
    this.available = (cnt > 3 ? cnt - 3n : 0n).toLocaleString()
  }
}
const info = ref(new ParseCidrInfo())
const maybeV6 = (cidr: string) => cidr.includes(":")
const tryParse = (cidr: string) => {
  if (maybeV6(cidr)) {
    try {
      return new Address6(cidr)
    } catch (e) {
      return null
    }
  } else {
    try {
      return new Address4(cidr)
    } catch (e) {
      return null
    }
  }
}

const parseCidr = (value: string) => {
  if (!value) return
  if (!value.includes("/")) return
  const cidr = tryParse(value)
  if (cidr === null) return
  if (!cidr.isCorrect()) return
  info.value.update(cidr)
}
</script>
<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi> </n-gi>
    <n-gi :span="2">
      <n-h2 class="centered-text"> CIDR 计算器 </n-h2>
      <n-divider></n-divider>
      <n-flex vertical>
        <n-input-group>
          <n-input-group-label> CIDR </n-input-group-label>
          <n-input
            class="width-with-label"
            clearable
            placeholder="e.g. 192.168.0.0/24"
            :on-update:value="parseCidr"
          ></n-input>
        </n-input-group>
        <n-divider></n-divider>
        <n-input-group>
          <n-input-group-label class="input-label"> 标准形式 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.canonical"></n-input>
        </n-input-group>
        <n-input-group>
          <n-input-group-label class="input-label"> 默认网关 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.gateway"></n-input>
        </n-input-group>
        <n-input-group>
          <n-input-group-label class="input-label"> 第一个可用地址 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.available1"></n-input>
        </n-input-group>
        <n-input-group>
          <n-input-group-label class="input-label"> 最后一个可用地址 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.available0"></n-input>
        </n-input-group>
        <n-input-group>
          <n-input-group-label class="input-label"> 广播地址 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.broadcast"></n-input>
        </n-input-group>
        <n-input-group>
          <n-input-group-label class="input-label"> 总IP数量 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.count"></n-input>
        </n-input-group>
        <n-input-group>
          <n-input-group-label class="input-label"> 可用IP数量 </n-input-group-label>
          <n-input class="width-with-label" disabled placeholder="" v-model:value="info.available"></n-input>
        </n-input-group>
      </n-flex>
    </n-gi>
    <n-gi> </n-gi>
  </n-grid>
</template>

<style scoped>
.centered-text {
  text-align: center;
}

.input-label {
  width: 35%;
}

.width-with-label {
  min-width: 128px;
}
</style>
