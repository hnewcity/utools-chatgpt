<template>
    <div>
        <div class="flex items-center">
            <div class="mr-4 text-right w-20">模型选择:</div>
            <el-select v-model="model" placeholder="Select" size="large">
                <el-option v-for="item in models" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-4 text-right w-20">apiKey:</div>
            <div class="flex mr-4 w-80">
                <el-input v-model="apiKey" placeholder="请输入apiKey" />
            </div>
            <el-button type="primary" @click="saveAPIKey()">保存</el-button>
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-4 text-right w-20">上下文:</div>
            <div class="w-80">
                <el-switch v-model="contextMode" />
            </div>
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-4 text-right w-20">maxTokens:</div>
            <div class="w-80">
                <el-input-number v-model="maxToken" :min="10" :max="1024"></el-input-number>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';
import useSettings from '@/stores/settings'
import { storeToRefs } from 'pinia';

interface Model {
    label: string;
    value: string;
}
const proxy = getCurrentInstance();
const $message = proxy?.appContext.config.globalProperties.$message;
const settings = useSettings();
const { model, maxToken, contextMode, apiKey } = storeToRefs(settings);
const models = ref<Model[]>([
    { label: 'davinci', value: 'davinci' },
    { label: 'text-davinci-002', value: 'text-davinci-002' },
    { label: 'text-davinci-003', value: 'text-davinci-003' }
]);

const saveAPIKey = () => {
    if (apiKey.value === "") {
        $message?.error("apiKey不能为空！");
        return
    }
    $message?.success("保存成功！");
}

</script>
