var L0 = (A, e, t) => {
  if (!e.has(A))
    throw TypeError("Cannot " + t);
};
var z = (A, e, t) => (L0(A, e, "read from private field"), t ? t.call(A) : e.get(A)), NA = (A, e, t) => {
  if (e.has(A))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(A) : e.set(A, t);
}, JA = (A, e, t, o) => (L0(A, e, "write to private field"), o ? o.call(A, t) : e.set(A, t), t);
var W, AA;
class me {
  /**
   * @param {T} current
   */
  constructor(e) {
    /**
     * @type {T}
     */
    NA(this, W, void 0);
    NA(this, AA, /* @__PURE__ */ new Set());
    JA(this, W, e);
  }
  /**
   * @return {T}
   */
  get current() {
    return z(this, W);
  }
  /**
   * @param {T} value
   */
  set current(e) {
    z(this, W) != e && (JA(this, W, e), z(this, AA).forEach((t) => t(e)));
  }
  /**
   * @type {import("hooks").Ref["on"]}
   */
  on(e) {
    return z(this, AA).add(e), () => z(this, AA).delete(e);
  }
}
W = new WeakMap(), AA = new WeakMap();
const B2 = (A) => new me(A), $A = Symbol.for("atomico.hooks");
globalThis[$A] = globalThis[$A] || {};
let eA = globalThis[$A];
const we = Symbol.for("Atomico.suspense"), E2 = Symbol.for("Atomico.effect"), Ie = Symbol.for("Atomico.layoutEffect"), p2 = Symbol.for("Atomico.insertionEffect"), rA = (A, e, t) => {
  const { i: o, hooks: n } = eA.c, i = n[o] = n[o] || {};
  return i.value = A(i.value), i.effect = e, i.tag = t, eA.c.i++, n[o].value;
}, _A = (A) => rA((e = B2(A)) => e), f2 = () => rA((A = B2(eA.c.host)) => A), Be = () => eA.c.update, Ee = (A, e, t = 0) => {
  let o = {}, n = !1;
  const i = () => n, r = (s, g) => {
    for (const h in o) {
      const l = o[h];
      l.effect && l.tag === s && (l.value = l.effect(l.value, g));
    }
  };
  return { load: (s) => {
    eA.c = { host: e, hooks: o, update: A, i: 0, id: t };
    let g;
    try {
      n = !1, g = s();
    } catch (h) {
      if (h !== we)
        throw h;
      n = !0;
    } finally {
      eA.c = null;
    }
    return g;
  }, cleanEffects: (s) => (r(p2, s), () => (r(Ie, s), () => {
    r(E2, s);
  })), isSuspense: i };
}, CA = Symbol.for;
function M2(A, e) {
  const t = A.length;
  if (t !== e.length)
    return !1;
  for (let o = 0; o < t; o++) {
    let n = A[o], i = e[o];
    if (n !== i)
      return !1;
  }
  return !0;
}
const H = (A) => typeof A == "function", aA = (A) => typeof A == "object", { isArray: pe } = Array, A0 = (A, e) => (e ? A instanceof HTMLStyleElement : !0) && "hydrate" in ((A == null ? void 0 : A.dataset) || {});
function y2(A, e) {
  let t;
  const o = (n) => {
    let { length: i } = n;
    for (let r = 0; r < i; r++) {
      const d = n[r];
      if (d && Array.isArray(d))
        o(d);
      else {
        const a = typeof d;
        if (d == null || a === "function" || a === "boolean")
          continue;
        a === "string" || a === "number" ? (t == null && (t = ""), t += d) : (t != null && (e(t), t = null), e(d));
      }
    }
  };
  o(A), t != null && e(t);
}
const S2 = (A, e, t) => (A.addEventListener(e, t), () => A.removeEventListener(e, t));
let Q2 = class {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(e, t, o) {
    this.message = t, this.target = e, this.value = o;
  }
};
class b2 extends Q2 {
}
let fe = class extends Q2 {
};
const xA = "Custom", Me = null, ye = { true: 1, "": 1, 1: 1 };
function Se(A, e, t, o, n) {
  const {
    type: i,
    reflect: r,
    event: d,
    value: a,
    attr: s = be(e)
  } = (t == null ? void 0 : t.name) != xA && aA(t) && t != Me ? t : { type: t }, g = (i == null ? void 0 : i.name) === xA && i.map, h = a != null ? i == Function || !H(a) ? () => a : a : null;
  Object.defineProperty(A, e, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(l) {
      const u = this[e];
      h && i != Boolean && l == null && (l = h());
      const { error: C, value: B } = (g ? Le : De)(
        i,
        l
      );
      if (C && B != null)
        throw new b2(
          this,
          `The value defined for prop '${e}' must be of type '${i.name}'`,
          B
        );
      u != B && (this._props[e] = B ?? void 0, this.update(), d && Qe(this, d), this.updated.then(() => {
        r && (this._ignoreAttr = s, xe(this, i, s, this[e]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[e];
    }
  }), h && (n[e] = h()), o[s] = { prop: e, type: i };
}
const Qe = (A, { type: e, base: t = CustomEvent, ...o }) => A.dispatchEvent(new t(e, o)), be = (A) => A.replace(/([A-Z])/g, "-$1").toLowerCase(), xe = (A, e, t, o) => o == null || e == Boolean && !o ? A.removeAttribute(t) : A.setAttribute(
  t,
  (e == null ? void 0 : e.name) === xA && (e != null && e.serialize) ? e == null ? void 0 : e.serialize(o) : aA(o) ? JSON.stringify(o) : e == Boolean ? "" : o
), Ge = (A, e) => A == Boolean ? !!ye[e] : A == Number ? Number(e) : A == String ? e : A == Array || A == Object ? JSON.parse(e) : A.name == xA ? e : (
  // TODO: If when defining reflect the prop can also be of type string?
  new A(e)
), Le = ({ map: A }, e) => {
  try {
    return { value: A(e), error: !1 };
  } catch {
    return { value: e, error: !0 };
  }
}, De = (A, e) => A == null || e == null ? { value: e, error: !1 } : A != String && e === "" ? { value: void 0, error: !1 } : A == Object || A == Array || A == Symbol ? {
  value: e,
  error: {}.toString.call(e) !== `[object ${A.name}]`
} : e instanceof A ? {
  value: e,
  error: A == Number && Number.isNaN(e.valueOf())
} : A == String || A == Number || A == Boolean ? {
  value: e,
  error: A == Number ? typeof e != "number" ? !0 : Number.isNaN(e) : A == String ? typeof e != "string" : typeof e != "boolean"
} : { value: e, error: !0 };
let Re = 0;
const Fe = (A) => {
  var t;
  const e = ((t = (A == null ? void 0 : A.dataset) || {}) == null ? void 0 : t.hydrate) || "";
  return e || "c" + Re++;
}, C0 = (A, e = HTMLElement) => {
  const t = {}, o = {}, n = "prototype" in e && e.prototype instanceof Element, i = n ? e : "base" in e ? e.base : HTMLElement, { props: r, styles: d } = n ? A : e;
  class a extends i {
    constructor() {
      super(), this._setup(), this._render = () => A({ ...this._props });
      for (const g in o)
        this[g] = o[g];
    }
    /**
     * @returns {import("core").Sheets[]}
     */
    static get styles() {
      return [super.styles, d];
    }
    async _setup() {
      if (this._props)
        return;
      this._props = {};
      let g, h;
      this.mounted = new Promise(
        (p) => this.mount = () => {
          p(), g != this.parentNode && (h != g ? this.unmounted.then(this.update) : this.update()), g = this.parentNode;
        }
      ), this.unmounted = new Promise(
        (p) => this.unmount = () => {
          p(), (g != this.parentNode || !this.isConnected) && (l.cleanEffects(!0)()(), h = this.parentNode, g = null);
        }
      ), this.symbolId = this.symbolId || Symbol(), this.symbolIdParent = Symbol();
      const l = Ee(
        () => this.update(),
        this,
        Fe(this)
      );
      let u, C = !0;
      const B = A0(this);
      this.update = () => (u || (u = !0, this.updated = (this.updated || this.mounted).then(() => {
        try {
          const p = l.load(this._render), m = l.cleanEffects();
          return p && //@ts-ignore
          p.render(this, this.symbolId, B), u = !1, C && !l.isSuspense() && (C = !1, !B && ke(this)), m();
        } finally {
          u = !1;
        }
      }).then(
        /**
         * @param {import("internal/hooks.js").CleanUseEffects} [cleanUseEffect]
         */
        (p) => {
          p && p();
        }
      )), this.updated), this.update();
    }
    connectedCallback() {
      this.mount(), super.connectedCallback && super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback(), this.unmount();
    }
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {string} attr
     * @param {(string|null)} oldValue
     * @param {(string|null)} value
     */
    attributeChangedCallback(g, h, l) {
      if (t[g]) {
        if (g === this._ignoreAttr || h === l)
          return;
        const { prop: u, type: C } = t[g];
        try {
          this[u] = Ge(C, l);
        } catch {
          throw new fe(
            this,
            `The value defined as attr '${g}' cannot be parsed by type '${C.name}'`,
            l
          );
        }
      } else
        super.attributeChangedCallback(g, h, l);
    }
    static get props() {
      return { ...super.props, ...r };
    }
    static get observedAttributes() {
      const g = super.observedAttributes || [];
      for (const h in r)
        Se(this.prototype, h, r[h], t, o);
      return Object.keys(t).concat(g);
    }
  }
  return a;
};
function ke(A) {
  const { styles: e } = A.constructor, { shadowRoot: t } = A;
  if (t && e.length) {
    const o = [];
    y2(e, (n) => {
      n && (n instanceof Element ? t.appendChild(n.cloneNode(!0)) : o.push(n));
    }), o.length && (t.adoptedStyleSheets = o);
  }
}
const x2 = (A) => (e, t) => {
  rA(
    /**
     * Clean the effect hook
     * @type {import("internal/hooks.js").CollectorEffect}
     */
    ([o, n] = []) => ((n || !n) && (n && M2(n, t) ? o = o || !0 : (H(o) && o(), o = null)), [o, t]),
    /**
     * @returns {any}
     */
    ([o, n], i) => i ? (H(o) && o(), []) : [o || e(), n],
    A
  );
}, _ = x2(E2), Ke = x2(p2);
let G2 = class extends Array {
  /**
   *
   * @param {any} initialState
   * @param {(nextState: any, state:any[], mount: boolean )=>void} mapState
   */
  constructor(e, t) {
    let o = !0;
    const n = (i) => {
      try {
        t(i, this, o);
      } finally {
        o = !1;
      }
    };
    super(void 0, n, t), n(e);
  }
  /**
   * The following code allows a mutable approach to useState
   * and useProp this with the idea of allowing an alternative
   * approach similar to Vue or Qwik of state management
   * @todo pending review with the community
   */
  // get value() {
  //     return this[0];
  // }
  // set value(nextState) {
  //     this[2](nextState, this);
  // }
};
const x = (A) => {
  const e = Be();
  return rA(
    (t = new G2(A, (o, n, i) => {
      o = H(o) ? o(n[0]) : o, o !== n[0] && (n[0] = o, i || e());
    })) => t
  );
}, UA = (A, e) => {
  const [t] = rA(([o, n, i = 0] = []) => ((!n || n && !M2(n, e)) && (o = A()), [o, e, i]));
  return t;
}, X = (A) => {
  const { current: e } = f2();
  if (!(A in e))
    throw new b2(
      e,
      `For useProp("${A}"), the prop does not exist on the host.`,
      A
    );
  return rA(
    (t = new G2(e[A], (o, n) => {
      o = H(o) ? o(e[A]) : o, e[A] = o;
    })) => (t[0] = e[A], t)
  );
}, e0 = CA("atomico/options");
globalThis[e0] = globalThis[e0] || {
  sheet: !!document.adoptedStyleSheets
};
const m0 = globalThis[e0];
new Promise((A) => {
  m0.ssr || (document.readyState === "loading" ? S2(document, "DOMContentLoaded", A) : A());
});
const Oe = {
  checked: 1,
  value: 1,
  selected: 1
}, Ye = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, ve = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, fA = {}, t0 = [];
class o0 extends Text {
}
const He = CA("atomico/id"), sA = CA("atomico/type"), jA = CA("atomico/ref"), L2 = CA("atomico/vnode"), w0 = () => {
};
function Ne(A, e, t) {
  return R2(this, A, e, t);
}
const D2 = (A, e, ...t) => {
  const o = e || fA;
  let { children: n } = o;
  if (n = n ?? (t.length ? t : t0), A === w0)
    return n;
  const i = A ? A instanceof Node ? 1 : (
    //@ts-ignore
    A.prototype instanceof HTMLElement && 2
  ) : 0;
  if (i === !1 && A instanceof Function)
    return A(
      n != t0 ? { children: n, ...o } : o
    );
  const r = m0.render || Ne;
  return {
    [sA]: L2,
    type: A,
    props: o,
    children: n,
    key: o.key,
    // key for lists by keys
    // define if the node declares its shadowDom
    shadow: o.shadowDom,
    // allows renderings to run only once
    static: o.staticNode,
    // defines whether the type is a childNode `1` or a constructor `2`
    raw: i,
    // defines whether to use the second parameter for document.createElement
    is: o.is,
    // clone the node if it comes from a reference
    clone: o.cloneNode,
    render: r
  };
};
function R2(A, e, t = He, o, n) {
  let i;
  if (e && e[t] && e[t].vnode == A || A[sA] != L2)
    return e;
  (A || !e) && (n = n || A.type == "svg", i = A.type != "host" && (A.raw == 1 ? (e && A.clone ? e[jA] : e) != A.type : A.raw == 2 ? !(e instanceof A.type) : e ? e[jA] || e.localName != A.type : !e), i && A.type != null && (A.raw == 1 && A.clone ? (o = !0, e = A.type.cloneNode(!0), e[jA] = A.type) : e = A.raw == 1 ? A.type : A.raw == 2 ? new A.type() : n ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    A.type
  ) : document.createElement(
    A.type,
    A.is ? { is: A.is } : void 0
  )));
  const r = e[t] ? e[t] : fA, { vnode: d = fA, cycle: a = 0 } = r;
  let { fragment: s, handlers: g } = r;
  const { children: h = t0, props: l = fA } = d;
  if (g = i ? {} : g || {}, A.static && !i)
    return e;
  if (A.shadow && !e.shadowRoot && // @ts-ignore
  e.attachShadow({ mode: "open", ...A.shadow }), A.props != l && je(e, l, A.props, g, n), A.children !== h) {
    const u = A.shadow ? e.shadowRoot : e;
    s = Ue(
      A.children,
      /**
       * @todo for hydration use attribute and send childNodes
       */
      s,
      u,
      t,
      // add support to foreignObject, children will escape from svg
      !a && o,
      n && A.type == "foreignObject" ? !1 : n
    );
  }
  return e[t] = { vnode: A, handlers: g, fragment: s, cycle: a + 1 }, e;
}
function Je(A, e) {
  const t = new o0(""), o = new o0("");
  let n;
  if (A[e ? "prepend" : "append"](t), e) {
    let { lastElementChild: i } = A;
    for (; i; ) {
      const { previousElementSibling: r } = i;
      if (A0(i, !0) && !A0(r, !0)) {
        n = i;
        break;
      }
      i = r;
    }
  }
  return n ? n.before(o) : A.append(o), {
    markStart: t,
    markEnd: o
  };
}
function Ue(A, e, t, o, n, i) {
  A = A == null ? null : pe(A) ? A : [A];
  const r = e || Je(t, n), { markStart: d, markEnd: a, keyes: s } = r;
  let g;
  const h = s && /* @__PURE__ */ new Set();
  let l = d;
  if (A && y2(A, (u) => {
    if (typeof u == "object" && !u[sA])
      return;
    const C = u[sA] && u.key, B = s && C != null && s.get(C);
    l != a && l === B ? h.delete(l) : l = l == a ? a : l.nextSibling;
    const p = s ? B : l;
    let m = p;
    if (u[sA])
      m = R2(u, p, o, n, i);
    else {
      const E = u + "";
      !(m instanceof Text) || m instanceof o0 ? m = new Text(E) : m.data != E && (m.data = E);
    }
    m != l && (s && h.delete(m), !p || s ? (t.insertBefore(m, l), s && l != a && h.add(l)) : p == a ? t.insertBefore(m, a) : (t.replaceChild(m, p), l = m)), C != null && (g = g || /* @__PURE__ */ new Map(), g.set(C, m));
  }), l = l == a ? a : l.nextSibling, e && l != a)
    for (; l != a; ) {
      const u = l;
      l = l.nextSibling, u.remove();
    }
  return h && h.forEach((u) => u.remove()), r.keyes = g, r;
}
function je(A, e, t, o, n) {
  for (const i in e)
    !(i in t) && D0(A, i, e[i], null, n, o);
  for (const i in t)
    D0(A, i, e[i], t[i], n, o);
}
function D0(A, e, t, o, n, i) {
  if (e = e == "class" && !n ? "className" : e, t = t ?? null, o = o ?? null, e in A && Oe[e] && (t = A[e]), !(o === t || ve[e] || e[0] == "_"))
    if (A.localName === "slot" && e === "assignNode" && "assign" in A)
      A.assign(o);
    else if (e[0] == "o" && e[1] == "n" && (H(o) || H(t)))
      Te(A, e.slice(2), o, i);
    else if (e == "ref")
      o && (H(o) ? o(A) : o.current = A);
    else if (e == "style") {
      const { style: r } = A;
      t = t || "", o = o || "";
      const d = aA(t), a = aA(o);
      if (d)
        for (const s in t)
          if (a)
            !(s in o) && R0(r, s, null);
          else
            break;
      if (a)
        for (const s in o) {
          const g = o[s];
          d && t[s] === g || R0(r, s, g);
        }
      else
        r.cssText = o;
    } else {
      const r = e[0] == "$" ? e.slice(1) : e;
      r === e && (!n && !Ye[e] && e in A || H(o) || H(t)) ? A[e] = o ?? "" : o == null ? A.removeAttribute(r) : A.setAttribute(
        r,
        aA(o) ? JSON.stringify(o) : o
      );
    }
}
function Te(A, e, t, o) {
  if (o.handleEvent || (o.handleEvent = (n) => o[n.type].call(A, n)), t) {
    if (!o[e]) {
      const n = t.capture || t.once || t.passive ? Object.assign({}, t) : null;
      A.addEventListener(e, o, n);
    }
    o[e] = t;
  } else
    o[e] && (A.removeEventListener(e, o), delete o[e]);
}
function R0(A, e, t) {
  let o = "setProperty";
  t == null && (o = "removeProperty", t = null), ~e.indexOf("-") ? A[o](e, t) : A[e] = t;
}
const qe = D2("host", { style: "display: contents" }), Ze = "value", Pe = (A, e) => {
  const t = f2(), o = _A();
  Ke(
    () => S2(
      t.current,
      "ConnectContext",
      /**
       * @param {CustomEvent<import("context").DetailConnectContext>} event
       */
      (n) => {
        n.composedPath().at(0) !== n.currentTarget && A === n.detail.id && (n.stopPropagation(), n.detail.connect(o));
      }
    ),
    [A]
  ), o.current = e;
}, We = (A) => {
  const e = C0(
    ({ value: t }) => (Pe(e, t), qe),
    {
      props: {
        value: {
          type: Object,
          value: () => A
        }
      }
    }
  );
  return e[Ze] = A, e;
};
We({
  /**
   *
   * @param {string} type
   * @param {string} id
   */
  dispatch(A, e) {
  }
});
const F0 = {};
function L(A, ...e) {
  const t = (A.raw || A).reduce(
    (o, n, i) => o + n + (e[i] || ""),
    ""
  );
  return F0[t] = F0[t] || ze(t);
}
function ze(A) {
  if (m0.sheet) {
    const e = new CSSStyleSheet();
    return e.replaceSync(A), e;
  } else {
    const e = document.createElement("style");
    return e.textContent = A, e;
  }
}
const c = (A, e, t) => (e == null ? e = { key: t } : e.key = t, D2(A, e)), M = c, Xe = L`/* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }`, v = {
  fontFamily: "Outfit",
  COLORS: {
    blueText: "#142542",
    blackText: "#333333",
    greyText: "#7f8ea4",
    greyText12: "#7f8ea41F",
    greyText25: "#7f8ea440",
    redBorder: "#ff426e",
    blueBorder: "#0085f2",
    greyBorder: "#dfe3ec",
    blackberryAlpha: "rgba(20, 37, 66, 0.12)"
  }
}, Ve = L`
    :host {
        --font-family: ${v.fontFamily};
        --blue-text: ${v.COLORS.blueText};
        --black-text: ${v.COLORS.blackText};
        --grey-text: ${v.COLORS.greyText};
        --grey-text-12: ${v.COLORS.greyText12};
        --grey-text-25: ${v.COLORS.greyText25};
        --red-border: ${v.COLORS.redBorder};
        --blue-border: ${v.COLORS.blueBorder};
        --grey-border: ${v.COLORS.greyBorder};
        --blackberry-alpha: ${v.COLORS.blackberryAlpha};
        --linear-gradient: linear-gradient(
            233.5deg,
            var(--main-color),
            var(--gradient-color)
        );

        font-family: var(--font-family);
        position: fixed;
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        z-index: 99999;
        right: 0px;
        bottom: 0px;
        height: 100%;
        width: 100%;
        pointer-events: none;
        text-align: initial;
    }
    #widget-modal {
        background-color: white;
    }
    .modal-body {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .sms-body {
        min-height: 444px;
    }
    .visible {
        opacity: 1;
        z-index: 100;
        pointer-events: auto;
    }
    .hidden {
        opacity: 0;
        z-index: 10;
    }
    .close-mobile-container {
        background-color: rgba(255, 255, 255, 0.12);
        height: 30px;
        width: 30px;
        position: absolute;
        right: 25px;
        top: 33px;
        border-radius: 100%;
        z-index: 5;
    }

    @media (min-width: 576px) {
        #widget-modal {
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 20px;
            margin-right: var(--desktop-launcher-margin-right);
            margin-bottom: 8px;
            --transition-duration: 0.2s;
            -webkit-transition: -webkit-opacity var(--transition-duration)
                linear;
            -moz-transition: -moz-opacity var(--transition-duration) linear;
            -o-transition: -o-opacity var(--transition-duration) linear;
            -ms-transition: -ms-opacity var(--transition-duration) linear;
            transition: opacity var(--transition-duration) linear;
        }
        .modal-body {
            height: auto;
            max-width: 290px;
            min-width: 290px;
            border-radius: 15px;
        }
        :host {
            height: fit-content;
            width: fit-content;
        }
    }

    @media (max-width: 575px) {
        #widget-modal {
            position: fixed;
        }
    }
`, $e = L`.header-container {
        display: flex;
        width: 100%;
        background: var(--linear-gradient);
        align-items: center;
        box-sizing: border-box;
        padding: 24px;
    }

    #header-arrow-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
    }
    #header-title-container {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }
    #header-text {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }
    #header-header,
    #header-subtitle {
        margin: 0px;
        color: white;
        font-weight: 700;
    }
    #header-header {
        font-size: 28px;
        line-height: 100%;
        margin-right: 30px;
    }
    #header-subtitle {
        font-size: 18px;
        line-height: 23px;
        opacity: 75%;
    }

    @media (min-width: 576px) {
        .header-container {
            border-radius: 15px 15px 0px 0px;
        }
        #header-text {
            gap: 4px;
        }
        #header-header {
            font-size: 22px;
            margin-right: 0px;
            display: inherit;
            min-width: inherit;
        }
        #header-subtitle {
            font-size: 14px;
            line-height: 18px;
        }
    }

    @media (max-width: 575px) {
        .header-container {
            height: 96px;
            padding: 16px;
        }

        #header-title-container {
            display: flex;
            align-items: unset;
            gap: 8px;
            width: 85%;
        }

        #header-header {
            font-size: 22px;
            line-height: normal;
        }

        #header-text {
            gap: 0px;
        }

        #header-subtitle {
            font-size: 14px;
            line-height: normal;
            opacity: 75%;
        }
    }`, _e = L`#form-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
    }
    #form-bubble {
        border-radius: 32px 32px 4px;
        background-color: white;
        width: 100%;
        padding: 32px 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 28px;
    }
    .input-container {
        height: 28px;
        position: relative;
        box-sizing: border-box;
    }
    .input-border {
        border-bottom: 1px solid var(--grey-border);
    }
    .input-border:focus-within {
        border-bottom: 2px solid var(--blue-border);
    }
    .input-border-error {
        border-bottom: 1px solid var(--red-border);
    }
    .form-input:focus {
        outline: none;
    }
    .input-label,
    .form-input {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 22px;
        font-size: 14px;
        line-height: 18px;
        padding: 4px 0px 0px;
        font-family: var(--font-family);
    }
    .form-input {
        border: none;
        width: 100%;
        box-sizing: border-box;
        font-weight: 400;
        color: var(--blue-text);
    }
    .input-label {
        font-weight: 700;
        color: var(--grey-text);
        pointer-events: none;
        transition: all 0.1s linear;
        -webkit-transition: all 0.1s linear;
        -o-transition: all 0.1s linear;
        -moz-transition: all 0.1s linear;
        -ms-transition: all 0.1s linear;
    }
    .label-as-header,
    .form-input:focus ~ .input-label,
    .form-input:valid ~ .input-label {
        top: -14px;
        font-size: 10px;
        line-height: 13px;
    }
    #message-input {
        margin: 0px;
        resize: none;
    }
    .widget-button {
        border-radius: 50px;
        font-size: 14px;
        font-weight: 700;
        padding: 10px 25px;
        border: none;
        box-sizing: border-box;
        height: 40px;
        font-family: var(--font-family);
    }

    .enabled-button {
        background: var(--linear-gradient);
        color: white;
        cursor: pointer;
    }
    .disabled-button {
        background: var(--grey-text-12);
        color: var(--grey-text-25);
    }

    @media (max-width: 575px) {
        #form-container {
            padding: 38px 24px 24px;
            gap: 24px;
        }

        #form-bubble {
            padding: unset;
        }

        #send-button {
            width: 100%;
            height: 56px;
        }`, A1 = L`#phone-input-container {
        height: 32px;
    }
    #phone-code-input-label {
        position: relative;
        top: 4px;
        left: 0px;
        margin-right: 30px;
    }
    #phone-code-input {
        width: 100%;
        display: flex;
    }
    .phone-code {
        min-width: fit-content;
        box-sizing: border-box;
        height: 22px;
        font-size: 14px;
        line-height: 18px;
        font-family: var(--font-family);
        font-weight: 700;
        color: var(--blue-text);
        margin-top: 4px;
    }
    .hide-code {
        display: none;
    }
    #phone-input {
        position: static;
        padding-left: 2px;
    }
    #phone-input-error {
        top: 30px;
        position: absolute;
        color: #ff426e;
        font-size: 12px;
        max-height: 16px;
        font-weight: 300;
        font-family: var(--font-family);
    }
    .phone-label-error {
        color: var(--red-border);
    }
    #country-select-container {
        display: flex;
        position: absolute;
        top: 4px;
        right: 0px;
    }
    #country-flag {
        width: 24px;
        height: 24px;
        border-radius: 100px;
        box-sizing: border-box;
        border: 1px solid var(--grey-border);
    }
    #select-container {
        width: 18px;
        height: 24px;
        position: relative;
    }
    #icon-container,
    #country-select {
        width: 18px;
        height: 24px;
        position: absolute;
    }
    #icon-container {
        z-index: 1;
        pointer-events: none;
        background-color: white;
    }
    #select-icon {
        margin: 9px 6px;
    }
    #country-select {
        z-index: 0;
        border: none;
        outline: none;
    }`, e1 = L`#error-body {
        padding: 24px 24px;

        @media (max-width: 575px) {
            position: absolute;
            inset: 0;
        }
    }
    .error-div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
    }
    #error-body p {
        text-align: center;
        font-family: var(--font-family);
        word-break: break-word;
    }
    #error-icon {
        width: 242px;
        height: 105px;
    }
    .error-text {
        font-size: 20px;
        font-weight: 700;
        line-height: 100%;
        color: var(--black-text);
    }
    #error-tip {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        color: var(--grey-text);
    }

    @media (max-width: 575px) {
        #error-button {
            width: 100%;
            height: 56px;
        }
    }`, t1 = L`@keyframes grow-success-background-with-radius {
        0% {
            height: 114px;
            border-radius: 15px 15px 0px 0px;
        }
        70% {
            border-radius: 15px;
            height: 101%;
        }
        100% {
            height: 100%;
            border-radius: 15px;
        }
    }
    @keyframes grow-success-background {
        0% {
            height: 135px;
        }
        70% {
            height: 101%;
        }
        100% {
            height: 100%;
        }
    }
    @keyframes show-success-content {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes hide-form-header {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    #success-body {
        position: relative;
    }
    #success-form-header {
        top: 0px;
        z-index: 4;
        position: absolute;
        animation: hide-form-header 0.5s forwards;
        background: white;
    }
    #success-form {
        top: 0px;
        z-index: 0;
        position: absolute;
    }
    #success-background-container {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .success-background {
        position: absolute;
        animation: grow-success-background 0.7s forwards;
        height: 100%;
        width: 100%;
        z-index: 2;
        top: 0px;
    }
    #success-canvas {
        background: white;
    }
    #success-gradient {
        background: var(--linear-gradient);
    }
    #success-content-container {
        position: absolute;
        justify-content: center;
        z-index: 3;
        top: 0px;
    }
    #success-content {
        display: flex;
        flex-direction: column;
        gap: 7px;
        align-items: center;
        color: white;
        animation: show-success-content 1s;
    }
    #success-content > p {
        margin: 0;
        max-width: 80%;
        text-align: center;
        font-weight: 700;
        font-family: var(--font-family);
    }
    #success-icon-container {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 100%;
        margin-bottom: 14px;
    }
    #success-icon {
        width: 80px;
    }
    #success-header {
        font-size: 22px;
        line-height: 100%;
    }
    #success-message {
        font-size: 14px;
        line-height: 18px;
    }

    @media (min-width: 575px) {
        #success-body {
            border-radius: 15px;
        }
        .success-background {
            animation: grow-success-background-with-radius 0.7s forwards;
        }
        #success-form-header {
            border-radius: 15px 15px 0px 0px;
        }
    }`, o1 = L`#gdpr-container {
        display: flex;
        align-items: center;
        gap: 8px;
        align-self: stretch;
    }

    #gdpr {
        font-size: 10px;
        color: var(--grey-text);
        text-align: left;
        font-weight: 400;
    }
    #gdpr-link {
        color: inherit;
    }

    @media (max-width: 575px) {
        #gdpr-checkbox {
            margin: 0px;
        }
    }`, n1 = L`partoo-msg-widget {
        z-index: 99999;
    }

    #launcher {
        margin-bottom: var(--mobile-margin-bottom);
        margin-right: var(--mobile-margin-right);
        display: flex;
        flex-direction: column;
        position: relative;
        cursor: pointer;
    }

    #popup {
        background: white;
        pointer-events: auto;
        display: flex;
        padding: 20px;
        border-radius: 16px;
        align-items: center;
        -webkit-filter: drop-shadow(0px 5px 10px rgba(20, 37, 66, 0.16));
        box-shadow: 0px 5px 10px rgba(20, 37, 66, 0.16);
        border: 1px solid var(--grey-border);
    }

    #popup-messages {
        color: var(--blue-text);
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
    }

    #popup-picture {
        width: 50px;
        height: 50px;
        margin-right: 12px;
        border-radius: 50%;
        object-fit: cover;
    }

    .popup-close-icon {
        width: 10px;
        height: 10px;
        margin: 8px;
        filter: brightness(65%);
    }

    .popup-close-button {
        background: white;
        box-shadow: 0px 2px 2px rgba(20, 37, 66, 0.15);
        border-radius: 100%;
        height: 25px;
        pointer-events: auto;
        position: absolute;
        right: -13px;
        top: -13px;
        z-index: 1;
    }

    #popup-arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        right: 15px;
        border: 10px solid transparent;
        border-bottom: 0px;
        border-top: 12px solid var(--grey-border);
        bottom: 56px;
    }

    #popup-arrow-inner {
        position: relative;
        right: 9px;
        height: 0px;
        width: 0px;
        border: 9px solid transparent;
        border-bottom: 0px;
        border-top: 11px solid white;
        bottom: 12px;
    }

    #popup-container {
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-timing-function: ease-in;
        animation-duration: 1.5s;
    }

    #launcher-button-container {
        background: var(--linear-gradient);
        border-radius: 50%;
        min-width: 48px;
        min-height: 48px;
        width: min-content;
        pointer-events: auto;
        margin-left: auto;
        margin-top: 18px;
    }

    .icon-image {
        cursor: pointer;
        position: absolute;
    }

    .icon-open {
        width: 28px;
        height: 28px;
        padding: 10px;
    }

    .icon-close {
        width: 21px;
        height: 21px;
        padding: 27px;
    }

    .icon-close-mobile {
        width: 14px;
        height: 14px;
        margin: 8px;
    }

    @keyframes fadeInOpacity {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
            pointer-events: auto;
            z-index: 100;
        }
    }

    @keyframes openModal {
        from {
            opacity: 1;
            transform: rotate(0deg);
        }
        to {
            opacity: 0;
            transform: rotate(180deg);
        }
    }

    @keyframes closeModal {
        from {
            opacity: 1;
            transform: rotate(0deg);
        }
        to {
            opacity: 0;
            transform: rotate(-180deg);
        }
    }

    @media (min-width: 576px) {
        .disable-animation {
            animation: none !important;
        }
        .icon-open-rotate-animation {
            animation-name: openModal;
            animation-timing-function: linear;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        .icon-close-rotate-animation {
            animation-name: closeModal;
            animation-timing-function: linear;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        .icon-show-animation {
            animation-name: fadeInOpacity;
            animation-timing-function: linear;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        :host {
            margin-bottom: var(--desktop-margin-bottom);
            margin-right: var(--desktop-margin-right);
        }

        #launcher {
            margin-bottom: var(--desktop-launcher-margin-bottom);
            margin-right: var(--desktop-launcher-margin-right);
        }

        #launcher-button-container {
            min-width: 75px;
            min-height: 75px;
        }

        .icon-open {
            width: 45px;
            height: 45px;
            padding: 15px;
        }

        .icon-close {
            width: 21px;
            height: 21px;
            padding: 27px;
        }

        #popup-arrow {
            right: 28px;
            bottom: 82px;
        }
    }`, i1 = L`#channel-selector-modal-container {
        background-color: white;
        border-radius: 15px;

        a {
            text-decoration: none;
        }
    }

    #channel-selector-container {
        padding: 16px;
    }

    #channel-choices-container {
        display: flex;
        gap: 8px;
        flex-direction: column;

        .icon-button {
            justify-content: unset;
            position: relative;
        }

        #icon-button-text {
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
        }
    }

    @media (max-width: 575px) {
        #channel-selector-modal-container {
            height: 100%;
        }

        #channel-choices-container {
            gap: 16px;
        }
    }`, r1 = L`.icon-button {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 40px;
        radius: 8px;
        padding: 8px 24px;
        border-radius: 8px;
        border: 1px solid var(--blackberry-alpha);
        font-family: var(--font-family);
        font-weight: 700;
        color: var(--blue-text);
        cursor: pointer;
        width: 100%;
        font-size: 14px;
    }

    @media (max-width: 575px) {
        .icon-button {
            height: 56px;
            font-size: 16px;
        }
    }`, d1 = L`#meta-modal-container {
        background-color: white;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 16px;

        a {
            text-decoration: none;
            width: 100%;
        }

        #header-title-container {
            align-items: center;
        }
    }

    #meta-modal-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 16px;
        gap: 16px;
    }

    #qrcode-container {
        padding: 8px;
        border-radius: 16px;
        border: 4px solid var(--blackberry-alpha);
    }

    #qrcode-text {
        text-align: center;
        color: var(--grey-text);
        padding: 16px 16px 0px 16px;
        font-size: 16px;
    }

    #or-container {
        border-radius: 500px;
        display: flex;
        padding: 4.5px 8px;
        align-items: center;
        background: rgba(0, 133, 242, 0.12);
        color: var(--blue-border);
        font-size: 12px;
        font-weight: 700;
    }

    #web-redirection-button-container {
        padding: 0px 16px 0px 16px;
        font-size: 16px;
        width: 100%;
    }`, a1 = L`#no-channel-modal-container {
        background-color: white;
        border-radius: 15px;
    }

    #no-channel-modal-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
        gap: 16px;

        @media (max-width: 575px) {
            padding: 0px 24px;
            position: absolute;
            justify-content: center;
            inset: 0;
        }
    }

    #no-channel-illustration {
        width: 100%;
    }

    #no-channel-hey-text {
        font-weight: 700;
        font-size: 20px;
    }

    #no-channel-text {
        color: var(--grey-text);
        text-align: center;
        font-size: 16px;
    }`, s1 = [
  Xe,
  Ve,
  $e,
  _e,
  A1,
  e1,
  t1,
  n1,
  o1,
  r1,
  i1,
  d1,
  a1
], cA = "partoo-msg-widget", F2 = {
  AF: {
    name: "Afghanistan",
    code: "+93",
    isoAlpha2: "AF",
    emoji: "🇦🇫"
  },
  AL: {
    name: "Albania",
    code: "+355",
    isoAlpha2: "AL",
    emoji: "🇦🇱"
  },
  DZ: {
    name: "Algeria",
    code: "+213",
    isoAlpha2: "DZ",
    emoji: "🇩🇿"
  },
  AS: {
    name: "American Samoa",
    code: "+1684",
    isoAlpha2: "AS",
    emoji: "🇦🇸"
  },
  AD: {
    name: "Andorra",
    code: "+376",
    isoAlpha2: "AD",
    emoji: "🇦🇩"
  },
  AO: {
    name: "Angola",
    code: "+244",
    isoAlpha2: "AO",
    emoji: "🇦🇴"
  },
  AI: {
    name: "Anguilla",
    code: "+1264",
    isoAlpha2: "AI",
    emoji: "🇦🇮"
  },
  AG: {
    name: "Antigua and Barbuda",
    code: "+1268",
    isoAlpha2: "AG",
    emoji: "🇦🇬"
  },
  AR: {
    name: "Argentina",
    code: "+54",
    isoAlpha2: "AR",
    emoji: "🇦🇷"
  },
  AM: {
    name: "Armenia",
    code: "+374",
    isoAlpha2: "AM",
    emoji: "🇦🇲"
  },
  AW: {
    name: "Aruba",
    code: "+297",
    isoAlpha2: "AW",
    emoji: "🇦🇼"
  },
  AU: {
    name: "Australia",
    code: "+61",
    isoAlpha2: "AU",
    emoji: "🇦🇺"
  },
  AT: {
    name: "Austria",
    code: "+43",
    isoAlpha2: "AT",
    emoji: "🇦🇹"
  },
  AZ: {
    name: "Azerbaijan",
    code: "+994",
    isoAlpha2: "AZ",
    emoji: "🇦🇿"
  },
  BS: {
    name: "Bahamas",
    code: "+1242",
    isoAlpha2: "BS",
    emoji: "🇧🇸"
  },
  BH: {
    name: "Bahrain",
    code: "+973",
    isoAlpha2: "BH",
    emoji: "🇧🇭"
  },
  BD: {
    name: "Bangladesh",
    code: "+880",
    isoAlpha2: "BD",
    emoji: "🇧🇩"
  },
  BB: {
    name: "Barbados",
    code: "+1246",
    isoAlpha2: "BB",
    emoji: "🇧🇧"
  },
  BY: {
    name: "Belarus",
    code: "+375",
    isoAlpha2: "BY",
    emoji: "🇧🇾"
  },
  BE: {
    name: "Belgium",
    code: "+32",
    isoAlpha2: "BE",
    emoji: "🇧🇪"
  },
  BZ: {
    name: "Belize",
    code: "+501",
    isoAlpha2: "BZ",
    emoji: "🇧🇿"
  },
  BJ: {
    name: "Benin",
    code: "+229",
    isoAlpha2: "BJ",
    emoji: "🇧🇯"
  },
  BM: {
    name: "Bermuda",
    code: "+1441",
    isoAlpha2: "BM",
    emoji: "🇧🇲"
  },
  BT: {
    name: "Bhutan",
    code: "+975",
    isoAlpha2: "BT",
    emoji: "🇧🇹"
  },
  BO: {
    name: "Bolivia",
    code: "+591",
    isoAlpha2: "BO",
    emoji: "🇧🇴"
  },
  BA: {
    name: "Bosnia and Herzegovina",
    code: "+387",
    isoAlpha2: "BA",
    emoji: "🇧🇦"
  },
  BW: {
    name: "Botswana",
    code: "+267",
    isoAlpha2: "BW",
    emoji: "🇧🇼"
  },
  BR: {
    name: "Brazil",
    code: "+55",
    isoAlpha2: "BR",
    emoji: "🇧🇷"
  },
  IO: {
    name: "British Indian Ocean Territory",
    code: "+246",
    isoAlpha2: "IO",
    emoji: "🇮🇴"
  },
  VG: {
    name: "British Virgin Islands",
    code: "+1284",
    isoAlpha2: "VG",
    emoji: "🇻🇬"
  },
  BN: {
    name: "Brunei",
    code: "+673",
    isoAlpha2: "BN",
    emoji: "🇧🇳"
  },
  BG: {
    name: "Bulgaria",
    code: "+359",
    isoAlpha2: "BG",
    emoji: "🇧🇬"
  },
  BF: {
    name: "Burkina Faso",
    code: "+226",
    isoAlpha2: "BF",
    emoji: "🇧🇫"
  },
  BI: {
    name: "Burundi",
    code: "+257",
    isoAlpha2: "BI",
    emoji: "🇧🇮"
  },
  KH: {
    name: "Cambodia",
    code: "+855",
    isoAlpha2: "KH",
    emoji: "🇰🇭"
  },
  CM: {
    name: "Cameroon",
    code: "+237",
    isoAlpha2: "CM",
    emoji: "🇨🇲"
  },
  CA: {
    name: "Canada",
    code: "+1",
    isoAlpha2: "CA",
    emoji: "🇨🇦"
  },
  CV: {
    name: "Cape Verde",
    code: "+238",
    isoAlpha2: "CV",
    emoji: "🇨🇻"
  },
  BQ: {
    name: "Caribbean Netherlands",
    code: "+599",
    isoAlpha2: "BQ",
    emoji: "🇧🇶"
  },
  KY: {
    name: "Cayman Islands",
    code: "+1345",
    isoAlpha2: "KY",
    emoji: "🇰🇾"
  },
  CF: {
    name: "Central African Republic",
    code: "+236",
    isoAlpha2: "CF",
    emoji: "🇨🇫"
  },
  TD: {
    name: "Chad",
    code: "+235",
    isoAlpha2: "TD",
    emoji: "🇹🇩"
  },
  CL: {
    name: "Chile",
    code: "+56",
    isoAlpha2: "CL",
    emoji: "🇨🇱"
  },
  CN: {
    name: "China",
    code: "+86",
    isoAlpha2: "CN",
    emoji: "🇨🇳"
  },
  CX: {
    name: "Christmas Island",
    code: "+61",
    isoAlpha2: "CX",
    emoji: "🇨🇽"
  },
  CC: {
    name: "Cocos (Keeling) Islands",
    code: "+61",
    isoAlpha2: "CC",
    emoji: "🇨🇨"
  },
  CO: {
    name: "Colombia",
    code: "+57",
    isoAlpha2: "CO",
    emoji: "🇨🇴"
  },
  KM: {
    name: "Comoros",
    code: "+269",
    isoAlpha2: "KM",
    emoji: "🇰🇲"
  },
  CK: {
    name: "Cook Islands",
    code: "+682",
    isoAlpha2: "CK",
    emoji: "🇨🇰"
  },
  CR: {
    name: "Costa Rica",
    code: "+506",
    isoAlpha2: "CR",
    emoji: "🇨🇷"
  },
  HR: {
    name: "Croatia",
    code: "+385",
    isoAlpha2: "HR",
    emoji: "🇭🇷"
  },
  CU: {
    name: "Cuba",
    code: "+53",
    isoAlpha2: "CU",
    emoji: "🇨🇺"
  },
  CW: {
    name: "Curaçao",
    code: "+5999",
    isoAlpha2: "CW",
    emoji: "🇨🇼"
  },
  CY: {
    name: "Cyprus",
    code: "+357",
    isoAlpha2: "CY",
    emoji: "🇨🇾"
  },
  CZ: {
    name: "Czechia",
    code: "+420",
    isoAlpha2: "CZ",
    emoji: "🇨🇿"
  },
  CD: {
    name: "DR Congo",
    code: "+243",
    isoAlpha2: "CD",
    emoji: "🇨🇩"
  },
  DK: {
    name: "Denmark",
    code: "+45",
    isoAlpha2: "DK",
    emoji: "🇩🇰"
  },
  DJ: {
    name: "Djibouti",
    code: "+253",
    isoAlpha2: "DJ",
    emoji: "🇩🇯"
  },
  DM: {
    name: "Dominica",
    code: "+1767",
    isoAlpha2: "DM",
    emoji: "🇩🇲"
  },
  DO: {
    name: "Dominican Republic",
    code: "+1849",
    isoAlpha2: "DO",
    emoji: "🇩🇴"
  },
  EC: {
    name: "Ecuador",
    code: "+593",
    isoAlpha2: "EC",
    emoji: "🇪🇨"
  },
  EG: {
    name: "Egypt",
    code: "+20",
    isoAlpha2: "EG",
    emoji: "🇪🇬"
  },
  SV: {
    name: "El Salvador",
    code: "+503",
    isoAlpha2: "SV",
    emoji: "🇸🇻"
  },
  GQ: {
    name: "Equatorial Guinea",
    code: "+240",
    isoAlpha2: "GQ",
    emoji: "🇬🇶"
  },
  ER: {
    name: "Eritrea",
    code: "+291",
    isoAlpha2: "ER",
    emoji: "🇪🇷"
  },
  EE: {
    name: "Estonia",
    code: "+372",
    isoAlpha2: "EE",
    emoji: "🇪🇪"
  },
  SZ: {
    name: "Eswatini",
    code: "+268",
    isoAlpha2: "SZ",
    emoji: "🇸🇿"
  },
  ET: {
    name: "Ethiopia",
    code: "+251",
    isoAlpha2: "ET",
    emoji: "🇪🇹"
  },
  FK: {
    name: "Falkland Islands",
    code: "+500",
    isoAlpha2: "FK",
    emoji: "🇫🇰"
  },
  FO: {
    name: "Faroe Islands",
    code: "+298",
    isoAlpha2: "FO",
    emoji: "🇫🇴"
  },
  FJ: {
    name: "Fiji",
    code: "+679",
    isoAlpha2: "FJ",
    emoji: "🇫🇯"
  },
  FI: {
    name: "Finland",
    code: "+358",
    isoAlpha2: "FI",
    emoji: "🇫🇮"
  },
  FR: {
    name: "France",
    code: "+33",
    isoAlpha2: "FR",
    emoji: "🇫🇷"
  },
  GF: {
    name: "French Guiana",
    code: "+594",
    isoAlpha2: "GF",
    emoji: "🇬🇫"
  },
  PF: {
    name: "French Polynesia",
    code: "+689",
    isoAlpha2: "PF",
    emoji: "🇵🇫"
  },
  GA: {
    name: "Gabon",
    code: "+241",
    isoAlpha2: "GA",
    emoji: "🇬🇦"
  },
  GM: {
    name: "Gambia",
    code: "+220",
    isoAlpha2: "GM",
    emoji: "🇬🇲"
  },
  GE: {
    name: "Georgia",
    code: "+995",
    isoAlpha2: "GE",
    emoji: "🇬🇪"
  },
  DE: {
    name: "Germany",
    code: "+49",
    isoAlpha2: "DE",
    emoji: "🇩🇪"
  },
  GH: {
    name: "Ghana",
    code: "+233",
    isoAlpha2: "GH",
    emoji: "🇬🇭"
  },
  GI: {
    name: "Gibraltar",
    code: "+350",
    isoAlpha2: "GI",
    emoji: "🇬🇮"
  },
  GR: {
    name: "Greece",
    code: "+30",
    isoAlpha2: "GR",
    emoji: "🇬🇷"
  },
  GL: {
    name: "Greenland",
    code: "+299",
    isoAlpha2: "GL",
    emoji: "🇬🇱"
  },
  GD: {
    name: "Grenada",
    code: "+1473",
    isoAlpha2: "GD",
    emoji: "🇬🇩"
  },
  GP: {
    name: "Guadeloupe",
    code: "+590",
    isoAlpha2: "GP",
    emoji: "🇬🇵"
  },
  GU: {
    name: "Guam",
    code: "+1671",
    isoAlpha2: "GU",
    emoji: "🇬🇺"
  },
  GT: {
    name: "Guatemala",
    code: "+502",
    isoAlpha2: "GT",
    emoji: "🇬🇹"
  },
  GG: {
    name: "Guernsey",
    code: "+44",
    isoAlpha2: "GG",
    emoji: "🇬🇬"
  },
  GN: {
    name: "Guinea",
    code: "+224",
    isoAlpha2: "GN",
    emoji: "🇬🇳"
  },
  GW: {
    name: "Guinea-Bissau",
    code: "+245",
    isoAlpha2: "GW",
    emoji: "🇬🇼"
  },
  GY: {
    name: "Guyana",
    code: "+592",
    isoAlpha2: "GY",
    emoji: "🇬🇾"
  },
  HT: {
    name: "Haiti",
    code: "+509",
    isoAlpha2: "HT",
    emoji: "🇭🇹"
  },
  HN: {
    name: "Honduras",
    code: "+504",
    isoAlpha2: "HN",
    emoji: "🇭🇳"
  },
  HK: {
    name: "Hong Kong",
    code: "+852",
    isoAlpha2: "HK",
    emoji: "🇭🇰"
  },
  HU: {
    name: "Hungary",
    code: "+36",
    isoAlpha2: "HU",
    emoji: "🇭🇺"
  },
  IS: {
    name: "Iceland",
    code: "+354",
    isoAlpha2: "IS",
    emoji: "🇮🇸"
  },
  IN: {
    name: "India",
    code: "+91",
    isoAlpha2: "IN",
    emoji: "🇮🇳"
  },
  ID: {
    name: "Indonesia",
    code: "+62",
    isoAlpha2: "ID",
    emoji: "🇮🇩"
  },
  IR: {
    name: "Iran",
    code: "+98",
    isoAlpha2: "IR",
    emoji: "🇮🇷"
  },
  IQ: {
    name: "Iraq",
    code: "+964",
    isoAlpha2: "IQ",
    emoji: "🇮🇶"
  },
  IE: {
    name: "Ireland",
    code: "+353",
    isoAlpha2: "IE",
    emoji: "🇮🇪"
  },
  IM: {
    name: "Isle of Man",
    code: "+44",
    isoAlpha2: "IM",
    emoji: "🇮🇲"
  },
  IL: {
    name: "Israel",
    code: "+972",
    isoAlpha2: "IL",
    emoji: "🇮🇱"
  },
  IT: {
    name: "Italy",
    code: "+39",
    isoAlpha2: "IT",
    emoji: "🇮🇹"
  },
  CI: {
    name: "Ivory Coast",
    code: "+225",
    isoAlpha2: "CI",
    emoji: "🇨🇮"
  },
  JM: {
    name: "Jamaica",
    code: "+1876",
    isoAlpha2: "JM",
    emoji: "🇯🇲"
  },
  JP: {
    name: "Japan",
    code: "+81",
    isoAlpha2: "JP",
    emoji: "🇯🇵"
  },
  JE: {
    name: "Jersey",
    code: "+44",
    isoAlpha2: "JE",
    emoji: "🇯🇪"
  },
  JO: {
    name: "Jordan",
    code: "+962",
    isoAlpha2: "JO",
    emoji: "🇯🇴"
  },
  KZ: {
    name: "Kazakhstan",
    code: "+7",
    isoAlpha2: "KZ",
    emoji: "🇰🇿"
  },
  KE: {
    name: "Kenya",
    code: "+254",
    isoAlpha2: "KE",
    emoji: "🇰🇪"
  },
  KI: {
    name: "Kiribati",
    code: "+686",
    isoAlpha2: "KI",
    emoji: "🇰🇮"
  },
  XK: {
    name: "Kosovo",
    code: "+383",
    isoAlpha2: "XK",
    emoji: "🇽🇰"
  },
  KW: {
    name: "Kuwait",
    code: "+965",
    isoAlpha2: "KW",
    emoji: "🇰🇼"
  },
  KG: {
    name: "Kyrgyzstan",
    code: "+996",
    isoAlpha2: "KG",
    emoji: "🇰🇬"
  },
  LA: {
    name: "Laos",
    code: "+856",
    isoAlpha2: "LA",
    emoji: "🇱🇦"
  },
  LV: {
    name: "Latvia",
    code: "+371",
    isoAlpha2: "LV",
    emoji: "🇱🇻"
  },
  LB: {
    name: "Lebanon",
    code: "+961",
    isoAlpha2: "LB",
    emoji: "🇱🇧"
  },
  LS: {
    name: "Lesotho",
    code: "+266",
    isoAlpha2: "LS",
    emoji: "🇱🇸"
  },
  LR: {
    name: "Liberia",
    code: "+231",
    isoAlpha2: "LR",
    emoji: "🇱🇷"
  },
  LY: {
    name: "Libya",
    code: "+218",
    isoAlpha2: "LY",
    emoji: "🇱🇾"
  },
  LI: {
    name: "Liechtenstein",
    code: "+423",
    isoAlpha2: "LI",
    emoji: "🇱🇮"
  },
  LT: {
    name: "Lithuania",
    code: "+370",
    isoAlpha2: "LT",
    emoji: "🇱🇹"
  },
  LU: {
    name: "Luxembourg",
    code: "+352",
    isoAlpha2: "LU",
    emoji: "🇱🇺"
  },
  MO: {
    name: "Macau",
    code: "+853",
    isoAlpha2: "MO",
    emoji: "🇲🇴"
  },
  MK: {
    name: "Macedonia",
    code: "+389",
    isoAlpha2: "MK",
    emoji: "🇲🇰"
  },
  MG: {
    name: "Madagascar",
    code: "+261",
    isoAlpha2: "MG",
    emoji: "🇲🇬"
  },
  MW: {
    name: "Malawi",
    code: "+265",
    isoAlpha2: "MW",
    emoji: "🇲🇼"
  },
  MY: {
    name: "Malaysia",
    code: "+60",
    isoAlpha2: "MY",
    emoji: "🇲🇾"
  },
  MV: {
    name: "Maldives",
    code: "+960",
    isoAlpha2: "MV",
    emoji: "🇲🇻"
  },
  ML: {
    name: "Mali",
    code: "+223",
    isoAlpha2: "ML",
    emoji: "🇲🇱"
  },
  MT: {
    name: "Malta",
    code: "+356",
    isoAlpha2: "MT",
    emoji: "🇲🇹"
  },
  MH: {
    name: "Marshall Islands",
    code: "+692",
    isoAlpha2: "MH",
    emoji: "🇲🇭"
  },
  MQ: {
    name: "Martinique",
    code: "+596",
    isoAlpha2: "MQ",
    emoji: "🇲🇶"
  },
  MR: {
    name: "Mauritania",
    code: "+222",
    isoAlpha2: "MR",
    emoji: "🇲🇷"
  },
  MU: {
    name: "Mauritius",
    code: "+230",
    isoAlpha2: "MU",
    emoji: "🇲🇺"
  },
  YT: {
    name: "Mayotte",
    code: "+262",
    isoAlpha2: "YT",
    emoji: "🇾🇹"
  },
  MX: {
    name: "Mexico",
    code: "+52",
    isoAlpha2: "MX",
    emoji: "🇲🇽"
  },
  FM: {
    name: "Micronesia",
    code: "+691",
    isoAlpha2: "FM",
    emoji: "🇫🇲"
  },
  MD: {
    name: "Moldova",
    code: "+373",
    isoAlpha2: "MD",
    emoji: "🇲🇩"
  },
  MC: {
    name: "Monaco",
    code: "+377",
    isoAlpha2: "MC",
    emoji: "🇲🇨"
  },
  MN: {
    name: "Mongolia",
    code: "+976",
    isoAlpha2: "MN",
    emoji: "🇲🇳"
  },
  ME: {
    name: "Montenegro",
    code: "+382",
    isoAlpha2: "ME",
    emoji: "🇲🇪"
  },
  MS: {
    name: "Montserrat",
    code: "+1664",
    isoAlpha2: "MS",
    emoji: "🇲🇸"
  },
  MA: {
    name: "Morocco",
    code: "+212",
    isoAlpha2: "MA",
    emoji: "🇲🇦"
  },
  MZ: {
    name: "Mozambique",
    code: "+258",
    isoAlpha2: "MZ",
    emoji: "🇲🇿"
  },
  MM: {
    name: "Myanmar",
    code: "+95",
    isoAlpha2: "MM",
    emoji: "🇲🇲"
  },
  NA: {
    name: "Namibia",
    code: "+264",
    isoAlpha2: "NA",
    emoji: "🇳🇦"
  },
  NR: {
    name: "Nauru",
    code: "+674",
    isoAlpha2: "NR",
    emoji: "🇳🇷"
  },
  NP: {
    name: "Nepal",
    code: "+977",
    isoAlpha2: "NP",
    emoji: "🇳🇵"
  },
  NL: {
    name: "Netherlands",
    code: "+31",
    isoAlpha2: "NL",
    emoji: "🇳🇱"
  },
  NC: {
    name: "New Caledonia",
    code: "+687",
    isoAlpha2: "NC",
    emoji: "🇳🇨"
  },
  NZ: {
    name: "New Zealand",
    code: "+64",
    isoAlpha2: "NZ",
    emoji: "🇳🇿"
  },
  NI: {
    name: "Nicaragua",
    code: "+505",
    isoAlpha2: "NI",
    emoji: "🇳🇮"
  },
  NE: {
    name: "Niger",
    code: "+227",
    isoAlpha2: "NE",
    emoji: "🇳🇪"
  },
  NG: {
    name: "Nigeria",
    code: "+234",
    isoAlpha2: "NG",
    emoji: "🇳🇬"
  },
  NU: {
    name: "Niue",
    code: "+683",
    isoAlpha2: "NU",
    emoji: "🇳🇺"
  },
  NF: {
    name: "Norfolk Island",
    code: "+672",
    isoAlpha2: "NF",
    emoji: "🇳🇫"
  },
  KP: {
    name: "North Korea",
    code: "+850",
    isoAlpha2: "KP",
    emoji: "🇰🇵"
  },
  MP: {
    name: "Northern Mariana Islands",
    code: "+1670",
    isoAlpha2: "MP",
    emoji: "🇲🇵"
  },
  NO: {
    name: "Norway",
    code: "+47",
    isoAlpha2: "NO",
    emoji: "🇳🇴"
  },
  OM: {
    name: "Oman",
    code: "+968",
    isoAlpha2: "OM",
    emoji: "🇴🇲"
  },
  PK: {
    name: "Pakistan",
    code: "+92",
    isoAlpha2: "PK",
    emoji: "🇵🇰"
  },
  PW: {
    name: "Palau",
    code: "+680",
    isoAlpha2: "PW",
    emoji: "🇵🇼"
  },
  PS: {
    name: "Palestine",
    code: "+970",
    isoAlpha2: "PS",
    emoji: "🇵🇸"
  },
  PA: {
    name: "Panama",
    code: "+507",
    isoAlpha2: "PA",
    emoji: "🇵🇦"
  },
  PG: {
    name: "Papua New Guinea",
    code: "+675",
    isoAlpha2: "PG",
    emoji: "🇵🇬"
  },
  PY: {
    name: "Paraguay",
    code: "+595",
    isoAlpha2: "PY",
    emoji: "🇵🇾"
  },
  PE: {
    name: "Peru",
    code: "+51",
    isoAlpha2: "PE",
    emoji: "🇵🇪"
  },
  PH: {
    name: "Philippines",
    code: "+63",
    isoAlpha2: "PH",
    emoji: "🇵🇭"
  },
  PL: {
    name: "Poland",
    code: "+48",
    isoAlpha2: "PL",
    emoji: "🇵🇱"
  },
  PT: {
    name: "Portugal",
    code: "+351",
    isoAlpha2: "PT",
    emoji: "🇵🇹"
  },
  PR: {
    name: "Puerto Rico",
    code: "+1939",
    isoAlpha2: "PR",
    emoji: "🇵🇷"
  },
  QA: {
    name: "Qatar",
    code: "+974",
    isoAlpha2: "QA",
    emoji: "🇶🇦"
  },
  CG: {
    name: "Republic of the Congo",
    code: "+242",
    isoAlpha2: "CG",
    emoji: "🇨🇬"
  },
  RO: {
    name: "Romania",
    code: "+40",
    isoAlpha2: "RO",
    emoji: "🇷🇴"
  },
  RU: {
    name: "Russia",
    code: "+7",
    isoAlpha2: "RU",
    emoji: "🇷🇺"
  },
  RW: {
    name: "Rwanda",
    code: "+250",
    isoAlpha2: "RW",
    emoji: "🇷🇼"
  },
  RE: {
    name: "Réunion",
    code: "+262",
    isoAlpha2: "RE",
    emoji: "🇷🇪"
  },
  BL: {
    name: "Saint Barthélemy",
    code: "+590",
    isoAlpha2: "BL",
    emoji: "🇧🇱"
  },
  SH: {
    name: "Saint Helena, Ascension and Tristan da Cunha",
    code: "+247",
    isoAlpha2: "SH",
    emoji: "🇸🇭"
  },
  KN: {
    name: "Saint Kitts and Nevis",
    code: "+1869",
    isoAlpha2: "KN",
    emoji: "🇰🇳"
  },
  LC: {
    name: "Saint Lucia",
    code: "+1758",
    isoAlpha2: "LC",
    emoji: "🇱🇨"
  },
  MF: {
    name: "Saint Martin",
    code: "+590",
    isoAlpha2: "MF",
    emoji: "🇲🇫"
  },
  PM: {
    name: "Saint Pierre and Miquelon",
    code: "+508",
    isoAlpha2: "PM",
    emoji: "🇵🇲"
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    code: "+1784",
    isoAlpha2: "VC",
    emoji: "🇻🇨"
  },
  WS: {
    name: "Samoa",
    code: "+685",
    isoAlpha2: "WS",
    emoji: "🇼🇸"
  },
  SM: {
    name: "San Marino",
    code: "+378",
    isoAlpha2: "SM",
    emoji: "🇸🇲"
  },
  SA: {
    name: "Saudi Arabia",
    code: "+966",
    isoAlpha2: "SA",
    emoji: "🇸🇦"
  },
  SN: {
    name: "Senegal",
    code: "+221",
    isoAlpha2: "SN",
    emoji: "🇸🇳"
  },
  RS: {
    name: "Serbia",
    code: "+381",
    isoAlpha2: "RS",
    emoji: "🇷🇸"
  },
  SC: {
    name: "Seychelles",
    code: "+248",
    isoAlpha2: "SC",
    emoji: "🇸🇨"
  },
  SL: {
    name: "Sierra Leone",
    code: "+232",
    isoAlpha2: "SL",
    emoji: "🇸🇱"
  },
  SG: {
    name: "Singapore",
    code: "+65",
    isoAlpha2: "SG",
    emoji: "🇸🇬"
  },
  SX: {
    name: "Sint Maarten",
    code: "+1721",
    isoAlpha2: "SX",
    emoji: "🇸🇽"
  },
  SK: {
    name: "Slovakia",
    code: "+421",
    isoAlpha2: "SK",
    emoji: "🇸🇰"
  },
  SI: {
    name: "Slovenia",
    code: "+386",
    isoAlpha2: "SI",
    emoji: "🇸🇮"
  },
  SB: {
    name: "Solomon Islands",
    code: "+677",
    isoAlpha2: "SB",
    emoji: "🇸🇧"
  },
  SO: {
    name: "Somalia",
    code: "+252",
    isoAlpha2: "SO",
    emoji: "🇸🇴"
  },
  ZA: {
    name: "South Africa",
    code: "+27",
    isoAlpha2: "ZA",
    emoji: "🇿🇦"
  },
  KR: {
    name: "South Korea",
    code: "+82",
    isoAlpha2: "KR",
    emoji: "🇰🇷"
  },
  SS: {
    name: "South Sudan",
    code: "+211",
    isoAlpha2: "SS",
    emoji: "🇸🇸"
  },
  ES: {
    name: "Spain",
    code: "+34",
    isoAlpha2: "ES",
    emoji: "🇪🇸"
  },
  LK: {
    name: "Sri Lanka",
    code: "+94",
    isoAlpha2: "LK",
    emoji: "🇱🇰"
  },
  SD: {
    name: "Sudan",
    code: "+249",
    isoAlpha2: "SD",
    emoji: "🇸🇩"
  },
  SR: {
    name: "Suriname",
    code: "+597",
    isoAlpha2: "SR",
    emoji: "🇸🇷"
  },
  SJ: {
    name: "Svalbard and Jan Mayen",
    code: "+4779",
    isoAlpha2: "SJ",
    emoji: "🇸🇯"
  },
  SE: {
    name: "Sweden",
    code: "+46",
    isoAlpha2: "SE",
    emoji: "🇸🇪"
  },
  CH: {
    name: "Switzerland",
    code: "+41",
    isoAlpha2: "CH",
    emoji: "🇨🇭"
  },
  SY: {
    name: "Syria",
    code: "+963",
    isoAlpha2: "SY",
    emoji: "🇸🇾"
  },
  ST: {
    name: "São Tomé and Príncipe",
    code: "+239",
    isoAlpha2: "ST",
    emoji: "🇸🇹"
  },
  TW: {
    name: "Taiwan",
    code: "+886",
    isoAlpha2: "TW",
    emoji: "🇹🇼"
  },
  TJ: {
    name: "Tajikistan",
    code: "+992",
    isoAlpha2: "TJ",
    emoji: "🇹🇯"
  },
  TZ: {
    name: "Tanzania",
    code: "+255",
    isoAlpha2: "TZ",
    emoji: "🇹🇿"
  },
  TH: {
    name: "Thailand",
    code: "+66",
    isoAlpha2: "TH",
    emoji: "🇹🇭"
  },
  TL: {
    name: "Timor-Leste",
    code: "+670",
    isoAlpha2: "TL",
    emoji: "🇹🇱"
  },
  TG: {
    name: "Togo",
    code: "+228",
    isoAlpha2: "TG",
    emoji: "🇹🇬"
  },
  TK: {
    name: "Tokelau",
    code: "+690",
    isoAlpha2: "TK",
    emoji: "🇹🇰"
  },
  TO: {
    name: "Tonga",
    code: "+676",
    isoAlpha2: "TO",
    emoji: "🇹🇴"
  },
  TT: {
    name: "Trinidad and Tobago",
    code: "+1868",
    isoAlpha2: "TT",
    emoji: "🇹🇹"
  },
  TN: {
    name: "Tunisia",
    code: "+216",
    isoAlpha2: "TN",
    emoji: "🇹🇳"
  },
  TR: {
    name: "Turkey",
    code: "+90",
    isoAlpha2: "TR",
    emoji: "🇹🇷"
  },
  TM: {
    name: "Turkmenistan",
    code: "+993",
    isoAlpha2: "TM",
    emoji: "🇹🇲"
  },
  TC: {
    name: "Turks and Caicos Islands",
    code: "+1649",
    isoAlpha2: "TC",
    emoji: "🇹🇨"
  },
  TV: {
    name: "Tuvalu",
    code: "+688",
    isoAlpha2: "TV",
    emoji: "🇹🇻"
  },
  UG: {
    name: "Uganda",
    code: "+256",
    isoAlpha2: "UG",
    emoji: "🇺🇬"
  },
  UA: {
    name: "Ukraine",
    code: "+380",
    isoAlpha2: "UA",
    emoji: "🇺🇦"
  },
  AE: {
    name: "United Arab Emirates",
    code: "+971",
    isoAlpha2: "AE",
    emoji: "🇦🇪"
  },
  GB: {
    name: "United Kingdom",
    code: "+44",
    isoAlpha2: "GB",
    emoji: "🇬🇧"
  },
  US: {
    name: "United States",
    code: "+1",
    isoAlpha2: "US",
    emoji: "🇺🇸"
  },
  VI: {
    name: "United States Virgin Islands",
    code: "+1340",
    isoAlpha2: "VI",
    emoji: "🇻🇮"
  },
  UY: {
    name: "Uruguay",
    code: "+598",
    isoAlpha2: "UY",
    emoji: "🇺🇾"
  },
  UZ: {
    name: "Uzbekistan",
    code: "+998",
    isoAlpha2: "UZ",
    emoji: "🇺🇿"
  },
  VU: {
    name: "Vanuatu",
    code: "+678",
    isoAlpha2: "VU",
    emoji: "🇻🇺"
  },
  VA: {
    name: "Vatican City",
    code: "+379",
    isoAlpha2: "VA",
    emoji: "🇻🇦"
  },
  VE: {
    name: "Venezuela",
    code: "+58",
    isoAlpha2: "VE",
    emoji: "🇻🇪"
  },
  VN: {
    name: "Vietnam",
    code: "+84",
    isoAlpha2: "VN",
    emoji: "🇻🇳"
  },
  WF: {
    name: "Wallis and Futuna",
    code: "+681",
    isoAlpha2: "WF",
    emoji: "🇼🇫"
  },
  EH: {
    name: "Western Sahara",
    code: "+212",
    isoAlpha2: "EH",
    emoji: "🇪🇭"
  },
  YE: {
    name: "Yemen",
    code: "+967",
    isoAlpha2: "YE",
    emoji: "🇾🇪"
  },
  ZM: {
    name: "Zambia",
    code: "+260",
    isoAlpha2: "ZM",
    emoji: "🇿🇲"
  },
  ZW: {
    name: "Zimbabwe",
    code: "+263",
    isoAlpha2: "ZW",
    emoji: "🇿🇼"
  },
  AX: {
    name: "Åland Islands",
    code: "+358",
    isoAlpha2: "AX",
    emoji: "🇦🇽"
  }
}, k2 = "data:image/png;base64,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", V = document.getElementById(
  "partoo-messaging-widget"
);
function k(A) {
  return (V == null ? void 0 : V.getAttribute(`data-${A}`)) || (V == null ? void 0 : V.getAttribute(A));
}
const g1 = () => ({
  isPreview: k("is-preview"),
  country: k("country"),
  token: k("token"),
  policyUrl: k("policy-url"),
  avatarImageUrl: k("avatar-image-url"),
  color: k("color"),
  icon: k("icon"),
  mobileMarginBottom: k("mobile-margin-bottom"),
  mobileMarginRight: k("mobile-margin-right"),
  desktopMarginBottom: k("desktop-margin-bottom"),
  desktopMarginRight: k("desktop-margin-right")
}), TA = document.getElementById(
  "partoo-messaging-widget"
), K2 = u1(), c1 = (A) => Y2(A) ? `https://${K2}.partoo.co/v2/widgets/${A}/params` : null, l1 = (A) => Y2(A) ? `https://${K2}.partoo.co/v2/widget_messages/${A}` : null;
function u1() {
  return {
    prod: "api",
    preprod: "api.preprod",
    staging: "api.staging",
    dev: "api.dev"
  }[O2()];
}
const h1 = () => O2() in ["preprod", "prod"];
function O2() {
  const A = TA == null ? void 0 : TA.getAttribute("src"), e = ["staging", "preprod", "prod"];
  for (const t of e)
    if (A.includes("/" + t + "/"))
      return t;
  return "dev";
}
function Y2(A) {
  const e = A ? /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
    A
  ) : null;
  return e === null && console.error("Invalid token, verify it's format", A), e;
}
const C1 = 60 * 60, m1 = 6 * C1, w1 = (A) => {
  h1() && (A.params_expiration_date = new Date(
    (/* @__PURE__ */ new Date()).getTime() + m1
  ), localStorage.setItem("partoo-widget-params", JSON.stringify(A)));
}, I1 = () => {
  const A = localStorage.getItem("partoo-widget-params");
  if (A !== null) {
    const e = JSON.parse(A);
    return B1(e) ? null : e;
  }
  return null;
};
function B1(A) {
  return new Date(A.params_expiration_date) < /* @__PURE__ */ new Date();
}
const E1 = () => {
  const A = g1();
  return {
    isPreview: !!A.isPreview,
    country: A.country in F2 ? A.country : "FR",
    token: A.token,
    policyUrl: A.policyUrl,
    avatarImageUrl: A.avatarImageUrl || k2,
    color: A.color || "#0085f2",
    icon: A.icon || "message_logo_icon",
    mobileMarginBottom: A.mobileMarginBottom || "25px",
    mobileMarginRight: A.mobileMarginRight || "25px",
    desktopMarginBottom: A.desktopMarginBottom || "0px",
    desktopMarginRight: A.desktopMarginRight || "0px"
  };
}, v2 = (A) => ({
  isExpired: A.is_expired,
  hasSmsActive: A.has_sms_active,
  hasMessengerActive: A.has_messenger_active,
  hasWhatsappActive: A.has_whatsapp_active,
  facebookPageName: A.facebook_page_name,
  whatsappPhoneNumber: A.whatsapp_phone_number
}), p1 = (A) => {
  if (A)
    return {
      isExpired: !1,
      hasSmsActive: !0,
      hasMessengerActive: !0,
      hasWhatsappActive: !0,
      facebookPageName: "facebook",
      whatsappPhoneNumber: "whatsapp"
    };
  const e = I1();
  return e ? v2(e) : null;
}, I0 = "data:image/svg+xml,%3csvg%20width='15'%20height='15'%20viewBox='0%200%2015%2015'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.21527%207.15126L1.31163%2012.2291C0.860246%2012.6966%200.873247%2013.4414%201.34067%2013.8927C1.80809%2014.3441%202.55287%2014.3311%203.00425%2013.8637L7.90796%208.78574L12.9859%2013.6895C13.4533%2014.1409%2014.1981%2014.1279%2014.6495%2013.6605C15.1008%2013.1931%2015.0878%2012.4482%2014.6204%2011.9969L9.54251%207.09325L14.4462%202.01531C14.8975%201.54789%2014.8845%200.803045%2014.4172%200.351723C13.9498%20-0.0996638%2013.205%20-0.0866637%2012.7536%200.380761L7.84989%205.4587L2.77195%200.554991C2.30459%200.103603%201.55975%200.116604%201.10837%200.584029C0.65698%201.05145%200.66998%201.79623%201.1374%202.24762L6.21527%207.15126Z'%20fill='white'/%3e%3c/svg%3e", H2 = "data:image/svg+xml,%3csvg%20width='35'%20height='36'%20viewBox='0%200%2035%2036'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20opacity='0.5'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M33.6169%2033.8947C33.6926%2034.0216%2033.7325%2034.1666%2033.7325%2034.3138C33.7325%2034.7672%2033.3636%2035.1357%2032.9096%2035.1357H22.2499C16.333%2035.1431%2011.2039%2031.0451%209.91211%2025.277L11.5896%2025.2776H11.7869C18.6057%2025.3344%2024.2234%2019.9434%2024.4369%2013.1355V12.4202C24.4511%2011.3891%2024.2727%2010.7197%2024.2727%2010.7197C25.7529%2010.9984%2027.1703%2011.5457%2028.4533%2012.3345C34.2567%2015.8994%2036.0673%2023.4895%2032.4975%2029.2866C31.9935%2030.12%2031.9935%2031.1638%2032.4975%2031.9972L33.6169%2033.8947Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M24.6962%2012.6718V13.3856C24.4832%2020.1799%2018.8788%2025.5599%2012.0761%2025.5033H11.8793L10.2058%2025.5027H1.47543C1.32715%2025.5027%201.18291%2025.4629%201.05687%2025.3882C0.666624%2025.1579%200.537889%2024.6541%200.769746%2024.2649L1.91016%2022.3631C2.41296%2021.5308%202.41296%2020.4896%201.91016%2019.6573C0.870172%2017.9858%200.247394%2016.0894%200.0943959%2014.1271C-0.436718%207.35637%204.62639%201.43758%2011.4035%200.90692C14.8874%200.613304%2018.3295%201.82817%2020.8564%204.24377C22.7678%206.03847%2024.0565%208.3975%2024.5324%2010.9747L24.6962%2012.6718Z'%20fill='white'/%3e%3c/svg%3e", f1 = "data:image/svg+xml,%3csvg%20width='25'%20height='28'%20viewBox='0%200%2025%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M23.7077%2015.1723C23.7009%2015.2105%2023.6924%2015.2479%2023.6806%2015.2851C23.5525%2015.8176%2023.3728%2016.3756%2023.1565%2016.9116L20.1014%2024.1683L18.9278%2026.9555C18.8337%2027.1794%2018.6421%2027.3472%2018.408%2027.4117C18.3385%2027.4311%2018.2681%2027.4397%2018.1977%2027.4397C18.0298%2027.4397%2017.8645%2027.3871%2017.7271%2027.2854L13.6129%2024.2522C9.96754%2024.7118%206.27642%2023.4602%203.67745%2020.8647C-0.969307%2016.2264%20-0.969307%208.67798%203.67745%204.03877C8.32421%20-0.599512%2015.8854%20-0.599512%2020.5321%204.03877C23.4703%206.97267%2024.6549%2011.1302%2023.7077%2015.1723ZM7.60993%208.73722C7.26066%208.73722%206.97753%209.00831%206.97753%209.34613C6.97753%209.68396%207.26066%209.95505%207.60993%209.95505H17.1319C17.4813%209.95505%2017.7644%209.68396%2017.7644%209.34613C17.7644%209.00831%2017.4813%208.73722%2017.1319%208.73722H7.60993ZM17.7641%2012.9997C17.7641%2012.6619%2017.4811%2012.3908%2017.1317%2012.3908H7.60976C7.26041%2012.3908%206.97736%2012.6619%206.97736%2012.9997C6.97736%2013.3375%207.26041%2013.6086%207.60976%2013.6086H17.1317C17.4811%2013.6086%2017.7641%2013.3375%2017.7641%2012.9997ZM7.6091%2015.9574C7.26025%2015.9574%206.97763%2016.2284%206.97763%2016.5663C6.97763%2016.9041%207.26025%2017.1752%207.6091%2017.1752H13.0445C13.3932%2017.1752%2013.6758%2016.9041%2013.6758%2016.5663C13.6758%2016.2284%2013.3932%2015.9574%2013.0445%2015.9574H7.6091Z'%20fill='white'/%3e%3c/svg%3e", M1 = "data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.9999%200.60241C7.2182%200.448975%200.778995%206.6199%200.601318%2014.401C0.621623%2018.362%202.3755%2022.1154%205.40083%2024.672V28.7996C5.40083%2029.131%205.66945%2029.3996%206.00079%2029.3996C6.11322%2029.3996%206.22341%2029.368%206.31874%2029.3084L9.66282%2027.2194C11.3666%2027.8711%2013.1758%2028.2034%2014.9999%2028.1997C22.7816%2028.3532%2029.2208%2022.1822%2029.3985%2014.4011C29.2208%206.6199%2022.7816%200.448975%2014.9999%200.60241ZM16.1876%2021.4876C16.1876%2021.7602%2016.1195%2022.0133%2015.9832%2022.2664C15.8372%2022.5097%2015.6425%2022.7044%2015.3894%2022.8407C15.1558%2022.977%2014.893%2023.0451%2014.6301%2023.0451C14.3673%2023.0451%2014.0947%2022.977%2013.8514%2022.8407C13.608%2022.7044%2013.4133%2022.5097%2013.277%2022.2664C13.1407%2022.0133%2013.0629%2021.7602%2013.0629%2021.4876C13.0629%2021.215%2013.1407%2020.9619%2013.277%2020.7088C13.4133%2020.4557%2013.608%2020.2611%2013.8708%2020.1345C14.3478%2019.8619%2014.9027%2019.8619%2015.3797%2020.1345C15.6328%2020.2708%2015.8275%2020.4655%2015.9735%2020.7186C16.1098%2020.9522%2016.1876%2021.2248%2016.1876%2021.4876ZM19.692%2013.6903C20.2274%2012.892%2020.5%2012.0062%2020.5%2011.0522C20.5%209.66018%2019.9549%208.46283%2018.8743%207.47965C17.8035%206.49646%2016.5088%206%2015%206C13.4912%206%2012.1867%206.50619%2011.1159%207.47965C10.0451%208.46283%209.5%209.66018%209.5%2011.0522C9.5%2011.3832%209.62655%2011.6752%209.87965%2011.9186C10.3761%2012.3372%2011.1451%2012.3566%2011.6708%2011.9088C11.9142%2011.6752%2012.0407%2011.3832%2012.0407%2011.0522C12.0407%2010.3124%2012.323%209.69911%2012.9071%209.17345C13.4814%208.63805%2014.1726%208.37522%2015%208.37522C15.8274%208.37522%2016.5186%208.63805%2017.0929%209.17345C17.677%209.69911%2017.9593%2010.3124%2017.9593%2011.0522C17.9593%2012.1425%2017.4434%2012.931%2016.3726%2013.4469C15.4381%2013.8655%2014.6982%2014.4885%2014.1531%2015.2965C13.608%2016.1044%2013.3257%2017%2013.3257%2017.9637V18.0708C13.3257%2018.4018%2013.4619%2018.6841%2013.7053%2018.8982C13.9584%2019.1319%2014.2602%2019.2487%2014.6009%2019.2487C14.9416%2019.2487%2015.2434%2019.1319%2015.4867%2018.908C15.7398%2018.6841%2015.8664%2018.4018%2015.8664%2018.0708V17.9637C15.8664%2017.4575%2016.0124%2016.9805%2016.3142%2016.5522C16.5965%2016.1239%2016.9956%2015.7929%2017.5018%2015.569L17.6478%2015.4911C18.5044%2015.0628%2019.1858%2014.4496%2019.692%2013.6903Z'%20fill='white'/%3e%3c/svg%3e", y1 = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='28px'%20height='28px'%20viewBox='0%200%2028%2028'%20version='1.1'%3e%3cg%20id='surface1'%3e%3cpath%20style='%20stroke:none;fill-rule:evenodd;fill:rgb(100%25,100%25,100%25);fill-opacity:1;'%20d='M%2023.917969%204.078125%20C%2021.320312%201.480469%2017.78125%200.015625%2014.09375%200.015625%20L%2014.050781%200.015625%20C%206.367188%200.015625%200.117188%206.230469%200.117188%2013.875%20C%200.117188%2016.304688%200.761719%2018.695312%201.984375%2020.800781%20L%200%2027.984375%20L%207.390625%2026.058594%20C%209.4375%2027.164062%2011.722656%2027.746094%2014.050781%2027.746094%20L%2014.054688%2027.746094%20C%2021.753906%2027.746094%2028%2021.539062%2028%2013.882812%20C%2028%2010.207031%2026.527344%206.679688%2023.914062%204.082031%20Z%20M%2014.058594%2025.414062%20C%2011.980469%2025.414062%209.9375%2024.851562%208.15625%2023.800781%20L%207.730469%2023.550781%20L%203.34375%2024.691406%20L%204.511719%2020.441406%20L%204.234375%2020.003906%20C%203.074219%2018.167969%202.453125%2016.035156%202.453125%2013.863281%20C%202.453125%207.5%207.644531%202.335938%2014.046875%202.335938%20C%2017.128906%202.335938%2020.085938%203.558594%2022.257812%205.726562%20C%2024.433594%207.890625%2025.65625%2010.824219%2025.65625%2013.882812%20C%2025.65625%2020.25%2020.460938%2025.414062%2014.058594%2025.414062%20Z%20M%2020.417969%2016.777344%20C%2020.066406%2016.601562%2018.355469%2015.765625%2018.039062%2015.652344%20C%2017.722656%2015.535156%2017.484375%2015.476562%2017.25%2015.824219%20C%2017.011719%2016.175781%2016.347656%2016.953125%2016.148438%2017.1875%20C%2015.945312%2017.417969%2015.738281%2017.449219%2015.394531%2017.273438%20C%2015.046875%2017.097656%2013.921875%2016.730469%2012.59375%2015.550781%20C%2011.832031%2014.851562%2011.175781%2014.042969%2010.644531%2013.152344%20C%2010.441406%2012.804688%2010.625%2012.617188%2010.800781%2012.449219%20C%2010.976562%2012.28125%2011.152344%2012.046875%2011.324219%2011.84375%20C%2011.46875%2011.667969%2011.585938%2011.472656%2011.671875%2011.261719%20C%2011.765625%2011.070312%2011.753906%2010.84375%2011.644531%2010.65625%20C%2011.550781%2010.484375%2010.847656%208.777344%2010.570312%208.082031%20C%2010.289062%207.390625%2010%207.503906%209.785156%207.488281%20C%209.570312%207.472656%209.347656%207.476562%209.117188%207.476562%20C%208.761719%207.484375%208.425781%207.640625%208.1875%207.910156%20C%207.871094%208.253906%206.96875%209.09375%206.96875%2010.796875%20C%206.96875%2012.503906%208.21875%2014.148438%208.390625%2014.382812%20C%208.566406%2014.617188%2010.847656%2018.117188%2014.347656%2019.613281%20C%2015.179688%2019.96875%2015.828125%2020.183594%2016.332031%2020.347656%20C%2016.78125%2020.484375%2017.25%2020.550781%2017.722656%2020.550781%20C%2017.988281%2020.550781%2018.261719%2020.527344%2018.523438%2020.484375%20C%2019.195312%2020.382812%2020.585938%2019.648438%2020.878906%2018.835938%20C%2021.171875%2018.027344%2021.171875%2017.332031%2021.085938%2017.191406%20C%2020.996094%2017.054688%2020.769531%2016.953125%2020.417969%2016.773438%20Z%20M%2020.417969%2016.777344%20'/%3e%3c/g%3e%3c/svg%3e", S1 = () => ({
  width: (window == null ? void 0 : window.innerWidth) || void 0,
  height: (window == null ? void 0 : window.innerHeight) || void 0
}), k0 = 576, Q1 = 1024, b1 = [
  "mobile",
  "tablet",
  "desktop"
  /* Desktop */
], mA = [
  "mobile"
  /* Mobile */
], wA = (A = b1) => {
  const { width: e } = S1(), t = () => [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ].some((r) => r.test(navigator.userAgent) && r.exec(navigator.userAgent)), o = () => e && k0 <= e && e <= Q1 && t() ? "tablet" : e && k0 > e && t() ? "mobile" : "desktop", n = A.includes(o());
  return { device: o(), isBelowProvidedDevices: n };
}, x1 = {
  message_bubble_icon: f1,
  message_question_mark_icon: M1,
  message_logo_icon: H2,
  message_whatsapp_icon: y1
}, G1 = ({
  showModal: A,
  hasOpenedPopup: e,
  setShowModal: t,
  handleClick: o,
  icon: n
}) => {
  const { isBelowProvidedDevices: i } = wA(mA), r = !i && e;
  return /* @__PURE__ */ M("div", { id: "launcher-button-container", children: [
    /* @__PURE__ */ c(
      L1,
      {
        showModal: A,
        isAnimationAllowed: r,
        setShowModal: t
      }
    ),
    /* @__PURE__ */ c(
      D1,
      {
        showModal: A,
        isAnimationAllowed: r,
        handleClick: o,
        icon: n
      }
    )
  ] });
}, L1 = ({
  showModal: A,
  isAnimationAllowed: e,
  setShowModal: t
}) => {
  const o = () => `icon-image icon-close ${e ? "" : "hidden disable-animation"} ${A ? "icon-show-animation" : "icon-close-rotate-animation"}`, n = () => t(!1);
  return /* @__PURE__ */ c(
    "img",
    {
      className: o(),
      src: I0,
      onclick: n,
      onkeydown: null,
      alt: ""
    }
  );
}, D1 = ({
  showModal: A,
  isAnimationAllowed: e,
  handleClick: t,
  icon: o
}) => {
  const n = x1[o] ?? H2;
  return /* @__PURE__ */ c(
    "img",
    {
      className: `icon-image icon-open ${e ? "" : "visible disable-animation"} ${A ? "icon-open-rotate-animation" : "icon-show-animation"}
        `,
      src: n,
      onclick: t,
      onkeydown: null,
      alt: ""
    }
  );
}, R1 = {
  en: {
    sms_web_widget_title: "We’ll text you",
    sms_web_widget_description: "Enter your information and we’ll text you back.",
    sms_web_widget_name_input: "Name",
    sms_web_widget_phone_input: "Phone number",
    sms_web_widget_message_input: "How can we help you?",
    sms_web_widget_opt_in_privacy_message: "Check this box to agree to receive text messages. More information on our",
    sms_web_widget_opt_in_privacy: "privacy policy",
    sms_web_widget_button_send_message: "Send message",
    sms_web_widget_error_invalid_number: "Invalid number",
    sms_web_widget_sent_message_confirmation_title: "We got your message",
    sms_web_widget_sent_message_confirmation_description: "Our team will be texting you shortly",
    sms_web_widget_error_service_not_available: "Sorry, this service is not available",
    sms_web_widget_error_hey: "Hey 👋",
    sms_web_widget_error_hey_unauthorized: "Oops! 🫣",
    sms_web_widget_error_something_went_wrong: "Hey ${consumer_name} 👋",
    sms_web_widget_error_banner: "Something went wrong!",
    sms_web_widget_error_something_went_wrong_tip: "Can you please check your internet connection and try again?",
    sms_web_widget_error_try_again: "Try again",
    sms_web_widget_popup_greetings: "Hi there, have a question?",
    sms_web_widget_popup_message_invitation: "Send us a message here.",
    channel_name_sms: "Text",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "Question?",
    partoo_chat_menu_channels_selection_menu_description: "Choose a channel to chat",
    partoo_chat_desktop_whatsapp_qr_code: "Scan the QR code to send your message from your mobile on WhatsApp.",
    partoo_chat_desktop_whatsapp_continue_on_web: "WhatsApp Web",
    partoo_chat_desktop_messenger_qr_code: "Scan the QR code to send your message from your mobile on Messenger.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "OR",
    partoo_chat_error_no_channels_available: "It seems there are no available communication channels at the moment. Please check back later.",
    partoo_chat_error_no_channels_available_unauthorized: "This widget is not authorized to be installed on this site. Return to your configuration page to add this website and try again."
  },
  fr: {
    sms_web_widget_title: "Une question ?",
    sms_web_widget_description: "Nous reviendrons vers vous par SMS.",
    sms_web_widget_name_input: "Nom",
    sms_web_widget_phone_input: "Numéro de téléphone",
    sms_web_widget_message_input: "Quelle est votre demande ?",
    sms_web_widget_opt_in_privacy_message: "Cocher cette case pour accepter de recevoir des SMS. Plus d’informations sur notre",
    sms_web_widget_opt_in_privacy: "politique de confidentialité",
    sms_web_widget_button_send_message: "Envoyer",
    sms_web_widget_error_invalid_number: "Numéro invalide",
    sms_web_widget_sent_message_confirmation_title: "Merci ! Nous avons bien reçu votre message",
    sms_web_widget_sent_message_confirmation_description: "Nos équipes vous répondront par SMS dans les plus brefs délais",
    sms_web_widget_error_service_not_available: "Désolé, ce service est actuellement indisponible",
    sms_web_widget_error_hey: "Bonjour 👋",
    sms_web_widget_error_hey_unauthorized: "Oups! 🫣",
    sms_web_widget_error_something_went_wrong: "Bonjour ${consumer_name} 👋",
    sms_web_widget_error_banner: "Une erreur est survenue..",
    sms_web_widget_error_something_went_wrong_tip: "Pouvez-vous vérifier votre connexion puis réessayer ?",
    sms_web_widget_error_try_again: "Réessayer",
    sms_web_widget_popup_greetings: "Bonjour, une question?",
    sms_web_widget_popup_message_invitation: "Écrivez-nous ici.",
    channel_name_sms: "SMS",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "Une question ?",
    partoo_chat_menu_channels_selection_menu_description: "Choisir un canal pour discuter",
    partoo_chat_desktop_whatsapp_qr_code: "Scannez le QR code pour envoyer un message depuis votre mobile sur WhatsApp.",
    partoo_chat_desktop_whatsapp_continue_on_web: "WhatsApp Web",
    partoo_chat_desktop_messenger_qr_code: "Scannez le QR code pour envoyer un message depuis votre mobile sur Messenger.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "OU",
    partoo_chat_error_no_channels_available: "Il semble qu'aucun canal de communication ne soit actuellement disponible. Veuillez revenir ultérieurement.",
    partoo_chat_error_no_channels_available_unauthorized: "Ce widget n'est pas autorisé à être installé sur ce site. Retournez sur votre page de configuration pour ajouter ce site internet et réessayer."
  },
  it: {
    sms_web_widget_title: "Domanda?",
    sms_web_widget_description: "Ti contatteremo via SMS.",
    sms_web_widget_name_input: "Nome",
    sms_web_widget_phone_input: "Numero di telefono",
    sms_web_widget_message_input: "Come possiamo aiutarti?",
    sms_web_widget_opt_in_privacy_message: "Seleziona questa casella per accettare di ricevere degli SMS. Saperne di più riguardo la nostra",
    sms_web_widget_opt_in_privacy: "politica sulla privacy",
    sms_web_widget_button_send_message: "Invio",
    sms_web_widget_error_invalid_number: "Numero non valido",
    sms_web_widget_sent_message_confirmation_title: "Abbiamo ricevuto il tuo messaggio",
    sms_web_widget_sent_message_confirmation_description: "Il nostro team ti contatterà il prima possibile tramite SMS.",
    sms_web_widget_error_service_not_available: "Purtroppo questo servizio non è attualmente disponibile",
    sms_web_widget_error_hey: "Ciao 👋",
    sms_web_widget_error_hey_unauthorized: "Ops! 🫣",
    sms_web_widget_error_something_went_wrong: "Ciao $(consumer_name)! 👋",
    sms_web_widget_error_banner: "Si è verificato un errore.",
    sms_web_widget_error_something_went_wrong_tip: "Puoi controllare la tua connessione Internet e riprovare?",
    sms_web_widget_error_try_again: "Riprovare",
    sms_web_widget_popup_greetings: "Ciao, hai qualche domanda?",
    sms_web_widget_popup_message_invitation: "Invia un messaggio qui.",
    channel_name_sms: "SMS",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "Qualche domanda?",
    partoo_chat_menu_channels_selection_menu_description: "Scegli un canale per conversare.",
    partoo_chat_desktop_whatsapp_qr_code: "Scannerizza il QR code per mandare un messaggio dal tuo cellulare su WhatsApp.",
    partoo_chat_desktop_whatsapp_continue_on_web: "WhatsApp Web",
    partoo_chat_desktop_messenger_qr_code: "Scannerizza il QR code per mandare un messaggio dal tuo cellulare su Messenger.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "O",
    partoo_chat_error_no_channels_available: "Sembra che non ci siano canali di comunicazione disponibili al momento. Riprova più tardi.",
    partoo_chat_error_no_channels_available_unauthorized: "Questo widget non è autorizzato a essere installato su questo sito. Torna alla tua pagina di configurazione per aggiungere questo sito web e riprova."
  },
  de: {
    sms_web_widget_title: "Eine Frage?",
    sms_web_widget_description: "Geben Sie Ihre Daten ein und wir schicken Ihnen eine SMS.",
    sms_web_widget_name_input: "Name",
    sms_web_widget_phone_input: "Ihre Telefonnummer",
    sms_web_widget_message_input: "Wie können wir Ihnen helfen?",
    sms_web_widget_opt_in_privacy_message: "Bitte aktivieren Sie dieses Kästchen, um den Empfang einer SMS anzunehmen. Weitere Informationen finden Sie in unserer",
    sms_web_widget_opt_in_privacy: "Datenschutzbestimmungen",
    sms_web_widget_button_send_message: "Nachricht senden",
    sms_web_widget_error_invalid_number: "Ungültige Nummer",
    sms_web_widget_sent_message_confirmation_title: "Wir haben Ihre Nachricht erhalten",
    sms_web_widget_sent_message_confirmation_description: "Unser Team wird Ihnen in Kürze eine SMS schicken.",
    sms_web_widget_error_service_not_available: "Dieser Dienst ist leider nicht verfügbar",
    sms_web_widget_error_hey: "Hallo 👋",
    sms_web_widget_error_hey_unauthorized: "Ups! 🫣",
    sms_web_widget_error_something_went_wrong: "Hallo $(consumer_name)! 👋",
    sms_web_widget_error_banner: "Etwas ist schief gelaufen!",
    sms_web_widget_error_something_went_wrong_tip: "Kannst du bitte deine Internetverbindung überprüfen und es erneut versuchen?",
    sms_web_widget_error_try_again: "Erneut versuchen",
    sms_web_widget_popup_greetings: "Hallo, haben Sie eine Frage?",
    sms_web_widget_popup_message_invitation: "Senden Sie uns hier eine Nachricht.",
    channel_name_sms: "SMS",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "Eine Frage?",
    partoo_chat_menu_channels_selection_menu_description: "Wählen Sie einen Kommunikationskanal aus",
    partoo_chat_desktop_whatsapp_qr_code: "Scannen Sie den QR-Code, um eine Nachricht von Ihrem Mobilgerät über WhatsApp zu schicken.",
    partoo_chat_desktop_whatsapp_continue_on_web: "WhatsApp Web",
    partoo_chat_desktop_messenger_qr_code: "Scannen Sie den QR-Code, um eine Nachricht von Ihrem Mobilgerät über Messenger zu schicken.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "ODER",
    partoo_chat_error_no_channels_available: "Es scheint, dass derzeit kein Kommunikationskanal verfügbar ist. Bitte versuchen Sie es später erneut",
    partoo_chat_error_no_channels_available_unauthorized: "Dieses Widget ist nicht berechtigt, auf dieser Website installiert zu werden. Gehen Sie zurück zu Ihrer Konfigurationsseite, um diese Website hinzuzufügen, und versuchen Sie es erneut."
  },
  es: {
    sms_web_widget_title: "Te enviaremos un mensaje",
    sms_web_widget_description: "Introduce tus datos y te enviaremos un mensaje.",
    sms_web_widget_name_input: "Nombre",
    sms_web_widget_phone_input: "Número de teléfono",
    sms_web_widget_message_input: "Hola, ¿necesitas ayuda?",
    sms_web_widget_opt_in_privacy_message: "Marque esta casilla para aceptar recibir mensajes de texto. Más información sobre nuestra",
    sms_web_widget_opt_in_privacy: "política de privacidad",
    sms_web_widget_button_send_message: "Enviar mensaje",
    sms_web_widget_error_invalid_number: "Número de teléfono no válido",
    sms_web_widget_sent_message_confirmation_title: "Recibimos su mensaje",
    sms_web_widget_sent_message_confirmation_description: "Nuestro equipo le enviará un mensaje en breve",
    sms_web_widget_error_service_not_available: "Lo sentimos, este servicio no está disponible",
    sms_web_widget_error_hey: "Hola 👋",
    sms_web_widget_error_hey_unauthorized: "¡Uy! 🫣",
    sms_web_widget_error_something_went_wrong: "Hola ${consumer_name} 👋",
    sms_web_widget_error_banner: "¡Algo salió mal!",
    sms_web_widget_error_something_went_wrong_tip: "¿Puede comprobar su conexión a Internet e intentarlo de nuevo?",
    sms_web_widget_error_try_again: "Inténtalo de nuevo",
    sms_web_widget_popup_greetings: "¿Necesitas ayuda?",
    sms_web_widget_popup_message_invitation: "Mándanos un mensaje",
    channel_name_sms: "SMS",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "¿Alguna pregunta?",
    partoo_chat_menu_channels_selection_menu_description: "Elige un canal para hablar",
    partoo_chat_desktop_whatsapp_qr_code: "Escanea el código QR para enviar tu mensaje desde tu móvil en WhatsApp.",
    partoo_chat_desktop_whatsapp_continue_on_web: "WhatsApp Web",
    partoo_chat_desktop_messenger_qr_code: "Escanea el código QR para enviar tu mensaje desde tu móvil en Messenger.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "O",
    partoo_chat_error_no_channels_available: "Parece que no hay canales de comunicación disponibles en este momento. Vuelva a comprobarlo más tarde.",
    partoo_chat_error_no_channels_available_unauthorized: "Este widget no está autorizado para ser instalado en este sitio. Vuelva a su página de configuración para añadir este sitio web e inténtelo de nuevo."
  },
  lv: {
    sms_web_widget_title: "Mēs jums nosūtīsim ziņu",
    sms_web_widget_description: "Ievadiet savu informāciju, un mēs jums nosūtīsim ziņu.",
    sms_web_widget_name_input: "Vārds",
    sms_web_widget_phone_input: "Phone number",
    sms_web_widget_message_input: "Kā mēs varam palīdzēt?",
    sms_web_widget_opt_in_privacy_message: "Atzīmējiet lodziņu, lai piekristu saņemt īsziņas. Vairāk informācijas par mūsu privātuma politiku",
    sms_web_widget_opt_in_privacy: "privātuma politika",
    sms_web_widget_button_send_message: "Nosūtīt ziņu",
    sms_web_widget_error_invalid_number: "Nederīgs tālruņa numurs",
    sms_web_widget_sent_message_confirmation_title: "Mēs saņēmām jūsu ziņu",
    sms_web_widget_sent_message_confirmation_description: "Mūsu komanda drīz jums nosūtīs ziņu",
    sms_web_widget_error_service_not_available: "Atvainojiet, šis pakalpojums nav pieejams",
    sms_web_widget_error_hey: "Hei 👋",
    sms_web_widget_error_hey_unauthorized: "Ak! 🫣",
    sms_web_widget_error_something_went_wrong: "Hei ${consumer_name} 👋",
    sms_web_widget_error_banner: "Kaut kas nogāja greizi!",
    sms_web_widget_error_something_went_wrong_tip: "Vai varat, lūdzu, pārbaudīt interneta savienojumu un mēģināt vēlreiz?",
    sms_web_widget_error_try_again: "Mēģiniet vēlreiz",
    sms_web_widget_popup_greetings: "Sveiki, jums ir jautājums?",
    sms_web_widget_popup_message_invitation: "Nosūti savu ziņu šeit.",
    channel_name_sms: "Teksts",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "Jautājums?",
    partoo_chat_menu_channels_selection_menu_description: "Izvēlies saziņas kanālu",
    partoo_chat_desktop_whatsapp_qr_code: "Noskanē QR kodu, lai nosūtītu ziņu no mobilā tālruņa WhatsApp.",
    partoo_chat_desktop_whatsapp_continue_on_web: "Whatsapp web",
    partoo_chat_desktop_messenger_qr_code: "Noskanē QR kodu, lai nosūtītu ziņu no mobilā tālruņa Messenger.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "Vai",
    partoo_chat_error_no_channels_available: "Šķiet, ka šobrīd nav pieejami saziņas kanāli. Lūdzu, pārbaudiet vēlāk.",
    partoo_chat_error_no_channels_available_unauthorized: "Šo logrīku nav atļauts instalēt šajā vietnē. Atgriezieties savā konfigurācijas lapā, lai pievienotu šo vietni, un mēģiniet vēlreiz."
  },
  pt: {
    sms_web_widget_title: "Iremos enviar-lhe uma mensagem",
    sms_web_widget_description: "Introduza as suas informações e iremos enviar-lhe uma mensagem.",
    sms_web_widget_name_input: "Nome",
    sms_web_widget_phone_input: "Número de telefone",
    sms_web_widget_message_input: "Como podemos ajudar?",
    sms_web_widget_opt_in_privacy_message: "Selecione esta caixa para aceitar receber mensagens de texto. Mais informações sobre a nossa",
    sms_web_widget_opt_in_privacy: "política de privacidade",
    sms_web_widget_button_send_message: "Enviar mensagem",
    sms_web_widget_error_invalid_number: "Número de telefone inválido",
    sms_web_widget_sent_message_confirmation_title: "Recebemos a sua mensagem",
    sms_web_widget_sent_message_confirmation_description: "A nossa equipa irá enviar-lhe uma mensagem em breve",
    sms_web_widget_error_service_not_available: "Lamentamos mas este serviço não está disponível",
    sms_web_widget_error_hey: "Olá 👋",
    sms_web_widget_error_hey_unauthorized: "Ups! 🫣",
    sms_web_widget_error_something_went_wrong: "Olá ${consumer_name} 👋",
    sms_web_widget_error_banner: "Ocorreu um erro!",
    sms_web_widget_error_something_went_wrong_tip: "Pode, por favor, verificar a sua ligação à Internet e tentar novamente?",
    sms_web_widget_error_try_again: "Tentar novamente",
    sms_web_widget_popup_greetings: "Olá, tem alguma questão?",
    sms_web_widget_popup_message_invitation: "Envie-nos uma mensagem aqui.",
    channel_name_sms: "Texto",
    channel_name_whatsapp_desktop: "WhatsApp",
    channel_name_messenger_desktop: "Messenger",
    partoo_chat_header_title_menu_whatsapp_messenger: "Questão?",
    partoo_chat_menu_channels_selection_menu_description: "Escolha um canal para conversar",
    partoo_chat_desktop_whatsapp_qr_code: "Digitalize o QR code para enviar a sua mensagem a partir do seu telemóvel no WhatsApp.",
    partoo_chat_desktop_whatsapp_continue_on_web: "WhatsApp Web",
    partoo_chat_desktop_messenger_qr_code: "Digitalize o QR code para enviar a sua mensagem a partir do seu telemóvel no Messenger.",
    partoo_chat_desktop_messenger_continue_on_web: "Messenger Web",
    partoo_chat_divider_whatsapp_messenger: "OU",
    partoo_chat_error_no_channels_available: "De momento não existem canais de comunicação disponíveis. Por favor, volte a verificar mais tarde.",
    partoo_chat_error_no_channels_available_unauthorized: "Este widget não está autorizado a ser instalado neste website. Regresse à sua página de configuração para adicionar este website e tente novamente."
  }
};
function f(A) {
  const e = (navigator.language || navigator.userLanguage).substring(0, 2), t = ["en", "fr", "it", "de", "es", "lv", "pt"].includes(
    e
  ) ? e : "en";
  return R1[t][A];
}
const F1 = ({
  showPopup: A,
  setShowPopup: e,
  handleClick: t,
  avatarImageUrl: o
}) => {
  const [n, i] = x(!1);
  return A ? /* @__PURE__ */ M(
    "div",
    {
      id: "popup-container",
      style: n ? "display:block" : "display:none",
      children: [
        /* @__PURE__ */ c(k1, { setShowPopup: e }),
        /* @__PURE__ */ c(
          K1,
          {
            handleClick: t,
            setLoaded: i,
            avatarImageUrl: o
          }
        ),
        /* @__PURE__ */ c("div", { id: "popup-arrow", children: /* @__PURE__ */ c("div", { id: "popup-arrow-inner" }) })
      ]
    }
  ) : null;
}, k1 = ({ setShowPopup: A }) => /* @__PURE__ */ c(
  "div",
  {
    className: "popup-close-button",
    onclick: () => {
      A(!1);
    },
    children: /* @__PURE__ */ c("img", { className: "popup-close-icon", src: I0 })
  }
), K1 = ({
  setLoaded: A,
  handleClick: e,
  avatarImageUrl: t
}) => /* @__PURE__ */ M("div", { id: "popup", onclick: e, onkeydown: null, children: [
  /* @__PURE__ */ c(
    "img",
    {
      id: "popup-picture",
      src: t,
      onerror: (i) => {
        i.target.onerror = null, i.target.src = k2;
      },
      onload: () => {
        A(!0);
      }
    }
  ),
  /* @__PURE__ */ M("div", { id: "popup-messages", children: [
    /* @__PURE__ */ c("p", { children: f("sms_web_widget_popup_greetings") }),
    /* @__PURE__ */ c("p", { children: f("sms_web_widget_popup_message_invitation") })
  ] })
] }), O1 = (A, e, t) => {
  const o = c1(A);
  fetch(o, {}).then((n) => n.json()).then(e).catch(t);
}, Y1 = ({
  showModal: A,
  setShowModal: e,
  options: t,
  params: o,
  setParams: n,
  setWidgetAuthorized: i
}) => {
  const [r, d] = x(!0), [a, s] = x(!1), { isBelowProvidedDevices: g } = wA(mA), { token: h, avatarImageUrl: l, icon: u } = t, C = () => {
    d(!1), e(!0), s(!0), g && (document.body.style.overflow = "hidden");
  }, B = (E) => {
    w1(E), n(v2(E)), C();
  }, p = () => {
    i(!1), C();
  }, m = () => {
    if (o) {
      C();
      return;
    }
    O1(
      h,
      B,
      p
    );
  };
  return /* @__PURE__ */ M("div", { id: "launcher", children: [
    !g && /* @__PURE__ */ c(
      F1,
      {
        showPopup: r,
        setShowPopup: d,
        handleClick: m,
        avatarImageUrl: l
      }
    ),
    /* @__PURE__ */ c(
      G1,
      {
        showModal: A,
        hasOpenedPopup: a,
        setShowModal: e,
        handleClick: m,
        icon: u
      }
    )
  ] });
}, v1 = { version: 4, country_calling_codes: { 1: ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], 7: ["RU", "KZ"], 20: ["EG"], 27: ["ZA"], 30: ["GR"], 31: ["NL"], 32: ["BE"], 33: ["FR"], 34: ["ES"], 36: ["HU"], 39: ["IT", "VA"], 40: ["RO"], 41: ["CH"], 43: ["AT"], 44: ["GB", "GG", "IM", "JE"], 45: ["DK"], 46: ["SE"], 47: ["NO", "SJ"], 48: ["PL"], 49: ["DE"], 51: ["PE"], 52: ["MX"], 53: ["CU"], 54: ["AR"], 55: ["BR"], 56: ["CL"], 57: ["CO"], 58: ["VE"], 60: ["MY"], 61: ["AU", "CC", "CX"], 62: ["ID"], 63: ["PH"], 64: ["NZ"], 65: ["SG"], 66: ["TH"], 81: ["JP"], 82: ["KR"], 84: ["VN"], 86: ["CN"], 90: ["TR"], 91: ["IN"], 92: ["PK"], 93: ["AF"], 94: ["LK"], 95: ["MM"], 98: ["IR"], 211: ["SS"], 212: ["MA", "EH"], 213: ["DZ"], 216: ["TN"], 218: ["LY"], 220: ["GM"], 221: ["SN"], 222: ["MR"], 223: ["ML"], 224: ["GN"], 225: ["CI"], 226: ["BF"], 227: ["NE"], 228: ["TG"], 229: ["BJ"], 230: ["MU"], 231: ["LR"], 232: ["SL"], 233: ["GH"], 234: ["NG"], 235: ["TD"], 236: ["CF"], 237: ["CM"], 238: ["CV"], 239: ["ST"], 240: ["GQ"], 241: ["GA"], 242: ["CG"], 243: ["CD"], 244: ["AO"], 245: ["GW"], 246: ["IO"], 247: ["AC"], 248: ["SC"], 249: ["SD"], 250: ["RW"], 251: ["ET"], 252: ["SO"], 253: ["DJ"], 254: ["KE"], 255: ["TZ"], 256: ["UG"], 257: ["BI"], 258: ["MZ"], 260: ["ZM"], 261: ["MG"], 262: ["RE", "YT"], 263: ["ZW"], 264: ["NA"], 265: ["MW"], 266: ["LS"], 267: ["BW"], 268: ["SZ"], 269: ["KM"], 290: ["SH", "TA"], 291: ["ER"], 297: ["AW"], 298: ["FO"], 299: ["GL"], 350: ["GI"], 351: ["PT"], 352: ["LU"], 353: ["IE"], 354: ["IS"], 355: ["AL"], 356: ["MT"], 357: ["CY"], 358: ["FI", "AX"], 359: ["BG"], 370: ["LT"], 371: ["LV"], 372: ["EE"], 373: ["MD"], 374: ["AM"], 375: ["BY"], 376: ["AD"], 377: ["MC"], 378: ["SM"], 380: ["UA"], 381: ["RS"], 382: ["ME"], 383: ["XK"], 385: ["HR"], 386: ["SI"], 387: ["BA"], 389: ["MK"], 420: ["CZ"], 421: ["SK"], 423: ["LI"], 500: ["FK"], 501: ["BZ"], 502: ["GT"], 503: ["SV"], 504: ["HN"], 505: ["NI"], 506: ["CR"], 507: ["PA"], 508: ["PM"], 509: ["HT"], 590: ["GP", "BL", "MF"], 591: ["BO"], 592: ["GY"], 593: ["EC"], 594: ["GF"], 595: ["PY"], 596: ["MQ"], 597: ["SR"], 598: ["UY"], 599: ["CW", "BQ"], 670: ["TL"], 672: ["NF"], 673: ["BN"], 674: ["NR"], 675: ["PG"], 676: ["TO"], 677: ["SB"], 678: ["VU"], 679: ["FJ"], 680: ["PW"], 681: ["WF"], 682: ["CK"], 683: ["NU"], 685: ["WS"], 686: ["KI"], 687: ["NC"], 688: ["TV"], 689: ["PF"], 690: ["TK"], 691: ["FM"], 692: ["MH"], 850: ["KP"], 852: ["HK"], 853: ["MO"], 855: ["KH"], 856: ["LA"], 880: ["BD"], 886: ["TW"], 960: ["MV"], 961: ["LB"], 962: ["JO"], 963: ["SY"], 964: ["IQ"], 965: ["KW"], 966: ["SA"], 967: ["YE"], 968: ["OM"], 970: ["PS"], 971: ["AE"], 972: ["IL"], 973: ["BH"], 974: ["QA"], 975: ["BT"], 976: ["MN"], 977: ["NP"], 992: ["TJ"], 993: ["TM"], 994: ["AZ"], 995: ["GE"], 996: ["KG"], 998: ["UZ"] }, countries: { AC: ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6], 0, 0, 0, 0, 0, 0, 0, [0, ["4\\d{4}", [5]]]], AD: ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], 0, 0, 0, 0, 0, 0, [0, ["690\\d{6}|[356]\\d{5}", [6, 9]]]], AE: ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["5[024-68]\\d{7}", [9]]]], AF: ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7\\d{8}"]]], AG: ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([457]\\d{6})$|1", "268$1", 0, "268", [0, ["268(?:464|7(?:1[3-9]|[28]\\d|3[0246]|64|7[0-689]))\\d{4}"]]], AI: ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2457]\\d{6})$|1", "264$1", 0, "264", [0, ["264(?:235|4(?:69|76)|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}"]]], AL: ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:[78][2-9]|9\\d)\\d{6}", [9]]]], AM: ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:33|4[1349]|55|77|88|9[13-9])\\d{6}"]]], AO: ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]], 0, 0, 0, 0, 0, 0, [0, ["9[1-59]\\d{7}"]]], AR: ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1", 0, 0, [0, ["93(?:7(?:1[15]|81)[46]|8(?:(?:21|4[16]|69|9[12])[46]|88[013-9]))\\d{5}|9(?:2(?:657|9(?:54|66))|3(?:7(?:55|77)|865))[2-8]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:284|3(?:02|23)|920)|3(?:4(?:46|8[27]|92)|541|878))[2-7]\\d{5}|9(?:2(?:(?:26|62)2|320|477|9(?:42|83))|3(?:329|4(?:62|76|89)|564))[2-6]\\d{5}|(?:675\\d|9(?:11[1-8]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[235][4-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|[17][2-6]|3[4-6]|[58][3-6]))))\\d{6}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}"]]], AS: ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "([267]\\d{6})$|1", "684$1", 0, "684", [0, ["684(?:2(?:48|5[2468]|7[26])|7(?:3[13]|70|82))\\d{4}"]]], AT: ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", [7, 8, 9, 10, 11, 12, 13]]]], AU: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "(183[12])|0", 0, 0, 0, [0, ["4(?:(?:79|94)[01]|83[0-389])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[0-36-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]]], "0011"], AW: ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}"]]], AX: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", [0, ["4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}", [6, 7, 8, 9, 10]]], "00"], AZ: ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["36554\\d{4}|(?:[16]0|4[04]|5[015]|7[07]|99)\\d{7}"]]], BA: ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6040\\d{5}|6(?:03|[1-356]|44|7\\d)\\d{6}"]]], BB: ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "246$1", 0, "246", [0, ["246(?:(?:2(?:[3568]\\d|4[0-57-9])|3(?:5[2-9]|6[0-6])|4(?:46|5\\d)|69[5-7]|8(?:[2-5]\\d|83))\\d|52(?:1[147]|20))\\d{3}"]]], BD: ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|22"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}", [10]]]], BE: ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4[5-9]\\d{7}", [9]]]], BF: ["226", "00", "[025-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:0[1-35-7]|5[0-8]|[67]\\d)\\d{6}"]]], BG: ["359", "00", "00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9, 12], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:43[07-9]|99[69]\\d)\\d{5}|(?:8[7-9]|98)\\d{7}", [8, 9]]]], BH: ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[02-4679]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:3(?:[0-79]\\d|8[0-57-9])\\d|6(?:3(?:00|33|6[16])|441|6(?:3[03-9]|[69]\\d|7[0-689])))\\d{4}"]]], BI: ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:29|[67][125-9])\\d{6}"]]], BJ: ["229", "00", "[24-689]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:4[0-7]|[56]\\d|9[013-9])\\d{6}"]]], BL: ["590", "00", "590\\d{6}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [0, ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))\\d{4}"]]], BM: ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "441$1", 0, "441", [0, ["441(?:[2378]\\d|5[0-39]|9[02])\\d{5}"]]], BN: ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:22[89]|[78]\\d\\d)\\d{4}"]]], BO: ["591", "00(?:1\\d)?", "(?:[2-467]\\d\\d|8001)\\d{5}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"]], ["(\\d{8})", "$1", ["[67]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?", 0, 0, 0, [0, ["[67]\\d{7}", [8]]]], BQ: ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]", [0, ["(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}"]]], BR: ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2", 0, 0, [0, ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}", [10, 11]]]], BS: ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([3-8]\\d{6})$|1", "242$1", 0, "242", [0, ["242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|3[0-4]|[89]9))\\d{4}"]]], BT: ["975", "00", "[17]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:1[67]|77)\\d{6}", [8]]]], BW: ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-9]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:321|7[1-8]\\d)\\d{5}", [8]]]], BY: ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, [0, ["(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}", [9]]], "8~10"], BZ: ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]], 0, 0, 0, 0, 0, 0, [0, ["6[0-35-7]\\d{5}", [7]]]], CA: ["1", "011", "(?:[2-8]\\d|90)\\d{8}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [0, ["(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", [10]]]], CC: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [0, ["4(?:(?:79|94)[01]|83[0-389])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[0-36-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]]], "0011"], CD: ["243", "00", "[189]\\d{8}|[1-68]\\d{6}", [7, 9], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["88\\d{5}|(?:8[0-59]|9[017-9])\\d{7}"]]], CF: ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]], 0, 0, 0, 0, 0, 0, [0, ["7[024-7]\\d{6}"]]], CG: ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]], 0, 0, 0, 0, 0, 0, [0, ["026(?:1[0-5]|6[6-9])\\d{4}|0(?:[14-6]\\d\\d|2(?:40|5[5-8]|6[07-9]))\\d{5}"]]], CH: ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[35-9]\\d{7}"]]], CI: ["225", "00", "[02]\\d{9}", [10], [["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]], 0, 0, 0, 0, 0, 0, [0, ["0[157]\\d{8}"]]], CK: ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]], 0, 0, 0, 0, 0, 0, [0, ["[578]\\d{4}"]]], CL: ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]], 0, 0, 0, 0, 0, 0, [0, ["2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-3])|600)|646[59])|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}", [9]]]], CM: ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:24[23]|6[25-9]\\d)\\d{6}", [9]]]], CN: ["86", "00|1(?:[12]\\d|79)\\d\\d00", "1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "10(?:10|9[56])|2[0-57-9](?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "(1(?:[12]\\d|79)\\d\\d)|0", 0, 0, 0, [0, ["1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|[59][0-35-9]|6[25-7]|7[0-35-8])\\d{8}", [11]]], "00"], CO: ["57", "00(?:4(?:[14]4|56)|[579])", "(?:60\\d\\d|9101)\\d{6}|(?:1\\d|3)\\d{9}", [10, 11], [["(\\d{3})(\\d{7})", "$1 $2", ["6"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|91"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0([3579]|4(?:[14]4|56))?", 0, 0, 0, [0, ["333301[0-5]\\d{3}|3333(?:00|2[5-9]|[3-9]\\d)\\d{4}|(?:3(?:24[1-9]|3(?:00|3[0-24-9]))|9101)\\d{6}|3(?:0[0-5]|1\\d|2[0-3]|5[01]|70)\\d{7}", [10]]]], CR: ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))", 0, 0, 0, [0, ["(?:3005\\d|6500[01])\\d{3}|(?:5[07]|6[0-4]|7[0-3]|8[3-9])\\d{6}", [8]]]], CU: ["53", "119", "[27]\\d{6,7}|[34]\\d{5,7}|63\\d{6}|(?:5|8\\d\\d)\\d{7}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["[56]"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:5\\d|63)\\d{6}", [8]]]], CV: ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:36|5[1-389]|9\\d)\\d{5}"]]], CW: ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]", [0, ["953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}"]]], CX: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [0, ["4(?:(?:79|94)[01]|83[0-389])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[0-36-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", [9]]], "0011"], CY: ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["9(?:10|[4-79]\\d)\\d{5}"]]], CZ: ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:60[1-8]\\d|7(?:0(?:[2-5]\\d|60)|190|[2379]\\d\\d))\\d{5}"]]], DE: ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[03568]", "15(?:[0568]|31)"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["15(?:[0-25-9]\\d\\d|310)\\d{6}|1(?:6[023]|7\\d)\\d{7,8}", [10, 11]]]], DJ: ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]], 0, 0, 0, 0, 0, 0, [0, ["77\\d{6}"]]], DK: ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[2-7]\\d|8[126-9]|9[1-46-9])\\d{6}"]]], DM: ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "767$1", 0, "767", [0, ["767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-8]|70[1-6])\\d{4}"]]], DO: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9", [0, ["8[024]9[2-9]\\d{6}"]]], DZ: ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:5(?:4[0-29]|5\\d|6[0-2])|6(?:[569]\\d|7[0-6])|7[7-9]\\d)\\d{6}", [9]]]], EC: ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["964[0-2]\\d{5}|9(?:39|[57][89]|6[0-36-9]|[89]\\d)\\d{6}", [9]]]], EE: ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5\\d{5}|8(?:1(?:0(?:0(?:00|[178]\\d)|[3-9]\\d\\d)|(?:1(?:0[236]|1\\d)|(?:2[0-59]|[3-79]\\d)\\d)\\d)|2(?:0(?:0(?:00|4\\d)|(?:19|[2-7]\\d)\\d)|(?:(?:[124-6]\\d|3[5-9])\\d|7(?:[0-79]\\d|8[13-9])|8(?:[2-6]\\d|7[01]))\\d)|[349]\\d{4}))\\d\\d|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}", [7, 8]]]], EG: ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{8})", "$1 $2", ["1"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["1[0-25]\\d{8}", [10]]]], EH: ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]", [0, ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-4]|5[01]|8[0-3]))\\d{6}"]]], ER: ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:17[1-3]|7\\d\\d)\\d{4}"]]], ES: ["34", "00", "[5-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:590[16]00\\d|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d|(?:6\\d|7[1-48])\\d{7}"]]], ET: ["251", "00", "(?:11|[2-579]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-579]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["700[1-9]\\d{5}|(?:7(?:0[1-9]|1[0-8]|22|77|86|99)|9\\d\\d)\\d{6}"]]], FI: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{5})", "$1", ["20[2-59]"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]0|[68])0|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"], ["(\\d)(\\d{4,9})", "$1 $2", ["(?:1[3-79]|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", [0, ["4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}", [6, 7, 8, 9, 10]]], "00"], FJ: ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[279]\\d|45|5[01568]|8[034679])\\d{5}", [7]]], "00"], FK: ["500", "00", "[2-7]\\d{4}", [5], 0, 0, 0, 0, 0, 0, 0, [0, ["[56]\\d{4}"]]], FM: ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]], 0, 0, 0, 0, 0, 0, [0, ["31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-7]\\d)\\d)\\d{3}"]]], FO: ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))", 0, 0, 0, [0, ["(?:[27][1-9]|5\\d|9[16])\\d{4}"]]], FR: ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:6(?:[0-24-8]\\d|3[0-8]|9[589])|7[3-9]\\d)\\d{6}"]]], GA: ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1", 0, 0, [0, ["(?:(?:0[2-7]|7[467])\\d|6(?:0[0-4]|10|[256]\\d))\\d{5}|[2-7]\\d{6}"]]], GB: ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]]], 0, " x"], GD: ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "473$1", 0, "473", [0, ["473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}"]]], GE: ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["5(?:(?:(?:0555|1(?:[17]77|555))[5-9]|757(?:7[7-9]|8[01]))\\d|22252[0-4])\\d\\d|(?:5(?:00(?:0\\d|11|22|33|44|5[05]|77|88|9[09])|1(?:1(?:00|[124]\\d|3[01])|4\\d\\d)|(?:44|68)\\d\\d|5(?:[0157-9]\\d\\d|200)|7(?:[0147-9]\\d\\d|5(?:00|[57]5))|8(?:0(?:[018]\\d|2[0-4])|58[89]|8(?:55|88))|9(?:090|[1-35-9]\\d\\d))|790\\d\\d)\\d{4}|5(?:0(?:0[17]0|505)|1(?:0[01]0|1(?:07|33|51))|2(?:0[02]0|2[25]2)|3(?:0[03]0|3[35]3)|(?:40[04]|900)0|5222)[0-4]\\d{3}"]]], GF: ["594", "00", "[56]94\\d{6}|(?:80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[56]|9[47]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["694(?:[0-249]\\d|3[0-8])\\d{4}"]]], GG: ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "([25-9]\\d{5})$|0", "1481$1", 0, 0, [0, ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]]]], GH: ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:2(?:[0346-9]\\d|5[67])|5(?:[03-7]\\d|9[1-9]))\\d{6}", [9]]]], GI: ["350", "00", "(?:[25]\\d|60)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]], 0, 0, 0, 0, 0, 0, [0, ["5251[0-4]\\d{3}|(?:5(?:[146-8]\\d\\d|250)|60(?:1[01]|6\\d))\\d{4}"]]], GL: ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[245]\\d{5}"]]], GM: ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[23679]\\d|5[0-489])\\d{5}"]]], GN: ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]], 0, 0, 0, 0, 0, 0, [0, ["6[0-356]\\d{7}", [9]]]], GP: ["590", "00", "590\\d{6}|(?:69|80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))\\d{4}"]]], GQ: ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:222|55\\d)\\d{6}"]]], GR: ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["68[57-9]\\d{7}|(?:69|94)\\d{8}", [10]]]], GT: ["502", "00", "80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-8]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[3-5]\\d\\d|80[0-4])\\d{5}", [8]]]], GU: ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "671$1", 0, "671", [0, ["671(?:2\\d\\d|3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-46-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}"]]], GW: ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]], 0, 0, 0, 0, 0, 0, [0, ["9(?:5\\d|6[569]|77)\\d{6}", [9]]]], GY: ["592", "001", "(?:[2-8]\\d{3}|9008)\\d{3}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:510|6\\d\\d|7(?:[01]\\d|2[156]|31|49))\\d{4}"]]], HK: ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:4(?:44[0-25-9]|6(?:1[0-7]|4[0-57-9]|6[0-4]))|5(?:73[0-6]|95[0-8])|6(?:26[013-8]|66[0-3])|70(?:7[1-8]|8[0-4])|848[0-35-9]|9(?:29[013-9]|39[01]|59[0-4]|899))\\d{4}|(?:4(?:4[0-35-8]|6[02357-9])|5(?:[1-59][0-46-9]|6[0-4689]|7[0-246-9])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|70[129]|84[0-29]|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}", [8]]], "00"], HN: ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[37-9]\\d{7}", [8]]]], HR: ["385", "00", "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", [6, 7, 8, 9], [["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6|7[245]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9(?:(?:0[1-9]|[12589]\\d)\\d\\d|7(?:[0679]\\d\\d|5(?:[01]\\d|44|55|77|9[5-7])))\\d{4}|98\\d{6}", [8, 9]]]], HT: ["509", "00", "(?:[2-489]\\d|55)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-589]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[34]\\d|55)\\d{6}"]]], HU: ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], "06", 0, 0, 0, 0, 0, [0, ["(?:[257]0|3[01])\\d{7}", [9]]]], ID: ["62", "00[89]", "(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["8[1-35-9]\\d{7,10}", [9, 10, 11, 12]]]], IE: ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["8(?:22|[35-9]\\d)\\d{6}", [9]]]], IL: ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0", 0, 0, 0, 0, 0, [0, ["55410\\d{4}|5(?:(?:[02][02-9]|[149][2-9]|[36]\\d|8[3-7])\\d|5(?:01|2\\d|3[0-3]|4[34]|5[0-25689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}", [9]]]], IM: ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([25-8]\\d{5})$|0", "1624$1", 0, "74576|(?:16|7[56])24", [0, ["76245[06]\\d{4}|7(?:4576|[59]24\\d|624[0-4689])\\d{5}"]]], IN: ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0", 0, 0, 0, 0, 0, [0, ["(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}", [10]]]], IO: ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]], 0, 0, 0, 0, 0, 0, [0, ["38\\d{5}"]]], IQ: ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[3-9]\\d{8}", [10]]]], IR: ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9(?:(?:0(?:[0-35]\\d|4[4-6])|(?:[13]\\d|2[0-3])\\d)\\d|9(?:[0-46]\\d\\d|5[15]0|8(?:[12]\\d|88)|9(?:0[0-3]|[19]\\d|21|69|77|8[7-9])))\\d{5}", [10]]]], IS: ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[026-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-9]\\d)|8(?:2[0-59]|[3-69]\\d|8[238]))\\d{4}"]], "00"], IT: ["39", "00", "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]|43"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [0, ["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]]]], JE: ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([0-24-8]\\d{5})$|0", "1534$1", 0, 0, [0, ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"]]], JM: ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876", [0, ["(?:658295|876(?:2(?:0[1-9]|[13-9]\\d|2[013-9])|[348]\\d\\d|5(?:0[1-9]|[1-9]\\d)|6(?:4[89]|6[67])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579])))\\d{4}"]]], JO: ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:[78][0-25-9]|9\\d)\\d{6}", [9]]]], JP: ["81", "010", "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"]], "0", 0, "(000[259]\\d{6})$|(?:(?:003768)0?)|0", "$1", 0, 0, [0, ["[7-9]0[1-9]\\d{7}", [10]]]], KE: ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1(?:0[0-6]|1[0-5]|2[014]|30)|7\\d\\d)\\d{6}", [9]]]], KG: ["996", "00", "8\\d{9}|[235-9]\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["312(?:58\\d|973)\\d{3}|(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|600|7(?:[07]\\d|55)|88[08]|9(?:12|9[05-9]))\\d{6}", [9]]]], KH: ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}", [8, 9]]]], KI: ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0", 0, 0, 0, 0, 0, [0, ["(?:6200[01]|7(?:310[1-9]|5(?:02[03-9]|12[0-47-9]|22[0-7]|[34](?:0[1-9]|8[02-9])|50[1-9])))\\d{3}|(?:63\\d\\d|7(?:(?:[0146-9]\\d|2[0-689])\\d|3(?:[02-9]\\d|1[1-9])|5(?:[0-2][013-9]|[34][1-79]|5[1-9]|[6-9]\\d)))\\d{4}", [8]]]], KM: ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]], 0, 0, 0, 0, 0, 0, [0, ["[34]\\d{6}"]]], KN: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "869$1", 0, "869", [0, ["869(?:48[89]|55[6-8]|66\\d|76[02-7])\\d{4}"]]], KP: ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["19[1-3]\\d{7}", [10]]]], KR: ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?", 0, 0, 0, [0, ["1(?:05(?:[0-8]\\d|9[0-6])|22[13]\\d)\\d{4,5}|1(?:0[0-46-9]|[16-9]\\d|2[013-9])\\d{6,7}", [9, 10]]]], KW: ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:41\\d\\d|5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25])|7(?:55|77)|88[58])|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|1(?:00|11|6[16])|2[26]2|3[36]3|4[46]4|7(?:0[013-9]|[67]\\d)|8[68]8|9(?:[069]\\d|3[039]))|9(?:(?:[04679]\\d|8[057-9])\\d|1(?:1[01]|99)|2(?:00|2\\d)|3(?:00|3[03])|5(?:00|5\\d)))\\d{4}", [8]]]], KY: ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "345$1", 0, "345", [0, ["345(?:32[1-9]|42[0-4]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|82[56]|9(?:1[679]|2[2-9]|3[06-9]|90))\\d{4}"]]], KZ: ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33|7", [0, ["7(?:0[0-25-8]|47|6[0-4]|7[15-8]|85)\\d{7}", [10]]], "8~10"], LA: ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[013-9]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:20(?:[2359]\\d|7[6-8]|88)|302\\d)\\d{6}", [10]]]], LB: ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], "0", 0, 0, 0, 0, 0, [0, ["793(?:[01]\\d|2[0-4])\\d{3}|(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[12]))\\d{5}"]]], LC: ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "([2-8]\\d{6})$|1", "758$1", 0, "758", [0, ["758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[0-3])|812)\\d{4}"]]], LI: ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "(1001)|0", 0, 0, 0, [0, ["(?:6(?:(?:4[5-9]|5[0-469])\\d|6(?:[024-6]\\d|[17]0|3[7-9]))\\d|7(?:[37-9]\\d|42|56))\\d{4}"]]], LK: ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:[0-25-8]\\d|4[0-4])\\d{6}"]]], LR: ["231", "00", "(?:[245]\\d|33|77|88)\\d{7}|(?:2\\d|[4-6])\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["4[67]|[56]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-578]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:(?:(?:22|33)0|555|(?:77|88)\\d)\\d|4(?:240|[67]))\\d{5}|[56]\\d{6}", [7, 9]]]], LS: ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]], 0, 0, 0, 0, 0, 0, [0, ["[56]\\d{7}"]]], LT: ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(8-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(8-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", 1]], "8", 0, "[08]", 0, 0, 0, [0, ["6\\d{7}"]]], LU: ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)", 0, 0, 0, [0, ["6(?:[269][18]|5[1568]|7[189]|81)\\d{6}", [9]]]], LV: ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]], 0, 0, 0, 0, 0, 0, [0, ["23(?:23[0-57-9]|33[0238])\\d{3}|2(?:[0-24-9]\\d\\d|3(?:0[07]|[14-9]\\d|2[024-9]|3[0-24-9]))\\d{4}"]]], LY: ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9[1-6]\\d{7}"]]], MA: ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], ["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-46-9]|3[3-9]|9)|8(?:0[89]|92)"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-4]|5[01]|8[0-3]))\\d{6}"]]], MC: ["377", "00", "(?:[3489]|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4(?:[46]\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}"]]], MD: ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["562\\d{5}|(?:6\\d|7[16-9])\\d{6}"]]], ME: ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:[07-9]\\d|3[024]|6[0-25])\\d{5}", [8]]]], MF: ["590", "00", "590\\d{6}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [0, ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))\\d{4}"]]], MG: ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "([24-9]\\d{6})$|0", "20$1", 0, 0, [0, ["3[2-47-9]\\d{7}"]]], MH: ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1", 0, 0, 0, 0, 0, [0, ["(?:(?:23|54)5|329|45[35-8])\\d{4}"]]], MK: ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:3555|(?:474|9[019]7)7)\\d{3}|7(?:[0-25-8]\\d\\d|3(?:[1-48]\\d|6[01]|7[01578])|4(?:2\\d|60|7[01578])|9(?:[2-4]\\d|5[01]|7[015]))\\d{4}"]]], ML: ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["2(?:0(?:01|79)|17\\d)\\d{4}|(?:5[01]|[679]\\d|8[2-49])\\d{6}"]]], MM: ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:17[01]|9(?:2(?:[0-4]|[56]\\d\\d)|(?:3(?:[0-36]|4\\d)|(?:6\\d|8[89]|9[4-8])\\d|7(?:3|40|[5-9]\\d))\\d|4(?:(?:[0245]\\d|[1379])\\d|88)|5[0-6])\\d)\\d{4}|9[69]1\\d{6}|9(?:[68]\\d|9[089])\\d{5}", [7, 8, 9, 10]]]], MN: ["976", "001", "[12]\\d{7,9}|[5-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:83[01]|92[039])\\d{5}|(?:5[05]|6[069]|8[015689]|9[013-9])\\d{6}", [8]]]], MO: ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8], [["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]], 0, 0, 0, 0, 0, 0, [0, ["6800[0-79]\\d{3}|6(?:[235]\\d\\d|6(?:0[0-5]|[1-9]\\d)|8(?:0[1-9]|[14-8]\\d|2[5-9]|[39][0-4]))\\d{4}", [8]]]], MP: ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "670$1", 0, "670", [0, ["670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}"]]], MQ: ["596", "00", "596\\d{6}|(?:69|80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["69(?:6(?:[0-46-9]\\d|5[0-6])|727)\\d{4}"]]], MR: ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]], 0, 0, 0, 0, 0, 0, [0, ["[2-4][0-46-9]\\d{6}"]]], MS: ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "([34]\\d{6})$|1", "664$1", 0, "664", [0, ["664(?:3(?:49|9[1-6])|49[2-6])\\d{4}"]]], MT: ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7(?:210|[79]\\d\\d)|9(?:[29]\\d\\d|69[67]|8(?:1[1-3]|89|97)))\\d{4}"]]], MU: ["230", "0(?:0|[24-7]0|3[03])", "(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[57]"]], ["(\\d{5})(\\d{5})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|(?:5(?:2[5-9]|4[3-689]|[57]\\d|8[0-689]|9[0-8])|7(?:0[0-3]|3[013]))\\d{5}", [8]]], "020"], MV: ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[34679]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:46[46]|[79]\\d\\d)\\d{4}", [7]]], "00"], MW: ["265", "00", "(?:[1289]\\d|31|77)\\d{7}|1\\d{6}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["111\\d{6}|(?:31|77|[89][89])\\d{7}", [9]]]], MX: ["52", "0[09]", "1(?:(?:22|44|7[27]|87|99)[1-9]|65[0-689])\\d{7}|(?:1(?:[01]\\d|2[13-9]|[35][1-9]|4[0-35-9]|6[0-46-9]|7[013-689]|8[1-69]|9[1-8])|[2-9]\\d)\\d{8}", [10, 11], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], 0, 1], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], 0, 1], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], 0, 1]], "01", 0, "0(?:[12]|4[45])|1", 0, 0, 0, [0, ["657[12]\\d{6}|(?:1(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))|2(?:2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[25-7][1-9]|3[1-8]|4\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1346][1-9]|[27]\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|6[1-9]|7[12]|8[1-8]|9\\d))\\d{7}"]], "00"], MY: ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["1(?:1888[689]|4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d)|7(?:[0-4]\\d|5[0-7]))|(?:[269]\\d|[37][1-9]|4[235-9])\\d|5(?:31|9\\d\\d)|8(?:1[23]|[236]\\d|4[06]|5(?:46|[7-9])|7[016-9]|8[01]|9[0-8]))\\d{5}", [9, 10]]]], MZ: ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["8[2-79]\\d{7}", [9]]]], NA: ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:60|8[1245])\\d{7}", [9]]]], NC: ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5[0-4]|[79]\\d|8[0-79])\\d{4}"]]], NE: ["227", "00", "[027-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[047]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:23|7[047]|[89]\\d)\\d{6}"]]], NF: ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1", 0, 0, [0, ["(?:14|3[58])\\d{4}"]]], NG: ["234", "009", "2[0-24-9]\\d{8}|[78]\\d{10,13}|[7-9]\\d{9}|[1-9]\\d{7}|[124-7]\\d{6}", [7, 8, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-6]|7(?:0[0-689]|[1-79])|8[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["20[129]"], "0$1"], ["(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:702[0-24-9]|819[01])\\d{6}|(?:7(?:0[13-9]|[12]\\d)|8(?:0[1-9]|1[0-8])|9(?:0[1-9]|1[1-6]))\\d{7}", [10]]]], NI: ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}"]]], NL: ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], ["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:6[1-58]|970\\d)\\d{7}", [9, 11]]]], NO: ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]", [0, ["(?:4[015-8]|9\\d)\\d{6}", [8]]]], NP: ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0", 0, 0, 0, 0, 0, [0, ["9(?:00|6[0-3]|7[024-6]|8[0-24-68])\\d{7}", [10]]]], NR: ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:55[3-9]|666|8\\d\\d)\\d{4}"]]], NU: ["683", "00", "(?:[4-7]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[56]|888[1-9])\\d{3}"]]], NZ: ["64", "0(?:0|161)", "[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-79]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|8|90", "50(?:[0367]|88)|8|90"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[589]"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["2(?:[0-27-9]\\d|6)\\d{6,7}|2(?:1\\d|75)\\d{5}", [8, 9, 10]]], "00"], OM: ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:1505|90[1-9]\\d)\\d{4}|(?:7[126-9]|9[1-9])\\d{6}", [8]]]], PA: ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:1[16]1|21[89]|6\\d{3}|8(?:1[01]|7[23]))\\d{4}", [7, 8]]]], PE: ["51", "00|19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, [0, ["9\\d{8}", [9]]], "00", " Anexo "], PF: ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["8[7-9]\\d{6}", [8]]]], PG: ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7\\d|8[1-38])\\d{6}", [8]]], "00"], PH: ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["(?:8(?:1[37]|9[5-8])|9(?:0[5-9]|1[0-24-9]|[235-7]\\d|4[2-9]|8[135-9]|9[1-9]))\\d{7}", [10]]]], PK: ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, [0, ["3(?:[0-247]\\d|3[0-79]|55|64)\\d{7}", [10]]]], PL: ["48", "00", "(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|20|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["21(?:1[013-5]|2\\d)\\d{5}|(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}", [9]]]], PM: ["508", "00", "[45]\\d{5}|(?:708|80\\d)\\d{6}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:4[02-4]|5[056]|708[45][0-5])\\d{4}"]]], PR: ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939", [0, ["(?:787|939)[2-9]\\d{6}"]]], PS: ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["5[69]\\d{7}", [9]]]], PT: ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["6(?:[06]92(?:30|9\\d)|[35]92(?:3[034]|9\\d))\\d{3}|(?:(?:16|6[0356])93|9(?:[1-36]\\d\\d|480))\\d{5}"]]], PW: ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:(?:46|83)[0-5]|6[2-4689]0)\\d{4}|(?:45|77|88)\\d{5}"]]], PY: ["595", "00", "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, [0, ["9(?:51|6[129]|7[1-6]|8[1-7]|9[1-5])\\d{6}", [9]]]], QA: ["974", "00", "800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}", [7, 8, 9, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["2[16]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["[35-7]\\d{7}", [8]]]], RE: ["262", "00", "(?:26|[689]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["69(?:2\\d\\d|3(?:[06][0-6]|1[013]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))\\d{4}"]]], RO: ["40", "00", "(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7020\\d{5}|(?:6(?:2\\d|40)|7(?:0[013-9]|1[0-3]|[2-7]\\d|8[03-8]|9[0-39]))\\d{6}", [9]]], 0, " int "], RS: ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:[0-689]|7\\d)\\d{6,7}", [8, 9, 10]]]], RU: ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1], ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], "8", 0, 0, 0, 0, "3[04-689]|[489]", [0, ["9\\d{9}", [10]]], "8~10"], RW: ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[237-9]\\d{7}", [9]]]], SA: ["966", "00", "92\\d{7}|(?:[15]|8\\d)\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, 0, 0, 0, 0, [0, ["579[01]\\d{5}|5(?:[013-689]\\d|7[0-8])\\d{6}", [9]]]], SB: ["677", "0[01]", "(?:[1-6]|[7-9]\\d\\d)\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]], 0, 0, 0, 0, 0, 0, [0, ["48\\d{3}|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}"]]], SC: ["248", "010|0[0-2]", "800\\d{4}|(?:[249]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, [0, ["2[125-8]\\d{5}"]], "00"], SD: ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1[0-2]|9[0-3569])\\d{7}"]]], SE: ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0", 0, 0, 0, 0, 0, [0, ["7[02369]\\d{7}", [9]]]], SG: ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-9]|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, ["8(?:09|95)[0-2]\\d{4}|(?:8(?:0[1-8]|[1-8]\\d|9[0-4])|9[0-8]\\d)\\d{5}", [8]]]], SH: ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]", [0, ["[56]\\d{4}", [5]]]], SI: ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, [0, ["65(?:[178]\\d|5[56]|6[01])\\d{4}|(?:[37][01]|4[0139]|51|6[489])\\d{6}", [8]]], "00"], SJ: ["47", "00", "0\\d{4}|(?:[489]\\d|79)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79", [0, ["(?:4[015-8]|9\\d)\\d{6}", [8]]]], SK: ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|4[03-57-9]|5\\d)\\d{6}", [9]]]], SL: ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, [0, ["(?:25|3[0-5]|66|7[2-9]|8[08]|9[09])\\d{6}"]]], SM: ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1", 0, 0, [0, ["6[16]\\d{6}", [8]]]], SN: ["221", "00", "(?:[378]\\d|93)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]], 0, 0, 0, 0, 0, 0, [0, ["7(?:(?:[06-8]\\d|21|90)\\d|5(?:01|[19]0|25|[38]3|[4-7]\\d))\\d{5}"]]], SO: ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d)(\\d{7})", "$1 $2", ["(?:2|90)4|[67]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[348]|64|79|90"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[0-35-9]|77|9[2-9]"]]], "0", 0, 0, 0, 0, 0, [0, ["(?:(?:15|(?:3[59]|4[89]|6\\d|7[79]|8[08])\\d|9(?:0\\d|[2-9]))\\d|2(?:4\\d|8))\\d{5}|(?:[67]\\d\\d|904)\\d{5}", [7, 8, 9]]]], SR: ["597", "00", "(?:[2-5]|68|[78]\\d)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[124-7]|8[124-9])\\d{5}", [7]]]], SS: ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:12|9[1257-9])\\d{7}"]]], ST: ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]], 0, 0, 0, 0, 0, 0, [0, ["900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}"]]], SV: ["503", "00", "[267]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, [0, ["[67]\\d{7}", [8]]]], SX: ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "(5\\d{6})$|1", "721$1", 0, "721", [0, ["7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}"]]], SY: ["963", "00", "[1-39]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", 1]], "0", 0, 0, 0, 0, 0, [0, ["9[1-689]\\d{7}", [9]]]], SZ: ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]], 0, 0, 0, 0, 0, 0, [0, ["7[6-9]\\d{6}", [8]]]], TA: ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"], TC: ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "([2-479]\\d{6})$|1", "649$1", 0, "649", [0, ["649(?:2(?:3[129]|4[1-79])|3\\d\\d|4[34][1-3])\\d{4}"]]], TD: ["235", "00|16", "(?:22|[69]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:6[0235689]|77|9\\d)\\d{6}"]], "00"], TG: ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[019]|9[0-36-9])\\d{6}"]]], TH: ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["67(?:1[0-8]|2[4-7])\\d{5}|(?:14|6[1-6]|[89]\\d)\\d{7}", [9]]]], TJ: ["992", "810", "[0-57-9]\\d{8}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["44[02-479]|[34]7"]], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:4(?:1[18]|4[02-479])|81[1-9])\\d{6}|(?:0[0-57-9]|1[017]|2[02]|[34]0|5[05]|7[0178]|8[078]|9\\d)\\d{7}"]], "8~10"], TK: ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7], 0, 0, 0, 0, 0, 0, 0, [0, ["7[2-4]\\d{2,5}"]]], TL: ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]], 0, 0, 0, 0, 0, 0, [0, ["7[2-8]\\d{6}", [8]]]], TM: ["993", "810", "[1-6]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"]], "8", 0, 0, 0, 0, 0, [0, ["6\\d{7}"]], "8~10"], TN: ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-8])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}"]]], TO: ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5(?:4[0-5]|5[4-6])|6(?:[09]\\d|3[02]|8[15-9])|(?:7\\d|8[46-9])\\d|999)\\d{4}", [7]]]], TR: ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|61[06])", "5(?:[0-59]|61[06]1)"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]], "0", 0, 0, 0, 0, 0, [0, ["561(?:011|61\\d)\\d{4}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}", [10]]]], TT: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-46-8]\\d{6})$|1", "868$1", 0, "868", [0, ["868(?:(?:2[5-9]|3\\d)\\d|4(?:3[0-6]|[6-9]\\d)|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}"]]], TV: ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[01]\\d|90)\\d{4}", [6, 7]]]], TW: ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:40001[0-2]|9[0-8]\\d{4})\\d{3}", [9]]], 0, "#"], TZ: ["255", "00[056]", "(?:[25-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["5"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["77[2-9]\\d{6}|(?:6[125-9]|7[13-689])\\d{7}"]]], UA: ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}", [9]]], "0~0"], UG: ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["72(?:[48]0|6[01])\\d{5}|7(?:[015-8]\\d|20|36|4[0-4]|9[89])\\d{6}"]]], US: ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10], [["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [0, ["(?:5056(?:[0-35-9]\\d|4[468])|7302[0-3]\\d)\\d{4}|(?:472[24]|505[2-57-9]|7306|983[237-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[013569]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[1247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"]]], UY: ["598", "0(?:0|1[3-9]\\d)", "0004\\d{2,9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}", [6, 7, 8, 9, 10, 11, 12, 13], [["(\\d{3})(\\d{3,4})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[49]0|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], ["(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3 $4", ["0"]]], "0", 0, 0, 0, 0, 0, [0, ["9[1-9]\\d{6}", [8]]], "00", " int. "], UZ: ["998", "810", "(?:20|33|[5-79]\\d|88)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-9]"], "8 $1"]], "8", 0, 0, 0, 0, 0, [0, ["(?:(?:[25]0|33|88|9[0-57-9])\\d{3}|6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|3[01]|5\\d|7[0-4])|(?:5[67]|7\\d)\\d|6(?:2[0-26]|8\\d)))|7(?:[07]\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07]))))\\d{4}"]], "8~10"], VA: ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11], 0, 0, 0, 0, 0, 0, "06698", [0, ["3[1-9]\\d{8}|3[2-9]\\d{7}", [9, 10]]]], VC: ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "784$1", 0, "784", [0, ["784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4])|720)\\d{4}"]]], VE: ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4(?:1[24-8]|2[46])\\d{7}"]]], VG: ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-578]\\d{6})$|1", "284$1", 0, "284", [0, ["284(?:245|3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|9[69])|5(?:4[0-7]|68|9[69]))\\d{4}"]]], VI: ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "340$1", 0, "340", [0, ["340(?:2(?:0[0-368]|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}"]]], VN: ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1], ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["6"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[357-9]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0", 0, 0, 0, 0, 0, [0, ["(?:5(?:2[238]|59)|89[6-9]|99[013-9])\\d{6}|(?:3\\d|5[1689]|7[06-9]|8[1-8]|9[0-8])\\d{7}", [9]]]], VU: ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[58]\\d|7[013-7])\\d{5}", [7]]]], WF: ["681", "00", "(?:40|72)\\d{4}|8\\d{5}(?:\\d{3})?", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[478]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:72|8[23])\\d{4}", [6]]]], WS: ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[1-35-7]|8(?:[3-7]|9\\d{3}))\\d{5}", [7, 10]]]], XK: ["383", "00", "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4[3-9]\\d{6}", [8]]]], YE: ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7(?:[24-6]|8[0-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[01378]\\d{7}", [9]]]], YT: ["262", "00", "(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [0, ["639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])\\d{4}"]]], ZA: ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1(?:3492[0-25]|4495[0235]|549(?:20|5[01]))|4[34]492[01])\\d{3}|8[1-4]\\d{3,7}|(?:2[27]|47|54)4950\\d{3}|(?:1(?:049[2-4]|9[12]\\d\\d)|(?:6\\d|7[0-46-9])\\d{3}|8(?:5\\d{3}|7(?:08[67]|158|28[5-9]|310)))\\d{4}|(?:1[6-8]|28|3[2-69]|4[025689]|5[36-8])4920\\d{3}|(?:12|[2-5]1)492\\d{4}", [5, 6, 7, 8, 9]]]], ZM: ["260", "00", "800\\d{6}|(?:21|63|[79]\\d)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:7[5-79]|9[5-8])\\d{7}"]]], ZW: ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:[178]\\d|3[1-9])\\d{6}", [9]]]] }, nonGeographic: { 800: ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]], 808: ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]], 870: ["870", 0, "7\\d{11}|[35-7]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"]]], 878: ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]], 881: ["881", 0, "6\\d{9}|[0-36-9]\\d{8}", [9, 10], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-37-9]"]], ["(\\d)(\\d{3})(\\d{5,6})", "$1 $2 $3", ["6"]]], 0, 0, 0, 0, 0, 0, [0, ["6\\d{9}|[0-36-9]\\d{8}"]]], 882: ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{6})", "$1 $2", ["49"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1[36]|9"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|23|3(?:[15]|4[57])|4|51"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-35]"]]], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, 0, 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]]], 883: ["883", 0, "(?:[1-4]\\d|51)\\d{6,10}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,8})", "$1 $2 $3", ["[14]|2[24-689]|3[02-689]|51[24-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["21"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[235]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]]], 888: ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]], 979: ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]] } };
function H1(A, e) {
  var t = Array.prototype.slice.call(e);
  return t.push(v1), A.apply(this, t);
}
function n0(A) {
  "@babel/helpers - typeof";
  return n0 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, n0(A);
}
function K0(A, e) {
  for (var t = 0; t < e.length; t++) {
    var o = e[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(A, o.key, o);
  }
}
function N1(A, e, t) {
  return e && K0(A.prototype, e), t && K0(A, t), Object.defineProperty(A, "prototype", { writable: !1 }), A;
}
function J1(A, e) {
  if (!(A instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function U1(A, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  A.prototype = Object.create(e && e.prototype, { constructor: { value: A, writable: !0, configurable: !0 } }), Object.defineProperty(A, "prototype", { writable: !1 }), e && lA(A, e);
}
function j1(A) {
  var e = J2();
  return function() {
    var o = uA(A), n;
    if (e) {
      var i = uA(this).constructor;
      n = Reflect.construct(o, arguments, i);
    } else
      n = o.apply(this, arguments);
    return T1(this, n);
  };
}
function T1(A, e) {
  if (e && (n0(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return N2(A);
}
function N2(A) {
  if (A === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A;
}
function i0(A) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return i0 = function(o) {
    if (o === null || !q1(o))
      return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(o))
        return e.get(o);
      e.set(o, n);
    }
    function n() {
      return MA(o, arguments, uA(this).constructor);
    }
    return n.prototype = Object.create(o.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), lA(n, o);
  }, i0(A);
}
function MA(A, e, t) {
  return J2() ? MA = Reflect.construct : MA = function(n, i, r) {
    var d = [null];
    d.push.apply(d, i);
    var a = Function.bind.apply(n, d), s = new a();
    return r && lA(s, r.prototype), s;
  }, MA.apply(null, arguments);
}
function J2() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function q1(A) {
  return Function.toString.call(A).indexOf("[native code]") !== -1;
}
function lA(A, e) {
  return lA = Object.setPrototypeOf || function(o, n) {
    return o.__proto__ = n, o;
  }, lA(A, e);
}
function uA(A) {
  return uA = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, uA(A);
}
var j = /* @__PURE__ */ function(A) {
  U1(t, A);
  var e = j1(t);
  function t(o) {
    var n;
    return J1(this, t), n = e.call(this, o), Object.setPrototypeOf(N2(n), t.prototype), n.name = n.constructor.name, n;
  }
  return N1(t);
}(/* @__PURE__ */ i0(Error)), B0 = 2, Z1 = 17, P1 = 3, K = "0-9０-９٠-٩۰-۹", W1 = "-‐-―−ー－", z1 = "／/", X1 = "．.", V1 = "  ­​⁠　", $1 = "()（）［］\\[\\]", _1 = "~⁓∼～", GA = "".concat(W1).concat(z1).concat(X1).concat(V1).concat($1).concat(_1), E0 = "+＋";
function O0(A, e) {
  A = A.split("-"), e = e.split("-");
  for (var t = A[0].split("."), o = e[0].split("."), n = 0; n < 3; n++) {
    var i = Number(t[n]), r = Number(o[n]);
    if (i > r)
      return 1;
    if (r > i)
      return -1;
    if (!isNaN(i) && isNaN(r))
      return 1;
    if (isNaN(i) && !isNaN(r))
      return -1;
  }
  return A[1] && e[1] ? A[1] > e[1] ? 1 : A[1] < e[1] ? -1 : 0 : !A[1] && e[1] ? 1 : A[1] && !e[1] ? -1 : 0;
}
var At = {}.constructor;
function yA(A) {
  return A != null && A.constructor === At;
}
function r0(A) {
  "@babel/helpers - typeof";
  return r0 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r0(A);
}
function FA(A, e) {
  if (!(A instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Y0(A, e) {
  for (var t = 0; t < e.length; t++) {
    var o = e[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(A, o.key, o);
  }
}
function kA(A, e, t) {
  return e && Y0(A.prototype, e), t && Y0(A, t), Object.defineProperty(A, "prototype", { writable: !1 }), A;
}
var et = "1.2.0", tt = "1.7.35", v0 = " ext. ", ot = /^\d+$/, G = /* @__PURE__ */ function() {
  function A(e) {
    FA(this, A), dt(e), this.metadata = e, U2.call(this, e);
  }
  return kA(A, [{
    key: "getCountries",
    value: function() {
      return Object.keys(this.metadata.countries).filter(function(t) {
        return t !== "001";
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function(t) {
      return this.metadata.countries[t];
    }
  }, {
    key: "nonGeographic",
    value: function() {
      if (!(this.v1 || this.v2 || this.v3))
        return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function(t) {
      return this.getCountryMetadata(t) !== void 0;
    }
  }, {
    key: "hasCallingCode",
    value: function(t) {
      if (this.getCountryCodesForCallingCode(t))
        return !0;
      if (this.nonGeographic()) {
        if (this.nonGeographic()[t])
          return !0;
      } else {
        var o = this.countryCallingCodes()[t];
        if (o && o.length === 1 && o[0] === "001")
          return !0;
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function(t) {
      return this.nonGeographic() ? !!this.nonGeographic()[t] : !this.getCountryCodesForCallingCode(t);
    }
    // Deprecated.
  }, {
    key: "country",
    value: function(t) {
      return this.selectNumberingPlan(t);
    }
  }, {
    key: "selectNumberingPlan",
    value: function(t, o) {
      if (t && ot.test(t) && (o = t, t = null), t && t !== "001") {
        if (!this.hasCountry(t))
          throw new Error("Unknown country: ".concat(t));
        this.numberingPlan = new H0(this.getCountryMetadata(t), this);
      } else if (o) {
        if (!this.hasCallingCode(o))
          throw new Error("Unknown calling code: ".concat(o));
        this.numberingPlan = new H0(this.getNumberingPlanMetadata(o), this);
      } else
        this.numberingPlan = void 0;
      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function(t) {
      var o = this.countryCallingCodes()[t];
      if (o)
        return o.length === 1 && o[0].length === 3 ? void 0 : o;
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function(t) {
      var o = this.getCountryCodesForCallingCode(t);
      if (o)
        return o[0];
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function(t) {
      var o = this.getCountryCodeForCallingCode(t);
      if (o)
        return this.getCountryMetadata(o);
      if (this.nonGeographic()) {
        var n = this.nonGeographic()[t];
        if (n)
          return n;
      } else {
        var i = this.countryCallingCodes()[t];
        if (i && i.length === 1 && i[0] === "001")
          return this.metadata.countries["001"];
      }
    }
    // Deprecated.
  }, {
    key: "countryCallingCode",
    value: function() {
      return this.numberingPlan.callingCode();
    }
    // Deprecated.
  }, {
    key: "IDDPrefix",
    value: function() {
      return this.numberingPlan.IDDPrefix();
    }
    // Deprecated.
  }, {
    key: "defaultIDDPrefix",
    value: function() {
      return this.numberingPlan.defaultIDDPrefix();
    }
    // Deprecated.
  }, {
    key: "nationalNumberPattern",
    value: function() {
      return this.numberingPlan.nationalNumberPattern();
    }
    // Deprecated.
  }, {
    key: "possibleLengths",
    value: function() {
      return this.numberingPlan.possibleLengths();
    }
    // Deprecated.
  }, {
    key: "formats",
    value: function() {
      return this.numberingPlan.formats();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixForParsing",
    value: function() {
      return this.numberingPlan.nationalPrefixForParsing();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixTransformRule",
    value: function() {
      return this.numberingPlan.nationalPrefixTransformRule();
    }
    // Deprecated.
  }, {
    key: "leadingDigits",
    value: function() {
      return this.numberingPlan.leadingDigits();
    }
    // Deprecated.
  }, {
    key: "hasTypes",
    value: function() {
      return this.numberingPlan.hasTypes();
    }
    // Deprecated.
  }, {
    key: "type",
    value: function(t) {
      return this.numberingPlan.type(t);
    }
    // Deprecated.
  }, {
    key: "ext",
    value: function() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function() {
      return this.v1 ? this.metadata.country_phone_code_to_countries : this.metadata.country_calling_codes;
    }
    // Deprecated.
  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function(t) {
      return this.selectNumberingPlan(t);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function() {
      return this.numberingPlan !== void 0;
    }
  }]), A;
}(), H0 = /* @__PURE__ */ function() {
  function A(e, t) {
    FA(this, A), this.globalMetadataObject = t, this.metadata = e, U2.call(this, t.metadata);
  }
  return kA(A, [{
    key: "callingCode",
    value: function() {
      return this.metadata[0];
    }
    // Formatting information for regions which share
    // a country calling code is contained by only one region
    // for performance reasons. For example, for NANPA region
    // ("North American Numbering Plan Administration",
    //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
    // it will be contained in the metadata for `US`.
  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
    // Is always present.
  }, {
    key: "IDDPrefix",
    value: function() {
      if (!(this.v1 || this.v2))
        return this.metadata[1];
    }
    // Is only present when a country supports multiple IDD prefixes.
  }, {
    key: "defaultIDDPrefix",
    value: function() {
      if (!(this.v1 || this.v2))
        return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function() {
      return this.v1 || this.v2 ? this.metadata[1] : this.metadata[2];
    }
    // "possible length" data is always present in Google's metadata.
  }, {
    key: "possibleLengths",
    value: function() {
      if (!this.v1)
        return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function(t) {
      return t[this.v1 ? 2 : this.v2 ? 3 : 4];
    }
    // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "formats",
    value: function() {
      var t = this, o = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return o.map(function(n) {
        return new nt(n, t);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function(t) {
      return t[this.v1 ? 4 : this.v2 ? 5 : 6];
    }
    // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixFormattingRule",
    value: function() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function() {
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    }
    // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function() {
      return this.types() && this.types().length === 0 ? !1 : !!this.types();
    }
  }, {
    key: "type",
    value: function(t) {
      if (this.hasTypes() && N0(this.types(), t))
        return new rt(N0(this.types(), t), this);
    }
  }, {
    key: "ext",
    value: function() {
      return this.v1 || this.v2 ? v0 : this.metadata[13] || v0;
    }
  }]), A;
}(), nt = /* @__PURE__ */ function() {
  function A(e, t) {
    FA(this, A), this._format = e, this.metadata = t;
  }
  return kA(A, [{
    key: "pattern",
    value: function() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function() {
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
    // Checks whether national prefix formatting rule contains national prefix.
  }, {
    key: "usesNationalPrefix",
    value: function() {
      return !!(this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !it.test(this.nationalPrefixFormattingRule()));
    }
  }, {
    key: "internationalFormat",
    value: function() {
      return this._format[5] || this.format();
    }
  }]), A;
}(), it = /^\(?\$1\)?$/, rt = /* @__PURE__ */ function() {
  function A(e, t) {
    FA(this, A), this.type = e, this.metadata = t;
  }
  return kA(A, [{
    key: "pattern",
    value: function() {
      return this.metadata.v1 ? this.type : this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function() {
      if (!this.metadata.v1)
        return this.type[1] || this.metadata.possibleLengths();
    }
  }]), A;
}();
function N0(A, e) {
  switch (e) {
    case "FIXED_LINE":
      return A[0];
    case "MOBILE":
      return A[1];
    case "TOLL_FREE":
      return A[2];
    case "PREMIUM_RATE":
      return A[3];
    case "PERSONAL_NUMBER":
      return A[4];
    case "VOICEMAIL":
      return A[5];
    case "UAN":
      return A[6];
    case "PAGER":
      return A[7];
    case "VOIP":
      return A[8];
    case "SHARED_COST":
      return A[9];
  }
}
function dt(A) {
  if (!A)
    throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
  if (!yA(A) || !yA(A.countries))
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(yA(A) ? "an object of shape: { " + Object.keys(A).join(", ") + " }" : "a " + at(A) + ": " + A, "."));
}
var at = function(e) {
  return r0(e);
};
function p0(A, e) {
  if (e = new G(e), e.hasCountry(A))
    return e.country(A).countryCallingCode();
  throw new Error("Unknown country: ".concat(A));
}
function st(A, e) {
  return e.countries.hasOwnProperty(A);
}
function U2(A) {
  var e = A.version;
  typeof e == "number" ? (this.v1 = e === 1, this.v2 = e === 2, this.v3 = e === 3, this.v4 = e === 4) : e ? O0(e, et) === -1 ? this.v2 = !0 : O0(e, tt) === -1 ? this.v3 = !0 : this.v4 = !0 : this.v1 = !0;
}
var gt = ";ext=", $ = function(e) {
  return "([".concat(K, "]{1,").concat(e, "})");
};
function j2(A) {
  var e = "20", t = "15", o = "9", n = "6", i = "[  \\t,]*", r = "[:\\.．]?[  \\t,-]*", d = "#?", a = "(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)", s = "(?:[xｘ#＃~～]|int|ｉｎｔ)", g = "[- ]+", h = "[  \\t]*", l = "(?:,{2}|;)", u = gt + $(e), C = i + a + r + $(e) + d, B = i + s + r + $(o) + d, p = g + $(n) + "#", m = h + l + r + $(t) + d, E = h + "(?:,)+" + r + $(o) + d;
  return u + "|" + C + "|" + B + "|" + p + "|" + m + "|" + E;
}
var ct = "[" + K + "]{" + B0 + "}", lt = "[" + E0 + "]{0,1}(?:[" + GA + "]*[" + K + "]){3,}[" + GA + K + "]*", ut = new RegExp("^[" + E0 + "]{0,1}(?:[" + GA + "]*[" + K + "]){1,2}$", "i"), ht = lt + // Phone number extensions
"(?:" + j2() + ")?", Ct = new RegExp(
  // Either a short two-digit-only phone number
  "^" + ct + "$|^" + ht + "$",
  "i"
);
function mt(A) {
  return A.length >= B0 && Ct.test(A);
}
function wt(A) {
  return ut.test(A);
}
var J0 = new RegExp("(?:" + j2() + ")$", "i");
function It(A) {
  var e = A.search(J0);
  if (e < 0)
    return {};
  for (var t = A.slice(0, e), o = A.match(J0), n = 1; n < o.length; ) {
    if (o[n])
      return {
        number: t,
        ext: o[n]
      };
    n++;
  }
}
var Bt = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "０": "0",
  // Fullwidth digit 0
  "１": "1",
  // Fullwidth digit 1
  "２": "2",
  // Fullwidth digit 2
  "３": "3",
  // Fullwidth digit 3
  "４": "4",
  // Fullwidth digit 4
  "５": "5",
  // Fullwidth digit 5
  "６": "6",
  // Fullwidth digit 6
  "７": "7",
  // Fullwidth digit 7
  "８": "8",
  // Fullwidth digit 8
  "９": "9",
  // Fullwidth digit 9
  "٠": "0",
  // Arabic-indic digit 0
  "١": "1",
  // Arabic-indic digit 1
  "٢": "2",
  // Arabic-indic digit 2
  "٣": "3",
  // Arabic-indic digit 3
  "٤": "4",
  // Arabic-indic digit 4
  "٥": "5",
  // Arabic-indic digit 5
  "٦": "6",
  // Arabic-indic digit 6
  "٧": "7",
  // Arabic-indic digit 7
  "٨": "8",
  // Arabic-indic digit 8
  "٩": "9",
  // Arabic-indic digit 9
  "۰": "0",
  // Eastern-Arabic digit 0
  "۱": "1",
  // Eastern-Arabic digit 1
  "۲": "2",
  // Eastern-Arabic digit 2
  "۳": "3",
  // Eastern-Arabic digit 3
  "۴": "4",
  // Eastern-Arabic digit 4
  "۵": "5",
  // Eastern-Arabic digit 5
  "۶": "6",
  // Eastern-Arabic digit 6
  "۷": "7",
  // Eastern-Arabic digit 7
  "۸": "8",
  // Eastern-Arabic digit 8
  "۹": "9"
  // Eastern-Arabic digit 9
};
function Et(A) {
  return Bt[A];
}
function pt(A, e) {
  var t = typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
  if (t)
    return (t = t.call(A)).next.bind(t);
  if (Array.isArray(A) || (t = ft(A)) || e && A && typeof A.length == "number") {
    t && (A = t);
    var o = 0;
    return function() {
      return o >= A.length ? { done: !0 } : { done: !1, value: A[o++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ft(A, e) {
  if (A) {
    if (typeof A == "string")
      return U0(A, e);
    var t = Object.prototype.toString.call(A).slice(8, -1);
    if (t === "Object" && A.constructor && (t = A.constructor.name), t === "Map" || t === "Set")
      return Array.from(A);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return U0(A, e);
  }
}
function U0(A, e) {
  (e == null || e > A.length) && (e = A.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = A[t];
  return o;
}
function j0(A) {
  for (var e = "", t = pt(A.split("")), o; !(o = t()).done; ) {
    var n = o.value;
    e += Mt(n, e) || "";
  }
  return e;
}
function Mt(A, e, t) {
  if (A === "+") {
    if (e) {
      typeof t == "function" && t("end");
      return;
    }
    return "+";
  }
  return Et(A);
}
function yt(A, e) {
  var t = typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
  if (t)
    return (t = t.call(A)).next.bind(t);
  if (Array.isArray(A) || (t = St(A)) || e && A && typeof A.length == "number") {
    t && (A = t);
    var o = 0;
    return function() {
      return o >= A.length ? { done: !0 } : { done: !1, value: A[o++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function St(A, e) {
  if (A) {
    if (typeof A == "string")
      return T0(A, e);
    var t = Object.prototype.toString.call(A).slice(8, -1);
    if (t === "Object" && A.constructor && (t = A.constructor.name), t === "Map" || t === "Set")
      return Array.from(A);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return T0(A, e);
  }
}
function T0(A, e) {
  (e == null || e > A.length) && (e = A.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = A[t];
  return o;
}
function Qt(A, e) {
  for (var t = A.slice(), o = yt(e), n; !(n = o()).done; ) {
    var i = n.value;
    A.indexOf(i) < 0 && t.push(i);
  }
  return t.sort(function(r, d) {
    return r - d;
  });
}
function f0(A, e) {
  return T2(A, void 0, e);
}
function T2(A, e, t) {
  var o = t.type(e), n = o && o.possibleLengths() || t.possibleLengths();
  if (!n)
    return "IS_POSSIBLE";
  if (e === "FIXED_LINE_OR_MOBILE") {
    if (!t.type("FIXED_LINE"))
      return T2(A, "MOBILE", t);
    var i = t.type("MOBILE");
    i && (n = Qt(n, i.possibleLengths()));
  } else if (e && !o)
    return "INVALID_LENGTH";
  var r = A.length, d = n[0];
  return d === r ? "IS_POSSIBLE" : d > r ? "TOO_SHORT" : n[n.length - 1] < r ? "TOO_LONG" : n.indexOf(r, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}
function bt(A, e, t) {
  if (e === void 0 && (e = {}), t = new G(t), e.v2) {
    if (!A.countryCallingCode)
      throw new Error("Invalid phone number object passed");
    t.selectNumberingPlan(A.countryCallingCode);
  } else {
    if (!A.phone)
      return !1;
    if (A.country) {
      if (!t.hasCountry(A.country))
        throw new Error("Unknown country: ".concat(A.country));
      t.country(A.country);
    } else {
      if (!A.countryCallingCode)
        throw new Error("Invalid phone number object passed");
      t.selectNumberingPlan(A.countryCallingCode);
    }
  }
  if (t.possibleLengths())
    return q2(A.phone || A.nationalNumber, t);
  if (A.countryCallingCode && t.isNonGeographicCallingCode(A.countryCallingCode))
    return !0;
  throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
}
function q2(A, e) {
  switch (f0(A, e)) {
    case "IS_POSSIBLE":
      return !0;
    default:
      return !1;
  }
}
function q(A, e) {
  return A = A || "", new RegExp("^(?:" + e + ")$").test(A);
}
function xt(A, e) {
  var t = typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
  if (t)
    return (t = t.call(A)).next.bind(t);
  if (Array.isArray(A) || (t = Gt(A)) || e && A && typeof A.length == "number") {
    t && (A = t);
    var o = 0;
    return function() {
      return o >= A.length ? { done: !0 } : { done: !1, value: A[o++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gt(A, e) {
  if (A) {
    if (typeof A == "string")
      return q0(A, e);
    var t = Object.prototype.toString.call(A).slice(8, -1);
    if (t === "Object" && A.constructor && (t = A.constructor.name), t === "Map" || t === "Set")
      return Array.from(A);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return q0(A, e);
  }
}
function q0(A, e) {
  (e == null || e > A.length) && (e = A.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = A[t];
  return o;
}
var Lt = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];
function M0(A, e, t) {
  if (e = e || {}, !(!A.country && !A.countryCallingCode)) {
    t = new G(t), t.selectNumberingPlan(A.country, A.countryCallingCode);
    var o = e.v2 ? A.nationalNumber : A.phone;
    if (q(o, t.nationalNumberPattern())) {
      if (qA(o, "FIXED_LINE", t))
        return t.type("MOBILE") && t.type("MOBILE").pattern() === "" || !t.type("MOBILE") || qA(o, "MOBILE", t) ? "FIXED_LINE_OR_MOBILE" : "FIXED_LINE";
      for (var n = xt(Lt), i; !(i = n()).done; ) {
        var r = i.value;
        if (qA(o, r, t))
          return r;
      }
    }
  }
}
function qA(A, e, t) {
  return e = t.type(e), !e || !e.pattern() || e.possibleLengths() && e.possibleLengths().indexOf(A.length) < 0 ? !1 : q(A, e.pattern());
}
function Dt(A, e, t) {
  if (e = e || {}, t = new G(t), t.selectNumberingPlan(A.country, A.countryCallingCode), t.hasTypes())
    return M0(A, e, t.metadata) !== void 0;
  var o = e.v2 ? A.nationalNumber : A.phone;
  return q(o, t.nationalNumberPattern());
}
function Rt(A, e, t) {
  var o = new G(t), n = o.getCountryCodesForCallingCode(A);
  return n ? n.filter(function(i) {
    return Ft(e, i, t);
  }) : [];
}
function Ft(A, e, t) {
  var o = new G(t);
  return o.selectNumberingPlan(e), o.numberingPlan.possibleLengths().indexOf(A.length) >= 0;
}
function kt(A) {
  return A.replace(new RegExp("[".concat(GA, "]+"), "g"), " ").trim();
}
var Kt = /(\$\d)/;
function Ot(A, e, t) {
  var o = t.useInternationalFormat, n = t.withNationalPrefix;
  t.carrierCode, t.metadata;
  var i = A.replace(new RegExp(e.pattern()), o ? e.internationalFormat() : (
    // This library doesn't use `domestic_carrier_code_formatting_rule`,
    // because that one is only used when formatting phone numbers
    // for dialing from a mobile phone, and this is not a dialing library.
    // carrierCode && format.domesticCarrierCodeFormattingRule()
    // 	// First, replace the $CC in the formatting rule with the desired carrier code.
    // 	// Then, replace the $FG in the formatting rule with the first group
    // 	// and the carrier code combined in the appropriate way.
    // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
    // 	: (
    // 		withNationalPrefix && format.nationalPrefixFormattingRule()
    // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
    // 			: format.format()
    // 	)
    n && e.nationalPrefixFormattingRule() ? e.format().replace(Kt, e.nationalPrefixFormattingRule()) : e.format()
  ));
  return o ? kt(i) : i;
}
var Yt = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function vt(A, e, t) {
  var o = new G(t);
  if (o.selectNumberingPlan(A, e), o.defaultIDDPrefix())
    return o.defaultIDDPrefix();
  if (Yt.test(o.IDDPrefix()))
    return o.IDDPrefix();
}
function Ht(A) {
  var e = A.number, t = A.ext;
  if (!e)
    return "";
  if (e[0] !== "+")
    throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
  return "tel:".concat(e).concat(t ? ";ext=" + t : "");
}
function Nt(A, e) {
  var t = typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
  if (t)
    return (t = t.call(A)).next.bind(t);
  if (Array.isArray(A) || (t = Jt(A)) || e && A && typeof A.length == "number") {
    t && (A = t);
    var o = 0;
    return function() {
      return o >= A.length ? { done: !0 } : { done: !1, value: A[o++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Jt(A, e) {
  if (A) {
    if (typeof A == "string")
      return Z0(A, e);
    var t = Object.prototype.toString.call(A).slice(8, -1);
    if (t === "Object" && A.constructor && (t = A.constructor.name), t === "Map" || t === "Set")
      return Array.from(A);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Z0(A, e);
  }
}
function Z0(A, e) {
  (e == null || e > A.length) && (e = A.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = A[t];
  return o;
}
function P0(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(A);
    e && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(A, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function W0(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? P0(Object(t), !0).forEach(function(o) {
      Ut(A, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : P0(Object(t)).forEach(function(o) {
      Object.defineProperty(A, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return A;
}
function Ut(A, e, t) {
  return e in A ? Object.defineProperty(A, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : A[e] = t, A;
}
var z0 = {
  formatExtension: function(e, t, o) {
    return "".concat(e).concat(o.ext()).concat(t);
  }
};
function jt(A, e, t, o) {
  if (t ? t = W0(W0({}, z0), t) : t = z0, o = new G(o), A.country && A.country !== "001") {
    if (!o.hasCountry(A.country))
      throw new Error("Unknown country: ".concat(A.country));
    o.country(A.country);
  } else if (A.countryCallingCode)
    o.selectNumberingPlan(A.countryCallingCode);
  else
    return A.phone || "";
  var n = o.countryCallingCode(), i = t.v2 ? A.nationalNumber : A.phone, r;
  switch (e) {
    case "NATIONAL":
      return i ? (r = LA(i, A.carrierCode, "NATIONAL", o, t), ZA(r, A.ext, o, t.formatExtension)) : "";
    case "INTERNATIONAL":
      return i ? (r = LA(i, null, "INTERNATIONAL", o, t), r = "+".concat(n, " ").concat(r), ZA(r, A.ext, o, t.formatExtension)) : "+".concat(n);
    case "E.164":
      return "+".concat(n).concat(i);
    case "RFC3966":
      return Ht({
        number: "+".concat(n).concat(i),
        ext: A.ext
      });
    case "IDD":
      if (!t.fromCountry)
        return;
      var d = qt(i, A.carrierCode, n, t.fromCountry, o);
      return ZA(d, A.ext, o, t.formatExtension);
    default:
      throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(e, '"'));
  }
}
function LA(A, e, t, o, n) {
  var i = Tt(o.formats(), A);
  return i ? Ot(A, i, {
    useInternationalFormat: t === "INTERNATIONAL",
    withNationalPrefix: !(i.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && n && n.nationalPrefix === !1),
    carrierCode: e,
    metadata: o
  }) : A;
}
function Tt(A, e) {
  for (var t = Nt(A), o; !(o = t()).done; ) {
    var n = o.value;
    if (n.leadingDigitsPatterns().length > 0) {
      var i = n.leadingDigitsPatterns()[n.leadingDigitsPatterns().length - 1];
      if (e.search(i) !== 0)
        continue;
    }
    if (q(e, n.pattern()))
      return n;
  }
}
function ZA(A, e, t, o) {
  return e ? o(A, e, t) : A;
}
function qt(A, e, t, o, n) {
  var i = p0(o, n.metadata);
  if (i === t) {
    var r = LA(A, e, "NATIONAL", n);
    return t === "1" ? t + " " + r : r;
  }
  var d = vt(o, void 0, n.metadata);
  if (d)
    return "".concat(d, " ").concat(t, " ").concat(LA(A, null, "INTERNATIONAL", n));
}
function X0(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(A);
    e && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(A, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function V0(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? X0(Object(t), !0).forEach(function(o) {
      Zt(A, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : X0(Object(t)).forEach(function(o) {
      Object.defineProperty(A, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return A;
}
function Zt(A, e, t) {
  return e in A ? Object.defineProperty(A, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : A[e] = t, A;
}
function Pt(A, e) {
  if (!(A instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function $0(A, e) {
  for (var t = 0; t < e.length; t++) {
    var o = e[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(A, o.key, o);
  }
}
function Wt(A, e, t) {
  return e && $0(A.prototype, e), t && $0(A, t), Object.defineProperty(A, "prototype", { writable: !1 }), A;
}
var zt = /* @__PURE__ */ function() {
  function A(e, t, o) {
    if (Pt(this, A), !e)
      throw new TypeError("`country` or `countryCallingCode` not passed");
    if (!t)
      throw new TypeError("`nationalNumber` not passed");
    if (!o)
      throw new TypeError("`metadata` not passed");
    var n = Vt(e, o), i = n.country, r = n.countryCallingCode;
    this.country = i, this.countryCallingCode = r, this.nationalNumber = t, this.number = "+" + this.countryCallingCode + this.nationalNumber, this.getMetadata = function() {
      return o;
    };
  }
  return Wt(A, [{
    key: "setExt",
    value: function(t) {
      this.ext = t;
    }
  }, {
    key: "getPossibleCountries",
    value: function() {
      return this.country ? [this.country] : Rt(this.countryCallingCode, this.nationalNumber, this.getMetadata());
    }
  }, {
    key: "isPossible",
    value: function() {
      return bt(this, {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "isValid",
    value: function() {
      return Dt(this, {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "isNonGeographic",
    value: function() {
      var t = new G(this.getMetadata());
      return t.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function(t) {
      return this.number === t.number && this.ext === t.ext;
    }
    // This function was originally meant to be an equivalent for `validatePhoneNumberLength()`,
    // but later it was found out that it doesn't include the possible `TOO_SHORT` result
    // returned from `parsePhoneNumberWithError()` in the original `validatePhoneNumberLength()`,
    // so eventually I simply commented out this method from the `PhoneNumber` class
    // and just left the `validatePhoneNumberLength()` function, even though that one would require
    // and additional step to also validate the actual country / calling code of the phone number.
    // validateLength() {
    // 	const metadata = new Metadata(this.getMetadata())
    // 	metadata.selectNumberingPlan(this.countryCallingCode)
    // 	const result = checkNumberLength(this.nationalNumber, metadata)
    // 	if (result !== 'IS_POSSIBLE') {
    // 		return result
    // 	}
    // }
  }, {
    key: "getType",
    value: function() {
      return M0(this, {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "format",
    value: function(t, o) {
      return jt(this, t, o ? V0(V0({}, o), {}, {
        v2: !0
      }) : {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "formatNational",
    value: function(t) {
      return this.format("NATIONAL", t);
    }
  }, {
    key: "formatInternational",
    value: function(t) {
      return this.format("INTERNATIONAL", t);
    }
  }, {
    key: "getURI",
    value: function(t) {
      return this.format("RFC3966", t);
    }
  }]), A;
}(), Xt = function(e) {
  return /^[A-Z]{2}$/.test(e);
};
function Vt(A, e) {
  var t, o, n = new G(e);
  return Xt(A) ? (t = A, n.selectNumberingPlan(t), o = n.countryCallingCode()) : o = A, {
    country: t,
    countryCallingCode: o
  };
}
var $t = new RegExp("([" + K + "])");
function _t(A, e, t, o) {
  if (e) {
    var n = new G(o);
    n.selectNumberingPlan(e, t);
    var i = new RegExp(n.IDDPrefix());
    if (A.search(i) === 0) {
      A = A.slice(A.match(i)[0].length);
      var r = A.match($t);
      if (!(r && r[1] != null && r[1].length > 0 && r[1] === "0"))
        return A;
    }
  }
}
function Ao(A, e) {
  if (A && e.numberingPlan.nationalPrefixForParsing()) {
    var t = new RegExp("^(?:" + e.numberingPlan.nationalPrefixForParsing() + ")"), o = t.exec(A);
    if (o) {
      var n, i, r = o.length - 1, d = r > 0 && o[r];
      if (e.nationalPrefixTransformRule() && d)
        n = A.replace(t, e.nationalPrefixTransformRule()), r > 1 && (i = o[1]);
      else {
        var a = o[0];
        n = A.slice(a.length), d && (i = o[1]);
      }
      var s;
      if (d) {
        var g = A.indexOf(o[1]), h = A.slice(0, g);
        h === e.numberingPlan.nationalPrefix() && (s = e.numberingPlan.nationalPrefix());
      } else
        s = o[0];
      return {
        nationalNumber: n,
        nationalPrefix: s,
        carrierCode: i
      };
    }
  }
  return {
    nationalNumber: A
  };
}
function d0(A, e) {
  var t = Ao(A, e), o = t.carrierCode, n = t.nationalNumber;
  if (n !== A) {
    if (!eo(A, n, e))
      return {
        nationalNumber: A
      };
    if (e.possibleLengths() && !to(n, e))
      return {
        nationalNumber: A
      };
  }
  return {
    nationalNumber: n,
    carrierCode: o
  };
}
function eo(A, e, t) {
  return !(q(A, t.nationalNumberPattern()) && !q(e, t.nationalNumberPattern()));
}
function to(A, e) {
  switch (f0(A, e)) {
    case "TOO_SHORT":
    case "INVALID_LENGTH":
      return !1;
    default:
      return !0;
  }
}
function oo(A, e, t, o) {
  var n = e ? p0(e, o) : t;
  if (A.indexOf(n) === 0) {
    o = new G(o), o.selectNumberingPlan(e, t);
    var i = A.slice(n.length), r = d0(i, o), d = r.nationalNumber, a = d0(A, o), s = a.nationalNumber;
    if (!q(s, o.nationalNumberPattern()) && q(d, o.nationalNumberPattern()) || f0(s, o) === "TOO_LONG")
      return {
        countryCallingCode: n,
        number: i
      };
  }
  return {
    number: A
  };
}
function no(A, e, t, o) {
  if (!A)
    return {};
  var n;
  if (A[0] !== "+") {
    var i = _t(A, e, t, o);
    if (i && i !== A)
      n = !0, A = "+" + i;
    else {
      if (e || t) {
        var r = oo(A, e, t, o), d = r.countryCallingCode, a = r.number;
        if (d)
          return {
            countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
            countryCallingCode: d,
            number: a
          };
      }
      return {
        // No need to set it to `UNSPECIFIED`. It can be just `undefined`.
        // countryCallingCodeSource: 'UNSPECIFIED',
        number: A
      };
    }
  }
  if (A[1] === "0")
    return {};
  o = new G(o);
  for (var s = 2; s - 1 <= P1 && s <= A.length; ) {
    var g = A.slice(1, s);
    if (o.hasCallingCode(g))
      return o.selectNumberingPlan(g), {
        countryCallingCodeSource: n ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
        countryCallingCode: g,
        number: A.slice(s)
      };
    s++;
  }
  return {};
}
function io(A, e) {
  var t = typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
  if (t)
    return (t = t.call(A)).next.bind(t);
  if (Array.isArray(A) || (t = ro(A)) || e && A && typeof A.length == "number") {
    t && (A = t);
    var o = 0;
    return function() {
      return o >= A.length ? { done: !0 } : { done: !1, value: A[o++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ro(A, e) {
  if (A) {
    if (typeof A == "string")
      return _0(A, e);
    var t = Object.prototype.toString.call(A).slice(8, -1);
    if (t === "Object" && A.constructor && (t = A.constructor.name), t === "Map" || t === "Set")
      return Array.from(A);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return _0(A, e);
  }
}
function _0(A, e) {
  (e == null || e > A.length) && (e = A.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = A[t];
  return o;
}
function ao(A, e) {
  var t = e.countries, o = e.defaultCountry, n = e.metadata;
  n = new G(n);
  for (var i = [], r = io(t), d; !(d = r()).done; ) {
    var a = d.value;
    if (n.country(a), n.leadingDigits()) {
      if (A && A.search(n.leadingDigits()) === 0)
        return a;
    } else if (M0({
      phone: A,
      country: a
    }, void 0, n.metadata))
      if (o) {
        if (a === o)
          return a;
        i.push(a);
      } else
        return a;
  }
  if (i.length > 0)
    return i[0];
}
var so = !1;
function go(A, e) {
  var t = e.nationalNumber, o = e.defaultCountry, n = e.metadata;
  if (so && n.isNonGeographicCallingCode(A))
    return "001";
  var i = n.getCountryCodesForCallingCode(A);
  if (i)
    return i.length === 1 ? i[0] : ao(t, {
      countries: i,
      defaultCountry: o,
      metadata: n.metadata
    });
}
var Z2 = "+", co = "[\\-\\.\\(\\)]?", A2 = "([" + K + "]|" + co + ")", lo = "^\\" + Z2 + A2 + "*[" + K + "]" + A2 + "*$", uo = new RegExp(lo, "g"), a0 = K, ho = "[" + a0 + "]+((\\-)*[" + a0 + "])*", Co = "a-zA-Z", mo = "[" + Co + "]+((\\-)*[" + a0 + "])*", wo = "^(" + ho + "\\.)*" + mo + "\\.?$", Io = new RegExp(wo, "g"), e2 = "tel:", s0 = ";phone-context=", Bo = ";isub=";
function Eo(A) {
  var e = A.indexOf(s0);
  if (e < 0)
    return null;
  var t = e + s0.length;
  if (t >= A.length)
    return "";
  var o = A.indexOf(";", t);
  return o >= 0 ? A.substring(t, o) : A.substring(t);
}
function po(A) {
  return A === null ? !0 : A.length === 0 ? !1 : uo.test(A) || Io.test(A);
}
function fo(A, e) {
  var t = e.extractFormattedPhoneNumber, o = Eo(A);
  if (!po(o))
    throw new j("NOT_A_NUMBER");
  var n;
  if (o === null)
    n = t(A) || "";
  else {
    n = "", o.charAt(0) === Z2 && (n += o);
    var i = A.indexOf(e2), r;
    i >= 0 ? r = i + e2.length : r = 0;
    var d = A.indexOf(s0);
    n += A.substring(r, d);
  }
  var a = n.indexOf(Bo);
  if (a > 0 && (n = n.substring(0, a)), n !== "")
    return n;
}
var Mo = 250, yo = new RegExp("[" + E0 + K + "]"), So = new RegExp("[^" + K + "#]+$");
function Qo(A, e, t) {
  if (e = e || {}, t = new G(t), e.defaultCountry && !t.hasCountry(e.defaultCountry))
    throw e.v2 ? new j("INVALID_COUNTRY") : new Error("Unknown country: ".concat(e.defaultCountry));
  var o = xo(A, e.v2, e.extract), n = o.number, i = o.ext, r = o.error;
  if (!n) {
    if (e.v2)
      throw r === "TOO_SHORT" ? new j("TOO_SHORT") : new j("NOT_A_NUMBER");
    return {};
  }
  var d = Lo(n, e.defaultCountry, e.defaultCallingCode, t), a = d.country, s = d.nationalNumber, g = d.countryCallingCode, h = d.countryCallingCodeSource, l = d.carrierCode;
  if (!t.hasSelectedNumberingPlan()) {
    if (e.v2)
      throw new j("INVALID_COUNTRY");
    return {};
  }
  if (!s || s.length < B0) {
    if (e.v2)
      throw new j("TOO_SHORT");
    return {};
  }
  if (s.length > Z1) {
    if (e.v2)
      throw new j("TOO_LONG");
    return {};
  }
  if (e.v2) {
    var u = new zt(g, s, t.metadata);
    return a && (u.country = a), l && (u.carrierCode = l), i && (u.ext = i), u.__countryCallingCodeSource = h, u;
  }
  var C = (e.extended ? t.hasSelectedNumberingPlan() : a) ? q(s, t.nationalNumberPattern()) : !1;
  return e.extended ? {
    country: a,
    countryCallingCode: g,
    carrierCode: l,
    valid: C,
    possible: C ? !0 : !!(e.extended === !0 && t.possibleLengths() && q2(s, t)),
    phone: s,
    ext: i
  } : C ? Go(a, s, i) : {};
}
function bo(A, e, t) {
  if (A) {
    if (A.length > Mo) {
      if (t)
        throw new j("TOO_LONG");
      return;
    }
    if (e === !1)
      return A;
    var o = A.search(yo);
    if (!(o < 0))
      return A.slice(o).replace(So, "");
  }
}
function xo(A, e, t) {
  var o = fo(A, {
    extractFormattedPhoneNumber: function(r) {
      return bo(r, t, e);
    }
  });
  if (!o)
    return {};
  if (!mt(o))
    return wt(o) ? {
      error: "TOO_SHORT"
    } : {};
  var n = It(o);
  return n.ext ? n : {
    number: o
  };
}
function Go(A, e, t) {
  var o = {
    country: A,
    phone: e
  };
  return t && (o.ext = t), o;
}
function Lo(A, e, t, o) {
  var n = no(j0(A), e, t, o.metadata), i = n.countryCallingCodeSource, r = n.countryCallingCode, d = n.number, a;
  if (r)
    o.selectNumberingPlan(r);
  else if (d && (e || t))
    o.selectNumberingPlan(e, t), e && (a = e), r = t || p0(e, o.metadata);
  else
    return {};
  if (!d)
    return {
      countryCallingCodeSource: i,
      countryCallingCode: r
    };
  var s = d0(j0(d), o), g = s.nationalNumber, h = s.carrierCode, l = go(r, {
    nationalNumber: g,
    defaultCountry: e,
    metadata: o
  });
  return l && (a = l, l === "001" || o.country(a)), {
    country: a,
    countryCallingCode: r,
    countryCallingCodeSource: i,
    nationalNumber: g,
    carrierCode: h
  };
}
function t2(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(A);
    e && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(A, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function o2(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? t2(Object(t), !0).forEach(function(o) {
      Do(A, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : t2(Object(t)).forEach(function(o) {
      Object.defineProperty(A, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return A;
}
function Do(A, e, t) {
  return e in A ? Object.defineProperty(A, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : A[e] = t, A;
}
function Ro(A, e, t) {
  return Qo(A, o2(o2({}, e), {}, {
    v2: !0
  }), t);
}
function n2(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(A);
    e && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(A, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function Fo(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? n2(Object(t), !0).forEach(function(o) {
      ko(A, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : n2(Object(t)).forEach(function(o) {
      Object.defineProperty(A, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return A;
}
function ko(A, e, t) {
  return e in A ? Object.defineProperty(A, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : A[e] = t, A;
}
function Ko(A, e) {
  return Ho(A) || vo(A, e) || Yo(A, e) || Oo();
}
function Oo() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Yo(A, e) {
  if (A) {
    if (typeof A == "string")
      return i2(A, e);
    var t = Object.prototype.toString.call(A).slice(8, -1);
    if (t === "Object" && A.constructor && (t = A.constructor.name), t === "Map" || t === "Set")
      return Array.from(A);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return i2(A, e);
  }
}
function i2(A, e) {
  (e == null || e > A.length) && (e = A.length);
  for (var t = 0, o = new Array(e); t < e; t++)
    o[t] = A[t];
  return o;
}
function vo(A, e) {
  var t = A == null ? null : typeof Symbol < "u" && A[Symbol.iterator] || A["@@iterator"];
  if (t != null) {
    var o = [], n = !0, i = !1, r, d;
    try {
      for (t = t.call(A); !(n = (r = t.next()).done) && (o.push(r.value), !(e && o.length === e)); n = !0)
        ;
    } catch (a) {
      i = !0, d = a;
    } finally {
      try {
        !n && t.return != null && t.return();
      } finally {
        if (i)
          throw d;
      }
    }
    return o;
  }
}
function Ho(A) {
  if (Array.isArray(A))
    return A;
}
function No(A) {
  var e = Array.prototype.slice.call(A), t = Ko(e, 4), o = t[0], n = t[1], i = t[2], r = t[3], d, a, s;
  if (typeof o == "string")
    d = o;
  else
    throw new TypeError("A text for parsing must be a string.");
  if (!n || typeof n == "string")
    r ? (a = i, s = r) : (a = void 0, s = i), n && (a = Fo({
      defaultCountry: n
    }, a));
  else if (yA(n))
    i ? (a = n, s = i) : s = n;
  else
    throw new Error("Invalid second argument: ".concat(n));
  return {
    text: d,
    options: a,
    metadata: s
  };
}
function r2(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(A);
    e && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(A, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function d2(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? r2(Object(t), !0).forEach(function(o) {
      Jo(A, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : r2(Object(t)).forEach(function(o) {
      Object.defineProperty(A, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return A;
}
function Jo(A, e, t) {
  return e in A ? Object.defineProperty(A, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : A[e] = t, A;
}
function Uo(A, e, t) {
  e && e.defaultCountry && !st(e.defaultCountry, t) && (e = d2(d2({}, e), {}, {
    defaultCountry: void 0
  }));
  try {
    return Ro(A, e, t);
  } catch (o) {
    if (!(o instanceof j))
      throw o;
  }
}
function a2(A, e) {
  var t = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(A);
    e && (o = o.filter(function(n) {
      return Object.getOwnPropertyDescriptor(A, n).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function s2(A) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? a2(Object(t), !0).forEach(function(o) {
      jo(A, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : a2(Object(t)).forEach(function(o) {
      Object.defineProperty(A, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return A;
}
function jo(A, e, t) {
  return e in A ? Object.defineProperty(A, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : A[e] = t, A;
}
function To() {
  var A = No(arguments), e = A.text, t = A.options, o = A.metadata;
  t = s2(s2({}, t), {}, {
    extract: !1
  });
  var n = Uo(e, t, o);
  return n && n.isValid() || !1;
}
function qo() {
  return H1(To, arguments);
}
const Zo = ({
  gdprChecked: A,
  setGdprChecked: e,
  policyUrl: t
}) => /* @__PURE__ */ M("div", { id: "gdpr-container", tabIndex: 4, children: [
  /* @__PURE__ */ c(
    "input",
    {
      type: "checkbox",
      id: "gdpr-checkbox",
      name: "gdpr-checkbox",
      checked: A,
      onclick: () => {
        e(!A);
      }
    }
  ),
  /* @__PURE__ */ M("p", { id: "gdpr", children: [
    f("sms_web_widget_opt_in_privacy_message"),
    " ",
    /* @__PURE__ */ c(
      "a",
      {
        id: "gdpr-link",
        target: "_blank",
        rel: "nofollow",
        href: t,
        children: f("sms_web_widget_opt_in_privacy")
      }
    ),
    "."
  ] })
] }), Po = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABDBAMAAACYZb3pAAAAHlBMVEUpQqK2q8384OL3qa/tKTkAI5Wrt9z////5t7ztKTlzpJCAAAAABXRSTlP++vjs1BQWlgsAAAAxSURBVHgBYmRAA4yKaAJCAugqQgHtyzENAAAAAiD7pzaDr4MfRVEURVGU36IoipK5FLWNJ6UFusbWAAAAAElFTkSuQmCC", Wo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABDBAMAAACYZb3pAAAAG1BMVEUAjEXNISr///+w28btsbQGj0nOJi/us7ay3MeN20/LAAAANUlEQVR4Xu3LQQkAIBQFMMEEVrCJIQQTGOHn9/4iyHZfS32GNcLPRVEURVEURVEUZYeTpW54TrXyh6E3f4sAAAAASUVORK5CYII=", zo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA8AgMAAADtUfddAAAACVBMVEUAAADdAAD/zgDGIigcAAAAHElEQVR4AWMAgVEwCkJxgRElMyqzChcYSTKjMgBDzfIcJWmM/AAAAABJRU5ErkJggg==", Xo = {
  FR: Po,
  IT: Wo,
  DE: zo
}, Vo = new Map(Object.entries(Xo)), $o = ({
  country: A,
  phoneValue: e,
  setPhoneValue: t,
  isValidPhoneValue: o
}) => {
  const [n, i] = x(!1), [r, d] = x(!1), a = () => d(!0), s = () => {
    const u = e !== "";
    d(u), i(u);
  }, h = r && n && o() === !1, l = (u) => {
    u.target.value = u.target.value.replaceAll(/\D/g, ""), t(u.target.value);
  };
  return /* @__PURE__ */ M(
    "div",
    {
      className: `input-container input-border ${h ? "input-border-error" : ""}`,
      id: "phone-input-container",
      children: [
        /* @__PURE__ */ M("div", { id: "phone-code-input-label", children: [
          /* @__PURE__ */ M("div", { id: "phone-code-input", children: [
            /* @__PURE__ */ c(
              "span",
              {
                className: `phone-code ${r ? "" : "hide-code"}`,
                children: A.code
              }
            ),
            /* @__PURE__ */ c(
              "input",
              {
                required: !0,
                type: "tel",
                id: "phone-input",
                className: "form-input",
                value: e,
                oninput: l,
                onfocus: a,
                onblur: s,
                tabIndex: 2
              }
            ),
            h && /* @__PURE__ */ c("span", { id: "phone-input-error", children: f("sms_web_widget_error_invalid_number") })
          ] }),
          /* @__PURE__ */ c(
            "label",
            {
              className: `input-label ${r ? "label-as-header" : ""} ${h ? "phone-label-error" : ""}`,
              id: "phone-input-label",
              children: f("sms_web_widget_phone_input")
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { id: "country-select-container", children: /* @__PURE__ */ c(
          "img",
          {
            id: "country-flag",
            src: Vo.get(A.isoAlpha2)
          }
        ) })
      ]
    }
  );
}, _o = ({ nameValue: A, setNameValue: e }) => /* @__PURE__ */ M("div", { className: "input-container input-border", children: [
  /* @__PURE__ */ c(
    "input",
    {
      required: !0,
      className: "form-input",
      value: A,
      oninput: (o) => {
        e(o.target.value);
      },
      tabIndex: 1,
      maxLength: 50
    }
  ),
  /* @__PURE__ */ c("label", { className: "input-label", children: f("sms_web_widget_name_input") })
] }), An = ({
  messageValue: A,
  setMessageValue: e,
  textareaRef: t,
  textareaContainerRef: o
}) => /* @__PURE__ */ M(
  "div",
  {
    className: "input-container input-border",
    style: "max-height: 90px;",
    ref: o,
    children: [
      /* @__PURE__ */ c(
        "textarea",
        {
          required: !0,
          id: "message-input",
          className: "form-input",
          value: A,
          oninput: (d) => {
            e(d.target.value), t.current && (t.current.style.height = "22px", t.current.style.height = `${d.target.scrollHeight}px`, o.current.style.height = `${d.target.scrollHeight + 6}px`);
          },
          tabIndex: 3,
          style: "max-height: 90px;",
          ref: t
        }
      ),
      /* @__PURE__ */ c("label", { className: "input-label", children: f("sms_web_widget_message_input") })
    ]
  }
), en = ({
  requestBody: A,
  isFormValid: e,
  setModalState: t,
  token: o,
  isPreview: n
}) => {
  const i = l1(o), r = {
    name: A.name,
    phone: A.phone_number,
    message: A.message
  }, d = (g, h) => {
    g.ok ? h() : g.status === 401 || g.status === 404 ? t({ state: N.INVALID_WIDGET, body: r }) : a();
  }, a = () => {
    t({ state: N.FAIL_RESPONSE, body: r });
  };
  return /* @__PURE__ */ c(
    "button",
    {
      id: "send-button",
      className: `widget-button ${e ? "enabled" : "disabled"}-button`,
      disabled: !e,
      onclick: () => {
        if (e !== !1) {
          if (n) {
            t({
              state: N.SUCCESS,
              body: r
            });
            return;
          }
          if (i === null) {
            t({ state: N.INVALID_WIDGET, body: r });
            return;
          }
          fetch(i, { method: "head" }).then((g) => {
            const h = {
              method: "post",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(A)
            };
            d(g, () => {
              fetch(i, h).then(
                (l) => d(
                  l,
                  () => t({
                    state: N.SUCCESS,
                    body: r
                  })
                )
              ).catch(a);
            });
          }).catch(a);
        }
      },
      tabIndex: 5,
      children: f("sms_web_widget_button_send_message")
    }
  );
}, tn = ({ body: A, setModalState: e, options: t }) => {
  const o = F2[t.country], [n, i] = x(A.name), [r, d] = x(A.phone), [a, s] = x(A.message), [g, h] = x(!1), l = _A(null), u = _A(null);
  _(() => {
    function E(w) {
      w.target.matches(cA) && w.stopPropagation();
    }
    return document.addEventListener("keydown", E, !1), () => {
      document.removeEventListener("keydown", E);
    };
  }, []);
  const C = () => qo(o.code + r, o.isoAlpha2), p = C() && [n, a].every((E) => E.trim() !== "") && g, m = {
    name: n,
    message: a,
    phone_number: `${o.code}${r}`
  };
  return /* @__PURE__ */ M("div", { id: "form-container", children: [
    /* @__PURE__ */ M("form", { id: "form-bubble", children: [
      /* @__PURE__ */ c(_o, { nameValue: n, setNameValue: i }),
      /* @__PURE__ */ c(
        $o,
        {
          country: o,
          phoneValue: r,
          setPhoneValue: d,
          isValidPhoneValue: C
        }
      ),
      /* @__PURE__ */ c(
        An,
        {
          messageValue: a,
          setMessageValue: s,
          textareaRef: l,
          textareaContainerRef: u
        }
      )
    ] }),
    /* @__PURE__ */ c(
      Zo,
      {
        gdprChecked: g,
        setGdprChecked: h,
        policyUrl: t.policyUrl
      }
    ),
    /* @__PURE__ */ c(
      en,
      {
        requestBody: m,
        isFormValid: p,
        setModalState: e,
        token: t.token,
        isPreview: t.isPreview
      }
    )
  ] });
}, on = "data:image/svg+xml,%3csvg%20width='14'%20height='12'%20viewBox='0%200%2014%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.06641%206.24216C0.929688%206.10544%200.875%205.94138%200.875%205.74997C0.875%205.58591%200.929688%205.42184%201.06641%205.28513L5.87891%200.691376C6.15234%200.445282%206.5625%200.445282%206.80859%200.718719C7.05469%200.964813%207.05469%201.40231%206.78125%201.64841L3.14453%205.09372H12.4688C12.8242%205.09372%2013.125%205.3945%2013.125%205.74997C13.125%206.13278%2012.8242%206.40622%2012.4688%206.40622H3.14453L6.78125%209.87888C7.05469%2010.125%207.05469%2010.5351%206.80859%2010.8086C6.5625%2011.082%206.15234%2011.082%205.87891%2010.8359L1.06641%206.24216Z'%20fill='white'/%3e%3c/svg%3e", nn = "data:image/svg+xml,%3csvg%20width='10'%20height='16'%20viewBox='0%200%2010%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.902344%207.65234L7.65234%200.9375C7.96875%200.585938%208.49609%200.585938%208.84766%200.9375C9.16406%201.25391%209.16406%201.78125%208.84766%202.09766L2.66016%208.25L8.8125%2014.4375C9.16406%2014.7539%209.16406%2015.2812%208.8125%2015.5977C8.49609%2015.9492%207.96875%2015.9492%207.65234%2015.5977L0.902344%208.84766C0.550781%208.53125%200.550781%208.00391%200.902344%207.65234Z'%20fill='white'/%3e%3c/svg%3e", dA = ({
  title: A,
  description: e = "",
  backAction: t = null
}) => /* @__PURE__ */ c("div", { className: "header-container", children: /* @__PURE__ */ M("div", { id: "header-title-container", children: [
  t && rn(t),
  /* @__PURE__ */ M("div", { id: "header-text", children: [
    /* @__PURE__ */ c("p", { id: "header-header", children: A }),
    /* @__PURE__ */ c("p", { id: "header-subtitle", children: e })
  ] })
] }) }), rn = (A) => {
  const { isBelowProvidedDevices: e } = wA(mA);
  return /* @__PURE__ */ c("button", { id: "header-arrow-button", onclick: A, children: /* @__PURE__ */ c("img", { src: e ? nn : on, alt: "" }) });
}, dn = ({
  body: A,
  setSMSModalState: e,
  backAction: t = null,
  options: o
}) => {
  const n = f("sms_web_widget_title"), i = f("sms_web_widget_description");
  return /* @__PURE__ */ M("div", { className: "modal-body", children: [
    /* @__PURE__ */ c(
      dA,
      {
        title: n,
        description: i,
        backAction: t
      }
    ),
    /* @__PURE__ */ c(
      tn,
      {
        body: A,
        setModalState: e,
        options: o
      }
    )
  ] });
}, an = () => /* @__PURE__ */ M("div", { id: "success-background-container", children: [
  /* @__PURE__ */ c("div", { id: "success-canvas", className: "success-background" }),
  /* @__PURE__ */ c("div", { id: "success-gradient", className: "success-background" })
] }), sn = "data:image/gif;base64,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", gn = () => /* @__PURE__ */ c("div", { id: "success-content-container", className: "modal-body sms-body", children: /* @__PURE__ */ M("div", { id: "success-content", children: [
  /* @__PURE__ */ c("div", { id: "success-icon-container", children: /* @__PURE__ */ c("img", { id: "success-icon", src: sn, alt: "" }) }),
  /* @__PURE__ */ c("p", { id: "success-header", children: f(
    "sms_web_widget_sent_message_confirmation_title"
  ) }),
  /* @__PURE__ */ c("p", { id: "success-message", children: f(
    "sms_web_widget_sent_message_confirmation_description"
  ) })
] }) }), cn = ({ form: A, backAction: e }) => {
  const t = f("sms_web_widget_title"), o = f("sms_web_widget_description");
  return /* @__PURE__ */ M("div", { id: "success-body", className: "modal-body sms-body", children: [
    /* @__PURE__ */ c(gn, {}),
    /* @__PURE__ */ c(an, {}),
    /* @__PURE__ */ c("div", { id: "succcess-form", className: "modal-body", children: A }),
    /* @__PURE__ */ c("div", { id: "success-form-header", children: /* @__PURE__ */ c(dA, { title: t, description: o, backAction: e }) })
  ] });
}, ln = "data:image/svg+xml,%3csvg%20width='321'%20height='140'%20viewBox='0%200%20321%20140'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M88.85%20127.209C88.85%20132.433%2093.1%20136.683%2098.324%20136.683H223.483C228.707%20136.683%20232.957%20132.433%20232.957%20127.209C232.957%20126.836%20232.642%20126.522%20232.27%20126.522H224.181H215.636H106.17H97.625H89.537C89.164%20126.522%2088.85%20126.836%2088.85%20127.209ZM109.404%20123.288H212.403V60.0113C212.403%2058.3563%20211.056%2057.0083%20209.401%2057.0083H112.406C110.75%2057.0083%20109.404%2058.3563%20109.404%2060.0113V123.288ZM107.269%2048.2333C103.735%2048.2333%20100.859%2051.1093%20100.859%2054.6443V123.288H106.17V60.0113C106.17%2056.5733%20108.968%2053.7763%20112.406%2053.7763H209.401C212.839%2053.7763%20215.636%2056.5733%20215.636%2060.0113V123.288H220.948V54.6443C220.948%2051.1093%20218.072%2048.2333%20214.537%2048.2333H107.269ZM236.19%20127.209C236.19%20130.971%20234.546%20134.355%20231.939%20136.683H256.282C257.175%20136.683%20257.899%20137.407%20257.899%20138.3C257.899%20139.193%20257.175%20139.916%20256.282%20139.916H223.483H98.324H67.372C66.479%20139.916%2065.756%20139.193%2065.756%20138.3C65.756%20137.407%2066.479%20136.683%2067.372%20136.683H89.867C87.261%20134.355%2085.616%20130.971%2085.616%20127.209C85.616%20125.047%2087.375%20123.288%2089.537%20123.288H97.625V54.6443C97.625%2049.3263%20101.952%2044.9993%20107.269%2044.9993H214.537C219.855%2044.9993%20224.181%2049.3263%20224.181%2054.6443V123.288H232.27C234.431%20123.288%20236.19%20125.047%20236.19%20127.209ZM151%2086C149.622%2086%20148.5%2087.1219%20148.5%2088.4991C148.5%2089.878%20149.622%2091%20151%2091C152.379%2091%20153.5%2089.878%20153.5%2088.4991C153.5%2087.1219%20152.379%2086%20151%2086ZM157.785%20128.832H173.489C174.382%20128.832%20175.106%20129.556%20175.106%20130.448C175.106%20131.341%20174.382%20132.065%20173.489%20132.065H157.785C156.892%20132.065%20156.169%20131.341%20156.169%20130.448C156.169%20129.556%20156.892%20128.832%20157.785%20128.832ZM37.3498%20136.683H34.1168C33.2238%20136.683%2032.4998%20137.407%2032.4998%20138.3C32.4998%20139.193%2033.2238%20139.916%2034.1168%20139.916H37.3498C38.2428%20139.916%2038.9668%20139.193%2038.9668%20138.3C38.9668%20137.407%2038.2428%20136.683%2037.3498%20136.683ZM45.2024%20136.683H58.8274C59.7204%20136.683%2060.4444%20137.407%2060.4444%20138.3C60.4444%20139.193%2059.7204%20139.916%2058.8274%20139.916H45.2024C44.3084%20139.916%2043.5854%20139.193%2043.5854%20138.3C43.5854%20137.407%2044.3084%20136.683%2045.2024%20136.683ZM264.596%20136.683H275.45C276.343%20136.683%20277.067%20137.407%20277.067%20138.3C277.067%20139.193%20276.343%20139.916%20275.45%20139.916H264.596C263.703%20139.916%20262.979%20139.193%20262.979%20138.3C262.979%20137.407%20263.703%20136.683%20264.596%20136.683ZM151.55%20128.832H148.317C147.424%20128.832%20146.7%20129.556%20146.7%20130.448C146.7%20131.341%20147.424%20132.065%20148.317%20132.065H151.55C152.443%20132.065%20153.167%20131.341%20153.167%20130.448C153.167%20129.556%20152.443%20128.832%20151.55%20128.832ZM284.226%20136.683H287.459C288.352%20136.683%20289.076%20137.407%20289.076%20138.3C289.076%20139.193%20288.352%20139.916%20287.459%20139.916H284.226C283.333%20139.916%20282.609%20139.193%20282.609%20138.3C282.609%20137.407%20283.333%20136.683%20284.226%20136.683ZM167.5%2088.4991C167.5%2087.1219%20168.622%2086%20170%2086C171.379%2086%20172.5%2087.1219%20172.5%2088.4991C172.5%2089.878%20171.379%2091%20170%2091C168.622%2091%20167.5%2089.878%20167.5%2088.4991ZM167.324%2097H153.911C153.133%2097%20152.5%2097.633%20152.5%2098.41C152.5%2099.188%20153.133%2099.821%20153.911%2099.821H167.324C168.102%2099.821%20168.735%2099.188%20168.735%2098.41C168.735%2097.633%20168.102%2097%20167.324%2097Z'%20fill='%237F8EA4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M119.663%206.504H117.815C117.496%206.504%20117.238%206.245%20117.238%205.927C117.238%205.608%20117.496%205.349%20117.815%205.349H119.663L120.586%204.425V2.578C120.586%202.259%20120.845%202%20121.164%202C121.483%202%20121.741%202.259%20121.741%202.578V4.425L122.665%205.349H124.512C124.832%205.349%20125.09%205.608%20125.09%205.927C125.09%206.245%20124.832%206.504%20124.512%206.504H122.665L121.741%207.428V9.275C121.741%209.594%20121.483%209.853%20121.164%209.853C120.845%209.853%20120.586%209.594%20120.586%209.275V7.428L119.663%206.504ZM67.1638%2018.154C66.7208%2018.597%2066.1328%2018.84%2065.5068%2018.84C64.8808%2018.84%2064.2928%2018.597%2063.8498%2018.154C63.4078%2017.711%2063.1638%2017.123%2063.1638%2016.497C63.1638%2015.871%2063.4078%2015.282%2063.8498%2014.84C64.2598%2014.43%2064.8048%2014.188%2065.3838%2014.157C65.5708%2014.15%2065.7378%2014.294%2065.7478%2014.486C65.7578%2014.676%2065.6108%2014.839%2065.4208%2014.849C65.0128%2014.87%2064.6288%2015.041%2064.3398%2015.33C64.0278%2015.642%2063.8568%2016.057%2063.8568%2016.497C63.8568%2016.938%2064.0278%2017.353%2064.3398%2017.664C64.6518%2017.976%2065.0668%2018.148%2065.5068%2018.148C65.9478%2018.148%2066.3618%2017.976%2066.6738%2017.664C66.9858%2017.353%2067.1568%2016.938%2067.1568%2016.497C67.1568%2016.057%2066.9858%2015.642%2066.6738%2015.33C66.5388%2015.194%2066.5388%2014.976%2066.6738%2014.84C66.8088%2014.705%2067.0278%2014.705%2067.1638%2014.84C67.6068%2015.282%2067.8498%2015.871%2067.8498%2016.497C67.8498%2017.123%2067.6068%2017.711%2067.1638%2018.154ZM210.827%2022.4962C212.928%2022.4962%20214.638%2024.2062%20214.638%2026.3072C214.638%2028.4082%20212.928%2030.1172%20210.827%2030.1172C208.726%2030.1172%20207.016%2028.4082%20207.016%2026.3072C207.016%2024.2062%20208.726%2022.4962%20210.827%2022.4962ZM210.827%2031.7342C213.82%2031.7342%20216.254%2029.3002%20216.254%2026.3072C216.254%2023.3142%20213.82%2020.8802%20210.827%2020.8802C207.834%2020.8802%20205.4%2023.3142%20205.4%2026.3072C205.4%2029.3002%20207.834%2031.7342%20210.827%2031.7342ZM264.116%2077.9796C264.116%2077.5976%20263.806%2077.2876%20263.423%2077.2876C263.04%2077.2876%20262.73%2077.5976%20262.73%2077.9796C262.73%2079.8906%20261.177%2081.4446%20259.266%2081.4446C257.356%2081.4446%20255.802%2079.8906%20255.802%2077.9796C255.802%2076.0696%20257.356%2074.5156%20259.266%2074.5156C260.124%2074.5156%20260.947%2074.8326%20261.584%2075.4056C261.868%2075.6616%20262.306%2075.6386%20262.562%2075.3536C262.818%2075.0696%20262.795%2074.6316%20262.511%2074.3756C261.619%2073.5726%20260.467%2073.1296%20259.266%2073.1296C256.592%2073.1296%20254.416%2075.3056%20254.416%2077.9796C254.416%2080.6546%20256.592%2082.8306%20259.266%2082.8306C261.94%2082.8306%20264.116%2080.6546%20264.116%2077.9796ZM236.403%2037.5656C236.913%2037.5656%20237.327%2037.1516%20237.327%2036.6416C237.327%2036.1306%20236.913%2035.7176%20236.403%2035.7176C235.893%2035.7176%20235.479%2036.1306%20235.479%2036.6416C235.479%2037.1516%20235.893%2037.5656%20236.403%2037.5656ZM249.798%20104.308C249.288%20104.308%20248.874%20103.894%20248.874%20103.384C248.874%20102.873%20249.288%20102.46%20249.798%20102.46C250.308%20102.46%20250.722%20102.873%20250.722%20103.384C250.722%20103.894%20250.308%20104.308%20249.798%20104.308ZM136.406%2031.5607C136.916%2031.5607%20137.33%2031.1477%20137.33%2030.6367C137.33%2030.1267%20136.916%2029.7127%20136.406%2029.7127C135.896%2029.7127%20135.482%2030.1267%20135.482%2030.6367C135.482%2031.1477%20135.896%2031.5607%20136.406%2031.5607ZM96.6737%2031.4564C96.5547%2031.4564%2096.4367%2031.4114%2096.3467%2031.3204C96.1667%2031.1404%2096.1667%2030.8474%2096.3467%2030.6684L98.2247%2028.7894L96.3467%2026.9114C96.1667%2026.7314%2096.1667%2026.4384%2096.3467%2026.2584C96.5267%2026.0784%2096.8197%2026.0784%2096.9997%2026.2584L98.8777%2028.1364L100.756%2026.2584C100.936%2026.0784%20101.229%2026.0784%20101.409%2026.2584C101.59%2026.4384%20101.59%2026.7314%20101.409%2026.9114L99.5317%2028.7894L101.409%2030.6684C101.59%2030.8474%20101.59%2031.1404%20101.409%2031.3204C101.319%2031.4114%20101.201%2031.4564%20101.083%2031.4564C100.965%2031.4564%20100.847%2031.4114%20100.756%2031.3204L98.8777%2029.4424L96.9997%2031.3204C96.9097%2031.4114%2096.7917%2031.4564%2096.6737%2031.4564ZM64.4678%2047.2648C64.0848%2047.2648%2063.7748%2047.5758%2063.7748%2047.9578C63.7748%2048.3408%2064.0848%2048.6508%2064.4678%2048.6508H68.6248V52.8078C68.6248%2053.1908%2068.9348%2053.4998%2069.3178%2053.4998C69.6998%2053.4998%2070.0098%2053.1908%2070.0098%2052.8078V48.6508H74.1678C74.5498%2048.6508%2074.8608%2048.3408%2074.8608%2047.9578C74.8608%2047.5758%2074.5498%2047.2648%2074.1678%2047.2648H70.0098V43.1078C70.0098%2042.7258%2069.6998%2042.4148%2069.3178%2042.4148C68.9348%2042.4148%2068.6248%2042.7258%2068.6248%2043.1078V47.2648H64.4678ZM159.384%2017.5894C159.384%2017.9714%20159.074%2018.2814%20158.692%2018.2814C158.309%2018.2814%20157.999%2017.9714%20157.999%2017.5894V15.0494C157.999%2014.6664%20158.309%2014.3554%20158.692%2014.3554C159.074%2014.3554%20159.384%2014.6664%20159.384%2015.0494V17.5894ZM158.692%2026.3644C159.074%2026.3644%20159.384%2026.0544%20159.384%2025.6724V23.1324C159.384%2022.7494%20159.074%2022.4384%20158.692%2022.4384C158.309%2022.4384%20157.999%2022.7494%20157.999%2023.1324V25.6724C157.999%2026.0544%20158.309%2026.3644%20158.692%2026.3644ZM156.732%2019.0938C156.554%2019.0938%20156.377%2019.0258%20156.242%2018.8908L154.446%2017.0938C154.175%2016.8238%20154.175%2016.3848%20154.446%2016.1148C154.716%2015.8438%20155.155%2015.8438%20155.426%2016.1148L157.221%2017.9118C157.492%2018.1808%20157.492%2018.6198%20157.221%2018.8908C157.087%2019.0258%20156.909%2019.0938%20156.732%2019.0938ZM161.958%2024.6066C162.093%2024.7416%20162.27%2024.8086%20162.448%2024.8086C162.625%2024.8086%20162.802%2024.7416%20162.937%2024.6066C163.208%2024.3356%20163.208%2023.8966%20162.937%2023.6266L161.141%2021.8306C160.871%2021.5596%20160.432%2021.5596%20160.162%2021.8306C159.891%2022.1006%20159.891%2022.5396%20160.162%2022.8096L161.958%2024.6066ZM155.921%2021.0529H153.38C152.998%2021.0529%20152.687%2020.7429%20152.687%2020.3609C152.687%2019.9779%20152.998%2019.6669%20153.38%2019.6669H155.921C156.303%2019.6669%20156.613%2019.9779%20156.613%2020.3609C156.613%2020.7429%20156.303%2021.0529%20155.921%2021.0529ZM160.77%2020.3605C160.77%2020.7435%20161.08%2021.0525%20161.463%2021.0525H164.003C164.386%2021.0525%20164.696%2020.7435%20164.696%2020.3605C164.696%2019.9775%20164.386%2019.6675%20164.003%2019.6675H161.463C161.08%2019.6675%20160.77%2019.9775%20160.77%2020.3605ZM154.446%2023.6262L156.242%2021.8302C156.513%2021.5592%20156.951%2021.5592%20157.221%2021.8302C157.492%2022.1012%20157.492%2022.5392%20157.221%2022.8092L155.426%2024.6062C155.29%2024.7412%20155.113%2024.8092%20154.935%2024.8092C154.758%2024.8092%20154.581%2024.7412%20154.446%2024.6062C154.175%2024.3362%20154.175%2023.8962%20154.446%2023.6262ZM160.651%2019.0939C160.828%2019.0939%20161.005%2019.0259%20161.141%2018.8909L162.937%2017.0939C163.208%2016.8229%20163.208%2016.3849%20162.937%2016.1149C162.667%2015.8439%20162.228%2015.8439%20161.958%2016.1149L160.161%2017.9109C159.89%2018.1809%20159.89%2018.6199%20160.161%2018.8909C160.297%2019.0259%20160.474%2019.0939%20160.651%2019.0939ZM73.1276%20101.074C73.3196%20101.074%2073.4746%20101.23%2073.4746%20101.421V103.022C73.4746%20103.213%2073.3196%20103.368%2073.1276%20103.368C72.9366%20103.368%2072.7816%20103.213%2072.7816%20103.022V101.421C72.7816%20101.23%2072.9366%20101.074%2073.1276%20101.074ZM73.1279%20106.17C72.9369%20106.17%2072.7819%20106.325%2072.7819%20106.517V108.118C72.7819%20108.309%2072.9369%20108.464%2073.1279%20108.464C73.3189%20108.464%2073.4749%20108.309%2073.4749%20108.118V106.517C73.4749%20106.325%2073.3189%20106.17%2073.1279%20106.17ZM71.0057%20102.156L72.1377%20103.289C72.2727%20103.424%2072.2727%20103.643%2072.1377%20103.778C72.0697%20103.847%2071.9817%20103.88%2071.8927%20103.88C71.8047%20103.88%2071.7157%20103.847%2071.6477%20103.778L70.5147%20102.646C70.3797%20102.511%2070.3797%20102.292%2070.5147%20102.156C70.6507%20102.021%2070.8697%20102.021%2071.0057%20102.156ZM74.1187%20105.76C73.9837%20105.895%2073.9837%20106.114%2074.1187%20106.249L75.2507%20107.382C75.3187%20107.449%2075.4077%20107.484%2075.4957%20107.484C75.5847%20107.484%2075.6737%20107.449%2075.7407%20107.382C75.8757%20107.246%2075.8757%20107.028%2075.7407%20106.892L74.6087%20105.76C74.4727%20105.624%2074.2537%20105.624%2074.1187%20105.76ZM71.3811%20104.423C71.5721%20104.423%2071.7271%20104.579%2071.7271%20104.77C71.7271%20104.96%2071.5721%20105.116%2071.3811%20105.116H69.7791C69.5881%20105.116%2069.4331%20104.96%2069.4331%20104.77C69.4331%20104.579%2069.5881%20104.423%2069.7791%20104.423H71.3811ZM74.5288%20104.77C74.5288%20104.96%2074.6838%20105.116%2074.8748%20105.116H76.4768C76.6678%20105.116%2076.8228%20104.96%2076.8228%20104.77C76.8228%20104.579%2076.6678%20104.423%2076.4768%20104.423H74.8748C74.6838%20104.423%2074.5288%20104.579%2074.5288%20104.77ZM71.0053%20107.382C70.9373%20107.45%2070.8483%20107.483%2070.7603%20107.483C70.6713%20107.483%2070.5833%20107.45%2070.5153%20107.382C70.3803%20107.246%2070.3803%20107.027%2070.5153%20106.892L71.6473%20105.759C71.7833%20105.624%2072.0023%20105.624%2072.1373%20105.759C72.2733%20105.895%2072.2733%20106.115%2072.1373%20106.249L71.0053%20107.382ZM74.1187%20103.778C74.1857%20103.846%2074.2747%20103.88%2074.3637%20103.88C74.4517%20103.88%2074.5407%20103.846%2074.6087%20103.778L75.7407%20102.646C75.8757%20102.51%2075.8757%20102.292%2075.7407%20102.156C75.6057%20102.021%2075.3867%20102.021%2075.2507%20102.156L74.1187%20103.289C73.9837%20103.424%2073.9837%20103.643%2074.1187%20103.778ZM56.7369%2075.4454C57.0529%2075.1304%2057.5649%2075.1304%2057.8799%2075.4454L61.0829%2078.6484C61.3989%2078.9644%2061.3989%2079.4754%2061.0839%2079.7914C60.9249%2079.9494%2060.7179%2080.0284%2060.5119%2080.0284C60.3049%2080.0284%2060.0979%2079.9494%2059.9399%2079.7914L56.7369%2076.5894C56.4219%2076.2724%2056.4219%2075.7604%2056.7369%2075.4454ZM67.4702%2086.9865C67.6772%2086.9865%2067.8842%2086.9085%2068.0412%2086.7505C68.3572%2086.4345%2068.3572%2085.9235%2068.0412%2085.6065L64.8382%2082.4045C64.5232%2082.0885%2064.0112%2082.0885%2063.6952%2082.4045C63.3802%2082.7195%2063.3802%2083.2315%2063.6952%2083.5475L66.8982%2086.7505C67.0562%2086.9085%2067.2632%2086.9865%2067.4702%2086.9865ZM56.737%2085.6064L59.94%2082.4044C60.256%2082.0894%2060.768%2082.0894%2061.084%2082.4044C61.399%2082.7194%2061.399%2083.2314%2061.083%2083.5474L57.88%2086.7504C57.722%2086.9084%2057.516%2086.9864%2057.309%2086.9864C57.102%2086.9864%2056.895%2086.9084%2056.737%2086.7504C56.421%2086.4344%2056.421%2085.9234%2056.737%2085.6064ZM66.8984%2075.4454L63.6954%2078.6484C63.3794%2078.9644%2063.3794%2079.4754%2063.6954%2079.7914C63.8534%2079.9494%2064.0604%2080.0284%2064.2674%2080.0284C64.4734%2080.0284%2064.6804%2079.9494%2064.8384%2079.7914L68.0414%2076.5894C68.3574%2076.2724%2068.3574%2075.7604%2068.0414%2075.4454C67.7264%2075.1304%2067.2144%2075.1304%2066.8984%2075.4454ZM254.416%2044.5743C254.416%2044.8293%20254.21%2045.0363%20253.955%2045.0363C253.7%2045.0363%20253.493%2044.8293%20253.493%2044.5743V42.5303C253.493%2042.2753%20253.7%2042.0683%20253.955%2042.0683C254.21%2042.0683%20254.416%2042.2753%20254.416%2042.5303V44.5743ZM253.955%2051.5372C254.21%2051.5372%20254.416%2051.3302%20254.416%2051.0752V49.0322C254.416%2048.7772%20254.21%2048.5702%20253.955%2048.5702C253.7%2048.5702%20253.493%2048.7772%20253.493%2049.0322V51.0752C253.493%2051.3302%20253.7%2051.5372%20253.955%2051.5372ZM252.052%2045.5535L250.607%2044.1085C250.426%2043.9275%20250.426%2043.6355%20250.607%2043.4555C250.787%2043.2755%20251.08%2043.2755%20251.26%2043.4555L252.705%2044.9005C252.885%2045.0805%20252.885%2045.3735%20252.705%2045.5535C252.614%2045.6435%20252.496%2045.6885%20252.378%2045.6885C252.26%2045.6885%20252.142%2045.6435%20252.052%2045.5535ZM256.649%2050.1505C256.739%2050.2405%20256.857%2050.2865%20256.975%2050.2865C257.093%2050.2865%20257.211%2050.2405%20257.302%2050.1505C257.482%2049.9695%20257.482%2049.6775%20257.302%2049.4975L255.857%2048.0525C255.677%2047.8725%20255.384%2047.8725%20255.204%2048.0525C255.024%2048.2335%20255.024%2048.5255%20255.204%2048.7065L256.649%2050.1505ZM252.188%2046.8028C252.188%2047.0578%20251.981%2047.2648%20251.726%2047.2648H249.683C249.428%2047.2648%20249.221%2047.0578%20249.221%2046.8028C249.221%2046.5478%20249.428%2046.3408%20249.683%2046.3408H251.726C251.981%2046.3408%20252.188%2046.5478%20252.188%2046.8028ZM255.722%2046.8029C255.722%2047.0579%20255.929%2047.2649%20256.184%2047.2649H258.227C258.482%2047.2649%20258.689%2047.0579%20258.689%2046.8029C258.689%2046.5479%20258.482%2046.3409%20258.227%2046.3409H256.184C255.929%2046.3409%20255.722%2046.5479%20255.722%2046.8029ZM252.705%2048.7065L251.26%2050.1505C251.17%2050.2405%20251.052%2050.2865%20250.934%2050.2865C250.816%2050.2865%20250.698%2050.2405%20250.607%2050.1505C250.427%2049.9695%20250.427%2049.6775%20250.607%2049.4975L252.052%2048.0525C252.232%2047.8725%20252.525%2047.8725%20252.705%2048.0525C252.885%2048.2335%20252.885%2048.5255%20252.705%2048.7065ZM255.531%2045.6886C255.649%2045.6886%20255.767%2045.6436%20255.857%2045.5536L257.302%2044.1086C257.483%2043.9276%20257.483%2043.6356%20257.302%2043.4556C257.122%2043.2756%20256.829%2043.2756%20256.649%2043.4556L255.204%2044.9006C255.024%2045.0806%20255.024%2045.3736%20255.204%2045.5536C255.295%2045.6436%20255.413%2045.6886%20255.531%2045.6886ZM183.744%2012.2736C183.518%2012.4996%20183.518%2012.8656%20183.744%2013.0896C183.857%2013.2036%20184.004%2013.2596%20184.152%2013.2596C184.3%2013.2596%20184.448%2013.2036%20184.56%2013.0896L185.867%2011.7846H187.173L188.479%2013.0896C188.592%2013.2036%20188.74%2013.2596%20188.888%2013.2596C189.035%2013.2596%20189.183%2013.2036%20189.296%2013.0896C189.521%2012.8656%20189.521%2012.4996%20189.296%2012.2736L187.99%2010.9676V9.6616L189.296%208.3546C189.521%208.1286%20189.521%207.7636%20189.296%207.5386C189.071%207.3126%20188.705%207.3126%20188.479%207.5386L187.173%208.8446H185.867L184.56%207.5386C184.335%207.3126%20183.97%207.3126%20183.744%207.5386C183.518%207.7636%20183.518%208.1286%20183.744%208.3546L185.05%209.6616V10.9676L183.744%2012.2736ZM245.294%2013.6632H243.447C243.128%2013.6632%20242.869%2013.4042%20242.869%2013.0862C242.869%2012.7672%20243.128%2012.5082%20243.447%2012.5082H245.294L246.218%2011.5842V9.7372C246.218%209.4182%20246.476%209.1592%20246.796%209.1592C247.114%209.1592%20247.373%209.4182%20247.373%209.7372V11.5842L248.297%2012.5082H250.144C250.463%2012.5082%20250.721%2012.7672%20250.721%2013.0862C250.721%2013.4042%20250.463%2013.6632%20250.144%2013.6632H248.297L247.373%2014.5872V16.4342C247.373%2016.7532%20247.114%2017.0122%20246.796%2017.0122C246.476%2017.0122%20246.218%2016.7532%20246.218%2016.4342V14.5872L245.294%2013.6632Z'%20fill='%23F7C200'/%3e%3c/svg%3e", un = ({ errState: A, setSMSModalState: e }) => {
  const t = f("sms_web_widget_error_banner"), o = () => {
    e({
      state: N.FORM,
      body: A.body
    });
  }, n = A.state === N.INVALID_WIDGET && o;
  return /* @__PURE__ */ M("div", { children: [
    /* @__PURE__ */ c(dA, { title: t, backAction: n }),
    /* @__PURE__ */ c(hn, { errState: A, goToForm: o })
  ] });
}, hn = ({ errState: A, goToForm: e }) => /* @__PURE__ */ M("div", { id: "error-body", className: "error-div", children: [
  /* @__PURE__ */ c("img", { id: "error-icon", src: ln, alt: "" }),
  A.state === N.INVALID_WIDGET && /* @__PURE__ */ c(Cn, {}),
  A.state === N.FAIL_RESPONSE && /* @__PURE__ */ c(mn, { errState: A, goToForm: e })
] }), Cn = () => /* @__PURE__ */ c("p", { className: "error-text", children: f("sms_web_widget_error_service_not_available") }), mn = ({ errState: A, goToForm: e }) => {
  const t = () => /* @__PURE__ */ c(
    "button",
    {
      id: "error-button",
      className: "widget-button enabled-button",
      onclick: e,
      children: f("sms_web_widget_error_try_again")
    }
  ), o = f(
    "sms_web_widget_error_something_went_wrong"
  ).replace("${consumer_name}", A.body.name), n = f("sms_web_widget_error_something_went_wrong_tip");
  return /* @__PURE__ */ M("div", { className: "error-div", children: [
    /* @__PURE__ */ c("p", { className: "error-text", children: o }),
    /* @__PURE__ */ M("div", { className: "error-div", children: [
      /* @__PURE__ */ c("p", { id: "error-tip", children: n }),
      /* @__PURE__ */ c(t, {})
    ] })
  ] });
};
var N = /* @__PURE__ */ ((A) => (A.FORM = "form", A.SUCCESS = "success", A.FAIL_RESPONSE = "failResponse", A.INVALID_WIDGET = "invalidWidget", A))(N || {});
const g2 = ({ backAction: A, options: e }) => {
  const t = { name: "", phone: "", message: "" }, [o, n] = x({
    state: "form",
    body: t
  }), i = /* @__PURE__ */ c(
    dn,
    {
      body: o.body,
      setSMSModalState: n,
      backAction: A,
      options: e
    }
  );
  switch (o.state) {
    case "form":
      return i;
    case "success":
      return /* @__PURE__ */ c(cn, { form: i, backAction: A });
    case "failResponse":
    case "invalidWidget":
      return /* @__PURE__ */ c(
        un,
        {
          errState: o,
          setSMSModalState: n
        }
      );
  }
}, wn = "data:image/svg+xml,%3csvg%20width='17'%20height='16'%20viewBox='0%200%2017%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.5%2016C12.9183%2016%2016.5%2012.4183%2016.5%208C16.5%203.58172%2012.9183%200%208.5%200C4.08172%200%200.5%203.58172%200.5%208C0.5%2012.4183%204.08172%2016%208.5%2016Z'%20fill='url(%23paint0_linear_683_321)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.83331%207.93381C3.89254%205.3401%206.03894%203.28312%208.63284%203.33427C11.2267%203.28312%2013.3731%205.3401%2013.4324%207.93383C13.3731%2010.5275%2011.2267%2012.5845%208.63284%2012.5334C8.0248%2012.5346%207.42173%2012.4238%206.85381%2012.2066L5.73912%2012.9029C5.70734%2012.9228%205.67061%2012.9333%205.63314%2012.9333C5.52269%2012.9333%205.43315%2012.8438%205.43315%2012.7333V11.3575C4.42471%2010.5053%203.84008%209.25412%203.83331%207.93381ZM11.1666%208C11.1666%208.36819%2010.8682%208.66667%2010.5%208.66667C10.1318%208.66667%209.83331%208.36819%209.83331%208C9.83331%207.63181%2010.1318%207.33334%2010.5%207.33334C10.8682%207.33334%2011.1666%207.63181%2011.1666%208ZM8.49998%208.66667C8.86817%208.66667%209.16665%208.36819%209.16665%208C9.16665%207.63181%208.86817%207.33334%208.49998%207.33334C8.13179%207.33334%207.83331%207.63181%207.83331%208C7.83331%208.36819%208.13179%208.66667%208.49998%208.66667ZM7.16665%208C7.16665%208.36819%206.86817%208.66667%206.49998%208.66667C6.13179%208.66667%205.83331%208.36819%205.83331%208C5.83331%207.63181%206.13179%207.33334%206.49998%207.33334C6.86817%207.33334%207.16665%207.63181%207.16665%208Z'%20fill='white'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_683_321'%20x1='-2.53225'%20y1='9.52068'%20x2='10.2402'%20y2='18.9729'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23F6BD02'/%3e%3cstop%20offset='1'%20stop-color='%23F18A03'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e", In = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8%2016C12.4183%2016%2016%2012.4183%2016%208C16%203.58172%2012.4183%200%208%200C3.58172%200%200%203.58172%200%208C0%2012.4183%203.58172%2016%208%2016Z'%20fill='%2325D366'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.325%207.87947C12.3245%209.38523%2011.5283%2010.7786%2010.2313%2011.5435C8.93423%2012.3083%207.32955%2012.3308%206.01165%2011.6025L3.65887%2012.3588L4.42645%2010.0737C3.49826%208.53322%203.63896%206.57553%204.7779%205.18365C5.91685%203.79178%207.80797%203.26643%209.50164%203.87141C11.1953%204.47639%2012.3256%206.081%2012.325%207.87947ZM11.6145%207.87947C11.6174%206.34362%2010.6306%204.98072%209.1705%204.50422C7.71043%204.02773%206.10961%204.54614%205.20603%205.78808C4.30246%207.03002%204.30188%208.71268%205.2046%209.95524L4.75914%2011.2698L6.12443%2010.8356C7.2117%2011.554%208.60584%2011.6168%209.75327%2010.9989C10.9007%2010.3811%2011.6157%209.18267%2011.6145%207.87947ZM10.2823%209.06361C10.2838%209.03497%2010.2799%209.0063%2010.271%208.97903C10.2316%208.91137%209.31244%208.43207%209.2187%208.43419C9.14759%208.43419%209.04511%208.56164%208.93908%208.69349C8.82547%208.83479%208.70779%208.98115%208.62028%208.98115C8.57616%208.97927%208.53333%208.96564%208.49623%208.94167C8.18445%208.79702%207.89698%208.6049%207.64407%208.37216C7.40966%208.14831%207.21515%207.8861%207.06892%207.59683C7.05206%207.57169%207.04232%207.54247%207.04072%207.51225C7.04072%207.45529%207.11577%207.37603%207.19995%207.28713C7.30744%207.17362%207.4298%207.0444%207.4298%206.92582C7.4298%206.86943%207.14222%206.10185%207.10275%206.00599C7.04636%205.85938%207.01817%205.81427%206.86592%205.81427C6.82713%205.81427%206.79126%205.80988%206.75609%205.80557C6.72224%205.80143%206.68903%205.79736%206.65447%205.79736C6.54377%205.79736%206.43777%205.8421%206.36055%205.92141C6.08989%206.17868%205.95456%206.44018%205.94328%206.81304V6.85815C5.93764%207.24793%206.13218%207.6363%206.34363%207.95278C6.82998%208.6696%207.33042%209.29551%208.13887%209.65921C8.38134%209.7748%208.93958%2010.0116%209.21095%2010.0116C9.53235%2010.0116%2010.0568%209.80864%2010.1865%209.49286C10.2436%209.3566%2010.2761%209.21125%2010.2823%209.06361Z'%20fill='white'/%3e%3c/svg%3e", Bn = "data:image/svg+xml,%3csvg%20width='17'%20height='16'%20viewBox='0%200%2017%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.50001%200C3.99337%200%200.5%203.30113%200.5%207.76001C0.5%2010.0923%201.45584%2012.1077%203.01245%2013.4997C3.14312%2013.6167%203.222%2013.7805%203.22736%2013.9559L3.27093%2015.3789C3.28485%2015.8328%203.75372%2016.1282%204.16908%2015.9448L5.75697%2015.2439C5.89158%2015.1845%206.04241%2015.1735%206.18425%2015.2125C6.91393%2015.4131%207.69054%2015.52%208.50001%2015.52C13.0067%2015.52%2016.5%2012.2189%2016.5%207.76001C16.5%203.30113%2013.0067%200%208.50001%200Z'%20fill='url(%23paint0_radial_683_340)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M3.69604%2010.0294L6.04604%206.30105C6.41984%205.70793%207.22032%205.56025%207.7812%205.98089L9.65027%207.3827C9.82176%207.51134%2010.0577%207.51065%2010.2285%207.38103L12.7527%205.46527C13.0897%205.20959%2013.5295%205.61279%2013.304%205.9706L10.954%209.69895C10.5802%2010.292%209.77968%2010.4397%209.21883%2010.0191L7.34971%208.61724C7.17824%208.48863%206.94227%208.48932%206.77152%208.61891L4.24724%2010.5347C3.91033%2010.7903%203.47052%2010.3871%203.69604%2010.0293V10.0294Z'%20fill='white'/%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_683_340'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(3.57959%2015.9144)%20scale(17.4335%2017.4336)'%3e%3cstop%20stop-color='%230099FF'/%3e%3cstop%20offset='0.609754'%20stop-color='%23A033FF'/%3e%3cstop%20offset='0.934823'%20stop-color='%23FF5280'/%3e%3cstop%20offset='1'%20stop-color='%23FF7061'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e", y0 = (A) => ({
  sms: wn,
  whatsapp: In,
  messenger: Bn
})[A], g0 = ({
  text: A,
  icon: e,
  onclick: t = () => {
  },
  className: o = ""
}) => {
  const n = "icon-button " + o;
  return /* @__PURE__ */ M("button", { className: n, onclick: t, children: [
    /* @__PURE__ */ c("img", { src: e, alt: "icon-button" }),
    /* @__PURE__ */ c("span", { id: "icon-button-text", children: A })
  ] });
}, En = {
  sms: f("channel_name_sms"),
  whatsapp: f("channel_name_whatsapp_desktop"),
  messenger: f("channel_name_messenger_desktop")
}, c2 = ({
  channels: A,
  whatsappLink: e,
  messengerLink: t,
  setModalState: o
}) => {
  const n = f("partoo_chat_header_title_menu_whatsapp_messenger"), i = f(
    "partoo_chat_menu_channels_selection_menu_description"
  );
  return /* @__PURE__ */ M("div", { id: "channel-selector-modal-container", children: [
    /* @__PURE__ */ c(dA, { title: n, description: i }),
    /* @__PURE__ */ c("div", { id: "channel-selector-container", children: /* @__PURE__ */ c("div", { id: "channel-choices-container", children: A.map((r) => /* @__PURE__ */ c(
      pn,
      {
        channel: r,
        whatsappLink: e,
        messengerLink: t,
        setModalState: o
      }
    )) }) })
  ] });
}, pn = ({
  channel: A,
  whatsappLink: e,
  messengerLink: t,
  setModalState: o
}) => {
  const { isBelowProvidedDevices: n } = wA(mA), i = En[A], r = y0(A), d = () => o(A), a = {
    [bA.WHATSAPP]: e,
    [bA.MESSENGER]: t
  };
  return n && A != bA.SMS ? /* @__PURE__ */ c(
    "a",
    {
      href: a[A],
      target: "_blank",
      rel: "noopener noreferrer",
      children: /* @__PURE__ */ c(g0, { text: i, icon: r })
    }
  ) : /* @__PURE__ */ c(g0, { text: i, icon: r, onclick: d });
}, l2 = ({
  channel: A,
  QRcode: e,
  link: t,
  backAction: o
}) => {
  const n = f("partoo_chat_header_title_menu_whatsapp_messenger");
  return /* @__PURE__ */ M("div", { id: "meta-modal-container", children: [
    /* @__PURE__ */ c(dA, { title: n, backAction: o }),
    /* @__PURE__ */ M("div", { id: "meta-modal-body", children: [
      /* @__PURE__ */ c(Qn, { channel: A }),
      /* @__PURE__ */ c(fn, { QRcode: e }),
      /* @__PURE__ */ c(Sn, { channel: A, link: t })
    ] })
  ] });
}, fn = ({ QRcode: A }) => /* @__PURE__ */ c("div", { id: "qrcode-container", children: /* @__PURE__ */ c("img", { src: A, alt: "" }) });
function Mn() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
function yn() {
  return window.location.host.includes("wix");
}
const Sn = ({ channel: A, link: e }) => {
  if (!(Mn() && yn()))
    return /* @__PURE__ */ M(w0, { children: [
      /* @__PURE__ */ c(bn, {}),
      /* @__PURE__ */ c(xn, { channel: A, link: e })
    ] });
}, Qn = ({ channel: A }) => {
  const e = `partoo_chat_desktop_${A}_qr_code`, t = f(e);
  return /* @__PURE__ */ c("span", { id: "qrcode-text", children: t });
}, bn = () => {
  const A = f("partoo_chat_divider_whatsapp_messenger");
  return /* @__PURE__ */ c("div", { id: "or-container", children: A });
}, xn = ({ channel: A, link: e }) => {
  const t = `partoo_chat_desktop_${A}_continue_on_web`, o = f(t), n = y0(A);
  return /* @__PURE__ */ c("div", { id: "web-redirection-button-container", children: /* @__PURE__ */ c("a", { href: e, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ c(g0, { text: o, icon: n }) }) });
}, Gn = "data:image/svg+xml,%3csvg%20width='321'%20height='140'%20viewBox='0%200%20321%20140'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M88.85%20127.209C88.85%20132.433%2093.1%20136.683%2098.324%20136.683H223.483C228.707%20136.683%20232.957%20132.433%20232.957%20127.209C232.957%20126.836%20232.642%20126.522%20232.27%20126.522H224.181H215.636H106.17H97.625H89.537C89.164%20126.522%2088.85%20126.836%2088.85%20127.209ZM109.404%20123.288H212.403V60.0113C212.403%2058.3563%20211.056%2057.0083%20209.401%2057.0083H112.406C110.75%2057.0083%20109.404%2058.3563%20109.404%2060.0113V123.288ZM107.269%2048.2333C103.735%2048.2333%20100.859%2051.1093%20100.859%2054.6443V123.288H106.17V60.0113C106.17%2056.5733%20108.968%2053.7763%20112.406%2053.7763H209.401C212.839%2053.7763%20215.636%2056.5733%20215.636%2060.0113V123.288H220.948V54.6443C220.948%2051.1093%20218.072%2048.2333%20214.537%2048.2333H107.269ZM236.19%20127.209C236.19%20130.971%20234.546%20134.355%20231.939%20136.683H256.282C257.175%20136.683%20257.899%20137.407%20257.899%20138.3C257.899%20139.193%20257.175%20139.916%20256.282%20139.916H223.483H98.324H67.372C66.479%20139.916%2065.756%20139.193%2065.756%20138.3C65.756%20137.407%2066.479%20136.683%2067.372%20136.683H89.867C87.261%20134.355%2085.616%20130.971%2085.616%20127.209C85.616%20125.047%2087.375%20123.288%2089.537%20123.288H97.625V54.6443C97.625%2049.3263%20101.952%2044.9993%20107.269%2044.9993H214.537C219.855%2044.9993%20224.181%2049.3263%20224.181%2054.6443V123.288H232.27C234.431%20123.288%20236.19%20125.047%20236.19%20127.209ZM173.489%20128.832H157.785C156.892%20128.832%20156.169%20129.556%20156.169%20130.448C156.169%20131.341%20156.892%20132.065%20157.785%20132.065H173.489C174.382%20132.065%20175.106%20131.341%20175.106%20130.448C175.106%20129.556%20174.382%20128.832%20173.489%20128.832ZM34.1168%20136.683H37.3498C38.2428%20136.683%2038.9668%20137.407%2038.9668%20138.3C38.9668%20139.193%2038.2428%20139.916%2037.3498%20139.916H34.1168C33.2238%20139.916%2032.4998%20139.193%2032.4998%20138.3C32.4998%20137.407%2033.2238%20136.683%2034.1168%20136.683ZM58.8274%20136.683H45.2024C44.3084%20136.683%2043.5854%20137.407%2043.5854%20138.3C43.5854%20139.193%2044.3084%20139.916%2045.2024%20139.916H58.8274C59.7204%20139.916%2060.4444%20139.193%2060.4444%20138.3C60.4444%20137.407%2059.7204%20136.683%2058.8274%20136.683ZM275.45%20136.683H264.596C263.703%20136.683%20262.979%20137.407%20262.979%20138.3C262.979%20139.193%20263.703%20139.916%20264.596%20139.916H275.45C276.343%20139.916%20277.067%20139.193%20277.067%20138.3C277.067%20137.407%20276.343%20136.683%20275.45%20136.683ZM148.317%20128.832H151.55C152.443%20128.832%20153.167%20129.556%20153.167%20130.448C153.167%20131.341%20152.443%20132.065%20151.55%20132.065H148.317C147.424%20132.065%20146.7%20131.341%20146.7%20130.448C146.7%20129.556%20147.424%20128.832%20148.317%20128.832ZM287.459%20136.683H284.226C283.333%20136.683%20282.609%20137.407%20282.609%20138.3C282.609%20139.193%20283.333%20139.916%20284.226%20139.916H287.459C288.352%20139.916%20289.076%20139.193%20289.076%20138.3C289.076%20137.407%20288.352%20136.683%20287.459%20136.683Z'%20fill='%237F8EA4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M151%2082C149.622%2082%20148.5%2083.1219%20148.5%2084.4991C148.5%2085.8781%20149.622%2087%20151%2087C152.378%2087%20153.5%2085.8781%20153.5%2084.4991C153.5%2083.1219%20152.378%2082%20151%2082Z'%20fill='%237F8EA4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M171%2084C169.622%2084%20168.5%2085.1219%20168.5%2086.4991C168.5%2087.8781%20169.622%2089%20171%2089C172.379%2089%20173.5%2087.8781%20173.5%2086.4991C173.5%2085.1219%20172.379%2084%20171%2084Z'%20fill='%237F8EA4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M153.923%20105.082C152.55%20105.187%20151.611%20105.374%20151.184%20105.53C150.145%20105.908%20148.998%20105.372%20148.62%20104.334C148.243%20103.296%20148.779%20102.148%20149.817%20101.771C150.764%20101.426%20152.137%20101.207%20153.617%20101.094C155.142%20100.977%20156.935%20100.961%20158.798%20101.093C162.433%20101.35%20166.693%20102.194%20169.647%20104.262C170.552%20104.895%20170.772%20106.143%20170.139%20107.047C169.505%20107.952%20168.258%20108.172%20167.353%20107.539C165.307%20106.107%20161.942%20105.326%20158.515%20105.083C156.846%20104.965%20155.249%20104.98%20153.923%20105.082Z'%20fill='%237F8EA4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M171.75%2096.5C177.411%2096.5%20182%2091.9109%20182%2086.25C182%2080.5891%20177.411%2076%20171.75%2076C166.089%2076%20161.5%2080.5891%20161.5%2086.25C161.5%2091.9109%20166.089%2096.5%20171.75%2096.5ZM185.5%2087.1516V88C185.5%2088.6023%20185.145%2089.1217%20184.633%2089.3603C183.234%2095.1774%20177.997%2099.5%20171.75%2099.5C164.432%2099.5%20158.5%2093.5678%20158.5%2086.25C158.5%2078.9322%20164.432%2073%20171.75%2073C177.594%2073%20182.554%2076.7828%20184.315%2082.0331C184.918%2082.1619%20185.387%2082.6531%20185.482%2083.2677C185.69%2083.3002%20185.895%2083.3773%20186.082%2083.5019C186.68%2083.9002%20187.43%2084.7137%20188.158%2085.6875C188.921%2086.7079%20189.762%2088.0416%20190.509%2089.6023C191.996%2092.7084%20193.169%2096.8349%20192.482%20101.232C192.263%20102.636%20192.038%20103.995%20191.822%20105.304L191.822%20105.305L191.822%20105.306C191.413%20107.78%20191.033%20110.079%20190.77%20112.186C190.364%20115.433%20190.28%20117.934%20190.705%20119.636C190.906%20120.44%20190.418%20121.254%20189.614%20121.455C188.81%20121.656%20187.996%20121.167%20187.795%20120.364C187.22%20118.066%20187.386%20115.066%20187.793%20111.814C188.063%20109.651%20188.46%20107.249%20188.875%20104.733L188.875%20104.733L188.875%20104.733C189.089%20103.436%20189.309%20102.109%20189.518%20100.768C190.081%2097.165%20189.129%2093.6666%20187.803%2090.8977C187.144%2089.5209%20186.407%2088.3545%20185.756%2087.4843C185.667%2087.366%20185.582%2087.2552%20185.5%2087.1516Z'%20fill='%237F8EA4'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M119.663%206.504H117.815C117.496%206.504%20117.238%206.245%20117.238%205.927C117.238%205.608%20117.496%205.349%20117.815%205.349H119.663L120.586%204.425V2.578C120.586%202.259%20120.845%202%20121.164%202C121.483%202%20121.741%202.259%20121.741%202.578V4.425L122.665%205.349H124.512C124.832%205.349%20125.09%205.608%20125.09%205.927C125.09%206.245%20124.832%206.504%20124.512%206.504H122.665L121.741%207.428V9.275C121.741%209.594%20121.483%209.853%20121.164%209.853C120.845%209.853%20120.586%209.594%20120.586%209.275V7.428L119.663%206.504ZM67.1638%2018.154C66.7208%2018.597%2066.1328%2018.84%2065.5068%2018.84C64.8808%2018.84%2064.2928%2018.597%2063.8498%2018.154C63.4078%2017.711%2063.1638%2017.123%2063.1638%2016.497C63.1638%2015.871%2063.4078%2015.282%2063.8498%2014.84C64.2598%2014.43%2064.8048%2014.188%2065.3838%2014.157C65.5708%2014.15%2065.7378%2014.294%2065.7478%2014.486C65.7578%2014.676%2065.6108%2014.839%2065.4208%2014.849C65.0128%2014.87%2064.6288%2015.041%2064.3398%2015.33C64.0278%2015.642%2063.8568%2016.057%2063.8568%2016.497C63.8568%2016.938%2064.0278%2017.353%2064.3398%2017.664C64.6518%2017.976%2065.0668%2018.148%2065.5068%2018.148C65.9478%2018.148%2066.3618%2017.976%2066.6738%2017.664C66.9858%2017.353%2067.1568%2016.938%2067.1568%2016.497C67.1568%2016.057%2066.9858%2015.642%2066.6738%2015.33C66.5388%2015.194%2066.5388%2014.976%2066.6738%2014.84C66.8088%2014.705%2067.0278%2014.705%2067.1638%2014.84C67.6068%2015.282%2067.8498%2015.871%2067.8498%2016.497C67.8498%2017.123%2067.6068%2017.711%2067.1638%2018.154ZM210.827%2022.4962C212.928%2022.4962%20214.638%2024.2062%20214.638%2026.3072C214.638%2028.4082%20212.928%2030.1172%20210.827%2030.1172C208.726%2030.1172%20207.016%2028.4082%20207.016%2026.3072C207.016%2024.2062%20208.726%2022.4962%20210.827%2022.4962ZM210.827%2031.7342C213.82%2031.7342%20216.254%2029.3002%20216.254%2026.3072C216.254%2023.3142%20213.82%2020.8802%20210.827%2020.8802C207.834%2020.8802%20205.4%2023.3142%20205.4%2026.3072C205.4%2029.3002%20207.834%2031.7342%20210.827%2031.7342ZM264.116%2077.9796C264.116%2077.5976%20263.806%2077.2876%20263.423%2077.2876C263.04%2077.2876%20262.73%2077.5976%20262.73%2077.9796C262.73%2079.8906%20261.177%2081.4446%20259.266%2081.4446C257.356%2081.4446%20255.802%2079.8906%20255.802%2077.9796C255.802%2076.0696%20257.356%2074.5156%20259.266%2074.5156C260.124%2074.5156%20260.947%2074.8326%20261.584%2075.4056C261.868%2075.6616%20262.306%2075.6386%20262.562%2075.3536C262.818%2075.0696%20262.795%2074.6316%20262.511%2074.3756C261.619%2073.5726%20260.467%2073.1296%20259.266%2073.1296C256.592%2073.1296%20254.416%2075.3056%20254.416%2077.9796C254.416%2080.6546%20256.592%2082.8306%20259.266%2082.8306C261.94%2082.8306%20264.116%2080.6546%20264.116%2077.9796ZM236.403%2037.5656C236.913%2037.5656%20237.327%2037.1516%20237.327%2036.6416C237.327%2036.1306%20236.913%2035.7176%20236.403%2035.7176C235.893%2035.7176%20235.479%2036.1306%20235.479%2036.6416C235.479%2037.1516%20235.893%2037.5656%20236.403%2037.5656ZM249.798%20104.308C249.288%20104.308%20248.874%20103.894%20248.874%20103.384C248.874%20102.873%20249.288%20102.46%20249.798%20102.46C250.308%20102.46%20250.722%20102.873%20250.722%20103.384C250.722%20103.894%20250.308%20104.308%20249.798%20104.308ZM136.406%2031.5607C136.916%2031.5607%20137.33%2031.1477%20137.33%2030.6367C137.33%2030.1267%20136.916%2029.7127%20136.406%2029.7127C135.896%2029.7127%20135.482%2030.1267%20135.482%2030.6367C135.482%2031.1477%20135.896%2031.5607%20136.406%2031.5607ZM96.6737%2031.4564C96.5547%2031.4564%2096.4367%2031.4114%2096.3467%2031.3204C96.1667%2031.1404%2096.1667%2030.8474%2096.3467%2030.6684L98.2247%2028.7894L96.3467%2026.9114C96.1667%2026.7314%2096.1667%2026.4384%2096.3467%2026.2584C96.5267%2026.0784%2096.8197%2026.0784%2096.9997%2026.2584L98.8777%2028.1364L100.756%2026.2584C100.936%2026.0784%20101.229%2026.0784%20101.409%2026.2584C101.59%2026.4384%20101.59%2026.7314%20101.409%2026.9114L99.5317%2028.7894L101.409%2030.6684C101.59%2030.8474%20101.59%2031.1404%20101.409%2031.3204C101.319%2031.4114%20101.201%2031.4564%20101.083%2031.4564C100.965%2031.4564%20100.847%2031.4114%20100.756%2031.3204L98.8777%2029.4424L96.9997%2031.3204C96.9097%2031.4114%2096.7917%2031.4564%2096.6737%2031.4564ZM64.4678%2047.2648C64.0848%2047.2648%2063.7748%2047.5758%2063.7748%2047.9578C63.7748%2048.3408%2064.0848%2048.6508%2064.4678%2048.6508H68.6248V52.8078C68.6248%2053.1908%2068.9348%2053.4998%2069.3178%2053.4998C69.6998%2053.4998%2070.0098%2053.1908%2070.0098%2052.8078V48.6508H74.1678C74.5498%2048.6508%2074.8608%2048.3408%2074.8608%2047.9578C74.8608%2047.5758%2074.5498%2047.2648%2074.1678%2047.2648H70.0098V43.1078C70.0098%2042.7258%2069.6998%2042.4148%2069.3178%2042.4148C68.9348%2042.4148%2068.6248%2042.7258%2068.6248%2043.1078V47.2648H64.4678ZM159.384%2017.5894C159.384%2017.9714%20159.074%2018.2814%20158.692%2018.2814C158.309%2018.2814%20157.999%2017.9714%20157.999%2017.5894V15.0494C157.999%2014.6664%20158.309%2014.3554%20158.692%2014.3554C159.074%2014.3554%20159.384%2014.6664%20159.384%2015.0494V17.5894ZM158.692%2026.3644C159.074%2026.3644%20159.384%2026.0544%20159.384%2025.6724V23.1324C159.384%2022.7494%20159.074%2022.4384%20158.692%2022.4384C158.309%2022.4384%20157.999%2022.7494%20157.999%2023.1324V25.6724C157.999%2026.0544%20158.309%2026.3644%20158.692%2026.3644ZM156.732%2019.0938C156.554%2019.0938%20156.377%2019.0258%20156.242%2018.8908L154.446%2017.0938C154.175%2016.8238%20154.175%2016.3848%20154.446%2016.1148C154.716%2015.8438%20155.155%2015.8438%20155.426%2016.1148L157.221%2017.9118C157.492%2018.1808%20157.492%2018.6198%20157.221%2018.8908C157.087%2019.0258%20156.909%2019.0938%20156.732%2019.0938ZM161.958%2024.6066C162.093%2024.7416%20162.27%2024.8086%20162.448%2024.8086C162.625%2024.8086%20162.802%2024.7416%20162.937%2024.6066C163.208%2024.3356%20163.208%2023.8966%20162.937%2023.6266L161.141%2021.8306C160.871%2021.5596%20160.432%2021.5596%20160.162%2021.8306C159.891%2022.1006%20159.891%2022.5396%20160.162%2022.8096L161.958%2024.6066ZM155.921%2021.0529H153.38C152.998%2021.0529%20152.687%2020.7429%20152.687%2020.3609C152.687%2019.9779%20152.998%2019.6669%20153.38%2019.6669H155.921C156.303%2019.6669%20156.613%2019.9779%20156.613%2020.3609C156.613%2020.7429%20156.303%2021.0529%20155.921%2021.0529ZM160.77%2020.3605C160.77%2020.7435%20161.08%2021.0525%20161.463%2021.0525H164.003C164.386%2021.0525%20164.696%2020.7435%20164.696%2020.3605C164.696%2019.9775%20164.386%2019.6675%20164.003%2019.6675H161.463C161.08%2019.6675%20160.77%2019.9775%20160.77%2020.3605ZM154.446%2023.6262L156.242%2021.8302C156.513%2021.5592%20156.951%2021.5592%20157.221%2021.8302C157.492%2022.1012%20157.492%2022.5392%20157.221%2022.8092L155.426%2024.6062C155.29%2024.7412%20155.113%2024.8092%20154.935%2024.8092C154.758%2024.8092%20154.581%2024.7412%20154.446%2024.6062C154.175%2024.3362%20154.175%2023.8962%20154.446%2023.6262ZM160.651%2019.0939C160.828%2019.0939%20161.005%2019.0259%20161.141%2018.8909L162.937%2017.0939C163.208%2016.8229%20163.208%2016.3849%20162.937%2016.1149C162.667%2015.8439%20162.228%2015.8439%20161.958%2016.1149L160.161%2017.9109C159.89%2018.1809%20159.89%2018.6199%20160.161%2018.8909C160.297%2019.0259%20160.474%2019.0939%20160.651%2019.0939ZM73.1276%20101.074C73.3196%20101.074%2073.4746%20101.23%2073.4746%20101.421V103.022C73.4746%20103.213%2073.3196%20103.368%2073.1276%20103.368C72.9366%20103.368%2072.7816%20103.213%2072.7816%20103.022V101.421C72.7816%20101.23%2072.9366%20101.074%2073.1276%20101.074ZM73.1279%20106.17C72.9369%20106.17%2072.7819%20106.325%2072.7819%20106.517V108.118C72.7819%20108.309%2072.9369%20108.464%2073.1279%20108.464C73.3189%20108.464%2073.4749%20108.309%2073.4749%20108.118V106.517C73.4749%20106.325%2073.3189%20106.17%2073.1279%20106.17ZM71.0057%20102.156L72.1377%20103.289C72.2727%20103.424%2072.2727%20103.643%2072.1377%20103.778C72.0697%20103.847%2071.9817%20103.88%2071.8927%20103.88C71.8047%20103.88%2071.7157%20103.847%2071.6477%20103.778L70.5147%20102.646C70.3797%20102.511%2070.3797%20102.292%2070.5147%20102.156C70.6507%20102.021%2070.8697%20102.021%2071.0057%20102.156ZM74.1187%20105.76C73.9837%20105.895%2073.9837%20106.114%2074.1187%20106.249L75.2507%20107.382C75.3187%20107.449%2075.4077%20107.484%2075.4957%20107.484C75.5847%20107.484%2075.6737%20107.449%2075.7407%20107.382C75.8757%20107.246%2075.8757%20107.028%2075.7407%20106.892L74.6087%20105.76C74.4727%20105.624%2074.2537%20105.624%2074.1187%20105.76ZM71.3811%20104.423C71.5721%20104.423%2071.7271%20104.579%2071.7271%20104.77C71.7271%20104.96%2071.5721%20105.116%2071.3811%20105.116H69.7791C69.5881%20105.116%2069.4331%20104.96%2069.4331%20104.77C69.4331%20104.579%2069.5881%20104.423%2069.7791%20104.423H71.3811ZM74.5288%20104.77C74.5288%20104.96%2074.6838%20105.116%2074.8748%20105.116H76.4768C76.6678%20105.116%2076.8228%20104.96%2076.8228%20104.77C76.8228%20104.579%2076.6678%20104.423%2076.4768%20104.423H74.8748C74.6838%20104.423%2074.5288%20104.579%2074.5288%20104.77ZM71.0053%20107.382C70.9373%20107.45%2070.8483%20107.483%2070.7603%20107.483C70.6713%20107.483%2070.5833%20107.45%2070.5153%20107.382C70.3803%20107.246%2070.3803%20107.027%2070.5153%20106.892L71.6473%20105.759C71.7833%20105.624%2072.0023%20105.624%2072.1373%20105.759C72.2733%20105.895%2072.2733%20106.115%2072.1373%20106.249L71.0053%20107.382ZM74.1187%20103.778C74.1857%20103.846%2074.2747%20103.88%2074.3637%20103.88C74.4517%20103.88%2074.5407%20103.846%2074.6087%20103.778L75.7407%20102.646C75.8757%20102.51%2075.8757%20102.292%2075.7407%20102.156C75.6057%20102.021%2075.3867%20102.021%2075.2507%20102.156L74.1187%20103.289C73.9837%20103.424%2073.9837%20103.643%2074.1187%20103.778ZM56.7369%2075.4454C57.0529%2075.1304%2057.5649%2075.1304%2057.8799%2075.4454L61.0829%2078.6484C61.3989%2078.9644%2061.3989%2079.4754%2061.0839%2079.7914C60.9249%2079.9494%2060.7179%2080.0284%2060.5119%2080.0284C60.3049%2080.0284%2060.0979%2079.9494%2059.9399%2079.7914L56.7369%2076.5894C56.4219%2076.2724%2056.4219%2075.7604%2056.7369%2075.4454ZM67.4702%2086.9865C67.6772%2086.9865%2067.8842%2086.9085%2068.0412%2086.7505C68.3572%2086.4345%2068.3572%2085.9235%2068.0412%2085.6065L64.8382%2082.4045C64.5232%2082.0885%2064.0112%2082.0885%2063.6952%2082.4045C63.3802%2082.7195%2063.3802%2083.2315%2063.6952%2083.5475L66.8982%2086.7505C67.0562%2086.9085%2067.2632%2086.9865%2067.4702%2086.9865ZM56.737%2085.6064L59.94%2082.4044C60.256%2082.0894%2060.768%2082.0894%2061.084%2082.4044C61.399%2082.7194%2061.399%2083.2314%2061.083%2083.5474L57.88%2086.7504C57.722%2086.9084%2057.516%2086.9864%2057.309%2086.9864C57.102%2086.9864%2056.895%2086.9084%2056.737%2086.7504C56.421%2086.4344%2056.421%2085.9234%2056.737%2085.6064ZM66.8984%2075.4454L63.6954%2078.6484C63.3794%2078.9644%2063.3794%2079.4754%2063.6954%2079.7914C63.8534%2079.9494%2064.0604%2080.0284%2064.2674%2080.0284C64.4734%2080.0284%2064.6804%2079.9494%2064.8384%2079.7914L68.0414%2076.5894C68.3574%2076.2724%2068.3574%2075.7604%2068.0414%2075.4454C67.7264%2075.1304%2067.2144%2075.1304%2066.8984%2075.4454ZM254.416%2044.5743C254.416%2044.8293%20254.21%2045.0363%20253.955%2045.0363C253.7%2045.0363%20253.493%2044.8293%20253.493%2044.5743V42.5303C253.493%2042.2753%20253.7%2042.0683%20253.955%2042.0683C254.21%2042.0683%20254.416%2042.2753%20254.416%2042.5303V44.5743ZM253.955%2051.5372C254.21%2051.5372%20254.416%2051.3302%20254.416%2051.0752V49.0322C254.416%2048.7772%20254.21%2048.5702%20253.955%2048.5702C253.7%2048.5702%20253.493%2048.7772%20253.493%2049.0322V51.0752C253.493%2051.3302%20253.7%2051.5372%20253.955%2051.5372ZM252.052%2045.5535L250.607%2044.1085C250.426%2043.9275%20250.426%2043.6355%20250.607%2043.4555C250.787%2043.2755%20251.08%2043.2755%20251.26%2043.4555L252.705%2044.9005C252.885%2045.0805%20252.885%2045.3735%20252.705%2045.5535C252.614%2045.6435%20252.496%2045.6885%20252.378%2045.6885C252.26%2045.6885%20252.142%2045.6435%20252.052%2045.5535ZM256.649%2050.1505C256.739%2050.2405%20256.857%2050.2865%20256.975%2050.2865C257.093%2050.2865%20257.211%2050.2405%20257.302%2050.1505C257.482%2049.9695%20257.482%2049.6775%20257.302%2049.4975L255.857%2048.0525C255.677%2047.8725%20255.384%2047.8725%20255.204%2048.0525C255.024%2048.2335%20255.024%2048.5255%20255.204%2048.7065L256.649%2050.1505ZM252.188%2046.8028C252.188%2047.0578%20251.981%2047.2648%20251.726%2047.2648H249.683C249.428%2047.2648%20249.221%2047.0578%20249.221%2046.8028C249.221%2046.5478%20249.428%2046.3408%20249.683%2046.3408H251.726C251.981%2046.3408%20252.188%2046.5478%20252.188%2046.8028ZM255.722%2046.8029C255.722%2047.0579%20255.929%2047.2649%20256.184%2047.2649H258.227C258.482%2047.2649%20258.689%2047.0579%20258.689%2046.8029C258.689%2046.5479%20258.482%2046.3409%20258.227%2046.3409H256.184C255.929%2046.3409%20255.722%2046.5479%20255.722%2046.8029ZM252.705%2048.7065L251.26%2050.1505C251.17%2050.2405%20251.052%2050.2865%20250.934%2050.2865C250.816%2050.2865%20250.698%2050.2405%20250.607%2050.1505C250.427%2049.9695%20250.427%2049.6775%20250.607%2049.4975L252.052%2048.0525C252.232%2047.8725%20252.525%2047.8725%20252.705%2048.0525C252.885%2048.2335%20252.885%2048.5255%20252.705%2048.7065ZM255.531%2045.6886C255.649%2045.6886%20255.767%2045.6436%20255.857%2045.5536L257.302%2044.1086C257.483%2043.9276%20257.483%2043.6356%20257.302%2043.4556C257.122%2043.2756%20256.829%2043.2756%20256.649%2043.4556L255.204%2044.9006C255.024%2045.0806%20255.024%2045.3736%20255.204%2045.5536C255.295%2045.6436%20255.413%2045.6886%20255.531%2045.6886ZM183.744%2012.2736C183.518%2012.4996%20183.518%2012.8656%20183.744%2013.0896C183.857%2013.2036%20184.004%2013.2596%20184.152%2013.2596C184.3%2013.2596%20184.448%2013.2036%20184.56%2013.0896L185.867%2011.7846H187.173L188.479%2013.0896C188.592%2013.2036%20188.74%2013.2596%20188.888%2013.2596C189.035%2013.2596%20189.183%2013.2036%20189.296%2013.0896C189.521%2012.8656%20189.521%2012.4996%20189.296%2012.2736L187.99%2010.9676V9.6616L189.296%208.3546C189.521%208.1286%20189.521%207.7636%20189.296%207.5386C189.071%207.3126%20188.705%207.3126%20188.479%207.5386L187.173%208.8446H185.867L184.56%207.5386C184.335%207.3126%20183.97%207.3126%20183.744%207.5386C183.518%207.7636%20183.518%208.1286%20183.744%208.3546L185.05%209.6616V10.9676L183.744%2012.2736ZM245.294%2013.6632H243.447C243.128%2013.6632%20242.869%2013.4042%20242.869%2013.0862C242.869%2012.7672%20243.128%2012.5082%20243.447%2012.5082H245.294L246.218%2011.5842V9.7372C246.218%209.4182%20246.476%209.1592%20246.796%209.1592C247.114%209.1592%20247.373%209.4182%20247.373%209.7372V11.5842L248.297%2012.5082H250.144C250.463%2012.5082%20250.721%2012.7672%20250.721%2013.0862C250.721%2013.4042%20250.463%2013.6632%20250.144%2013.6632H248.297L247.373%2014.5872V16.4342C247.373%2016.7532%20247.114%2017.0122%20246.796%2017.0122C246.476%2017.0122%20246.218%2016.7532%20246.218%2016.4342V14.5872L245.294%2013.6632Z'%20fill='%23F7C200'/%3e%3c/svg%3e", u2 = ({
  isWidgetAuthorized: A
}) => {
  const e = f("partoo_chat_header_title_menu_whatsapp_messenger"), t = f(
    "partoo_chat_menu_channels_selection_menu_description"
  );
  return /* @__PURE__ */ M("div", { id: "no-channel-modal-container", children: [
    /* @__PURE__ */ c(dA, { title: e, description: t }),
    /* @__PURE__ */ M("div", { id: "no-channel-modal-body", children: [
      /* @__PURE__ */ c("img", { id: "no-channel-illustration", src: Gn, alt: "" }),
      /* @__PURE__ */ c(Ln, { isWidgetAuthorized: A }),
      /* @__PURE__ */ c(Dn, { isWidgetAuthorized: A })
    ] })
  ] });
}, Ln = ({ isWidgetAuthorized: A }) => {
  const e = f(A ? "sms_web_widget_error_hey" : "sms_web_widget_error_hey_unauthorized");
  return /* @__PURE__ */ c("span", { id: "no-channel-hey-text", children: e });
}, Dn = ({ isWidgetAuthorized: A }) => {
  const e = f(A ? "partoo_chat_error_no_channels_available" : "partoo_chat_error_no_channels_available_unauthorized");
  return /* @__PURE__ */ c("span", { id: "no-channel-text", children: e });
};
var IA = {}, Rn = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, P2 = {}, D = {};
let S0;
const Fn = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
D.getSymbolSize = function(e) {
  if (!e)
    throw new Error('"version" cannot be null or undefined');
  if (e < 1 || e > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return e * 4 + 17;
};
D.getSymbolTotalCodewords = function(e) {
  return Fn[e];
};
D.getBCHDigit = function(A) {
  let e = 0;
  for (; A !== 0; )
    e++, A >>>= 1;
  return e;
};
D.setToSJISFunction = function(e) {
  if (typeof e != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  S0 = e;
};
D.isKanjiModeEnabled = function() {
  return typeof S0 < "u";
};
D.toSJIS = function(e) {
  return S0(e);
};
var KA = {};
(function(A) {
  A.L = { bit: 1 }, A.M = { bit: 0 }, A.Q = { bit: 3 }, A.H = { bit: 2 };
  function e(t) {
    if (typeof t != "string")
      throw new Error("Param is not a string");
    switch (t.toLowerCase()) {
      case "l":
      case "low":
        return A.L;
      case "m":
      case "medium":
        return A.M;
      case "q":
      case "quartile":
        return A.Q;
      case "h":
      case "high":
        return A.H;
      default:
        throw new Error("Unknown EC Level: " + t);
    }
  }
  A.isValid = function(o) {
    return o && typeof o.bit < "u" && o.bit >= 0 && o.bit < 4;
  }, A.from = function(o, n) {
    if (A.isValid(o))
      return o;
    try {
      return e(o);
    } catch {
      return n;
    }
  };
})(KA);
function W2() {
  this.buffer = [], this.length = 0;
}
W2.prototype = {
  get: function(A) {
    const e = Math.floor(A / 8);
    return (this.buffer[e] >>> 7 - A % 8 & 1) === 1;
  },
  put: function(A, e) {
    for (let t = 0; t < e; t++)
      this.putBit((A >>> e - t - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(A) {
    const e = Math.floor(this.length / 8);
    this.buffer.length <= e && this.buffer.push(0), A && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;
  }
};
var kn = W2;
function BA(A) {
  if (!A || A < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = A, this.data = new Uint8Array(A * A), this.reservedBit = new Uint8Array(A * A);
}
BA.prototype.set = function(A, e, t, o) {
  const n = A * this.size + e;
  this.data[n] = t, o && (this.reservedBit[n] = !0);
};
BA.prototype.get = function(A, e) {
  return this.data[A * this.size + e];
};
BA.prototype.xor = function(A, e, t) {
  this.data[A * this.size + e] ^= t;
};
BA.prototype.isReserved = function(A, e) {
  return this.reservedBit[A * this.size + e];
};
var Kn = BA, z2 = {};
(function(A) {
  const e = D.getSymbolSize;
  A.getRowColCoords = function(o) {
    if (o === 1)
      return [];
    const n = Math.floor(o / 7) + 2, i = e(o), r = i === 145 ? 26 : Math.ceil((i - 13) / (2 * n - 2)) * 2, d = [i - 7];
    for (let a = 1; a < n - 1; a++)
      d[a] = d[a - 1] - r;
    return d.push(6), d.reverse();
  }, A.getPositions = function(o) {
    const n = [], i = A.getRowColCoords(o), r = i.length;
    for (let d = 0; d < r; d++)
      for (let a = 0; a < r; a++)
        d === 0 && a === 0 || // top-left
        d === 0 && a === r - 1 || // bottom-left
        d === r - 1 && a === 0 || n.push([i[d], i[a]]);
    return n;
  };
})(z2);
var X2 = {};
const On = D.getSymbolSize, h2 = 7;
X2.getPositions = function(e) {
  const t = On(e);
  return [
    // top-left
    [0, 0],
    // top-right
    [t - h2, 0],
    // bottom-left
    [0, t - h2]
  ];
};
var V2 = {};
(function(A) {
  A.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const e = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  A.isValid = function(n) {
    return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
  }, A.from = function(n) {
    return A.isValid(n) ? parseInt(n, 10) : void 0;
  }, A.getPenaltyN1 = function(n) {
    const i = n.size;
    let r = 0, d = 0, a = 0, s = null, g = null;
    for (let h = 0; h < i; h++) {
      d = a = 0, s = g = null;
      for (let l = 0; l < i; l++) {
        let u = n.get(h, l);
        u === s ? d++ : (d >= 5 && (r += e.N1 + (d - 5)), s = u, d = 1), u = n.get(l, h), u === g ? a++ : (a >= 5 && (r += e.N1 + (a - 5)), g = u, a = 1);
      }
      d >= 5 && (r += e.N1 + (d - 5)), a >= 5 && (r += e.N1 + (a - 5));
    }
    return r;
  }, A.getPenaltyN2 = function(n) {
    const i = n.size;
    let r = 0;
    for (let d = 0; d < i - 1; d++)
      for (let a = 0; a < i - 1; a++) {
        const s = n.get(d, a) + n.get(d, a + 1) + n.get(d + 1, a) + n.get(d + 1, a + 1);
        (s === 4 || s === 0) && r++;
      }
    return r * e.N2;
  }, A.getPenaltyN3 = function(n) {
    const i = n.size;
    let r = 0, d = 0, a = 0;
    for (let s = 0; s < i; s++) {
      d = a = 0;
      for (let g = 0; g < i; g++)
        d = d << 1 & 2047 | n.get(s, g), g >= 10 && (d === 1488 || d === 93) && r++, a = a << 1 & 2047 | n.get(g, s), g >= 10 && (a === 1488 || a === 93) && r++;
    }
    return r * e.N3;
  }, A.getPenaltyN4 = function(n) {
    let i = 0;
    const r = n.data.length;
    for (let a = 0; a < r; a++)
      i += n.data[a];
    return Math.abs(Math.ceil(i * 100 / r / 5) - 10) * e.N4;
  };
  function t(o, n, i) {
    switch (o) {
      case A.Patterns.PATTERN000:
        return (n + i) % 2 === 0;
      case A.Patterns.PATTERN001:
        return n % 2 === 0;
      case A.Patterns.PATTERN010:
        return i % 3 === 0;
      case A.Patterns.PATTERN011:
        return (n + i) % 3 === 0;
      case A.Patterns.PATTERN100:
        return (Math.floor(n / 2) + Math.floor(i / 3)) % 2 === 0;
      case A.Patterns.PATTERN101:
        return n * i % 2 + n * i % 3 === 0;
      case A.Patterns.PATTERN110:
        return (n * i % 2 + n * i % 3) % 2 === 0;
      case A.Patterns.PATTERN111:
        return (n * i % 3 + (n + i) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + o);
    }
  }
  A.applyMask = function(n, i) {
    const r = i.size;
    for (let d = 0; d < r; d++)
      for (let a = 0; a < r; a++)
        i.isReserved(a, d) || i.xor(a, d, t(n, a, d));
  }, A.getBestMask = function(n, i) {
    const r = Object.keys(A.Patterns).length;
    let d = 0, a = 1 / 0;
    for (let s = 0; s < r; s++) {
      i(s), A.applyMask(s, n);
      const g = A.getPenaltyN1(n) + A.getPenaltyN2(n) + A.getPenaltyN3(n) + A.getPenaltyN4(n);
      A.applyMask(s, n), g < a && (a = g, d = s);
    }
    return d;
  };
})(V2);
var OA = {};
const Z = KA, EA = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], pA = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
OA.getBlocksCount = function(e, t) {
  switch (t) {
    case Z.L:
      return EA[(e - 1) * 4 + 0];
    case Z.M:
      return EA[(e - 1) * 4 + 1];
    case Z.Q:
      return EA[(e - 1) * 4 + 2];
    case Z.H:
      return EA[(e - 1) * 4 + 3];
    default:
      return;
  }
};
OA.getTotalCodewordsCount = function(e, t) {
  switch (t) {
    case Z.L:
      return pA[(e - 1) * 4 + 0];
    case Z.M:
      return pA[(e - 1) * 4 + 1];
    case Z.Q:
      return pA[(e - 1) * 4 + 2];
    case Z.H:
      return pA[(e - 1) * 4 + 3];
    default:
      return;
  }
};
var $2 = {}, YA = {};
const gA = new Uint8Array(512), DA = new Uint8Array(256);
(function() {
  let e = 1;
  for (let t = 0; t < 255; t++)
    gA[t] = e, DA[e] = t, e <<= 1, e & 256 && (e ^= 285);
  for (let t = 255; t < 512; t++)
    gA[t] = gA[t - 255];
})();
YA.log = function(e) {
  if (e < 1)
    throw new Error("log(" + e + ")");
  return DA[e];
};
YA.exp = function(e) {
  return gA[e];
};
YA.mul = function(e, t) {
  return e === 0 || t === 0 ? 0 : gA[DA[e] + DA[t]];
};
(function(A) {
  const e = YA;
  A.mul = function(o, n) {
    const i = new Uint8Array(o.length + n.length - 1);
    for (let r = 0; r < o.length; r++)
      for (let d = 0; d < n.length; d++)
        i[r + d] ^= e.mul(o[r], n[d]);
    return i;
  }, A.mod = function(o, n) {
    let i = new Uint8Array(o);
    for (; i.length - n.length >= 0; ) {
      const r = i[0];
      for (let a = 0; a < n.length; a++)
        i[a] ^= e.mul(n[a], r);
      let d = 0;
      for (; d < i.length && i[d] === 0; )
        d++;
      i = i.slice(d);
    }
    return i;
  }, A.generateECPolynomial = function(o) {
    let n = new Uint8Array([1]);
    for (let i = 0; i < o; i++)
      n = A.mul(n, new Uint8Array([1, e.exp(i)]));
    return n;
  };
})($2);
const _2 = $2;
function Q0(A) {
  this.genPoly = void 0, this.degree = A, this.degree && this.initialize(this.degree);
}
Q0.prototype.initialize = function(e) {
  this.degree = e, this.genPoly = _2.generateECPolynomial(this.degree);
};
Q0.prototype.encode = function(e) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const t = new Uint8Array(e.length + this.degree);
  t.set(e);
  const o = _2.mod(t, this.genPoly), n = this.degree - o.length;
  if (n > 0) {
    const i = new Uint8Array(this.degree);
    return i.set(o, n), i;
  }
  return o;
};
var Yn = Q0, Ae = {}, P = {}, b0 = {};
b0.isValid = function(e) {
  return !isNaN(e) && e >= 1 && e <= 40;
};
var J = {};
const ee = "[0-9]+", vn = "[A-Z $%*+\\-./:]+";
let hA = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
hA = hA.replace(/u/g, "\\u");
const Hn = "(?:(?![A-Z0-9 $%*+\\-./:]|" + hA + `)(?:.|[\r
]))+`;
J.KANJI = new RegExp(hA, "g");
J.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
J.BYTE = new RegExp(Hn, "g");
J.NUMERIC = new RegExp(ee, "g");
J.ALPHANUMERIC = new RegExp(vn, "g");
const Nn = new RegExp("^" + hA + "$"), Jn = new RegExp("^" + ee + "$"), Un = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
J.testKanji = function(e) {
  return Nn.test(e);
};
J.testNumeric = function(e) {
  return Jn.test(e);
};
J.testAlphanumeric = function(e) {
  return Un.test(e);
};
(function(A) {
  const e = b0, t = J;
  A.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, A.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, A.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, A.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, A.MIXED = {
    bit: -1
  }, A.getCharCountIndicator = function(i, r) {
    if (!i.ccBits)
      throw new Error("Invalid mode: " + i);
    if (!e.isValid(r))
      throw new Error("Invalid version: " + r);
    return r >= 1 && r < 10 ? i.ccBits[0] : r < 27 ? i.ccBits[1] : i.ccBits[2];
  }, A.getBestModeForData = function(i) {
    return t.testNumeric(i) ? A.NUMERIC : t.testAlphanumeric(i) ? A.ALPHANUMERIC : t.testKanji(i) ? A.KANJI : A.BYTE;
  }, A.toString = function(i) {
    if (i && i.id)
      return i.id;
    throw new Error("Invalid mode");
  }, A.isValid = function(i) {
    return i && i.bit && i.ccBits;
  };
  function o(n) {
    if (typeof n != "string")
      throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "numeric":
        return A.NUMERIC;
      case "alphanumeric":
        return A.ALPHANUMERIC;
      case "kanji":
        return A.KANJI;
      case "byte":
        return A.BYTE;
      default:
        throw new Error("Unknown mode: " + n);
    }
  }
  A.from = function(i, r) {
    if (A.isValid(i))
      return i;
    try {
      return o(i);
    } catch {
      return r;
    }
  };
})(P);
(function(A) {
  const e = D, t = OA, o = KA, n = P, i = b0, r = 7973, d = e.getBCHDigit(r);
  function a(l, u, C) {
    for (let B = 1; B <= 40; B++)
      if (u <= A.getCapacity(B, C, l))
        return B;
  }
  function s(l, u) {
    return n.getCharCountIndicator(l, u) + 4;
  }
  function g(l, u) {
    let C = 0;
    return l.forEach(function(B) {
      const p = s(B.mode, u);
      C += p + B.getBitsLength();
    }), C;
  }
  function h(l, u) {
    for (let C = 1; C <= 40; C++)
      if (g(l, C) <= A.getCapacity(C, u, n.MIXED))
        return C;
  }
  A.from = function(u, C) {
    return i.isValid(u) ? parseInt(u, 10) : C;
  }, A.getCapacity = function(u, C, B) {
    if (!i.isValid(u))
      throw new Error("Invalid QR Code version");
    typeof B > "u" && (B = n.BYTE);
    const p = e.getSymbolTotalCodewords(u), m = t.getTotalCodewordsCount(u, C), E = (p - m) * 8;
    if (B === n.MIXED)
      return E;
    const w = E - s(B, u);
    switch (B) {
      case n.NUMERIC:
        return Math.floor(w / 10 * 3);
      case n.ALPHANUMERIC:
        return Math.floor(w / 11 * 2);
      case n.KANJI:
        return Math.floor(w / 13);
      case n.BYTE:
      default:
        return Math.floor(w / 8);
    }
  }, A.getBestVersionForData = function(u, C) {
    let B;
    const p = o.from(C, o.M);
    if (Array.isArray(u)) {
      if (u.length > 1)
        return h(u, p);
      if (u.length === 0)
        return 1;
      B = u[0];
    } else
      B = u;
    return a(B.mode, B.getLength(), p);
  }, A.getEncodedBits = function(u) {
    if (!i.isValid(u) || u < 7)
      throw new Error("Invalid QR Code version");
    let C = u << 12;
    for (; e.getBCHDigit(C) - d >= 0; )
      C ^= r << e.getBCHDigit(C) - d;
    return u << 12 | C;
  };
})(Ae);
var te = {};
const c0 = D, oe = 1335, jn = 21522, C2 = c0.getBCHDigit(oe);
te.getEncodedBits = function(e, t) {
  const o = e.bit << 3 | t;
  let n = o << 10;
  for (; c0.getBCHDigit(n) - C2 >= 0; )
    n ^= oe << c0.getBCHDigit(n) - C2;
  return (o << 10 | n) ^ jn;
};
var ne = {};
const Tn = P;
function tA(A) {
  this.mode = Tn.NUMERIC, this.data = A.toString();
}
tA.getBitsLength = function(e) {
  return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
};
tA.prototype.getLength = function() {
  return this.data.length;
};
tA.prototype.getBitsLength = function() {
  return tA.getBitsLength(this.data.length);
};
tA.prototype.write = function(e) {
  let t, o, n;
  for (t = 0; t + 3 <= this.data.length; t += 3)
    o = this.data.substr(t, 3), n = parseInt(o, 10), e.put(n, 10);
  const i = this.data.length - t;
  i > 0 && (o = this.data.substr(t), n = parseInt(o, 10), e.put(n, i * 3 + 1));
};
var qn = tA;
const Zn = P, PA = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function oA(A) {
  this.mode = Zn.ALPHANUMERIC, this.data = A;
}
oA.getBitsLength = function(e) {
  return 11 * Math.floor(e / 2) + 6 * (e % 2);
};
oA.prototype.getLength = function() {
  return this.data.length;
};
oA.prototype.getBitsLength = function() {
  return oA.getBitsLength(this.data.length);
};
oA.prototype.write = function(e) {
  let t;
  for (t = 0; t + 2 <= this.data.length; t += 2) {
    let o = PA.indexOf(this.data[t]) * 45;
    o += PA.indexOf(this.data[t + 1]), e.put(o, 11);
  }
  this.data.length % 2 && e.put(PA.indexOf(this.data[t]), 6);
};
var Pn = oA, Wn = function(e) {
  for (var t = [], o = e.length, n = 0; n < o; n++) {
    var i = e.charCodeAt(n);
    if (i >= 55296 && i <= 56319 && o > n + 1) {
      var r = e.charCodeAt(n + 1);
      r >= 56320 && r <= 57343 && (i = (i - 55296) * 1024 + r - 56320 + 65536, n += 1);
    }
    if (i < 128) {
      t.push(i);
      continue;
    }
    if (i < 2048) {
      t.push(i >> 6 | 192), t.push(i & 63 | 128);
      continue;
    }
    if (i < 55296 || i >= 57344 && i < 65536) {
      t.push(i >> 12 | 224), t.push(i >> 6 & 63 | 128), t.push(i & 63 | 128);
      continue;
    }
    if (i >= 65536 && i <= 1114111) {
      t.push(i >> 18 | 240), t.push(i >> 12 & 63 | 128), t.push(i >> 6 & 63 | 128), t.push(i & 63 | 128);
      continue;
    }
    t.push(239, 191, 189);
  }
  return new Uint8Array(t).buffer;
};
const zn = Wn, Xn = P;
function nA(A) {
  this.mode = Xn.BYTE, typeof A == "string" && (A = zn(A)), this.data = new Uint8Array(A);
}
nA.getBitsLength = function(e) {
  return e * 8;
};
nA.prototype.getLength = function() {
  return this.data.length;
};
nA.prototype.getBitsLength = function() {
  return nA.getBitsLength(this.data.length);
};
nA.prototype.write = function(A) {
  for (let e = 0, t = this.data.length; e < t; e++)
    A.put(this.data[e], 8);
};
var Vn = nA;
const $n = P, _n = D;
function iA(A) {
  this.mode = $n.KANJI, this.data = A;
}
iA.getBitsLength = function(e) {
  return e * 13;
};
iA.prototype.getLength = function() {
  return this.data.length;
};
iA.prototype.getBitsLength = function() {
  return iA.getBitsLength(this.data.length);
};
iA.prototype.write = function(A) {
  let e;
  for (e = 0; e < this.data.length; e++) {
    let t = _n.toSJIS(this.data[e]);
    if (t >= 33088 && t <= 40956)
      t -= 33088;
    else if (t >= 57408 && t <= 60351)
      t -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[e] + `
Make sure your charset is UTF-8`
      );
    t = (t >>> 8 & 255) * 192 + (t & 255), A.put(t, 13);
  }
};
var Ai = iA, ie = { exports: {} };
(function(A) {
  var e = {
    single_source_shortest_paths: function(t, o, n) {
      var i = {}, r = {};
      r[o] = 0;
      var d = e.PriorityQueue.make();
      d.push(o, 0);
      for (var a, s, g, h, l, u, C, B, p; !d.empty(); ) {
        a = d.pop(), s = a.value, h = a.cost, l = t[s] || {};
        for (g in l)
          l.hasOwnProperty(g) && (u = l[g], C = h + u, B = r[g], p = typeof r[g] > "u", (p || B > C) && (r[g] = C, d.push(g, C), i[g] = s));
      }
      if (typeof n < "u" && typeof r[n] > "u") {
        var m = ["Could not find a path from ", o, " to ", n, "."].join("");
        throw new Error(m);
      }
      return i;
    },
    extract_shortest_path_from_predecessor_list: function(t, o) {
      for (var n = [], i = o; i; )
        n.push(i), t[i], i = t[i];
      return n.reverse(), n;
    },
    find_path: function(t, o, n) {
      var i = e.single_source_shortest_paths(t, o, n);
      return e.extract_shortest_path_from_predecessor_list(
        i,
        n
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(t) {
        var o = e.PriorityQueue, n = {}, i;
        t = t || {};
        for (i in o)
          o.hasOwnProperty(i) && (n[i] = o[i]);
        return n.queue = [], n.sorter = t.sorter || o.default_sorter, n;
      },
      default_sorter: function(t, o) {
        return t.cost - o.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(t, o) {
        var n = { value: t, cost: o };
        this.queue.push(n), this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  A.exports = e;
})(ie);
var ei = ie.exports;
(function(A) {
  const e = P, t = qn, o = Pn, n = Vn, i = Ai, r = J, d = D, a = ei;
  function s(m) {
    return unescape(encodeURIComponent(m)).length;
  }
  function g(m, E, w) {
    const I = [];
    let y;
    for (; (y = m.exec(w)) !== null; )
      I.push({
        data: y[0],
        index: y.index,
        mode: E,
        length: y[0].length
      });
    return I;
  }
  function h(m) {
    const E = g(r.NUMERIC, e.NUMERIC, m), w = g(r.ALPHANUMERIC, e.ALPHANUMERIC, m);
    let I, y;
    return d.isKanjiModeEnabled() ? (I = g(r.BYTE, e.BYTE, m), y = g(r.KANJI, e.KANJI, m)) : (I = g(r.BYTE_KANJI, e.BYTE, m), y = []), E.concat(w, I, y).sort(function(Q, b) {
      return Q.index - b.index;
    }).map(function(Q) {
      return {
        data: Q.data,
        mode: Q.mode,
        length: Q.length
      };
    });
  }
  function l(m, E) {
    switch (E) {
      case e.NUMERIC:
        return t.getBitsLength(m);
      case e.ALPHANUMERIC:
        return o.getBitsLength(m);
      case e.KANJI:
        return i.getBitsLength(m);
      case e.BYTE:
        return n.getBitsLength(m);
    }
  }
  function u(m) {
    return m.reduce(function(E, w) {
      const I = E.length - 1 >= 0 ? E[E.length - 1] : null;
      return I && I.mode === w.mode ? (E[E.length - 1].data += w.data, E) : (E.push(w), E);
    }, []);
  }
  function C(m) {
    const E = [];
    for (let w = 0; w < m.length; w++) {
      const I = m[w];
      switch (I.mode) {
        case e.NUMERIC:
          E.push([
            I,
            { data: I.data, mode: e.ALPHANUMERIC, length: I.length },
            { data: I.data, mode: e.BYTE, length: I.length }
          ]);
          break;
        case e.ALPHANUMERIC:
          E.push([
            I,
            { data: I.data, mode: e.BYTE, length: I.length }
          ]);
          break;
        case e.KANJI:
          E.push([
            I,
            { data: I.data, mode: e.BYTE, length: s(I.data) }
          ]);
          break;
        case e.BYTE:
          E.push([
            { data: I.data, mode: e.BYTE, length: s(I.data) }
          ]);
      }
    }
    return E;
  }
  function B(m, E) {
    const w = {}, I = { start: {} };
    let y = ["start"];
    for (let S = 0; S < m.length; S++) {
      const Q = m[S], b = [];
      for (let O = 0; O < Q.length; O++) {
        const R = Q[O], F = "" + S + O;
        b.push(F), w[F] = { node: R, lastCount: 0 }, I[F] = {};
        for (let Y = 0; Y < y.length; Y++) {
          const U = y[Y];
          w[U] && w[U].node.mode === R.mode ? (I[U][F] = l(w[U].lastCount + R.length, R.mode) - l(w[U].lastCount, R.mode), w[U].lastCount += R.length) : (w[U] && (w[U].lastCount = R.length), I[U][F] = l(R.length, R.mode) + 4 + e.getCharCountIndicator(R.mode, E));
        }
      }
      y = b;
    }
    for (let S = 0; S < y.length; S++)
      I[y[S]].end = 0;
    return { map: I, table: w };
  }
  function p(m, E) {
    let w;
    const I = e.getBestModeForData(m);
    if (w = e.from(E, I), w !== e.BYTE && w.bit < I.bit)
      throw new Error('"' + m + '" cannot be encoded with mode ' + e.toString(w) + `.
 Suggested mode is: ` + e.toString(I));
    switch (w === e.KANJI && !d.isKanjiModeEnabled() && (w = e.BYTE), w) {
      case e.NUMERIC:
        return new t(m);
      case e.ALPHANUMERIC:
        return new o(m);
      case e.KANJI:
        return new i(m);
      case e.BYTE:
        return new n(m);
    }
  }
  A.fromArray = function(E) {
    return E.reduce(function(w, I) {
      return typeof I == "string" ? w.push(p(I, null)) : I.data && w.push(p(I.data, I.mode)), w;
    }, []);
  }, A.fromString = function(E, w) {
    const I = h(E, d.isKanjiModeEnabled()), y = C(I), S = B(y, w), Q = a.find_path(S.map, "start", "end"), b = [];
    for (let O = 1; O < Q.length - 1; O++)
      b.push(S.table[Q[O]].node);
    return A.fromArray(u(b));
  }, A.rawSplit = function(E) {
    return A.fromArray(
      h(E, d.isKanjiModeEnabled())
    );
  };
})(ne);
const vA = D, WA = KA, ti = kn, oi = Kn, ni = z2, ii = X2, l0 = V2, u0 = OA, ri = Yn, RA = Ae, di = te, ai = P, zA = ne;
function si(A, e) {
  const t = A.size, o = ii.getPositions(e);
  for (let n = 0; n < o.length; n++) {
    const i = o[n][0], r = o[n][1];
    for (let d = -1; d <= 7; d++)
      if (!(i + d <= -1 || t <= i + d))
        for (let a = -1; a <= 7; a++)
          r + a <= -1 || t <= r + a || (d >= 0 && d <= 6 && (a === 0 || a === 6) || a >= 0 && a <= 6 && (d === 0 || d === 6) || d >= 2 && d <= 4 && a >= 2 && a <= 4 ? A.set(i + d, r + a, !0, !0) : A.set(i + d, r + a, !1, !0));
  }
}
function gi(A) {
  const e = A.size;
  for (let t = 8; t < e - 8; t++) {
    const o = t % 2 === 0;
    A.set(t, 6, o, !0), A.set(6, t, o, !0);
  }
}
function ci(A, e) {
  const t = ni.getPositions(e);
  for (let o = 0; o < t.length; o++) {
    const n = t[o][0], i = t[o][1];
    for (let r = -2; r <= 2; r++)
      for (let d = -2; d <= 2; d++)
        r === -2 || r === 2 || d === -2 || d === 2 || r === 0 && d === 0 ? A.set(n + r, i + d, !0, !0) : A.set(n + r, i + d, !1, !0);
  }
}
function li(A, e) {
  const t = A.size, o = RA.getEncodedBits(e);
  let n, i, r;
  for (let d = 0; d < 18; d++)
    n = Math.floor(d / 3), i = d % 3 + t - 8 - 3, r = (o >> d & 1) === 1, A.set(n, i, r, !0), A.set(i, n, r, !0);
}
function XA(A, e, t) {
  const o = A.size, n = di.getEncodedBits(e, t);
  let i, r;
  for (i = 0; i < 15; i++)
    r = (n >> i & 1) === 1, i < 6 ? A.set(i, 8, r, !0) : i < 8 ? A.set(i + 1, 8, r, !0) : A.set(o - 15 + i, 8, r, !0), i < 8 ? A.set(8, o - i - 1, r, !0) : i < 9 ? A.set(8, 15 - i - 1 + 1, r, !0) : A.set(8, 15 - i - 1, r, !0);
  A.set(o - 8, 8, 1, !0);
}
function ui(A, e) {
  const t = A.size;
  let o = -1, n = t - 1, i = 7, r = 0;
  for (let d = t - 1; d > 0; d -= 2)
    for (d === 6 && d--; ; ) {
      for (let a = 0; a < 2; a++)
        if (!A.isReserved(n, d - a)) {
          let s = !1;
          r < e.length && (s = (e[r] >>> i & 1) === 1), A.set(n, d - a, s), i--, i === -1 && (r++, i = 7);
        }
      if (n += o, n < 0 || t <= n) {
        n -= o, o = -o;
        break;
      }
    }
}
function hi(A, e, t) {
  const o = new ti();
  t.forEach(function(a) {
    o.put(a.mode.bit, 4), o.put(a.getLength(), ai.getCharCountIndicator(a.mode, A)), a.write(o);
  });
  const n = vA.getSymbolTotalCodewords(A), i = u0.getTotalCodewordsCount(A, e), r = (n - i) * 8;
  for (o.getLengthInBits() + 4 <= r && o.put(0, 4); o.getLengthInBits() % 8 !== 0; )
    o.putBit(0);
  const d = (r - o.getLengthInBits()) / 8;
  for (let a = 0; a < d; a++)
    o.put(a % 2 ? 17 : 236, 8);
  return Ci(o, A, e);
}
function Ci(A, e, t) {
  const o = vA.getSymbolTotalCodewords(e), n = u0.getTotalCodewordsCount(e, t), i = o - n, r = u0.getBlocksCount(e, t), d = o % r, a = r - d, s = Math.floor(o / r), g = Math.floor(i / r), h = g + 1, l = s - g, u = new ri(l);
  let C = 0;
  const B = new Array(r), p = new Array(r);
  let m = 0;
  const E = new Uint8Array(A.buffer);
  for (let Q = 0; Q < r; Q++) {
    const b = Q < a ? g : h;
    B[Q] = E.slice(C, C + b), p[Q] = u.encode(B[Q]), C += b, m = Math.max(m, b);
  }
  const w = new Uint8Array(o);
  let I = 0, y, S;
  for (y = 0; y < m; y++)
    for (S = 0; S < r; S++)
      y < B[S].length && (w[I++] = B[S][y]);
  for (y = 0; y < l; y++)
    for (S = 0; S < r; S++)
      w[I++] = p[S][y];
  return w;
}
function mi(A, e, t, o) {
  let n;
  if (Array.isArray(A))
    n = zA.fromArray(A);
  else if (typeof A == "string") {
    let s = e;
    if (!s) {
      const g = zA.rawSplit(A);
      s = RA.getBestVersionForData(g, t);
    }
    n = zA.fromString(A, s || 40);
  } else
    throw new Error("Invalid data");
  const i = RA.getBestVersionForData(n, t);
  if (!i)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!e)
    e = i;
  else if (e < i)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + i + `.
`
    );
  const r = hi(e, t, n), d = vA.getSymbolSize(e), a = new oi(d);
  return si(a, e), gi(a), ci(a, e), XA(a, t, 0), e >= 7 && li(a, e), ui(a, r), isNaN(o) && (o = l0.getBestMask(
    a,
    XA.bind(null, a, t)
  )), l0.applyMask(o, a), XA(a, t, o), {
    modules: a,
    version: e,
    errorCorrectionLevel: t,
    maskPattern: o,
    segments: n
  };
}
P2.create = function(e, t) {
  if (typeof e > "u" || e === "")
    throw new Error("No input text");
  let o = WA.M, n, i;
  return typeof t < "u" && (o = WA.from(t.errorCorrectionLevel, WA.M), n = RA.from(t.version), i = l0.from(t.maskPattern), t.toSJISFunc && vA.setToSJISFunction(t.toSJISFunc)), mi(e, n, o, i);
};
var re = {}, x0 = {};
(function(A) {
  function e(t) {
    if (typeof t == "number" && (t = t.toString()), typeof t != "string")
      throw new Error("Color should be defined as hex string");
    let o = t.slice().replace("#", "").split("");
    if (o.length < 3 || o.length === 5 || o.length > 8)
      throw new Error("Invalid hex color: " + t);
    (o.length === 3 || o.length === 4) && (o = Array.prototype.concat.apply([], o.map(function(i) {
      return [i, i];
    }))), o.length === 6 && o.push("F", "F");
    const n = parseInt(o.join(""), 16);
    return {
      r: n >> 24 & 255,
      g: n >> 16 & 255,
      b: n >> 8 & 255,
      a: n & 255,
      hex: "#" + o.slice(0, 6).join("")
    };
  }
  A.getOptions = function(o) {
    o || (o = {}), o.color || (o.color = {});
    const n = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, i = o.width && o.width >= 21 ? o.width : void 0, r = o.scale || 4;
    return {
      width: i,
      scale: i ? 4 : r,
      margin: n,
      color: {
        dark: e(o.color.dark || "#000000ff"),
        light: e(o.color.light || "#ffffffff")
      },
      type: o.type,
      rendererOpts: o.rendererOpts || {}
    };
  }, A.getScale = function(o, n) {
    return n.width && n.width >= o + n.margin * 2 ? n.width / (o + n.margin * 2) : n.scale;
  }, A.getImageWidth = function(o, n) {
    const i = A.getScale(o, n);
    return Math.floor((o + n.margin * 2) * i);
  }, A.qrToImageData = function(o, n, i) {
    const r = n.modules.size, d = n.modules.data, a = A.getScale(r, i), s = Math.floor((r + i.margin * 2) * a), g = i.margin * a, h = [i.color.light, i.color.dark];
    for (let l = 0; l < s; l++)
      for (let u = 0; u < s; u++) {
        let C = (l * s + u) * 4, B = i.color.light;
        if (l >= g && u >= g && l < s - g && u < s - g) {
          const p = Math.floor((l - g) / a), m = Math.floor((u - g) / a);
          B = h[d[p * r + m] ? 1 : 0];
        }
        o[C++] = B.r, o[C++] = B.g, o[C++] = B.b, o[C] = B.a;
      }
  };
})(x0);
(function(A) {
  const e = x0;
  function t(n, i, r) {
    n.clearRect(0, 0, i.width, i.height), i.style || (i.style = {}), i.height = r, i.width = r, i.style.height = r + "px", i.style.width = r + "px";
  }
  function o() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  A.render = function(i, r, d) {
    let a = d, s = r;
    typeof a > "u" && (!r || !r.getContext) && (a = r, r = void 0), r || (s = o()), a = e.getOptions(a);
    const g = e.getImageWidth(i.modules.size, a), h = s.getContext("2d"), l = h.createImageData(g, g);
    return e.qrToImageData(l.data, i, a), t(h, s, g), h.putImageData(l, 0, 0), s;
  }, A.renderToDataURL = function(i, r, d) {
    let a = d;
    typeof a > "u" && (!r || !r.getContext) && (a = r, r = void 0), a || (a = {});
    const s = A.render(i, r, a), g = a.type || "image/png", h = a.rendererOpts || {};
    return s.toDataURL(g, h.quality);
  };
})(re);
var de = {};
const wi = x0;
function m2(A, e) {
  const t = A.a / 255, o = e + '="' + A.hex + '"';
  return t < 1 ? o + " " + e + '-opacity="' + t.toFixed(2).slice(1) + '"' : o;
}
function VA(A, e, t) {
  let o = A + e;
  return typeof t < "u" && (o += " " + t), o;
}
function Ii(A, e, t) {
  let o = "", n = 0, i = !1, r = 0;
  for (let d = 0; d < A.length; d++) {
    const a = Math.floor(d % e), s = Math.floor(d / e);
    !a && !i && (i = !0), A[d] ? (r++, d > 0 && a > 0 && A[d - 1] || (o += i ? VA("M", a + t, 0.5 + s + t) : VA("m", n, 0), n = 0, i = !1), a + 1 < e && A[d + 1] || (o += VA("h", r), r = 0)) : n++;
  }
  return o;
}
de.render = function(e, t, o) {
  const n = wi.getOptions(t), i = e.modules.size, r = e.modules.data, d = i + n.margin * 2, a = n.color.light.a ? "<path " + m2(n.color.light, "fill") + ' d="M0 0h' + d + "v" + d + 'H0z"/>' : "", s = "<path " + m2(n.color.dark, "stroke") + ' d="' + Ii(r, i, n.margin) + '"/>', g = 'viewBox="0 0 ' + d + " " + d + '"', l = '<svg xmlns="http://www.w3.org/2000/svg" ' + (n.width ? 'width="' + n.width + '" height="' + n.width + '" ' : "") + g + ' shape-rendering="crispEdges">' + a + s + `</svg>
`;
  return typeof o == "function" && o(null, l), l;
};
const Bi = Rn, h0 = P2, ae = re, Ei = de;
function G0(A, e, t, o, n) {
  const i = [].slice.call(arguments, 1), r = i.length, d = typeof i[r - 1] == "function";
  if (!d && !Bi())
    throw new Error("Callback required as last argument");
  if (d) {
    if (r < 2)
      throw new Error("Too few arguments provided");
    r === 2 ? (n = t, t = e, e = o = void 0) : r === 3 && (e.getContext && typeof n > "u" ? (n = o, o = void 0) : (n = o, o = t, t = e, e = void 0));
  } else {
    if (r < 1)
      throw new Error("Too few arguments provided");
    return r === 1 ? (t = e, e = o = void 0) : r === 2 && !e.getContext && (o = t, t = e, e = void 0), new Promise(function(a, s) {
      try {
        const g = h0.create(t, o);
        a(A(g, e, o));
      } catch (g) {
        s(g);
      }
    });
  }
  try {
    const a = h0.create(t, o);
    n(null, A(a, e, o));
  } catch (a) {
    n(a);
  }
}
IA.create = h0.create;
IA.toCanvas = G0.bind(null, ae.render);
IA.toDataURL = G0.bind(null, ae.renderToDataURL);
IA.toString = G0.bind(null, function(A, e, t) {
  return Ei.render(A, t);
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function SA(A, e, t, o) {
  function n(i) {
    return i instanceof t ? i : new t(function(r) {
      r(i);
    });
  }
  return new (t || (t = Promise))(function(i, r) {
    function d(g) {
      try {
        s(o.next(g));
      } catch (h) {
        r(h);
      }
    }
    function a(g) {
      try {
        s(o.throw(g));
      } catch (h) {
        r(h);
      }
    }
    function s(g) {
      g.done ? i(g.value) : n(g.value).then(d, a);
    }
    s((o = o.apply(A, e || [])).next());
  });
}
function QA(A, e) {
  var t = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, o, n, i, r;
  return r = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (r[Symbol.iterator] = function() {
    return this;
  }), r;
  function d(s) {
    return function(g) {
      return a([s, g]);
    };
  }
  function a(s) {
    if (o)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (o = 1, n && (i = s[0] & 2 ? n.return : s[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, s[1])).done)
          return i;
        switch (n = 0, i && (s = [s[0] & 2, i.value]), s[0]) {
          case 0:
          case 1:
            i = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, n = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (i = t.trys, !(i = i.length > 0 && i[i.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!i || s[1] > i[0] && s[1] < i[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < i[1]) {
              t.label = i[1], i = s;
              break;
            }
            if (i && t.label < i[2]) {
              t.label = i[2], t.ops.push(s);
              break;
            }
            i[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = e.call(A, t);
      } catch (g) {
        s = [6, g], n = 0;
      } finally {
        o = i = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}
var pi = function(A) {
  return function() {
    var e = Array.prototype.slice.call(arguments);
    return new Promise(function(t, o) {
      e.push(function(n, i) {
        n ? o(n) : t(i);
      }), A.apply(null, e);
    });
  };
};
function fi(A) {
  return typeof A == "function";
}
function se(A) {
  return typeof A == "string";
}
var Mi = IA, ge = pi(Mi.toCanvas), yi = function(A) {
  var e = A.canvas, t = A.content, o = A.width, n = o === void 0 ? 0 : o, i = A.nodeQrCodeOptions, r = i === void 0 ? {} : i;
  return r.errorCorrectionLevel = r.errorCorrectionLevel || Qi(t), Si(t, r).then(function(d) {
    return r.scale = n === 0 ? void 0 : n / d * 4, ge(e, t, r);
  });
}, Si = function(A, e) {
  var t = document.createElement("canvas");
  return ge(t, A, e).then(function() {
    return t.width;
  });
}, Qi = function(A) {
  return A.length > 36 ? "M" : A.length > 16 ? "Q" : "H";
}, bi = function(A) {
  var e = A.canvas, t = A.logo;
  if (!t || t === "")
    return Promise.resolve();
  var o = e.width;
  se(t) && (t = { src: t });
  var n = t, i = n.logoSize, r = i === void 0 ? 0.15 : i, d = n.borderColor, a = d === void 0 ? "#ffffff" : d, s = n.bgColor, g = s === void 0 ? a || "#ffffff" : s, h = n.borderSize, l = h === void 0 ? 0.05 : h, u = n.crossOrigin, C = n.borderRadius, B = C === void 0 ? 8 : C, p = n.logoRadius, m = p === void 0 ? 0 : p, E = typeof t == "string" ? t : t.src, w = o * r, I = o * (1 - r) / 2, y = o * (r + l), S = o * (1 - r - l) / 2, Q = e.getContext("2d");
  w2(Q)(S, S, y, y, B), Q.fillStyle = g, Q.fill();
  var b = new Image();
  b.setAttribute("crossOrigin", u || "anonymous"), b.src = E;
  var O = function(F) {
    Q.drawImage(F, I, I, w, w);
  }, R = function(F) {
    var Y = document.createElement("canvas");
    Y.width = I + w, Y.height = I + w, Y.getContext("2d").drawImage(F, I, I, w, w), w2(Q)(I, I, w, w, m), Q.fillStyle = Q.createPattern(Y, "no-repeat"), Q.fill();
  };
  return new Promise(function(F, Y) {
    b.onload = function() {
      m ? R(b) : O(b), F();
    }, b.onerror = function() {
      Y("logo load fail!");
    };
  });
}, w2 = function(A) {
  return function(e, t, o, n, i) {
    var r = Math.min(o, n);
    return i > r / 2 && (i = r / 2), A.beginPath(), A.moveTo(e + i, t), A.arcTo(e + o, t, e + o, t + n, i), A.arcTo(e + o, t + n, e, t + n, i), A.arcTo(e, t + n, e, t, i), A.arcTo(e, t, e + o, t, i), A.closePath(), A;
  };
}, ce = function(A) {
  return yi(A).then(function() {
    return bi(A);
  });
}, xi = function(A, e) {
  return SA(this, void 0, void 0, function() {
    var t, o, n, i, r, d;
    return QA(this, function(a) {
      switch (a.label) {
        case 0:
          return t = A.canvas, A.logo && (se(A.logo) && (A.logo = { src: A.logo }), A.logo.crossOrigin = "Anonymous"), e.ifCanvasDrawed ? [3, 2] : [4, ce(A)];
        case 1:
          a.sent(), a.label = 2;
        case 2:
          if (o = A.image, n = A.downloadName, i = n === void 0 ? "qr-code" : n, r = A.download, t.toDataURL())
            o.src = t.toDataURL();
          else
            throw new Error("Can not get the canvas DataURL");
          return e.ifImageCreated = !0, r !== !0 && !fi(r) ? [
            2
            /*return*/
          ] : (r = r === !0 ? function(s) {
            return s();
          } : r, d = function() {
            return le(o, i);
          }, r ? [2, r(d)] : [2, Promise.resolve()]);
      }
    });
  });
}, le = function(A, e) {
  return new Promise(function(t, o) {
    try {
      var n = A.src, i = document.createElement("a");
      i.download = e, i.href = n, i.dispatchEvent(new MouseEvent("click")), t(!0);
    } catch (r) {
      o(r);
    }
  });
}, Gi = "1.0.5", Li = (
  /** @class */
  function() {
    function A(e) {
      this.ifCanvasDrawed = !1, this.ifImageCreated = !1, this.defaultOption = {
        canvas: void 0,
        image: void 0,
        content: ""
      }, this.option = Object.assign(this.defaultOption, e), this.option.canvas || (this.option.canvas = document.createElement("canvas")), this.option.image || (this.option.image = document.createElement("img")), this.toCanvas().then(this.toImage.bind(this));
    }
    return A.prototype.toCanvas = function() {
      var e = this;
      return ce.call(this, this.option).then(function() {
        return e.ifCanvasDrawed = !0, Promise.resolve();
      });
    }, A.prototype.toImage = function() {
      return xi(this.option, this);
    }, A.prototype.downloadImage = function(e) {
      return e === void 0 && (e = "qrcode.png"), SA(this, void 0, void 0, function() {
        return QA(this, function(t) {
          switch (t.label) {
            case 0:
              return this.ifImageCreated ? [3, 2] : [4, this.toImage()];
            case 1:
              t.sent(), t.label = 2;
            case 2:
              return [2, le(this.option.image, e)];
          }
        });
      });
    }, A.prototype.getImage = function() {
      return SA(this, void 0, Promise, function() {
        return QA(this, function(e) {
          switch (e.label) {
            case 0:
              return this.ifImageCreated ? [3, 2] : [4, this.toImage()];
            case 1:
              e.sent(), e.label = 2;
            case 2:
              return [2, this.option.image];
          }
        });
      });
    }, A.prototype.getCanvas = function() {
      return SA(this, void 0, Promise, function() {
        return QA(this, function(e) {
          switch (e.label) {
            case 0:
              return this.ifCanvasDrawed ? [3, 2] : [4, this.toCanvas()];
            case 1:
              e.sent(), e.label = 2;
            case 2:
              return [2, this.option.canvas];
          }
        });
      });
    }, A.version = Gi, A;
  }()
);
const I2 = (A, e, t) => {
  const o = y0(A);
  return new Li({
    content: t,
    width: 100,
    image: e,
    logo: {
      src: o,
      logoSize: 0.3,
      borderSize: 0.1,
      borderRadius: 100
    },
    nodeQrCodeOptions: {
      margin: 1,
      errorCorrectionLevel: "H",
      color: {
        dark: "#142542"
      }
    }
  });
};
var bA = /* @__PURE__ */ ((A) => (A.SMS = "sms", A.WHATSAPP = "whatsapp", A.MESSENGER = "messenger", A))(bA || {});
const ue = () => {
  const [A] = X("showModal"), [e] = X("setShowModal"), [t] = X(
    "initialBodyOverflowStyle"
  ), [o] = X("options"), [n] = X("params"), [i] = X("isWidgetAuthorized"), [r, d] = x(null), [a, s] = x(""), [g, h] = x(""), { isBelowProvidedDevices: l } = wA(mA), u = UA(() => {
    if (!n || n.isExpired)
      return [];
    const I = [];
    return n.hasSmsActive && I.push("sms"), n.hasWhatsappActive && (o.isPreview || n.whatsappPhoneNumber) && I.push("whatsapp"), n.hasMessengerActive && (o.isPreview || n.facebookPageName) && I.push("messenger"), I;
  }, [
    n == null ? void 0 : n.isExpired,
    n == null ? void 0 : n.hasSmsActive,
    n == null ? void 0 : n.hasWhatsappActive,
    n == null ? void 0 : n.hasMessengerActive,
    n == null ? void 0 : n.whatsappPhoneNumber,
    n == null ? void 0 : n.facebookPageName
  ]), C = UA(() => n != null && n.hasWhatsappActive ? `https://wa.me/${n.whatsappPhoneNumber}` : null, [n == null ? void 0 : n.hasWhatsappActive, n == null ? void 0 : n.whatsappPhoneNumber]), B = UA(() => n != null && n.hasMessengerActive ? `https://messenger.com/t/${n.facebookPageName}` : null, [n == null ? void 0 : n.hasMessengerActive, n == null ? void 0 : n.facebookPageName]);
  _(() => {
    u.includes(
      "whatsapp"
      /* WHATSAPP */
    ) && I2(
      "whatsapp",
      /* @__PURE__ */ c("img", { alt: "" }),
      C
    ).getImage().then((S) => s(S.src)), u.includes(
      "messenger"
      /* MESSENGER */
    ) && I2(
      "messenger",
      /* @__PURE__ */ c("img", { alt: "" }),
      B
    ).getImage().then((S) => h(S.src));
  }, [u]), _(() => d(Ri(u)), [u]);
  const p = () => {
    switch (r) {
      case "sms":
        return /* @__PURE__ */ c(g2, { backAction: w, options: o });
      case "whatsapp":
      case "messenger":
      case "channelSelector":
        return /* @__PURE__ */ c(
          c2,
          {
            channels: u,
            whatsappLink: C,
            messengerLink: B,
            setModalState: d
          }
        );
      case "noChannel":
        return /* @__PURE__ */ c(u2, { isWidgetAuthorized: i });
    }
  }, m = () => {
    switch (r) {
      case "sms":
        return /* @__PURE__ */ c(g2, { backAction: w, options: o });
      case "whatsapp":
        return /* @__PURE__ */ c(
          l2,
          {
            channel: r,
            QRcode: a,
            link: C,
            backAction: w
          }
        );
      case "messenger":
        return /* @__PURE__ */ c(
          l2,
          {
            channel: r,
            QRcode: g,
            link: B,
            backAction: w
          }
        );
      case "channelSelector":
        return /* @__PURE__ */ c(
          c2,
          {
            channels: u,
            whatsappLink: C,
            messengerLink: B,
            setModalState: d
          }
        );
      case "noChannel":
        return /* @__PURE__ */ c(u2, { isWidgetAuthorized: i });
    }
  }, E = () => d(
    "channelSelector"
    /* CHANNEL_SELECTOR */
  ), w = u.length > 1 && E || null;
  return /* @__PURE__ */ M(
    "host",
    {
      id: "widget-modal",
      className: `modal-body ${A ? "visible" : "hidden"}`,
      children: [
        l ? p() : m(),
        l && /* @__PURE__ */ c(
          Di,
          {
            setShowModal: e,
            initialBodyOverflowStyle: t
          }
        )
      ]
    }
  );
};
ue.props = {
  showModal: Boolean,
  setShowModal: Function,
  initialBodyOverflowStyle: String,
  options: Object,
  params: Object,
  isWidgetAuthorized: Boolean
};
const he = C0(ue);
customElements.define(`${cA}-modal`, he);
const Di = ({
  setShowModal: A,
  initialBodyOverflowStyle: e
}) => /* @__PURE__ */ c(
  "div",
  {
    className: "close-mobile-container",
    onclick: () => {
      A(!1), document.body.style.overflow = e;
    },
    children: /* @__PURE__ */ c("img", { className: "icon-close-mobile", src: I0, alt: "" })
  }
), Ri = (A) => A.length == 0 ? "noChannel" : A.length == 1 ? A[0] : "channelSelector", Fi = ({
  options: A,
  params: e,
  setParams: t,
  initialBodyOverflowStyle: o
}) => {
  const [n, i] = x(!1), r = (s) => i(s), [d, a] = x(!0);
  return /* @__PURE__ */ M(w0, { children: [
    /* @__PURE__ */ c(
      Y1,
      {
        showModal: n,
        setShowModal: i,
        options: A,
        params: e,
        setParams: t,
        setWidgetAuthorized: a
      }
    ),
    /* @__PURE__ */ c(
      he,
      {
        showModal: n,
        setShowModal: r,
        initialBodyOverflowStyle: o,
        options: A,
        params: e,
        isWidgetAuthorized: d
      }
    )
  ] });
}, HA = document.createElement("link");
HA.setAttribute("rel", "stylesheet");
HA.setAttribute("type", "text/css");
HA.setAttribute(
  "href",
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap"
);
document.head.appendChild(HA);
const ki = document.body.style.overflow, T = E1(), Ki = p1(
  T.isPreview
);
function Oi(A) {
  let e;
  return /^#([A-Fa-f0-9]{3}){1,2}$/.test(A) ? (e = A.substring(1).split(""), e.length == 3 && (e = [e[0], e[0], e[1], e[1], e[2], e[2]]), e = "0x" + e.join(""), "rgba(" + [e >> 16 & 255, e >> 8 & 255, e & 255].join(",") + ",0.7)") : (console.error("Bad Hex"), A);
}
const Yi = (A) => {
  document.documentElement.style.setProperty("--main-color", A), document.documentElement.style.setProperty(
    "--gradient-color",
    Oi(A)
  );
}, vi = {
  "--mobile-margin-bottom": T.mobileMarginBottom,
  "--mobile-margin-right": T.mobileMarginRight,
  "--desktop-margin-bottom": T.desktopMarginBottom,
  "--desktop-margin-right": T.desktopMarginRight,
  "--desktop-launcher-margin-right": T.isPreview ? "0px" : "25px",
  "--desktop-launcher-margin-bottom": T.isPreview ? "0px" : "25px"
};
for (const [A, e] of Object.entries(vi))
  document.documentElement.style.setProperty(A, e);
function Ce() {
  const [A, e] = x(T), [t, o] = x(Ki);
  return _(() => (A.isPreview && (window.setWidgetPreviewOptions = (n) => {
    e({ ...A, ...n });
  }), () => {
    A.isPreview && delete window.setWidgetPreviewOptions;
  }), [A.isPreview, A, e]), _(() => (A.isPreview && (window.setWidgetPreviewParams = (n) => {
    o({ ...t, ...n });
  }), () => {
    A.isPreview && delete window.setWidgetPreviewParams;
  }), [A.isPreview, t, o]), _(() => {
    Yi(A.color);
  }, [A.color]), /* @__PURE__ */ c("host", { shadowDom: !0, children: /* @__PURE__ */ c(
    Fi,
    {
      options: A,
      params: t,
      setParams: o,
      initialBodyOverflowStyle: ki
    }
  ) });
}
Ce.styles = [s1];
customElements.define(cA, C0(Ce));
if (!T.isPreview) {
  const A = document.createElement(cA, {
    is: cA
  });
  document.body.appendChild(A);
}
