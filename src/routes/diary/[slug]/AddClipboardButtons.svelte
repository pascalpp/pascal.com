<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const codeblocks: HTMLElement[] = Array.from(document.querySelectorAll('pre[class*="language-"]'));
    codeblocks.forEach((codeblock) => {
      const classes = Array.from(codeblock.classList);
      const language = classes.find((c) => c.startsWith('language-'))?.replace('language-', '') || '';
      if (language) {
        const languageTag = document.createElement('span');
        languageTag.classList.add('language-tag');
        languageTag.textContent = language;
        codeblock.appendChild(languageTag);
      }

      const copyButton = document.createElement('button');
      copyButton.classList.add('copy-button');
      copyButton.textContent = 'Copy to clipboard';
      copyButton.addEventListener('click', () => {
        const text = codeblock.querySelector('code')?.textContent?.trim();
        if (!text) return;
        navigator.clipboard.writeText(text);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy to clipboard';
        }, 2000);
      });
      codeblock.appendChild(copyButton);
    });
  });
</script>
