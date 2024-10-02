<template>
	{{ label }} <span
		v-if="required"
		class="text-error ms-1"
	>*</span>
</template>


<script lang="ts" setup>
const { label, required = false } = defineProps<{
	label: string | undefined;
	required?: boolean;
}>();
</script>
