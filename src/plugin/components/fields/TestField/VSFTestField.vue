<template>
	<v-text-field v-model="modelValue"></v-text-field>
</template>

<script setup lang="ts">
const modelValue = ref('test');

const { foo } = defineProps(['foo']);

console.log('foo', foo);
</script>

<style lang="scss" scoped></style>
