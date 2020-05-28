<template>
  <button class="ls-button lead-light--text bold cursor-pointer">
    {{ label }}
  </button>
</template>

<script type="text/javascript">
export default {
  name: "Button",

  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.ls-button {
  font-family: 'Nunito', sans-serif;
  width: 100%;
  font-size: 14px;
  border: 1px solid #D7DEE3;
  border-radius: 4px;
  min-height: 40px;
  background-color: #fff;
  outline: none;
  transition: background 0.3s ease-in-out;
  padding: 0px;
}
.ls-button:active {
  background-color: #D7DEE3;
}
</style>