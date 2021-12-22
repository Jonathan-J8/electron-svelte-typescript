<script lang="ts">
  let res = '';
  const testIpc = () => {
    window.ipcRenderer.send('test-ipc');
    window.ipcRenderer.on('test-ipc', (e, arg) => {
      res = arg;
    });
  };
</script>

<h1>IpcRenderer</h1>
<div>
  <p>
    Get
    <i>'ipcRenderer'</i>
    from
    <i>'window.ipcRenderer'</i>
    (no need to import).
  </p>
  <p>Check ./proxy/src/preload.ts if you want to customize global import.</p>
  <button on:click={testIpc}>Test ipc request.. {res}</button>
</div>
