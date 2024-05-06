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