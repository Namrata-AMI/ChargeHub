<template>
  <div id="map" style="height: 400px;"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from '../axios'

export default {
  async mounted() {
    const map = L.map('map').setView([20.5937, 78.9629], 5)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    const res = await axios.get('/charges')
    res.data.forEach(c => {
      const marker = L.marker([c.latitude, c.longitude]).addTo(map)
      marker.bindPopup(`<b>${c.name}</b><br>Status: ${c.status}`)
    })
  }
}
</script>
