---
title: Experimenting with Leaflet
date: 2023-10-08T00:41:12.985Z
status: published
tags: [javascript, svelte]
---

<script>
  import Leaflet from './Leaflet.svelte';
</script>

Just me tinkering around with [Leaflet](https://leafletjs.com/examples/quick-start/) with help from [Joy of Code](https://www.youtube.com/watch?v=RuM4KHTZqD4) on YouTube.

<Leaflet/>

## Installation

```bash
npm install leaflet @types/leaflet
```

## Initial Setup

```svelte
<script lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import type Leaflet from 'leaflet';

  // we'll import leaflet and assign it to this variable
  let leaflet: typeof Leaflet;

  // our map instance
  let map: Leaflet.Map;

  // the DOM node that will contain our map
  let mapElement: HTMLDivElement;

  onMount(async () => {
    // leaflet accesses window during import, so we have to lazy import it in onMount
    leaflet = await import('leaflet');

    // create the map with London coordinates and a human-scale zoom-level
    map = leaflet.map(mapElement).setView([51.505, -0.09], 13);

    // apply the tile layer to the map. without this, we won't see any map details
    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map);
  });
</script>

<!-- this element is bound to our mapElement variable defined above -->
<div class="map" bind:this={mapElement} />

<style>
  /* ensure the element has width and height */
  .map {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 3 / 2;
  }
</style>
```

## Adding a button to show the user's current location

First, add a button below the map which calls a function `showMyLocation` when clicked.

```svelte
<div class="map" bind:this={mapElement} />

<p>
  <button type="button" on:click={showMyLocation}>Show my location</button>
</p>
```

Add the `showMyLocation` function:

```typescript
function showMyLocation() {
  // this uses the browser's geolocation API to get the user's current location
  // this will show an alert requesting permission if the user hasn't already granted it
  // if the user grants permission, the onLocationGranted function will be called
  window.navigator.geolocation.getCurrentPosition(onLocationGranted, console.error, {
    maximumAge: 1000 * 60 * 60 * 24,
  });
}

function onLocationGranted(loc: GeolocationPosition) {
  // the user has granted permission to access their location
  // we can access the latitude and longitude from the location's coords property
  // and update the map's view, and add a marker to the map
  const { latitude, longitude } = loc.coords;
  map.setView([latitude, longitude], 13);
  const marker = leaflet.marker([latitude, longitude]).addTo(map);
}
```

## Save the user's location for subsequent visits

Asking the user's location on every visit can be annoying. We can save the user's location in local storage and use that to set the map's view if it exists.

```typescript
function onLocationGranted(loc: GeolocationPosition) {
  const { latitude, longitude } = loc.coords;
  localStorage.setItem('lastAllowedLocation', JSON.stringify({ latitude, longitude }));
  showCoordinates(latitude, longitude);
}

function showCoordinates(latitude: number, longitude: number) {
  map.setView([latitude, longitude], 13);
  const marker = leaflet.marker([latitude, longitude]).addTo(map);
}
```

## Update the onMount function to use the saved location

```typescript
function getInitialLocation() {
  const lastAllowedLocation = localStorage.getItem('lastAllowedLocation');
  if (lastAllowedLocation) {
    return JSON.parse(lastAllowedLocation);
  } else {
    return { latitude: 51.505, longitude: -0.09 }; // default to London
  }
}

onMount(async () => {
  leaflet = await import('leaflet');

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
```
