<script setup lang="ts">
// Ensure user is logged in
if (!localStorage.getItem("access_token")) {
  navigateTo("/login");
}

const config = useRuntimeConfig();

// Get all available objects
const { data: objects } = await useFetch<
  {
    _id: string;
    name: string;
    description: string;
  }[]
>(`/api`, {
  method: "GET",
  headers: {
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
  baseURL: config.public.apiBase,
});
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <NuxtLink to="/" class="btn btn-dark">
        <font-awesome-icon icon="fa-solid fa-house" />
      </NuxtLink>

      <NuxtLink class="navbar-brand" to="/">Objects</NuxtLink>

      <button type="button" class="btn btn-dark">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
      </button>
    </div>
  </nav>

  <!-- Object list -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 py-3">
        <div class="d-grid gap-3">
          <NuxtLink to="/create" class="btn btn-primary">
            <font-awesome-icon icon="fa-solid fa-plus" />
            <span class="ms-3">Add Object</span>
          </NuxtLink>

          <div v-for="object in objects" :key="object._id" class="card">
            <h5 class="card-header">{{ object.name }}</h5>
            <div class="card-body">
              <p class="card-text">{{ object.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
