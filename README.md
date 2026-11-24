# Inkframe Notes

A Hugo theme for personal sites and technical writing. It includes a compact homepage or a post grid, color palettes and light and dark modes, syntax highlighting, article outlines, tags, archives, and search.

## Requirements

Use **[Hugo 0.170.1](https://github.com/gohugoio/hugo/releases/tag/v0.170.1) or later**. The theme uses plain CSS and JavaScript, so the extended Hugo build and Node.js are optional. Install Git and Go if you use Hugo Modules. The example loads its fonts from Google Fonts and falls back to system fonts when they are unavailable.

## Install

### Hugo Module

From your site's root, initialize a module if the site has no `go.mod` yet. Substitute your own module path.

```sh
hugo mod init github.com/your-account/your-site
```

Add the theme import to your site's Hugo configuration. If you already import a theme, replace that import. Keep any separate shortcode or content imports your site needs.

```toml
[module]
  [[module.imports]]
    path = "github.com/zer0ttl/hugo-inkframe-notes"
```

After the release is published, pin the version and start the site.

```sh
hugo mod get github.com/zer0ttl/hugo-inkframe-notes@v0.1.0
hugo server
```

Commit your site's `go.mod` and `go.sum` for repeatable builds.

### Local checkout

Put the theme checkout at `themes/hugo-inkframe-notes` in your site and use this setting instead of a module import.

```toml
theme = "hugo-inkframe-notes"
```

From the root of a checkout named `hugo-inkframe-notes`, run the included example site.

```sh
hugo server --source exampleSite --themesDir ../..
```

Use the address printed by Hugo.

## Configure your site

Add these settings to your site's config. Set `mainSections` to the directories under `content/` that contain your posts. Use `["blog"]` if your posts live under `content/blog/`. Define a title in the section's `_index.md` so the section gets a readable page label.

```toml
title = "Example Notebook"

[pagination]
  pagerSize = 8

[taxonomies]
  tag = "tags"
  category = "categories"

[markup.highlight]
  noClasses = false

[params]
  description = "Notes about building and learning."
  mainSections = ["posts"]
  homeLayout = "grid"
  homeTitle = "Example Notebook"
  homeIntro = "Notes about building and learning."
  themeMode = "system"
  themePalette = "ivory"
  outlineLayout = "inline"
  copyrightHolder = "Example Author"

[[menus.main]]
  name = "Blog"
  pageRef = "/posts"
  weight = 10

[[menus.main]]
  name = "About"
  pageRef = "/about"
  weight = 20

[[menus.main]]
  name = "Archives"
  pageRef = "/archives"
  weight = 30

[[menus.main]]
  name = "Tags"
  pageRef = "/tags"
  weight = 40

[[menus.main]]
  name = "Search"
  pageRef = "/search"
  weight = 50
```

### Homepage and palettes

- `homeLayout = "grid"` shows recent posts and category links. The heading defaults to your site title.
- `homeLayout = "intro"` shows a centered introduction, using `homeIntro` as the text. Add a `[[params.homeLinks]]` entry for each button, with a `label` and a `url`. For example:

  ```toml
  [params]
    homeLayout = "intro"
    homeIntro = "I write about the things I build and learn."

  [[params.homeLinks]]
    label = "Read the blog →"
    url = "/posts/"

  [[params.homeLinks]]
    label = "About me"
    url = "/about/"
  ```

- `themeMode` accepts `light`, `dark`, or `system`. `themePalette` accepts `ivory`, `sage`, `mist`, `lavender`, `sand`, or `rose`. A reader's selection overrides these defaults in their browser.

### Articles and page labels

Add `tags`, `categories`, and a short `description` in post front matter. The post grid displays up to three lines of the description. Tags appear below each article and link to their listings.

Use `showToc: true` in a post's front matter to show an outline when the post has headings. You can also set `showToc = true` under site params and disable it for individual posts. Set `outlineLayout` to `inline` or `sidebar` in site params or a post's front matter. The right sidebar appears at desktop widths and moves above the content on narrow screens. Use `pageLabel: true` on a standalone page such as About to display its title as a compact label.

Use language names on fenced code blocks for syntax highlighting. Long lines scroll inside their block, and the Copy code button appears when the browser supports clipboard access. Clipboard access generally requires HTTPS or a loopback address.

### Archives and search

Create these content pages with the corresponding front matter. Directory bundles with an `index.md` also work.

| Content file | Front matter |
| --- | --- |
| `content/archives.md` | `title: Archives` and `layout: archives` |
| `content/search.md` | `title: Search` and `layout: search` |

The archive groups posts in your main sections by year. Search matches words in page titles, summaries, and text. It uses an index embedded in the search page and requires JavaScript. It does not require a JSON homepage output. Set `searchHidden: true` in front matter to exclude a page from search. Older sites using `layout: archive` can keep that layout name.

### Footer and licensing

The copyright year is set when Hugo builds the site. The copyright holder defaults to the site title. To display a license for your original blog writing, add your chosen license's name and URL:

```toml
[params.footerLicense]
  name = "CC BY-NC-SA 4.0"
  url = "https://creativecommons.org/licenses/by-nc-sa/4.0/"
```

Omit this setting to keep just the copyright notice. The theme code is covered separately by the [MIT License](LICENSE).

## Migrating an existing site

Keep your existing content, permalink, taxonomy, and mount settings. Keep imports that provide shortcodes still used by your posts. If your old theme required a JSON homepage output only for search, remove that output when you switch. Build the production site locally and check old URLs before deploying.

The [official Hugo Modules guide](https://gohugo.io/hugo-modules/use-modules/) explains versioning and local replacements. The Chroma stylesheet in this theme is generated using Hugo's `hugo gen chromastyles --style github-dark` and scoped to article content.
