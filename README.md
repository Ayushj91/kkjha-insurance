# K.K. Jha — Insurance & Investments

A modern, fully responsive Next.js portfolio website for an independent insurance & investment advisor, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and lucide-react icons.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All business content (name, phone number, tagline, services, credentials, FAQs, "why us" points) lives in one place:

```
src/lib/site.ts
```

Edit that file to change any text, the WhatsApp number, or add/remove services and credentials — the rest of the site updates automatically.

## Structure

- `src/app/layout.tsx` — global metadata & page shell
- `src/app/page.tsx` — assembles all sections
- `src/components/` — one file per section (Navbar, Hero, TrustBar, About, Services, Credentials, WhyUs, FAQ, Contact, Footer, WhatsAppFloat)
- `src/lib/site.ts` — all editable content & the WhatsApp deep-link helper

## Deploying

This is a standard Next.js app — the easiest option is [Vercel](https://vercel.com/new): push this folder to a GitHub repo and import it, or run `npx vercel` from this directory. It also deploys fine to Netlify, Render, or any Node host via `npm run build && npm run start`.

## Notes

- The WhatsApp button/links use `wa.me/919911910284` with a pre-filled message — update the number in `src/lib/site.ts` (`phone`, `phoneDisplay`, `whatsappBase`) if it ever changes.
- Fonts use the system font stack (no external font download at build time), so builds work reliably even without internet access to Google Fonts.
# kkjha-insurance
