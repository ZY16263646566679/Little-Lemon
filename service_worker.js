// scripting api
const {
    registerContentScripts,
    unregisterContentScripts,
    getRegisteredContentScripts
} = chrome.scripting

// runtime api
const { onMessage } = chrome.runtime

/**
 * 检查是否已注册指定内容脚本
 * @param {string | string[]} scriptIds 内容脚本id
 */
async function hasRegistered(scriptIds) {
    if (typeof scriptIds === 'string')
        scriptIds = [scriptIds]
    const scripts = await getRegisteredContentScripts({ ids: scriptIds })
    return scripts.length > 0
}

// 内容脚本
const scripts = {
    timePrediction: {
        run: async () => {
            await registerContentScripts([{
                id: 'timePrediction',
                js: ['/scripts/contentScript/time_prediction.js'],
                matches: ['<all_urls>'],
                world: 'MAIN'
            }])
        },
        cancel: async () => {
            await unregisterContentScripts({ ids: ['timePrediction'] })
        }
    },
    focusMode: {
        run: async () => {
            await registerContentScripts([{
                id: 'focusMode',
                js: ['/scripts/contentScript/focus_mode.js'],
                matches: ['<all_urls>'],
                world: 'MAIN',
            }])
        },
        cancel: async () => {
            await unregisterContentScripts({ ids: ['focusMode'] })
        }
    },
    unbanCopyPaste: {
        run: async () => {
            await registerContentScripts([{
                id: 'unbanCopyPaste',
                js: ['/scripts/contentScript/unban_copy_paste.js'],
                matches: ['<all_urls>'],
                world: 'MAIN',
            }])
        },
        cancel: async () => {
            await unregisterContentScripts({ ids: ['unbanCopyPaste'] })
        }
    }
}

// 开关切换
async function ToggleSwitch(switchName) {
    if (!(switchName in scripts))
        throw '功能尚未实现！'

    if (await hasRegistered(switchName))
        // 注销内容脚本
        await scripts[switchName].cancel()
    else
        // 注册内容脚本
        await scripts[switchName].run()
}

// 获取脚本注册状态
async function getScriptStatus(switchName) {
    return await hasRegistered(switchName)
}

// 消息响应器
onMessage.addListener((message, sender, sendResponse) => {
    const { type, data } = message

    switch (type) {
        case 'toggleSwitch':
            ToggleSwitch(data.switchName)
            break
        case 'getScriptStatus':
            getScriptStatus(data.switchName)
                .then(sendResponse)
            break
        default:
            console.log('未知消息类型：', type)
            break
    }

    return true // 表示异步调用 sendResponse
})