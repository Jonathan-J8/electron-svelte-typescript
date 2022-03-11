<script lang="ts">
  const app = Object.entries(process.env);
</script>

<h1>About</h1>

<p>
  Github project at <a href="https://github.com/Jonathan-J8/electron-svelte-typescript" target="_blank"
    >https://github.com/Jonathan-J8/electron-svelte-typescript
  </a>
</p>
<ul>
  {#each app as [key, value]}
    <li>{key} : {value}</li>
  {/each}
</ul>

<style>
  a {
    color: var(--light);
    padding: 0;
  }
</style>
