<template>
	<v-row>
		<v-col
			id="usage"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#usage"
				>#</a>
				Usage
			</h2>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="usageGlobalPlugin"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				lang="javascript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			>
				<template #label>
					Global Plugin Registration
				</template>
			</VCodeBlock>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="usageGlobalComponent"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Global Component Registration"
				lang="javascript"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				:code="usageIndividual"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label="Local Registration"
				lang="html"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			/>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
const codeBlockSettings = inject<Docs.CodeBlockSettings>('codeBlockSettings')!;
const classes = inject<Docs.GlobalClasses>('classes')!;

const usageGlobalPlugin = `import { createApp } from 'vue';
import App from './App.vue';
import { createVStepperForm } from '@wdns/vuetify-stepper-form';

const app = createApp(App);

app.use(createVStepperForm({
  // options
}));

app.mount('#app');`;

const usageGlobalComponent = `import { createApp } from 'vue';
import App from './App.vue';
import { VStepperForm } from  '@wdns/vuetify-stepper-form';

const app = createApp(App);

app.component('VStepperForm', VStepperForm);

app.mount('#app');`;

const usageIndividual = `<template>
  <VStepperForm
    v-model="foo"
  />
</template>

\<script setup\>
  import VStepperForm from  '@wdns/vuetify-stepper-form';

  const foo = ref(null);
\</script\>`;
</script>
