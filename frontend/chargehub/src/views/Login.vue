<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Welcome Back</h2>
      <form @submit.prevent="login">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../axios'

export default {
  data() {
    return {
      username: '',  // changed from email
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/auth/login', {
          username: this.username,  // send username instead of email
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
      }
    }
  }
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
}

.login-box {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

form input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;
}

form input:focus {
  border-color: #007BFF;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #007BFF;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  margin-top: 0.75rem;
}
</style>
