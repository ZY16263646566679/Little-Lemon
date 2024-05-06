import { accessStore } from './store/store.js'

const functions = {
    timePrediction: document.getElementById('time-prediction'),
    focusMode: document.getElementById('focus-mode'),
    unbanCopyPaste: document.getElementById('unban-copy-paste'),
    others: document.getElementById('others')
}

// 初始化开关状态
for (const switchName in functions) {
    functions[switchName].checked = await accessStore(switchName)
}

// 监听状态变化
for (const switchName in functions) {
    functions[switchName].addEventListener('change', async (e) => {
        // 发送消息
        try {
            await chrome.runtime.sendMessage({ switchName })
        } catch (error) {
            e.target.checked = false
            console.log('切换失败，', error)
        }
    })
}

let tipsExist = false

// 发射提示
function emitTips() {
    if (tipsExist) return
    tipsExist = true
    const tips = document.createElement('div')
    tips.className = 'tips'
    tips.innerHTML = '<p>小柠正在努力开发中……</p>'
    document.body.appendChild(tips)

    setTimeout(() => {
        document.body.removeChild(tips)
        tipsExist = false
    }, 1400)
}


x.onclick = setting.onclick = emitTips