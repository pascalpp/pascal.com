<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Slideshow from '$lib/components/Slideshow.svelte';
  import type { Slide } from '$lib/components/Slideshow.svelte';

  // import img1 from './broadly/01-inbox-1.png';
  // import img2 from './broadly/01-inbox-2.png';
  import img3 from './broadly/01-inbox-3.png';
  import img4 from './broadly/02-get-started.png';
  import img5 from './broadly/03-dashboard.png';
  import img6 from './broadly/04-contacts.png';
  import img7 from './broadly/05-quote.png';
  import img8 from './broadly/06-settings-profiles.png';
  import img9 from './broadly/06-settings-profiles-google.png';
  import img10 from './broadly/07-settings-messaging.png';
  import img11 from './broadly/08-settings-review-requests.png';
  import img12 from './broadly/09-settings-saved-replies.png';
  import img13 from './broadly/10-settings-calls.png';
  import img14 from './broadly/11-settings-webchat-1.png';
  import img15 from './broadly/11-settings-webchat-2.png';
  import img16 from './broadly/12-settings-appointments.png';
  import img17 from './broadly/13-settings-service-reminders.png';
  import img18 from './broadly/14-settings-payments.png';
  import img19 from './broadly/15-settings-data-sources-1.png';
  import img20 from './broadly/15-settings-data-sources-2.png';
  import img21 from './broadly/16-reports-locations.png';
  import img22 from './broadly/16-reports-locations-filter.png';
  import img23 from './broadly/16-reports-locations-modal.png';
  import img24 from './broadly/17-reports-team.png';
  import img25 from './broadly/scratchpad-alerts.png';
  import img26 from './broadly/scratchpad-badges.png';
  import img27 from './broadly/scratchpad-buttons.png';
  import img28 from './broadly/scratchpad-cards.png';
  import img29 from './broadly/scratchpad-dropdowns.png';
  import img30 from './broadly/scratchpad-forms.png';
  import img31 from './broadly/scratchpad-forms-select-toggle.png';
  import img32 from './broadly/scratchpad-layout-row.png';
  import img33 from './broadly/scratchpad-progress-bar.png';
  import img34 from './broadly/scratchpad-spinner.png';

  const slides: Slide[] = [
    // { src: img1, alt: '01-inbox-1', description: 'Inbox' },
    // { src: img2, alt: '01-inbox-2', description: 'inbox-2' },
    { src: img4, alt: '02-get-started', description: 'Get Started' },
    { src: img5, alt: '03-dashboard', description: 'Dashboard' },
    { src: img3, alt: '01-inbox-3', description: 'Inbox' },
    { src: img6, alt: '04-contacts', description: 'Contacts' },
    { src: img7, alt: '05-quote', description: 'Creating a quote' },
    { src: img8, alt: '06-settings-profiles', description: 'Settings: Online profiles pane' },
    { src: img9, alt: '06-settings-profiles-google', description: 'Settings: Google profile' },
    { src: img10, alt: '07-settings-messaging', description: 'Settings: Messaging' },
    { src: img11, alt: '08-settings-review-requests', description: 'Settings: Review requests' },
    { src: img12, alt: '09-settings-saved-replies', description: 'Settings: Saved replies' },
    { src: img13, alt: '10-settings-calls', description: 'Settings: Calls' },
    { src: img14, alt: '11-settings-webchat-1', description: 'Settings: Webchat' },
    { src: img15, alt: '11-settings-webchat-2', description: 'Settings: Webchat' },
    { src: img16, alt: '12-settings-appointments', description: 'Settings: Appointments' },
    { src: img17, alt: '13-settings-service-reminders', description: 'Settings: Service reminders' },
    { src: img18, alt: '14-settings-payments', description: 'Settings: Payments' },
    { src: img19, alt: '15-settings-data-sources-1', description: 'Settings: Data sources' },
    { src: img20, alt: '15-settings-data-sources-2', description: 'Settings: Add data source' },
    { src: img21, alt: '16-reports-locations', description: 'Reports: Locations' },
    { src: img22, alt: '16-reports-locations-filter', description: 'Reports: Locations filter' },
    { src: img23, alt: '16-reports-locations-modal', description: 'Reports: Customers added modal' },
    { src: img24, alt: '17-reports-team', description: 'Reports: Team' },
    { src: img25, alt: 'scratchpad-alerts', description: 'Design system examples' },
    { src: img26, alt: 'scratchpad-badges', description: 'Design system examples' },
    { src: img27, alt: 'scratchpad-buttons', description: 'Design system examples' },
    { src: img28, alt: 'scratchpad-cards', description: 'Design system examples' },
    { src: img29, alt: 'scratchpad-dropdowns', description: 'Design system examples' },
    { src: img30, alt: 'scratchpad-forms', description: 'Design system examples' },
    { src: img31, alt: 'scratchpad-forms-select-toggle', description: 'Design system examples' },
    { src: img32, alt: 'scratchpad-layout-row', description: 'Design system examples' },
    { src: img33, alt: 'scratchpad-progress-bar', description: 'Design system examples' },
    { src: img34, alt: 'scratchpad-spinner', description: 'Design system examples' },
  ];

  let openSlideshow = () => {};
</script>

<div class="scope">
  <Button link on:click={openSlideshow} label="View slides" />

  <Dialog bind:open={openSlideshow} title="Broadly" padded={false}>
    <Slideshow {slides} />
  </Dialog>
</div>

<style lang="less">
  .scope {
    display: contents;
    --dialog-background-color: hsl(220, 30%, 50%);
    --dialog-color: white;
  }
</style>
