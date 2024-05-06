// 显示预测阅读时间
function showReadingTime() {
    const article = $('article')

    if (!article.length) return

    const text = article.text()
    const words = text.match(/\S+/g)
    const wordCount = words ? words.length : 0
    const readingTime = Math.round(wordCount / 80)

    const badge = $(`
        <p class="color-secondary-text type--caption">
            小柠提醒您：⏱️ 本篇内容大约要阅读 ${readingTime} 分钟！
        </p>
    `)

    const heading = article.find('h1')
    const date = article.find('time').parent();

    (date.length ? date : heading).after(badge)
}

showReadingTime()
console.log('reading-time.js is running...')