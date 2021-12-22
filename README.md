# Electron + Svelte + Typescript Template

Simple template to quickly start devoloping in [Typescript](https://www.typescriptlang.org/) an
[Electron Desktop App](https://www.electronjs.org/) + [Svelte SPA](https://svelte.dev/).  
For others builds options, check out [electron-builder](https://www.electron.build/) and modify build field in package.json.

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

## Scripts

```
npm i
npm run dev
npm run build
```

## Files Structure

<pre>
.   
├── app                     # Svelte app    
├── build                   # Transpiled files generated with "npm run dev"  
├── dist                    # Packaged/compiled app generated with "npm run build"     
├── proxy                   # Electron app   
├── package-lock.json                      
├── package.json                      
├── README.md                      
└── rollup.config.js   
</pre>
