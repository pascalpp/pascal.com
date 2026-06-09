<script lang="ts">
  import type { PreviewContent } from './_layout';

  export let content: PreviewContent;
</script>

<div class="preview-image">
  <div class="panel" />

  <div class="post">
    <div class="date">
      {content.date}
    </div>

    <div class="title">
      {content.title}
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
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Light.woff') format('woff');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: Inter;
    src: url('/fonts/Inter-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: Inter;
    src: url('/fonts/Inter-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: Inter;
    src: url('/fonts/Inter-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  .preview-image {
    --serif-font: 'Crimson Pro';
    --sans-font: Inter;

    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    background: hsl(44, 28%, 95%);
    color: #151515;
    font-weight: 400;
    font-family: var(--sans-font);
  }

  .panel {
    position: absolute;
    left: 36px;
    top: 36px;
    width: 1132px;
    height: 557px;
    display: flex;
    border-radius: 24px;
  }

  .post {
    position: absolute;
    left: 70px;
    top: 72px;
    width: 1030px;
    display: flex;
    flex-direction: column;
  }

  .date {
    display: flex;
    font-size: 36px;
    line-height: 1;
    font-weight: 300;
    letter-spacing: -1px;
    font-family: var(--serif-font);
    margin-bottom: 24px;
  }

  .title {
    display: flex;
    font-size: 72px;
    font-weight: 400;
    line-height: 0.98;
    letter-spacing: -2px;
    font-family: var(--serif-font);
    margin-bottom: 24px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    width: 920px;
    font-size: 32px;
    font-weight: 300;
    line-height: 1.4;
    font-family: var(--sans-font);
  }

  .footer {
    background: rgba(21, 21, 21, 0.075);
    position: absolute;
    left: 36px;
    bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
    padding-top: 20px;
    padding-bottom: 32px;
    width: 1132px;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  .site-title {
    display: flex;
    font-size: 48px;
    line-height: 1.2;
    font-weight: 400;
    font-family: var(--serif-font);
  }

  .url {
    display: flex;
    margin-top: 8px;
    margin-left: 2px;
    font-size: 24px;
    font-weight: 300;
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
