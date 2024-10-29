<template>
	<v-row>
		<v-col
			id="events"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#events"
				>#</a>
				Events
			</h2>
		</v-col>

		<v-col cols="12">
			<v-row>
				<v-col cols="12">
					<v-card>
						<v-data-table
							:headers="headers"
							hide-default-footer
							:items="items"
						>
							<template #item="{ item }">
								<tr>
									<td>
										<span
											:id="`events-${item.name}`"
											class="name-item text-mono ml-n2"
										>
											<span class="text-primary">#</span>
											<a
												class="text-primary"
												:class="classes.appLink"
												:href="`#events-${item.name}`"
											>
												{{ item.name }}
											</a>
										</span>
									</td>

									<td><span v-html="item.desc"></span></td>
								</tr>
							</template>
						</v-data-table>
					</v-card>
				</v-col>
			</v-row>
		</v-col>

		<v-col cols="12">
			<VCodeBlock
				class="mb-6"
				:code="exampleCode"
				:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
				label=""
				lang="html"
				:prismjs="codeBlockSettings.plugin === 'prismjs'"
				:theme="codeBlockSettings.theme"
			>
				<template #label>
					<code class="ic">@submit</code> Event Example
				</template>
			</VCodeBlock>
		</v-col>
	</v-row>
</template>


<script setup lang="ts">
const codeBlockSettings = inject<Docs.CodeBlockSettings>('codeBlockSettings')!;
const classes = inject<Docs.GlobalClasses>('classes')!;

const headers = [
	{
		align: 'start',
		filterable: true,
		key: 'name',
		sortable: false,
		title: 'Name',
		width: '20%',
	},
	{
		align: 'start',
		filterable: false,
		key: 'desc',
		sortable: false,
		title: 'Description',
	},
];
const items = [
	{
		desc: 'Emitted when the form has been successfully submitted.',
		name: 'submit',
	},
];

const exampleCode = `<template>
  <VStepperForm
    v-model="answers"
    :pages="pages"
    :validationSchema="validationSchema"
    @submit="onSubmit"
  />
<\/template>

<script setup>
import { ref } from 'vue';

const answers = ref({ foo: 'bar' });
const pages = [...];
const validationSchema = {...};

function onSubmit(value) {
  // ...do something awesome
}
<\/script>`;
</script>
