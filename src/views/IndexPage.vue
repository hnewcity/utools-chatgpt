<template>
    <div class="dark:(text-white bg-dark-50) ">
        <el-tabs class="px-2" v-model="activeTab">
            <el-tab-pane label="代码生成" name="first">
                <code-generate></code-generate>
            </el-tab-pane>
            <el-tab-pane label="问答" name="second">
                <ask-question></ask-question>
            </el-tab-pane>
            <el-tab-pane label="工具" name="third">
                <function-index></function-index>
            </el-tab-pane>
            <el-tab-pane label="设置" name="fourth">
                <change-settings></change-settings>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CodeGenerate from '../components/CodeGenerate.vue';
import FunctionIndex from './functions/FunctionIndex.vue';
import AskQuestion from '../components/AskQuestion.vue';
import ChangeSettings from '../components/ChangeSettings.vue';

const activeTab = ref<string>('first');

</script>
<style>
.el-tabs__item {

    @apply dark: text-white;
}

.is-active {

    @apply dark: text-[#409eff];
}
</style>