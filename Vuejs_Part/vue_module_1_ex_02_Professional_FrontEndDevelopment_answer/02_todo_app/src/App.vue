<template>
<div>
  <Header />
  <div class="container">
    <router-view/>
  </div>
</div>
</template>

<script>
import Header from './components/layout/Header';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.js';
export default {
  name: 'app',
  components:{
    Header
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
  * {
    font-family: 'Poppins', sans-serif;
  }

</style>
