import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ROOT = path.dirname(fileURLToPath(import.meta.url))

/* One line per shop: the key used in .env.<key> (VITE_TENANT), its data file
   in src/data/tenants/, and its photo folder in public/images/. Add a line
   here when you add a shop. */
const TENANTS = {
  demo: { file: 'demo', images: 'demo' },
  /* Lakewood and Littleton are the two Golden Vape & Smoke shops, keyed by
     their towns because they share a name on screen. The Golden shop trades
     under a name of its own, Premium Cigars, which is what its key says. */
  lakewood: { file: 'lakewood', images: 'lakewood' },
  littleton: { file: 'littleton', images: 'littleton' },
  'premium-cigar': { file: 'premium-cigar', images: 'premium-cigar' },
  yours: { file: 'yours', images: 'yours' },
}

/* Vite would copy the whole of public/ into every build, every shop's photos
   included. Instead this plugin turns that copy off and does it itself,
   leaving out the other shops' photo folders, so each site ships only its
   own photos. The shared folders (products, categories) and the favicon are
   copied as usual. Nothing is deleted afterwards: deleting freshly copied
   files is what Windows can refuse while it scans them. */
function onlyThisShopsImages(key) {
  /* Paths inside public/, written with forward slashes on every system. */
  const skip = Object.entries(TENANTS)
    .filter(([other]) => other !== key)
    .map(([, { images }]) => `images/${images}`)

  /* A plain walk rather than fs.cpSync's filter option, so exactly which
     folders are left out does not depend on the Node version. */
  const copy = (from, to, relative) => {
    fs.mkdirSync(to, { recursive: true })
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      const inside = relative ? `${relative}/${entry.name}` : entry.name
      if (skip.includes(inside)) continue
      const source = path.join(from, entry.name)
      const target = path.join(to, entry.name)
      if (entry.isDirectory()) copy(source, target, inside)
      else fs.copyFileSync(source, target)
    }
  }

  let publicDir
  let outDir
  return {
    name: 'only-this-shops-images',
    apply: 'build',
    config: () => ({ build: { copyPublicDir: false } }),
    configResolved(config) {
      publicDir = config.publicDir
      outDir = path.resolve(config.root, config.build.outDir)
    },
    writeBundle() {
      if (publicDir && fs.existsSync(publicDir)) copy(publicDir, outDir, '')
    },
  }
}

export default defineConfig(({ mode }) => {
  const requested = loadEnv(mode, ROOT, 'VITE_').VITE_TENANT

  /* A typo in an .env file would otherwise quietly build the demo shop in
     place of a real one, so an unknown key stops the build instead. With no
     key at all (plain `npm run dev`), the demo shop is used. */
  if (requested && !Object.hasOwn(TENANTS, requested)) {
    throw new Error(
      `Unknown VITE_TENANT "${requested}". Known shops: ${Object.keys(TENANTS).join(', ')}.`,
    )
  }
  /* The same for a mistyped --mode: "--mode goldnvape" has no .env file,
     so it would fall through to the demo shop without a word. */
  if (!requested && mode !== 'development' && mode !== 'production') {
    throw new Error(
      `No shop set for --mode ${mode}: .env.${mode} is missing or has no VITE_TENANT. Known shops: ${Object.keys(TENANTS).join(', ')}.`,
    )
  }
  const key = requested || 'demo'

  return {
    plugins: [react(), tailwindcss(), onlyThisShopsImages(key)],
    resolve: {
      alias: {
        /* The one shop this build is for. Only its data file is bundled, so
           a shop's site never carries another shop's details. */
        '@tenant': path.join(ROOT, 'src', 'data', 'tenants', `${TENANTS[key].file}.js`),
      },
    },
  }
})
