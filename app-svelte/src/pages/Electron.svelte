<script>
  import { getElectronInfos } from "../ipc";
</script>

<h2>Electron infos</h2>
<ul>
  <li>vite : {import.meta.url}</li>

  {#await getElectronInfos() then infos}
    {#each Object.entries(infos) as [key, value]}
      <li>{key} : {value}</li>
    {/each}
  {:catch err}
    <li>Error: {err.message}</li>
  {/await}
</ul>

<br />
<br />

<h2>Preload script</h2>
<p>
  Go to app-electron/src/preload.ts if you want to customize global import from electron. <br />
  Don't forget to declare your code in app-svelte/src/vite-env.d.ts
</p>
