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

// 学习通
$(function () {
    $('body').removeAttr('onselectstart')
    $('html').css('user-select', 'unset')

    try { // catch UEditor doesn't exist error!
        Object.entries(UE.instants).forEach(item => {
            item[1].options.disablePasteImage = false
            item[1].removeListener('beforepaste', editorPaste)
        })
    } catch (error) {
        console.log(error)
    }
})

// iWrite
setTimeout(() => {
    function myEditor_paste(o, html) {
        return true
    }

    UE.getEditor('editor').addListener('beforepaste', myEditor_paste)
}, 300)

console.log('unban-copy-paste.js is running...')