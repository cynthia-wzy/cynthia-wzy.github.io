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
      return;
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

    // 根據是否能接受苦味篩選
    if (bitterValue === "bitterYes") {
        // 選擇兩種蜂蜜，其中至少一種是有苦味的
        filteredHoneys = honeys.filter(h => h.bitter).slice(0, 1);
        // 再加上一種無苦味的蜂蜜
        filteredHoneys = filteredHoneys.concat(findClosestHoneys(honeys.filter(h => !h.bitter), sweetValue, sourValue).slice(0, 1));
    } else {
        // 沒有苦味的情況下，選擇兩種無苦味的蜂蜜
        filteredHoneys = findClosestHoneys(honeys.filter(h => !h.bitter), sweetValue, sourValue).slice(0, 2);
    }

    console.log("Filtered Honeys:", filteredHoneys);
    
    // 顯示结果
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

function displayResults(honeys) {
    var resultText1 = document.getElementById("resultText1");
    var resultImage1 = document.getElementById("resultImage1");
    var resultText2 = document.getElementById("resultText2");
    var resultImage2 = document.getElementById("resultImage2");

    // 清空先前的結果
    resultText1.textContent = "";
    resultImage1.src = "";
    resultText2.textContent = "";
    resultImage2.src = "";

    if (honeys.length >= 2) {
        // 第一種蜂蜜
        resultText1.textContent = "推薦的蜂蜜: " + honeys[0].name;
        resultImage1.src = filteredHoneys[0].name + ".jpg" // 顯示圖片

        // 第二種蜂蜜
        resultText2.textContent = "推薦的蜂蜜: " + honeys[1].name;
        resultImage2.src = filteredHoneys[1].name + ".jpg"; // 顯示圖片
    } else {
        // 处理蜂蜜数量不足 2 的情况
        alert("找不到符合您喜好的蜂蜜！");
    }
}




// function displayResults(honeys) {
//     // 在这里添加显示结果的代码，可以根据需要展示蜂蜜的名字、图片等信息
//     var resultText = document.getElementById("resultText");
//     var resultImage = document.getElementById("resultImage");

//     // 示例：将结果显示为文字
//     resultText.textContent = "推薦的蜂蜜: " + honeys[0].name + " 和 " + honeys[1].name;
// }


// document.getElementById("resultText").textContent = text;
// document.getElementById("resultImage").src = imageSrc;
// document.getElementById("resultImage").alt = text;


//   function displayResult(text, imageSrc) {
//     document.getElementById("resultText").textContent = text;
//     document.getElementById("resultImage").src = imageSrc;
//     document.getElementById("resultImage").alt = text;
// }