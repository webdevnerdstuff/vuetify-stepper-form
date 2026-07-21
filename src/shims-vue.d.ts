declare module '*.vue';

// Vuetify only exposes `vuetify/styles`' type declarations via its package
// `exports` map, which the classic `node` module resolution used by this
// project cannot read. The import is a CSS side-effect with no meaningful
// types, so declare it ambiently to satisfy the side-effect import.
declare module 'vuetify/styles';
