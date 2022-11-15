<script setup lang="ts">
const config = useRuntimeConfig();

const route = useRoute();

const name = ref("");
const description = ref("");

const submitting = ref(false);
const errorMessage = ref<string | null>(null);

const handleSubmit = async () => {
  try {
    // Reset error message
    errorMessage.value = null;

    // Form is submitting
    submitting.value = true;

    // Send object edition request
    await $fetch(`/api/edit`, {
      method: "POST",
      body: {
        id: route.params.id,
        name: name.value,
        description: description.value,
      },
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      baseURL: config.public.apiBase,
    });

    // Navigate to home screen
    await navigateTo("/");
  } catch (error) {
    // Display error message in case of error
    errorMessage.value = "Something went wrong.";
  } finally {
    // Form is no longer submitting
    submitting.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="mt-5 display-1 textcenter">Edit object</h1>

        <div
          v-if="errorMessage"
          class="alert alert-danger mt-5 text-start"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="mt-5">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="nameInput"
              placeholder="name@example.com"
              required
              v-model="name"
            />
            <label for="nameInput">Name</label>
          </div>

          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="Describe the object"
              id="descriptionInput"
              style="height: 128px"
              required
              v-model="description"
            ></textarea>
            <label for="descriptionInput">Description</label>
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
              <span v-else>EDIT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
