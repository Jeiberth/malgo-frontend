<!-- App.vue -->
<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>

  body {
    margin: 0;
    background-color: #f8f5f0;
    /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  }

  .main-content {
    padding-top: 60px; /* To give space under the floating navbar */
    max-width: 2000px;
    margin: 0 auto;
  }

</style>

  <!--       
Not Logged in
- Tenant Application
- Log in Page
- Register page (Link send to the tenant accepted)

When already Logged In
admin
 - Tenant applications
 - Bills (Update Button)(Only unpaid bills)
 - Contadores( CreateBill(Fo-agua/luz/gas) )
 - Payments (With a verify button)
 - Contratos (Terminar Contrato, Extender Contrato,  Crear Contrato)

Tenant
- Profile (Su info, contrato info)
- Bills (With selects y Payment module to pay)
- Payments (Table to see their previous payments) -->