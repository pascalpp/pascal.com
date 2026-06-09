<script lang="ts">
  import type { PreviewContent } from './_layout';

  export let content: PreviewContent;
</script>

<div class="preview-image">
  <div class="panel" />

  <div class="body-band" />

  <div class="date">
    {content.date}
  </div>

  <div class="post">
    <div class="title">
      What {content.title}
    </div>

    <div class="summary">
      {content.summary}
    </div>
  </div>

  <div class="footer">
    <div class="site-title">Pascal’s Diary</div>

    <div class="url">
      {content.url}
    </div>
  </div>

  <div class="border" />
</div>

<style>
  @font-face {
    font-family: 'Noto Sans';
    src: url('/fonts/NotoSans-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans';
    src: url('/fonts/NotoSans-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans';
    src: url('/fonts/NotoSans-Semibold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  .preview-image {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    background: #f1eee6;
    color: #151515;
    font-family: 'Noto Sans';
  }

  .panel {
    position: absolute;
    left: 36px;
    top: 36px;
    width: 1132px;
    height: 557px;
    display: flex;
    background: rgba(21, 21, 21, 0.075);
    border-radius: 24px;
  }

  .body-band {
    position: absolute;
    left: 36px;
    top: 136px;
    width: 1132px;
    height: 330px;
    display: flex;
    background: #f1eee6;
  }

  .date {
    position: absolute;
    text-transform: uppercase;
    left: 72px;
    top: 72px;
    display: flex;
    font-size: 36px;
    font-weight: 400;
    line-height: 1;
  }

  .post {
    position: absolute;
    left: 70px;
    top: 170px;
    width: 1030px;
    display: flex;
    flex-direction: column;
  }

  .title {
    display: flex;
    font-size: 78px;
    font-weight: 500;
    line-height: 0.98;
    letter-spacing: 0;
  }

  .summary {
    display: flex;
    flex-direction: column;
    margin-top: 28px;
    margin-left: 5px;
    width: 920px;
    font-size: 36px;
    font-weight: 500;
    line-height: 1.28;
  }

  .footer {
    position: absolute;
    left: 72px;
    top: 500px;
    display: flex;
    flex-direction: column;
  }

  .site-title {
    display: flex;
    font-size: 36px;
    line-height: 1;
  }

  .url {
    display: flex;
    margin-top: 8px;
    margin-left: 2px;
    font-size: 24px;
    font-weight: 500;
    line-height: 1;
  }

  .border {
    position: absolute;
    left: 36px;
    top: 36px;
    width: 1132px;
    height: 557px;
    display: flex;
    border: 2px dashed rgba(21, 21, 21, 0.3);
    border-radius: 24px;
  }
</style>
