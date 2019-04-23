import mapView from '../../shared/map-view/map-view.component.vue';

export default {
  name: 'dashboardPage',
  components: {
    mapView
  },
  data() {
    return {
      activeLink: null,
      addressList: null,
    };
  },
  mounted() {
    this.activeLink = this.$route.path;
    this.$store.dispatch('GET_ADDRESS_LIST').then(addressList => {
      this.addressList = addressList;
    });
  },
  watch: {
    $route(newVal) {
      this.activeLink = newVal.path;
    }
  }
};
