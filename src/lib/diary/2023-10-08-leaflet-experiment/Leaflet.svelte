<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import type Leaflet from 'leaflet';
  import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

  let leaflet: typeof Leaflet;
  let mapElement: HTMLDivElement;
  let map: Leaflet.Map;
  let markers: Leaflet.Marker[] = [];

  onMount(async () => {
    leaflet = await import('leaflet');

    // @ts-ignore
    delete leaflet.Icon.Default.prototype._getIconUrl;
    leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    map = leaflet.map(mapElement);

    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map);

    const { latitude, longitude } = getInitialLocation();
    showCoordinates(latitude, longitude);
  });

  function showMyLocation() {
    window.navigator.geolocation.getCurrentPosition(onLocationGranted, console.error, {
      maximumAge: 1000 * 60 * 60 * 24,
    });
  }

  function onLocationGranted(loc: GeolocationPosition) {
    const { latitude, longitude } = loc.coords;
    localStorage.setItem('lastAllowedLocation', JSON.stringify({ latitude, longitude }));
    showCoordinates(latitude, longitude);
  }

  function showCoordinates(latitude: number, longitude: number) {
    markers.forEach((marker) => map.removeLayer(marker));
    map.setView([latitude, longitude], 13);
    const marker = leaflet.marker([latitude, longitude]).addTo(map);
    markers.push(marker);
  }

  function getInitialLocation() {
    const lastAllowedLocation = localStorage.getItem('lastAllowedLocation');
    if (lastAllowedLocation) {
      return JSON.parse(lastAllowedLocation);
    } else {
      return { latitude: 51.505, longitude: -0.09 }; // default to London
    }
  }
</script>

<div class="map-container">
  <div class="map" bind:this={mapElement} />
</div>

<p>
  <button type="button" on:click={showMyLocation}>Show my location</button>
</p>

<style lang="less">
  .map-container {
    border: 1px solid rgb(0 0 0 / 0.2);
    border-radius: 3px;
    background-color: #fff;
    padding: 8px;
    width: 100%;
    max-width: 800px;
    transform: rotate(-1deg);
    box-shadow: 5px 5px 10px rgb(0 0 0 / 0.1);
  }
  .map {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 3 / 2;
  }
</style>
