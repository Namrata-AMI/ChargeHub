<template>
  <div class="dashboard-container">
    <div class="dashboard-box">
      <h2 class="dashboard-title">Manage Chargers</h2>

      <div class="form-wrapper">
        <ChargerForm
          :initial="selectedCharger"
          @saved="onChargerSaved"
          @canceled="onCancelEdit"
        />
      </div>

      <div class="divider"></div>

      <div class="list-wrapper">
        <ChargerList
          :chargers="chargers"
          @edit="onEditCharger"
          @delete="onDeleteCharger"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios'
import ChargerList from '../components/ChargeList.vue'
import ChargerForm from '../components/ChargeForm.vue'

export default {
  name: 'ChargeDashboard',
  components: { ChargerList, ChargerForm },
  data() {
    return {
      chargers: [],
      selectedCharger: null
    }
  },
  async mounted() {
    await this.fetchChargers()
  },
  methods: {
    async fetchChargers() {
      try {
        const res = await axios.get('/charges')
        this.chargers = res.data
      } catch (err) {
        console.error('Failed to load chargers:', err)
      }
    },
    onEditCharger(charger) {
      this.selectedCharger = { ...charger }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async onChargerSaved() {
      this.selectedCharger = null
      await this.fetchChargers()
    },
    onCancelEdit() {
      this.selectedCharger = null
    },
    async onDeleteCharger(id) {
      if (!confirm('Are you sure you want to delete this charger?')) return
      try {
        await axios.delete(`/charges/${id}`)
        this.chargers = this.chargers.filter(c => c._id !== id)
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 750px;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 1rem;
  color: #333333;
  font-size: 1.8rem;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.form-wrapper {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 0 0 2rem 0;
}

.list-wrapper {
  background: #fdfdfd;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

button {
  display: inline-block;
  width: auto;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  width:10px !important;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

button + button {
  margin-left: 0.5rem;
}


@media (max-width: 600px) {
  .dashboard-box {
    padding: 1rem;
  }
  .form-wrapper,
  .list-wrapper {
    padding: 1rem;
  }
}
</style>
