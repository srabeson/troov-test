<script setup lang="ts">
import { FetchError } from "ohmyfetch";

definePageMeta({
  layout: false,
});

const config = useRuntimeConfig();

const email = ref("");
const password = ref("");

const submitting = ref(false);
const errorMessage = ref<string | null>(null);

const handleSubmit = async () => {
  try {
    // Reset error message
    errorMessage.value = null;

    // Form is submitting
    submitting.value = true;

    // Send login request
    const response = await $fetch<{
      success: boolean;
      access_token: string;
    }>(`/auth/login`, {
      baseURL: config.public.apiBase,
      method: "POST",
      body: {
        username: email.value,
        password: password.value,
      },
    });

    // Store access token
    localStorage.setItem("access_token", response.access_token);

    // Navigate to home screen
    await navigateTo("/");
  } catch (error) {
    // Display error message in case of error
    if (error instanceof FetchError && error.data && error.data.error) {
      errorMessage.value = error.data.error;
    } else {
      errorMessage.value = "Something went wrong.";
    }
  } finally {
    // Form is no longer submitting
    submitting.value = false;
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="d-none d-md-block col-12 col-md-4 col-lg-6 bg-dark text-light"
      >
        <div class="d-flex justify-content-center align-items-center h-100">
          <h1 class="display-1">
            <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
          </h1>
        </div>
      </div>

      <div class="col-12 col-md-8 col-lg-6 bg-light text-dark min-vh-100">
        <div class="text-center mx-md-5">
          <h1 class="mt-5 display-1">Login</h1>
          <p>Welcome to the object management web app</p>

          <div
            v-if="errorMessage"
            class="alert alert-danger mt-5 text-start"
            role="alert"
          >
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleSubmit" class="my-5">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="name@example.com"
                required
                v-model="email"
              />
              <label for="emailInput">Email address</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Password"
                required
                v-model="password"
              />
              <label for="passwordInput">Password</label>
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                <div
                  v-if="submitting"
                  class="spinner-border text-light"
                  role="status"
                  :style="{ width: '1rem', height: '1rem' }"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span v-else>LOGIN</span>
              </button>
            </div>
          </form>

          <div>
            <span class="me-2">New member?</span>
            <NuxtLink to="/register">Register</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
