import dayjs from "dayjs";

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      formatDate(value, format = "YYYY-MM-DD HH:mm:ss") {
        // if (!value) return '';
        if (!value) return dayjs().format(format);
        return dayjs(value).format(format);
      },
    };
  },
};
