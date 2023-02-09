import axios from "axios";
import type { OpenAiParams } from "./type";
import useSettings from '@/stores/settings';
import { storeToRefs } from "pinia";
import { getCurrentInstance } from "vue";
const settings = useSettings();
const { apiKey } = storeToRefs(settings);
const proxy = getCurrentInstance();
const $message = proxy?.appContext.config.globalProperties.$message;

const client = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization': "Bearer " + apiKey.value,
    }
})


const http = {
    api: {
        askOpenAI: (params: OpenAiParams, { header = "" }: { header: any }) => {
            if (apiKey.value === "") {
                $message?.error("请先设置apiKey!")
                return
            }
            if (header) {
                client.interceptors.request.use(config => {
                    config.headers = { ...config.headers, ...header }
                    return config;
                })
            }
            return client.post('https://api.openai.com/v1/completions', params)
        }
    }
}

export default http;