# Electron + Svelte + Typescript Template

Simple template to quickly start developing in [Typescript](https://www.typescriptlang.org/) an
[Electron Desktop App](https://www.electronjs.org/) + [Svelte SPA](https://svelte.dev/).  
For others builds options, check out [electron-builder](https://www.electron.build/) and modify build
field in package.json.

## Made with

- electron : https://www.electronjs.org/
- electron-builder : https://www.electron.build/
- rollup : https://rollupjs.org/guide/en/
- svelte : https://svelte.dev/
- vite : https://vitejs.dev/

## Features

- [x] Typescript
- [x] Live-reload
- [x] Client-side navigation
- [x] SharedArrayBuffer supports
- [x] Basic Ipc bridge
- [x] Easy to customize

## Scripts

```
npm i
npm run dev
npm run build
```

## Files Structure

<pre>
.   
├── app-svelte              # Svelte app    
├── app-electron            # Electron app   
├── build                   # Transpiled files generated with "npm run dev"  
├── dist                    # Packaged/compiled app generated with "npm run build"     
├── package-lock.json                      
├── package.json                      
└── README.md                      
</pre>
