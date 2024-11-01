import { Props } from './types';
declare let __VLS_typeProps: Props;
type __VLS_PublicProps = {
    modelValue?: any;
} & typeof __VLS_typeProps;
declare function __VLS_template(): {
    slots: Partial<Record<NonNullable<string | number>, (_: any) => any>>;
    refs: {
        stepperFormRef: any;
    };
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{}>, {
    width: string;
    readonly disabled: boolean;
    readonly editable: boolean;
    autoPageDelay: number;
    direction: "horizontal" | "vertical";
    keepValuesOnUnmount: boolean;
    navButtonSize: import('vuetify/lib/components/index.mjs').VBtn["size"];
    tooltipLocation: import('vuetify/lib/components/index.mjs').VTooltip["location"];
    tooltipOffset: string | number | number[];
    tooltipTransition: import('vuetify/lib/components/index.mjs').VTooltip["transition"];
    transition: import('vuetify/lib/components/index.mjs').VStepperWindowItem["transition"];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
