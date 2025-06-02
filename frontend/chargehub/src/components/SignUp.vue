<template>
  <div class="signup-container">
    <div class="sign-box">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
         <div class="form-group">
          <label for="username">Username:</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Signing Up..." : "Sign Up" }}
        </button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>

      <p class="switch-auth">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>


<script>
import axios from '../axios'

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSignup() {
      this.loading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const res = await axios.post("/auth/signup", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.successMessage = "Signup successful! Redirecting to login…";
        this.username = "";
        this.email = "";
        this.password = "";

        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } catch (err) {
        this.errorMessage =
          err.response?.data?.message || "Signup failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
}

.sign-box {
  background: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;
}

.sign-box h2 {
  margin-bottom: 1.5rem;
  color: #333333;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #007bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}

.error {
  margin-top: 1rem;
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
}

.success {
  margin-top: 1rem;
  color: #27ae60;
  font-size: 0.9rem;
  text-align: center;
}

.switch-auth {
  margin-top: 1.25rem;
  color: #555555;
  text-align: center;
}

.switch-auth a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.switch-auth a:hover {
  text-decoration: underline;
}
</style>
