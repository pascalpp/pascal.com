<script lang="ts">
  import Dialog from '$lib/components/Dialog.svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';
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
      description: '',
    },
    {
      src: img2,
      alt: '02-features-1',
      description: '',
    },
    {
      src: img3,
      alt: '02-features-2',
      description: '',
    },
    {
      src: img4,
      alt: '02-features-3',
      description: '',
    },
    {
      src: img5,
      alt: '02-features-4',
      description: '',
    },
    {
      src: img6,
      alt: '02-features-5',
      description: '',
    },
    {
      src: img7,
      alt: '02-features-6',
      description: '',
    },
    {
      src: img8,
      alt: '02-features-7',
      description: '',
    },
    {
      src: img9,
      alt: '02-features-8',
      description: '',
    },
    {
      src: img10,
      alt: '02-features-9',
      description: '',
    },
    {
      src: img11,
      alt: '02-features-10',
      description: '',
    },
    {
      src: img12,
      alt: '02-features-11',
      description: '',
    },
    {
      src: img13,
      alt: '02-features-12',
      description: '',
    },
    {
      src: img14,
      alt: '02-features-13',
      description: '',
    },
    {
      src: img15,
      alt: '02-features-pricing',
      description: '',
    },
    {
      src: img16,
      alt: '02-login',
      description: '',
    },
    {
      src: img17,
      alt: '03-get-started',
      description: '',
    },
    {
      src: img18,
      alt: '04-edit-panel',
      description: '',
    },
    {
      src: img19,
      alt: '05-bio',
      description: '',
    },
    {
      src: img20,
      alt: '06-spotlight',
      description: '',
    },
    {
      src: img21,
      alt: '07-portfolio',
      description: '',
    },
    {
      src: img22,
      alt: '08-design-color-small',
      description: '',
    },
    {
      src: img23,
      alt: '09-design-color-medium',
      description: '',
    },
    {
      src: img24,
      alt: '10-design-color-large',
      description: '',
    },
    {
      src: img25,
      alt: '11-interests',
      description: '',
    },
    {
      src: img26,
      alt: '12-social-links',
      description: '',
    },
    {
      src: img27,
      alt: '13-domain',
      description: '',
    },
    {
      src: img28,
      alt: '14-dns-settings',
      description: '',
    },
    {
      src: img29,
      alt: '15-account',
      description: '',
    },
    {
      src: img30,
      alt: '16-mobile',
      description: '',
    },
  ];

  const title = 'Dialogs';

  let dialog1: Dialog;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>
  <section>
    <p>
      Mollit voluptate dolore incididunt reprehenderit aliquip pariatur ex. Deserunt do ipsum exercitation anim dolor
      eiusmod excepteur laborum velit esse minim magna reprehenderit. Dolore aliqua in ipsum aliquip nulla. Nisi do
      tempor mollit dolore sint Lorem quis ad elit in.
    </p>
    <p>
      Sit duis deserunt dolore ipsum dolor laborum do. Irure ut elit nisi adipisicing nostrud ad ad pariatur in proident
      irure tempor sit pariatur. Sunt deserunt cupidatat aute reprehenderit ullamco deserunt anim.
    </p>
    <p>
      Sint nostrud non veniam et elit sint quis dolor laboris eu nisi enim. Minim quis voluptate cillum ex eiusmod culpa
      dolore tempor. Aute tempor aute consequat occaecat deserunt tempor labore dolor qui ut incididunt anim. Nostrud
      consequat tempor voluptate cupidatat voluptate consequat laborum nulla deserunt amet. Quis consectetur laborum
      ullamco occaecat deserunt deserunt Lorem qui velit sit fugiat. Proident esse sit quis velit tempor eiusmod amet
      occaecat sit commodo.
    </p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat labore cillum.
      Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco culpa reprehenderit amet deserunt
      sunt. Anim proident culpa exercitation irure cupidatat minim incididunt in anim. Ea voluptate reprehenderit
      exercitation irure nisi aliquip et Lorem ad veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute
      do excepteur qui.
    </p>
    <p><Button primary on:click={dialog1.open} label="Open dialog" /></p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur. Elit aliquip ad
      ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet. In ea deserunt tempor ipsum in aute
      mollit. Commodo sit culpa do elit qui exercitation proident consequat ex consectetur Lorem sint aute.
      Reprehenderit aliquip pariatur Lorem non ut sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id
      adipisicing. Pariatur non cillum veniam fugiat dolor.
    </p>
    <p>
      Mollit voluptate dolore incididunt reprehenderit aliquip pariatur ex. Deserunt do ipsum exercitation anim dolor
      eiusmod excepteur laborum velit esse minim magna reprehenderit. Dolore aliqua in ipsum aliquip nulla. Nisi do
      tempor mollit dolore sint Lorem quis ad elit in.
    </p>
    <p>
      Sit duis deserunt dolore ipsum dolor laborum do. Irure ut elit nisi adipisicing nostrud ad ad pariatur in proident
      irure tempor sit pariatur. Sunt deserunt cupidatat aute reprehenderit ullamco deserunt anim.
    </p>
    <p>
      Sint nostrud non veniam et elit sint quis dolor laboris eu nisi enim. Minim quis voluptate cillum ex eiusmod culpa
      dolore tempor. Aute tempor aute consequat occaecat deserunt tempor labore dolor qui ut incididunt anim. Nostrud
      consequat tempor voluptate cupidatat voluptate consequat laborum nulla deserunt amet. Quis consectetur laborum
      ullamco occaecat deserunt deserunt Lorem qui velit sit fugiat. Proident esse sit quis velit tempor eiusmod amet
      occaecat sit commodo.
    </p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat labore cillum.
      Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco culpa reprehenderit amet deserunt
      sunt. Anim proident culpa exercitation irure cupidatat minim incididunt in anim. Ea voluptate reprehenderit
      exercitation irure nisi aliquip et Lorem ad veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute
      do excepteur qui.
    </p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur. Elit aliquip ad
      ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet. In ea deserunt tempor ipsum in aute
      mollit. Commodo sit culpa do elit qui exercitation proident consequat ex consectetur Lorem sint aute.
      Reprehenderit aliquip pariatur Lorem non ut sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id
      adipisicing. Pariatur non cillum veniam fugiat dolor.
    </p>
  </section>

  <Dialog bind:this={dialog1} title="about.me">
    <Slideshow {slides} />
  </Dialog>
</Column>

<style lang="less">
  section {
    max-width: 600px;
  }
</style>
