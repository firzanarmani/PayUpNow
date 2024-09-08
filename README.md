# The Armani.dev Stack

A Turbo monorepo with the apps and tools that the guy behind Armani.dev really likes (and deploys to Cloudflare).

## Using this example

Run the following command to copy the contents of this repository into **your own folder**:

```sh
npx degit https://github.com/firzanarmani/armani-stack
```

> You might want to **really** make this project your own by :
>- searching for all instances of `@payupnow` in the repo and replacing it with your own project name
>- replacing the `name` and `database_name` in `apps/api/wrangler.toml` by including your own project name

Install dependencies with PNPM:

```sh
pnpm install
```

### Running local development mode

Before **actually** running local development mode, you will need to **at least**
1.  navigate into `api` app using `cd apps/api`
2.  add a `database_id` under `d1_databases` , using the database ID generated from setting up a D1 database on Cloudflare
3.  run `pnpm run db:generate` to generate the database migrations
4.  run `pnpm run db:migrate` to run those migrations on your local database

Then, run in local development mode (back in project root, preferably) with:
```sh
pnpm run dev
```

> Need to use environment variables? For local development, employ the For local development, employ the use of a `.dev.vars` file (refer [here](https://developers.cloudflare.com/workers/configuration/environment-variables/) for more information). Don't forget to specify the types in `apps/api/types/cloudflare.ts` 
 
### Deploying to production

Before deploying to production, you will need to
1.  ensure that the `database_id` (in `apps/api/wrangler.toml`) has been set using the database ID generated from setting up a D1 database on Cloudflare
2.  set the following in `apps/api/drizzle.config.ts`:
    - `accountId` - Cloudflare dashboard > Workers & Pages > Overview
    - `databaseId` - Cloudflare dashboard > Workers & Pages > D1 > \<Your Project Database>
    - `token` - Cloudflare dashboard > My Profile (Top-Right user menu) > API Tokens
3.

> Using secrets? You'll need to set the secrets in production on your Cloudflare Worker project's configuration (refer [https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard](here)). Keep in mind that in local development, secrets are only declared in `.dev.vars` but not in `wrangler.toml`

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api`: a [Hono](https://hono.dev/) server framework app, that uses Drizzle ORM, provides a nice RPC to the client apps, and deploys to Cloudflare
- `website`: a [Vite](https://vitejs.dev/) single page app, that uses TanStack Router and TanStack Query
- `@payupnow/config-eslint`: ESLint configurations used throughout the monorepo
- `@payupnow/config-typescript`: tsconfig.json's used throughout the monorepo
- `@payupnow/logger`: isomorphic logger (a small wrapper around console.log)
- `@payupnow/design-system`: a React UI library (which contains `<CounterButton>` and `<Link>` components), that uses Panda CSS and Ark UI unstyled components
- `@payupnow/styled-system`: an external decoupled package that contains generated JS runtime code from Panda CSS that is shared between library and app code

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Vitest](https://vitest.dev) test runner for next generation testing
- [Prettier](https://prettier.io) for code formatting
