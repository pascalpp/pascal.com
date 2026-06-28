<script lang="ts">
  export let value: any | undefined = undefined;

  let output = value;
  if (typeof value === 'object') {
    output = JSON.stringify(value, null, 2);
  }
</script>

<pre>
<slot>{output}</slot>
</pre>

<style lang="less">
  pre {
    margin: 0;
    display: inline-block;
    background-color: #f8f8f8;
    border: 1px solid fade(black, 10%);
    padding: 12px;
    border-radius: 4px;
    white-space: pre-wrap;
    overflow-x: scroll;
  }
</style>
