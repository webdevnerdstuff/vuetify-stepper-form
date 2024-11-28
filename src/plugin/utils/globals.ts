import type { InjectionKey } from 'vue';
import { PluginOptions } from '../types';

export const componentName = 'v-stepper-form';

export const pluginOptionsInjectionKey: InjectionKey<PluginOptions> = Symbol();
