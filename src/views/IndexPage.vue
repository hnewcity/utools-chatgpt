<template>
    <div class="dark:(text-white bg-dark-50) ">
        <el-tabs class="px-2" v-model="activeTab">
            <el-tab-pane label="问答" name="first">
                <ask-question></ask-question>
            </el-tab-pane>
            <el-tab-pane label="工具" name="second">
                <function-index></function-index>
            </el-tab-pane>
            <el-tab-pane label="设置" name="third">
                <change-settings></change-settings>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FunctionIndex from './functions/FunctionIndex.vue';
import AskQuestion from './AskQuestion.vue';
import ChangeSettings from './ChangeSettings.vue';

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