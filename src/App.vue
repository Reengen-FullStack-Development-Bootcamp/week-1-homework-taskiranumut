<script>
import AppHeader from "@/components/AppHeader.vue";
import ShoeCard from "@/components/ShoeCard.vue";
import ShoppingCartModal from "@/components/ShoppingCartModal";

export default {
  name: "App",
  components: {
    AppHeader,
    ShoeCard,
    ShoppingCartModal,
  },
  data() {
    return {
      shoeInfosApi: {
        shoeColors: ["pink", "blue"],
        shoes: {
          pink: {
            image: "https://i.ibb.co/b5xN5y2/nike-pink-5.jpg",
            category: "WOMEN'S RUNNING SHOE",
            title: "NIKE EPIC REACT FLYKNIT",
            starRate: 4,
            price: 150,
            description:
              "The Nike Epic React Flyknit takes a step up from its predecessor with smooth performance and a bold look. Nike React technology defies the odds by being both soft, responsive.",
            sizes: [37, 38, 39, 40, 41, 42],
            color: "pink",
          },
          blue: {
            image: "https://i.ibb.co/10VcxDB/nike-blue-5.jpg",
            category: "MEN'S RUNNING SHOE",
            title: "NIKE EPIC REACT FLYKNIT",
            starRate: 3,
            price: 130,
            description:
              "The Nike Epic React Flyknit takes a step up from its predecessor with smooth performance and a bold look. Nike React technology defies the odds by being both soft, responsive.",
            sizes: [39, 40, 41, 42, 43, 44],
            color: "blue",
          },
        },
      },
      showCartModal: false,
      shoppingCartList: [],
      counter: 0,
    };
  },
  computed: {
    numberOfTotalProduct() {
      let totalProduct = 0;
      this.shoppingCartList.forEach((item) => {
        totalProduct += item.count;
      });
      return totalProduct;
    },
    totalPrice() {
      let totalPrice = 0;
      this.shoppingCartList.forEach((item) => {
        totalPrice += item.count * item.unitPrice;
      });
      return totalPrice;
    },
  },
  methods: {
    showCart(status) {
      this.showCartModal = status;
    },
    handleNewProduct(newProduct) {
      this.toast("b-toaster-bottom-left", true);
      if (this.shoppingCartList.length !== 0) {
        if (this.isThereTheProductInCartList(newProduct))
          this.increaseProductCountInCartList(newProduct);
        else this.addProductToCartList(newProduct);
      } else this.addProductToCartList(newProduct);
    },
    addProductToCartList(product) {
      this.shoppingCartList.push(product);
    },
    isThereTheProductInCartList(product) {
      return this.shoppingCartList.some(
        (item) => item.size === product.size && item.color === product.color
      );
    },
    increaseProductCountInCartList(product) {
      this.shoppingCartList.forEach((item) => {
        if (item.color === product.color && item.size === product.size)
          item.count += product.count;
      });
    },
    increaseProductCountOneByOne(product) {
      this.shoppingCartList.forEach((item) => {
        if (item.color === product.color && item.size === product.size)
          item.count++;
      });
    },
    decreaseProductCountInCartList(product) {
      this.shoppingCartList.forEach((item) => {
        if (item.color === product.color && item.size === product.size)
          if (item.count > 1) item.count--;
          else this.deleteProductFromCartList(product);
      });
    },
    deleteProductFromCartList(product) {
      this.shoppingCartList = this.shoppingCartList.filter(
        (item) => item !== product
      );
    },
    toast(toaster, append = false) {
      this.counter++;
      this.$bvToast.toast("Product added to shopping cart.", {
        title: null,
        toaster: toaster,
        solid: false,
        appendToast: append,
        noHoverPause: true,
      });
    },
  },
};
</script>

<template>
  <div>
    <AppHeader
      @showCart="showCart"
      :numberOfTotalProduct="numberOfTotalProduct"
    />
    <div class="container cnt-margin p-0">
      <b-card-group class="d-flex justify-content-around">
        <ShoeCard
          v-for="i in 4"
          :key="i"
          :shoeInfosApi="shoeInfosApi"
          @newProduct="handleNewProduct"
        />
      </b-card-group>
    </div>
    <ShoppingCartModal
      @click.stop="propagation"
      @showCart="showCart"
      @deleteProduct="deleteProductFromCartList"
      @increaseCount="increaseProductCountOneByOne"
      @decreaseCount="decreaseProductCountInCartList"
      v-if="showCartModal"
      :shoppingCartList="shoppingCartList"
      :totalPrice="totalPrice"
      :numberOfTotalProduct="numberOfTotalProduct"
    />
  </div>
</template>
