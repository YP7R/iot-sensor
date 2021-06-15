let websocket = new WebSocket(`ws://${document.domain}:3000`)

websocket.onopen = function(e){
    let message = {'id':'new_client'}
    websocket.send(JSON.stringify(message))
}

websocket.onmessage = function(event){
    console.log(event)
    sensors = JSON.parse(event.data)
    create_sensors(sensors)   
}

function create_card(sensor_id){
    const card = `
    <div class="col-md-3" id="${sensor_id}">
        <div class="shadow card mb-3 border-light">
            <div class="card-body">
                <h5 class="card-title" id="${sensor_id}_node">Sensor<h5>
                <span id="${sensor_id}_random_value"></span>
            </div>
        </div>
    </div>
    `;
    return card

}

function create_sensors(datas){
    let sensors = document.querySelector("div#sensors")
    // console.log(sensors)
    for(let sensor of datas){
        let sensor_id = `sensor${sensor['node']}`
        let elem = document.querySelector(`div#${sensor_id}`)
        
        if (elem == null){
            let card = create_card(sensor_id)
            sensors.insertAdjacentHTML('beforeend',card)
        }
        sensor_set_values(sensor)
    }
}

function sensor_set_values(sensor){
    let sensor_id = `sensor${sensor['node']}`
    let node = document.querySelector(`h5#${sensor_id}_node`).innerHTML = sensor['node']
    let random_value = document.querySelector(`span#${sensor_id}_random_value`).innerHTML = sensor['random_value']
}