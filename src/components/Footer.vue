<template>
  <footer class="footer">
    Информация об авторе:
    <div class="footer__wrap">
      <span class="name">Name: Bogdan</span>

      <span class="">
        GitHub:
        <a href="https://github.com/bboddya">https://github.com/bboddya</a>
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({}),
};
</script>

<style lang="scss">
.footer {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  padding: 30px;
  text-align: center;

  .footer__wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
