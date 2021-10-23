<script>
export default {
  name: "AppHeader",
  props: ["numberOfTotalProduct"],
  emit: ["showCart"],
};
</script>

<template>
  <div class="container-fluid shadow header-bg p-4 fixed-top">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6 d-flex justify-content-center align-items-center ">
        <h1 class="text-center font-color-light fs-30 m-0">
          Umut Store
        </h1>
      </div>
      <div class="col-sm-3">
        <!-- Shopping cart start -->
        <div class="d-flex justify-content-center align-items-center ">
          <button
            @click="$emit('showCart', true)"
            class="btn position-relative"
          >
            <i class="fas fa-shopping-cart fa-3x font-color-light"></i>
            <div
              v-if="numberOfTotalProduct > 0"
              class="quantity font-color-light d-flex justify-content-center align-items-center"
            >
              <!-- totalQuantity start-->
              <span>{{ numberOfTotalProduct }}</span>
              <!-- totalQuantity finish-->
            </div>
          </button>
        </div>
        <!-- Shopping cart finish -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-bg {
  background-color: #495464;
}

.font-color-light {
  color: #f4f4f2;
}

.fs-30 {
  font-size: 54px;
}

.quantity {
  height: 32px;
  width: 32px;
  background: #f05454;
  border: 2px solid #f4f4f2;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
}

.btn:focus {
  box-shadow: none;
}

.btn:hover i {
  color: #e8e8e8;
  transition: all 0.2s;
}

.btn:hover .quantity {
  color: #e8e8e8;
  border: 2px solid #e8e8e8;
  background-color: #dd4747;
  transition: all 0.2s;
}
</style>
