<script setup lang="ts">
// Ensure user is logged in
if (!localStorage.getItem("access_token")) {
  navigateTo("/login");
}

const logout = () => {
  localStorage.clear();

  navigateTo("/login");
};
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <NuxtLink to="/" class="btn btn-dark">
        <font-awesome-icon icon="fa-solid fa-house" />
      </NuxtLink>

      <NuxtLink class="navbar-brand" to="/">Objects</NuxtLink>

      <button @click="logout" type="button" class="btn btn-dark">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
      </button>
    </div>
  </nav>

  <!-- Variable content -->
  <slot />
</template>
