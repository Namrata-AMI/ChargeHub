<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button>Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:8080/api/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', res.data.token);
        this.$emit('loginSuccess');
      } catch (err) {
        this.error = 'Login failed';
      }
    }
  }
};
</script>
