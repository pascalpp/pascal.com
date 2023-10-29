<script lang="ts">
  export let value = '';
</script>

<div class="search">
  <input type="search" bind:value placeholder="Search…" />
</div>

<style lang="less">
  .search {
    width: 100%;
    padding: 1rem;

    input {
      width: 100%;
      appearance: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      padding: 0.25rem 1rem;
      display: block;
      border-radius: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
</style>
