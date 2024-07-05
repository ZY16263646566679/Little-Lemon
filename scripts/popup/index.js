// runtime api
const { sendMessage } = chrome.runtime

const functions = {
    timePrediction: document.getElementById('time-prediction'),
    focusMode: document.getElementById('focus-mode'),
    unbanCopyPaste: document.getElementById('unban-copy-paste'),
}

// 初始化开关状态
for (const switchName in functions) {
    functions[switchName].checked = await sendMessage({
        type: 'getScriptStatus',
        data: { switchName }
    })
}

// 监听状态变化
for (const switchName in functions) {
    functions[switchName].addEventListener('change', async (e) => {
        // 发送消息
        try {
            await sendMessage({
                type: 'toggleSwitch',
                data: { switchName }
            })
        } catch (error) {
            e.target.checked = false
            console.log('切换失败，', error)
        }
    })
}

update.addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://github.com/ZY16263646566679/Little-Lemon' })
})

setting.addEventListener('click', function () {
    chrome.tabs.create({ url: 'chrome:/extensions/' })
})