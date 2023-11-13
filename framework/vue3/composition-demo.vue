<script setup>
import { ref, onMounted } from "vue";

// 响应式状态
const count = ref(0);

// 需要声明一个同名的 ref
const btn = ref(null);

// 更改状态、触发更新的函数
function increment() {
    count.value++;
}

// 生命周期钩子
onMounted(() => {
    console.log(`计数器初始值为 ${count.value}。`);
    console.log("btn", btn.value);
});
</script>

<template>
    <button ref="btn" @click="increment">点击了：{{ count }} 次</button>
</template>
