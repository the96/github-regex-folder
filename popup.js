function fold() {
    var regex = getRegex()
    saveRegex(regex)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                method: 'fold',
                regex
            },
            (response) => {
                console.log(response)
                return true
            }
        )
    })
}

function foldAll() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                method: 'fold-all',
            },
            (response) => {
                console.log(response)
                return true
            }
        )
    })
}

function open() {
    var regex = getRegex()
    saveRegex(regex)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                method: 'open',
                regex
            },
            (response) => {
                console.log(response)
                return true
            }
        )
    })
}

function openAll() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                method: 'open-all',
            },
            (response) => {
                console.log(response)
                return true
            }
        )
    })
}

function getDataKeyAsync(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var key = new RegExp("https://github.com/([A-Za-z0-9-_]+/[A-Za-z0-9-_]+)").exec(tabs[0].url)[0]
        callback(key)
    })
}

function loadData() {
    getDataKeyAsync((key) => {
        chrome.storage.local.get([key], function (obj) {
            const data = obj[key].trim()
            if (data.length > 0) {
                document.getElementById("regex").value = data
                return
            }
        })
    })
}

function saveRegex(regex) {
    getDataKeyAsync((key) => {
        chrome.storage.local.set({ [key]: regex }, function () {
            console.log('Value is set to ' + regex)
        })
    })
}

function getRegex() {
    return document.getElementById("regex").value
}

loadData()

document.getElementById('fold').addEventListener('click', fold)
document.getElementById('fold-all').addEventListener('click', foldAll)
document.getElementById('open').addEventListener('click', open)
document.getElementById('open-all').addEventListener('click', openAll)