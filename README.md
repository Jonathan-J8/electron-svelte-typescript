# Electron + Svelte + Typescript Template

Simple template to quickly start devoloping in [Typscript](https://www.typescriptlang.org/) with
[Electron](https://www.electronjs.org/) as back-end and [Svelte](https://svelte.dev/) SPA.  
Client side navigation are made with [svelte-routing](https://github.com/EmilTholin/svelte-routing).  
For others builds options, check [electron-builder](https://www.electron.build/).

Made with :

- electron : https://www.electronjs.org/
- electron-builder : https://www.electron.build/
- rollup : https://rollupjs.org/guide/en/
- svelte : https://svelte.dev/

## Script

```
npm i
npm run dev
npm run build
```

## Files Structure

<pre>
.   
├── app                     # Svelte app    
├── build                   # Transpiled files (generated with ```npm run dev```)   
├── dist                    # Compiled files (generated with ```npm run build```)      
├── proxy                   # Electron app   
├── package-lock.json                      
├── package.json                      
├── README.md                      
└── rollup.config.js   
</pre>
