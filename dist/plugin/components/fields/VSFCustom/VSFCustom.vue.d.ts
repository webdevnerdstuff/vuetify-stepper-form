import { VSFCustomProps } from './index';
declare let __VLS_typeProps: VSFCustomProps;
type __VLS_PublicProps = {
    modelValue?: any;
} & typeof __VLS_typeProps;
declare function __VLS_template(): {
    slots: Partial<Record<string, (_: {
        errorMessage: any;
        field: {
            options: KeyStringAny<any> | undefined;
            prevText?: string | undefined;
            nextText?: string | undefined;
            theme?: string | undefined;
            tag?: string | undefined;
            rounded?: string | number | boolean | undefined;
            tile?: boolean | undefined;
            elevation?: string | number | undefined;
            height?: string | number | undefined;
            maxHeight?: string | number | undefined;
            maxWidth?: string | number | undefined;
            minHeight?: string | number | undefined;
            minWidth?: string | number | undefined;
            width?: string | undefined;
            border?: string | number | boolean | undefined;
            color?: string | undefined;
            selectedClass?: string | undefined;
            disabled?: boolean | undefined;
            altLabels?: boolean | undefined;
            bgColor?: string | undefined;
            editIcon?: string | undefined;
            editable?: boolean | undefined;
            errorIcon?: import('vuetify/lib/components/index.mjs').VStepperItem["errorIcon"] | undefined;
            hideActions?: boolean | undefined;
            flat?: boolean | undefined;
            autoPage?: boolean | undefined;
            autoPageDelay?: number | undefined;
            density?: import('../../../types').GlobalDensity | undefined;
            direction?: ("horizontal" | "vertical") | undefined;
            fieldColumns?: import('../../../types').ResponsiveColumns | undefined;
            headerTooltips?: boolean | undefined;
            hideDetails?: import('../../../types').GlobalHideDetails;
            keepValuesOnUnmount?: boolean | undefined;
            navButtonSize?: import('vuetify/lib/components/index.mjs').VBtn["size"] | undefined;
            summaryColumns?: import('../../../types').ResponsiveColumns | undefined;
            title?: string | undefined;
            tooltipLocation?: import('vuetify/lib/components/index.mjs').VTooltip["location"] | undefined;
            tooltipOffset?: import('vuetify/lib/components/index.mjs').VTooltip["offset"];
            tooltipTransition?: import('vuetify/lib/components/index.mjs').VTooltip["transition"] | undefined;
            validateOn?: import('../../../types').Field["validateOn"];
            validateOnMount?: boolean | undefined;
            variant?: string | undefined;
            transition?: import('vuetify/lib/components/index.mjs').VStepperWindowItem["transition"] | undefined;
        };
        FieldLabel: import('vue').DefineComponent<import('../../shared/FieldLabel.vue').FieldLabelProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('../../shared/FieldLabel.vue').FieldLabelProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
        blur: () => Promise<void>;
        change: () => Promise<void>;
        input: () => Promise<void>;
    }) => any>>;
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    validate: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onValidate?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
