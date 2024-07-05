/**
 * 开关状态存储
 * 
 * 现在暂时无用，已用查询脚本注册状态替换
 */

// 初始化状态
export async function initStore() {
    await chrome.storage.session.set({
        timePrediction: false,
        focusMode: false,
        unbanCopyPaste: false,
        others: false
    })
}

// 获取状态
export async function accessStore(key) {
    const store = await chrome.storage.session.get(key)
    return store[key]
}

// 更新状态
export async function updateStore(key, value) {
    await chrome.storage.session.set({ [key]: value })
}