<template>
<header>
  <nav>
    <div class="nav-wrapper">
      <div class="container">
        <router-link to="/" class="brand-logo">Vuthy Todo</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</header>
</template>

<style scoped>
nav{
  background-color: rgb(17, 129, 204);;
  text-transform: uppercase;
  }
nav .brand-logo {
  font-weight: 600;
}
nav li a{
  font-weight: 600;
  font-size: 20px;
}
</style>