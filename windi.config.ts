//windi.config.js
export default {
    preflight: false,
    prefixer: false,
    darkMode: "media",
    important: true,
    extract: {
        // 忽略部分文件夹
        exclude: ["node_modules", ".git", "dist"],
    },
};
