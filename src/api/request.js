import _ from 'lodash'
import request from '@/utils/request'
/**
 * @(#)2022/4/25.
 * 简配版  request
 * @author 景杨
 */

// filterEmpty开启后，函数默认会过滤无效值，如果有特殊的字段需要保留，则传入handle函数 并且返回true
function filterEmptyConty(data) {
    try {
        for (const key in data) {
            if (data[key] instanceof Object) {
                if (Object.keys(data[key]).length <= 0) return
                filterEmptyConty(data[key])
            } else if (data[key] instanceof Array) {
                data[key].map(item => {
                    filterEmptyConty(item)
                })
            } else {
                if (!data[key] && data[key] !== 0) {
                    delete data[key]
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}


// beforeRequest	请求开始前，data的处理函数，在映射完模型后执行	function(requestData){return requestData}
// afterRequest	请求完成后，response的处理函数，在映射完模型后执行	function(response){return response}
// afterRequest 7-14 新增支持字符串
// {boolean} filterEmpty	是否过滤request的data中的无效值(如undefined, null, '', []等)	boolean	true
// callback	接口请求成功后的回调函数
// 会返回接口经过responseModel映射的的response
// 未经过模型映射的originalResponse
// 请求的requestData，该函数是请求的最后一个步骤	function(response,originalResponse,requestData)
// isCache 不会变更的数据 是否缓存

function Requsest({
    url,
    data,
    method = 'get',
    Tmethod = '',
    callback,
    headers,
    filterEmpty = true,
    beforeRequest = null,
    afterRequest = null,
    isCache = false, // 是否缓存
    ...props
}) {
    return new Promise(async (resolve, reject) => {
        const params = data

        if (filterEmpty) {
            filterEmptyConty(params)
        }

        if (typeof beforeRequest === 'function') {
            beforeRequest(params)
        }

        const RequsestData = {
            url: '/api'+url,
            method: method,
            headers,
            [(Tmethod || method) === 'get' ? 'params' : 'data']: params,
            ...props
        }

        // const isCacheName = window.btoa(JSON.stringify(`${url}${JSON.stringify(data) || ''}`))

        // // //  是否缓存
        // if (isCache) {
        //     console.time()
        //     const relust = await db.friends.get(isCacheName)
        //     if (relust) {
        //         resolve(relust)
        //         console.timeEnd()
        //         db.close()
        //         return
        //     }
        // }

        request(RequsestData)
            .then(res => {
                let relust = res
                if (typeof afterRequest === 'function') {
                    const data = afterRequest(res)
                    if (data) {
                        relust = data
                    }
                }

                // 支持字符串
                if (typeof afterRequest === 'string') {
                    relust = _.get(res, afterRequest, {})
                }

                if (typeof callback === 'function') {
                    callback(relust)
                }
                if (isCache) {
                    // requestIdleCallback(() => {
                    //     db.friends.add({
                    //         id: isCacheName,
                    //         data: relust
                    //     });
                    //     db.close()
                    // })
                }
                resolve(relust)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default Requsest
