<template>
  <div class="pagination">
    <div class="btnContainer">
      <button @click='firstPage'>首页</button>
      <button @click='lastPage'>上一页</button>
      <button v-for='number in numbers' :class='{btnSelected:(number === currentPage)}' @click='changePage(number)'>{{number}}</button>
      <button @click='nextPage'>下一页</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['currentPage'],
  data() {
    return {
      numbers: [1, 2, 3, 4, 5],
      currentPage: this.currentPage
    }
  },
  methods: {
    changePage(number) {
      this.currentPage = number
      if (this.currentPage !== this.numbers[2] && this.currentPage > 2) {
        this.numbers = [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2]
      } else if (this.currentPage <= 2) {
        this.numbers = [1, 2, 3, 4, 5]
      }
      this.$emit('pageNumber', this.currentPage)
    },
    firstPage() {
      this.currentPage = 1
      this.changePage(this.currentPage)
    },
    lastPage() {
      if (this.currentPage !== 1) {
        this.currentPage -= 1
        this.changePage(this.currentPage)
      }
    },
    nextPage() {
      this.currentPage += 1
      this.changePage(this.currentPage)
    }
  }
}

</script>
<style scoped>
.pagination {
  background: white;
  padding: 10px 20px;
}

.btnContainer {
  display: flex;
  justify-content: center;
}

button {
  background: white;
  padding: 10px;
  border: 1px solid #f0f0f0;
  width: 70px;
  display: block;
  margin-right: 5px;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
}

button:focus {
  outline: none;
}

.btnSelected {
  background: #333;
  color: white;
}

</style>
