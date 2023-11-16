<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Slideshow from '$lib/components/Slideshow.svelte';
  import type { Slide } from '$lib/components/Slideshow.svelte';

  import img1 from './about.me/01-home.png';
  import img2 from './about.me/02-features-1.png';
  import img3 from './about.me/02-features-2.png';
  import img4 from './about.me/02-features-3.png';
  import img5 from './about.me/02-features-4.png';
  import img6 from './about.me/02-features-5.png';
  import img7 from './about.me/02-features-6.png';
  import img8 from './about.me/02-features-7.png';
  import img9 from './about.me/02-features-8.png';
  import img10 from './about.me/02-features-9.png';
  import img11 from './about.me/02-features-10.png';
  import img12 from './about.me/02-features-11.png';
  import img13 from './about.me/02-features-12.png';
  import img14 from './about.me/02-features-13.png';
  import img15 from './about.me/02-features-pricing.png';
  import img16 from './about.me/02-login.png';
  import img17 from './about.me/03-get-started.png';
  import img18 from './about.me/04-edit-panel.png';
  import img19 from './about.me/05-bio.png';
  import img20 from './about.me/06-spotlight.png';
  import img21 from './about.me/07-portfolio.png';
  import img22 from './about.me/08-design-color-small.png';
  import img23 from './about.me/09-design-color-medium.png';
  import img24 from './about.me/10-design-color-large.png';
  import img25 from './about.me/11-interests.png';
  import img26 from './about.me/12-social-links.png';
  import img27 from './about.me/13-domain.png';
  import img28 from './about.me/14-dns-settings.png';
  import img29 from './about.me/15-account.png';
  import img30 from './about.me/16-mobile.png';

  const slides: Slide[] = [
    {
      src: img1,
      alt: '01-home',
      description: 'Home page',
    },
    {
      src: img2,
      alt: '02-features-1',
      description: 'Features page',
    },
    {
      src: img3,
      alt: '02-features-2',
      description: 'Features page',
    },
    {
      src: img4,
      alt: '02-features-3',
      description: 'Features page',
    },
    {
      src: img5,
      alt: '02-features-4',
      description: 'Features page',
    },
    {
      src: img6,
      alt: '02-features-5',
      description: 'Features page',
    },
    {
      src: img7,
      alt: '02-features-6',
      description: 'Features page',
    },
    {
      src: img8,
      alt: '02-features-7',
      description: 'Features page',
    },
    {
      src: img9,
      alt: '02-features-8',
      description: 'Features page',
    },
    {
      src: img10,
      alt: '02-features-9',
      description: 'Features page',
    },
    {
      src: img11,
      alt: '02-features-10',
      description: 'Features page',
    },
    {
      src: img12,
      alt: '02-features-11',
      description: 'Features page',
    },
    {
      src: img13,
      alt: '02-features-12',
      description: 'Features page',
    },
    {
      src: img14,
      alt: '02-features-13',
      description: 'Features page',
    },
    {
      src: img15,
      alt: '02-features-pricing',
      description: 'Pricing page',
    },
    {
      src: img16,
      alt: '02-login',
      description: 'Login page',
    },
    {
      src: img17,
      alt: '03-get-started',
      description: 'Get started panel',
    },
    {
      src: img18,
      alt: '04-edit-panel',
      description: 'Edit panel',
    },
    {
      src: img19,
      alt: '05-bio',
      description: 'Bio pane',
    },
    {
      src: img20,
      alt: '06-spotlight',
      description: 'Spotlight pane',
    },
    {
      src: img21,
      alt: '07-portfolio',
      description: 'Portfolio pane',
    },
    {
      src: img22,
      alt: '08-design-color-small',
      description: 'Design pane, with small template selected',
    },
    {
      src: img23,
      alt: '09-design-color-medium',
      description: 'Design pane, with medium template selected',
    },
    {
      src: img24,
      alt: '10-design-color-large',
      description: 'Design pane, with large template selected',
    },
    {
      src: img25,
      alt: '11-interests',
      description: 'Interests pane',
    },
    {
      src: img26,
      alt: '12-social-links',
      description: 'Social links pane',
    },
    {
      src: img27,
      alt: '13-domain',
      description: 'Domain settings pane',
    },
    {
      src: img28,
      alt: '14-dns-settings',
      description: 'DNS settings pane',
    },
    {
      src: img29,
      alt: '15-account',
      description: 'Account pane',
    },
    {
      src: img30,
      alt: '16-mobile',
      description: 'Mobile view',
    },
  ];

  let dialog: Dialog;
</script>

<div class="scope">
  <Button link on:click={dialog.open} label="View slides" />

  <Dialog bind:this={dialog} title="about.me" padded={false}>
    <Slideshow {slides} />
  </Dialog>
</div>

<style lang="less">
  .scope {
    display: contents;
    --dialog-background-color: hsl(173, 50%, 40%);
    --dialog-color: white;
  }
</style>
