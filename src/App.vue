<template>
  <Suspense>
    <RouterView></RouterView>
  </Suspense>
</template>

<script setup>

</script>

<style>
:root {
  --main-color: rgb(243, 39, 90);
  --main-blue:rgb(96, 149, 248);
}

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>
