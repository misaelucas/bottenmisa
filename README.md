# bottenmisa

Personal site built with Astro, UnoCSS, React islands, bilingual routes, shorts,
and a small Last.fm-powered recent tracks section.

Production URL: https://bottenmisa.vercel.app

## Credits

This site started from the template/source code of
[Xetera/xetera.dev](https://github.com/Xetera/xetera.dev). The current project
has been customized for my own content, routes, styling, metadata, and assets,
but the original work deserves attribution.

Before reusing this repository as a template, review the upstream repository's
license/permission terms as well.

## Requirements

- Node.js `>=22.12.0`
- Corepack enabled
- pnpm

If pnpm is not available directly, use Corepack:

```sh
corepack enable
corepack pnpm install
```

## Local Development

Install dependencies:

```sh
corepack pnpm install
```

Start the dev server:

```sh
corepack pnpm dev
```

Build the static site:

```sh
corepack pnpm build
```

Preview the production build locally:

```sh
corepack pnpm preview
```

## Environment Variables

The site builds without every optional integration configured, but these
variables are used when available:

```sh
SITE=https://bottenmisa.vercel.app
LASTFM_API_KEY=...
LASTFM_USERNAME=...
SOCIAL_TWITTER=...
ME_API_GRAPHQL_URL=...
```

Notes:

- `SITE` is used by Astro for canonical URLs and sitemap generation.
- `LASTFM_API_KEY` and `LASTFM_USERNAME` power the recent tracks section.
- If Last.fm is not configured correctly, the build may log a non-fatal warning
  while still completing.
- `ME_API_GRAPHQL_URL` is kept for inherited Spotify/Lanyard-related code paths.

## Content

Shorts live in:

```text
src/content/shorts/
```

The current language setup uses:

```text
/              Portuguese home
/en/           English home
/shorts/       Portuguese shorts
/en/shorts/    English shorts
```

Shared text and route metadata live in:

```text
src/i18n.ts
```

## Deploying to Vercel

### Dashboard Deploy

1. Import the GitHub repository into Vercel.
2. Set the framework preset to `Astro`.
3. Use the default output directory:

```text
dist
```

4. Use this build command:

```sh
corepack pnpm build
```

5. Add the environment variables you need in Vercel Project Settings.
6. Deploy.

### CLI Deploy

Install and link Vercel:

```sh
npm i -g vercel
vercel login
vercel link
```

Add environment variables as needed:

```sh
vercel env add SITE production
vercel env add LASTFM_API_KEY production
vercel env add LASTFM_USERNAME production
```

Deploy to production:

```sh
vercel --prod
```

## Useful Commands

| Command | Action |
| :-- | :-- |
| `corepack pnpm dev` | Start local dev server |
| `corepack pnpm build` | Build the static site into `dist/` |
| `corepack pnpm preview` | Preview the production build locally |
| `corepack pnpm astro ...` | Run Astro CLI commands |
