<template>
    <div class="flex flex-col pb-4 items-center">
        <el-input class="mb-4" :disabled="lockQuestion" v-model="searchText" placeholder="请输入你的问题， 按回车提问" autofocus
            @change="searchOnGpt()"></el-input>
        <div v-for="c in communicationList" :key="c.id" class="divide-y-2 w-full">
            <div class="flex flex-col">
                <div
                    class="flex bg-gray-200 h-20 w-full p-4 box-border overflow-y-scroll justify-between items-center filter drop-shadow-sm dark:bg-dark-100">
                    <div class="flex items-center">
                        <div>
                            <img class="h-6 mr-4 w-6 dark:(filter brightness-251) " src="../assets/user.png" />
                        </div>
                        <div class="flex">
                            <div class="mr-4">
                                YOU:
                            </div>
                            <div>
                                {{ c.question }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-button type="danger" rounded @click="deleteCommunication(c.id)">x</el-button>
                    </div>
                </div>
                <div class="flex h-20 w-full p-4 box-border dark:bg-dark-200">
                    <img class="h-6 mr-4 w-6" src="../../public/logo.png" />
                    <div class="flex w-full items justify-between" v-if="c.answer == ''">
                        <div class="mr-4">GPT: Thinking...</div>
                        <el-button type="primary" text loading></el-button>
                    </div>
                    <div class="flex h-20 overflow-y-scroll" v-if="c.answer != ''">
                        <div class="mr-4">GPT: </div>
                        <div v-html="c.answer"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-xs text-center w-full text-[#a8abb2]" v-if="communicationList.length == 0">
            问点什么吧~
        </div>
        <div class="mt-4" v-else>
            <el-link download="conversion.txt" type="primary" :href="downloadUrl" @click="saveConversion">
                <div class="mr-1">保存对话到本地</div>
                <el-icon>
                    <Download />
                </el-icon>
            </el-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia';
import { OpenAiParams } from '@/http/type';
import http from '@/http/http.api';
import useSettings from '@/stores/settings';

interface Communication {
    question: string;
    answer: string;
    id: number;
    ts?: string;
}

const proxy = getCurrentInstance();
const $message = proxy?.appContext.config.globalProperties.$message;
const settings = useSettings();
const { apiKey } = storeToRefs(settings);
const index = ref<number>(0);
const lockQuestion = ref<boolean>(false);

// 问题列表
const communicationList = ref<Communication[]>([]);
// 更新问题列表
const updateList = (id: number, answerText: string) => {
    let newList = [...communicationList.value]
    for (let i = 0; i < newList.length; i++) {
        if (newList[i].id === id) {
            newList[i].answer = answerText;
            break;
        }
    }
    communicationList.value = newList;
}
// 删除某个问题
const deleteCommunication = (id: number) => {
    communicationList.value = communicationList.value.filter(item => item.id !== id);
}

const downloadUrl = ref<string>("")
// 保存对话到本地
const saveConversion = () => {
    const bolb = new Blob([JSON.stringify(communicationList.value)], { type: 'application/json' });
    downloadUrl.value = URL.createObjectURL(bolb);
    $message?.success("下载成功！")
}

// 搜索
const searchText = ref<string>('');
const clearSearcchText = () => {
    searchText.value = '';
}
const searchOnGpt = () => {
    if (apiKey.value === "") {
        $message?.error("请先设置api_key!");
        return
    }
    if (lockQuestion.value) {
        $message?.info("GPT is thinking, please wait...");
        return
    }
    const id = index.value;
    lockQuestion.value = true;
    let answerText = "";
    communicationList.value = [{ "question": searchText.value, "answer": answerText, "id": id, ts: new Date().toLocaleString() }, ...communicationList.value];
    index.value++;
    let params = new OpenAiParams({ prompt: searchText.value });
    http.api.askOpenAI(params, { header: { 'Authorization': "Bearer " + apiKey.value, } })
        .then(result => {
            answerText = result.data.choices[0].text
            updateList(id, answerText)
            lockQuestion.value = false;
        }).catch(_ => {
            answerText = "There is something wrong..."
            updateList(id, answerText)
            lockQuestion.value = false;
        });
    clearSearcchText();
}
</script>
