function start(){
    var button1 = document.getElementById("recHoney");
    button1.addEventListener("click", calculateHoneyResult, false);

    var button2= document.getElementById("recDrink");
    button2.addEventListener("click", calculateDrinkResult, false);
}

function calculateHoneyResult() {
    var sweetValue = document.getElementById("sweetness").value;
    var sourValue = document.getElementById("sourness").value;
    var bitterOption = document.querySelector('input[name="bitter"]:checked');

    if (bitterOption) {
        var bitterValue = bitterOption.value;
    } else {
      // 如果沒有選擇苦味的選項，提醒用戶選擇
      alert("請選擇是否想帶有苦味～");
    }
  

    // 蜂蜜的屬性
    var honeys = [
        { name: "荔枝蜜", sweetness: 3, sourness: 2, bitter: false },
        { name: "荔龍蜜", sweetness: 5, sourness: 2, bitter: false },
        { name: "龍眼蜜", sweetness: 4, sourness: 1, bitter: false },
        { name: "森林蜜", sweetness: 2, sourness: 3, bitter: false },
        { name: "紅淡蜜", sweetness: 1, sourness: 5, bitter: false },
        { name: "蜜梅酵素", sweetness: 4, sourness: 2, bitter: false },
        { name: "鴨腳木蜜", sweetness: 2, sourness: 4, bitter: true }
    ];

    var filteredHoneys;

    if (bitterValue === "bitterYes") {
        // 如果用户选择想要苦味，则找到甜度、酸度越近的两种蜂蜜，其中至少一种是带有苦味的
        filteredHoneys = findClosestHoneys(honeys.filter(h => h.bitter), sweetValue, sourValue);
    } else {
        // 如果用户选择不想要苦味，则去除有苦味的蜂蜜，然后找到甜度、酸度越近的两种蜂蜜
        filteredHoneys = findClosestHoneys(honeys.filter(h => !h.bitter), sweetValue, sourValue);
    }

    // 根据用户选择的甜度和酸度，过滤蜂蜜
    filteredHoneys = filterByUserPreference(filteredHoneys, sweetValue, sourValue);

    // 显示结果
    displayResults(filteredHoneys);
}

function findClosestHoneys(honeys, targetSweetness, targetSourness) {
    // 使用歐基里得距離計算最接近的蜂蜜
    return honeys.sort((a, b) => {
        var distanceA = Math.sqrt(Math.pow((a.sweetness - targetSweetness), 2) + Math.pow((a.sourness - targetSourness), 2));
        var distanceB = Math.sqrt(Math.pow((b.sweetness - targetSweetness), 2) + Math.pow((b.sourness - targetSourness), 2));
        return distanceA - distanceB;
    }).slice(0, 2); // 取前2個最接近的蜂蜜
}

function filterByUserPreference(honeys, userSweetness, userSourness) {
    // 如果用户选择的甜度>=酸度，就要推荐甜度>=酸度的；如果用户选择的甜度<=酸度，就要推荐甜度甜度<=酸度
    return honeys.filter(honey => {
        if (userSweetness >= userSourness) {
            return honey.sweetness >= honey.sourness;
        } else {
            return honey.sweetness <= honey.sourness;
        }
    });
}

function displayResults(honeys) {
    // 在这里添加显示结果的代码，可以根据需要展示蜂蜜的名字、图片等信息
    var resultText = document.getElementById("resultText");
    var resultImage = document.getElementById("resultImage");

    // 示例：将结果显示为文字
    resultText.textContent = "推薦的蜂蜜: " + honeys[0].name + " 和 " + honeys[1].name;
}


// document.getElementById("resultText").textContent = text;
// document.getElementById("resultImage").src = imageSrc;
// document.getElementById("resultImage").alt = text;

//     if (bitterOption) {
//         var bitterValue = bitterOption.value; // 獲取苦味的值

//         if (bitterValue === "bitterYes") {
//         BitterHoney(honeyScore);
//         } else {
//         NoBitterHoney(honeyScore);
//         }
//     } else {
//       // 如果沒有選擇苦味的選項，提醒用戶選擇
//       alert("請選擇是否想帶有苦味～");
//     }
//   }


//   function displayResult(text, imageSrc) {
//     document.getElementById("resultText").textContent = text;
//     document.getElementById("resultImage").src = imageSrc;
//     document.getElementById("resultImage").alt = text;
// }


// function BitterHoney(score){
//     switch(score) {
//         case 4: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case 3: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case 2: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case 1: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case 0:  
//             var randomNumber = Math.random();

//             if (randomNumber < 0.5) {
//                 displayResult("文字A", "A.jpg");
//             } else {
//                 displayResult("文字B", "B.jpg");
//             }
//             break;
//         case -1: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case -2: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case -3: 
//             displayResult("文字A", "A.jpg");
//             break;
//         case -4: 
//             displayResult("文字A", "A.jpg");
//             break;

//     }
// }


// function NoBitterHoney(score){
    
// }

// function calculateDrinkResult() {

// }