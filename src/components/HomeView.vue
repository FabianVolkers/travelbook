<template>
    <div>
        <h1>Welcome Back, {{ username }}!</h1>
        </div>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    username: String
  }
}
</script>