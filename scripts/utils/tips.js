let tipsExist = false

// 发射提示
export function emitTips() {
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
