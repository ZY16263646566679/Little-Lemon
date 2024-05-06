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

// Unban Select
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

console.log('unban_copy_paste.js is running...')