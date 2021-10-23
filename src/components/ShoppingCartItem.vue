<script>
export default {
  name: "ShoppingCartItem",
  props: ["product"],
  emits: ["decreaseCount", "increaseCount", "deleteProduct"],
  methods: {
    decreaseCount(product) {
      this.$emit("decreaseCount", product);
    },
    increaseCount(product) {
      this.$emit("increaseCount", product);
    },
    deleteProduct(product) {
      this.$emit("deleteProduct", product);
    },
  },
};
</script>

<template>
  <div
    class="row px-2 py-1 mb-4 shoe-row d-flex justify-content-center align-items-center shadow"
  >
    <div class="col-sm-2">
      <img :src="product.image" class="shoe-img" alt="shoe-image" />
    </div>
    <div class="col-sm-3 pr-0">
      <span>{{ product.title }}</span>
    </div>
    <div class="col-sm-1 p-0">
      <p class="m-0">Size: {{ product.size }}</p>
    </div>
    <div class="col-sm-3 pl-4 pr-0">
      <p class="m-0">
        <small>Unit price: ${{ product.unitPrice }}</small>
      </p>
      <p class="m-0">Total Price: ${{ product.unitPrice * product.count }}</p>
    </div>
    <div class="col-sm-2">
      <!-- Actions start -->
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col p-0 d-flex justify-content-center align-items-center ">
          <button @click="decreaseCount(product)" class="btn dec-btn p-0">
            -
          </button>
        </div>
        <div
          class="col p-0 d-flex justify-content-center align-items-center count-span border"
        >
          <span class="">{{ product.count }}</span>
        </div>
        <div class="col p-0 d-flex justify-content-center align-items-center ">
          <button @click="increaseCount(product)" class="btn inc-btn p-0">
            +
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-1 d-flex justify-content-center align-items-center">
      <button @click="deleteProduct(product)" class="btn delete-btn">
        <i class="fas fa-trash-alt fa-lg"></i>
      </button>
    </div>
    <!-- Actions finish -->
  </div>
</template>

<style scoped>
.shoe-row {
  background-color: #f4f4f2;
  border-radius: 5px;
}

.shoe-img {
  width: 100px;
}

.count-span {
  height: 30px;
  border-radius: 5px;
}

.dec-btn {
  width: 30px;
  height: 30px;
  background-color: #495464;
  color: #f4f4f2;
  font-weight: bold;
}

.inc-btn {
  width: 30px;
  height: 30px;
  background-color: #495464;
  color: #f4f4f2;
  font-weight: bold;
}

.delete-btn {
  color: #f05454;
}
</style>
