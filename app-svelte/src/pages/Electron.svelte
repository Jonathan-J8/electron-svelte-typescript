<h2>Electron infos</h2>
{#await window?.electron?.getAppInfos() then infos}
  {#if infos}
    <ul>
      {#each Object.entries(infos) as [key, value]}
        <li>{key} : {value}</li>
      {/each}
    </ul>
  {:else}
    <p>Error: no electron context found</p>
  {/if}
{:catch err}
  <p>Error: {err.message}</p>
{/await}

<br />
<br />

<h2>Preload script</h2>
<p>
  Go to app-electron/src/preload.ts if you want to customize global import from electron. <br />
  Don't forget to declare your code in app-svelte/src/vite-env.d.ts
</p>
