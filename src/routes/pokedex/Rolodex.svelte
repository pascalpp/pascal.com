<script lang="ts">
  export let letters: string[];
</script>

<ul class="rolodex">
  {#each letters as letter}
    <li>
      <a href="#{letter}">{letter}</a>
    </li>
  {/each}
</ul>

<style lang="less">
  .rolodex {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: white;
    padding: 0.75rem 0.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    li {
      text-align: center;
    }
  }
</style>
