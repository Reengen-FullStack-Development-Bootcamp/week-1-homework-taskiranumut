<script>
export default {
  name: "ShoeCard",
  props: ["shoeInfosApi", "newProduct"],
  emits: ["newProduct"],
  data() {
    return {
      shoeInfo: null,
      activeColor: null,
      selectedSize: null,
      selectedCount: 1,
      selectOptions: [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
        { value: 8, text: 8 },
        { value: 9, text: 9 },
        { value: 10, text: 10 },
      ],
    };
  },
  created() {
    this.shoeInfo = this.shoeInfosApi.shoes.pink;
    this.activeColor = this.shoeInfosApi.shoeColors[0];
    this.selectedSize = this.shoeInfosApi.shoes.pink.sizes[0];
  },
  computed: {
    relativePrice() {
      const newPrice =
        this.shoeInfo.price + (this.selectedSize - this.shoeInfo.sizes[0]) * 3;
      return newPrice;
    },
    // CSS Color Cumputeds
    textColor() {
      return `color-${this.activeColor}`;
    },
    bgColor() {
      return `bg-color-${this.activeColor}`;
    },
    sizeBtnBorder() {
      return `size-btn-border-${this.activeColor}`;
    },
  },
  methods: {
    changeShoeInfos(color) {
      this.activeColor = color;
      this.shoeInfo = this.shoeInfosApi.shoes[color];
      this.selectedSize = this.shoeInfosApi.shoes[color].sizes[0];
    },
    addToCart() {
      // TODO: object emite to App.vue
      const newProduct = {
        color: this.activeColor,
        size: this.selectedSize,
        unitPrice: this.relativePrice,
        count: this.selectedCount,
        image: this.shoeInfo.image,
        title: this.shoeInfo.title,
      };
      // console.log("giden ürün: ", newProduct);
      this.$emit("newProduct", newProduct);
    },
  },
};
</script>

<template>
  <div class="mt-4">
    <b-card
      no-body
      class="px-2 py-4 bg-color shadow cursor"
      style="max-width: 550px; border-radius: 10px;"
    >
      <b-row no-gutters>
        <b-col sm="7" class="d-flex justify-content-center align-items-center">
          <div>
            <b-card-img
              :src="shoeInfo.image"
              alt="Image"
              class="rounded-0 shoe-img "
            ></b-card-img>

            <!-- Shoe color buttons start -->
            <b-row
              class="d-flex justify-content-center align-items-center mt-3"
            >
              <button
                @click="changeShoeInfos(color)"
                v-for="color in shoeInfosApi.shoeColors"
                :key="color"
                class="shoe-color-btn mx-2"
                :class="[
                  `bg-color-${color}`,
                  { 'selected-border': color === activeColor },
                ]"
              ></button>
            </b-row>
            <!-- Shoe color buttons finish -->
          </div>
        </b-col>

        <b-col sm="5">
          <b-card-body class="p-2">
            <b-card-text class="m-0 fs-14" :class="textColor">{{
              shoeInfo.category
            }}</b-card-text>
            <b-card-text class="m-0 line-heigth shoe-title"
              ><strong>{{ shoeInfo.title }}</strong></b-card-text
            >
            <b-card-text class="my-2">
              <span
                v-for="i in shoeInfo.starRate"
                :key="'check' + i"
                class="fa fa-star mr-1"
                :class="textColor"
              ></span>
              <span
                v-for="i in 5 - shoeInfo.starRate"
                :key="i"
                class="fa fa-star unchecked mr-1"
              ></span>
            </b-card-text>
            <b-card-text class="m-1 fs-30-bold" :class="textColor"
              >${{ relativePrice }}</b-card-text
            >
            <b-card-text class="text-justify line-heigth">
              <small>{{ shoeInfo.description }} </small>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>

      <b-row no-gutters class="pl-2 mb-n1">
        <b-card-text class="fs-14" :class="textColor">
          CHOOSE SIZE
        </b-card-text>
      </b-row>
      <!-- Forms start -->
      <b-row no-gutters class="mt-2">
        <!-- Size start -->
        <b-col sm="7" class="px-2">
          <b-form-group class="m-0">
            <b-form-radio
              v-for="(size, index) in shoeInfo.sizes"
              :key="index"
              v-model="selectedSize"
              button
              button-variant="none"
              class="size-btn"
              :class="[sizeBtnBorder, selectedSize === size ? [bgColor] : '']"
              :value="size"
              ><span
                class="size-span"
                :class="[
                  textColor,
                  selectedSize === size ? [bgColor, 'size-color'] : '',
                ]"
                >{{ size }}</span
              ></b-form-radio
            >
          </b-form-group>
        </b-col>
        <!-- Size finish -->

        <!-- Add to cart start -->
        <b-col sm="5" class="px-2">
          <b-row>
            <b-col sm="4" class="pr-0">
              <b-form-select
                class="count-form"
                :class="bgColor"
                v-model="selectedCount"
                :options="selectOptions"
              ></b-form-select>
            </b-col>
            <b-col sm="8" class="pl-0">
              <b-button
                @click="addToCart"
                block
                class="add-to-cart"
                :class="bgColor"
                >Add to cart</b-button
              >
            </b-col>
          </b-row>
        </b-col>
        <!-- Add to cart finish -->
      </b-row>
      <!-- Forms finish -->
    </b-card>
  </div>
</template>

<style scoped>
.cursor {
  cursor: pointer;
}

.bg-color {
  background-color: #f4f4f2;
}

.shoe-img {
  width: 295px;
  height: 200px;
}

.line-heigth {
  line-height: 120%;
}

.fs-14 {
  font-size: 14px;
}

.shoe-title {
  font-size: 22px;
}

.fs-30-bold {
  font-size: 30px;
  font-weight: bold;
}

.unchecked {
  color: rgb(73, 84, 100, 0.4);
}

.count-form {
  border: none;
  border-radius: 2px;
  color: #f4f4f2;
  transition: all 0s;
}

.add-to-cart {
  border: none;
  border-radius: 2px;
  height: 38px;
  margin-left: 2px;
  transition: all 0s;
}

.count-form:focus,
.add-to-cart:focus {
  box-shadow: none;
}

.size-btn {
  border-radius: 2px;
  background-color: #f4f4f2;
  margin-right: 2px;
}

.size-btn-border-pink {
  border: 1px solid #be837f;
}

.size-btn-border-blue {
  border: 1px solid #1e98bc;
}

.size-btn:hover .size-span:hover {
  font-weight: bold;
}

.size-color {
  color: #f4f4f2 !important;
}

.shoe-color-btn {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
}

.selected-border {
  border: 3px solid #495464;
}

/* Blue colors */
.color-blue {
  color: #1e98bc;
}

.bg-color-blue {
  background-color: #1e98bc;
}

/* Pink colors */
.color-pink {
  color: #be837f;
}

.bg-color-pink {
  background-color: #be837f;
}
</style>
