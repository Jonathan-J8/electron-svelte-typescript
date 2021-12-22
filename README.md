# Electron + Svelte + Typescript Template

Simple template to quickly start devoloping in [Typscript](https://www.typescriptlang.org/) an
[Electron Desktop App](https://www.electronjs.org/) + [Svelte SPA](https://svelte.dev/).  
Client side navigation are made with [svelte-routing](https://github.com/EmilTholin/svelte-routing).  
For others builds options, check out [electron-builder](https://www.electron.build/).

## Made with

- electron : https://www.electronjs.org/
- electron-builder : https://www.electron.build/
- rollup : https://rollupjs.org/guide/en/
- svelte : https://svelte.dev/

## Features

- [x] hot-reload
- [x] ipc communication
- [x] client side navigation
- [x] Typescript
- [x] minimal requirement for Svelte SPA + Electron Desktop App
- [x] easy to customize

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
├── build                   # Transpiled files (generated with <pre>npm run dev</pre>)   
├── dist                    # Compiled files (generated with `npm run build`)      
├── proxy                   # Electron app   
├── package-lock.json                      
├── package.json                      
├── README.md                      
└── rollup.config.js   
</pre>
