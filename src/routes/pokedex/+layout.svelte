<script lang="ts">
  import './pokedex.less';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import PokemonList from './PokemonList.svelte';
  import { goto } from '$app/navigation';
  import Search from './Search.svelte';

  export let data: LayoutData;

  let search = '';

  const names = data.names;

  $: name = data.pokemon?.name;
  $: currentIndex = names.indexOf(name);
  $: nextName = names[currentIndex + 1];
  $: previousName = names[currentIndex - 1];

  function showRandomPokemon(event: MouseEvent) {
    event.preventDefault();
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex] || names[names.length - 1];
    goto(`/pokedex/${randomName}`);
  }

  function onKeypress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' && nextName) {
      goto(`/pokedex/${nextName}`);
    } else if (event.key === 'ArrowLeft' && previousName) {
      goto(`/pokedex/${previousName}`);
    }
  }

  onMount(() => {
    document.addEventListener('keydown', onKeypress);
    return () => document.removeEventListener('keydown', onKeypress);
  });
</script>

<main>
  <div class="content">
    {#key data.pokemon?.name}
      <nav>
        <ul>
          <li class="random">
            <a href="/pokedex/" on:click={showRandomPokemon}>Random</a>
          </li>
          <li class="previous">
            {#if previousName}
              <a href="/pokedex/{previousName}">{previousName.replace('-', ' ')}</a>
            {/if}
          </li>
          <li class="next">
            {#if nextName}
              <a href="/pokedex/{nextName}">{nextName.replace('-', ' ')}</a>
            {/if}
          </li>
        </ul>
      </nav>
      <slot />
    {/key}
  </div>
  <div class="sidenav">
    <Search bind:value={search} />
    <div class="list">
      <PokemonList {names} {name} {search} />
    </div>
  </div>
</main>

<style lang="less">
  main {
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: stretch;
    overflow: hidden;
    position: absolute;

    .content {
      order: 1;
    }
    .list {
      order: 0;
    }

    @media @mobile {
      flex-direction: column;
      overflow: visible;
      position: unset;
      height: auto;
      padding: 1rem;
      .content {
        display: contents;
      }
      .sidenav {
        display: contents;
      }
      .list {
        display: contents;
      }
    }
  }

  .sidenav {
    display: flex;
    flex-direction: column;
    width: 320px;
    @media @mobile {
      width: auto;
    }
  }

  .list {
    margin: 0;
    padding: 0 1rem;
    overflow-y: scroll;
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;

    nav {
      ul {
        list-style: none;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        font-size: 18px;
        margin-bottom: 1rem;
        gap: 1rem;
        @media @mobile {
          flex-direction: column;
          align-items: stretch;
          gap: 0;
        }
      }
      a {
        text-transform: capitalize;
      }
      li {
        white-space: nowrap;
        text-align: center;
        @media @mobile {
          width: 100%;
        }
      }
      li.previous {
        flex: 1;
        text-align: left;
        a:before {
          content: '← ';
        }
      }
      li.next {
        flex: 1;
        text-align: right;
        a:after {
          content: ' →';
        }
      }
      li.random {
        margin-right: 2rem;
      }
    }
  }
</style>
