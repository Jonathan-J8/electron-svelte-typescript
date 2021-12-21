<script lang="ts">
  let res = '';
  const testIpc = () => {
    window.ipcRenderer.send('test-ipc');
    window.ipcRenderer.on('test-ipc', (e, arg) => {
      res = arg;
    });
  };
</script>

<h1>About</h1>
<div>
  <button on:click={testIpc}>Send ipc request.. {res}</button>
</div>
