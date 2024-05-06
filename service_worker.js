import { initStore, accessStore, updateStore } from './scripts/store/store.js'

// 初始化
initStore()

// scripting api
const scripting = chrome.scripting
const register = scripting.registerContentScripts
const unregister = scripting.unregisterContentScripts
const getRegistered = scripting.getRegisteredContentScripts

// runtime api
const runtime = chrome.runtime
const onMessage = runtime.onMessage

/**
 * 检查是否已注册指定内容脚本
 * @param {string | string[]} scriptIds 内容脚本id
 */
async function hasRegistered(scriptIds) {
    if (typeof scriptIds === 'string')
        scriptIds = [scriptIds]
    const scripts = await getRegistered({ ids: scriptIds })
    return scripts.length > 0
}

// 内容脚本
const scripts = {
    timePrediction: {
        run: async () => {
            await register([{
                id: 'timePrediction',
                js: ['/scripts/contentScript/time-prediction.js'],
                matches: ['<all_urls>'],
                world: 'MAIN'
            }])
        },
        cancel: async () => {
            await unregister({ ids: ['timePrediction'] })
        }
    },
    focusMode: {
        run: async () => {
            await register([{
                id: 'focusMode',
                css: ['/styles/focus-mode.css'],
                matches: ['<all_urls>']
            }])
        },
        cancel: async () => {
            await unregister({ ids: ['focusMode'] })
        }
    },
    unbanCopyPaste: {
        run: async () => {
            await register([{
                id: 'unbanCopyPaste',
                js: ['/scripts/contentScript/unban-copy-paste.js'],
                matches: ['<all_urls>'],
                world: 'MAIN',
                // runAt: 'document_start'
            }])
        },
        cancel: async () => {
            await unregister({ ids: ['unbanCopyPaste'] })
        }
    }
}

// 接受消息
onMessage.addListener(async (message) => {
    if (!(message.switchName in scripts))
        throw '功能尚未实现！'

    const currentState = await accessStore(message.switchName)

    if (currentState) {
        // 注销内容脚本
        if (await hasRegistered(message.switchName))
            await scripts[message.switchName].cancel()
    } else {
        // 注册内容脚本
        if (!await hasRegistered(message.switchName))
            await scripts[message.switchName].run()
    }

    // 更新开关状态
    await updateStore(message.switchName, !currentState)
})