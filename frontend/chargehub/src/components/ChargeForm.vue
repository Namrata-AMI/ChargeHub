<template>
  <form @submit.prevent="submit" class="charger-form">
    <input v-model="form.name" placeholder="Name" name="name" required />

    <input
      v-model.number="form.latitude"
      placeholder="Latitude"
      name="latitude"
      type="number"
      step="any"
      required
    />

    <input
      v-model.number="form.longitude"
      placeholder="Longitude"
      name="longitude"
      type="number"
      step="any"
      required
    />

    <select v-model="form.status" name="status" required>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>

    <input
      v-model.number="form.powerOutput"
      placeholder="Power Output (kW)"
      name="powerOutput"
      type="number"
      step="any"
      required
    />

    <input
      v-model="form.connectorType"
      placeholder="Connector Type"
      name="connectorType"
      required
    />

    <div class="form-buttons">
      <button type="submit">{{ form._id ? 'Update' : 'Add' }}</button>
      <button type="button" @click="$emit('canceled')" v-if="form._id">Cancel</button>
    </div>
  </form>
</template>

<script>
import axios from '../axios'

export default {
  props: {
    initial: Object
  },
  data() {
    return {
      form: {
        name: '',
        latitude: '',
        longitude: '',
        status: 'Active',
        powerOutput: '',
        connectorType: ''
      }
    }
  },
  watch: {
    initial: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val }
        } else {
          this.form = {
            name: '',
            latitude: '',
            longitude: '',
            status: 'Active',
            powerOutput: '',
            connectorType: ''
          }
        }
      }
    }
  },
  methods: {
    async submit() {
      try {
        if (this.form._id) {
          await axios.put(`/charges/${this.form._id}`, this.form)
        } else {
          await axios.post('/charges', this.form)
        }
        this.$emit('saved')
      } catch (err) {
        console.error('Failed to save charger:', err)
      }
    }
  }
}
</script>

<style scoped>
.charger-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: auto;
}

input,
select {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.form-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}

button {
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
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

button[type='button'] {
  background-color: #6c757d;
}

button[type='button']:hover {
  background-color: #565e64;
}
</style>
