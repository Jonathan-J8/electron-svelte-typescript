<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import About from './pages/About.svelte';

  export let url = '';
</script>

<main>
  <h1>Electron + Svelte + Typescript</h1>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
    </nav>
    <div>
      <Route path="about" component={About} />
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</main>

<style>
  nav {
    background-color: lightgray;
    padding: 20px 0;
  }
</style>
