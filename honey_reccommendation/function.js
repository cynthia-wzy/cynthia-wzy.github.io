function start(){
    var button = document.getElementById("cal");
    button.addEventListener("click", calculateResult, false);
}

function calculateResult() {
    // 獲取拉桿的值
    var sweetValue = document.getElementById("sweetness").value;
    var sourValue = document.getElementById("sourness").value;
    var honeyScore = sourValue - sweetValue

    // 獲取苦味的選項
    var bitterOption = document.querySelector('input[name="bitter"]:checked');

    if (bitterOption) {
        var bitterValue = bitterOption.value; // 獲取苦味的值

        if (bitterValue === "bitterYes") {
        BitterHoney(honeyScore);
        } else {
        NoBitterHoney(honeyScore);
        }
    } else {
      // 如果沒有選擇苦味的選項，提醒用戶選擇
      alert("請選擇是否想帶有苦味～");
    }
  }


  function displayResult(text, imageSrc) {
    document.getElementById("resultText").textContent = text;
    document.getElementById("resultImage").src = imageSrc;
    document.getElementById("resultImage").alt = text;
}


function BitterHoney(score){
    switch(score) {
        case 4: 
            displayResult("文字A", "A.jpg");
            break;
        case 3: 
            displayResult("文字A", "A.jpg");
            break;
        case 2: 
            displayResult("文字A", "A.jpg");
            break;
        case 1: 
            
            break;
        case 0:  
            var randomNumber = Math.random();

            if (randomNumber < 0.5) {
                displayResult("文字A", "A.jpg");
            } else {
                displayResult("文字B", "B.jpg");
            }
            break;
        case -1: 
            displayResult("文字A", "A.jpg");
            break;
        case -2: 
            displayResult("文字A", "A.jpg");
            break;
        case -3: 
            displayResult("文字A", "A.jpg");
            break;
        case -4: 
            displayResult("文字A", "A.jpg");
            break;

    }
}


function NoBitterHoney(score){
    
}