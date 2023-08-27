var ms = 0;
var timer;
var lap_no = 1;
var container = document.getElementById("mycontainer");

function createRow(cls = "row") {
    var row = document.createElement("div");
    row.setAttribute("class", cls);
    return row;
}

function createCol(cls = "col") {
    var col = document.createElement("div");
    col.setAttribute("class", cls);
    return col;
}

function createTimeLabel() {
    var row = createRow();
    var col = createCol("col-12 mb-5 time-label");
    var label = document.createElement("label");
    label.setAttribute("id", "timer");

    label.innerText = "00:00:00";

    col.appendChild(label);
    row.appendChild(col);
    container.appendChild(row);
}

function createLapBtn() {
    var div = document.createElement("div");
    div.setAttribute("class", "rounded-circle mybtn");
    div.setAttribute("id", "btn1");
    div.innerText = "Lap";
    return div;
}

function createStartBtn() {
    var div = document.createElement("div");
    div.setAttribute("class", "rounded-circle mybtn");
    div.setAttribute("id", "btn2");
    div.setAttribute("onclick", "start()");
    div.innerText = "Start";
    return div;
}

function createBtn() {
    var row = createRow("row mb-4 p-3");
    var col1 = createCol("col-6 d-flex justify-content-center");
    var col2 = createCol("col-6 d-flex justify-content-center");

    col1.appendChild(createLapBtn());
    col2.appendChild(createStartBtn());

    row.appendChild(col1);
    row.appendChild(col2);
    container.appendChild(row);
}

function createContainer() {
    var div_container = document.createElement("div");
    div_container.setAttribute("class", "container d-flex flex-column-reverse");
    div_container.setAttribute("id", "main-container");
    container.appendChild(div_container);
}

function generate() {
    createTimeLabel();
    createBtn();
    createContainer();
}

function changetoLapBtn() {
    var btn = document.getElementById("btn1");
    btn.setAttribute("onclick", "lap()");
    btn.innerText = "Lap";
}

function changetoResetBtn() {
    var btn = document.getElementById("btn1");
    btn.setAttribute("onclick", "reset()");
    btn.innerText = "Reset";
}

function changetoStartBtn() {
    var btn = document.getElementById("btn2");
    btn.setAttribute("onclick", "start()");
    btn.innerText = "Start";
}

function changetoStopBtn() {
    var btn = document.getElementById("btn2");
    btn.setAttribute("onclick", "stop()");
    btn.innerText = "Stop";
}

function lap() {
    var row = createRow();
    var col1, col2;

    if (lap_no === 1) {
        col1 = createCol("col-6 d-flex border-top border-bottom pl-5 py-4");
        col2 = createCol("col-6 d-flex justify-content-end border-top border-bottom pr-5 py-4");
    } else {
        col1 = createCol("col-6 d-flex border-top pl-5 py-4");
        col2 = createCol("col-6 d-flex justify-content-end border-top pr-5 py-4");
    }

    col1.innerText = "Lap " + (lap_no++);
    col2.innerText = calculateTime();

    row.appendChild(col1);
    row.appendChild(col2);

    document.getElementById("main-container").appendChild(row);
}

function reset() {
    while (container.hasChildNodes && container.firstChild != null) {
        container.firstChild.remove();
    }
    lap_no = 1;
    ms = 0;
    generate();
}

function calculateTime() {
    var minute, second, milisecond;

    minute = parseInt(ms / 6000);
    second = parseInt(ms / 100);
    milisecond = parseInt(ms % 100);

    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }
    if (milisecond < 10) { milisecond = "0" + milisecond; }

    return  minute + ":" + second + ":" + milisecond;
}

function startTimer() {
    timer = setInterval(function () {
        document.getElementById("timer").innerText = calculateTime();
        ms++;
    }, 10);
}

function start() {
    startTimer();
    changetoLapBtn();
    changetoStopBtn();
}

function stop() {
    clearTimeout(timer);
    changetoResetBtn();
    changetoStartBtn();
}