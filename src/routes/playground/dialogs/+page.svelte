<script lang="ts">
  import Dialog from '$lib/components/Dialog.svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';
  import type { DialogApi } from '$lib/components/Dialog.svelte';
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
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img2,
      alt: '02-features-1',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img3,
      alt: '02-features-2',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img4,
      alt: '02-features-3',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img5,
      alt: '02-features-4',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img6,
      alt: '02-features-5',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img7,
      alt: '02-features-6',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img8,
      alt: '02-features-7',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img9,
      alt: '02-features-8',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img10,
      alt: '02-features-9',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img11,
      alt: '02-features-10',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img12,
      alt: '02-features-11',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img13,
      alt: '02-features-12',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img14,
      alt: '02-features-13',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img15,
      alt: '02-features-pricing',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img16,
      alt: '02-login',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img17,
      alt: '03-get-started',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img18,
      alt: '04-edit-panel',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img19,
      alt: '05-bio',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img20,
      alt: '06-spotlight',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img21,
      alt: '07-portfolio',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img22,
      alt: '08-design-color-small',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img23,
      alt: '09-design-color-medium',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img24,
      alt: '10-design-color-large',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img25,
      alt: '11-interests',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img26,
      alt: '12-social-links',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img27,
      alt: '13-domain',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img28,
      alt: '14-dns-settings',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img29,
      alt: '15-account',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
    {
      src: img30,
      alt: '16-mobile',
      description:
        'Dolor reprehenderit officia non adipiscing aute adipiscing labore. Officia non, adipiscing aute adipiscing labore officia labore. Aute adipiscing labore officia labore dolore amet sint. Labore officia labore dolore amet sint mollit. Labore dolore, amet sint mollit.',
    },
  ];

  const title = 'Dialogs';

  let dialog1: DialogApi = {
    open: () => {},
    close: () => {},
  };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>

  <Slideshow {slides} />
  <section>
    <Button primary on:click={dialog1.open} label="Open dialog" />

    <Dialog bind:open={dialog1.open} title="A dialog">
      <p>
        Cillum nostrud sint esse. Sint esse occaecat mollit incididunt. Occaecat mollit incididunt deserunt lorem
        eiusmod excepteur. Incididunt deserunt lorem eiusmod excepteur mollit. Lorem eiusmod excepteur mollit. Excepteur
        mollit reprehenderit excepteur ullamco proident in voluptate.
      </p>
      <p>
        Elit ullamco irure adipiscing, do velit. Adipiscing do velit qui elit minim elit minim. Velit qui, elit minim
        elit minim. Minim, elit minim incididunt et adipiscing. Incididunt, et adipiscing aliqua. Aliqua, incididunt
        tempor id deserunt. Id deserunt proident ea eu incididunt mollit quis. Proident ea, eu incididunt mollit.
      </p>
    </Dialog>

    <!-- <Slideshow {slides} /> -->
  </section></Column
>

<style lang="less">
  section {
    max-width: 600px;
  }
</style>
