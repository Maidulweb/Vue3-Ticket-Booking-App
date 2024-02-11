const app = Vue.createApp({
  data() {
    return {
      identity: {
        sold: { text: "Sold", color: "red" },
        available: { text: "Available", color: "rgb(217 215 215)" },
        booked: { text: "Booked", color: "gray" },
        selected: { text: "Selected", color: "green" },
      },
      seats: [
        { name: "A1", type: "available", price: "500" },
        { name: "A2", type: "available", price: "500" },
        { name: "A3", type: "available", price: "500" },
        { name: "A4", type: "sold", price: "500" },
        { name: "B1", type: "available", price: "500" },
        { name: "B2", type: "available", price: "500" },
        { name: "B3", type: "available", price: "500" },
        { name: "B4", type: "available", price: "500" },
        { name: "C1", type: "booked", price: "500" },
        { name: "C2", type: "available", price: "500" },
        { name: "C3", type: "available", price: "500" },
        { name: "C4", type: "available", price: "500" },
        { name: "D1", type: "available", price: "500" },
        { name: "D2", type: "available", price: "500" },
        { name: "D3", type: "available", price: "500" },
        { name: "D4", type: "available", price: "500" },
        { name: "E1", type: "available", price: "500" },
        { name: "E2", type: "available", price: "500" },
        { name: "E3", type: "available", price: "500" },
        { name: "E4", type: "available", price: "500" },
        { name: "F1", type: "available", price: "500" },
        { name: "F2", type: "available", price: "500" },
        { name: "F3", type: "available", price: "500" },
        { name: "F4", type: "available", price: "500" },
      ],
      appliedCoupon: null,
      couponCode: "",
      coupon: [
        {
          code: "123",
          amount: 100,
        },
        {
          code: "456",
          amount: 200,
        },
      ],
      name: "",
      mobile: "",
      confirmed: false,
    };
  },
  computed: {
    allSelectedSeats() {
      let allSelectedSeatsResult = this.seats.filter(
        (item) => item.type === "selected"
      );
      return allSelectedSeatsResult;
    },
    totalCost() {
      let total = 0;
      this.allSelectedSeats.forEach((item) => {
        total += Math.floor(item.price);
      });
      if (this.appliedCoupon != null) {
        total -= Math.floor(this.appliedCoupon.amount);
      }
      return total;
    },
  },
  methods: {
    handleClickSeat(i) {
      let selectClickSeat = this.seats[i];
      if (selectClickSeat.type === "booked") {
        alert("This seat is Booked");
        return;
      }
      if (selectClickSeat.type === "sold") {
        alert("This seat is Sold");
        return;
      }
      if (
        selectClickSeat.type === "available" &&
        this.allSelectedSeats.length > 2
      ) {
        alert("You can't select more then 3 seats");
        return;
      }
      selectClickSeat.type =
        selectClickSeat.type === "selected" ? "available" : "selected";
    },
    submit() {
      if (!this.name || !this.mobile) {
        alert("Please enter your name and mobile");
        return;
      }
      this.confirmed = true;
    },
    reset() {
      this.confirmed = false;
      this.name = "";
      this.mobile = "";
      this.appliedCoupon = null;
      this.seats.forEach((item) => {
        if (item.type === "selected") {
          item.type = "sold";
        }
      });
    },
  },
  watch: {
    couponCode(value) {
      if (value.length === 3) {
        let searchResult = this.coupon.filter((item) => item.code === value);
        if (searchResult.length === 1) {
          this.appliedCoupon = searchResult[0];
          this.couponCode = "";
          console.log(this.appliedCoupon.amount);
        } else {
          alert("Coupon code is not valid!!!");
        }
      }
    },
  },
});
app.mount("#app");
