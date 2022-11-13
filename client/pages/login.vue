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

          <form @submit.prevent class="mt-5">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="name@example.com"
                required
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
              />
              <label for="passwordInput">Password</label>
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-primary">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
