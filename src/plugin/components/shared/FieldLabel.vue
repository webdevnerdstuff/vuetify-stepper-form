<template>
	<div>
		<span v-html="label" /> <span
			v-if="required"
			class="text-error ms-1"
		>*</span>
	</div>
</template>


<script lang="ts" setup>
export interface FieldLabelProps {
	label: string | undefined;
	required: boolean | undefined;
}

const { label, required = false } = defineProps<FieldLabelProps>();
</script>
