import { defineStore } from 'pinia';
import { ref } from 'vue';

const useSettings = defineStore("settings", () => {
    const model = ref<string>("text-davinci-003");
    const maxToken = ref<number>(1024);
    const contextMode = ref<boolean>(false);
    const apiKey = ref<string>("");
    return { model, maxToken, contextMode, apiKey };
}, {
    persist: {
        enabled: true
    }
});

export default useSettings;