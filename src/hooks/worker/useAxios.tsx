import useAxios, { configure } from './useAxiosCore'
import { instance, plainInstance as plainAxios, CancelToken, isCancel } from 'utils/axios'

configure({ axios: instance })

const useAxiosInstance = (config: any, options: any = {}) => useAxios(config, options)

export type { AxiosError, AxiosResponse } from 'axios'
export { useAxiosInstance as useAxios, instance, plainAxios, CancelToken, isCancel }
