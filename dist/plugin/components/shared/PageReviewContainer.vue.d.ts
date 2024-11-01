import { Page, ResponsiveColumns } from '../../types/index';
export interface PageReviewContainerProps {
    page: Page;
    pages: Page[];
    summaryColumns: ResponsiveColumns | undefined;
}
declare let __VLS_typeProps: PageReviewContainerProps;
type __VLS_PublicProps = {
    modelValue?: any;
} & typeof __VLS_typeProps;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (...args: any[]) => void;
    goToQuestion: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    onGoToQuestion?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
