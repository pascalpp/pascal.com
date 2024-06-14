<script lang="ts">
  export let tokens: string[];

  function updateToken(value: string, index: number) {
    tokens = [...tokens.slice(0, index), value, ...tokens.slice(index + 1)];
  }

  function handleInput(input: HTMLInputElement, index: number) {
    const onInput = () => {
      input.value = input.value.replace(/[^a-z]/g, '').toLowerCase();
      updateToken(input.value, index);
    };
    const onBlur = () => {
      updateToken(input.value, index);
    };

    input.addEventListener('input', onInput);
    input.addEventListener('blur', onBlur);
    return {
      destroy() {
        input.removeEventListener('input', onInput);
        input.removeEventListener('blur', onBlur);
      },
    };
  }
</script>

<div class="tokens">
  {#each tokens as token, index}
    <input
      type="text"
      maxlength="4"
      class="token"
      value={token}
      use:handleInput={index}
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
    />
  {/each}
</div>

<style lang="less">
  .tokens {
    display: grid;
    grid-template-columns: repeat(4, 64px);
    gap: 1em;
    font-family: var(--font-sans);
    font-weight: 400;
    font-size: 16px;
    padding: 1.5rem;
    background-color: hsl(60, 80%, 95%);
    border-radius: 0.5rem;
    border: 1px solid rgba(0 0 0 / 0.5);
    width: max-content;
  }

  .token {
    box-sizing: border-box;
    padding: 0.5em 0.2em;
    background-color: white;
    color: black;
    text-align: center;
    border: 2px solid rgb(133, 133, 210);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
  }
</style>
