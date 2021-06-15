let websocket = new WebSocket(`ws://${document.domain}:3000`)

websocket.onopen = function (e) {
    let message = { 'id': 'new_client' }
    websocket.send(JSON.stringify(message))
}

websocket.onmessage = function (event) {
    sensors = JSON.parse(event.data)
    create_sensors(sensors)
}

function create_card(sensor_controller_id) {
    const card = `
    <div class="col-md-3" id="${sensor_controller_id}">
    <div class="shadow card mb-3 border-light">
      <div class="card-body">
        <h5 class="card-title">Sensor
          <span id="${sensor_controller_id}_sensor"></span>
          from 
          RaspBerry PI-<span id="${sensor_controller_id}_controller"></span>
        </h5>
        <h6 class="card-subtitle text-muted"><span id="${sensor_controller_id}_location"></span></h6>
        <p class="card-text"></p>
        <ul class="list-group list-group-flush font-italic">
          <li class="list-group-item">
          <div class="progress">
          <div class="progress-bar" id=${sensor_controller_id}_battery role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>          
        </li>
          <li class="list-group-item">
            Humidity : <span id="${sensor_controller_id}_humidity"></span>
          </li>
          <li id="${sensor_controller_id}_elem_temperature" class="list-group-item">
            Temperature : <span id="${sensor_controller_id}_temperature"><span>
          </li>
          <li class="list-group-item">
            Luminance : <span id="${sensor_controller_id}_luminance"></span>
          </li>
          <li class="list-group-item">
            Motion : <span id="${sensor_controller_id}_motion"></span>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last update : <span id="${sensor_controller_id}_updateTime"></span></small>
      </div>
    </div>
  </div>
    `;
    return card

}

function create_sensors(datas) {
    let sensors = document.querySelector("div#sensors")
    // console.log(sensors)
    for (let sensor of datas) {
        let sensor_controller_id = `sensor${sensor['sensor']}_controller${sensor['controller']}`
        let elem = document.querySelector(`div#${sensor_controller_id}`)

        if (elem == null) {
            let card = create_card(sensor_controller_id)
            sensors.insertAdjacentHTML('beforeend', card)
        }
        sensor_set_values(sensor)
    }
}

function sensor_set_values(sensor) {
    let sensor_controller_id = `sensor${sensor['sensor']}_controller${sensor['controller']}`
    let sensor_ = document.querySelector(`span#${sensor_controller_id}_sensor`).innerHTML = sensor['sensor']
    let controller = document.querySelector(`span#${sensor_controller_id}_controller`).innerHTML = sensor['controller']
    let humidity = document.querySelector(`span#${sensor_controller_id}_humidity`).innerHTML = sensor['humidity']
    let location = document.querySelector(`span#${sensor_controller_id}_location`).innerHTML = sensor['location']
    let luminance = document.querySelector(`span#${sensor_controller_id}_luminance`).innerHTML = sensor['luminance']
    let motion = document.querySelector(`span#${sensor_controller_id}_motion`).innerHTML = sensor['motion']
    let temperature = document.querySelector(`span#${sensor_controller_id}_temperature`).innerHTML = sensor['temperature']
    let updateTime = document.querySelector(`span#${sensor_controller_id}_updateTime`).innerHTML = sensor['updateTime']
    let battery = document.querySelector(`div#${sensor_controller_id}_battery`).style = `width:${sensor['battery']}%`
    let battery_ = document.querySelector(`div#${sensor_controller_id}_battery`).setAttribute("aria-valuenow",sensor['battery'])
    let battery__ = document.querySelector(`div#${sensor_controller_id}_battery`).innerHTML = `${sensor['battery']} %`

}