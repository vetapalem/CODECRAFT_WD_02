console.log('sizecode..')



window.tracker;
// let initial_Time = 0
const [timmer, buttons, lapElement] = [document.getElementsByClassName('timmer_counter')[0], document.getElementsByTagName('button'), document.getElementsByTagName('ol')[0]];


const db = {

    initial_Time: 0,
    allow_gate: [true, false],

    time: ["00", "00", "00"],
    lap_data: [],


}


function counter() {
    db.initial_Time++;
    db.time[0] = Math.floor(db.initial_Time / 3600).toString().padStart(2, '0');
    db.time[1] = Math.floor((db.initial_Time % 3600) / 60).toString().padStart(2, '0');
    db.time[2] = Math.floor((db.initial_Time % 60)).toString().padStart(2, '0');
    timmer.innerHTML = db.time.join(":");
    console.log(db.initial_Time, db.time);



};

function start() {
    console.log('start');
    tracker = setInterval(counter, 1000);
    
};

function stop() {

   


    const stoperINNER = db.time.join(":");

    console.log('stop');
    clearInterval(tracker);
    console.log('after_tracker')
    timmer.innerHTML = stoperINNER;
    console.log(db.time)
    return db.time = ["00", "00", "00"];
};

function reset() {
    db.initial_Time = 0;
    timmer.innerHTML = '00:00:00';
    lapElement.innerHTML = null
    db.lap_data.splice(0, db.lap_data.length)

}

function object_creating_li() {


    const liElement = document.createElement('li');
    const lapdataHtml = timmer.innerHTML;
    db.lap_data.push(lapdataHtml)
    if (db.lap_data.length == 1) {

        liElement.innerHTML = `&#9201 ${lapdataHtml} - ${lapdataHtml}`;
       

    }
    else {
        liElement.innerHTML = `&#9201 ${lapdataHtml} - ${lapDeavation()} `;
        

        // pending code here direct lap devation call
        console.log('lapdevation .. call')
        lapDeavation()

    }



    lapElement.prepend(liElement);



}

function lap() {
    console.log(db.lap_data)
    object_creating_li()
}


function lapDeavation() {
    const [a, b] = db.lap_data.slice(db.lap_data.length - 2,);
    // console.log(a, b)
    const [[ax, ay, az], [bx, by, bz]] = [a.split(':').map(Number), b.split(':').map(Number)];
    const [t1, t2] = [(ax * 3600) + (ay * 60) + az, (bx * 3600) + (by * 60) + bz];
    let difference = Math.abs(t2 - t1);
    const [H, M, S] = [Math.floor(difference / 3600), Math.floor(difference / 60), Math.floor(difference % 60)];

    let devation_string = `${H.toString().padStart(2, "0")}:${M.toString().padStart(2, '0')}:${S.toString().padStart(2, '0')}`;

    console.log(H, M, S, devation_string)
    return devation_string


}



const obj = document.getElementsByTagName('button')[0];
console.log(obj)
const stop_code = {
    button_element: document.getElementsByTagName('button')[0]
    , stop: [{
        elment:
            `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-stop-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5" />
                        </svg>
`,
        title: 'stop',

        stop_fun: stop,
    }],
    start: [{
        elment: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play"
                            viewBox="0 0 16 16">
                            <path
                                d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                        </svg>

        `,
        title: 'start',

        start_fun: start,
    }],




}

document.querySelector('button').addEventListener('click',
    () => buttonChange(stop_code.button_element)
);

function buttonChange(reciver) {
    // window.alert('click')
    console.log(obj)
    console.log('ki')
    if (reciver.title === 'start') {
        const [{ elment, title, stop_fun }] = stop_code.stop;
        // console.log(elment, title,)
        reciver.title = title
        reciver.innerHTML = elment
        reciver.onclick = stop_fun;
    }
    else if (reciver.title === 'stop') {
        const [{ elment, title, start_fun }] = stop_code.start;
        reciver.title = title
        reciver.innerHTML = elment
        reciver.onclick = start_fun

    }
    else {
        console.log('command fail..')
    }

}




window.addEventListener('resize', () => {
    const [w, h] = [innerWidth * 0.95, innerHeight];
    const [root_container, root_child,] = [
        document.getElementsByClassName('root-page')[0],
        document.getElementsByClassName('main')[0],
    ]
    root_container.style.gridTemplateColumns = `${w * 0.1}px ${w * 0.8}px ${w * 0.1}px`;

    root_child.style.gridTemplateRows = `${h * 0.3}px ${h * 0.1}px ${h * 0.3}px`;




})








