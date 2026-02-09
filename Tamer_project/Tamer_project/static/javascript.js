
const plot = document.getElementById("viewer") 
const slider = document.getElementById("myRange")
let fullX = [];
let fullY = [];
let windowSize = 200;   // visible points
let speed = 0.001;        // ms between frames
let currentIndex = 0;
let timer = null;
let viewer = false



function initPlot() {
    viewer = true
    Plotly.newPlot(plot, [{
        x: fullX,
        y: fullY,
        mode: "lines",
        line: { width: 2 }
    }], {
        title: "Dynamic Signal Viewer",
        xaxis: { title: "Time", fixedrange: true },
        yaxis: { title: "Amplitude", fixedrange: true }
    });

    

}



function startAnimation() {
    if (timer){
        clearInterval(timer)
    }
    timer = setInterval(() => {
        let x = []
        let y = []
        
        for(let i = 0 + currentIndex ; i < windowSize + currentIndex ; i++){
            x.push(fullX[i])
            y.push(fullY[i])
        }

        Plotly.update(plot , {
            x: [x],
            y: [y]
        })
        
        if (currentIndex >= fullY.length){
            currentIndex = 0
        }

        currentIndex = currentIndex + 1


    } ,speed )
    
}

function stopAnimation(){
   clearInterval(timer)
   console.log(timer)

    
}


function uploadAndPlot() {
    const file = document.getElementById("file_input").files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch("/load-signal/", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        fullX = data.time;
        fullY = data.signal;
        currentIndex = 0;
        if (timer){
            clearInterval(timer)
        }
        if (!viewer){
        initPlot();
        }
        startAnimation()
        
    });
}
