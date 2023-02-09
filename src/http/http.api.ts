import axios from "axios";
import type { OpenAiParams } from "./type";

const client = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization': "Bearer " + apiKey.value,
    }
})


const http = {
    api: {
        askOpenAI: (params: OpenAiParams, { header = "" }: { header: any }) => {
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