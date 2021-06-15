let websocket = new WebSocket(`ws://${document.domain}:3000`)

websocket.onopen = function(e){
    let message = {'id':'new_client'}
    websocket.send(JSON.stringify(message))
}

websocket.onmessage = function(event){
    sensors = JSON.parse(event.data)
}