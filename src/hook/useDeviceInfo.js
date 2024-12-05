import API from "@/api";
import { ref ,onMounted} from 'vue';

export function useDeviceInfo() {
  const deviceInfoList =  ref([])
  const deviceInfoOp =  ref([])
  const getDeviceInfo = () => {
    API.getData({dataType:'DeviceInfo'}).then((res) => {
        deviceInfoList.value=res.data
        deviceInfoOp.value=res.data.map((item) => ({
          label: item.Device_Name,
          value: item.Device_Name,
        }))
    });
  };
  onMounted(()=>{
    getDeviceInfo()
  })

  return {
    deviceInfoOp,
    deviceInfoList,
    getDeviceInfo
  };
}
