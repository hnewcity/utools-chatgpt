<template>
    <div class="flex mb-4 gap-x-2 items-center">
        <div class="flex gap-x-2">
            <div v-for="func, index in functions" :key="func.title">
                <el-check-tag :checked="activeTab == index" @click="activeTab = index">{{ func.title }}</el-check-tag>
            </div>
        </div>
        <el-button :loading="loadingAnswer" :disabled="lockQuestion" type="success" @click="generate">生成</el-button>
    </div>
    <div v-if="answerText !== ''">
        {{ answerText }}
    </div>
    <div class="flex flex-col w-full items-center justify-center" v-if="loadingAnswer">
        <el-button type="primary" text loading></el-button>
        <div class="text-[#a8abb2]">此过程可能稍长， 请耐心等待...</div>
    </div>
</template>
<script lang="ts" setup>
import { OpenAiParams } from '@/http/type';
import { ElCheckTag, ElButton } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ref, getCurrentInstance } from 'vue';
import http from '@/http/http.api';
import useSettings from '@/stores/settings';

const proxy = getCurrentInstance();
const $message = proxy?.appContext.config.globalProperties.$message;
const settings = useSettings();
const { apiKey } = storeToRefs(settings);
interface MyFucntion {
    title: string;
    content: string;
}
const functions = ref<MyFucntion[]>([
    {
        title: "年终总结",
        content: "请帮我生成一份年终总结。"
    },
    {
        title: "入党申请书",
        content: "请帮我生成一份入党申请书。"
    },
    {
        title: "自我评价",
        content: "请帮我生成一份自我评价。"
    },
    {
        title: "思想汇报",
        content: "请帮我生成一份思想汇报。"
    },
    {
        title: "简历模板",
        content: "请帮我生成一份简历模板。"
    }
]);
const activeTab = ref<number>(0);
const answerText = ref<string>("");
const lockQuestion = ref<boolean>(false);
const loadingAnswer = ref<boolean>(false);
const generate = () => {
    if (apiKey.value === "") {
        $message?.error("请先设置api_key!");
        return;
    }
    answerText.value = "";
    let params = new OpenAiParams({ prompt: functions.value[activeTab.value].content });
    loadingAnswer.value = true;
    lockQuestion.value = true;
    http.api.askOpenAI(params, { header: { 'Authorization': "Bearer " + apiKey.value, } })
        .then(result => {
            answerText.value = result.data.choices[0].text;
            loadingAnswer.value = false;
            lockQuestion.value = false;
        }).catch(_ => {
            answerText.value = "There is something wrong...";
            loadingAnswer.value = false;
            lockQuestion.value = false;
        });
}

</script>