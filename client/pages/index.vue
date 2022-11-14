<script setup lang="ts">
// Ensure user is logged in
if (!localStorage.getItem("access_token")) {
  navigateTo("/login");
}

const config = useRuntimeConfig();

// Get all available objects
const { data: objects, refresh } = await useFetch<
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

const errorMessage = ref<string | null>(null);

// Handle object deletion
const handleDelete = async (id: string) => {
  try {
    // Send object deletion request
    await $fetch<{
      success: boolean;
      access_token: string;
    }>(`/api/delete`, {
      method: "POST",
      body: {
        id,
      },
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      baseURL: config.public.apiBase,
    });

    // Refresh page
    refresh();
  } catch (error) {
    // Display error message in case of error
    errorMessage.value = "Something went wrong.";
  }
};
</script>

<template>
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

              <div class="d-flex gap-2">
                <button type="button" class="btn btn-light">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </button>

                <button
                  @click="handleDelete(object._id)"
                  type="button"
                  class="btn btn-light text-danger"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
