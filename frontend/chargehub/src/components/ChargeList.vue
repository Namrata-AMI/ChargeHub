<template>
  <ul class="charger-list">
    <li v-for="c in chargers" :key="c._id" class="charger-item">
      <div class="charger-info">
        {{ c.name }} - {{ c.status }} - {{ c.powerOutput }}kW
      </div>
      <div class="button-row">
        <button @click="edit(c)">Edit</button>
        <button class="delete-btn" @click="remove(c._id)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from '../axios'
export default {
  data() {
    return { chargers: [] }
  },
  async mounted() {
    const res = await axios.get('/charges')
    this.chargers = res.data
  },
  methods: {
    edit(charger) {
      this.$emit('edit', charger)
    },
    async remove(id) {
      if (!confirm('Are you sure you want to delete this charger?')) return
      await axios.delete(`/charges/${id}`)
      this.chargers = this.chargers.filter(c => c._id !== id)
    }
  }
}
</script>

<style scoped>
.charger-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.charger-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background: #f9f9f9;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.charger-info {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

button {
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
