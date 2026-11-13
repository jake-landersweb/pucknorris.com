This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Production deployment

Pushes to `main` run `.github/workflows/deploy.yml`: lint, typecheck, audit,
then a clean linux/amd64 Docker build pushed to GHCR with the full commit SHA
and `main` tags. Dokploy pulls the SHA tag on us-spokane-2 using Compose app
`pucknorris-spokane2` (`MqxkGDq0oojImGtwmOI7r`). The old hetzner image and
container must never be reused after the 2026-11-13 compromise.

GitHub secrets: `DOKPLOY_URL`, `DOKPLOY_KEY` (dedicated key named
`github-actions-pucknorris-deploy`). GitHub variable `NEXT_PUBLIC_TEAMID`
supplies the public client build configuration. Runtime secrets stay in
Dokploy; `scripts/deploy-dokploy.py` preserves them when changing `IMAGE_TAG`.
`deploy/compose.yaml` is the source for the new app's container configuration.
The container runs as UID/GID 1001, with a read-only root, tmpfs cache, 512 MiB
memory limit, 256 PID limit, and a 256 MiB V8 heap cap.

Health: `/api/health`. Deployment waits for Dokploy completion and probes the
new origin directly. The probe requires a valid TLS certificate; DNS must point to the target
before the first deployment so HTTP-01 validation can complete.

Rollback: deploy a previously verified **patched** SHA through the same script
with `IMAGE_TAG=<sha>`, `DOKPLOY_URL`, and `DOKPLOY_KEY` in the environment.
Never roll back to the compromised `latest` image or restart its old service.
MySQL remains external AWS RDS; this deployment does not migrate data.

Security baseline (2026-11-13): Next 15.5.29 / React 19.1.10, following
https://nextjs.org/blog/november-2026-security-release and the repository's
published GitHub advisories. PostCSS is pinned/overridden to 8.5.32 to fix
high-severity transitive findings without moving to Next 16.
