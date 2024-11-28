<template>
	<v-row>
		<v-col
			id="description"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#description"
				>#</a>
				Description
			</h2>
		</v-col>

		<v-col cols="12">
			The Vuetify Stepper Form plugin provides a structured way to create multi-step forms using Vue 3, TypeScript, and
			Vuetify. It features a stepper layout that allows users to navigate between steps with form validation. The plugin
			is customizable and streamlines building dynamic, interactive forms that guide users through sequential steps.
		</v-col>

	</v-row>
</template>

<script setup lang="ts">
const classes = inject<Docs.GlobalClasses>('classes')!;
</script>
