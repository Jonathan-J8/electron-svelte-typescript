<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import About from './pages/About.svelte';
  import Ipc from './pages/Ipc.svelte';

  export let url = '';
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">
        <h1>Electron + Svelte + Typescript</h1></Link
      >
      <Link to="/">Home</Link>
      <Link to="ipc">Ipc</Link>
      <Link to="about">About</Link>
    </nav>
    <div class="container">
      <Route path="about" component={About} />
      <Route path="ipc" component={Ipc} />
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</main>

<style>
  nav {
    background-color: var(--light);
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
  h1 {
    color: rgb(44, 44, 44);
    margin: 0;
    padding: 0 10px 5px 10px;
    border: solid;
  }
  .container {
    display: grid;
    justify-content: left;
    padding: 50px;
  }
</style>
