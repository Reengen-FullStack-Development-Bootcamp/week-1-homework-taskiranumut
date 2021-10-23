<script>
import ShoppingCartItem from "@/components/ShoppingCartItem";

export default {
  name: "ShoppingCartModal",
  props: ["shoppingCartList", "numberOfTotalProduct", "totalPrice"],
  emits: ["showCart", "decreaseCount", "increaseCount", "deleteProduct"],
  components: {
    ShoppingCartItem,
  },
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
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <p class="modal-title mt-3 text-center header-p pb-2 mx-5">
            Shopping Cart
          </p>
          <div v-if="shoppingCartList.length === 0">
            <p class="my-3 text-center">There are no products.</p>
          </div>
          <div v-else class="modal-body align-middle">
            <div class="container-fluid p-3">
              <ShoppingCartItem
                v-for="(product, index) in shoppingCartList"
                :key="index"
                :product="product"
                @deleteProduct="deleteProduct(product)"
                @increaseCount="increaseCount(product)"
                @decreaseCount="decreaseCount(product)"
              />
            </div>
            <div class="pr-3">
              <!-- <p class="text-right m-0">Number of product varieties: 2</p> -->
              <p class="text-right m-0">
                Number of total product: {{ numberOfTotalProduct }}
              </p>
              <p class="text-right m-0">
                <strong>Total price: ${{ totalPrice }}</strong>
              </p>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button
              @click="$emit('showCart', false)"
              type="button"
              class="btn back-btn"
            >
              Back to shopping
            </button>
            <button
              v-if="shoppingCartList.length > 0"
              type="button"
              class="btn complete-btn"
            >
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-p {
  font-size: 26px;
  border-bottom: 2px solid #495464;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: top;
}

.modal-content,
.modal-header {
  background-color: #bbbfca;
}

.back-btn {
  color: #f4f4f2;
  background-color: #495464;
}

.complete-btn {
  color: #f4f4f2;
  background-color: #f05454;
}
</style>
