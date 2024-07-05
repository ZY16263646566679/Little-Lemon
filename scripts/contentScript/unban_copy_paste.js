// Unban Copy
addEventListener('copy', function (e) {
    e.stopPropagation()
}, true)

// Unban Paste
addEventListener('paste', function (e) {
    e.stopPropagation()
}, true)

// Unban Cut
addEventListener('cut', function (e) {
    e.stopPropagation()
}, true)

// 检查UEditor是否存在
function UEExists() {
    return typeof UE !== 'undefined'
}

// 学习通
$(function () {
    $('body').removeAttr('onselectstart')
    $('html').css('user-select', 'unset')

    if (!UEExists()) return

    try {
        Object.entries(UE.instants).forEach(item => {
            item[1].options.disablePasteImage = false
            item[1].removeListener('beforepaste', editorPaste)
        })
    } catch (e) {
        // ...
    }
})

// iWrite
setTimeout(() => {
    if (!UEExists()) return

    function myEditor_paste(o, html) {
        return true
    }

    try {
        UE.getEditor('editor').addListener('beforepaste', myEditor_paste)
    } catch (e) {
        console.log('发生错误：', e);
    }
}, 300)

console.log('unban_copy_paste.js is running...')