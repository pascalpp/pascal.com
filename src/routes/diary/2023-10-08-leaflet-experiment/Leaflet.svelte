<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import type Leaflet from 'leaflet';

  let leaflet: typeof Leaflet;
  let mapElement: HTMLDivElement;
  let map: Leaflet.Map;
  let markers: Leaflet.Marker[] = [];

  onMount(async () => {
    leaflet = await import('leaflet');

    const { latitude, longitude } = getLastAllowedLocation();
    map = leaflet.map(mapElement).setView([latitude, longitude], 13);

    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map);

    const marker = leaflet.marker([latitude, longitude]).addTo(map);
    markers.push(marker);
  });

  function showMyLocation() {
    window.navigator.geolocation.getCurrentPosition(onLocationGranted, console.error, {
      maximumAge: 1000 * 60 * 60 * 24,
    });
  }

  function onLocationGranted(loc: GeolocationPosition) {
    const { latitude, longitude } = loc.coords;
    localStorage.setItem('lastAllowedLocation', JSON.stringify({ latitude, longitude }));
    markers.forEach((marker) => map.removeLayer(marker));
    map.setView([latitude, longitude], 13);
    const marker = leaflet.marker([latitude, longitude]).addTo(map);
    markers.push(marker);
  }

  function getLastAllowedLocation() {
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
