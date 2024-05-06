import { initStore, accessStore, updateStore } from './scripts/store/store.js'

// 初始化
initStore()

// 内容脚本
const scripts = {
    timePrediction: {
        run: async () => {
            await chrome.scripting.registerContentScripts([{
                id: 'timePrediction',
                js: ['/scripts/contentScript/time-prediction.js'],
                matches: ['<all_urls>']
            }])
        },
        cancel: async () => {
            await chrome.scripting.unregisterContentScripts({ ids: ['timePrediction'] })
        }
    },
    focusMode: {
        run: async () => {
            await chrome.scripting.registerContentScripts([{
                id: 'focusMode',
                css: ['/styles/focus-mode.css'],
                matches: ['<all_urls>']
            }])
        },
        cancel: async () => {
            await chrome.scripting.unregisterContentScripts({ ids: ['focusMode'] })
        }
    },
    unbanCopyPaste: {
        run: async () => {
            await chrome.scripting.registerContentScripts([{
                id: 'unbanCopyPaste',
                js: ['/scripts/contentScript/unban-copy-paste.js'],
                matches: ['<all_urls>'],
                world: 'MAIN',
            }])
        },
        cancel: async () => {
            await chrome.scripting.unregisterContentScripts({ ids: ['unbanCopyPaste'] })
        }
    }
}

// 接受消息
chrome.runtime.onMessage.addListener(async (message) => {
    if (!(message.switchName in scripts))
        throw '功能尚未实现！'

    const currentState = await accessStore(message.switchName)

    if (currentState) // 注销内容脚本
        await scripts[message.switchName].cancel()
    else // 注册内容脚本
        await scripts[message.switchName].run()

    // 更新开关状态
    await updateStore(message.switchName, !currentState)
})