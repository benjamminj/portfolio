var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react3 = require("@remix-run/react");
var import_clsx2 = __toESM(require("clsx"));
var import_zod = require("zod");

// app/components/header.tsx
var import_clsx = __toESM(require("clsx"));
var import_react2 = require("@remix-run/react");
var HeaderLink = ({ href, title, children }) => {
  return /* @__PURE__ */ React.createElement(import_react2.NavLink, {
    to: href,
    title,
    className: ({ isActive }) => (0, import_clsx.default)("text-base no-underline", isActive ? "text-black font-bold dark:text-white" : "text-gray-800 font-normal dark:text-gray-200")
  }, children);
};
var Header = () => {
  return /* @__PURE__ */ React.createElement("header", {
    className: "z-header max-w-viewport"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-prose my-0 mx-auto"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "justify-between block p-4 space-y-2 sm:flex sm:space-y-0"
  }, /* @__PURE__ */ React.createElement(import_react2.Link, {
    to: "/",
    className: "inline-block text-xl font-medium text-black no-underline dark:text-white"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "lowercase"
  }, "Benjamin Johnson")), /* @__PURE__ */ React.createElement("div", {
    className: "flex mt-2 space-x-4 lowercase"
  }, /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /* @__PURE__ */ React.createElement(HeaderLink, {
    title: "Writing",
    href: "/writing"
  }, "writing"), /* @__PURE__ */ React.createElement(HeaderLink, {
    title: "GitHub",
    href: "https://github.com/benjamminj"
  }, "github"), /* @__PURE__ */ React.createElement(HeaderLink, {
    title: "Contact",
    href: "mailto:benjamin.d.johnson@icloud.com"
  }, "contact")))))));
};

// app/components/banner.tsx
var Banner = ({ children }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex items-end pt-48 pb-8 bg-gray-100 min-h-32 dark:bg-gray-900"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full px-4 mx-auto my-0 max-w-viewport md:max-w-prose"
  }, children));
};

// app/styles/app.css
var app_default = "/build/_assets/app-EMG5VPMN.css";

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/root.tsx
var links = () => {
  return [{ rel: "stylesheet", href: app_default }];
};
var meta = () => ({
  charset: "utf-8",
  title: "Benjamin Johnson",
  viewport: "width=device-width,initial-scale=1"
});
var RouteLayoutSeoDataSchema = import_zod.z.object({
  title: import_zod.z.string(),
  subtitle: import_zod.z.string().optional(),
  preserveTitleCasing: import_zod.z.boolean().optional(),
  seo: import_zod.z.object({
    title: import_zod.z.string().optional(),
    description: import_zod.z.string().optional(),
    keywords: import_zod.z.array(import_zod.z.string()).optional()
  }).optional()
});
function App() {
  const matches = (0, import_react3.useMatches)();
  const match = matches.find((route) => {
    const routeData = RouteLayoutSeoDataSchema.safeParse(route.data);
    return routeData.success;
  });
  const data = match == null ? void 0 : match.data;
  const preserveTitleCasing = false;
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react3.Meta, null), /* @__PURE__ */ React.createElement(import_react3.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "font-mono dark:bg-gray-800 dark:text-white"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute inset-x-0 top-0"
  }, /* @__PURE__ */ React.createElement(Header, null))), /* @__PURE__ */ React.createElement(Banner, null, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-4"
  }, (data == null ? void 0 : data.title) && /* @__PURE__ */ React.createElement("h1", {
    className: (0, import_clsx2.default)("text-5xl font-bold break-words", !preserveTitleCasing && "lowercase")
  }, data.title), (data == null ? void 0 : data.subtitle) && /* @__PURE__ */ React.createElement("h2", {
    className: "text-2xl font-normal text-gray-700 lowercase dark:text-gray-400"
  }, data.subtitle))), /* @__PURE__ */ React.createElement("div", {
    className: "p-4 pt-10 mx-auto my-0 max-w-viewport md:max-w-prose"
  }, /* @__PURE__ */ React.createElement(import_react3.Outlet, null)), /* @__PURE__ */ React.createElement(import_react3.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react3.Scripts, null), /* @__PURE__ */ React.createElement(import_react3.LiveReload, null)));
}

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/tags/$tag.tsx
var tag_exports = {};
__export(tag_exports, {
  default: () => TagRoute,
  loader: () => loader,
  meta: () => meta2
});
var import_react6 = require("@remix-run/react");
var import_zod3 = require("zod");

// app/components/post-list-item.tsx
var import_react5 = require("@remix-run/react");

// app/components/tag.tsx
var import_react4 = require("@remix-run/react");
var Tag = ({ tag }) => {
  const tagText = `#${tag}`;
  return /* @__PURE__ */ React.createElement(import_react4.Link, {
    to: `/tags/${tag}`,
    className: "inline-block p-1 -m-1 font-mono text-xs text-gray-600 no-underline rounded dark:text-gray-400 hover:text-gray-800 hover:bg-gray-100 hover:underline dark:hover:text-gray-50 dark:hover:bg-gray-900"
  }, tagText);
};

// app/components/post-list-item.tsx
var PostListItem = ({ post }) => {
  var _a;
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative p-4 -mx-4 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-50"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "space-y-1 md:flex md:space-y-0 md:space-x-4"
  }, /* @__PURE__ */ React.createElement("time", {
    className: "text-gray-500 dark:text-gray-400 flex items-end flex-shrink-0 font-mono text-sm md:h-8 md:pt-1 md:pb-1.5 tabular-nums leading-none"
  }, post.date), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: "text-2xl"
  }, /* @__PURE__ */ React.createElement(import_react5.Link, {
    to: `/${post.slug}`,
    "data-testid": "PostListItem__title",
    title: post.title,
    className: "font-semibold text-gray-800 no-underline hover:text-gray-800 dark:text-gray-200 dark:hover:text-white hover:underline before:empty-content before:absolute before:inset-0"
  }, post.title)), ((_a = post.tags) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ React.createElement("ul", {
    className: "relative z-10 flex flex-wrap -ml-2"
  }, post.tags.map((tag) => /* @__PURE__ */ React.createElement("li", {
    key: tag,
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement(Tag, {
    tag
  })))))));
};

// app/lib/posts.server.ts
var import_zod2 = require("zod");
var import_promises = __toESM(require("fs/promises"));
var import_node_path = __toESM(require("path"));

// app/lib/process-content.ts
var import_front_matter = __toESM(require("front-matter"));

// app/lib/parse-markdown.ts
var import_prismjs = __toESM(require("prismjs"));

// app/lib/prune-hast.ts
var pruneHastNode = (node) => {
  const _a = node, { position: _position } = _a, rest = __objRest(_a, ["position"]);
  return rest;
};
var pruneAst = (ast) => {
  const transformHastNode = (node) => {
    let children;
    if (node.children) {
      const transformedChildren2 = node.children.map(transformHastNode);
      children = transformedChildren2;
    }
    const _a2 = pruneHastNode(node), { children: _ } = _a2, pruned = __objRest(_a2, ["children"]);
    return __spreadProps(__spreadValues({}, pruned), {
      children
    });
  };
  const transformedChildren = ast.children.map(transformHastNode);
  const _a = ast, { children: _children, position: _pos } = _a, rest = __objRest(_a, ["children", "position"]);
  return __spreadProps(__spreadValues({}, rest), {
    children: transformedChildren
  });
};

// app/lib/parse-markdown.ts
var import_prism_clike_min = require("prismjs/components/prism-clike.min.js");
var import_prism_markup_min = require("prismjs/components/prism-markup.min.js");
var import_prism_javascript_min = require("prismjs/components/prism-javascript.min.js");
var import_prism_jsx_min = require("prismjs/components/prism-jsx.min.js");
var import_prism_typescript_min = require("prismjs/components/prism-typescript.min.js");
var import_prism_tsx_min = require("prismjs/components/prism-tsx.min.js");
var import_prism_bash_min = require("prismjs/components/prism-bash.min.js");
var import_prism_haskell_min = require("prismjs/components/prism-haskell.min.js");
var import_prism_diff_min = require("prismjs/components/prism-diff.min.js");
var import_prism_json_min = require("prismjs/components/prism-json.min.js");
var unified = import("unified");
var remarkParse = import("remark-parse");
var remarkRehype = import("remark-rehype");
var highlight = (code, lang) => {
  if (!lang)
    return code;
  if (!import_prismjs.default.languages[lang]) {
    console.warn("language syntax not found:", lang);
    return "";
  }
  return import_prismjs.default.highlight(code, import_prismjs.default.languages[lang], lang);
};
var highlightCodeBlocks = (ast) => {
  const transform = (node) => {
    if (node.type === "code") {
      const value = highlight(node.value, node.lang);
      return __spreadProps(__spreadValues({}, node), {
        value
      });
    }
    if (node.children) {
      const mappedChildren = node.children.map(transform);
      return __spreadProps(__spreadValues({}, node), {
        children: mappedChildren
      });
    }
    return node;
  };
  const children = ast.children.map(transform);
  return __spreadProps(__spreadValues({}, ast), {
    children
  });
};
var parseMarkdown = async (markdown) => {
  const { unified: unifiedInstance } = await unified;
  const { default: remarkParseInstance } = await remarkParse;
  const { default: remarkRehypeInstance } = await remarkRehype;
  const hast = await unifiedInstance().use(remarkParseInstance).use(remarkRehypeInstance).parse(markdown);
  const highlightedHast = highlightCodeBlocks(hast);
  return pruneAst(highlightedHast);
};

// app/lib/process-content.ts
var processContent = async (raw) => {
  const { body, attributes } = (0, import_front_matter.default)(raw);
  const hast = await parseMarkdown(body);
  return __spreadProps(__spreadValues({}, attributes), {
    hast
  });
};

// app/lib/posts.server.ts
var FormattedDateSchema = import_zod2.z.date().transform((date) => {
  const iso = date.toISOString();
  const [y, m, d] = iso.split(/[-T]/);
  return [y, m == null ? void 0 : m.padStart(2, "0"), d == null ? void 0 : d.padStart(2, "0")].join("-");
});
var PostSchema = import_zod2.z.object({
  slug: import_zod2.z.string(),
  title: import_zod2.z.string(),
  date: FormattedDateSchema,
  lastUpdated: FormattedDateSchema.optional(),
  description: import_zod2.z.string().optional(),
  tags: import_zod2.z.array(import_zod2.z.string()).default([]),
  body: import_zod2.z.string(),
  content: import_zod2.z.any()
}).transform((_a) => {
  var _b = _a, { lastUpdated, date } = _b, rest = __objRest(_b, ["lastUpdated", "date"]);
  return __spreadProps(__spreadValues({}, rest), {
    date: lastUpdated ?? date
  });
});
var slugifyPostPath = (file) => {
  return file.replace("/index.md", "").replace(/\.md$/, "");
};
var __cached_posts__ = [];
var list = async () => {
  if (__cached_posts__.length > 0) {
    return __cached_posts__;
  }
  const postPaths = await import_promises.default.readdir(import_node_path.default.join(__dirname, "../content/writing/"));
  const promises = [];
  for (const filePath of postPaths) {
    const promise = async () => {
      const contents = await import_promises.default.readFile(import_node_path.default.join(__dirname, "../content/writing", filePath), "utf8");
      return [filePath, contents];
    };
    promises.push(promise());
  }
  const rawPosts = await Promise.all(promises);
  const posts = await Promise.all(rawPosts.map(async ([path3, contents]) => {
    const _a = await processContent(contents), { hast } = _a, attributes = __objRest(_a, ["hast"]);
    return await PostSchema.parseAsync(__spreadProps(__spreadValues({
      slug: slugifyPostPath(path3)
    }, attributes), {
      body: "TBD",
      content: hast
    }));
  }));
  posts.sort((a, b) => b.date.localeCompare(a.date));
  __cached_posts__ = posts;
  return posts;
};
var get = async (slug) => {
  const posts = await list();
  const post = posts.find((p) => p.slug === slug);
  return post;
};

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/tags/$tag.tsx
var meta2 = ({ data }) => {
  return {
    title: data.title,
    description: `All posts categorized with "${data.tag}"`
  };
};
var loader = async ({ params }) => {
  const tag = import_zod3.z.string().parse(params.tag);
  const posts = await list();
  const filtered = posts.filter((post) => {
    var _a;
    return (_a = post.tags) == null ? void 0 : _a.includes(tag);
  });
  const pruned = filtered.map((_a) => {
    var _b = _a, { content } = _b, rest = __objRest(_b, ["content"]);
    return rest;
  });
  return {
    title: `#${tag}`,
    subtitle: `${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`,
    posts: pruned
  };
};
function TagRoute() {
  const data = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("ul", {
    className: "space-y-2"
  }, data == null ? void 0 : data.posts.map((post) => /* @__PURE__ */ React.createElement("li", {
    className: "w-full",
    key: post.slug
  }, /* @__PURE__ */ React.createElement(PostListItem, {
    post
  })))));
}

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/writing.tsx
var writing_exports = {};
__export(writing_exports, {
  default: () => WritingRoute,
  loader: () => loader2,
  meta: () => meta3
});
var import_react7 = require("@remix-run/react");
var meta3 = () => {
  return {
    title: "Writing"
  };
};
var loader2 = async () => {
  const posts = await list();
  const pruned = posts.map((_a) => {
    var _b = _a, { content } = _b, rest = __objRest(_b, ["content"]);
    return rest;
  });
  return {
    title: "Writing",
    subtitle: `${pruned.length} ${pruned.length === 1 ? "post" : "posts"}`,
    posts: pruned
  };
};
function WritingRoute() {
  const data = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("ul", {
    className: "space-y-2"
  }, data == null ? void 0 : data.posts.map((post) => /* @__PURE__ */ React.createElement("li", {
    className: "w-full",
    key: post.slug
  }, /* @__PURE__ */ React.createElement(PostListItem, {
    post
  })))));
}

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => SlugRoute,
  loader: () => loader3
});
var import_react11 = require("@remix-run/react");
var import_zod4 = require("zod");

// app/components/markdown-renderer.tsx
var import_react8 = require("@remix-run/react");
var import_clsx3 = __toESM(require("clsx"));
var import_react9 = require("react");
var import_react10 = require("react");
var H = (_a) => {
  var _b = _a, { level = 2, children } = _b, props = __objRest(_b, ["level", "children"]);
  const tag = `h${Math.max(Math.min(level, 6), 1)}`;
  let styles = {
    h1: "",
    h2: "mt-16 mb-6 text-3xl",
    h3: "mt-12 mb-4 text-2xl",
    h4: "mt-10 mb-4 text-xl",
    h5: "mt-6 mb-4 text-lg",
    h6: "mt-6 mb-4 text-base"
  };
  return (0, import_react10.createElement)(tag, __spreadProps(__spreadValues({}, props), {
    className: (0, import_clsx3.default)(styles[tag], "font-medium")
  }), children);
};
var hastNodeComponents = {
  text: (node) => /* @__PURE__ */ React.createElement(React.Fragment, null, node.value),
  paragraph: (node) => /* @__PURE__ */ React.createElement("p", {
    className: "mb-6 text-base leading-7"
  }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  link: (node) => /* @__PURE__ */ React.createElement(import_react8.Link, {
    to: node.url,
    className: "font-bold"
  }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  heading: (node) => /* @__PURE__ */ React.createElement(H, {
    level: node.depth
  }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  thematicBreak: (node) => /* @__PURE__ */ React.createElement("hr", {
    className: "relative h-auto my-16 font-mono tracking-tighter text-center border-none before:content-['*_*_*'] before:text-lg dark:text-gray-400"
  }),
  strong: (node) => /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  emphasis: (node) => /* @__PURE__ */ React.createElement("em", null, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  list: (node) => {
    if (node.ordered)
      return /* @__PURE__ */ React.createElement("ol", {
        className: "pl-8 list-none"
      }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
        nodes: node.children
      }));
    return /* @__PURE__ */ React.createElement("ul", {
      className: "pl-6 list-none"
    }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
      nodes: node.children
    }));
  },
  listItem: (node) => /* @__PURE__ */ React.createElement("li", {
    className: "relative pl-2 my-4 text-base leading-7 before:-left-4 before:absolute"
  }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  blockquote: (node) => /* @__PURE__ */ React.createElement("blockquote", null, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: node.children
  })),
  inlineCode: (node) => /* @__PURE__ */ React.createElement("code", {
    className: "bg-gray-100 dark:bg-gray-700 p-1 break-words"
  }, node.value),
  code: (node) => /* @__PURE__ */ React.createElement("pre", {
    className: "rounded-none p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-gray-100 md:mx-0 lg:-mx-6 dark:bg-gray-900"
  }, /* @__PURE__ */ React.createElement("code", {
    dangerouslySetInnerHTML: { __html: node.value }
  })),
  image: (node) => /* @__PURE__ */ React.createElement("img", {
    src: node.url,
    alt: node.alt
  })
};
function InternalMarkdownRenderer({ nodes }) {
  if (!nodes)
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, nodes.map((node, i) => {
    const mapper = hastNodeComponents[node.type];
    const content = mapper ? mapper(node) : null;
    return /* @__PURE__ */ React.createElement(import_react9.Fragment, {
      key: i
    }, content);
  }));
}
function MarkdownRenderer({ hast }) {
  if (!hast)
    return null;
  return /* @__PURE__ */ React.createElement("div", {
    className: "prose dark:prose-invert font-mono mx-auto max-w-prose"
  }, /* @__PURE__ */ React.createElement(InternalMarkdownRenderer, {
    nodes: hast.children
  }));
}

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/$slug.tsx
var loader3 = async ({ params }) => {
  const slug = import_zod4.z.string().parse(params.slug);
  const post = await get(slug);
  return { title: post == null ? void 0 : post.title, subtitle: post == null ? void 0 : post.date, post };
};
function SlugRoute() {
  var _a, _b;
  const data = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(MarkdownRenderer, {
    hast: data == null ? void 0 : data.post.content
  }), ((_a = data == null ? void 0 : data.post.tags) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ React.createElement("footer", {
    "data-testid": "SlugPage__footer",
    className: "py-12"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "font-mono dark:text-gray-400"
  }, "Tags"), /* @__PURE__ */ React.createElement("ul", {
    className: "dark:text-gray-200 flex space-x-2"
  }, (_b = data == null ? void 0 : data.post.tags) == null ? void 0 : _b.map((tag) => /* @__PURE__ */ React.createElement("li", {
    key: tag
  }, /* @__PURE__ */ React.createElement(Tag, {
    tag
  })))))));
}

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader4
});
var import_react12 = require("@remix-run/react");

// app/lib/read-file.server.ts
var import_promises2 = __toESM(require("fs/promises"));
var import_node_path2 = __toESM(require("path"));
var readFile = (filePath) => {
  return import_promises2.default.readFile(import_node_path2.default.join(__dirname, filePath), "utf8");
};

// route:/Users/benjaminjohnson/dev/portfolio/remix-run/app/routes/index.tsx
var loader4 = async () => {
  const content = await readFile("../content/intro.md");
  const { hast } = await processContent(content);
  return {
    title: "Hi, I'm Ben! \u{1F525}",
    subtitle: "I'm a front-end software engineer based out of Seattle",
    hast
  };
};
function Index() {
  const data = (0, import_react12.useLoaderData)();
  return /* @__PURE__ */ React.createElement(MarkdownRenderer, {
    hast: data == null ? void 0 : data.hast
  });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "e166aba1", "entry": { "module": "/build/entry.client-5SYKBE6O.js", "imports": ["/build/_shared/chunk-ABTTC3DG.js", "/build/_shared/chunk-O4KJ4E6X.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-4JPZMWT6.js", "imports": ["/build/_shared/chunk-ZGBXNB65.js", "/build/_shared/chunk-SLRCBVSX.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$slug": { "id": "routes/$slug", "parentId": "root", "path": ":slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$slug-ROTIESRL.js", "imports": ["/build/_shared/chunk-YY5ZG7H2.js", "/build/_shared/chunk-JVJ3WJ3F.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-565BG7JY.js", "imports": ["/build/_shared/chunk-JVJ3WJ3F.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/tags/$tag": { "id": "routes/tags/$tag", "parentId": "root", "path": "tags/:tag", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/tags/$tag-5ZSSRM4I.js", "imports": ["/build/_shared/chunk-5UH6TC4B.js", "/build/_shared/chunk-YY5ZG7H2.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/writing": { "id": "routes/writing", "parentId": "root", "path": "writing", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/writing-CDRR4I7W.js", "imports": ["/build/_shared/chunk-5UH6TC4B.js", "/build/_shared/chunk-YY5ZG7H2.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-E166ABA1.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/tags/$tag": {
    id: "routes/tags/$tag",
    parentId: "root",
    path: "tags/:tag",
    index: void 0,
    caseSensitive: void 0,
    module: tag_exports
  },
  "routes/writing": {
    id: "routes/writing",
    parentId: "root",
    path: "writing",
    index: void 0,
    caseSensitive: void 0,
    module: writing_exports
  },
  "routes/$slug": {
    id: "routes/$slug",
    parentId: "root",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
