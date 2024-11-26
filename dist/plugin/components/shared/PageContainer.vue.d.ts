import { Page, ResponsiveColumns } from '../../types/index';
export interface PageContainerProps {
    fieldColumns: ResponsiveColumns | undefined;
    page: Page;
    pageIndex: number;
}
declare let __VLS_typeProps: PageContainerProps;
type __VLS_PublicProps = {
    modelValue?: any;
} & typeof __VLS_typeProps;
declare function __VLS_template(): {
    slots: Readonly<Record<string, any>> & Record<string, any>;
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
