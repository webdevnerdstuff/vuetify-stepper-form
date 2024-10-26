<template>
	<VStepperForm
		v-model="answers"
		:pages="pages"
		title="Field Slots"
		@submit="submitForm"
	>
		<template #[`field.foo`]="{ errorMessage, field, blur, change, input, FieldLabel }">
			<v-text-field
				v-model="answers.foo"
				v-bind="field"
				:error="errorMessage"
				:error-messages="errorMessage"
				@blur="blur"
				@change="change"
				@input="input"
			>
				<template #label>
					<component
						:is="FieldLabel"
						:label="field.label"
						:required="!!field.required"
					/>
				</template>
			</v-text-field>
		</template>

		<template #[`field.bar`]="props">
			<v-text-field
				v-model="answers.bar"
				v-bind="props.field"
				:error="props.errorMessage"
				:error-messages="props.errorMessage"
				@blur="props.blur()"
				@change="props.change()"
				@input="props.input()"
			>
				<template #label>
					<component
						:is="props.FieldLabel"
						:label="props.field.label"
						:required="!!props.field.required"
					/>
				</template>
			</v-text-field>
		</template>
	</VStepperForm>

	<AnswersDialog
		v-model="dialog"
		:answers="answers"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnswersDialog from '../AnswersDialog.vue';


const dialog = ref(false);

const answers = ref({
	bar: null,
	foo: null,
});

const pages = [
	{
		fields: [
			{
				label: 'Foo',
				name: 'foo',
				type: 'field',
			},
			{
				label: 'Bar',
				name: 'bar',
				type: 'field',
			},
		],
	},
];

function submitForm() {
	dialog.value = true;
}

const templateCode = `<template>
  <VStepperForm
    v-model="answers"
    :pages="pages"
    title="Field Slots"
    @submit="submitForm"
  >
    <template #[\`field.foo\`]="{ errorMessage, field, blur, change, input, FieldLabel }">
      <v-text-field
        v-model="answers.foo"
        v-bind="field"
        :error="errorMessage"
        :error-messages="errorMessage"
        @blur="blur"
        @change="change"
        @input="input"
      >
        <template #label>
          <component
            :is="FieldLabel"
            :label="field.label"
            :required="!!field.required"
          />
        </template>
      </v-text-field>
    </template>

    <template #[\`field.bar\`]="props">
      <v-text-field
        v-model="answers.bar"
        v-bind="props.field"
        :error="props.errorMessage"
        :error-messages="props.errorMessage"
        @blur="props.blur()"
        @change="props.change()"
        @input="props.input()"
      >
        <template #label>
          <component
            :is="props.FieldLabel"
            :label="props.field.label"
            :required="!!props.field.required"
          />
        </template>
      </v-text-field>
    </template>
  </VStepperForm>
</template>
`;

const scriptCode = `\<script setup\>
import { ref } from 'vue';


const answers = ref({
  bar: null,
  foo: null,
});

const pages = [
  {
    fields: [
      {
        label: 'Foo',
        name: 'foo',
        type: 'field',
      },
      {
        label: 'Bar',
        name: 'bar',
        type: 'field',
      },
    ],
  },
];

function submitForm() {
  // ...do something awesome
}
\</script\>`;

defineExpose({
	exampleCode: {
		desc: 'This example demonstrates how to use the <code class="ic">field</code> slot to customize form fields. To use the slot, set the field <code class="ic">type</code> property to <code class="ic">field</code>.',
		name: 'Field Slots',
		script: scriptCode,
		template: templateCode,
	}
});
</script>


<style lang="scss" scoped></style>
