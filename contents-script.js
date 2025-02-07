chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.method) {
        case 'fold':
            fold(request.regex)
            break
        case 'fold-all':
            foldAll()
            break
        case 'open':
            open(request.regex)
            break
        case 'open-all':
            openAll()
            break
    }
    sendResponse()
    return true
})

function getFileHeaders() {
    return Array.from(document.getElementsByClassName("file-header"))
}

function getToggleButton(header) {
    var fileInfo = header.getElementsByClassName("file-info")[0]
    return fileInfo.getElementsByClassName("js-details-target")[0]
}

function isTarget(header, regex, isExpanded) {
    if (regex) {
        var filePath = header.getAttribute("data-path")
        console.log(filePath)
        if (!new RegExp(regex).test(filePath)) {
            return false
        }
    }

    var btn = getToggleButton(header)
    console.log("btn", btn)
    console.log("aria-expanded", btn.getAttribute("aria-expanded"))
    console.log("result", btn.getAttribute("aria-expanded") == isExpanded)
    return btn.getAttribute("aria-expanded") == "" + isExpanded
}

function fold(regex) {
    var headers = getFileHeaders()
    headers
        .filter(header => isTarget(header, regex, true))
        .forEach(header => {
            var btn = getToggleButton(header)
            btn.click()
        })
}

function foldAll() {
    var headers = getFileHeaders()
    headers
        .filter(header => isTarget(header, null, true))
        .forEach(header => {
            var btn = getToggleButton(header)
            console.log(btn)
            btn.click()
        })
}

function open(regex) {
    var headers = getFileHeaders()
    headers
        .filter(header => isTarget(header, regex, false))
        .forEach(header => {
            var btn = getToggleButton(header)
            btn.click()
        })
}

function openAll() {
    var headers = getFileHeaders()
    headers
        .filter(header => isTarget(header, null, false))
        .forEach(header => {
            var btn = getToggleButton(header)
            btn.click()
        })
}