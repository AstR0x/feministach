const updateLoading = {
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
  },
};

export default updateLoading;
