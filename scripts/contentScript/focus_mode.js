// 注册脚本
function register({ domain, js, css }) {
    if (!location.hostname.startsWith(domain))
        return
    if (css) $(`<style>${ css }</style>`).appendTo('head')
    if (js) $(`<script>${ js }</script>`).appendTo('body')
    console.log(`Script for ${ domain } registered.`)
}

// Express 官网
const ExpressCSS = `
    #blm-banner {
        display: none;
    }

    #logo .express {
        margin-top: 0;
    }

    header {
        height: 60px;
    }

    #home-content {
        margin-top: 80px;
    }

    .page.content {
        margin-top: 80px;
    }
`
register({ domain: 'expressjs.com', css: ExpressCSS })

console.log('focus_mode.js running...')