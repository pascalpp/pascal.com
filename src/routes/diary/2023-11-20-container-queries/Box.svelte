<script lang="ts">
  export let title = 'Container queries';
</script>

<div class="box">
  <h1>{title}</h1>
  <p class="content40">0ch ↔ 40ch</p>
  <p class="content40-80">40ch ↔ 80ch</p>
  <p class="content80-100">80ch ↔ 100ch</p>
  <p class="content100-120">100ch ↔ 120ch</p>
  <p class="content120">&gt; 120ch</p>
</div>

<style lang="less">
  .box {
    color: white;
    padding: 1rem;
    min-height: 100px;

    h1 {
      line-height: 1;
      margin-bottom: 0.1em;
    }

    p {
      display: none;
    }
  }

  @container (inline-size <= 40ch) {
    .box {
      background-color: teal;
      .content40 {
        display: block;
      }
    }
  }
  @container (inline-size > 40ch) and (inline-size <= 80ch) {
    .box {
      background-color: rebeccapurple;
      .content40-80 {
        display: block;
      }
    }
  }
  @container (inline-size > 80ch) and (inline-size <= 100ch) {
    .box {
      background-color: salmon;
      .content80-100 {
        display: block;
      }
    }
  }
  @container (inline-size > 100ch) and (inline-size <= 120ch) {
    .box {
      background-color: darkgoldenrod;
      .content100-120 {
        display: block;
      }
    }
  }
  @container (inline-size > 120ch) {
    .box {
      background-color: maroon;
      .content120 {
        display: block;
      }
    }
  }
</style>
