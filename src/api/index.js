import request from "./request";
import DefaultRequest from "@/utils/request";
const BASE_URL = "/api";
class API {
  // 用户登录
  Login({ tenantId, username, password, type, key, code }) {
    return request({
      url: BASE_URL+"/blade-auth/oauth/token",
      method: "post",
      headers: {
        "Tenant-Id": tenantId,
        "Captcha-Key": key,
        "Captcha-Code": code,
        Authorization: "Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      },
      data: {
        tenantId,
        username,
        password,
        grant_type: "captcha",
        scope: "all",
        type,
      },
    });
  }

  // 用户登录
  threeLogin(data) {
    let url = "";
    for (let key in data) {
      url += `&${key}=${data[key]}`;
    }
    return request({
      url: `${BASE_URL}/blade-auth/oauth/token?scope=all${url}`,
      method: "post",
      headers: {
        "Tenant-Id": "000000",
        Authorization: "Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      },
    });
  }

  //设备运行损伤情况
  getPerformanceList(deviceName, startTime, endTime, type) {
    return request({
      url: BASE_URL+"/blade-info/testUiPerformance/getPerformanceList",
      method: "get",
      params: {
        deviceName,
        startTime,
        endTime,
        type,
      },
    });
  }

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

  // 获取可用性分析
  getAvList(deviceName, startTime, endTime) {
    return request({
      url: BASE_URL+"/blade-info/testUiAv/getAvList",
      method: "get",
      params: {
        deviceName,
        startTime,
        endTime,
      },
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

  // 获取设备信息  出口压力，入口温度，电流
  getDeviceInfoDet(deviceName) {
    return request({
      url: BASE_URL+"/data",
      method: "get",
      params: {
        orderBy: "Create_Time",
        desc: true,
        dataType: "DeviceData",
        output: "Motor_Icombined,Fan_InletPressure,Fan_Outlet_Temp1",
        pageIndex: 0,
        pageSize: 1,
        deviceName,
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

  getWebPath(params) {
    return request({
      url: BASE_URL+"/webPath",
      method: "get",
      params: params,
    });
  }

  setWebPath(data) {
    return request({
      url: BASE_URL+"/webPath",
      method: "post",
      data,
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

export default new API();
