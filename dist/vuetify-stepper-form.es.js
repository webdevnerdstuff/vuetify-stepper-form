import { defineComponent as Ge, openBlock as M, createElementBlock as me, createElementVNode as Ue, createTextVNode as rn, createCommentVNode as Te, computed as S, toValue as N, unref as s, onMounted as Gn, getCurrentInstance as ft, provide as Kt, isRef as nt, watch as et, onBeforeUnmount as fl, ref as _e, reactive as Vt, nextTick as Ke, warn as vl, readonly as ml, watchEffect as hl, inject as at, onUnmounted as yt, toRef as xt, resolveDynamicComponent as go, h as gl, shallowRef as An, mergeModels as Pe, useModel as ot, createBlock as ve, mergeProps as tt, withCtx as X, createVNode as re, useCssVars as _l, Fragment as xe, normalizeClass as Me, normalizeStyle as ut, renderList as We, withModifiers as da, withKeys as yl, createSlots as Yn, withDirectives as _o, vModelText as yo, useSlots as Zn, toRaw as bl, renderSlot as Xn, markRaw as rt, toDisplayString as st, mergeDefaults as Ol, useAttrs as El, useId as Vl, toRefs as kl, useTemplateRef as Il, defineAsyncComponent as ca } from "vue";
import { watchDeep as Sl } from "@vueuse/core";
import { useDisplay as Tl } from "vuetify";
import wl from "@wdns/vuetify-color-field";
import { VMessages as bo, VTextField as Cl, VTextarea as Al, VSelect as Pl, VFileInput as xl, VCombobox as jl, VAutocomplete as Ul } from "vuetify/components";
import { VDateInput as Dl } from "vuetify/labs/VDateInput";
import { VBtn as an } from "vuetify/lib/components/VBtn/index.mjs";
import { VItemGroup as Rl, VItem as Nl } from "vuetify/lib/components/VItemGroup/index.mjs";
import { VLabel as Jn } from "vuetify/lib/components/VLabel/index.mjs";
import { VCheckbox as pa } from "vuetify/lib/components/VCheckbox/index.mjs";
import { VRadio as Ml } from "vuetify/lib/components/VRadio/index.mjs";
import { VRadioGroup as Ll } from "vuetify/lib/components/VRadioGroup/index.mjs";
import { VSwitch as Bl } from "vuetify/lib/components/VSwitch/index.mjs";
import { VRow as qt, VCol as kt, VContainer as bn } from "vuetify/lib/components/VGrid/index.mjs";
import { VCard as Hl } from "vuetify/lib/components/VCard/index.mjs";
import { VList as $l, VListItem as fa, VListItemTitle as va, VListItemSubtitle as ma } from "vuetify/lib/components/VList/index.mjs";
import { VDivider as Fl } from "vuetify/lib/components/VDivider/index.mjs";
import { VStepper as zl, VStepperHeader as Kl, VStepperItem as ql, VStepperWindow as Wl, VStepperWindowItem as Gl, VStepperActions as Yl } from "vuetify/lib/components/VStepper/index.mjs";
import { VTooltip as Zl } from "vuetify/lib/components/VTooltip/index.mjs";
/**
 * @name @wdns/vuetify-stepper-form
 * @version 1.0.2
 * @description The Vuetify Stepper Form plugin provides a structured way to create multi-step forms using Vue 3, TypeScript, and Vuetify. It features a stepper layout that allows users to navigate between steps with form validation. The plugin is customizable and streamlines building dynamic, interactive forms that guide users through sequential steps.
 * @author WebDevNerdStuff & Bunnies... lots and lots of bunnies! <webdevnerdstuff@gmail.com> (https://webdevnerdstuff.com)
 * @copyright Copyright 2024, WebDevNerdStuff
 * @homepage https://webdevnerdstuff.github.io/vuetify-stepper-form/
 * @repository https://github.com/webdevnerdstuff/vuetify-stepper-form
 * @license MIT License
 */
const Xl = { "data-cy": "vsf-field-label" }, Jl = ["innerHTML"], Ql = { key: 0, class: "text-error ms-1" }, gt = Ge({ __name: "FieldLabel", props: { label: {}, required: { type: Boolean, default: !1 } }, setup: (e) => (t, a) => (M(), me("div", Xl, [Ue("span", { innerHTML: t.label }, null, 8, Jl), a[0] || (a[0] = rn()), t.required ? (M(), me("span", Ql, "*")) : Te("", !0)])) }), Pn = (e, t, a = {}) => {
  const o = (l, n) => {
    const i = { ...l };
    for (const r in n) n[r] === void 0 || typeof n[r] != "object" || Array.isArray(n[r]) ? n[r] !== void 0 && (i[r] = n[r]) : i[r] = o(i[r] ?? {}, n[r]);
    return i;
  };
  return [e, t, a].filter(Boolean).reduce(o, {});
}, ha = (e) => ({ altLabels: e.altLabels, autoPage: e.autoPage, autoPageDelay: e.autoPageDelay, bgColor: e.bgColor, border: e.border, color: e.color, density: e.density, disabled: e.disabled, editIcon: e.editIcon, editable: e.editable, elevation: e.elevation, errorIcon: e.errorIcon, fieldColumns: e.fieldColumns, flat: e.flat, headerTooltips: e.headerTooltips, height: e.height, hideActions: e.hideActions, hideDetails: e.hideDetails, keepValuesOnUnmount: e.keepValuesOnUnmount, maxHeight: e.maxHeight, maxWidth: e.maxWidth, minHeight: e.minHeight, minWidth: e.minWidth, nextText: e.nextText, prevText: e.prevText, rounded: e.rounded, selectedClass: e.selectedClass, summaryColumns: e.summaryColumns, tag: e.tag, theme: e.theme, tile: e.tile, tooltipLocation: e.tooltipLocation, tooltipOffset: e.tooltipOffset, tooltipTransition: e.tooltipTransition, transition: e.transition, validateOn: e.validateOn, validateOnMount: e.validateOnMount, variant: e.variant }), xn = (e) => {
  const { columns: t, propName: a } = e;
  let o = !1;
  if (t && (Object.values(t).forEach((l) => {
    (l < 1 || l > 12) && (o = !0);
  }), o)) throw new Error(`The ${a} values must be between 1 and 12`);
}, jn = (e) => {
  let t = -1, a = -1;
  return e.forEach((o, l) => {
    o.editable === !1 && (t === -1 && (t = l), a = l);
  }), { firstNonEditableIndex: t, lastNonEditableIndex: a };
}, jt = "v-stepper-form", Oo = Symbol(), Eo = { autoPageDelay: 250, direction: "horizontal", disabled: !1, editable: !0, jumpAhead: !1, keepValuesOnUnmount: !1, navButtonSize: "large", tooltipLocation: "bottom", tooltipOffset: 10, tooltipTransition: "fade-transition", transition: "fade-transition", width: "100%" };
var Ut, ga, On, Jt, ei = Object.create, _a = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, Qn = Object.getOwnPropertyNames, ni = Object.getPrototypeOf, ai = Object.prototype.hasOwnProperty, Bt = (Ut = { "../../node_modules/.pnpm/tsup@8.3.5_@microsoft+api-extractor@7.43.0_@types+node@22.9.0__@swc+core@1.5.29_jiti@2.0.0_po_lnt5yfvawfblpk67opvcdwbq7u/node_modules/tsup/assets/esm_shims.js"() {
} }, function() {
  return Ut && (ga = (0, Ut[Qn(Ut)[0]])(Ut = 0)), ga;
}), oi = (On = { "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
  function a(o) {
    return o instanceof Buffer ? Buffer.from(o) : new o.constructor(o.buffer.slice(), o.byteOffset, o.length);
  }
  Bt(), t.exports = function(o) {
    if ((o = o || {}).circles) return function(r) {
      const u = [], d = [], m = /* @__PURE__ */ new Map();
      if (m.set(Date, (h) => new Date(h)), m.set(Map, (h, v) => new Map(O(Array.from(h), v))), m.set(Set, (h, v) => new Set(O(Array.from(h), v))), r.constructorHandlers) for (const h of r.constructorHandlers) m.set(h[0], h[1]);
      let f = null;
      return r.proto ? y : g;
      function O(h, v) {
        const w = Object.keys(h), T = new Array(w.length);
        for (let C = 0; C < w.length; C++) {
          const L = w[C], $ = h[L];
          if (typeof $ != "object" || $ === null) T[L] = $;
          else if ($.constructor !== Object && (f = m.get($.constructor))) T[L] = f($, v);
          else if (ArrayBuffer.isView($)) T[L] = a($);
          else {
            const de = u.indexOf($);
            T[L] = de !== -1 ? d[de] : v($);
          }
        }
        return T;
      }
      function g(h) {
        if (typeof h != "object" || h === null) return h;
        if (Array.isArray(h)) return O(h, g);
        if (h.constructor !== Object && (f = m.get(h.constructor))) return f(h, g);
        const v = {};
        u.push(h), d.push(v);
        for (const w in h) {
          if (Object.hasOwnProperty.call(h, w) === !1) continue;
          const T = h[w];
          if (typeof T != "object" || T === null) v[w] = T;
          else if (T.constructor !== Object && (f = m.get(T.constructor))) v[w] = f(T, g);
          else if (ArrayBuffer.isView(T)) v[w] = a(T);
          else {
            const C = u.indexOf(T);
            v[w] = C !== -1 ? d[C] : g(T);
          }
        }
        return u.pop(), d.pop(), v;
      }
      function y(h) {
        if (typeof h != "object" || h === null) return h;
        if (Array.isArray(h)) return O(h, y);
        if (h.constructor !== Object && (f = m.get(h.constructor))) return f(h, y);
        const v = {};
        u.push(h), d.push(v);
        for (const w in h) {
          const T = h[w];
          if (typeof T != "object" || T === null) v[w] = T;
          else if (T.constructor !== Object && (f = m.get(T.constructor))) v[w] = f(T, y);
          else if (ArrayBuffer.isView(T)) v[w] = a(T);
          else {
            const C = u.indexOf(T);
            v[w] = C !== -1 ? d[C] : y(T);
          }
        }
        return u.pop(), d.pop(), v;
      }
    }(o);
    const l = /* @__PURE__ */ new Map();
    if (l.set(Date, (r) => new Date(r)), l.set(Map, (r, u) => new Map(i(Array.from(r), u))), l.set(Set, (r, u) => new Set(i(Array.from(r), u))), o.constructorHandlers) for (const r of o.constructorHandlers) l.set(r[0], r[1]);
    let n = null;
    return o.proto ? function r(u) {
      if (typeof u != "object" || u === null) return u;
      if (Array.isArray(u)) return i(u, r);
      if (u.constructor !== Object && (n = l.get(u.constructor))) return n(u, r);
      const d = {};
      for (const m in u) {
        const f = u[m];
        typeof f != "object" || f === null ? d[m] = f : f.constructor !== Object && (n = l.get(f.constructor)) ? d[m] = n(f, r) : ArrayBuffer.isView(f) ? d[m] = a(f) : d[m] = r(f);
      }
      return d;
    } : function r(u) {
      if (typeof u != "object" || u === null) return u;
      if (Array.isArray(u)) return i(u, r);
      if (u.constructor !== Object && (n = l.get(u.constructor))) return n(u, r);
      const d = {};
      for (const m in u) {
        if (Object.hasOwnProperty.call(u, m) === !1) continue;
        const f = u[m];
        typeof f != "object" || f === null ? d[m] = f : f.constructor !== Object && (n = l.get(f.constructor)) ? d[m] = n(f, r) : ArrayBuffer.isView(f) ? d[m] = a(f) : d[m] = r(f);
      }
      return d;
    };
    function i(r, u) {
      const d = Object.keys(r), m = new Array(d.length);
      for (let f = 0; f < d.length; f++) {
        const O = d[f], g = r[O];
        typeof g != "object" || g === null ? m[O] = g : g.constructor !== Object && (n = l.get(g.constructor)) ? m[O] = n(g, u) : ArrayBuffer.isView(g) ? m[O] = a(g) : m[O] = u(g);
      }
      return m;
    }
  };
} }, function() {
  return Jt || (0, On[Qn(On)[0]])((Jt = { exports: {} }).exports, Jt), Jt.exports;
});
Bt(), Bt(), Bt();
var ya, Vo = typeof navigator < "u", j = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
j.chrome !== void 0 && j.chrome.devtools, Vo && (j.self, j.top), typeof navigator < "u" && ((ya = navigator.userAgent) == null || ya.toLowerCase().includes("electron")), Bt();
var li = ((e, t, a) => (a = e != null ? ei(ni(e)) : {}, ((o, l, n, i) => {
  if (l && typeof l == "object" || typeof l == "function") for (let r of Qn(l)) ai.call(o, r) || r === n || _a(o, r, { get: () => l[r], enumerable: !(i = ti(l, r)) || i.enumerable });
  return o;
})(_a(a, "default", { value: e, enumerable: !0 }), e)))(oi()), ii = /(?:^|[-_/])(\w)/g;
function ri(e, t) {
  return t ? t.toUpperCase() : "";
}
var ba = (0, li.default)({ circles: !0 });
const si = { trailing: !0 };
function St(e, t = 25, a = {}) {
  if (a = { ...si, ...a }, !Number.isFinite(t)) throw new TypeError("Expected `wait` to be a finite number");
  let o, l, n, i, r = [];
  const u = (d, m) => (n = async function(f, O, g) {
    return await f.apply(O, g);
  }(e, d, m), n.finally(() => {
    if (n = null, a.trailing && i && !l) {
      const f = u(d, i);
      return i = null, f;
    }
  }), n);
  return function(...d) {
    return n ? (a.trailing && (i = d), n) : new Promise((m) => {
      const f = !l && a.leading;
      clearTimeout(l), l = setTimeout(() => {
        l = null;
        const O = a.leading ? o : u(this, d);
        for (const g of r) g(O);
        r = [];
      }, t), f ? (o = u(this, d), m(o)) : r.push(m);
    });
  };
}
function Un(e, t = {}, a) {
  for (const o in e) {
    const l = e[o], n = a ? `${a}:${o}` : o;
    typeof l == "object" && l !== null ? Un(l, t, n) : typeof l == "function" && (t[n] = l);
  }
  return t;
}
const ui = { run: (e) => e() }, ko = console.createTask !== void 0 ? console.createTask : () => ui;
function di(e, t) {
  const a = t.shift(), o = ko(a);
  return e.reduce((l, n) => l.then(() => o.run(() => n(...t))), Promise.resolve());
}
function ci(e, t) {
  const a = t.shift(), o = ko(a);
  return Promise.all(e.map((l) => o.run(() => l(...t))));
}
function En(e, t) {
  for (const a of [...e]) a(t);
}
class pi {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, a, o = {}) {
    if (!t || typeof a != "function") return () => {
    };
    const l = t;
    let n;
    for (; this._deprecatedHooks[t]; ) n = this._deprecatedHooks[t], t = n.to;
    if (n && !o.allowDeprecated) {
      let i = n.message;
      i || (i = `${l} hook has been deprecated` + (n.to ? `, please use ${n.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(i) || (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!a.name) try {
      Object.defineProperty(a, "name", { get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb", configurable: !0 });
    } catch {
    }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(a), () => {
      a && (this.removeHook(t, a), a = void 0);
    };
  }
  hookOnce(t, a) {
    let o, l = (...n) => (typeof o == "function" && o(), o = void 0, l = void 0, a(...n));
    return o = this.hook(t, l), o;
  }
  removeHook(t, a) {
    if (this._hooks[t]) {
      const o = this._hooks[t].indexOf(a);
      o !== -1 && this._hooks[t].splice(o, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, a) {
    this._deprecatedHooks[t] = typeof a == "string" ? { to: a } : a;
    const o = this._hooks[t] || [];
    delete this._hooks[t];
    for (const l of o) this.hook(t, l);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const a in t) this.deprecateHook(a, t[a]);
  }
  addHooks(t) {
    const a = Un(t), o = Object.keys(a).map((l) => this.hook(l, a[l]));
    return () => {
      for (const l of o.splice(0, o.length)) l();
    };
  }
  removeHooks(t) {
    const a = Un(t);
    for (const o in a) this.removeHook(o, a[o]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...a) {
    return a.unshift(t), this.callHookWith(di, t, ...a);
  }
  callHookParallel(t, ...a) {
    return a.unshift(t), this.callHookWith(ci, t, ...a);
  }
  callHookWith(t, a, ...o) {
    const l = this._before || this._after ? { name: a, args: o, context: {} } : void 0;
    this._before && En(this._before, l);
    const n = t(a in this._hooks ? [...this._hooks[a]] : [], o);
    return n instanceof Promise ? n.finally(() => {
      this._after && l && En(this._after, l);
    }) : (this._after && l && En(this._after, l), n);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const a = this._before.indexOf(t);
        a !== -1 && this._before.splice(a, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const a = this._after.indexOf(t);
        a !== -1 && this._after.splice(a, 1);
      }
    };
  }
}
function Io() {
  return new pi();
}
var fi = Object.create, Oa = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, ea = Object.getOwnPropertyNames, mi = Object.getPrototypeOf, hi = Object.prototype.hasOwnProperty, So = (e, t) => function() {
  return t || (0, e[ea(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, k = /* @__PURE__ */ ((e, t) => function() {
  return e && (t = (0, e[ea(e)[0]])(e = 0)), t;
})({ "../../node_modules/.pnpm/tsup@8.3.5_@microsoft+api-extractor@7.43.0_@types+node@22.9.0__@swc+core@1.5.29_jiti@2.0.0_po_lnt5yfvawfblpk67opvcdwbq7u/node_modules/tsup/assets/esm_shims.js"() {
} }), gi = So({ "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
  k(), function(a) {
    var o = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "Ae", Å: "A", Æ: "AE", Ç: "C", È: "E", É: "E", Ê: "E", Ë: "E", Ì: "I", Í: "I", Î: "I", Ï: "I", Ð: "D", Ñ: "N", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "Oe", Ő: "O", Ø: "O", Ù: "U", Ú: "U", Û: "U", Ü: "Ue", Ű: "U", Ý: "Y", Þ: "TH", ß: "ss", à: "a", á: "a", â: "a", ã: "a", ä: "ae", å: "a", æ: "ae", ç: "c", è: "e", é: "e", ê: "e", ë: "e", ì: "i", í: "i", î: "i", ï: "i", ð: "d", ñ: "n", ò: "o", ó: "o", ô: "o", õ: "o", ö: "oe", ő: "o", ø: "o", ù: "u", ú: "u", û: "u", ü: "ue", ű: "u", ý: "y", þ: "th", ÿ: "y", "ẞ": "SS", ا: "a", أ: "a", إ: "i", آ: "aa", ؤ: "u", ئ: "e", ء: "a", ب: "b", ت: "t", ث: "th", ج: "j", ح: "h", خ: "kh", د: "d", ذ: "th", ر: "r", ز: "z", س: "s", ش: "sh", ص: "s", ض: "dh", ط: "t", ظ: "z", ع: "a", غ: "gh", ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n", ه: "h", و: "w", ي: "y", ى: "a", ة: "h", ﻻ: "la", ﻷ: "laa", ﻹ: "lai", ﻵ: "laa", گ: "g", چ: "ch", پ: "p", ژ: "zh", ک: "k", ی: "y", "َ": "a", "ً": "an", "ِ": "e", "ٍ": "en", "ُ": "u", "ٌ": "on", "ْ": "", "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9", က: "k", ခ: "kh", ဂ: "g", ဃ: "ga", င: "ng", စ: "s", ဆ: "sa", ဇ: "z", "စျ": "za", ည: "ny", ဋ: "t", ဌ: "ta", ဍ: "d", ဎ: "da", ဏ: "na", တ: "t", ထ: "ta", ဒ: "d", ဓ: "da", န: "n", ပ: "p", ဖ: "pa", ဗ: "b", ဘ: "ba", မ: "m", ယ: "y", ရ: "ya", လ: "l", ဝ: "w", သ: "th", ဟ: "h", ဠ: "la", အ: "a", "ြ": "y", "ျ": "ya", "ွ": "w", "ြွ": "yw", "ျွ": "ywa", "ှ": "h", ဧ: "e", "၏": "-e", ဣ: "i", ဤ: "-i", ဉ: "u", ဦ: "-u", ဩ: "aw", "သြော": "aw", ဪ: "aw", "၀": "0", "၁": "1", "၂": "2", "၃": "3", "၄": "4", "၅": "5", "၆": "6", "၇": "7", "၈": "8", "၉": "9", "္": "", "့": "", "း": "", č: "c", ď: "d", ě: "e", ň: "n", ř: "r", š: "s", ť: "t", ů: "u", ž: "z", Č: "C", Ď: "D", Ě: "E", Ň: "N", Ř: "R", Š: "S", Ť: "T", Ů: "U", Ž: "Z", ހ: "h", ށ: "sh", ނ: "n", ރ: "r", ބ: "b", ޅ: "lh", ކ: "k", އ: "a", ވ: "v", މ: "m", ފ: "f", ދ: "dh", ތ: "th", ލ: "l", ގ: "g", ޏ: "gn", ސ: "s", ޑ: "d", ޒ: "z", ޓ: "t", ޔ: "y", ޕ: "p", ޖ: "j", ޗ: "ch", ޘ: "tt", ޙ: "hh", ޚ: "kh", ޛ: "th", ޜ: "z", ޝ: "sh", ޞ: "s", ޟ: "d", ޠ: "t", ޡ: "z", ޢ: "a", ޣ: "gh", ޤ: "q", ޥ: "w", "ަ": "a", "ާ": "aa", "ި": "i", "ީ": "ee", "ު": "u", "ޫ": "oo", "ެ": "e", "ޭ": "ey", "ޮ": "o", "ޯ": "oa", "ް": "", ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t", ი: "i", კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh", რ: "r", ს: "s", ტ: "t", უ: "u", ფ: "p", ქ: "k", ღ: "gh", ყ: "q", შ: "sh", ჩ: "ch", ც: "ts", ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h", α: "a", β: "v", γ: "g", δ: "d", ε: "e", ζ: "z", η: "i", θ: "th", ι: "i", κ: "k", λ: "l", μ: "m", ν: "n", ξ: "ks", ο: "o", π: "p", ρ: "r", σ: "s", τ: "t", υ: "y", φ: "f", χ: "x", ψ: "ps", ω: "o", ά: "a", έ: "e", ί: "i", ό: "o", ύ: "y", ή: "i", ώ: "o", ς: "s", ϊ: "i", ΰ: "y", ϋ: "y", ΐ: "i", Α: "A", Β: "B", Γ: "G", Δ: "D", Ε: "E", Ζ: "Z", Η: "I", Θ: "TH", Ι: "I", Κ: "K", Λ: "L", Μ: "M", Ν: "N", Ξ: "KS", Ο: "O", Π: "P", Ρ: "R", Σ: "S", Τ: "T", Υ: "Y", Φ: "F", Χ: "X", Ψ: "PS", Ω: "O", Ά: "A", Έ: "E", Ί: "I", Ό: "O", Ύ: "Y", Ή: "I", Ώ: "O", Ϊ: "I", Ϋ: "Y", ā: "a", ē: "e", ģ: "g", ī: "i", ķ: "k", ļ: "l", ņ: "n", ū: "u", Ā: "A", Ē: "E", Ģ: "G", Ī: "I", Ķ: "k", Ļ: "L", Ņ: "N", Ū: "U", Ќ: "Kj", ќ: "kj", Љ: "Lj", љ: "lj", Њ: "Nj", њ: "nj", Тс: "Ts", тс: "ts", ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ś: "s", ź: "z", ż: "z", Ą: "A", Ć: "C", Ę: "E", Ł: "L", Ń: "N", Ś: "S", Ź: "Z", Ż: "Z", Є: "Ye", І: "I", Ї: "Yi", Ґ: "G", є: "ye", і: "i", ї: "yi", ґ: "g", ă: "a", Ă: "A", ș: "s", Ș: "S", ț: "t", Ț: "T", ţ: "t", Ţ: "T", а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "c", ч: "ch", ш: "sh", щ: "sh", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya", А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "Yo", Ж: "Zh", З: "Z", И: "I", Й: "I", К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R", С: "S", Т: "T", У: "U", Ф: "F", Х: "Kh", Ц: "C", Ч: "Ch", Ш: "Sh", Щ: "Sh", Ъ: "", Ы: "Y", Ь: "", Э: "E", Ю: "Yu", Я: "Ya", ђ: "dj", ј: "j", ћ: "c", џ: "dz", Ђ: "Dj", Ј: "j", Ћ: "C", Џ: "Dz", ľ: "l", ĺ: "l", ŕ: "r", Ľ: "L", Ĺ: "L", Ŕ: "R", ş: "s", Ş: "S", ı: "i", İ: "I", ğ: "g", Ğ: "G", ả: "a", Ả: "A", ẳ: "a", Ẳ: "A", ẩ: "a", Ẩ: "A", đ: "d", Đ: "D", ẹ: "e", Ẹ: "E", ẽ: "e", Ẽ: "E", ẻ: "e", Ẻ: "E", ế: "e", Ế: "E", ề: "e", Ề: "E", ệ: "e", Ệ: "E", ễ: "e", Ễ: "E", ể: "e", Ể: "E", ỏ: "o", ọ: "o", Ọ: "o", ố: "o", Ố: "O", ồ: "o", Ồ: "O", ổ: "o", Ổ: "O", ộ: "o", Ộ: "O", ỗ: "o", Ỗ: "O", ơ: "o", Ơ: "O", ớ: "o", Ớ: "O", ờ: "o", Ờ: "O", ợ: "o", Ợ: "O", ỡ: "o", Ỡ: "O", Ở: "o", ở: "o", ị: "i", Ị: "I", ĩ: "i", Ĩ: "I", ỉ: "i", Ỉ: "i", ủ: "u", Ủ: "U", ụ: "u", Ụ: "U", ũ: "u", Ũ: "U", ư: "u", Ư: "U", ứ: "u", Ứ: "U", ừ: "u", Ừ: "U", ự: "u", Ự: "U", ữ: "u", Ữ: "U", ử: "u", Ử: "ư", ỷ: "y", Ỷ: "y", ỳ: "y", Ỳ: "Y", ỵ: "y", Ỵ: "Y", ỹ: "y", Ỹ: "Y", ạ: "a", Ạ: "A", ấ: "a", Ấ: "A", ầ: "a", Ầ: "A", ậ: "a", Ậ: "A", ẫ: "a", Ẫ: "A", ắ: "a", Ắ: "A", ằ: "a", Ằ: "A", ặ: "a", Ặ: "A", ẵ: "a", Ẵ: "A", "⓪": "0", "①": "1", "②": "2", "③": "3", "④": "4", "⑤": "5", "⑥": "6", "⑦": "7", "⑧": "8", "⑨": "9", "⑩": "10", "⑪": "11", "⑫": "12", "⑬": "13", "⑭": "14", "⑮": "15", "⑯": "16", "⑰": "17", "⑱": "18", "⑲": "18", "⑳": "18", "⓵": "1", "⓶": "2", "⓷": "3", "⓸": "4", "⓹": "5", "⓺": "6", "⓻": "7", "⓼": "8", "⓽": "9", "⓾": "10", "⓿": "0", "⓫": "11", "⓬": "12", "⓭": "13", "⓮": "14", "⓯": "15", "⓰": "16", "⓱": "17", "⓲": "18", "⓳": "19", "⓴": "20", "Ⓐ": "A", "Ⓑ": "B", "Ⓒ": "C", "Ⓓ": "D", "Ⓔ": "E", "Ⓕ": "F", "Ⓖ": "G", "Ⓗ": "H", "Ⓘ": "I", "Ⓙ": "J", "Ⓚ": "K", "Ⓛ": "L", "Ⓜ": "M", "Ⓝ": "N", "Ⓞ": "O", "Ⓟ": "P", "Ⓠ": "Q", "Ⓡ": "R", "Ⓢ": "S", "Ⓣ": "T", "Ⓤ": "U", "Ⓥ": "V", "Ⓦ": "W", "Ⓧ": "X", "Ⓨ": "Y", "Ⓩ": "Z", "ⓐ": "a", "ⓑ": "b", "ⓒ": "c", "ⓓ": "d", "ⓔ": "e", "ⓕ": "f", "ⓖ": "g", "ⓗ": "h", "ⓘ": "i", "ⓙ": "j", "ⓚ": "k", "ⓛ": "l", "ⓜ": "m", "ⓝ": "n", "ⓞ": "o", "ⓟ": "p", "ⓠ": "q", "ⓡ": "r", "ⓢ": "s", "ⓣ": "t", "ⓤ": "u", "ⓦ": "v", "ⓥ": "w", "ⓧ": "x", "ⓨ": "y", "ⓩ": "z", "“": '"', "”": '"', "‘": "'", "’": "'", "∂": "d", ƒ: "f", "™": "(TM)", "©": "(C)", œ: "oe", Œ: "OE", "®": "(R)", "†": "+", "℠": "(SM)", "…": "...", "˚": "o", º: "o", ª: "a", "•": "*", "၊": ",", "။": ".", $: "USD", "€": "EUR", "₢": "BRN", "₣": "FRF", "£": "GBP", "₤": "ITL", "₦": "NGN", "₧": "ESP", "₩": "KRW", "₪": "ILS", "₫": "VND", "₭": "LAK", "₮": "MNT", "₯": "GRD", "₱": "ARS", "₲": "PYG", "₳": "ARA", "₴": "UAH", "₵": "GHS", "¢": "cent", "¥": "CNY", 元: "CNY", 円: "YEN", "﷼": "IRR", "₠": "EWE", "฿": "THB", "₨": "INR", "₹": "INR", "₰": "PF", "₺": "TRY", "؋": "AFN", "₼": "AZN", лв: "BGN", "៛": "KHR", "₡": "CRC", "₸": "KZT", ден: "MKD", zł: "PLN", "₽": "RUB", "₾": "GEL" }, l = ["်", "ް"], n = { "ာ": "a", "ါ": "a", "ေ": "e", "ဲ": "e", "ိ": "i", "ီ": "i", "ို": "o", "ု": "u", "ူ": "u", "ေါင်": "aung", "ော": "aw", "ော်": "aw", "ေါ": "aw", "ေါ်": "aw", "်": "်", "က်": "et", "ိုက်": "aik", "ောက်": "auk", "င်": "in", "ိုင်": "aing", "ောင်": "aung", "စ်": "it", "ည်": "i", "တ်": "at", "ိတ်": "eik", "ုတ်": "ok", "ွတ်": "ut", "ေတ်": "it", "ဒ်": "d", "ိုဒ်": "ok", "ုဒ်": "ait", "န်": "an", "ာန်": "an", "ိန်": "ein", "ုန်": "on", "ွန်": "un", "ပ်": "at", "ိပ်": "eik", "ုပ်": "ok", "ွပ်": "ut", "န်ုပ်": "nub", "မ်": "an", "ိမ်": "ein", "ုမ်": "on", "ွမ်": "un", "ယ်": "e", "ိုလ်": "ol", "ဉ်": "in", "ံ": "an", "ိံ": "ein", "ုံ": "on", "ައް": "ah", "ަށް": "ah" }, i = { en: {}, az: { ç: "c", ə: "e", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "C", Ə: "E", Ğ: "G", İ: "I", Ö: "O", Ş: "S", Ü: "U" }, cs: { č: "c", ď: "d", ě: "e", ň: "n", ř: "r", š: "s", ť: "t", ů: "u", ž: "z", Č: "C", Ď: "D", Ě: "E", Ň: "N", Ř: "R", Š: "S", Ť: "T", Ů: "U", Ž: "Z" }, fi: { ä: "a", Ä: "A", ö: "o", Ö: "O" }, hu: { ä: "a", Ä: "A", ö: "o", Ö: "O", ü: "u", Ü: "U", ű: "u", Ű: "U" }, lt: { ą: "a", č: "c", ę: "e", ė: "e", į: "i", š: "s", ų: "u", ū: "u", ž: "z", Ą: "A", Č: "C", Ę: "E", Ė: "E", Į: "I", Š: "S", Ų: "U", Ū: "U" }, lv: { ā: "a", č: "c", ē: "e", ģ: "g", ī: "i", ķ: "k", ļ: "l", ņ: "n", š: "s", ū: "u", ž: "z", Ā: "A", Č: "C", Ē: "E", Ģ: "G", Ī: "i", Ķ: "k", Ļ: "L", Ņ: "N", Š: "S", Ū: "u", Ž: "Z" }, pl: { ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z", Ą: "A", Ć: "C", Ę: "e", Ł: "L", Ń: "N", Ó: "O", Ś: "S", Ź: "Z", Ż: "Z" }, sv: { ä: "a", Ä: "A", ö: "o", Ö: "O" }, sk: { ä: "a", Ä: "A" }, sr: { љ: "lj", њ: "nj", Љ: "Lj", Њ: "Nj", đ: "dj", Đ: "Dj" }, tr: { Ü: "U", Ö: "O", ü: "u", ö: "o" } }, r = { ar: { "∆": "delta", "∞": "la-nihaya", "♥": "hob", "&": "wa", "|": "aw", "<": "aqal-men", ">": "akbar-men", "∑": "majmou", "¤": "omla" }, az: {}, ca: { "∆": "delta", "∞": "infinit", "♥": "amor", "&": "i", "|": "o", "<": "menys que", ">": "mes que", "∑": "suma dels", "¤": "moneda" }, cs: { "∆": "delta", "∞": "nekonecno", "♥": "laska", "&": "a", "|": "nebo", "<": "mensi nez", ">": "vetsi nez", "∑": "soucet", "¤": "mena" }, de: { "∆": "delta", "∞": "unendlich", "♥": "Liebe", "&": "und", "|": "oder", "<": "kleiner als", ">": "groesser als", "∑": "Summe von", "¤": "Waehrung" }, dv: { "∆": "delta", "∞": "kolunulaa", "♥": "loabi", "&": "aai", "|": "noonee", "<": "ah vure kuda", ">": "ah vure bodu", "∑": "jumula", "¤": "faisaa" }, en: { "∆": "delta", "∞": "infinity", "♥": "love", "&": "and", "|": "or", "<": "less than", ">": "greater than", "∑": "sum", "¤": "currency" }, es: { "∆": "delta", "∞": "infinito", "♥": "amor", "&": "y", "|": "u", "<": "menos que", ">": "mas que", "∑": "suma de los", "¤": "moneda" }, fa: { "∆": "delta", "∞": "bi-nahayat", "♥": "eshgh", "&": "va", "|": "ya", "<": "kamtar-az", ">": "bishtar-az", "∑": "majmooe", "¤": "vahed" }, fi: { "∆": "delta", "∞": "aarettomyys", "♥": "rakkaus", "&": "ja", "|": "tai", "<": "pienempi kuin", ">": "suurempi kuin", "∑": "summa", "¤": "valuutta" }, fr: { "∆": "delta", "∞": "infiniment", "♥": "Amour", "&": "et", "|": "ou", "<": "moins que", ">": "superieure a", "∑": "somme des", "¤": "monnaie" }, ge: { "∆": "delta", "∞": "usasruloba", "♥": "siqvaruli", "&": "da", "|": "an", "<": "naklebi", ">": "meti", "∑": "jami", "¤": "valuta" }, gr: {}, hu: { "∆": "delta", "∞": "vegtelen", "♥": "szerelem", "&": "es", "|": "vagy", "<": "kisebb mint", ">": "nagyobb mint", "∑": "szumma", "¤": "penznem" }, it: { "∆": "delta", "∞": "infinito", "♥": "amore", "&": "e", "|": "o", "<": "minore di", ">": "maggiore di", "∑": "somma", "¤": "moneta" }, lt: { "∆": "delta", "∞": "begalybe", "♥": "meile", "&": "ir", "|": "ar", "<": "maziau nei", ">": "daugiau nei", "∑": "suma", "¤": "valiuta" }, lv: { "∆": "delta", "∞": "bezgaliba", "♥": "milestiba", "&": "un", "|": "vai", "<": "mazak neka", ">": "lielaks neka", "∑": "summa", "¤": "valuta" }, my: { "∆": "kwahkhyaet", "∞": "asaonasme", "♥": "akhyait", "&": "nhin", "|": "tho", "<": "ngethaw", ">": "kyithaw", "∑": "paungld", "¤": "ngwekye" }, mk: {}, nl: { "∆": "delta", "∞": "oneindig", "♥": "liefde", "&": "en", "|": "of", "<": "kleiner dan", ">": "groter dan", "∑": "som", "¤": "valuta" }, pl: { "∆": "delta", "∞": "nieskonczonosc", "♥": "milosc", "&": "i", "|": "lub", "<": "mniejsze niz", ">": "wieksze niz", "∑": "suma", "¤": "waluta" }, pt: { "∆": "delta", "∞": "infinito", "♥": "amor", "&": "e", "|": "ou", "<": "menor que", ">": "maior que", "∑": "soma", "¤": "moeda" }, ro: { "∆": "delta", "∞": "infinit", "♥": "dragoste", "&": "si", "|": "sau", "<": "mai mic ca", ">": "mai mare ca", "∑": "suma", "¤": "valuta" }, ru: { "∆": "delta", "∞": "beskonechno", "♥": "lubov", "&": "i", "|": "ili", "<": "menshe", ">": "bolshe", "∑": "summa", "¤": "valjuta" }, sk: { "∆": "delta", "∞": "nekonecno", "♥": "laska", "&": "a", "|": "alebo", "<": "menej ako", ">": "viac ako", "∑": "sucet", "¤": "mena" }, sr: {}, tr: { "∆": "delta", "∞": "sonsuzluk", "♥": "ask", "&": "ve", "|": "veya", "<": "kucuktur", ">": "buyuktur", "∑": "toplam", "¤": "para birimi" }, uk: { "∆": "delta", "∞": "bezkinechnist", "♥": "lubov", "&": "i", "|": "abo", "<": "menshe", ">": "bilshe", "∑": "suma", "¤": "valjuta" }, vn: { "∆": "delta", "∞": "vo cuc", "♥": "yeu", "&": "va", "|": "hoac", "<": "nho hon", ">": "lon hon", "∑": "tong", "¤": "tien te" } }, u = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), d = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), m = [".", "!", "~", "*", "'", "(", ")"].join(""), f = function(h, v) {
      var w, T, C, L, $, de, Q, se, ae, te, A, B, ie, z, ne = "-", J = "", K = "", G = !0, le = {}, Y = "";
      if (typeof h != "string") return "";
      if (typeof v == "string" && (ne = v), Q = r.en, se = i.en, typeof v == "object") for (A in w = v.maintainCase || !1, le = v.custom && typeof v.custom == "object" ? v.custom : le, C = +v.truncate > 1 && v.truncate || !1, L = v.uric || !1, $ = v.uricNoSlash || !1, de = v.mark || !1, G = v.symbols !== !1 && v.lang !== !1, ne = v.separator || ne, L && (Y += u), $ && (Y += d), de && (Y += m), Q = v.lang && r[v.lang] && G ? r[v.lang] : G ? r.en : {}, se = v.lang && i[v.lang] ? i[v.lang] : v.lang === !1 || v.lang === !0 ? {} : i.en, v.titleCase && typeof v.titleCase.length == "number" && Array.prototype.toString.call(v.titleCase) ? (v.titleCase.forEach(function(Z) {
        le[Z + ""] = Z + "";
      }), T = !0) : T = !!v.titleCase, v.custom && typeof v.custom.length == "number" && Array.prototype.toString.call(v.custom) && v.custom.forEach(function(Z) {
        le[Z + ""] = Z + "";
      }), Object.keys(le).forEach(function(Z) {
        var pe;
        pe = Z.length > 1 ? new RegExp("\\b" + g(Z) + "\\b", "gi") : new RegExp(g(Z), "gi"), h = h.replace(pe, le[Z]);
      }), le) Y += A;
      for (Y = g(Y += ne), ie = !1, z = !1, te = 0, B = (h = h.replace(/(^\s+|\s+$)/g, "")).length; te < B; te++) A = h[te], y(A, le) ? ie = !1 : se[A] ? (A = ie && se[A].match(/[A-Za-z0-9]/) ? " " + se[A] : se[A], ie = !1) : A in o ? (te + 1 < B && l.indexOf(h[te + 1]) >= 0 ? (K += A, A = "") : z === !0 ? (A = n[K] + o[A], K = "") : A = ie && o[A].match(/[A-Za-z0-9]/) ? " " + o[A] : o[A], ie = !1, z = !1) : A in n ? (K += A, A = "", te === B - 1 && (A = n[K]), z = !0) : !Q[A] || L && u.indexOf(A) !== -1 || $ && d.indexOf(A) !== -1 ? (z === !0 ? (A = n[K] + A, K = "", z = !1) : ie && (/[A-Za-z0-9]/.test(A) || J.substr(-1).match(/A-Za-z0-9]/)) && (A = " " + A), ie = !1) : (A = ie || J.substr(-1).match(/[A-Za-z0-9]/) ? ne + Q[A] : Q[A], A += h[te + 1] !== void 0 && h[te + 1].match(/[A-Za-z0-9]/) ? ne : "", ie = !0), J += A.replace(new RegExp("[^\\w\\s" + Y + "_-]", "g"), ne);
      return T && (J = J.replace(/(\w)(\S*)/g, function(Z, pe, b) {
        var F = pe.toUpperCase() + (b !== null ? b : "");
        return Object.keys(le).indexOf(F.toLowerCase()) < 0 ? F : F.toLowerCase();
      })), J = J.replace(/\s+/g, ne).replace(new RegExp("\\" + ne + "+", "g"), ne).replace(new RegExp("(^\\" + ne + "+|\\" + ne + "+$)", "g"), ""), C && J.length > C && (ae = J.charAt(C) === ne, J = J.slice(0, C), ae || (J = J.slice(0, J.lastIndexOf(ne)))), w || T || (J = J.toLowerCase()), J;
    }, O = function(h) {
      return function(v) {
        return f(v, h);
      };
    }, g = function(h) {
      return h.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
    }, y = function(h, v) {
      for (var w in v) if (v[w] === h) return !0;
    };
    if (t !== void 0 && t.exports) t.exports = f, t.exports.createSlug = O;
    else if (typeof define < "u" && define.amd) define([], function() {
      return f;
    });
    else try {
      if (a.getSlug || a.createSlug) throw "speakingurl: globals exists /(getSlug|createSlug)/";
      a.getSlug = f, a.createSlug = O;
    } catch {
    }
  }(e);
} }), _i = So({ "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
  k(), t.exports = gi();
} });
function To(e) {
  return function(t) {
    return !(!t || !t.__v_isReadonly);
  }(e) ? To(e.__v_raw) : !(!e || !e.__v_isReactive);
}
function Vn(e) {
  return !(!e || e.__v_isRef !== !0);
}
function Rt(e) {
  const t = e && e.__v_raw;
  return t ? Rt(t) : e;
}
function yi(e) {
  const t = e.__file;
  if (t) return (a = function(o, l) {
    let n = o.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
    n.endsWith(`index${l}`) && (n = n.replace(`/index${l}`, l));
    const i = n.lastIndexOf("/"), r = n.substring(i + 1);
    {
      const u = r.lastIndexOf(l);
      return r.substring(0, u);
    }
  }(t, ".vue")) && `${a}`.replace(ii, ri);
  var a;
}
function Ea(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function sn(e) {
  return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__ ? e.__VUE_DEVTOOLS_NEXT_APP_RECORD__ : e.root ? e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__ : void 0;
}
function wo(e) {
  var t, a;
  const o = (t = e.subTree) == null ? void 0 : t.type, l = sn(e);
  return !!l && ((a = l == null ? void 0 : l.types) == null ? void 0 : a.Fragment) === o;
}
function un(e) {
  var t, a, o;
  const l = function(i) {
    var r;
    const u = i.name || i._componentTag || i.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || i.__name;
    return u === "index" && ((r = i.__file) != null && r.endsWith("index.vue")) ? "" : u;
  }((e == null ? void 0 : e.type) || {});
  if (l) return l;
  if ((e == null ? void 0 : e.root) === e) return "Root";
  for (const i in (a = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : a.components) if (e.parent.type.components[i] === (e == null ? void 0 : e.type)) return Ea(e, i);
  for (const i in (o = e.appContext) == null ? void 0 : o.components) if (e.appContext.components[i] === (e == null ? void 0 : e.type)) return Ea(e, i);
  return yi((e == null ? void 0 : e.type) || {}) || "Anonymous Component";
}
function kn(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
k(), k(), k(), k(), k(), k(), k(), k();
var Qt, bi = class {
  constructor() {
    this.refEditor = new Oi();
  }
  set(e, t, a, o) {
    const l = Array.isArray(t) ? t : t.split(".");
    for (; l.length > 1; ) {
      const r = l.shift();
      e instanceof Map && (e = e.get(r)), e = e instanceof Set ? Array.from(e.values())[r] : e[r], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const n = l[0], i = this.refEditor.get(e)[n];
    o ? o(e, n, a) : this.refEditor.isRef(i) ? this.refEditor.set(i, a) : e[n] = a;
  }
  get(e, t) {
    const a = Array.isArray(t) ? t : t.split(".");
    for (let o = 0; o < a.length; o++) if (e = e instanceof Map ? e.get(a[o]) : e[a[o]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e) return;
    return e;
  }
  has(e, t, a = !1) {
    if (e === void 0) return !1;
    const o = Array.isArray(t) ? t.slice() : t.split("."), l = a ? 2 : 1;
    for (; e && o.length > l; )
      e = e[o.shift()], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    return e != null && Object.prototype.hasOwnProperty.call(e, o[0]);
  }
  createDefaultSetCallback(e) {
    return (t, a, o) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(a, 1) : Rt(t) instanceof Map ? t.delete(a) : Rt(t) instanceof Set ? t.delete(Array.from(t.values())[a]) : Reflect.deleteProperty(t, a)), !e.remove) {
        const l = t[e.newKey || a];
        this.refEditor.isRef(l) ? this.refEditor.set(l, o) : Rt(t) instanceof Map ? t.set(e.newKey || a, o) : Rt(t) instanceof Set ? t.add(o) : t[e.newKey || a] = o;
      }
    };
  }
}, Oi = class {
  set(e, t) {
    if (Vn(e)) e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) return e.clear(), void t.forEach((l) => e.add(l));
      const a = Object.keys(t);
      if (e instanceof Map) {
        const l = new Set(e.keys());
        return a.forEach((n) => {
          e.set(n, Reflect.get(t, n)), l.delete(n);
        }), void l.forEach((n) => e.delete(n));
      }
      const o = new Set(Object.keys(e));
      a.forEach((l) => {
        Reflect.set(e, l, Reflect.get(t, l)), o.delete(l);
      }), o.forEach((l) => Reflect.deleteProperty(e, l));
    }
  }
  get(e) {
    return Vn(e) ? e.value : e;
  }
  isRef(e) {
    return Vn(e) || To(e);
  }
};
function Dn(e) {
  return wo(e) ? function(t) {
    if (!t.children) return [];
    const a = [];
    return t.children.forEach((o) => {
      o.component ? a.push(...Dn(o.component)) : o != null && o.el && a.push(o.el);
    }), a;
  }(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function Ei(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
k(), k(), k();
var Va = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
function _t(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? Va : wo(e) ? function(a) {
    const o = /* @__PURE__ */ function() {
      const n = { top: 0, bottom: 0, left: 0, right: 0, get width() {
        return n.right - n.left;
      }, get height() {
        return n.bottom - n.top;
      } };
      return n;
    }();
    if (!a.children) return o;
    for (let n = 0, i = a.children.length; n < i; n++) {
      const r = a.children[n];
      let u;
      if (r.component) u = _t(r.component);
      else if (r.el) {
        const d = r.el;
        d.nodeType === 1 || d.getBoundingClientRect ? u = d.getBoundingClientRect() : d.nodeType === 3 && d.data.trim() && (l = d, Qt || (Qt = document.createRange()), Qt.selectNode(l), u = Qt.getBoundingClientRect());
      }
      u && Ei(o, u);
    }
    var l;
    return o;
  }(e.subTree) : (t == null ? void 0 : t.nodeType) === 1 ? t == null ? void 0 : t.getBoundingClientRect() : e.subTree.component ? _t(e.subTree.component) : Va;
}
var Co = "__vue-devtools-component-inspector__", Ao = "__vue-devtools-component-inspector__card__", Po = "__vue-devtools-component-inspector__name__", xo = "__vue-devtools-component-inspector__indicator__", jo = { display: "block", zIndex: 2147483640, position: "fixed", backgroundColor: "#42b88325", border: "1px solid #42b88350", borderRadius: "5px", transition: "all 0.1s ease-in", pointerEvents: "none" }, Vi = { fontFamily: "Arial, Helvetica, sans-serif", padding: "5px 8px", borderRadius: "4px", textAlign: "left", position: "absolute", left: 0, color: "#e9e9e9", fontSize: "14px", fontWeight: 600, lineHeight: "24px", backgroundColor: "#42b883", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" }, ki = { display: "inline-block", fontWeight: 400, fontStyle: "normal", fontSize: "12px", opacity: 0.7 };
function Tt() {
  return document.getElementById(Co);
}
function ta(e) {
  return { left: Math.round(100 * e.left) / 100 + "px", top: Math.round(100 * e.top) / 100 + "px", width: Math.round(100 * e.width) / 100 + "px", height: Math.round(100 * e.height) / 100 + "px" };
}
function na(e) {
  var t;
  const a = document.createElement("div");
  a.id = (t = e.elementId) != null ? t : Co, Object.assign(a.style, { ...jo, ...ta(e.bounds), ...e.style });
  const o = document.createElement("span");
  o.id = Ao, Object.assign(o.style, { ...Vi, top: e.bounds.top < 35 ? 0 : "-35px" });
  const l = document.createElement("span");
  l.id = Po, l.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const n = document.createElement("i");
  return n.id = xo, n.innerHTML = `${Math.round(100 * e.bounds.width) / 100} x ${Math.round(100 * e.bounds.height) / 100}`, Object.assign(n.style, ki), o.appendChild(l), o.appendChild(n), a.appendChild(o), document.body.appendChild(a), a;
}
function aa(e) {
  const t = Tt(), a = document.getElementById(Ao), o = document.getElementById(Po), l = document.getElementById(xo);
  t && (Object.assign(t.style, { ...jo, ...ta(e.bounds) }), Object.assign(a.style, { top: e.bounds.top < 35 ? 0 : "-35px" }), o.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, l.innerHTML = `${Math.round(100 * e.bounds.width) / 100} x ${Math.round(100 * e.bounds.height) / 100}`);
}
function Uo() {
  const e = Tt();
  e && (e.style.display = "none");
}
var Rn = null;
function In(e) {
  const t = e.target;
  if (t) {
    const a = t.__vueParentComponent;
    if (a && (Rn = a, a.vnode.el)) {
      const o = _t(a), l = un(a);
      Tt() ? aa({ bounds: o, name: l }) : na({ bounds: o, name: l });
    }
  }
}
function Ii(e, t) {
  var a;
  if (e.preventDefault(), e.stopPropagation(), Rn) {
    const o = (a = Ne.value) == null ? void 0 : a.app;
    (async function(l) {
      const { app: n, uid: i, instance: r } = l;
      try {
        if (r.__VUE_DEVTOOLS_NEXT_UID__) return r.__VUE_DEVTOOLS_NEXT_UID__;
        const u = await sn(n);
        if (!u) return null;
        const d = u.rootInstance === r;
        return `${u.id}:${d ? "root" : i}`;
      } catch {
      }
    })({ app: o, uid: o.uid, instance: Rn }).then((l) => {
      t(l);
    });
  }
}
var ka, en = null;
function Si() {
  return new Promise((e) => {
    function t() {
      (function() {
        const a = j.__VUE_INSPECTOR__, o = a.openInEditor;
        a.openInEditor = async (...l) => {
          a.disable(), o(...l);
        };
      })(), e(j.__VUE_INSPECTOR__);
    }
    j.__VUE_INSPECTOR__ ? t() : function(a) {
      let o = 0;
      const l = setInterval(() => {
        j.__VUE_INSPECTOR__ && (clearInterval(l), o += 30, a()), o >= 5e3 && clearInterval(l);
      }, 30);
    }(() => {
      t();
    });
  });
}
k(), (ka = j).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ != null || (ka.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0), k(), k(), k();
var Ia;
function Ti() {
  if (!Vo || typeof localStorage > "u" || localStorage === null) return { recordingState: !1, mouseEventEnabled: !1, keyboardEventEnabled: !1, componentEventEnabled: !1, performanceEventEnabled: !1, selected: "" };
  const e = localStorage.getItem("__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__");
  return e ? JSON.parse(e) : { recordingState: !1, mouseEventEnabled: !1, keyboardEventEnabled: !1, componentEventEnabled: !1, performanceEventEnabled: !1, selected: "" };
}
k(), k(), k(), (Ia = j).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS != null || (Ia.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Sa, wi = new Proxy(j.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, { get: (e, t, a) => Reflect.get(e, t, a) });
(Sa = j).__VUE_DEVTOOLS_KIT_INSPECTOR__ != null || (Sa.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var Ta, wa, Ca, Aa, Pa, oa = new Proxy(j.__VUE_DEVTOOLS_KIT_INSPECTOR__, { get: (e, t, a) => Reflect.get(e, t, a) }), Do = St(() => {
  Ct.hooks.callHook("sendInspectorToClient", Ro());
});
function Ro() {
  return oa.filter((e) => e.descriptor.app === Ne.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
    var t;
    const a = e.descriptor, o = e.options;
    return { id: o.id, label: o.label, logo: a.logo, icon: `custom-ic-baseline-${(t = o == null ? void 0 : o.icon) == null ? void 0 : t.replace(/_/g, "-")}`, packageName: a.packageName, homepage: a.homepage, pluginId: a.id };
  });
}
function on(e, t) {
  return oa.find((a) => a.options.id === e && (!t || a.descriptor.app === t));
}
(Ta = j).__VUE_DEVTOOLS_KIT_APP_RECORDS__ != null || (Ta.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []), (wa = j).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ != null || (wa.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {}), (Ca = j).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ != null || (Ca.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = ""), (Aa = j).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ != null || (Aa.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []), (Pa = j).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ != null || (Pa.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var xa, vt = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
(xa = j)[vt] != null || (xa[vt] = { connected: !1, clientConnected: !1, vitePluginDetected: !0, appRecords: [], activeAppRecordId: "", tabs: [], commands: [], highPerfModeEnabled: !0, devtoolsClientDetected: {}, perfUniqueGroupId: 0, timelineLayersState: Ti() });
var Ci = St((e) => {
  Ct.hooks.callHook("devtoolsStateUpdated", { state: e });
});
St((e, t) => {
  Ct.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var dn = new Proxy(j.__VUE_DEVTOOLS_KIT_APP_RECORDS__, { get: (e, t, a) => t === "value" ? j.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : j.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t] }), Ne = new Proxy(j.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, { get: (e, t, a) => t === "value" ? j.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? j.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : j.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t] });
function ja() {
  Ci({ ...j[vt], appRecords: dn.value, activeAppRecordId: Ne.id, tabs: j.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__, commands: j.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ });
}
var Ua, Ce = new Proxy(j[vt], { get: (e, t) => t === "appRecords" ? dn : t === "activeAppRecordId" ? Ne.id : t === "tabs" ? j.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? j.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : j[vt][t], deleteProperty: (e, t) => (delete e[t], !0), set: (e, t, a) => (j[vt], e[t] = a, j[vt][t] = a, !0) });
function Ai(e = {}) {
  var t, a, o;
  const { file: l, host: n, baseUrl: i = window.location.origin, line: r = 0, column: u = 0 } = e;
  if (l) {
    if (n === "chrome-extension") {
      l.replace(/\\/g, "\\\\");
      const d = (a = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? a : "/";
      fetch(`${d}__open-in-editor?file=${encodeURI(l)}`).then((m) => {
        m.ok;
      });
    } else if (Ce.vitePluginDetected) {
      const d = (o = j.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? o : i;
      j.__VUE_INSPECTOR__.openInEditor(d, l, r, u);
    }
  }
}
k(), k(), k(), k(), k(), (Ua = j).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ != null || (Ua.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var Da, Ra, la = new Proxy(j.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, { get: (e, t, a) => Reflect.get(e, t, a) });
function Nn(e) {
  const t = {};
  return Object.keys(e).forEach((a) => {
    t[a] = e[a].defaultValue;
  }), t;
}
function ia(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function Pi(e) {
  var t, a, o;
  const l = (a = (t = la.find((n) => {
    var i;
    return n[0].id === e && !!((i = n[0]) != null && i.settings);
  })) == null ? void 0 : t[0]) != null ? a : null;
  return (o = l == null ? void 0 : l.settings) != null ? o : null;
}
function No(e, t) {
  var a, o, l;
  const n = ia(e);
  if (n) {
    const i = localStorage.getItem(n);
    if (i) return JSON.parse(i);
  }
  if (e) {
    const i = (o = (a = la.find((r) => r[0].id === e)) == null ? void 0 : a[0]) != null ? o : null;
    return Nn((l = i == null ? void 0 : i.settings) != null ? l : {});
  }
  return Nn(t);
}
k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k();
var $e = (Ra = (Da = j).__VUE_DEVTOOLS_HOOK) != null ? Ra : Da.__VUE_DEVTOOLS_HOOK = Io(), xi = { vueAppInit(e) {
  $e.hook("app:init", e);
}, vueAppUnmount(e) {
  $e.hook("app:unmount", e);
}, vueAppConnected(e) {
  $e.hook("app:connected", e);
}, componentAdded: (e) => $e.hook("component:added", e), componentEmit: (e) => $e.hook("component:emit", e), componentUpdated: (e) => $e.hook("component:updated", e), componentRemoved: (e) => $e.hook("component:removed", e), setupDevtoolsPlugin(e) {
  $e.hook("devtools-plugin:setup", e);
}, perfStart: (e) => $e.hook("perf:start", e), perfEnd: (e) => $e.hook("perf:end", e) }, Mo = { on: xi, setupDevToolsPlugin: (e, t) => $e.callHook("devtools-plugin:setup", e, t) }, ji = class {
  constructor({ plugin: e, ctx: t }) {
    this.hooks = t.hooks, this.plugin = e;
  }
  get on() {
    return { visitComponentTree: (e) => {
      this.hooks.hook("visitComponentTree", e);
    }, inspectComponent: (e) => {
      this.hooks.hook("inspectComponent", e);
    }, editComponentState: (e) => {
      this.hooks.hook("editComponentState", e);
    }, getInspectorTree: (e) => {
      this.hooks.hook("getInspectorTree", e);
    }, getInspectorState: (e) => {
      this.hooks.hook("getInspectorState", e);
    }, editInspectorState: (e) => {
      this.hooks.hook("editInspectorState", e);
    }, inspectTimelineEvent: (e) => {
      this.hooks.hook("inspectTimelineEvent", e);
    }, timelineCleared: (e) => {
      this.hooks.hook("timelineCleared", e);
    }, setPluginSettings: (e) => {
      this.hooks.hook("setPluginSettings", e);
    } };
  }
  notifyComponentUpdate(e) {
    var t;
    if (Ce.highPerfModeEnabled) return;
    const a = Ro().find((o) => o.packageName === this.plugin.descriptor.packageName);
    if (a != null && a.id) {
      if (e) {
        const o = [e.appContext.app, e.uid, (t = e.parent) == null ? void 0 : t.uid, e];
        $e.callHook("component:updated", ...o);
      } else $e.callHook("component:updated");
      this.hooks.callHook("sendInspectorState", { inspectorId: a.id, plugin: this.plugin });
    }
  }
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && function(t, a) {
      const o = ia(t);
      localStorage.getItem(o) || localStorage.setItem(o, JSON.stringify(Nn(a)));
    }(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    Ce.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    Ce.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  now() {
    return Ce.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    Ce.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  getSettings(e) {
    return No(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  getComponentInstances(e) {
    return this.hooks.callHook("getComponentInstances", { app: e });
  }
  getComponentBounds(e) {
    return this.hooks.callHook("getComponentBounds", { instance: e });
  }
  getComponentName(e) {
    return this.hooks.callHook("getComponentName", { instance: e });
  }
  highlightElement(e) {
    const t = e.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook("componentHighlight", { uid: t });
  }
  unhighlightElement() {
    return this.hooks.callHook("componentUnhighlight");
  }
};
k(), k(), k(), k();
var Ui = "__vue_devtool_undefined__", Di = "__vue_devtool_infinity__", Ri = "__vue_devtool_negative_infinity__", Ni = "__vue_devtool_nan__";
k(), k();
var Na, Mi = { [Ui]: "undefined", [Ni]: "NaN", [Di]: "Infinity", [Ri]: "-Infinity" };
function Lo(e) {
  j.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || Ce.highPerfModeEnabled || (j.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), la.forEach((t) => {
    (function(a, o) {
      const [l, n] = a;
      if (l.app !== o) return;
      const i = new ji({ plugin: { setupFn: n, descriptor: l }, ctx: Ct });
      l.packageName === "vuex" && i.on.editInspectorState((r) => {
        i.sendInspectorState(r.inspectorId);
      }), n(i);
    })(t, e);
  }));
}
Object.entries(Mi).reduce((e, [t, a]) => (e[a] = t, e), {}), k(), k(), k(), k(), k(), (Na = j).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ != null || (Na.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set()), k(), k();
var Ma, La, Ba, Nt = "__VUE_DEVTOOLS_ROUTER__", Ot = "__VUE_DEVTOOLS_ROUTER_INFO__";
function Mn(e) {
  return e.map((t) => {
    let { path: a, name: o, children: l, meta: n } = t;
    return l != null && l.length && (l = Mn(l)), { path: a, name: o, children: l, meta: n };
  });
}
function Li(e, t) {
  function a() {
    var o;
    const l = (o = e.app) == null ? void 0 : o.config.globalProperties.$router, n = function(u) {
      if (u) {
        const { fullPath: d, hash: m, href: f, path: O, name: g, matched: y, params: h, query: v } = u;
        return { fullPath: d, hash: m, href: f, path: O, name: g, params: h, query: v, matched: Mn(y) };
      }
      return u;
    }(l == null ? void 0 : l.currentRoute.value), i = Mn(function(u) {
      const d = /* @__PURE__ */ new Map();
      return ((u == null ? void 0 : u.getRoutes()) || []).filter((m) => !d.has(m.path) && d.set(m.path, 1));
    }(l)), r = console.warn;
    console.warn = () => {
    }, j[Ot] = { currentRoute: n ? ba(n) : {}, routes: ba(i) }, j[Nt] = l, console.warn = r;
  }
  a(), Mo.on.componentUpdated(St(() => {
    var o;
    ((o = t.value) == null ? void 0 : o.app) === e.app && (a(), Ce.highPerfModeEnabled || Ct.hooks.callHook("routerInfoUpdated", { state: j[Ot] }));
  }, 200));
}
(Ma = j)[Ot] != null || (Ma[Ot] = { currentRoute: null, routes: [] }), (La = j)[Nt] != null || (La[Nt] = {}), new Proxy(j[Ot], { get: (e, t) => j[Ot][t] }), new Proxy(j[Nt], { get(e, t) {
  if (t === "value") return j[Nt];
} }), k(), (Ba = j).__VUE_DEVTOOLS_ENV__ != null || (Ba.__VUE_DEVTOOLS_ENV__ = { vitePluginDetected: !1 });
var Ha, Dt, $a = function() {
  const e = Io();
  e.hook("addInspector", ({ inspector: o, plugin: l }) => {
    (function(n, i) {
      var r, u;
      oa.push({ options: n, descriptor: i, treeFilterPlaceholder: (r = n.treeFilterPlaceholder) != null ? r : "Search tree...", stateFilterPlaceholder: (u = n.stateFilterPlaceholder) != null ? u : "Search state...", treeFilter: "", selectedNodeId: "", appRecord: sn(i.app) }), Do();
    })(o, l.descriptor);
  });
  const t = St(async ({ inspectorId: o, plugin: l }) => {
    var n;
    if (!o || !((n = l == null ? void 0 : l.descriptor) != null && n.app) || Ce.highPerfModeEnabled) return;
    const i = on(o, l.descriptor.app), r = { app: l.descriptor.app, inspectorId: o, filter: (i == null ? void 0 : i.treeFilter) || "", rootNodes: [] };
    await new Promise((u) => {
      e.callHookWith(async (d) => {
        await Promise.all(d.map((m) => m(r))), u();
      }, "getInspectorTree");
    }), e.callHookWith(async (u) => {
      await Promise.all(u.map((d) => d({ inspectorId: o, rootNodes: r.rootNodes })));
    }, "sendInspectorTreeToClient");
  }, 120);
  e.hook("sendInspectorTree", t);
  const a = St(async ({ inspectorId: o, plugin: l }) => {
    var n;
    if (!o || !((n = l == null ? void 0 : l.descriptor) != null && n.app) || Ce.highPerfModeEnabled) return;
    const i = on(o, l.descriptor.app), r = { app: l.descriptor.app, inspectorId: o, nodeId: (i == null ? void 0 : i.selectedNodeId) || "", state: null }, u = { currentTab: `custom-inspector:${o}` };
    r.nodeId && await new Promise((d) => {
      e.callHookWith(async (m) => {
        await Promise.all(m.map((f) => f(r, u))), d();
      }, "getInspectorState");
    }), e.callHookWith(async (d) => {
      await Promise.all(d.map((m) => m({ inspectorId: o, nodeId: r.nodeId, state: r.state })));
    }, "sendInspectorStateToClient");
  }, 120);
  return e.hook("sendInspectorState", a), e.hook("customInspectorSelectNode", ({ inspectorId: o, nodeId: l, plugin: n }) => {
    const i = on(o, n.descriptor.app);
    i && (i.selectedNodeId = l);
  }), e.hook("timelineLayerAdded", ({ options: o, plugin: l }) => {
    (function(n, i) {
      Ce.timelineLayersState[i.id] = !1, wi.push({ ...n, descriptorId: i.id, appRecord: sn(i.app) });
    })(o, l.descriptor);
  }), e.hook("timelineEventAdded", ({ options: o, plugin: l }) => {
    var n;
    Ce.highPerfModeEnabled || !((n = Ce.timelineLayersState) != null && n[l.descriptor.id]) && !["performance", "component-event", "keyboard", "mouse"].includes(o.layerId) || e.callHookWith(async (i) => {
      await Promise.all(i.map((r) => r(o)));
    }, "sendTimelineEventToClient");
  }), e.hook("getComponentInstances", async ({ app: o }) => {
    const l = o.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!l) return null;
    const n = l.id.toString();
    return [...l.instanceMap].filter(([i]) => i.split(":")[0] === n).map(([, i]) => i);
  }), e.hook("getComponentBounds", async ({ instance: o }) => _t(o)), e.hook("getComponentName", ({ instance: o }) => un(o)), e.hook("componentHighlight", ({ uid: o }) => {
    const l = Ne.value.instanceMap.get(o);
    l && function(n) {
      const i = _t(n);
      if (!i.width && !i.height) return;
      const r = un(n);
      Tt() ? aa({ bounds: i, name: r }) : na({ bounds: i, name: r });
    }(l);
  }), e.hook("componentUnhighlight", () => {
    Uo();
  }), e;
}();
(Ha = j).__VUE_DEVTOOLS_KIT_CONTEXT__ != null || (Ha.__VUE_DEVTOOLS_KIT_CONTEXT__ = { hooks: $a, get state() {
  return { ...Ce, activeAppRecordId: Ne.id, activeAppRecord: Ne.value, appRecords: dn.value };
}, api: (Dt = $a, { async getInspectorTree(e) {
  const t = { ...e, app: Ne.value.app, rootNodes: [] };
  return await new Promise((a) => {
    Dt.callHookWith(async (o) => {
      await Promise.all(o.map((l) => l(t))), a();
    }, "getInspectorTree");
  }), t.rootNodes;
}, async getInspectorState(e) {
  const t = { ...e, app: Ne.value.app, state: null }, a = { currentTab: `custom-inspector:${e.inspectorId}` };
  return await new Promise((o) => {
    Dt.callHookWith(async (l) => {
      await Promise.all(l.map((n) => n(t, a))), o();
    }, "getInspectorState");
  }), t.state;
}, editInspectorState(e) {
  const t = new bi(), a = { ...e, app: Ne.value.app, set: (o, l = e.path, n = e.state.value, i) => {
    t.set(o, l, n, i || t.createDefaultSetCallback(e.state));
  } };
  Dt.callHookWith((o) => {
    o.forEach((l) => l(a));
  }, "editInspectorState");
}, sendInspectorState(e) {
  const t = on(e);
  Dt.callHook("sendInspectorState", { inspectorId: e, plugin: { descriptor: t.descriptor, setupFn: () => ({}) } });
}, inspectComponentInspector: () => (window.addEventListener("mouseover", In), new Promise((e) => {
  function t(a) {
    a.preventDefault(), a.stopPropagation(), Ii(a, (o) => {
      window.removeEventListener("click", t, !0), en = null, window.removeEventListener("mouseover", In);
      const l = Tt();
      l && (l.style.display = "none"), e(JSON.stringify({ id: o }));
    });
  }
  en = t, window.addEventListener("click", t, !0);
})), cancelInspectComponentInspector: () => (Uo(), window.removeEventListener("mouseover", In), window.removeEventListener("click", en, !0), void (en = null)), getComponentRenderCode(e) {
  const t = kn(Ne.value, e);
  if (t) return (t == null ? void 0 : t.type) instanceof Function ? t.type.toString() : t.render.toString();
}, scrollToComponent: (e) => function(t) {
  const a = kn(Ne.value, t.id);
  if (a) {
    const [o] = Dn(a);
    if (typeof o.scrollIntoView == "function") o.scrollIntoView({ behavior: "smooth" });
    else {
      const l = _t(a), n = document.createElement("div"), i = { ...ta(l), position: "absolute" };
      Object.assign(n.style, i), document.body.appendChild(n), n.scrollIntoView({ behavior: "smooth" }), setTimeout(() => {
        document.body.removeChild(n);
      }, 2e3);
    }
    setTimeout(() => {
      const l = _t(a);
      if (l.width || l.height) {
        const n = un(a), i = Tt();
        i ? aa({ ...t, name: n, bounds: l }) : na({ ...t, name: n, bounds: l }), setTimeout(() => {
          i && (i.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}({ id: e }), openInEditor: Ai, getVueInspector: Si, toggleApp(e) {
  const t = dn.value.find((o) => o.id === e);
  var a;
  t && (function(o) {
    j.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = o, ja();
  }(e), a = t, j.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = a, ja(), Li(t, Ne), Do(), Lo(t.app));
}, inspectDOM(e) {
  const t = kn(Ne.value, e);
  if (t) {
    const [a] = Dn(t);
    a && (j.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = a);
  }
}, updatePluginSettings(e, t, a) {
  (function(o, l, n) {
    const i = ia(o), r = localStorage.getItem(i), u = JSON.parse(r || "{}"), d = { ...u, [l]: n };
    localStorage.setItem(i, JSON.stringify(d)), Ct.hooks.callHookWith((m) => {
      m.forEach((f) => f({ pluginId: o, key: l, oldValue: u[l], newValue: n, settings: d }));
    }, "setPluginSettings");
  })(e, t, a);
}, getPluginSettings: (e) => ({ options: Pi(e), values: No(e) }) }) });
var Fa, za, Ct = j.__VUE_DEVTOOLS_KIT_CONTEXT__;
k(), ((e, t, a) => {
  a = e != null ? fi(mi(e)) : {}, ((o, l, n, i) => {
    if (l && typeof l == "object" || typeof l == "function") for (let r of ea(l)) hi.call(o, r) || r === n || Oa(o, r, { get: () => l[r], enumerable: !(i = vi(l, r)) || i.enumerable });
  })(Oa(a, "default", { value: e, enumerable: !0 }), e);
})(_i()), (Fa = j).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ != null || (Fa.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = { id: 0, appIds: /* @__PURE__ */ new Set() }), k(), k(), k(), k(), (za = j).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ != null || (za.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = function(e) {
  Ce.devtoolsClientDetected = { ...Ce.devtoolsClientDetected, ...e };
  const t = Object.values(Ce.devtoolsClientDetected).some(Boolean);
  var a;
  a = !t, Ce.highPerfModeEnabled = a ?? !Ce.highPerfModeEnabled, !a && Ne.value && Lo(Ne.value.app);
}), k(), k(), k(), k(), k(), k(), k();
var Bi = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, t) {
    this.keyToValue.set(e, t), this.valueToKey.set(t, e);
  }
  getByKey(e) {
    return this.keyToValue.get(e);
  }
  getByValue(e) {
    return this.valueToKey.get(e);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}, Bo = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new Bi();
  }
  register(e, t) {
    this.kv.getByValue(e) || (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(e) {
    return this.kv.getByValue(e);
  }
  getValue(e) {
    return this.kv.getByKey(e);
  }
}, Hi = class extends Bo {
  constructor() {
    super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(e, t) {
    typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
  }
  getAllowedProps(e) {
    return this.classToAllowedProps.get(e);
  }
};
function $i(e, t) {
  const a = function(l) {
    if ("values" in Object) return Object.values(l);
    const n = [];
    for (const i in l) l.hasOwnProperty(i) && n.push(l[i]);
    return n;
  }(e);
  if ("find" in a) return a.find(t);
  const o = a;
  for (let l = 0; l < o.length; l++) {
    const n = o[l];
    if (t(n)) return n;
  }
}
function wt(e, t) {
  Object.entries(e).forEach(([a, o]) => t(o, a));
}
function ln(e, t) {
  return e.indexOf(t) !== -1;
}
function Ka(e, t) {
  for (let a = 0; a < e.length; a++) {
    const o = e[a];
    if (t(o)) return o;
  }
}
k(), k();
var Fi = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return $i(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
k(), k();
var Ho = (e) => e === void 0, Wt = (e) => typeof e == "object" && e !== null && e !== Object.prototype && (Object.getPrototypeOf(e) === null || Object.getPrototypeOf(e) === Object.prototype), Ln = (e) => Wt(e) && Object.keys(e).length === 0, dt = (e) => Array.isArray(e), Gt = (e) => e instanceof Map, Yt = (e) => e instanceof Set, $o = (e) => ((t) => Object.prototype.toString.call(t).slice(8, -1))(e) === "Symbol", qa = (e) => typeof e == "number" && isNaN(e), zi = (e) => /* @__PURE__ */ ((t) => typeof t == "boolean")(e) || /* @__PURE__ */ ((t) => t === null)(e) || Ho(e) || ((t) => typeof t == "number" && !isNaN(t))(e) || /* @__PURE__ */ ((t) => typeof t == "string")(e) || $o(e);
k();
var Fo = (e) => e.replace(/\./g, "\\."), Sn = (e) => e.map(String).map(Fo).join("."), Ht = (e) => {
  const t = [];
  let a = "";
  for (let l = 0; l < e.length; l++) {
    let n = e.charAt(l);
    if (n === "\\" && e.charAt(l + 1) === ".") {
      a += ".", l++;
      continue;
    }
    n === "." ? (t.push(a), a = "") : a += n;
  }
  const o = a;
  return t.push(o), t;
};
function Je(e, t, a, o) {
  return { isApplicable: e, annotation: t, transform: a, untransform: o };
}
k();
var zo = [Je(Ho, "undefined", () => null, () => {
}), Je((e) => typeof e == "bigint", "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)), Je((e) => e instanceof Date && !isNaN(e.valueOf()), "Date", (e) => e.toISOString(), (e) => new Date(e)), Je((e) => e instanceof Error, "Error", (e, t) => {
  const a = { name: e.name, message: e.message };
  return t.allowedErrorProps.forEach((o) => {
    a[o] = e[o];
  }), a;
}, (e, t) => {
  const a = new Error(e.message);
  return a.name = e.name, a.stack = e.stack, t.allowedErrorProps.forEach((o) => {
    a[o] = e[o];
  }), a;
}), Je((e) => e instanceof RegExp, "regexp", (e) => "" + e, (e) => {
  const t = e.slice(1, e.lastIndexOf("/")), a = e.slice(e.lastIndexOf("/") + 1);
  return new RegExp(t, a);
}), Je(Yt, "set", (e) => [...e.values()], (e) => new Set(e)), Je(Gt, "map", (e) => [...e.entries()], (e) => new Map(e)), Je((e) => {
  return qa(e) || (t = e) === 1 / 0 || t === -1 / 0;
  var t;
}, "number", (e) => qa(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number), Je((e) => e === 0 && 1 / e == -1 / 0, "number", () => "-0", Number), Je((e) => e instanceof URL, "URL", (e) => e.toString(), (e) => new URL(e))];
function mn(e, t, a, o) {
  return { isApplicable: e, annotation: t, transform: a, untransform: o };
}
var Ko = mn((e, t) => $o(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, a) => {
  const o = a.symbolRegistry.getValue(t[1]);
  if (!o) throw new Error("Trying to deserialize unknown symbol");
  return o;
}), Ki = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray].reduce((e, t) => (e[t.name] = t, e), {}), qo = mn((e) => ArrayBuffer.isView(e) && !(e instanceof DataView), (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const a = Ki[t[1]];
  if (!a) throw new Error("Trying to deserialize unknown typed array");
  return new a(e);
});
function Wo(e, t) {
  return e != null && e.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var Go = mn(Wo, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const a = t.classRegistry.getAllowedProps(e.constructor);
  if (!a) return { ...e };
  const o = {};
  return a.forEach((l) => {
    o[l] = e[l];
  }), o;
}, (e, t, a) => {
  const o = a.classRegistry.getValue(t[1]);
  if (!o) throw new Error("Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564");
  return Object.assign(Object.create(o.prototype), e);
}), Yo = mn((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, a) => {
  const o = a.customTransformerRegistry.findByName(t[1]);
  if (!o) throw new Error("Trying to deserialize unknown custom value");
  return o.deserialize(e);
}), qi = [Go, Ko, Yo, qo], Wa = (e, t) => {
  const a = Ka(qi, (l) => l.isApplicable(e, t));
  if (a) return { value: a.transform(e, t), type: a.annotation(e, t) };
  const o = Ka(zo, (l) => l.isApplicable(e, t));
  return o ? { value: o.transform(e, t), type: o.annotation } : void 0;
}, Zo = {};
zo.forEach((e) => {
  Zo[e.annotation] = e;
});
k();
var Et = (e, t) => {
  const a = e.keys();
  for (; t > 0; ) a.next(), t--;
  return a.next().value;
};
function Xo(e) {
  if (ln(e, "__proto__")) throw new Error("__proto__ is not allowed as a property");
  if (ln(e, "prototype")) throw new Error("prototype is not allowed as a property");
  if (ln(e, "constructor")) throw new Error("constructor is not allowed as a property");
}
var Bn = (e, t, a) => {
  if (Xo(t), t.length === 0) return a(e);
  let o = e;
  for (let n = 0; n < t.length - 1; n++) {
    const i = t[n];
    if (dt(o))
      o = o[+i];
    else if (Wt(o)) o = o[i];
    else if (Yt(o))
      o = Et(o, +i);
    else if (Gt(o)) {
      if (n === t.length - 2) break;
      const r = +i, u = +t[++n] == 0 ? "key" : "value", d = Et(o, r);
      switch (u) {
        case "key":
          o = d;
          break;
        case "value":
          o = o.get(d);
      }
    }
  }
  const l = t[t.length - 1];
  if (dt(o) ? o[+l] = a(o[+l]) : Wt(o) && (o[l] = a(o[l])), Yt(o)) {
    const n = Et(o, +l), i = a(n);
    n !== i && (o.delete(n), o.add(i));
  }
  if (Gt(o)) {
    const n = +t[t.length - 2], i = Et(o, n);
    switch (+l == 0 ? "key" : "value") {
      case "key": {
        const r = a(i);
        o.set(r, o.get(i)), r !== i && o.delete(i);
        break;
      }
      case "value":
        o.set(i, a(o.get(i)));
    }
  }
  return e;
};
function Hn(e, t, a = []) {
  if (!e) return;
  if (!dt(e)) return void wt(e, (n, i) => Hn(n, t, [...a, ...Ht(i)]));
  const [o, l] = e;
  l && wt(l, (n, i) => {
    Hn(n, t, [...a, ...Ht(i)]);
  }), t(o, a);
}
function Wi(e, t, a) {
  return Hn(t, (o, l) => {
    e = Bn(e, l, (n) => ((i, r, u) => {
      if (!dt(r)) {
        const d = Zo[r];
        if (!d) throw new Error("Unknown transformation: " + r);
        return d.untransform(i, u);
      }
      switch (r[0]) {
        case "symbol":
          return Ko.untransform(i, r, u);
        case "class":
          return Go.untransform(i, r, u);
        case "custom":
          return Yo.untransform(i, r, u);
        case "typed-array":
          return qo.untransform(i, r, u);
        default:
          throw new Error("Unknown transformation: " + r);
      }
    })(n, o, a));
  }), e;
}
function Gi(e, t) {
  function a(o, l) {
    const n = ((i, r) => {
      Xo(r);
      for (let u = 0; u < r.length; u++) {
        const d = r[u];
        if (Yt(i)) i = Et(i, +d);
        else if (Gt(i)) {
          const m = +d, f = +r[++u] == 0 ? "key" : "value", O = Et(i, m);
          switch (f) {
            case "key":
              i = O;
              break;
            case "value":
              i = i.get(O);
          }
        } else i = i[d];
      }
      return i;
    })(e, Ht(l));
    o.map(Ht).forEach((i) => {
      e = Bn(e, i, () => n);
    });
  }
  if (dt(t)) {
    const [o, l] = t;
    o.forEach((n) => {
      e = Bn(e, Ht(n), () => e);
    }), l && wt(l, a);
  } else wt(t, a);
  return e;
}
var Jo = (e, t, a, o, l = [], n = [], i = /* @__PURE__ */ new Map()) => {
  var r;
  const u = zi(e);
  if (!u) {
    (function(h, v, w) {
      const T = w.get(h);
      T ? T.push(v) : w.set(h, [v]);
    })(e, l, t);
    const y = i.get(e);
    if (y) return o ? { transformedValue: null } : y;
  }
  if (!((y, h) => Wt(y) || dt(y) || Gt(y) || Yt(y) || Wo(y, h))(e, a)) {
    const y = Wa(e, a), h = y ? { transformedValue: y.value, annotations: [y.type] } : { transformedValue: e };
    return u || i.set(e, h), h;
  }
  if (ln(n, e)) return { transformedValue: null };
  const d = Wa(e, a), m = (r = d == null ? void 0 : d.value) != null ? r : e, f = dt(m) ? [] : {}, O = {};
  wt(m, (y, h) => {
    if (h === "__proto__" || h === "constructor" || h === "prototype") throw new Error(`Detected property ${h}. This is a prototype pollution risk, please remove it from your object.`);
    const v = Jo(y, t, a, o, [...l, h], [...n, e], i);
    f[h] = v.transformedValue, dt(v.annotations) ? O[h] = v.annotations : Wt(v.annotations) && wt(v.annotations, (w, T) => {
      O[Fo(h) + "." + T] = w;
    });
  });
  const g = Ln(O) ? { transformedValue: f, annotations: d ? [d.type] : void 0 } : { transformedValue: f, annotations: d ? [d.type, O] : O };
  return u || i.set(e, g), g;
};
function Qo(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function Ga(e) {
  return Qo(e) === "Array";
}
function $n(e, t = {}) {
  return Ga(e) ? e.map((a) => $n(a, t)) : function(a) {
    if (Qo(a) !== "Object") return !1;
    const o = Object.getPrototypeOf(a);
    return !!o && o.constructor === Object && o === Object.prototype;
  }(e) ? [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)].reduce((a, o) => (Ga(t.props) && !t.props.includes(o) || function(l, n, i, r, u) {
    const d = {}.propertyIsEnumerable.call(r, n) ? "enumerable" : "nonenumerable";
    d === "enumerable" && (l[n] = i), u && d === "nonenumerable" && Object.defineProperty(l, n, { value: i, enumerable: !1, writable: !0, configurable: !0 });
  }(a, o, $n(e[o], t), e, t.nonenumerable), a), {}) : e;
}
k(), k();
var Ya, Za, Xa, Ja, Qa, eo, ge = class {
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new Hi(), this.symbolRegistry = new Bo((t) => {
      var a;
      return (a = t.description) != null ? a : "";
    }), this.customTransformerRegistry = new Fi(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), a = Jo(e, t, this, this.dedupe), o = { json: a.transformedValue };
    a.annotations && (o.meta = { ...o.meta, values: a.annotations });
    const l = function(n, i) {
      const r = {};
      let u;
      return n.forEach((d) => {
        if (d.length <= 1) return;
        i || (d = d.map((O) => O.map(String)).sort((O, g) => O.length - g.length));
        const [m, ...f] = d;
        m.length === 0 ? u = f.map(Sn) : r[Sn(m)] = f.map(Sn);
      }), u ? Ln(r) ? [u] : [u, r] : Ln(r) ? void 0 : r;
    }(t, this.dedupe);
    return l && (o.meta = { ...o.meta, referentialEqualities: l }), o;
  }
  deserialize(e) {
    const { json: t, meta: a } = e;
    let o = $n(t);
    return a != null && a.values && (o = Wi(o, a.values, this)), a != null && a.referentialEqualities && (o = Gi(o, a.referentialEqualities)), o;
  }
  stringify(e) {
    return JSON.stringify(this.serialize(e));
  }
  parse(e) {
    return this.deserialize(JSON.parse(e));
  }
  registerClass(e, t) {
    this.classRegistry.register(e, t);
  }
  registerSymbol(e, t) {
    this.symbolRegistry.register(e, t);
  }
  registerCustom(e, t) {
    this.customTransformerRegistry.register({ name: t, ...e });
  }
  allowErrorProps(...e) {
    this.allowedErrorProps.push(...e);
  }
};
/**
  * vee-validate v4.14.7
  * (c) 2024 Abdelrahman Awad
  * @license MIT
  */
function je(e) {
  return typeof e == "function";
}
function el(e) {
  return e == null;
}
ge.defaultInstance = new ge(), ge.serialize = ge.defaultInstance.serialize.bind(ge.defaultInstance), ge.deserialize = ge.defaultInstance.deserialize.bind(ge.defaultInstance), ge.stringify = ge.defaultInstance.stringify.bind(ge.defaultInstance), ge.parse = ge.defaultInstance.parse.bind(ge.defaultInstance), ge.registerClass = ge.defaultInstance.registerClass.bind(ge.defaultInstance), ge.registerSymbol = ge.defaultInstance.registerSymbol.bind(ge.defaultInstance), ge.registerCustom = ge.defaultInstance.registerCustom.bind(ge.defaultInstance), ge.allowErrorProps = ge.defaultInstance.allowErrorProps.bind(ge.defaultInstance), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), k(), (Ya = j).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ != null || (Ya.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []), (Za = j).__VUE_DEVTOOLS_KIT_RPC_CLIENT__ != null || (Za.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null), (Xa = j).__VUE_DEVTOOLS_KIT_RPC_SERVER__ != null || (Xa.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null), (Ja = j).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ != null || (Ja.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null), (Qa = j).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ != null || (Qa.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null), (eo = j).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ != null || (eo.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null), k(), k(), k(), k(), k(), k(), k();
const ct = (e) => e !== null && !!e && typeof e == "object" && !Array.isArray(e);
function ra(e) {
  return Number(e) >= 0;
}
function to(e) {
  if (!/* @__PURE__ */ function(a) {
    return typeof a == "object" && a !== null;
  }(e) || function(a) {
    return a == null ? a === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(a);
  }(e) !== "[object Object]") return !1;
  if (Object.getPrototypeOf(e) === null) return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function Mt(e, t) {
  return Object.keys(t).forEach((a) => {
    if (to(t[a]) && to(e[a])) return e[a] || (e[a] = {}), void Mt(e[a], t[a]);
    e[a] = t[a];
  }), e;
}
function Lt(e) {
  const t = e.split(".");
  if (!t.length) return "";
  let a = String(t[0]);
  for (let o = 1; o < t.length; o++) ra(t[o]) ? a += `[${t[o]}]` : a += `.${t[o]}`;
  return a;
}
const Yi = {};
function no(e, t, a) {
  typeof a.value == "object" && (a.value = fe(a.value)), a.enumerable && !a.get && !a.set && a.configurable && a.writable && t !== "__proto__" ? e[t] = a.value : Object.defineProperty(e, t, a);
}
function fe(e) {
  if (typeof e != "object") return e;
  var t, a, o, l = 0, n = Object.prototype.toString.call(e);
  if (n === "[object Object]" ? o = Object.create(e.__proto__ || null) : n === "[object Array]" ? o = Array(e.length) : n === "[object Set]" ? (o = /* @__PURE__ */ new Set(), e.forEach(function(i) {
    o.add(fe(i));
  })) : n === "[object Map]" ? (o = /* @__PURE__ */ new Map(), e.forEach(function(i, r) {
    o.set(fe(r), fe(i));
  })) : n === "[object Date]" ? o = /* @__PURE__ */ new Date(+e) : n === "[object RegExp]" ? o = new RegExp(e.source, e.flags) : n === "[object DataView]" ? o = new e.constructor(fe(e.buffer)) : n === "[object ArrayBuffer]" ? o = e.slice(0) : n.slice(-6) === "Array]" && (o = new e.constructor(e)), o) {
    for (a = Object.getOwnPropertySymbols(e); l < a.length; l++) no(o, a[l], Object.getOwnPropertyDescriptor(e, a[l]));
    for (l = 0, a = Object.getOwnPropertyNames(e); l < a.length; l++) Object.hasOwnProperty.call(o, t = a[l]) && o[t] === e[t] || no(o, t, Object.getOwnPropertyDescriptor(e, t));
  }
  return o || e;
}
const sa = Symbol("vee-validate-form"), Zi = Symbol("vee-validate-form-context"), Xi = Symbol("vee-validate-field-instance"), cn = Symbol("Default empty value"), Ji = typeof window < "u";
function Fn(e) {
  return je(e) && !!e.__locatorRef;
}
function qe(e) {
  return !!e && je(e.parse) && e.__type === "VVTypedSchema";
}
function pn(e) {
  return !!e && je(e.validate);
}
function Zt(e) {
  return e === "checkbox" || e === "radio";
}
function hn(e) {
  return /^\[.+\]$/i.test(e);
}
function ao(e) {
  return e.tagName === "SELECT";
}
function Qi(e, t) {
  return !function(a, o) {
    const l = ![!1, null, void 0, 0].includes(o.multiple) && !Number.isNaN(o.multiple);
    return a === "select" && "multiple" in o && l;
  }(e, t) && t.type !== "file" && !Zt(t.type);
}
function tl(e) {
  return !!e && (!!(typeof Event < "u" && je(Event) && e instanceof Event) || !(!e || !e.srcElement));
}
function oo(e, t) {
  return t in e && e[t] !== cn;
}
function Le(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var a, o, l;
    if (Array.isArray(e)) {
      if ((a = e.length) != t.length) return !1;
      for (o = a; o-- != 0; ) if (!Le(e[o], t[o])) return !1;
      return !0;
    }
    if (e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (o of e.entries()) if (!t.has(o[0])) return !1;
      for (o of e.entries()) if (!Le(o[1], t.get(o[0]))) return !1;
      return !0;
    }
    if (io(e) && io(t)) return e.size === t.size && e.name === t.name && e.lastModified === t.lastModified && e.type === t.type;
    if (e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (o of e.entries()) if (!t.has(o[0])) return !1;
      return !0;
    }
    if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if ((a = e.length) != t.length) return !1;
      for (o = a; o-- != 0; ) if (e[o] !== t[o]) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    if ((a = (l = Object.keys(e)).length - lo(e, l)) !== Object.keys(t).length - lo(t, Object.keys(t))) return !1;
    for (o = a; o-- != 0; ) if (!Object.prototype.hasOwnProperty.call(t, l[o])) return !1;
    for (o = a; o-- != 0; ) {
      var n = l[o];
      if (!Le(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e != e && t != t;
}
function lo(e, t) {
  let a = 0;
  for (let o = t.length; o-- != 0; )
    e[t[o]] === void 0 && a++;
  return a;
}
function io(e) {
  return !!Ji && e instanceof File;
}
function ua(e) {
  return hn(e) ? e.replace(/\[|\]/gi, "") : e;
}
function He(e, t, a) {
  return e ? hn(t) ? e[ua(t)] : (t || "").split(/\.|\[(\d+)\]/).filter(Boolean).reduce((o, l) => {
    return (ct(n = o) || Array.isArray(n)) && l in o ? o[l] : a;
    var n;
  }, e) : a;
}
function Qe(e, t, a) {
  if (hn(t)) return void (e[ua(t)] = a);
  const o = t.split(/\.|\[(\d+)\]/).filter(Boolean);
  let l = e;
  for (let n = 0; n < o.length; n++) {
    if (n === o.length - 1) return void (l[o[n]] = a);
    o[n] in l && !el(l[o[n]]) || (l[o[n]] = ra(o[n + 1]) ? [] : {}), l = l[o[n]];
  }
}
function Tn(e, t) {
  Array.isArray(e) && ra(t) ? e.splice(Number(t), 1) : ct(e) && delete e[t];
}
function ro(e, t) {
  if (hn(t)) return void delete e[ua(t)];
  const a = t.split(/\.|\[(\d+)\]/).filter(Boolean);
  let o = e;
  for (let i = 0; i < a.length; i++) {
    if (i === a.length - 1) {
      Tn(o, a[i]);
      break;
    }
    if (!(a[i] in o) || el(o[a[i]])) break;
    o = o[a[i]];
  }
  const l = a.map((i, r) => He(e, a.slice(0, r).join(".")));
  for (let i = l.length - 1; i >= 0; i--) n = l[i], (Array.isArray(n) ? n.length === 0 : ct(n) && Object.keys(n).length === 0) && (i !== 0 ? Tn(l[i - 1], a[i - 1]) : Tn(e, a[0]));
  var n;
}
function Be(e) {
  return Object.keys(e);
}
function nl(e, t = void 0) {
  const a = ft();
  return (a == null ? void 0 : a.provides[e]) || at(e, t);
}
function so(e, t, a) {
  if (Array.isArray(e)) {
    const o = [...e], l = o.findIndex((n) => Le(n, t));
    return l >= 0 ? o.splice(l, 1) : o.push(t), o;
  }
  return Le(e, t) ? a : t;
}
function uo(e, t = 0) {
  let a = null, o = [];
  return function(...l) {
    return a && clearTimeout(a), a = setTimeout(() => {
      const n = e(...l);
      o.forEach((i) => i(n)), o = [];
    }, t), new Promise((n) => o.push(n));
  };
}
function er(e, t) {
  return ct(t) && t.number ? function(a) {
    const o = parseFloat(a);
    return isNaN(o) ? a : o;
  }(e) : e;
}
function zn(e, t) {
  let a;
  return async function(...o) {
    const l = e(...o);
    a = l;
    const n = await l;
    return l !== a ? n : (a = void 0, t(n, o));
  };
}
function Kn(e) {
  return Array.isArray(e) ? e : e ? [e] : [];
}
function tn(e, t) {
  const a = {};
  for (const o in e) t.includes(o) || (a[o] = e[o]);
  return a;
}
function wn(e) {
  if (al(e)) return e._value;
}
function al(e) {
  return "_value" in e;
}
function fn(e) {
  if (!tl(e)) return e;
  const t = e.target;
  if (Zt(t.type) && al(t)) return wn(t);
  if (t.type === "file" && t.files) {
    const o = Array.from(t.files);
    return t.multiple ? o : o[0];
  }
  if (ao(a = t) && a.multiple) return Array.from(t.options).filter((o) => o.selected && !o.disabled).map(wn);
  var a;
  if (ao(t)) {
    const o = Array.from(t.options).find((l) => l.selected);
    return o ? wn(o) : t.value;
  }
  return function(o) {
    return o.type === "number" || o.type === "range" ? Number.isNaN(o.valueAsNumber) ? o.value : o.valueAsNumber : o.value;
  }(t);
}
function ol(e) {
  const t = {};
  return Object.defineProperty(t, "_$$isNormalized", { value: !0, writable: !1, enumerable: !1, configurable: !1 }), e ? ct(e) && e._$$isNormalized ? e : ct(e) ? Object.keys(e).reduce((a, o) => {
    const l = function(n) {
      return n === !0 ? [] : Array.isArray(n) || ct(n) ? n : [n];
    }(e[o]);
    return e[o] !== !1 && (a[o] = co(l)), a;
  }, t) : typeof e != "string" ? t : e.split("|").reduce((a, o) => {
    const l = tr(o);
    return l.name && (a[l.name] = co(l.params)), a;
  }, t) : t;
}
function co(e) {
  const t = (a) => typeof a == "string" && a[0] === "@" ? function(o) {
    const l = (n) => {
      var i;
      return (i = He(n, o)) !== null && i !== void 0 ? i : n[o];
    };
    return l.__locatorRef = o, l;
  }(a.slice(1)) : a;
  return Array.isArray(e) ? e.map(t) : e instanceof RegExp ? [e] : Object.keys(e).reduce((a, o) => (a[o] = t(e[o]), a), {});
}
const tr = (e) => {
  let t = [];
  const a = e.split(":")[0];
  return e.includes(":") && (t = e.split(":").slice(1).join(":").split(",")), { name: a, params: t };
};
let nr = Object.assign({}, { generateMessage: ({ field: e }) => `${e} is not valid.`, bails: !0, validateOnBlur: !0, validateOnChange: !0, validateOnInput: !1, validateOnModelUpdate: !0 });
const mt = () => nr;
async function ll(e, t, a = {}) {
  const o = a == null ? void 0 : a.bails, l = { name: (a == null ? void 0 : a.name) || "{field}", rules: t, label: a == null ? void 0 : a.label, bails: o == null || o, formData: (a == null ? void 0 : a.values) || {} }, n = await async function(i, r) {
    const u = i.rules;
    if (qe(u) || pn(u)) return async function(g, y) {
      const h = qe(y.rules) ? y.rules : il(y.rules), v = await h.parse(g, { formData: y.formData }), w = [];
      for (const T of v.errors) T.errors.length && w.push(...T.errors);
      return { value: v.value, errors: w };
    }(r, Object.assign(Object.assign({}, i), { rules: u }));
    if (je(u) || Array.isArray(u)) {
      const g = { field: i.label || i.name, name: i.name, label: i.label, form: i.formData, value: r }, y = Array.isArray(u) ? u : [u], h = y.length, v = [];
      for (let w = 0; w < h; w++) {
        const T = y[w], C = await T(r, g);
        if (!(typeof C != "string" && !Array.isArray(C) && C)) {
          if (Array.isArray(C)) v.push(...C);
          else {
            const L = typeof C == "string" ? C : rl(g);
            v.push(L);
          }
          if (i.bails) return { errors: v };
        }
      }
      return { errors: v };
    }
    const d = Object.assign(Object.assign({}, i), { rules: ol(u) }), m = [], f = Object.keys(d.rules), O = f.length;
    for (let g = 0; g < O; g++) {
      const y = f[g], h = await ar(d, r, { name: y, params: d.rules[y] });
      if (h.error && (m.push(h.error), i.bails)) return { errors: m };
    }
    return { errors: m };
  }(l, e);
  return Object.assign(Object.assign({}, n), { valid: !n.errors.length });
}
function il(e) {
  return { __type: "VVTypedSchema", async parse(a, o) {
    var l;
    try {
      return { output: await e.validate(a, { abortEarly: !1, context: (o == null ? void 0 : o.formData) || {} }), errors: [] };
    } catch (n) {
      if (!function(r) {
        return !!r && r.name === "ValidationError";
      }(n)) throw n;
      if (!(!((l = n.inner) === null || l === void 0) && l.length) && n.errors.length) return { errors: [{ path: n.path, errors: n.errors }] };
      const i = n.inner.reduce((r, u) => {
        const d = u.path || "";
        return r[d] || (r[d] = { errors: [], path: d }), r[d].errors.push(...u.errors), r;
      }, {});
      return { errors: Object.values(i) };
    }
  } };
}
async function ar(e, t, a) {
  const o = (l = a.name, Yi[l]);
  var l;
  if (!o) throw new Error(`No such validator '${a.name}' exists.`);
  const n = function(u, d) {
    const m = (f) => Fn(f) ? f(d) : f;
    return Array.isArray(u) ? u.map(m) : Object.keys(u).reduce((f, O) => (f[O] = m(u[O]), f), {});
  }(a.params, e.formData), i = { field: e.label || e.name, name: e.name, label: e.label, value: t, form: e.formData, rule: Object.assign(Object.assign({}, a), { params: n }) }, r = await o(t, n, i);
  return typeof r == "string" ? { error: r } : { error: r ? void 0 : rl(i) };
}
function rl(e) {
  const t = mt().generateMessage;
  return t ? t(e) : "Field is invalid";
}
async function or(e, t, a) {
  const o = Be(e).map(async (u) => {
    var d, m, f;
    const O = (d = a == null ? void 0 : a.names) === null || d === void 0 ? void 0 : d[u], g = await ll(He(t, u), e[u], { name: (O == null ? void 0 : O.name) || u, label: O == null ? void 0 : O.label, values: t, bails: (f = (m = a == null ? void 0 : a.bailsMap) === null || m === void 0 ? void 0 : m[u]) === null || f === void 0 || f });
    return Object.assign(Object.assign({}, g), { path: u });
  });
  let l = !0;
  const n = await Promise.all(o), i = {}, r = {};
  for (const u of n) i[u.path] = { valid: u.valid, errors: u.errors }, u.valid || (l = !1, r[u.path] = u.errors[0]);
  return { valid: l, results: i, errors: r, source: "schema" };
}
let po = 0;
function lr(e, t) {
  const { value: a, initialValue: o, setInitialValue: l } = function(r, u, d) {
    const m = _e(s(u));
    function f() {
      return d ? He(d.initialValues.value, s(r), s(m)) : s(m);
    }
    function O(v) {
      d ? d.setFieldInitialValue(s(r), v, !0) : m.value = v;
    }
    const g = S(f);
    if (!d)
      return { value: _e(f()), initialValue: g, setInitialValue: O };
    const y = function(v, w, T, C) {
      return nt(v) ? s(v) : v !== void 0 ? v : He(w.values, s(C), s(T));
    }(u, d, g, r);
    return d.stageInitialValue(s(r), y, !0), { value: S({ get: () => He(d.values, s(r)), set(v) {
      d.setFieldValue(s(r), v, !1);
    } }), initialValue: g, setInitialValue: O };
  }(e, t.modelValue, t.form);
  if (!t.form) {
    let f = function(O) {
      var g;
      "value" in O && (a.value = O.value), "errors" in O && u(O.errors), "touched" in O && (m.touched = (g = O.touched) !== null && g !== void 0 ? g : m.touched), "initialValue" in O && l(O.initialValue);
    };
    const { errors: r, setErrors: u } = function() {
      const O = _e([]);
      return { errors: O, setErrors: (g) => {
        O.value = Kn(g);
      } };
    }(), d = po >= Number.MAX_SAFE_INTEGER ? 0 : ++po, m = function(O, g, y, h) {
      const v = S(() => {
        var T, C, L;
        return (L = (C = (T = N(h)) === null || T === void 0 ? void 0 : T.describe) === null || C === void 0 ? void 0 : C.call(T).required) !== null && L !== void 0 && L;
      }), w = Vt({ touched: !1, pending: !1, valid: !0, required: v, validated: !!s(y).length, initialValue: S(() => s(g)), dirty: S(() => !Le(s(O), s(g))) });
      return et(y, (T) => {
        w.valid = !T.length;
      }, { immediate: !0, flush: "sync" }), w;
    }(a, o, r, t.schema);
    return { id: d, path: e, value: a, initialValue: o, meta: m, flags: { pendingUnmount: { [d]: !1 }, pendingReset: !1 }, errors: r, setState: f };
  }
  const n = t.form.createPathState(e, { bails: t.bails, label: t.label, type: t.type, validate: t.validate, schema: t.schema }), i = S(() => n.errors);
  return { id: Array.isArray(n.id) ? n.id[n.id.length - 1] : n.id, path: e, value: a, errors: i, meta: n, initialValue: o, flags: n.__flags, setState: function(r) {
    var u, d, m;
    "value" in r && (a.value = r.value), "errors" in r && ((u = t.form) === null || u === void 0 || u.setFieldError(s(e), r.errors)), "touched" in r && ((d = t.form) === null || d === void 0 || d.setFieldTouched(s(e), (m = r.touched) !== null && m !== void 0 && m)), "initialValue" in r && l(r.initialValue);
  } };
}
const $t = {}, Ft = {}, zt = "vee-validate-inspector", ir = 12405579, rr = 448379, sr = 5522283, vn = 16777215, qn = 0, ur = 218007, dr = 12157168, cr = 16099682, pr = 12304330;
let ht, Se = null;
function sl(e) {
  var t, a;
  process.env.NODE_ENV !== "production" && (t = { id: "vee-validate-devtools-plugin", label: "VeeValidate Plugin", packageName: "vee-validate", homepage: "https://vee-validate.logaretm.com/v4", app: e, logo: "https://vee-validate.logaretm.com/v4/logo.png" }, a = (o) => {
    ht = o, o.addInspector({ id: zt, icon: "rule", label: "vee-validate", noSelectionText: "Select a vee-validate node to inspect", actions: [{ icon: "done_outline", tooltip: "Validate selected item", action: async () => {
      Se ? Se.type !== "field" ? Se.type !== "form" ? Se.type === "pathState" && await Se.form.validateField(Se.state.path) : await Se.form.validate() : await Se.field.validate() : console.error("There is not a valid selected vee-validate node or component");
    } }, { icon: "delete_sweep", tooltip: "Clear validation state of the selected item", action: () => {
      Se ? Se.type !== "field" ? (Se.type === "form" && Se.form.resetForm(), Se.type === "pathState" && Se.form.resetField(Se.state.path)) : Se.field.resetField() : console.error("There is not a valid selected vee-validate node or component");
    } }] }), o.on.getInspectorTree((l) => {
      if (l.inspectorId !== zt) return;
      const n = Object.values($t), i = Object.values(Ft);
      l.rootNodes = [...n.map(fr), ...i.map((r) => function(u, d) {
        return { id: Wn(d, u), label: s(u.name), tags: ul(!1, 1, u.type, u.meta.valid, d) };
      }(r))];
    }), o.on.getInspectorState((l) => {
      if (l.inspectorId !== zt) return;
      const { form: n, field: i, state: r, type: u } = function(d) {
        try {
          const m = JSON.parse(decodeURIComponent(atob(d))), f = $t[m.f];
          if (!f && m.ff) {
            const g = Ft[m.ff];
            return g ? { type: m.type, field: g } : {};
          }
          if (!f) return {};
          const O = f.getPathState(m.ff);
          return { type: m.type, form: f, state: O };
        } catch {
        }
        return {};
      }(l.nodeId);
      return o.unhighlightElement(), n && u === "form" ? (l.state = function(d) {
        const { errorBag: m, meta: f, values: O, isSubmitting: g, isValidating: y, submitCount: h } = d;
        return { "Form state": [{ key: "submitCount", value: h.value }, { key: "isSubmitting", value: g.value }, { key: "isValidating", value: y.value }, { key: "touched", value: f.value.touched }, { key: "dirty", value: f.value.dirty }, { key: "valid", value: f.value.valid }, { key: "initialValues", value: f.value.initialValues }, { key: "currentValues", value: O }, { key: "errors", value: Be(m.value).reduce((v, w) => {
          var T;
          const C = (T = m.value[w]) === null || T === void 0 ? void 0 : T[0];
          return C && (v[w] = C), v;
        }, {}) }] };
      }(n), Se = { type: "form", form: n }, void o.highlightElement(n._vm)) : r && u === "pathState" && n ? (l.state = fo(r), void (Se = { type: "pathState", state: r, form: n })) : i && u === "field" ? (l.state = fo({ errors: i.errors.value, dirty: i.meta.dirty, valid: i.meta.valid, touched: i.meta.touched, value: i.value.value, initialValue: i.meta.initialValue }), Se = { field: i, type: "field" }, void o.highlightElement(i._vm)) : (Se = null, void o.unhighlightElement());
    });
  }, Mo.setupDevToolsPlugin(t, a));
}
const It = /* @__PURE__ */ function(e, t) {
  let a, o;
  return function(...l) {
    const n = this;
    return a || (a = !0, setTimeout(() => a = !1, t), o = e.apply(n, l)), o;
  };
}(() => {
  setTimeout(async () => {
    await Ke(), ht == null || ht.sendInspectorState(zt), ht == null || ht.sendInspectorTree(zt);
  }, 100);
}, 100);
function fr(e) {
  const { textColor: t, bgColor: a } = dl(e.meta.value.valid), o = {};
  Object.values(e.getAllPathStates()).forEach((n) => {
    Qe(o, N(n.path), function(i, r) {
      return { id: Wn(r, i), label: N(i.path), tags: ul(i.multiple, i.fieldsCount, i.type, i.valid, r) };
    }(n, e));
  });
  const { children: l } = function n(i, r = []) {
    const u = [...r].pop();
    return "id" in i ? Object.assign(Object.assign({}, i), { label: u || i.label }) : ct(i) ? { id: `${r.join(".")}`, label: u || "", children: Object.keys(i).map((d) => n(i[d], [...r, d])) } : Array.isArray(i) ? { id: `${r.join(".")}`, label: `${u}[]`, children: i.map((d, m) => n(d, [...r, String(m)])) } : { id: "", label: "", children: [] };
  }(o);
  return { id: Wn(e), label: e.name, children: l, tags: [{ label: "Form", textColor: t, backgroundColor: a }, { label: `${e.getAllPathStates().length} fields`, textColor: vn, backgroundColor: sr }] };
}
function ul(e, t, a, o, l) {
  const { textColor: n, bgColor: i } = dl(o);
  return [e ? void 0 : { label: "Field", textColor: n, backgroundColor: i }, l ? void 0 : { label: "Standalone", textColor: qn, backgroundColor: pr }, a === "checkbox" ? { label: "Checkbox", textColor: vn, backgroundColor: ur } : void 0, a === "radio" ? { label: "Radio", textColor: vn, backgroundColor: dr } : void 0, e ? { label: "Multiple", textColor: qn, backgroundColor: cr } : void 0].filter(Boolean);
}
function Wn(e, t) {
  const a = t ? "path" in t ? "pathState" : "field" : "form", o = t ? "path" in t ? t == null ? void 0 : t.path : N(t == null ? void 0 : t.name) : "", l = { f: e == null ? void 0 : e.formId, ff: (t == null ? void 0 : t.id) || o, type: a };
  return btoa(encodeURIComponent(JSON.stringify(l)));
}
function fo(e) {
  return { "Field state": [{ key: "errors", value: e.errors }, { key: "initialValue", value: e.initialValue }, { key: "currentValue", value: e.value }, { key: "touched", value: e.touched }, { key: "dirty", value: e.dirty }, { key: "valid", value: e.valid }] };
}
function dl(e) {
  return { bgColor: e ? rr : ir, textColor: e ? qn : vn };
}
function At(e, t, a) {
  return Zt(a == null ? void 0 : a.type) ? function(o, l, n) {
    const i = n != null && n.standalone ? void 0 : nl(sa), r = n == null ? void 0 : n.checkedValue, u = n == null ? void 0 : n.uncheckedValue;
    function d(m) {
      const f = m.handleChange, O = S(() => {
        const y = N(m.value), h = N(r);
        return Array.isArray(y) ? y.findIndex((v) => Le(v, h)) >= 0 : Le(h, y);
      });
      function g(y, h = !0) {
        var v, w;
        if (O.value === ((v = y == null ? void 0 : y.target) === null || v === void 0 ? void 0 : v.checked)) return void (h && m.validate());
        const T = N(o), C = i == null ? void 0 : i.getPathState(T), L = fn(y);
        let $ = (w = N(r)) !== null && w !== void 0 ? w : L;
        i && (C != null && C.multiple) && C.type === "checkbox" ? $ = so(He(i.values, T) || [], $, void 0) : (n == null ? void 0 : n.type) === "checkbox" && ($ = so(N(m.value), $, N(u))), f($, h);
      }
      return Object.assign(Object.assign({}, m), { checked: O, checkedValue: r, uncheckedValue: u, handleChange: g });
    }
    return d(vo(o, l, n));
  }(e, t, a) : vo(e, t, a);
}
function vo(e, t, a) {
  const { initialValue: o, validateOnMount: l, bails: n, type: i, checkedValue: r, label: u, validateOnValueUpdate: d, uncheckedValue: m, controlled: f, keepValueOnUnmount: O, syncVModel: g, form: y } = function(b) {
    const F = () => ({ initialValue: void 0, validateOnMount: !1, bails: !0, label: void 0, validateOnValueUpdate: !0, keepValueOnUnmount: void 0, syncVModel: !1, controlled: !0 }), ue = !!(b != null && b.syncVModel), H = typeof (b == null ? void 0 : b.syncVModel) == "string" ? b.syncVModel : (b == null ? void 0 : b.modelPropName) || "modelValue", ce = ue && !("initialValue" in (b || {})) ? Cn(ft(), H) : b == null ? void 0 : b.initialValue;
    if (!b) return Object.assign(Object.assign({}, F()), { initialValue: ce });
    const oe = "valueProp" in b ? b.valueProp : b.checkedValue, Ie = "standalone" in b ? !b.standalone : b.controlled, he = (b == null ? void 0 : b.modelPropName) || (b == null ? void 0 : b.syncVModel) || !1;
    return Object.assign(Object.assign(Object.assign({}, F()), b || {}), { initialValue: ce, controlled: Ie == null || Ie, checkedValue: oe, syncVModel: he });
  }(a), h = f ? nl(sa) : void 0, v = y || h, w = S(() => Lt(N(e))), T = S(() => {
    if (N(v == null ? void 0 : v.schema)) return;
    const b = s(t);
    return pn(b) || qe(b) || je(b) || Array.isArray(b) ? b : ol(b);
  }), C = !je(T.value) && qe(N(t)), { id: L, value: $, initialValue: de, meta: Q, setState: se, errors: ae, flags: te } = lr(w, { modelValue: o, form: v, bails: n, label: u, type: i, validate: T.value ? ne : void 0, schema: C ? t : void 0 }), A = S(() => ae.value[0]);
  g && function({ prop: b, value: F, handleChange: ue, shouldValidate: H }) {
    const ce = ft();
    if (!ce || !b) return void (process.env.NODE_ENV !== "production" && console.warn("Failed to setup model events because `useField` was not called in setup."));
    const oe = typeof b == "string" ? b : "modelValue", Ie = `update:${oe}`;
    oe in ce.props && (et(F, (he) => {
      Le(he, Cn(ce, oe)) || ce.emit(Ie, he);
    }), et(() => Cn(ce, oe), (he) => {
      if (he === cn && F.value === void 0) return;
      const V = he === cn ? void 0 : he;
      Le(V, F.value) || ue(V, H());
    }));
  }({ value: $, prop: g, handleChange: J, shouldValidate: () => d && !te.pendingReset });
  async function B(b) {
    var F, ue;
    if (v != null && v.validateSchema) {
      const { results: H } = await v.validateSchema(b);
      return (F = H[N(w)]) !== null && F !== void 0 ? F : { valid: !0, errors: [] };
    }
    return T.value ? ll($.value, T.value, { name: N(w), label: N(u), values: (ue = v == null ? void 0 : v.values) !== null && ue !== void 0 ? ue : {}, bails: n }) : { valid: !0, errors: [] };
  }
  const ie = zn(async () => (Q.pending = !0, Q.validated = !0, B("validated-only")), (b) => (te.pendingUnmount[Z.id] || (se({ errors: b.errors }), Q.pending = !1, Q.valid = b.valid), b)), z = zn(async () => B("silent"), (b) => (Q.valid = b.valid, b));
  function ne(b) {
    return (b == null ? void 0 : b.mode) === "silent" ? z() : ie();
  }
  function J(b, F = !0) {
    le(fn(b), F);
  }
  function K(b) {
    var F;
    const ue = b && "value" in b ? b.value : de.value;
    se({ value: fe(ue), initialValue: fe(ue), touched: (F = b == null ? void 0 : b.touched) !== null && F !== void 0 && F, errors: (b == null ? void 0 : b.errors) || [] }), Q.pending = !1, Q.validated = !1, z();
  }
  Gn(() => {
    if (l) return ie();
    v && v.validateSchema || z();
  });
  const G = ft();
  function le(b, F = !0) {
    $.value = G && g ? er(b, G.props.modelModifiers) : b, (F ? ie : z)();
  }
  const Y = S({ get: () => $.value, set(b) {
    le(b, d);
  } }), Z = { id: L, name: w, label: u, value: Y, meta: Q, errors: ae, errorMessage: A, type: i, checkedValue: r, uncheckedValue: m, bails: n, keepValueOnUnmount: O, resetField: K, handleReset: () => K(), validate: ne, handleChange: J, handleBlur: (b, F = !1) => {
    Q.touched = !0, F && ie();
  }, setState: se, setTouched: function(b) {
    Q.touched = b;
  }, setErrors: function(b) {
    se({ errors: Array.isArray(b) ? b : [b] });
  }, setValue: le };
  if (Kt(Xi, Z), nt(t) && typeof s(t) != "function" && et(t, (b, F) => {
    Le(b, F) || (Q.validated ? ie() : z());
  }, { deep: !0 }), process.env.NODE_ENV !== "production" && (Z._vm = ft(), et(() => Object.assign(Object.assign({ errors: ae.value }, Q), { value: $.value }), It, { deep: !0 }), v || function(b) {
    const F = ft();
    if (!ht) {
      const ue = F == null ? void 0 : F.appContext.app;
      if (!ue) return;
      sl(ue);
    }
    Ft[b.id] = Object.assign({}, b), Ft[b.id]._vm = F, yt(() => {
      delete Ft[b.id], It();
    }), It();
  }(Z)), !v) return Z;
  const pe = S(() => {
    const b = T.value;
    return !b || je(b) || pn(b) || qe(b) || Array.isArray(b) ? {} : Object.keys(b).reduce((F, ue) => {
      const H = (ce = b[ue], Array.isArray(ce) ? ce.filter(Fn) : Be(ce).filter((oe) => Fn(ce[oe])).map((oe) => ce[oe])).map((oe) => oe.__locatorRef).reduce((oe, Ie) => {
        const he = He(v.values, Ie) || v.values[Ie];
        return he !== void 0 && (oe[Ie] = he), oe;
      }, {});
      var ce;
      return Object.assign(F, H), F;
    }, {});
  });
  return et(pe, (b, F) => {
    Object.keys(b).length && !Le(b, F) && (Q.validated ? ie() : z());
  }), fl(() => {
    var b;
    const F = (b = N(Z.keepValueOnUnmount)) !== null && b !== void 0 ? b : N(v.keepValuesOnUnmount), ue = N(w);
    if (F || !v || te.pendingUnmount[Z.id]) return void (v == null || v.removePathState(ue, L));
    te.pendingUnmount[Z.id] = !0;
    const H = v.getPathState(ue);
    if (Array.isArray(H == null ? void 0 : H.id) && (H != null && H.multiple) ? H != null && H.id.includes(Z.id) : (H == null ? void 0 : H.id) === Z.id) {
      if (H != null && H.multiple && Array.isArray(H.value)) {
        const ce = H.value.findIndex((oe) => Le(oe, N(Z.checkedValue)));
        if (ce > -1) {
          const oe = [...H.value];
          oe.splice(ce, 1), v.setFieldValue(ue, oe);
        }
        Array.isArray(H.id) && H.id.splice(H.id.indexOf(Z.id), 1);
      } else v.unsetPathValue(N(w));
      v.removePathState(ue, L);
    }
  }), Z;
}
function Cn(e, t) {
  if (e) return e.props[t];
}
const vr = Ge({ name: "Field", inheritAttrs: !1, props: { as: { type: [String, Object], default: void 0 }, name: { type: String, required: !0 }, rules: { type: [Object, String, Function], default: void 0 }, validateOnMount: { type: Boolean, default: !1 }, validateOnBlur: { type: Boolean, default: void 0 }, validateOnChange: { type: Boolean, default: void 0 }, validateOnInput: { type: Boolean, default: void 0 }, validateOnModelUpdate: { type: Boolean, default: void 0 }, bails: { type: Boolean, default: () => mt().bails }, label: { type: String, default: void 0 }, uncheckedValue: { type: null, default: void 0 }, modelValue: { type: null, default: cn }, modelModifiers: { type: null, default: () => ({}) }, "onUpdate:modelValue": { type: null, default: void 0 }, standalone: { type: Boolean, default: !1 }, keepValue: { type: Boolean, default: void 0 } }, setup(e, t) {
  const a = xt(e, "rules"), o = xt(e, "name"), l = xt(e, "label"), n = xt(e, "uncheckedValue"), i = xt(e, "keepValue"), { errors: r, value: u, errorMessage: d, validate: m, handleChange: f, handleBlur: O, setTouched: g, resetField: y, handleReset: h, meta: v, checked: w, setErrors: T, setValue: C } = At(o, a, { validateOnMount: e.validateOnMount, bails: e.bails, standalone: e.standalone, type: t.attrs.type, initialValue: mr(e, t), checkedValue: t.attrs.value, uncheckedValue: n, label: l, validateOnValueUpdate: e.validateOnModelUpdate, keepValueOnUnmount: i, syncVModel: !0 }), L = function(ae, te = !0) {
    f(ae, te);
  }, $ = S(() => {
    const { validateOnInput: ae, validateOnChange: te, validateOnBlur: A, validateOnModelUpdate: B } = function(z) {
      var ne, J, K, G;
      const { validateOnInput: le, validateOnChange: Y, validateOnBlur: Z, validateOnModelUpdate: pe } = mt();
      return { validateOnInput: (ne = z.validateOnInput) !== null && ne !== void 0 ? ne : le, validateOnChange: (J = z.validateOnChange) !== null && J !== void 0 ? J : Y, validateOnBlur: (K = z.validateOnBlur) !== null && K !== void 0 ? K : Z, validateOnModelUpdate: (G = z.validateOnModelUpdate) !== null && G !== void 0 ? G : pe };
    }(e);
    return { name: e.name, onBlur: function(z) {
      O(z, A), je(t.attrs.onBlur) && t.attrs.onBlur(z);
    }, onInput: function(z) {
      L(z, ae), je(t.attrs.onInput) && t.attrs.onInput(z);
    }, onChange: function(z) {
      L(z, te), je(t.attrs.onChange) && t.attrs.onChange(z);
    }, "onUpdate:modelValue": (z) => L(z, B) };
  }), de = S(() => {
    const ae = Object.assign({}, $.value);
    return Zt(t.attrs.type) && w && (ae.checked = w.value), Qi(mo(e, t), t.attrs) && (ae.value = u.value), ae;
  }), Q = S(() => Object.assign(Object.assign({}, $.value), { modelValue: u.value }));
  function se() {
    return { field: de.value, componentField: Q.value, value: u.value, meta: v, errors: r.value, errorMessage: d.value, validate: m, resetField: y, handleChange: L, handleInput: (ae) => L(ae, !1), handleReset: h, handleBlur: $.value.onBlur, setTouched: g, setErrors: T, setValue: C };
  }
  return t.expose({ value: u, meta: v, errors: r, errorMessage: d, setErrors: T, setTouched: g, setValue: C, reset: y, validate: m, handleChange: f }), () => {
    const ae = go(mo(e, t)), te = function(A, B, ie) {
      return B.slots.default ? typeof A != "string" && A ? { default: () => {
        var z, ne;
        return (ne = (z = B.slots).default) === null || ne === void 0 ? void 0 : ne.call(z, ie());
      } } : B.slots.default(ie()) : B.slots.default;
    }(ae, t, se);
    return ae ? gl(ae, Object.assign(Object.assign({}, t.attrs), de.value), te) : te;
  };
} });
function mo(e, t) {
  let a = e.as || "";
  return e.as || t.slots.default || (a = "input"), a;
}
function mr(e, t) {
  return Zt(t.attrs.type) ? oo(e, "modelValue") ? e.modelValue : void 0 : oo(e, "modelValue") ? e.modelValue : t.attrs.value;
}
const hr = vr;
let gr = 0;
const nn = ["bails", "fieldsCount", "id", "multiple", "type", "validate"];
function ho(e) {
  const t = (e == null ? void 0 : e.initialValues) || {}, a = Object.assign({}, N(t)), o = s(e == null ? void 0 : e.validationSchema);
  return o && qe(o) && je(o.cast) ? fe(o.cast(a) || {}) : fe(a);
}
function _r(e) {
  var t;
  const a = gr++, o = (e == null ? void 0 : e.name) || "Form";
  let l = 0;
  const n = _e(!1), i = _e(!1), r = _e(0), u = [], d = Vt(ho(e)), m = _e([]), f = _e({}), O = _e({}), g = /* @__PURE__ */ function(p) {
    let c = null, _ = [];
    return function(...I) {
      const E = Ke(() => {
        if (c !== E) return;
        const U = p(...I);
        _.forEach((x) => x(U)), _ = [], c = null;
      });
      return c = E, new Promise((U) => _.push(U));
    };
  }(() => {
    O.value = m.value.reduce((p, c) => (p[Lt(N(c.path))] = c, p), {});
  });
  function y(p, c) {
    const _ = K(p);
    if (_) {
      if (typeof p == "string") {
        const I = Lt(p);
        f.value[I] && delete f.value[I];
      }
      _.errors = Kn(c), _.valid = !_.errors.length;
    } else typeof p == "string" && (f.value[Lt(p)] = Kn(c));
  }
  function h(p) {
    Be(p).forEach((c) => {
      y(c, p[c]);
    });
  }
  e != null && e.initialErrors && h(e.initialErrors);
  const v = S(() => {
    const p = m.value.reduce((c, _) => (_.errors.length && (c[N(_.path)] = _.errors), c), {});
    return Object.assign(Object.assign({}, f.value), p);
  }), w = S(() => Be(v.value).reduce((p, c) => {
    const _ = v.value[c];
    return _ != null && _.length && (p[c] = _[0]), p;
  }, {})), T = S(() => m.value.reduce((p, c) => (p[N(c.path)] = { name: N(c.path) || "", label: c.label || "" }, p), {})), C = S(() => m.value.reduce((p, c) => {
    var _;
    return p[N(c.path)] = (_ = c.bails) === null || _ === void 0 || _, p;
  }, {})), L = Object.assign({}, (e == null ? void 0 : e.initialErrors) || {}), $ = (t = e == null ? void 0 : e.keepValuesOnUnmount) !== null && t !== void 0 && t, { initialValues: de, originalInitialValues: Q, setInitialValues: se } = function(p, c, _) {
    const I = ho(_), E = _e(I), U = _e(fe(I));
    function x(q, ee) {
      ee != null && ee.force ? (E.value = fe(q), U.value = fe(q)) : (E.value = Mt(fe(E.value) || {}, fe(q)), U.value = Mt(fe(U.value) || {}, fe(q))), ee != null && ee.updateFields && p.value.forEach((ye) => {
        if (ye.touched) return;
        const W = He(E.value, N(ye.path));
        Qe(c, N(ye.path), fe(W));
      });
    }
    return { initialValues: E, originalInitialValues: U, setInitialValues: x };
  }(m, d, e), ae = function(p, c, _, I) {
    const E = { touched: "some", pending: "some", valid: "every" }, U = S(() => !Le(c, s(_)));
    function x() {
      const ee = p.value;
      return Be(E).reduce((ye, W) => {
        const Ve = E[W];
        return ye[W] = ee[Ve]((be) => be[W]), ye;
      }, {});
    }
    const q = Vt(x());
    return hl(() => {
      const ee = x();
      q.touched = ee.touched, q.valid = ee.valid, q.pending = ee.pending;
    }), S(() => Object.assign(Object.assign({ initialValues: s(_) }, q), { valid: q.valid && !Be(I.value).length, dirty: U.value }));
  }(m, d, Q, w), te = S(() => m.value.reduce((p, c) => {
    const _ = He(d, N(c.path));
    return Qe(p, N(c.path), _), p;
  }, {})), A = e == null ? void 0 : e.validationSchema;
  function B(p, c) {
    var _, I;
    const E = S(() => He(de.value, N(p))), U = O.value[N(p)], x = (c == null ? void 0 : c.type) === "checkbox" || (c == null ? void 0 : c.type) === "radio";
    if (U && x) {
      U.multiple = !0;
      const Ee = l++;
      return Array.isArray(U.id) ? U.id.push(Ee) : U.id = [U.id, Ee], U.fieldsCount++, U.__flags.pendingUnmount[Ee] = !1, U;
    }
    const q = S(() => He(d, N(p))), ee = N(p), ye = le.findIndex((Ee) => Ee === ee);
    ye !== -1 && le.splice(ye, 1);
    const W = S(() => {
      var Ee, De, Ye, bt;
      const ze = N(A);
      if (qe(ze)) return (De = (Ee = ze.describe) === null || Ee === void 0 ? void 0 : Ee.call(ze, N(p)).required) !== null && De !== void 0 && De;
      const lt = N(c == null ? void 0 : c.schema);
      return !!qe(lt) && (bt = (Ye = lt.describe) === null || Ye === void 0 ? void 0 : Ye.call(lt).required) !== null && bt !== void 0 && bt;
    }), Ve = l++, be = Vt({ id: Ve, path: p, touched: !1, pending: !1, valid: !0, validated: !!(!((_ = L[ee]) === null || _ === void 0) && _.length), required: W, initialValue: E, errors: An([]), bails: (I = c == null ? void 0 : c.bails) !== null && I !== void 0 && I, label: c == null ? void 0 : c.label, type: (c == null ? void 0 : c.type) || "default", value: q, multiple: !1, __flags: { pendingUnmount: { [Ve]: !1 }, pendingReset: !1 }, fieldsCount: 1, validate: c == null ? void 0 : c.validate, dirty: S(() => !Le(s(q), s(E))) });
    return m.value.push(be), O.value[ee] = be, g(), w.value[ee] && !L[ee] && Ke(() => {
      V(ee, { mode: "silent" });
    }), nt(p) && et(p, (Ee) => {
      g();
      const De = fe(q.value);
      O.value[Ee] = be, Ke(() => {
        Qe(d, Ee, De);
      });
    }), be;
  }
  const ie = uo(we, 5), z = uo(we, 5), ne = zn(async (p) => await (p === "silent" ? ie() : z()), (p, [c]) => {
    const _ = Be(pe.errorBag.value), I = [.../* @__PURE__ */ new Set([...Be(p.results), ...m.value.map((E) => E.path), ..._])].sort().reduce((E, U) => {
      var x;
      const q = U, ee = K(q) || function(be) {
        return m.value.filter((De) => be.startsWith(N(De.path))).reduce((De, Ye) => De ? Ye.path.length > De.path.length ? Ye : De : Ye, void 0);
      }(q), ye = ((x = p.results[q]) === null || x === void 0 ? void 0 : x.errors) || [], W = N(ee == null ? void 0 : ee.path) || q, Ve = function(be, Ee) {
        return Ee ? { valid: be.valid && Ee.valid, errors: [...be.errors, ...Ee.errors] } : be;
      }({ errors: ye, valid: !ye.length }, E.results[W]);
      return E.results[W] = Ve, Ve.valid || (E.errors[W] = Ve.errors[0]), ee && f.value[W] && delete f.value[W], ee ? (ee.valid = Ve.valid, c === "silent" || (c !== "validated-only" || ee.validated) && y(ee, Ve.errors), E) : (y(W, ye), E);
    }, { valid: p.valid, results: {}, errors: {}, source: p.source });
    return p.values && (I.values = p.values, I.source = p.source), Be(I.results).forEach((E) => {
      var U;
      const x = K(E);
      x && c !== "silent" && (c !== "validated-only" || x.validated) && y(x, (U = I.results[E]) === null || U === void 0 ? void 0 : U.errors);
    }), I;
  });
  function J(p) {
    m.value.forEach(p);
  }
  function K(p) {
    const c = typeof p == "string" ? Lt(p) : p;
    return typeof c == "string" ? O.value[c] : c;
  }
  let G, le = [];
  function Y(p) {
    return function(c, _) {
      return function(I) {
        return I instanceof Event && (I.preventDefault(), I.stopPropagation()), J((E) => E.touched = !0), n.value = !0, r.value++, he().then((E) => {
          const U = fe(d);
          if (E.valid && typeof c == "function") {
            const x = fe(te.value);
            let q = p ? x : U;
            return E.values && (q = E.source === "schema" ? E.values : Object.assign({}, q, E.values)), c(q, { evt: I, controlledValues: x, setErrors: h, setFieldError: y, setTouched: ce, setFieldTouched: H, setValues: F, setFieldValue: b, resetForm: Ie, resetField: oe });
          }
          E.valid || typeof _ != "function" || _({ values: U, evt: I, errors: E.errors, results: E.results });
        }).then((E) => (n.value = !1, E), (E) => {
          throw n.value = !1, E;
        });
      };
    };
  }
  const Z = Y(!1);
  Z.withControlled = Y(!0);
  const pe = { name: o, formId: a, values: d, controlledValues: te, errorBag: v, errors: w, schema: A, submitCount: r, meta: ae, isSubmitting: n, isValidating: i, fieldArrays: u, keepValuesOnUnmount: $, validateSchema: s(A) ? ne : void 0, validate: he, setFieldError: y, validateField: V, setFieldValue: b, setValues: F, setErrors: h, setFieldTouched: H, setTouched: ce, resetForm: Ie, resetField: oe, handleSubmit: Z, useFieldModel: function(p) {
    return Array.isArray(p) ? p.map((c) => ue(c, !0)) : ue(p);
  }, defineInputBinds: function(p, c) {
    const [_, I] = P(p, c);
    function E() {
      I.value.onBlur();
    }
    function U(q) {
      const ee = fn(q);
      b(N(p), ee, !1), I.value.onInput();
    }
    function x(q) {
      const ee = fn(q);
      b(N(p), ee, !1), I.value.onChange();
    }
    return S(() => Object.assign(Object.assign({}, I.value), { onBlur: E, onInput: U, onChange: x, value: _.value }));
  }, defineComponentBinds: function(p, c) {
    const [_, I] = P(p, c), E = K(N(p));
    function U(x) {
      _.value = x;
    }
    return S(() => {
      const x = je(c) ? c(tn(E, nn)) : c || {};
      return Object.assign({ [x.model || "modelValue"]: _.value, [`onUpdate:${x.model || "modelValue"}`]: U }, I.value);
    });
  }, defineField: P, stageInitialValue: function(p, c, _ = !1) {
    ke(p, c), Qe(d, p, c), _ && !(e != null && e.initialValues) && Qe(Q.value, p, fe(c));
  }, unsetInitialValue: D, setFieldInitialValue: ke, createPathState: B, getPathState: K, unsetPathValue: function(p) {
    return le.push(p), G || (G = Ke(() => {
      [...le].sort().reverse().forEach((c) => {
        ro(d, c);
      }), le = [], G = null;
    })), G;
  }, removePathState: function(p, c) {
    const _ = m.value.findIndex((E) => E.path === p && (Array.isArray(E.id) ? E.id.includes(c) : E.id === c)), I = m.value[_];
    if (_ !== -1 && I) {
      if (Ke(() => {
        V(p, { mode: "silent", warn: !1 });
      }), I.multiple && I.fieldsCount && I.fieldsCount--, Array.isArray(I.id)) {
        const E = I.id.indexOf(c);
        E >= 0 && I.id.splice(E, 1), delete I.__flags.pendingUnmount[c];
      }
      (!I.multiple || I.fieldsCount <= 0) && (m.value.splice(_, 1), D(p), g(), delete O.value[p]);
    }
  }, initialValues: de, getAllPathStates: () => m.value, destroyPath: function(p) {
    Be(O.value).forEach((c) => {
      c.startsWith(p) && delete O.value[c];
    }), m.value = m.value.filter((c) => !c.path.startsWith(p)), Ke(() => {
      g();
    });
  }, isFieldTouched: function(p) {
    const c = K(p);
    return c ? c.touched : m.value.filter((_) => _.path.startsWith(p)).some((_) => _.touched);
  }, isFieldDirty: function(p) {
    const c = K(p);
    return c ? c.dirty : m.value.filter((_) => _.path.startsWith(p)).some((_) => _.dirty);
  }, isFieldValid: function(p) {
    const c = K(p);
    return c ? c.valid : m.value.filter((_) => _.path.startsWith(p)).every((_) => _.valid);
  } };
  function b(p, c, _ = !0) {
    const I = fe(c), E = typeof p == "string" ? p : p.path;
    K(E) || B(E), Qe(d, E, I), _ && V(E);
  }
  function F(p, c = !0) {
    Mt(d, p), u.forEach((_) => _ && _.reset()), c && he();
  }
  function ue(p, c) {
    const _ = K(N(p)) || B(p);
    return S({ get: () => _.value, set(I) {
      var E;
      b(N(p), I, (E = N(c)) !== null && E !== void 0 && E);
    } });
  }
  function H(p, c) {
    const _ = K(p);
    _ && (_.touched = c);
  }
  function ce(p) {
    typeof p != "boolean" ? Be(p).forEach((c) => {
      H(c, !!p[c]);
    }) : J((c) => {
      c.touched = p;
    });
  }
  function oe(p, c) {
    var _;
    const I = c && "value" in c ? c.value : He(de.value, p), E = K(p);
    E && (E.__flags.pendingReset = !0), ke(p, fe(I), !0), b(p, I, !1), H(p, (_ = c == null ? void 0 : c.touched) !== null && _ !== void 0 && _), y(p, (c == null ? void 0 : c.errors) || []), Ke(() => {
      E && (E.__flags.pendingReset = !1);
    });
  }
  function Ie(p, c) {
    let _ = fe(p != null && p.values ? p.values : Q.value);
    _ = c != null && c.force ? _ : Mt(Q.value, _), _ = qe(A) && je(A.cast) ? A.cast(_) : _, se(_, { force: c == null ? void 0 : c.force }), J((I) => {
      var E;
      I.__flags.pendingReset = !0, I.validated = !1, I.touched = ((E = p == null ? void 0 : p.touched) === null || E === void 0 ? void 0 : E[N(I.path)]) || !1, b(N(I.path), He(_, N(I.path)), !1), y(N(I.path), void 0);
    }), c != null && c.force ? function(I, E = !0) {
      Be(d).forEach((U) => {
        delete d[U];
      }), Be(I).forEach((U) => {
        b(U, I[U], !1);
      }), E && he();
    }(_, !1) : F(_, !1), h((p == null ? void 0 : p.errors) || {}), r.value = (p == null ? void 0 : p.submitCount) || 0, Ke(() => {
      he({ mode: "silent" }), J((I) => {
        I.__flags.pendingReset = !1;
      });
    });
  }
  async function he(p) {
    const c = (p == null ? void 0 : p.mode) || "force";
    if (c === "force" && J((x) => x.validated = !0), pe.validateSchema) return pe.validateSchema(c);
    i.value = !0;
    const _ = await Promise.all(m.value.map((x) => x.validate ? x.validate(p).then((q) => ({ key: N(x.path), valid: q.valid, errors: q.errors, value: q.value })) : Promise.resolve({ key: N(x.path), valid: !0, errors: [], value: void 0 })));
    i.value = !1;
    const I = {}, E = {}, U = {};
    for (const x of _) I[x.key] = { valid: x.valid, errors: x.errors }, x.value && Qe(U, x.key, x.value), x.errors.length && (E[x.key] = x.errors[0]);
    return { valid: _.every((x) => x.valid), results: I, errors: E, values: U, source: "fields" };
  }
  async function V(p, c) {
    var _;
    const I = K(p);
    if (I && (c == null ? void 0 : c.mode) !== "silent" && (I.validated = !0), A) {
      const { results: E } = await ne((c == null ? void 0 : c.mode) || "validated-only");
      return E[p] || { errors: [], valid: !0 };
    }
    return I != null && I.validate ? I.validate(c) : (!I && ((_ = c == null ? void 0 : c.warn) === null || _ === void 0 || _) && process.env.NODE_ENV !== "production" && vl(`field with path ${p} was not found`), Promise.resolve({ errors: [], valid: !0 }));
  }
  function D(p) {
    ro(de.value, p);
  }
  function ke(p, c, _ = !1) {
    Qe(de.value, p, fe(c)), _ && Qe(Q.value, p, fe(c));
  }
  async function we() {
    const p = s(A);
    if (!p) return { valid: !0, results: {}, errors: {}, source: "none" };
    i.value = !0;
    const c = pn(p) || qe(p) ? await async function(_, I) {
      const E = qe(_) ? _ : il(_), U = await E.parse(fe(I), { formData: fe(I) }), x = {}, q = {};
      for (const ee of U.errors) {
        const ye = ee.errors, W = (ee.path || "").replace(/\["(\d+)"\]/g, (Ve, be) => `[${be}]`);
        x[W] = { valid: !ye.length, errors: ye }, ye.length && (q[W] = ye[0]);
      }
      return { valid: !U.errors.length, results: x, errors: q, values: U.value, source: "schema" };
    }(p, d) : await or(p, d, { names: T.value, bailsMap: C.value });
    return i.value = !1, c;
  }
  const R = Z((p, { evt: c }) => {
    (function(_) {
      return tl(_) && _.target && "submit" in _.target;
    })(c) && c.target.submit();
  });
  function P(p, c) {
    const _ = je(c) || c == null ? void 0 : c.label, I = K(N(p)) || B(p, { label: _ }), E = () => je(c) ? c(tn(I, nn)) : c || {};
    function U() {
      var W;
      I.touched = !0, ((W = E().validateOnBlur) !== null && W !== void 0 ? W : mt().validateOnBlur) && V(N(I.path));
    }
    function x() {
      var W;
      ((W = E().validateOnInput) !== null && W !== void 0 ? W : mt().validateOnInput) && Ke(() => {
        V(N(I.path));
      });
    }
    function q() {
      var W;
      ((W = E().validateOnChange) !== null && W !== void 0 ? W : mt().validateOnChange) && Ke(() => {
        V(N(I.path));
      });
    }
    const ee = S(() => {
      const W = { onChange: q, onInput: x, onBlur: U };
      return je(c) ? Object.assign(Object.assign({}, W), c(tn(I, nn)).props || {}) : c != null && c.props ? Object.assign(Object.assign({}, W), c.props(tn(I, nn))) : W;
    });
    return [ue(p, () => {
      var W, Ve, be;
      return (be = (W = E().validateOnModelUpdate) !== null && W !== void 0 ? W : (Ve = mt()) === null || Ve === void 0 ? void 0 : Ve.validateOnModelUpdate) === null || be === void 0 || be;
    }), ee];
  }
  Gn(() => {
    e != null && e.initialErrors && h(e.initialErrors), e != null && e.initialTouched && ce(e.initialTouched), e != null && e.validateOnMount ? he() : pe.validateSchema && pe.validateSchema("silent");
  }), nt(A) && et(A, () => {
    var p;
    (p = pe.validateSchema) === null || p === void 0 || p.call(pe, "validated-only");
  }), Kt(sa, pe), process.env.NODE_ENV !== "production" && (function(p) {
    const c = ft();
    if (!ht) {
      const _ = c == null ? void 0 : c.appContext.app;
      if (!_) return;
      sl(_);
    }
    $t[p.formId] = Object.assign({}, p), $t[p.formId]._vm = c, yt(() => {
      delete $t[p.formId], It();
    }), It();
  }(pe), et(() => Object.assign(Object.assign({ errors: v.value }, ae.value), { values: d, isSubmitting: n.value, isValidating: i.value, submitCount: r.value }), It, { deep: !0 }));
  const Oe = Object.assign(Object.assign({}, pe), { values: ml(d), handleReset: () => Ie(), submitForm: R });
  return Kt(Zi, Oe), Oe;
}
const cl = (e) => {
  const { columnsMerged: t, fieldColumns: a, propName: o } = e;
  a && o && xn({ columns: a, propName: `${o} prop "columns"` });
  const l = (a == null ? void 0 : a.sm) ?? t.sm, n = (a == null ? void 0 : a.md) ?? t.md, i = (a == null ? void 0 : a.lg) ?? t.lg, r = (a == null ? void 0 : a.xl) ?? t.xl;
  return { "v-col-12": !0, "v-cols": !0, [`v-col-sm-${l}`]: !!l, [`v-col-md-${n}`]: !!n, [`v-col-lg-${i}`]: !!i, [`v-col-xl-${r}`]: !!r };
}, yr = ["columns", "options", "required", "rules", "when"], pt = (e, t = []) => {
  const a = Object.entries(e).filter(([o]) => !yr.includes(o) && !(t != null && t.includes(o)));
  return Object.fromEntries(a);
}, Pt = async (e) => {
  const { action: t, emit: a, field: o, settingsValidateOn: l, validate: n } = e, i = o.validateOn || l;
  (t === "blur" && i === "blur" || t === "input" && i === "input" || t === "change" && i === "change" || t === "click") && await n().then(() => {
    a("validate", o);
  });
}, br = Ge({ __name: "CommonField", props: Pe({ field: {}, component: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = t, o = ot(e, "modelValue"), l = e, { field: n } = l, i = at("settings"), r = S(() => n.required || !1), u = S(() => (n == null ? void 0 : n.validateOn) ?? i.value.validateOn), d = o.value, { errorMessage: m, setValue: f, validate: O, value: g } = At(n.name, void 0, { initialValue: o.value, validateOnBlur: u.value === "blur", validateOnChange: u.value === "change", validateOnInput: u.value === "input", validateOnModelUpdate: u.value != null });
  async function y(L) {
    await Pt({ action: L, emit: a, field: n, settingsValidateOn: i.value.validateOn, validate: O });
  }
  yt(() => {
    i.value.keepValuesOnUnmount || (o.value = d, f(d));
  });
  const h = S(() => n != null && n.items ? n.items : void 0), v = S(() => n.type === "color" || n.type === "date" ? "text" : n.type), w = S(() => {
    let L = n == null ? void 0 : n.error;
    return L = n != null && n.errorMessages ? n.errorMessages.length > 0 : L, L;
  }), T = S(() => ({ ...n, color: n.color || i.value.color, density: n.density || i.value.density, hideDetails: n.hideDetails || i.value.hideDetails, type: v.value, variant: n.variant || i.value.variant })), C = S(() => pt(T.value));
  return (L, $) => (M(), ve(go(L.component), tt({ modelValue: s(g), "onUpdate:modelValue": $[0] || ($[0] = (de) => nt(g) ? g.value = de : null) }, { ...s(C) }, { "data-cy": `vsf-field-${s(n).name}`, error: s(w), "error-messages": s(m) || s(n).errorMessages, items: s(h), onBlur: $[1] || ($[1] = (de) => y("blur")), onChange: $[2] || ($[2] = (de) => y("change")), onInput: $[3] || ($[3] = (de) => y("input")) }), { label: X(() => [re(gt, { label: s(n).label, required: s(r) }, null, 8, ["label", "required"])]), _: 1 }, 16, ["modelValue", "data-cy", "error", "error-messages", "items"]));
} }), Or = ["innerHTML"], Er = { key: 0, class: "v-input__details" }, Vr = ["name"], kr = Ge({ __name: "VSFButtonField", props: Pe({ density: {}, field: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  _l((V) => ({ "7f272e17": s(pe) }));
  const a = t, o = ot(e, "modelValue"), l = e, { field: n } = l, i = at("settings"), r = S(() => n.required || !1), u = S(() => {
    var V;
    return (n == null ? void 0 : n.validateOn) ?? ((V = i.value) == null ? void 0 : V.validateOn);
  }), d = o.value, { errorMessage: m, handleChange: f, setValue: O, validate: g, value: y } = At(n.name, void 0, { initialValue: n != null && n.multiple ? [] : null, validateOnBlur: u.value === "blur", validateOnChange: u.value === "change", validateOnInput: u.value === "input", validateOnModelUpdate: u.value != null });
  yt(() => {
    var V;
    (V = i.value) != null && V.keepValuesOnUnmount || (o.value = d, O(d));
  });
  const h = _e(o.value);
  async function v(V, D) {
    var ke;
    if (h.value !== D || u.value !== "change" && u.value !== "input") {
      if (!(n != null && n.disabled) && y.value) {
        let we;
        if (n != null && n.multiple) {
          const R = Array.isArray(y.value) ? y.value.slice() : [], P = String(D);
          R.includes(P) ? R.splice(R.indexOf(P), 1) : R.push(P), we = R;
        } else we = D;
        O(we), o.value = we;
      } else O(D), o.value = D;
      await Pt({ action: V, emit: a, field: n, settingsValidateOn: (ke = i.value) == null ? void 0 : ke.validateOn, validate: g }).then(() => {
        h.value = y.value;
      }).catch((we) => {
        console.error(we);
      });
    }
  }
  const w = S(() => {
    var V, D, ke;
    return { ...n, border: n != null && n.border ? `${n == null ? void 0 : n.color} ${n == null ? void 0 : n.border}` : void 0, color: n.color || ((V = i.value) == null ? void 0 : V.color), density: (n == null ? void 0 : n.density) ?? ((D = i.value) == null ? void 0 : D.density), hideDetails: n.hideDetails || ((ke = i.value) == null ? void 0 : ke.hideDetails), multiple: void 0 };
  }), T = S(() => pt(w.value, ["autoPage", "hideDetails", "href", "maxErrors", "multiple", "to"])), C = (V, D) => {
    const ke = V[D], we = n == null ? void 0 : n[D];
    return ke ?? we;
  };
  function L(V, D) {
    return V.id != null ? V.id : n != null && n.id ? `${n == null ? void 0 : n.id}-${D}` : void 0;
  }
  const $ = { comfortable: "48px", compact: "40px", default: "56px", expanded: "64px", oversized: "72px" }, de = S(() => {
    var V;
    return (n == null ? void 0 : n.density) ?? ((V = i.value) == null ? void 0 : V.density);
  });
  function Q() {
    return de.value ? $[de.value] : $.default;
  }
  function se(V) {
    const D = (V == null ? void 0 : V.minWidth) ?? (n == null ? void 0 : n.minWidth);
    return D ?? (V != null && V.icon || n != null && n.icon ? Q() : "100px");
  }
  function ae(V) {
    const D = (V == null ? void 0 : V.maxWidth) ?? (n == null ? void 0 : n.maxWidth);
    return D ?? (V != null && V.icon || n != null && n.icon ? Q() : void 0);
  }
  function te(V) {
    const D = (V == null ? void 0 : V.minHeight) ?? (n == null ? void 0 : n.minHeight);
    return D ?? (V != null && V.icon || n != null && n.icon ? Q() : void 0);
  }
  function A(V) {
    const D = (V == null ? void 0 : V.maxHeight) ?? (n == null ? void 0 : n.maxHeight);
    if (D != null) return D;
  }
  function B(V) {
    const D = (V == null ? void 0 : V.width) ?? (n == null ? void 0 : n.width);
    return D ?? (V != null && V.icon ? Q() : "fit-content");
  }
  function ie(V) {
    const D = (V == null ? void 0 : V.height) ?? (n == null ? void 0 : n.height);
    return D ?? Q();
  }
  const z = (V) => {
    if (y.value) return y.value === V || y.value.includes(V);
  }, ne = _e(n == null ? void 0 : n.variant);
  function J(V) {
    var D;
    return z(V) ? "flat" : ne.value ?? ((D = i.value) == null ? void 0 : D.variant) ?? "tonal";
  }
  function K(V) {
    return V && V.length > 0 ? V : n.hint && (n.persistentHint || oe.value) ? n.hint : n.messages ? n.messages : "";
  }
  const G = S(() => n.messages && n.messages.length > 0), le = S(() => !w.value.hideDetails || w.value.hideDetails === "auto" && G.value), Y = An(n.gap ?? 2), Z = S(() => he(Y.value) ? { gap: `${Y.value}` } : {}), pe = _e("rgb(var(--v-theme-on-surface))"), b = S(() => ({ [`align-${n == null ? void 0 : n.align}`]: (n == null ? void 0 : n.align) != null && (n == null ? void 0 : n.block), [`justify-${n == null ? void 0 : n.align}`]: (n == null ? void 0 : n.align) != null && !(n != null && n.block), "d-flex": !0, "flex-column": n == null ? void 0 : n.block, [`ga-${Y.value}`]: !he(Y.value) })), F = S(() => ({ "d-flex": n == null ? void 0 : n.align, "flex-column": n == null ? void 0 : n.align, "v-input--error": !!m && (m == null ? void 0 : m.length) > 0, "vsf-button-field__container": !0, [`align-${n == null ? void 0 : n.align}`]: n == null ? void 0 : n.align })), ue = S(() => {
    const V = de.value;
    return V === "expanded" || V === "oversized" ? { [`v-btn--density-${V}`]: !0 } : {};
  }), H = (V) => ({ [`${V == null ? void 0 : V.class}`]: !0, [`${n.selectedClass}`]: z(V.value) && n.selectedClass != null }), ce = (V) => {
    const D = z(V.value), ke = J(V.value), we = D || ke === "flat" || ke === "elevated";
    return { [`bg-${V == null ? void 0 : V.color}`]: we };
  }, oe = An(null);
  function Ie(V) {
    oe.value = V;
  }
  function he(V) {
    return /(px|em|rem|vw|vh|vmin|vmax|%|pt|cm|mm|in|pc|ex|ch)$/.test(V);
  }
  return (V, D) => {
    var we;
    return M(), me(xe, null, [Ue("div", { class: Me(s(F)) }, [re(Jn, null, { default: X(() => [re(gt, { label: s(n).label, required: s(r) }, null, 8, ["label", "required"])]), _: 1 }), re(Rl, { id: (we = s(n)) == null ? void 0 : we.id, modelValue: o.value, "onUpdate:modelValue": D[2] || (D[2] = (R) => o.value = R), class: Me(["mt-2", s(b)]), "data-cy": `vsf-field-group-${s(n).name}`, style: ut(s(Z)) }, { default: X(() => {
      var R;
      return [(M(!0), me(xe, null, We((R = s(n)) == null ? void 0 : R.options, (P, Oe) => (M(), ve(Nl, { key: P.value }, { default: X(() => {
        var p, c;
        return [re(an, tt({ ref_for: !0 }, s(T), { id: L(P, Oe), active: z(P.value), appendIcon: C(P, "appendIcon"), class: ["text-none", { ...s(ue), ...H(P) }], color: (P == null ? void 0 : P.color) || ((p = s(n)) == null ? void 0 : p.color) || ((c = s(i)) == null ? void 0 : c.color), "data-cy": `vsf-field-${s(n).name}`, density: s(de), height: ie(P), icon: C(P, "icon"), maxHeight: A(P), maxWidth: ae(P), minHeight: te(P), minWidth: se(P), prependIcon: C(P, "prependIcon"), value: P.value, variant: J(P.value), width: B(P), onClick: da((_) => v("click", P.value), ["prevent"]), onKeydown: yl(da((_) => v("click", P.value), ["prevent"]), ["space"]), onMousedown: (_) => Ie(P.value), onMouseleave: D[0] || (D[0] = (_) => Ie(null)), onMouseup: D[1] || (D[1] = (_) => Ie(null)) }), Yn({ _: 2 }, [C(P, "icon") == null ? { name: "default", fn: X(() => [Ue("span", { class: Me(["vsf-button-field__btn-label", ce(P)]), innerHTML: P.label }, null, 10, Or)]), key: "0" } : void 0]), 1040, ["id", "active", "appendIcon", "class", "color", "data-cy", "density", "height", "icon", "maxHeight", "maxWidth", "minHeight", "minWidth", "prependIcon", "value", "variant", "width", "onClick", "onKeydown", "onMousedown"])];
      }), _: 2 }, 1024))), 128))];
    }), _: 1 }, 8, ["id", "modelValue", "class", "data-cy", "style"]), s(le) ? (M(), me("div", Er, [re(s(bo), { active: (ke = s(m), !!(ke && ke.length > 0) || !(!n.hint || !n.persistentHint && !oe.value) || !!n.messages), color: s(m) ? "error" : void 0, "data-cy": "vsf-field-messages", messages: K(s(m)) }, null, 8, ["active", "color", "messages"])])) : Te("", !0)], 2), _o(Ue("input", { "onUpdate:modelValue": D[3] || (D[3] = (R) => nt(y) ? y.value = R : null), "data-cy": "vsf-button-field-input", name: s(n).name, type: "hidden", onChange: D[4] || (D[4] = (...R) => s(f) && s(f)(...R)) }, null, 40, Vr), [[yo, s(y)]])], 64);
    var ke;
  };
} }), pl = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [o, l] of t) a[o] = l;
  return a;
}, Ir = pl(kr, [["__scopeId", "data-v-49f12da6"]]), Sr = { key: 1, class: "v-input v-input--horizontal v-input--center-affix" }, Tr = ["id"], wr = { key: 0, class: "v-input__details" }, Cr = Ge({ __name: "VSFCheckbox", props: Pe({ field: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = t, o = ot(e, "modelValue"), l = e, { field: n } = l, i = at("settings"), r = S(() => {
    var A;
    return (n == null ? void 0 : n.density) ?? ((A = i.value) == null ? void 0 : A.density);
  }), u = S(() => n.required || !1), d = S(() => (n == null ? void 0 : n.validateOn) ?? i.value.validateOn), m = o.value, { errorMessage: f, setValue: O, validate: g, value: y } = At(n.name, void 0, { initialValue: o.value, validateOnBlur: d.value === "blur", validateOnChange: d.value === "change", validateOnInput: d.value === "input", validateOnModelUpdate: d.value != null });
  yt(() => {
    i.value.keepValuesOnUnmount || (o.value = m, O(m));
  });
  const h = _e(n == null ? void 0 : n.disabled);
  async function v(A) {
    h.value || (h.value = !0, o.value = y.value, await Pt({ action: n != null && n.autoPage ? "click" : A, emit: a, field: n, settingsValidateOn: i.value.validateOn, validate: g }).then(() => {
      h.value = !1;
    }));
  }
  const w = S(() => ({ ...n, color: n.color || i.value.color, density: n.density || i.value.density, falseValue: n.falseValue || void 0, hideDetails: n.hideDetails || i.value.hideDetails, trueValue: n.trueValue || !0 })), T = S(() => pt(w.value, ["validateOn"])), C = _e(!1);
  function L(A) {
    return A && A.length > 0 ? A : n.hint && (n.persistentHint || C.value) ? n.hint : n.messages ? n.messages : "";
  }
  const $ = S(() => n.messages && n.messages.length > 0), de = S(() => !w.value.hideDetails || w.value.hideDetails === "auto" && $.value), Q = S(() => ({ "flex-direction": n.labelPositionLeft ? "row" : "column" })), se = S(() => ({ display: n.inline ? "flex" : void 0 })), ae = S(() => ({ "margin-right": n.inline && n.inlineSpacing ? n.inlineSpacing : "10px" })), te = S(() => ({ "v-input--error": !!f && (f == null ? void 0 : f.length) > 0, "v-selection-control-group": n.inline }));
  return (A, B) => {
    var z, ne, J, K;
    return (z = s(n)) != null && z.multiple ? (M(), me("div", Sr, [Ue("div", { class: "v-input__control", style: ut(s(Q)) }, [s(n).label ? (M(), ve(Jn, { key: 0, class: Me({ "me-2": s(n).labelPositionLeft }) }, { default: X(() => {
      var G, le;
      return [re(gt, { class: Me({ "pb-5": !((G = s(n)) != null && G.hideDetails) && ((le = s(n)) == null ? void 0 : le.labelPositionLeft) }), label: s(n).label, required: s(u) }, null, 8, ["class", "label", "required"])];
    }), _: 1 }, 8, ["class"])) : Te("", !0), Ue("div", { id: (ne = s(n)) == null ? void 0 : ne.id, class: Me(s(te)), style: ut(s(se)) }, [Ue("div", { class: Me({ "v-input__control": s(n).inline }) }, [(M(!0), me(xe, null, We((J = s(n)) == null ? void 0 : J.options, (G) => {
      var le;
      return M(), ve(pa, tt({ key: G.value, ref_for: !0 }, { ...s(T) }, { id: G.id, modelValue: s(y), "onUpdate:modelValue": B[5] || (B[5] = (Y) => nt(y) ? y.value = Y : null), "data-cy": `vsf-field-${s(n).name}`, density: s(r), disabled: s(h), error: !!s(f) && ((le = s(f)) == null ? void 0 : le.length) > 0, "error-messages": s(f), "hide-details": !0, label: G.label, style: s(ae), "true-value": G.value, onBlur: B[6] || (B[6] = (Y) => v("blur")), onChange: B[7] || (B[7] = (Y) => v("change")), onClick: B[8] || (B[8] = (Y) => s(d) === "blur" || s(d) === "change" ? v("click") : void 0), onInput: B[9] || (B[9] = (Y) => v("input")), "onUpdate:focused": B[10] || (B[10] = (Y) => {
        return Z = Y, void (C.value = Z);
        var Z;
      }) }), null, 16, ["id", "modelValue", "data-cy", "density", "disabled", "error", "error-messages", "label", "style", "true-value"]);
    }), 128))], 2), s(de) ? (M(), me("div", wr, [re(s(bo), { active: (ie = s(f), !!(ie && ie.length > 0) || !(!n.hint || !n.persistentHint && !C.value) || !!n.messages), color: s(f) ? "error" : void 0, messages: L(s(f)) }, null, 8, ["active", "color", "messages"])])) : Te("", !0)], 14, Tr)], 4)])) : (M(), ve(pa, tt({ key: 0, modelValue: s(y), "onUpdate:modelValue": B[0] || (B[0] = (G) => nt(y) ? y.value = G : null) }, { ...s(T) }, { "data-cy": `vsf-field-${s(n).name}`, density: s(r), disabled: s(h), error: !!s(f) && ((K = s(f)) == null ? void 0 : K.length) > 0, "error-messages": s(f), onBlur: B[1] || (B[1] = (G) => v("blur")), onChange: B[2] || (B[2] = (G) => v("change")), onClick: B[3] || (B[3] = (G) => s(d) === "blur" || s(d) === "change" ? v("click") : void 0), onInput: B[4] || (B[4] = (G) => v("input")) }), { label: X(() => [re(gt, { label: s(n).label, required: s(u) }, null, 8, ["label", "required"])]), _: 1 }, 16, ["modelValue", "data-cy", "density", "disabled", "error", "error-messages"]));
    var ie;
  };
} }), Ar = ["data-cy"], Pr = Ge({ __name: "VSFCustom", props: Pe({ field: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = Zn(), o = t, l = ot(e, "modelValue"), n = e, { field: i } = n, r = at("settings"), u = bl(gt), d = S(() => (i == null ? void 0 : i.validateOn) ?? r.value.validateOn), m = At(i.name, void 0, { initialValue: l.value, validateOnBlur: d.value === "blur", validateOnChange: d.value === "change", validateOnInput: d.value === "input", validateOnModelUpdate: d.value != null });
  async function f(h) {
    await Pt({ action: h, emit: o, field: i, settingsValidateOn: r.value.validateOn, validate: m.validate });
  }
  const O = S(() => ({ ...pt(m, ["_vm", "errorMessage", "field", "id", "label", "name", "type", "value"]) })), g = S(() => ({ ...i, color: i.color || r.value.color, density: i.density || r.value.density })), y = S(() => ({ ...pt(g.value), options: i.options, required: i.required }));
  return (h, v) => (M(!0), me(xe, null, We(s(a), (w, T) => (M(), me(xe, { key: T }, [T === `field.${[s(i).name]}` ? (M(), me("div", { key: 0, "data-cy": `vsf-field-${s(i).name}` }, [Xn(h.$slots, T, tt({ ref_for: !0 }, { FieldLabel: s(u), blur: () => f("blur"), change: () => f("change"), input: () => f("input"), onUpdate: (C) => {
    (function(L) {
      m.setValue(L);
    })(C);
  }, field: { errorMessages: s(m).errorMessage.value, ...s(y) }, ...s(O) }))], 8, Ar)) : Te("", !0)], 64))), 128));
} }), xr = ["id"], jr = Ge({ __name: "VSFRadio", props: Pe({ field: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = t, o = ot(e, "modelValue"), l = e, { field: n } = l, i = at("settings"), r = S(() => {
    var se;
    return (n == null ? void 0 : n.density) ?? ((se = i.value) == null ? void 0 : se.density);
  }), u = S(() => n.required || !1), d = S(() => (n == null ? void 0 : n.validateOn) ?? i.value.validateOn), m = o.value, { errorMessage: f, setValue: O, validate: g, value: y } = At(n.name, void 0, { initialValue: o.value, type: "radio", validateOnBlur: d.value === "blur", validateOnChange: d.value === "change", validateOnInput: d.value === "input", validateOnModelUpdate: d.value != null });
  yt(() => {
    i.value.keepValuesOnUnmount || (o.value = m);
  });
  const h = _e(n == null ? void 0 : n.disabled);
  async function v(se, ae) {
    if (!h.value) {
      let te;
      if (h.value = !0, n == null ? void 0 : n.multiple) {
        const A = Array.isArray(y.value) ? y.value.slice() : [], B = String(ae);
        A.includes(B) ? A.splice(A.indexOf(B), 1) : A.push(B), te = A;
      } else te = ae;
      O(te), o.value = te, await Pt({ action: n != null && n.autoPage ? "click" : se, emit: a, field: n, settingsValidateOn: i.value.validateOn, validate: g }).then(() => {
        h.value = !1;
      });
    }
  }
  const w = S(() => {
    let se = n == null ? void 0 : n.error;
    return se = n != null && n.errorMessages ? n.errorMessages.length > 0 : se, se;
  }), T = S(() => ({ ...n, color: n.color || i.value.color, density: n.density || i.value.density, falseValue: n.falseValue || !1, hideDetails: n.hideDetails || i.value.hideDetails, trueValue: n.trueValue || !0 })), C = S(() => pt(T.value)), L = S(() => ({ width: (n == null ? void 0 : n.minWidth) ?? (n == null ? void 0 : n.width) ?? void 0 })), $ = S(() => ({ "flex-direction": n.labelPositionLeft ? "row" : "column" })), de = S(() => ({ display: n.inline ? "flex" : void 0 })), Q = S(() => ({ "margin-right": n.inline && n.inlineSpacing ? n.inlineSpacing : "10px" }));
  return (se, ae) => {
    var te, A, B, ie, z, ne, J, K, G, le, Y, Z, pe, b, F, ue, H;
    return M(), me("div", { style: ut(s(L)) }, [Ue("div", { class: "v-input__control", style: ut(s($)) }, [s(n).label ? (M(), ve(Jn, { key: 0, class: Me({ "me-2": s(n).labelPositionLeft }) }, { default: X(() => [re(gt, { class: Me({ "pb-5": s(n).labelPositionLeft }), label: s(n).label, required: s(u) }, null, 8, ["class", "label", "required"])]), _: 1 }, 8, ["class"])) : Te("", !0), Ue("div", { id: (te = s(n)) == null ? void 0 : te.groupId, style: ut(s(de)) }, [re(Ll, { modelValue: o.value, "onUpdate:modelValue": ae[0] || (ae[0] = (ce) => o.value = ce), "append-icon": (A = s(n)) == null ? void 0 : A.appendIcon, "data-cy": `vsf-field-group-${s(n).name}`, density: s(r), direction: (B = s(n)) == null ? void 0 : B.direction, disabled: s(h), error: s(w), "error-messages": s(f) || ((ie = s(n)) == null ? void 0 : ie.errorMessages), hideDetails: ((z = s(n)) == null ? void 0 : z.hideDetails) || ((ne = s(i)) == null ? void 0 : ne.hideDetails), hint: (J = s(n)) == null ? void 0 : J.hint, inline: (K = s(n)) == null ? void 0 : K.inline, "max-errors": (G = s(n)) == null ? void 0 : G.maxErrors, "max-width": (le = s(n)) == null ? void 0 : le.maxWidth, messages: (Y = s(n)) == null ? void 0 : Y.messages, "min-width": (Z = s(n)) == null ? void 0 : Z.minWidth, multiple: (pe = s(n)) == null ? void 0 : pe.multiple, persistentHint: (b = s(n)) == null ? void 0 : b.persistentHint, "prepend-icon": (F = s(n)) == null ? void 0 : F.prependIcon, theme: (ue = s(n)) == null ? void 0 : ue.theme, width: (H = s(n)) == null ? void 0 : H.width }, { default: X(() => {
      var ce;
      return [(M(!0), me(xe, null, We((ce = s(n)) == null ? void 0 : ce.options, (oe, Ie) => {
        var he;
        return M(), me("div", { key: Ie }, [re(Ml, tt({ ref_for: !0 }, { ...s(C) }, { id: void 0, "data-cy": `vsf-field-${s(n).name}`, density: s(r), error: !!s(f) && ((he = s(f)) == null ? void 0 : he.length) > 0, "error-messages": s(f), "false-value": s(n).falseValue, label: oe.label, name: s(n).name, style: s(Q), "true-value": oe.value || s(n).trueValue, value: oe.value, onBlur: (V) => v("blur", oe.value), onChange: (V) => v("change", oe.value), onClick: (V) => s(d) === "blur" || s(d) === "change" ? v("click", oe.value) : void 0, onInput: (V) => v("input", oe.value) }), null, 16, ["data-cy", "density", "error", "error-messages", "false-value", "label", "name", "style", "true-value", "value", "onBlur", "onChange", "onClick", "onInput"])]);
      }), 128))];
    }), _: 1 }, 8, ["modelValue", "append-icon", "data-cy", "density", "direction", "disabled", "error", "error-messages", "hideDetails", "hint", "inline", "max-errors", "max-width", "messages", "min-width", "multiple", "persistentHint", "prepend-icon", "theme", "width"])], 12, xr)], 4)], 4);
  };
} }), Ur = Ge({ __name: "VSFSwitch", props: Pe({ field: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = t, o = ot(e, "modelValue"), l = e, { field: n } = l, i = at("settings"), r = S(() => {
    var h;
    return (n == null ? void 0 : n.density) ?? ((h = i.value) == null ? void 0 : h.density);
  }), u = S(() => n.required || !1), d = S(() => (n == null ? void 0 : n.validateOn) ?? i.value.validateOn), m = o.value;
  yt(() => {
    i.value.keepValuesOnUnmount || (o.value = m);
  });
  const f = _e(n == null ? void 0 : n.disabled);
  async function O(h, v) {
    f.value || (f.value = !0, await Pt({ action: n != null && n.autoPage ? "click" : v, emit: a, field: n, settingsValidateOn: i.value.validateOn, validate: h }).then(() => {
      f.value = !1;
    }));
  }
  const g = S(() => ({ ...n, color: n.color || i.value.color, density: n.density || i.value.density, falseValue: n.falseValue || !1, hideDetails: n.hideDetails || i.value.hideDetails, trueValue: n.trueValue || !0 })), y = S(() => pt(g.value));
  return (h, v) => (M(), ve(s(hr), { modelValue: o.value, "onUpdate:modelValue": v[0] || (v[0] = (w) => o.value = w), name: s(n).name, syncVModel: !0, type: "checkbox", "unchecked-value": s(n).falseValue, "validate-on-blur": s(d) === "blur", "validate-on-change": s(d) === "change", "validate-on-input": s(d) === "input", "validate-on-model-update": !1, value: s(n).trueValue }, { default: X((w) => {
    var T;
    return [re(Bl, tt({ ...s(y), ...w.field }, { "data-cy": `vsf-field-${s(n).name}`, density: s(r), disabled: s(f), error: !!w.errorMessage && ((T = w.errorMessage) == null ? void 0 : T.length) > 0, "error-messages": w.errorMessage, onBlur: (C) => O(w.validate, "blur"), onChange: (C) => O(w.validate, "change"), onClick: (C) => s(d) === "blur" || s(d) === "change" ? O(w.validate, "click") : void 0, onInput: (C) => O(w.validate, "input") }), { label: X(() => [re(gt, { label: s(n).label, required: s(u) }, null, 8, ["label", "required"])]), _: 2 }, 1040, ["data-cy", "density", "disabled", "error", "error-messages", "onBlur", "onChange", "onClick", "onInput"])];
  }), _: 1 }, 8, ["modelValue", "name", "unchecked-value", "validate-on-blur", "validate-on-change", "validate-on-input", "value"]));
} }), Dr = ["onUpdate:modelValue", "data-cy", "name"], Rr = ["innerHTML"], Nr = Ge({ inheritAttrs: !1, __name: "PageContainer", props: Pe({ fieldColumns: {}, page: {}, pageIndex: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["validate"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = t, o = Zn(), l = ["email", "number", "password", "tel", "text", "textField", "url"];
  function n(f) {
    if (l.includes(f)) return rt(Cl);
    switch (f) {
      case "autocomplete":
        return rt(Ul);
      case "color":
        return rt(wl);
      case "combobox":
        return rt(jl);
      case "date":
        return rt(Dl);
      case "file":
        return rt(xl);
      case "select":
        return rt(Pl);
      case "textarea":
        return rt(Al);
      default:
        return null;
    }
  }
  const i = ot(e, "modelValue"), r = S(() => {
    var f;
    return ((f = e.page) == null ? void 0 : f.pageFieldColumns) ?? {};
  }), u = _e({ lg: void 0, md: void 0, sm: void 0, xl: void 0, ...e.fieldColumns, ...r.value });
  function d(f) {
    return cl({ columnsMerged: u.value, fieldColumns: f.columns, propName: `${f.name} field` });
  }
  function m(f) {
    a("validate", f);
  }
  return (f, O) => (M(), me(xe, null, [f.page.text ? (M(), ve(qt, { key: 0 }, { default: X(() => [re(kt, { innerHTML: f.page.text }, null, 8, ["innerHTML"])]), _: 1 })) : Te("", !0), re(qt, null, { default: X(() => [(M(!0), me(xe, null, We(f.page.fields, (g) => (M(), me(xe, { key: `${g.name}-${g.type}` }, [g.type !== "hidden" && g.type ? (M(), me(xe, { key: 1 }, [g.text ? (M(), ve(kt, { key: 0, cols: "12" }, { default: X(() => [Ue("div", { "data-cy": "vsf-field-text", innerHTML: g.text }, null, 8, Rr)]), _: 2 }, 1024)) : Te("", !0), re(kt, { class: Me(d(g)) }, { default: X(() => [g.type === "checkbox" ? (M(), ve(Cr, { key: 0, modelValue: i.value[g.name], "onUpdate:modelValue": (y) => i.value[g.name] = y, field: g, onValidate: m }, null, 8, ["modelValue", "onUpdate:modelValue", "field"])) : Te("", !0), g.type === "radio" ? (M(), ve(jr, { key: 1, modelValue: i.value[g.name], "onUpdate:modelValue": (y) => i.value[g.name] = y, field: g, onValidate: m }, null, 8, ["modelValue", "onUpdate:modelValue", "field"])) : Te("", !0), g.type === "buttons" ? (M(), ve(Ir, { key: 2, modelValue: i.value[g.name], "onUpdate:modelValue": (y) => i.value[g.name] = y, field: g, onValidate: m }, null, 8, ["modelValue", "onUpdate:modelValue", "field"])) : Te("", !0), g.type === "switch" ? (M(), ve(Ur, { key: 3, modelValue: i.value[g.name], "onUpdate:modelValue": (y) => i.value[g.name] = y, field: g, onValidate: m }, null, 8, ["modelValue", "onUpdate:modelValue", "field"])) : Te("", !0), n(g.type) != null ? (M(), ve(br, { key: 4, modelValue: i.value[g.name], "onUpdate:modelValue": (y) => i.value[g.name] = y, component: n(g.type), field: g, onValidate: m }, null, 8, ["modelValue", "onUpdate:modelValue", "component", "field"])) : Te("", !0), g.type === "field" ? (M(), me(xe, { key: 5 }, [g.type === "field" ? (M(), ve(Pr, { key: 0, modelValue: i.value[g.name], "onUpdate:modelValue": (y) => i.value[g.name] = y, field: g, onValidate: m }, Yn({ _: 2 }, [We(o, (y, h) => ({ name: h, fn: X((v) => [Xn(f.$slots, h, tt({ ref_for: !0 }, { ...v }))]) }))]), 1032, ["modelValue", "onUpdate:modelValue", "field"])) : Te("", !0)], 64)) : Te("", !0)]), _: 2 }, 1032, ["class"])], 64)) : _o((M(), me("input", { key: 0, "onUpdate:modelValue": (y) => i.value[g.name] = y, "data-cy": `vsf-field-${g.name}`, name: g.name, type: "hidden" }, null, 8, Dr)), [[yo, i.value[g.name]]])], 64))), 128))]), _: 3 })], 64));
} }), Mr = Ge({ inheritAttrs: !1, __name: "PageReviewContainer", props: Pe({ page: {}, pages: {}, summaryColumns: {} }, { modelValue: {}, modelModifiers: {} }), emits: Pe(["goToQuestion"], ["update:modelValue"]), setup(e, { emit: t }) {
  const a = at("settings"), { editable: o } = s(a), l = t, n = ot(e, "modelValue"), i = _e([]), { lastNonEditableIndex: r } = jn(e.pages);
  function u(f) {
    var g;
    const O = e.pages.findIndex((y) => y.fields ? y.fields.some((h) => h.name === f.name) : -1);
    return o !== !1 && ((g = e.pages[O]) == null ? void 0 : g.editable) !== !1 && f.editable !== !1;
  }
  Object.values(e.pages).forEach((f, O) => {
    f.fields && Object.values(f.fields).forEach((g) => {
      const y = g;
      O <= r && (y.editable = !1), i.value.push(y);
    });
  });
  const d = _e({ lg: void 0, md: void 0, sm: void 0, xl: void 0, ...e.summaryColumns }), m = S(() => cl({ columnsMerged: d.value }));
  return (f, O) => (M(), me(xe, null, [f.page.text ? (M(), ve(qt, { key: 0 }, { default: X(() => [re(kt, { innerHTML: f.page.text }, null, 8, ["innerHTML"])]), _: 1 })) : Te("", !0), re(qt, null, { default: X(() => [(M(!0), me(xe, null, We(s(i), (g) => (M(), ve(kt, { key: g.name, class: Me(s(m)) }, { default: X(() => [re($l, { lines: "two" }, { default: X(() => [re(Hl, { class: "mb-2", color: "background" }, { default: X(() => [u(g) ? (M(), ve(fa, { key: 0, onClick: (y) => s(o) && g.editable !== !1 ? function(h) {
    var w;
    let v = e.pages.findIndex((T) => T.fields ? T.fields.some((C) => C.name === h.name) : -1);
    ((w = e.pages[v]) == null ? void 0 : w.editable) !== !1 && h.editable !== !1 && (v += 1, setTimeout(() => {
      l("goToQuestion", v);
    }, 350));
  }(g) : void 0 }, { default: X(() => [re(va, null, { default: X(() => [rn(st(g.label), 1)]), _: 2 }, 1024), re(ma, null, { default: X(() => [Ue("div", null, st(g.text), 1), Ue("div", { class: Me(`text-${s(a).color}`) }, st(n.value[g.name]), 3)]), _: 2 }, 1024)]), _: 2 }, 1032, ["onClick"])) : (M(), ve(fa, { key: 1, ripple: !1 }, { default: X(() => [re(va, null, { default: X(() => [rn(st(g.label), 1)]), _: 2 }, 1024), re(ma, null, { default: X(() => [Ue("div", null, st(g.text), 1), Ue("div", { class: Me(`text-${s(a).color}`) }, st(n.value[g.name]), 3)]), _: 2 }, 1024)]), _: 2 }, 1024))]), _: 2 }, 1024)]), _: 2 }, 1024)]), _: 2 }, 1032, ["class"]))), 128))]), _: 1 })], 64));
} }), Lr = Ge({ __name: "VStepperForm", props: Pe(Ol({ pages: {}, validationSchema: {}, autoPage: { type: Boolean }, autoPageDelay: {}, color: {}, density: {}, direction: {}, editable: {}, errorIcon: {}, fieldColumns: {}, headerTooltips: { type: Boolean }, hideDetails: { type: [Boolean, String] }, jumpAhead: { type: Boolean }, keepValuesOnUnmount: { type: Boolean }, navButtonSize: {}, navButtonVariant: {}, summaryColumns: {}, title: {}, tooltipLocation: {}, tooltipOffset: {}, tooltipTransition: {}, validateOn: {}, validateOnMount: { type: Boolean }, variant: {}, width: {}, transition: {} }, Eo), { modelValue: {}, modelModifiers: {} }), emits: Pe(["submit", "update:model-value"], ["update:modelValue"]), setup(e, { emit: t }) {
  var ke, we;
  const a = El(), o = Vl(), l = Zn(), n = t, i = at(Oo), r = e;
  let u = Vt(Pn(a, i, r));
  const { direction: d, jumpAhead: m, title: f, width: O } = kl(r), g = Vt(r.pages), y = JSON.parse(JSON.stringify(g)), h = _e(ha(u)), v = S(() => pt(h.value, ["autoPage", "autoPageDelay", "hideDetails", "keepValuesOnUnmount", "transition", "validateOn", "validateOnMount"]));
  et(r, () => {
    u = Pn(a, i, r), h.value = ha(u);
  }, { deep: !0 }), Kt("settings", h);
  const w = _e([]);
  Object.values(g).forEach((R) => {
    R.fields && Object.values(R.fields).forEach((P) => {
      w.value.push(P);
    });
  }), Gn(() => {
    ce(), xn({ columns: r.fieldColumns, propName: '"fieldColumns" prop' }), xn({ columns: r.summaryColumns, propName: '"summaryColumns" prop' });
  });
  const T = ot(e, "modelValue"), C = _e(1), L = S(() => C.value - 1), { mobile: $, sm: de } = Tl(), Q = S(() => u.transition), se = Il("stepperFormRef");
  Kt("parentForm", se);
  const ae = S(() => h.value.editable), te = S(() => C.value === 1 ? "prev" : C.value === Object.keys(r.pages).length ? "next" : void 0), A = S(() => {
    const R = te.value === "next" || h.value.disabled;
    return le.value || R;
  }), B = S(() => {
    const { lastNonEditableIndex: R } = jn(H.value);
    return L.value === 0 || !ae.value || !!K.value || L.value - 1 === R;
  }), ie = S(() => {
    const R = H.value[C.value - 2];
    return ae.value !== !0 && (R ? R.editable === !1 : C.value === H.value.length && !r.editable);
  }), z = S(() => C.value === Object.keys(H.value).length);
  function ne(R) {
    var be, Ee, De, Ye, bt;
    const { firstNonEditableIndex: P, lastNonEditableIndex: Oe } = jn(H.value), p = H.value, c = p.findIndex((ze) => ze === R), _ = R.editable !== !1, I = R.editable === !1, E = ((be = p[L.value]) == null ? void 0 : be.editable) !== !1, U = p.length - 1, x = c - 1, q = ((Ee = p[x]) == null ? void 0 : Ee.editable) !== !1, ee = ((De = p[x]) == null ? void 0 : De.editable) === !1, ye = c + 1, W = ((Ye = p[ye]) == null ? void 0 : Ye.editable) !== !1, Ve = ((bt = p[ye]) == null ? void 0 : bt.editable) === !1;
    return L.value === c || !!ae.value && !K.value && (m.value ? ((ze) => {
      const { currentPageEditable: lt, firstNonEditableIndex: Re, lastNonEditableIndex: Ze, lastPageIdx: Xt, nextPageEditable: gn, nextPageNotEditable: _n, pageIdx: Ae, pageNotEditable: Fe, previousPageEditable: yn, previousPageNotEditable: it } = ze, Xe = s(ze.currentPageIdx);
      if (Ae > Ze) return Xe > Ze;
      if (Ae === Ze) return !1;
      if (Ae < Ze) {
        if (Xe === Xt) return !1;
        if (Ae > Re) return !(!lt || !gn) || !!(lt && _n && Ae > Re && Xe > Re && Ae > Xe);
      }
      return Ae > Re ? !(Xe <= Re) : Ae < Re && Xe <= Re || !(Xe > Ae && Ae <= Re) && (Ae < Xe || !Fe && (Xe <= Ae ? !(Ae < Re) : !!(Xe >= Ae && yn)));
    })({ currentPageEditable: E, currentPageIdx: L, firstNonEditableIndex: P, lastNonEditableIndex: Oe, lastPageIdx: U, nextPageEditable: W, nextPageNotEditable: Ve, pageIdx: c, pageNotEditable: I, previousPageEditable: q, previousPageNotEditable: ee }) : ((ze) => {
      const { currentPageEditable: lt, firstNonEditableIndex: Re, lastNonEditableIndex: Ze, lastPageIdx: Xt, nextPageEditable: gn, nextPageNotEditable: _n, pageEditable: Ae, pageIdx: Fe, pageNotEditable: yn } = ze, it = s(ze.currentPageIdx);
      if (Fe < it) {
        if (it > Ze) {
          if (Fe > Re && Fe > Ze && it === Xt && Ae) return !0;
          if (!Ae) return !1;
        }
        if (Fe < Re && it <= Re) return !0;
      }
      if (Fe <= Re && lt) return !1;
      if (Fe < it) {
        if (Fe > Re && Fe < Ze && it <= Ze && _n && Ae) return !0;
        if (Fe < Ze && yn) return !1;
        if (Fe > Re && gn && it !== Xt) return !0;
      }
      return !1;
    })({ currentPageEditable: E, currentPageIdx: L, firstNonEditableIndex: P, lastNonEditableIndex: Oe, lastPageIdx: U, nextPageEditable: W, nextPageNotEditable: Ve, pageEditable: _, pageIdx: c, pageNotEditable: I }));
  }
  const J = S(() => r.validationSchema), K = _e(!1), G = _e([]), le = S(() => G.value.includes(C.value - 1)), Y = _r({ initialValues: T.value, keepValuesOnUnmount: (ke = h.value) == null ? void 0 : ke.keepValuesOnUnmount, validationSchema: J.value, valueOnMount: (we = h.value) == null ? void 0 : we.validateOnMount });
  function Z(R) {
    if (G.value.includes(R)) {
      const P = G.value.indexOf(R);
      P > -1 && G.value.splice(P, 1);
    }
    K.value = !1;
  }
  function pe(R, P, Oe = () => {
  }) {
    const p = H.value[L.value];
    if (!p) return;
    const c = H.value.findIndex((I) => I === p), _ = (p == null ? void 0 : p.fields) ?? [];
    if (Object.keys(R).some((I) => _.some((E) => E.name === I))) return K.value = !0, void b(c, p, P);
    Z(c), Oe && !z.value && P !== "submit" && Oe();
  }
  function b(R, P, Oe = "submit") {
    K.value = !0, P && Oe === "submit" && (P.error = !0), G.value.includes(R) || G.value.push(R);
  }
  let F;
  Sl(Y.values, () => {
    T.value = Y.values, ce();
  });
  const ue = Y.handleSubmit((R) => {
    n("submit", R);
  }), H = S(() => (Object.values(g).forEach((R, P) => {
    const Oe = R;
    if (Oe.visible = !0, Oe.when) {
      const p = Oe.when(Y.values);
      g[P] && (g[P].visible = p);
    }
  }), g.filter((R) => R.visible)));
  function ce() {
    Object.values(g).forEach((R, P) => {
      R.fields && Object.values(R.fields).forEach((Oe, p) => {
        if (Oe.when) {
          const c = Oe.when(Y.values), _ = H.value[P];
          _ != null && _.fields && (_ != null && _.fields[p]) && (_.fields[p].type = c ? y[P].fields[p].type : "hidden");
        }
      });
    });
  }
  const oe = S(() => ((R) => {
    const { direction: P } = R;
    return { "d-flex flex-column justify-center align-center": P === "horizontal", [`${jt}`]: !0, [`${jt}--container`]: !0, [`${jt}--container-${P}`]: !0 };
  })({ direction: d.value })), Ie = S(() => ((R) => {
    const { direction: P } = R;
    return { "d-flex flex-column justify-center align-center": P === "horizontal", [`${jt}--container-stepper`]: !0, [`${jt}--container-stepper-${P}`]: !0 };
  })({ direction: d.value })), he = S(() => ({ width: "100%" })), V = S(() => ({ width: O.value }));
  function D(R) {
    return R + 1;
  }
  return (R, P) => (M(), me("div", { class: Me(s(oe)), style: ut(s(he)) }, [Ue("div", { style: ut(s(V)) }, [s(f) ? (M(), ve(bn, { key: 0, fluid: "" }, { default: X(() => [re(qt, null, { default: X(() => [re(kt, null, { default: X(() => [Ue("h2", null, st(s(f)), 1)]), _: 1 })]), _: 1 })]), _: 1 })) : Te("", !0), re(bn, { class: Me(s(Ie)), fluid: "" }, { default: X(() => [re(zl, tt({ modelValue: s(C), "onUpdate:modelValue": P[4] || (P[4] = (Oe) => nt(C) ? C.value = Oe : null), "data-cy": "vsf-stepper-form" }, s(v), { mobile: s(de), width: "100%" }), { default: X(({ prev: Oe, next: p }) => [re(Kl, { "data-cy": "vsf-stepper-header" }, { default: X(() => [(M(!0), me(xe, null, We(s(H), (c, _) => (M(), me(xe, { key: `${D(_)}-step` }, [re(ql, { class: Me(`vsf-activator-${s(o)}-${_ + 1}`), color: s(h).color, "edit-icon": c.isSummary ? "$complete" : s(h).editIcon, editable: ne(c), elevation: "0", error: s(K) && s(G).includes(_), title: c.title, value: D(_), onClick: (I) => function(E) {
    const U = E === 0 ? 0 : E - 1, x = H.value[U];
    x && x.fields && x.fields.forEach((q) => {
      Y.validateField(q.name, {}, { name: q.name }).then((ee) => {
        if (ee.errors.length) return C.value = U + 1, K.value = !0, void b(U, x, "submit");
        Z(U);
      });
    });
  }(_) }, { default: X(() => [!s($) && s(h).headerTooltips && (c != null && c.fields) && (c == null ? void 0 : c.fields.length) > 0 ? (M(), ve(Zl, { key: 0, activator: c.title ? "parent" : `.vsf-activator-${s(o)}-${_ + 1}`, location: s(h).tooltipLocation, offset: c.title ? s(h).tooltipOffset : Number(s(h).tooltipOffset) - 28, transition: s(h).tooltipTransition }, { default: X(() => [(M(!0), me(xe, null, We(c.fields, (I, E) => (M(), me("div", { key: E }, st(I.label), 1))), 128))]), _: 2 }, 1032, ["activator", "location", "offset", "transition"])) : Te("", !0)]), _: 2 }, 1032, ["class", "color", "edit-icon", "editable", "error", "title", "value", "onClick"]), D(_) !== Object.keys(s(H)).length ? (M(), ve(Fl, { key: D(_) })) : Te("", !0)], 64))), 128))]), _: 1 }), Ue("form", { ref: "stepperFormRef", onSubmit: P[3] || (P[3] = (...c) => s(ue) && s(ue)(...c)) }, [re(Wl, null, { default: X(() => [(M(!0), me(xe, null, We(s(H), (c, _) => (M(), ve(Gl, { key: `${D(_)}-content`, "data-cy": c.isSummary ? "vsf-page-summary" : `vsf-page-${D(_)}`, "reverse-transition": s(Q), transition: s(Q), value: D(_) }, { default: X(() => [re(bn, null, { default: X(() => {
    var I, E;
    return [c.isSummary ? (M(), ve(Mr, { key: 1, modelValue: T.value, "onUpdate:modelValue": P[1] || (P[1] = (U) => T.value = U), page: c, pages: s(H), settings: s(h), summaryColumns: (I = s(h)) == null ? void 0 : I.summaryColumns, onGoToQuestion: P[2] || (P[2] = (U) => C.value = U) }, null, 8, ["modelValue", "page", "pages", "settings", "summaryColumns"])) : (M(), ve(Nr, { key: `${D(_)}-page`, modelValue: T.value, "onUpdate:modelValue": P[0] || (P[0] = (U) => T.value = U), fieldColumns: (E = s(h)) == null ? void 0 : E.fieldColumns, index: D(_), page: c, pageIndex: D(_), settings: s(h), onValidate: (U) => function(x, q) {
      var W;
      const ee = Y.errorBag, ye = x.autoPage || h.value.autoPage ? q : null;
      x != null && x.autoPage || (W = h.value) != null && W.autoPage ? se.value && Y.validate().then((Ve) => {
        var Ee;
        if (Ve.valid) return clearTimeout(F), void (F = setTimeout(() => {
          pe(ee, "field", ye);
        }, (x == null ? void 0 : x.autoPageDelay) ?? ((Ee = h.value) == null ? void 0 : Ee.autoPageDelay)));
        const be = H.value[L.value];
        b(H.value.findIndex((De) => De === be), be, "validating");
      }).catch((Ve) => {
        console.error("Error", Ve);
      }) : Y.validateField(x.name, {}, { name: x.name }).then(() => {
        pe(Y.errorBag.value, "field", ye);
      });
    }(U, p) }, Yn({ _: 2 }, [We(s(l), (U, x) => ({ name: x, fn: X((q) => [Xn(R.$slots, x, tt({ ref_for: !0 }, { ...q }), void 0, !0)]) }))]), 1032, ["modelValue", "fieldColumns", "index", "page", "pageIndex", "settings", "onValidate"]))];
  }), _: 2 }, 1024)]), _: 2 }, 1032, ["data-cy", "reverse-transition", "transition", "value"]))), 128))]), _: 2 }, 1024), s(h).hideActions ? Te("", !0) : (M(), ve(Yl, { key: 0 }, { next: X(() => [s(z) ? (M(), ve(an, { key: 1, color: s(h).color, "data-cy": "vsf-submit-button", disabled: s(le), size: R.navButtonSize, type: "submit", variant: R.navButtonVariant, onClick: s(ue) }, { default: X(() => P[5] || (P[5] = [rn("Submit")])), _: 1 }, 8, ["color", "disabled", "size", "variant", "onClick"])) : (M(), ve(an, { key: 0, color: s(h).color, "data-cy": "vsf-next-button", disabled: s(A), size: R.navButtonSize, variant: R.navButtonVariant, onClick: (c) => function(_ = "submit", I = () => {
  }) {
    se.value && Y.validate().then((E) => {
      pe(E.errors, _, I);
    }).catch((E) => {
      console.error("Error", E);
    });
  }("next", p) }, null, 8, ["color", "disabled", "size", "variant", "onClick"]))]), prev: X(() => [re(an, { "data-cy": "vsf-previous-button", disabled: s(B), size: R.navButtonSize, variant: R.navButtonVariant, onClick: (c) => function(_) {
    ie.value || _();
  }(Oe) }, null, 8, ["disabled", "size", "variant", "onClick"])]), _: 2 }, 1024))], 544)]), _: 3 }, 16, ["modelValue", "mobile"])]), _: 3 }, 8, ["class"])], 4)], 6));
} }), Br = pl(Lr, [["__scopeId", "data-v-15220e2c"]]), Hr = Object.freeze(Object.defineProperty({ __proto__: null, default: Br }, Symbol.toStringTag, { value: "Module" }));
function rs(e = {}) {
  return { install: (t) => {
    const a = Pn(e, Eo);
    t.provide(Oo, a), t.config.idPrefix = "vsf", t.component("VStepperForm", ca(() => Promise.resolve().then(() => Hr))), t.component("FieldLabel", ca(() => import("./FieldLabel-7fESx4JQ.mjs")));
  } };
}
export {
  gt as FieldLabel,
  Br as VStepperForm,
  rs as createVStepperForm,
  Br as default
};
(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".v-item-group[data-v-49f12da6]{flex-wrap:wrap}.vsf-button-field__btn-label[data-v-49f12da6]{color:var(--7f272e17)}.v-stepper-item--error[data-v-15220e2c] .v-icon{color:#fff}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
