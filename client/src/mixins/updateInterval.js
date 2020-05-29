import { UPDATE_INTERVAL } from '../constants';

const updateInterval = {
  data() {
    return {
      interval: null,
    };
  },
  methods: {
    setUpdateInterval(callback) {
      this.interval = setInterval(() => {
        callback(this.$route.params.id);
      }, UPDATE_INTERVAL);
    },
  },
};

export default updateInterval;
