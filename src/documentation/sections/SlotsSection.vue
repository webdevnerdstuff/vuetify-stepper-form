<template>
	<v-row>
		<v-col
			id="slots"
			cols="12"
		>
			<h2 :class="classes.h2">
				<a
					:class="classes.headerA"
					href="#slots"
				>#</a>
				Slots
			</h2>
		</v-col>

		<v-col cols="12">
			<v-card>
				<v-table
					class="slots-table"
					hide-default-footer
				>
					<thead>
						<tr>
							<th width="20%">Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr
							id="slots-field"
							:class="rowClass"
						>
							<td>
								<span class="name-item text-mono ml-n2">
									<span class="text-primary">#</span>
									<a
										class="text-primary"
										:class="classes.appLink"
										href="#slots-field"
									>[`field.${string}`]</a>
								</span>
							</td>
							<td class="compact">
								Slot for adding custom fields. Ensure to include the <code class="ic">onUpdate($event)</code> event
								listener so the form can detect and handle updates properly. Refer to the <a
									href="#examples-field-slots"
								>Field Slot</a> example for usage.
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<VCodeBlock
									:code="displaySlotsCode"
									:highlightjs="codeBlockSettings.plugin === 'highlightjs'"
									lang="typescript"
									:prismjs="codeBlockSettings.plugin === 'prismjs'"
									:theme="codeBlockSettings.theme"
								/>
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-card>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
const codeBlockSettings = inject<Docs.CodeBlockSettings>('codeBlockSettings')!;
const classes = inject<Docs.GlobalClasses>('classes')!;
const theme = useTheme();
const isDark = ref(true);


watch(() => theme.global.current.value.dark, (val) => {
	isDark.value = val;
});

const rowClass = computed(() => {
	return isDark.value ? 'bg-grey-darken-3' : 'bg-grey-lighten-3';
});

const displaySlotsCode = `{
  errorMessage: string[],
  field: Field,

  // Validation callbacks
  blur: () => void,
  change: () => void,
  input: () => void,

  // Updating the model value
  onUpdate: (value: any) => void,

  // Internal FieldLabel component
  FieldLabel: Component
}`;


</script>

<style lang="scss">
.slots-table {
	td {
		line-height: 2rem !important;

		> div {
			padding: 0.5rem 0 !important;
		}

		&.compact {
			line-height: 1.4 !important;
		}
	}
}
</style>
