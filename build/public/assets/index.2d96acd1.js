(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function construct_svelte_component(component, props) {
  return new component(props);
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function handle_promise(promise, info) {
  const token = info.token = {};
  function update2(type, index, key, value) {
    if (info.token !== token)
      return;
    info.resolved = value;
    let child_ctx = info.ctx;
    if (key !== void 0) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }
    const block = type && (info.current = type)(child_ctx);
    let needs_flush = false;
    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach((block2, i) => {
          if (i !== index && block2) {
            group_outros();
            transition_out(block2, 1, 1, () => {
              if (info.blocks[i] === block2) {
                info.blocks[i] = null;
              }
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }
      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }
    info.block = block;
    if (info.blocks)
      info.blocks[index] = block;
    if (needs_flush) {
      flush();
    }
  }
  if (is_promise(promise)) {
    const current_component2 = get_current_component();
    promise.then((value) => {
      set_current_component(current_component2);
      update2(info.then, 1, info.value, value);
      set_current_component(null);
    }, (error) => {
      set_current_component(current_component2);
      update2(info.catch, 2, info.error, error);
      set_current_component(null);
      if (!info.hasCatch) {
        throw error;
      }
    });
    if (info.current !== info.pending) {
      update2(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update2(info.then, 1, info.value, promise);
      return true;
    }
    info.resolved = promise;
  }
}
function update_await_block_branch(info, ctx, dirty) {
  const child_ctx = ctx.slice();
  const { resolved } = info;
  if (info.current === info.then) {
    child_ctx[info.value] = resolved;
  }
  if (info.current === info.catch) {
    child_ctx[info.error] = resolved;
  }
  info.block.p(child_ctx, dirty);
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
const LOCATION = {};
const ROUTER = {};
function getLocation(source) {
  return {
    ...source.location,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
}
function createHistory(source, options) {
  const listeners = [];
  let location = getLocation(source);
  return {
    get location() {
      return location;
    },
    listen(listener) {
      listeners.push(listener);
      const popstateListener = () => {
        location = getLocation(source);
        listener({ location, action: "POP" });
      };
      source.addEventListener("popstate", popstateListener);
      return () => {
        source.removeEventListener("popstate", popstateListener);
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },
    navigate(to, { state, replace = false } = {}) {
      state = { ...state, key: Date.now() + "" };
      try {
        if (replace) {
          source.history.replaceState(state, null, to);
        } else {
          source.history.pushState(state, null, to);
        }
      } catch (e) {
        source.location[replace ? "replace" : "assign"](to);
      }
      location = getLocation(source);
      listeners.forEach((listener) => listener({ location, action: "PUSH" }));
    }
  };
}
function createMemorySource(initialPathname = "/") {
  let index = 0;
  const stack = [{ pathname: initialPathname, search: "" }];
  const states = [];
  return {
    get location() {
      return stack[index];
    },
    addEventListener(name, fn) {
    },
    removeEventListener(name, fn) {
    },
    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        index++;
        stack.push({ pathname, search });
        states.push(state);
      },
      replaceState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        stack[index] = { pathname, search };
        states[index] = state;
      }
    }
  };
}
const canUseDOM = Boolean(
  typeof window !== "undefined" && window.document && window.document.createElement
);
const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
const { navigate } = globalHistory;
const paramRe = /^:(.+)/;
const SEGMENT_POINTS = 4;
const STATIC_POINTS = 3;
const DYNAMIC_POINTS = 2;
const SPLAT_PENALTY = 1;
const ROOT_POINTS = 1;
function startsWith(string, search) {
  return string.substr(0, search.length) === search;
}
function isRootSegment(segment) {
  return segment === "";
}
function isDynamic(segment) {
  return paramRe.test(segment);
}
function isSplat(segment) {
  return segment[0] === "*";
}
function segmentize(uri) {
  return uri.replace(/(^\/+|\/+$)/g, "").split("/");
}
function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
}
function rankRoute(route, index) {
  const score = route.default ? 0 : segmentize(route.path).reduce((score2, segment) => {
    score2 += SEGMENT_POINTS;
    if (isRootSegment(segment)) {
      score2 += ROOT_POINTS;
    } else if (isDynamic(segment)) {
      score2 += DYNAMIC_POINTS;
    } else if (isSplat(segment)) {
      score2 -= SEGMENT_POINTS + SPLAT_PENALTY;
    } else {
      score2 += STATIC_POINTS;
    }
    return score2;
  }, 0);
  return { route, score, index };
}
function rankRoutes(routes) {
  return routes.map(rankRoute).sort(
    (a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
  );
}
function pick(routes, uri) {
  let match2;
  let default_;
  const [uriPathname] = uri.split("?");
  const uriSegments = segmentize(uriPathname);
  const isRootUri = uriSegments[0] === "";
  const ranked = rankRoutes(routes);
  for (let i = 0, l = ranked.length; i < l; i++) {
    const route = ranked[i].route;
    let missed = false;
    if (route.default) {
      default_ = {
        route,
        params: {},
        uri
      };
      continue;
    }
    const routeSegments = segmentize(route.path);
    const params = {};
    const max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;
    for (; index < max; index++) {
      const routeSegment = routeSegments[index];
      const uriSegment = uriSegments[index];
      if (routeSegment !== void 0 && isSplat(routeSegment)) {
        const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);
        params[splatName] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }
      if (uriSegment === void 0) {
        missed = true;
        break;
      }
      let dynamicMatch = paramRe.exec(routeSegment);
      if (dynamicMatch && !isRootUri) {
        const value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        missed = true;
        break;
      }
    }
    if (!missed) {
      match2 = {
        route,
        params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }
  return match2 || default_ || null;
}
function match(route, uri) {
  return pick([route], uri);
}
function addQuery(pathname, query) {
  return pathname + (query ? `?${query}` : "");
}
function resolve(to, base) {
  if (startsWith(to, "/")) {
    return to;
  }
  const [toPathname, toQuery] = to.split("?");
  const [basePathname] = base.split("?");
  const toSegments = segmentize(toPathname);
  const baseSegments = segmentize(basePathname);
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }
  if (!startsWith(toSegments[0], ".")) {
    const pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }
  const allSegments = baseSegments.concat(toSegments);
  const segments = [];
  allSegments.forEach((segment) => {
    if (segment === "..") {
      segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return addQuery("/" + segments.join("/"), toQuery);
}
function combinePaths(basepath, path) {
  return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
}
function shouldNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function create_fragment$6(ctx) {
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, null),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let $location;
  let $routes;
  let $base;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { basepath = "/" } = $$props;
  let { url = null } = $$props;
  const locationContext = getContext(LOCATION);
  const routerContext = getContext(ROUTER);
  const routes = writable([]);
  component_subscribe($$self, routes, (value) => $$invalidate(6, $routes = value));
  const activeRoute = writable(null);
  let hasActiveRoute = false;
  const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);
  component_subscribe($$self, location, (value) => $$invalidate(5, $location = value));
  const base = routerContext ? routerContext.routerBase : writable({ path: basepath, uri: basepath });
  component_subscribe($$self, base, (value) => $$invalidate(7, $base = value));
  const routerBase = derived([base, activeRoute], ([base2, activeRoute2]) => {
    if (activeRoute2 === null) {
      return base2;
    }
    const { path: basepath2 } = base2;
    const { route, uri } = activeRoute2;
    const path = route.default ? basepath2 : route.path.replace(/\*.*$/, "");
    return { path, uri };
  });
  function registerRoute(route) {
    const { path: basepath2 } = $base;
    let { path } = route;
    route._path = path;
    route.path = combinePaths(basepath2, path);
    if (typeof window === "undefined") {
      if (hasActiveRoute) {
        return;
      }
      const matchingRoute = match(route, $location.pathname);
      if (matchingRoute) {
        activeRoute.set(matchingRoute);
        hasActiveRoute = true;
      }
    } else {
      routes.update((rs) => {
        rs.push(route);
        return rs;
      });
    }
  }
  function unregisterRoute(route) {
    routes.update((rs) => {
      const index = rs.indexOf(route);
      rs.splice(index, 1);
      return rs;
    });
  }
  if (!locationContext) {
    onMount(() => {
      const unlisten = globalHistory.listen((history) => {
        location.set(history.location);
      });
      return unlisten;
    });
    setContext(LOCATION, location);
  }
  setContext(ROUTER, {
    activeRoute,
    base,
    routerBase,
    registerRoute,
    unregisterRoute
  });
  $$self.$$set = ($$props2) => {
    if ("basepath" in $$props2)
      $$invalidate(3, basepath = $$props2.basepath);
    if ("url" in $$props2)
      $$invalidate(4, url = $$props2.url);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 128) {
      {
        const { path: basepath2 } = $base;
        routes.update((rs) => {
          rs.forEach((r) => r.path = combinePaths(basepath2, r._path));
          return rs;
        });
      }
    }
    if ($$self.$$.dirty & 96) {
      {
        const bestMatch = pick($routes, $location.pathname);
        activeRoute.set(bestMatch);
      }
    }
  };
  return [
    routes,
    location,
    base,
    basepath,
    url,
    $location,
    $routes,
    $base,
    $$scope,
    slots
  ];
}
class Router extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$6, safe_not_equal, { basepath: 3, url: 4 });
  }
}
const get_default_slot_changes = (dirty) => ({
  params: dirty & 4,
  location: dirty & 16
});
const get_default_slot_context = (ctx) => ({
  params: ctx[2],
  location: ctx[4]
});
function create_if_block$1(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0] !== null)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block$1(ctx) {
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 532)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[9],
            !current ? get_all_dirty_from_scope(ctx2[9]) : get_slot_changes(default_slot_template, ctx2[9], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { location: ctx[4] },
    ctx[2],
    ctx[3]
  ];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 28 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 16 && { location: ctx2[4] },
        dirty & 4 && get_spread_object(ctx2[2]),
        dirty & 8 && get_spread_object(ctx2[3])
      ]) : {};
      if (switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] !== null && ctx[1].route === ctx[7] && create_if_block$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1] !== null && ctx2[1].route === ctx2[7]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let $activeRoute;
  let $location;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { path = "" } = $$props;
  let { component = null } = $$props;
  const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
  component_subscribe($$self, activeRoute, (value) => $$invalidate(1, $activeRoute = value));
  const location = getContext(LOCATION);
  component_subscribe($$self, location, (value) => $$invalidate(4, $location = value));
  const route = {
    path,
    default: path === ""
  };
  let routeParams = {};
  let routeProps = {};
  registerRoute(route);
  if (typeof window !== "undefined") {
    onDestroy(() => {
      unregisterRoute(route);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("path" in $$new_props)
      $$invalidate(8, path = $$new_props.path);
    if ("component" in $$new_props)
      $$invalidate(0, component = $$new_props.component);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      if ($activeRoute && $activeRoute.route === route) {
        $$invalidate(2, routeParams = $activeRoute.params);
      }
    }
    {
      const { path: path2, component: component2, ...rest } = $$props;
      $$invalidate(3, routeProps = rest);
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    component,
    $activeRoute,
    routeParams,
    routeProps,
    $location,
    activeRoute,
    location,
    route,
    path,
    $$scope,
    slots
  ];
}
class Route extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$5, safe_not_equal, { path: 8, component: 0 });
  }
}
function create_fragment$4(ctx) {
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[16].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[15], null);
  let a_levels = [
    { href: ctx[0] },
    { "aria-current": ctx[2] },
    ctx[1],
    ctx[6]
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(a, "click", ctx[5]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32768)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[15],
            !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(default_slot_template, ctx2[15], dirty, null),
            null
          );
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        (!current || dirty & 1) && { href: ctx2[0] },
        (!current || dirty & 4) && { "aria-current": ctx2[2] },
        dirty & 2 && ctx2[1],
        dirty & 64 && ctx2[6]
      ]));
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let ariaCurrent;
  const omit_props_names = ["to", "replace", "state", "getProps"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $location;
  let $base;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { to = "#" } = $$props;
  let { replace = false } = $$props;
  let { state = {} } = $$props;
  let { getProps = () => ({}) } = $$props;
  const { base } = getContext(ROUTER);
  component_subscribe($$self, base, (value) => $$invalidate(14, $base = value));
  const location = getContext(LOCATION);
  component_subscribe($$self, location, (value) => $$invalidate(13, $location = value));
  const dispatch = createEventDispatcher();
  let href, isPartiallyCurrent, isCurrent, props;
  function onClick(event) {
    dispatch("click", event);
    if (shouldNavigate(event)) {
      event.preventDefault();
      const shouldReplace = $location.pathname === href || replace;
      navigate(href, { state, replace: shouldReplace });
    }
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("to" in $$new_props)
      $$invalidate(7, to = $$new_props.to);
    if ("replace" in $$new_props)
      $$invalidate(8, replace = $$new_props.replace);
    if ("state" in $$new_props)
      $$invalidate(9, state = $$new_props.state);
    if ("getProps" in $$new_props)
      $$invalidate(10, getProps = $$new_props.getProps);
    if ("$$scope" in $$new_props)
      $$invalidate(15, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 16512) {
      $$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    }
    if ($$self.$$.dirty & 8193) {
      $$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    }
    if ($$self.$$.dirty & 8193) {
      $$invalidate(12, isCurrent = href === $location.pathname);
    }
    if ($$self.$$.dirty & 4096) {
      $$invalidate(2, ariaCurrent = isCurrent ? "page" : void 0);
    }
    if ($$self.$$.dirty & 15361) {
      $$invalidate(1, props = getProps({
        location: $location,
        href,
        isPartiallyCurrent,
        isCurrent
      }));
    }
  };
  return [
    href,
    props,
    ariaCurrent,
    base,
    location,
    onClick,
    $$restProps,
    to,
    replace,
    state,
    getProps,
    isPartiallyCurrent,
    isCurrent,
    $location,
    $base,
    $$scope,
    slots
  ];
}
class Link extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$4, safe_not_equal, {
      to: 7,
      replace: 8,
      state: 9,
      getProps: 10
    });
  }
}
const Home_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let main;
  return {
    c() {
      main = element("main");
      main.innerHTML = `<h1>Home</h1> 
  <p>Welcome to Electron + Svelte + Typescript template.</p> 
  <p>It provide the minimal requirement to start developping a Svelte SPA with Electron.</p> 
  <p>Checkout <a href="https://github.com/ptkdev-boilerplate/svelte-electron-boilerplate" class="svelte-bz69ze">https://github.com/ptkdev-boilerplate/svelte-electron-boilerplate</a> if you want a more complete solution.</p>`;
    },
    m(target, anchor) {
      insert(target, main, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(main);
    }
  };
}
class Home extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$3, safe_not_equal, {});
  }
}
const About_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i][0];
  child_ctx[2] = list[i][1];
  return child_ctx;
}
function create_each_block$1(ctx) {
  let li;
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  let t2_value = ctx[2] + "";
  let t2;
  return {
    c() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(" : ");
      t2 = text(t2_value);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, t0);
      append(li, t1);
      append(li, t2);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_fragment$2(ctx) {
  let h1;
  let t1;
  let p;
  let t4;
  let ul;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      h1 = element("h1");
      h1.textContent = "About";
      t1 = space();
      p = element("p");
      p.innerHTML = `Github project at
  <a href="https://github.com/Jonathan-J8/electron-svelte-typescript" target="_blank" rel="noreferrer" class="svelte-bz69ze">https://github.com/Jonathan-J8/electron-svelte-typescript</a>`;
      t4 = space();
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    m(target, anchor) {
      insert(target, h1, anchor);
      insert(target, t1, anchor);
      insert(target, p, anchor);
      insert(target, t4, anchor);
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(p);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$1($$self) {
  const app = Object.entries(process.env);
  return [app];
}
class About extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {});
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i][0];
  child_ctx[2] = list[i][1];
  return child_ctx;
}
function create_catch_block(ctx) {
  let p;
  let t0;
  let t1_value = ctx[5].message + "";
  let t1;
  return {
    c() {
      p = element("p");
      t0 = text("Error: ");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t0);
      append(p, t1);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_then_block(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if_block.p(ctx2, dirty);
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "Error: no electron context found";
    },
    m(target, anchor) {
      insert(target, p, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_if_block(ctx) {
  let ul;
  let each_value = Object.entries(ctx[0]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 0) {
        each_value = Object.entries(ctx2[0]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block(ctx) {
  let li;
  let t0_value = ctx[1] + "";
  let t0;
  let t1;
  let t2_value = ctx[2] + "";
  let t2;
  return {
    c() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(" : ");
      t2 = text(t2_value);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, t0);
      append(li, t1);
      append(li, t2);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_pending_block(ctx) {
  return { c: noop, m: noop, p: noop, d: noop };
}
function create_fragment$1(ctx) {
  var _a;
  let h20;
  let t1;
  let t2;
  let br0;
  let t3;
  let br1;
  let t4;
  let h21;
  let t6;
  let p;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    value: 0,
    error: 5
  };
  handle_promise((_a = window == null ? void 0 : window.electron) == null ? void 0 : _a.getAppInfos(), info);
  return {
    c() {
      h20 = element("h2");
      h20.textContent = "Electron infos";
      t1 = space();
      info.block.c();
      t2 = space();
      br0 = element("br");
      t3 = space();
      br1 = element("br");
      t4 = space();
      h21 = element("h2");
      h21.textContent = "Preload script";
      t6 = space();
      p = element("p");
      p.innerHTML = `Go to app-electron/src/preload.ts if you want to customize global import from electron. <br/>
  Don&#39;t forget to declare your code in app-svelte/src/vite-env.d.ts`;
    },
    m(target, anchor) {
      insert(target, h20, anchor);
      insert(target, t1, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => t2.parentNode;
      info.anchor = t2;
      insert(target, t2, anchor);
      insert(target, br0, anchor);
      insert(target, t3, anchor);
      insert(target, br1, anchor);
      insert(target, t4, anchor);
      insert(target, h21, anchor);
      insert(target, t6, anchor);
      insert(target, p, anchor);
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      update_await_block_branch(info, ctx, dirty);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h20);
      if (detaching)
        detach(t1);
      info.block.d(detaching);
      info.token = null;
      info = null;
      if (detaching)
        detach(t2);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(h21);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(p);
    }
  };
}
class Electron extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$1, safe_not_equal, {});
  }
}
const App_svelte_svelte_type_style_lang = "";
function create_default_slot_7(ctx) {
  let h1;
  return {
    c() {
      h1 = element("h1");
      h1.textContent = "Electron + Svelte + Typescript";
      attr(h1, "class", "svelte-1ycb7t6");
    },
    m(target, anchor) {
      insert(target, h1, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
    }
  };
}
function create_default_slot_6(ctx) {
  let t;
  return {
    c() {
      t = text("Home");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("Electron");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("About");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_3(ctx) {
  let about;
  let current;
  about = new About({});
  return {
    c() {
      create_component(about.$$.fragment);
    },
    m(target, anchor) {
      mount_component(about, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(about.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(about.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(about, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let electron;
  let current;
  electron = new Electron({});
  return {
    c() {
      create_component(electron.$$.fragment);
    },
    m(target, anchor) {
      mount_component(electron, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(electron.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(electron.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(electron, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let home;
  let current;
  home = new Home({});
  return {
    c() {
      create_component(home.$$.fragment);
    },
    m(target, anchor) {
      mount_component(home, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(home.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(home.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(home, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let nav;
  let link0;
  let t0;
  let link1;
  let t1;
  let link2;
  let t2;
  let link3;
  let t3;
  let div;
  let route0;
  let t4;
  let route1;
  let t5;
  let route2;
  let current;
  link0 = new Link({
    props: {
      to: "/",
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  link1 = new Link({
    props: {
      to: "/",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  link2 = new Link({
    props: {
      to: "/electron",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  link3 = new Link({
    props: {
      to: "/about",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  route0 = new Route({
    props: {
      path: "/about",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  route1 = new Route({
    props: {
      path: "/electron",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  route2 = new Route({
    props: {
      path: "/",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      nav = element("nav");
      create_component(link0.$$.fragment);
      t0 = space();
      create_component(link1.$$.fragment);
      t1 = space();
      create_component(link2.$$.fragment);
      t2 = space();
      create_component(link3.$$.fragment);
      t3 = space();
      div = element("div");
      create_component(route0.$$.fragment);
      t4 = space();
      create_component(route1.$$.fragment);
      t5 = space();
      create_component(route2.$$.fragment);
      attr(nav, "class", "svelte-1ycb7t6");
      attr(div, "class", "container svelte-1ycb7t6");
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      mount_component(link0, nav, null);
      append(nav, t0);
      mount_component(link1, nav, null);
      append(nav, t1);
      mount_component(link2, nav, null);
      append(nav, t2);
      mount_component(link3, nav, null);
      insert(target, t3, anchor);
      insert(target, div, anchor);
      mount_component(route0, div, null);
      append(div, t4);
      mount_component(route1, div, null);
      append(div, t5);
      mount_component(route2, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const link0_changes = {};
      if (dirty & 2) {
        link0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link0.$set(link0_changes);
      const link1_changes = {};
      if (dirty & 2) {
        link1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link1.$set(link1_changes);
      const link2_changes = {};
      if (dirty & 2) {
        link2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link2.$set(link2_changes);
      const link3_changes = {};
      if (dirty & 2) {
        link3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link3.$set(link3_changes);
      const route0_changes = {};
      if (dirty & 2) {
        route0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      route0.$set(route0_changes);
      const route1_changes = {};
      if (dirty & 2) {
        route1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      route1.$set(route1_changes);
      const route2_changes = {};
      if (dirty & 2) {
        route2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      route2.$set(route2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(link0.$$.fragment, local);
      transition_in(link1.$$.fragment, local);
      transition_in(link2.$$.fragment, local);
      transition_in(link3.$$.fragment, local);
      transition_in(route0.$$.fragment, local);
      transition_in(route1.$$.fragment, local);
      transition_in(route2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(link0.$$.fragment, local);
      transition_out(link1.$$.fragment, local);
      transition_out(link2.$$.fragment, local);
      transition_out(link3.$$.fragment, local);
      transition_out(route0.$$.fragment, local);
      transition_out(route1.$$.fragment, local);
      transition_out(route2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(nav);
      destroy_component(link0);
      destroy_component(link1);
      destroy_component(link2);
      destroy_component(link3);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div);
      destroy_component(route0);
      destroy_component(route1);
      destroy_component(route2);
    }
  };
}
function create_fragment(ctx) {
  let main;
  let router;
  let current;
  router = new Router({
    props: {
      url: ctx[0],
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      main = element("main");
      create_component(router.$$.fragment);
    },
    m(target, anchor) {
      insert(target, main, anchor);
      mount_component(router, main, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const router_changes = {};
      if (dirty & 1)
        router_changes.url = ctx2[0];
      if (dirty & 2) {
        router_changes.$$scope = { dirty, ctx: ctx2 };
      }
      router.$set(router_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(router.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(router.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(router);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { url = "/" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("url" in $$props2)
      $$invalidate(0, url = $$props2.url);
  };
  return [url];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });
  }
}
new App({
  target: document.body
});
//# sourceMappingURL=index.2d96acd1.js.map
