import moment from 'moment';
export default {
  data () {

  },
  methods: {
    getFormatTime (createdTime) {
      return moment(new Date(createdTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
    },
    getTimeDifference (createdTime) {
      let createdDate = new Date(createdTime * 1000);
      return new Date().getDate() - createdDate.getDate();
    }
  }
}