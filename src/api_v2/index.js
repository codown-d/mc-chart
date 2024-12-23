import request from "../api/request";
const BASE_URL = "/api/v2";
class APIV2 {
  // 获取数据点位
  getParamQuery(deviceName, params, startTime, endTime) {
    return request({
      url: BASE_URL+"/blade-info/data/getParamQuery",
      method: "get",
      params: {
        deviceName,
        params,
        startTime,
        endTime,
      },
    });
  }
  // 获取数据点位
  getEquTotal(deviceName, params, startTime, endTime) {
    return request({
      url: BASE_URL+"/blade-info/data/getEquTotal",
      method: "get",
      params: {
        deviceName,
        params,
        startTime,
        endTime,
      },
    });
  }
  // 获取数据点位
  getParams() {
    return request({
      url: BASE_URL+"/blade-info/data/getParams",
      method: "get",
    });
  }
  // 获取设备信息
  getEquByName(deviceName) {
    return request({
      url: BASE_URL+"/blade-info/info/getEquByName",
      method: "get",
      params: {
        deviceName,
      },
    });
  }
  // 获取设备信息列表
  getDeviceInfo(data) {
    return request({
      url: BASE_URL+"/aph/data",
      method: "get",
      params: {
        dataType: "DeviceInfo",
        ...data,
      },
    });
  }

  getData(params) {
    return request({
      url: BASE_URL+"/aph/data",
      method: "get",
      params: params,
    });
  }

  getDataAgg(data) {
    return request({
      url: BASE_URL+"/aph/dataAgg",
      method: "post",
      data,
    });
  }

  getAlarmCount(curTime) {
    return request({
      url: BASE_URL+"/stat/alarmCount",
      method: "get",
      params: {
        datetime: curTime,
      },
    });
  }
  getAlarmCountC(params) {
    return request({
      url: BASE_URL+"/stat/alarmCount",
      method: "get",
      params: params,
    });
  }
}

export default new APIV2();
