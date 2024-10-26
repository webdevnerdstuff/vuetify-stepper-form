<template>
	<v-row>
		<v-col
			id="validation"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#validation"
				>#</a>
				Validation
			</h2>
		</v-col>

		<v-col cols="12">
			The Stepper Form in uses <a
				:href="links.veeValidate"
				nofollow
				target="_blank"
			>VeeValidate</a> to handle form validation, providing seamless support for both Yup and Zod
			schemas. This integration allows developers to choose their preferred validation schema, leveraging VeeValidate's
			features for streamlined, customizable validation and error handling across all form steps.
		</v-col>

		<v-col cols="12">
			For more information on how to use VeeValidate, refer to the <a
				:href="links.veeValidate"
				nofollow
				target="_blank"
			>VeeValidate documentation</a>.
		</v-col>

		<v-col
			id="validation-schemas"
			cols="12"
		>
			<h3 :class="classes.h3">
				<a
					:class="classes.headerA"
					href="#validation-schemas"
				>#</a>
				Schemas
			</h3>
		</v-col>

		<v-col cols="12">
			The Stepper Form makes validation easy by supporting both <a
				:href="links.yup"
				nofollow
				target="_blank"
			>Yup</a> and <a
				:href="links.zod"
				nofollow
				target="_blank"
			>Zod</a> schemas. This
			flexibility lets developers choose the validation style that fits their needs, using Yup's classic schema or Zod's
			modern type-safe approach. With this dual support, creating custom rules and handling errors becomes
			straightforward, making the form adaptable for different projects.
		</v-col>

		<v-col
			id="validation-yup"
			class="pb-0"
			cols="12"
		>
			<h4 :class="classes.h4">
				<a
					:class="classes.headerA"
					href="#validation-yup"
				>#</a>
				Conditional Validation with Yup
			</h4>
		</v-col>

		<v-col cols="12">
			Conditional validation can be managed using the <code class="ic">when</code> functionality provided by Yup for
			validation. This allows you to dynamically validate and fields based on the values of other fields in
			the form. By leveraging this feature, you can create flexible, conditional logic within your stepper form. For
			detailed guidance, refer to the <a
				:href="links.yupWhen"
				nofollow
				target="_blank"
			>Yup documentation</a>.
		</v-col>

		<v-col
			id="validation-zod"
			class="pb-0"
			cols="12"
		>
			<h4 :class="classes.h4">
				<a
					:class="classes.headerA"
					href="#validation-zod"
				>#</a>
				Conditional Validation with Zod
			</h4>
		</v-col>

		<v-col
			class="mb-6"
			cols="12"
		>
			Zod supports conditional validation through the <code class="ic">superRefine</code> function, which lets you
			validate fields based on other values in the form. While this approach requires additional setup, it provides
			powerful, flexible logic for multi-step forms. For more details, refer to the <a
				:href="`${links.zod}?id=superrefine`"
				nofollow
				target="_blank"
			>Zod documentation</a>.
		</v-col>
	</v-row>

</template>

<script setup>
import { inject } from 'vue';

const classes = inject('classes');
const links = inject('links');
</script>

<style lang="scss" scoped></style>
