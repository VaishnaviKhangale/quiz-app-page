var questionsEl = document.getElementById('questions');
var scoreEl = document.getElementById('score');
var btnEl = document.getElementById('btn');
var data;

var xhhtp = new XMLHttpRequest();

xhhtp.onreadystatechange = (e) => {
    let result = e.target;
   // console.log(result)

    if (result.readyState === 4 && result.status ===200){
        data = JSON.parse(result.response)
        renderQuestions();
        
    }
    else{
        //console.warn("Something went wrong, try again!")
    }
}
xhhtp.open("Get","https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",true)
xhhtp.send()



function renderQuestions(){
    let output = '';
    
    console.log(data)
    for (let i = 0; i < data.length; i++) {
       output += ` 
       <div class="questions">
                <h2>Q${i+1}. ${data[i].question} </h2>
                <label><input type="radio" id="${1}" name="id${i}">${data[i].options[0]}</label>
                <label><input type="radio" id="${2}" name="id${i}">${data[i].options[1]}</label>
                <label><input type="radio" id="${3}" name="id${i}">${data[i].options[2]}</label>
                <label><input type="radio" id="${4}" name="id${i}">${data[i].options[3]}</label>
            </div>
       `        
    }

    questionsEl.innerHTML = output;
}


btnEl.addEventListener('click', () =>{
    let score =0;

    for (let i = 0; i < 5; i++) {
        let selector = `input[name="id${i}"]:checked`
        let selectedOption = +document.querySelector(selector).id
        if (selectedOption == data[i].answer) {
            score++;
        }
    }

    scoreEl.innerHTML =`${score} / 5`
})