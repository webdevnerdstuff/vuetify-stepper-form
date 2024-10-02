<template>
	<div>
		{{ label }} <span
			v-if="required"
			class="text-error ms-1"
		>*</span>
	</div>
</template>


<script lang="ts" setup>
const { label, required = false } = defineProps<{
	label: string | undefined;
	required?: boolean;
}>();
</script>
