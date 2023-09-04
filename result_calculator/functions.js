var previousHighlightedCell;

var currentYearTW = new Date().getFullYear() - 1911;
var startYear = currentYearTW - 110;
var endYear = currentYearTW - 23;

// 生成選項加到下拉式選單
var selectElement = document.getElementById("birthYear");
for (var year = endYear; year >= startYear; year--) {
    var option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectElement.appendChild(option);
}

// 計算BMI與體脂率 //
function start1(){
    var button = document.getElementById("cal1");
    button.addEventListener("click", calculate1, false);
}

function calculate1(){
    var selectedYear = parseFloat(document.getElementById("birthYear").value); 
    var age = currentYearTW - selectedYear;

    var genderNum = document.getElementById("gender").value  === "male" ? 1 : 0;
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var bodyfat = parseFloat(document.getElementById("bodyfat").value);
    
    // 判斷為成年人還是銀髮族，銀髮族不用填心肺適能第四格
    if (age > 64) {
        var num4Input = document.getElementById("num4");
        num4Input.value = "";
        num4Input.disabled = true;

        // 移除之前亮起來的格子樣式
        if (previousHighlightedCell) {
            previousHighlightedCell.style.backgroundColor = "";
            previousHighlightedCell.classList.remove("highlighted-cell");
        }
    } else {
        var num4Input = document.getElementById("num4");
        num4Input.disabled = false;
    }

    // 判斷使用者輸入是否合法
    if (isNaN(height) || isNaN(weight) || isNaN(bodyfat)) {
        alert("請確保身高、體重與全身體脂肪重都已輸入數字。");
        return;
    }

    if (!validationPart1(height, weight, bodyfat)) {
        return; // Stop execution if validation fails
    }

    // 計算BMI
    var result1 = (weight / (height/100)**2).toFixed(2);
    
    // 判斷bmi評等
    var bmiRating; 
    if (result1 < 18.5 && result1 >= 0) {
        bmiRating = "過瘦";
    } else if (result1 < 24) {
        bmiRating = "正常";
    } else if (result1 < 27) {
        bmiRating = "過重";
    } else if (result1 < 30) {
        bmiRating = "輕度肥胖";
    } else if (result1 < 35) {
        bmiRating = "中度肥胖";
    } else {
        bmiRating = "重度肥胖";
    }
    
    // 結果寫入畫面
    var result1_1 = document.getElementById("result1-1");
    result1_1.textContent = result1.toString() + " (" + bmiRating + ")";
    

    // 計算體脂率
    var result2 = ((bodyfat / weight) * 100).toFixed(2);

    // 判斷體脂率評等 https://w.tw.mawebcenters.com/TeamIPC/%E5%B8%B8%E6%A8%A1%E6%AA%A2%E6%B8%AC.html
    var bodyfatRating;

    switch (true) {
        // 1. 男性
        case genderNum == 1 && age <= 29:
            if (result2 < 3) {
                bodyfatRating = "過低";
            } else if (result2 <= 13) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 18.0 && result2 >= 13.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 23.0 && result2 >= 18.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 28.0 && result2 >= 23.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        case genderNum == 1 && age <= 39  && age >= 30:
            if (result2 < 3) {
                bodyfatRating = "過低";
            } else if (result2 <= 14) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 19.0 && result2 >= 14.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 24.0 && result2 >= 19.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 29.0 && result2 >= 24.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        case genderNum == 1 && age <= 49  && age >= 40:
            if (result2 < 3) {
                bodyfatRating = "過低";
            } else if (result2 <= 15) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 20.0 && result2 >= 15.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 25.0 && result2 >= 20.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 30.0 && result2 >= 25.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        case genderNum == 1 && age >= 50:
            if (result2 < 3) {
                bodyfatRating = "過低";
            } else if (result2 <= 16) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 21.0 && result2 >= 16.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 26.0 && result2 >= 21.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 31.0 && result2 >= 26.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        // 2. 女性
        case genderNum == 0 && age <= 29:
            if (result2 < 12) {
                bodyfatRating = "過低";
            } else if (result2 <= 18) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 23.0 && result2 >= 18.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 28.0 && result2 >= 23.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 33.0 && result2 >= 28.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        case genderNum == 0 && age <= 39  && age >= 30:
            if (result2 < 12) {
                bodyfatRating = "過低";
            } else if (result2 <= 19) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 24.0 && result2 >= 19.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 29.0 && result2 >= 24.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 34.0 && result2 >= 29.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        case genderNum == 0 && age <= 49  && age >= 40:
            if (result2 < 12) {
                bodyfatRating = "過低";
            } else if (result2 <= 20) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 25.0 && result2 >= 20.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 30.0 && result2 >= 25.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 35.0 && result2 >= 30.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;

        case genderNum == 0 && age >= 50:
            if (result2 < 12) {
                bodyfatRating = "過低";
            } else if (result2 <= 21) {
                bodyfatRating = "良好";                        
            } else if (result2 <= 26.0 && result2 >= 21.1) {
                bodyfatRating = "很好";
            } else if (result2 <= 31.0 && result2 >= 26.1) {
                bodyfatRating = "普通";
            } else if (result2 <= 36.0 && result2 >= 31.1) {
                bodyfatRating = "過多";
            } else {
                bodyfatRating = "肥胖";
            }
            break;
    }

        // 結果寫入畫面
    var result1_2 = document.getElementById("result1-2");
    result1_2.textContent = result2.toString() + "%" + " (" + bodyfatRating + ")";
}

// 計算最大攝氧量與心肺耐力評等 //
function start2(){
    var button = document.getElementById("cal2");
    button.addEventListener("click", calculate2, false);
}

function calculate2(){
    var selectedYear = parseFloat(document.getElementById("birthYear").value); 
    var age = currentYearTW - selectedYear;

    var genderNum = document.getElementById("gender").value  === "male" ? 1 : 0;
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var bodyfat = parseFloat(document.getElementById("bodyfat").value);
    var bodyfatPercent = (bodyfat / weight) * 100;

    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);
    var num3 = parseFloat(document.getElementById("num3").value);
    var num4 = parseFloat(document.getElementById("num4").value);
    var num5 = parseFloat(document.getElementById("num5").value);

    // 根據不同身分檢查輸入與計算最大攝氧量
    var num4Input = document.getElementById("num4");
    var vo2max;

    if (!num4Input.disabled) { // 成年人
        if (isNaN(height) || isNaN(weight) || isNaN(bodyfat) || isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4) || isNaN(num5)) {
            alert("請確保所有空格都已輸入數字。");
            return;
        }
        
        if (!validationPart2_1(height, weight, bodyfat, num1, num2, num3, num4, num5)){
            return;
        }

        vo2max = (49.357 - 0.143*age + 3.084*genderNum - 0.348*bodyfatPercent - 0.107*num1+ 0.259*(num4-num5)).toFixed(2);
    } else { // 銀髮族
        if (isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(bodyfat) || isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num5)) {
            alert("請確保所有空格都已輸入數字。");
            return;
        }

        if (!validationPart2_2(height, weight, bodyfat, num1, num2, num3, num5)){
            return;
        }

        vo2max = (47.598 - 0.234*age + 1.263*genderNum - 0.264*bodyfatPercent - 0.274*(num3-num2)).toFixed(2);
    }
    
    var result2_1 = document.getElementById("result2-1");
    result2_1.textContent = vo2max.toString();
    

    // 換算心肺耐力評等
    var result2_2 = document.getElementById("result2-2");

    if (!num4Input.disabled) { // 成年人
        var pr;

        switch (true) {
            // 1. 男性
            case genderNum == 1 && age >= 23 && age <= 24:
                if (vo2max <= 34.25) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(2) td:nth-child(2)";
                } else if (vo2max <= 37.09 && vo2max >= 34.26) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(2) td:nth-child(3)";
                } else if (vo2max <= 39.44 && vo2max >= 37.10) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(2) td:nth-child(4)";
                } else if (vo2max <= 42.80 && vo2max >= 39.45) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(2) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(2) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 25 && age <= 29:
                if (vo2max <= 33.30) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(3) td:nth-child(2)";
                } else if (vo2max <= 36.21 && vo2max >= 33.31) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(3) td:nth-child(3)";
                } else if (vo2max <= 38.76 && vo2max >= 36.22) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(3) td:nth-child(4)";
                } else if (vo2max <= 41.66 && vo2max >= 38.77) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(3) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(3) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 30 && age <= 34:
                if (vo2max <= 32.25) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(4) td:nth-child(2)";
                } else if (vo2max <= 35.23 && vo2max >= 32.26) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(4) td:nth-child(3)";
                } else if (vo2max <= 37.58 && vo2max >= 35.24) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(4) td:nth-child(4)";
                } else if (vo2max <= 40.33 && vo2max >= 37.59) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(4) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(4) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 35 && age <= 39:
                if (vo2max <= 31.04) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(5) td:nth-child(2)";
                } else if (vo2max <= 34.21 && vo2max >= 31.05) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(5) td:nth-child(3)";
                } else if (vo2max <= 36.49 && vo2max >= 34.22) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(5) td:nth-child(4)";
                } else if (vo2max <= 39.58 && vo2max >= 36.50) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(5) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(5) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 40 && age <= 44:
                if (vo2max <= 30.64) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(6) td:nth-child(2)";
                } else if (vo2max <= 33.40 && vo2max >= 30.65) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(6) td:nth-child(3)";
                } else if (vo2max <= 35.82 && vo2max >= 33.41) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(6) td:nth-child(4)";
                } else if (vo2max <= 38.61 && vo2max >= 35.83) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(6) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(6) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 45 && age <= 49:
                if (vo2max <= 30.11) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(7) td:nth-child(2)";
                } else if (vo2max <= 32.55 && vo2max >= 30.12) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(7) td:nth-child(3)";
                } else if (vo2max <= 34.74 && vo2max >= 32.56) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(7) td:nth-child(4)";
                } else if (vo2max <= 38.00 && vo2max >= 34.75) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(7) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(7) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 50 && age <= 54:
                if (vo2max <= 29.62) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(8) td:nth-child(2)";
                } else if (vo2max <= 31.82 && vo2max >= 29.63) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(8) td:nth-child(3)";
                } else if (vo2max <= 34.01 && vo2max >= 31.83) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(8) td:nth-child(4)";
                } else if (vo2max <= 36.77 && vo2max >= 34.02) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(8) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(8) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 55 && age <= 59:
                if (vo2max <= 29.02) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(9) td:nth-child(2)";
                } else if (vo2max <= 31.69 && vo2max >= 29.03) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(9) td:nth-child(3)";
                } else if (vo2max <= 33.91 && vo2max >= 31.70) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(9) td:nth-child(4)";
                } else if (vo2max <= 36.67 && vo2max >= 33.92) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(9) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(9) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 60 && age <= 64:
                if (vo2max <= 28.53) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(10) td:nth-child(2)";
                } else if (vo2max <= 30.81 && vo2max >= 28.54) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(10) td:nth-child(3)";
                } else if (vo2max <= 32.66 && vo2max >= 30.82) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(10) td:nth-child(4)";
                } else if (vo2max <= 35.48 && vo2max >= 32.67) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(10) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(1) tr:nth-child(10) td:nth-child(6)";
                }
                break;

            // 2. 女性
            case genderNum == 0 && age >= 23 && age <= 24:
                if (vo2max <= 28.29) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(2) td:nth-child(2)";
                } else if (vo2max <= 31.25 && vo2max >= 28.30) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(2) td:nth-child(3)";
                } else if (vo2max <= 33.68 && vo2max >= 31.26) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(2) td:nth-child(4)";
                } else if (vo2max <= 36.94 && vo2max >= 33.69) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(2) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(2) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 25 && age <= 29:
                if (vo2max <= 27.29) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(3) td:nth-child(2)";
                } else if (vo2max <= 30.48 && vo2max >= 27.30) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(3) td:nth-child(3)";
                } else if (vo2max <= 32.98 && vo2max >= 30.49) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(3) td:nth-child(4)";
                } else if (vo2max <= 35.78 && vo2max >= 32.99) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(3) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(3) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 30 && age <= 34:
                if (vo2max <= 27.06) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(4) td:nth-child(2)";
                } else if (vo2max <= 30.13 && vo2max >= 27.07) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(4) td:nth-child(3)";
                } else if (vo2max <= 32.48 && vo2max >= 30.14) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(4) td:nth-child(4)";
                } else if (vo2max <= 35.56 && vo2max >= 32.49) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(4) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(4) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 35 && age <= 39:
                if (vo2max <= 26.17) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(5) td:nth-child(2)";
                } else if (vo2max <= 29.14 && vo2max >= 26.18) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(5) td:nth-child(3)";
                } else if (vo2max <= 31.70 && vo2max >= 29.15) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(5) td:nth-child(4)";
                } else if (vo2max <= 34.49 && vo2max >= 31.71) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(5) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(5) td:nth-child(6)";
                }
                break;
            
            case genderNum == 0 && age >= 40 && age <= 44:
                if (vo2max <= 26.13) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(6) td:nth-child(2)";
                } else if (vo2max <= 28.86 && vo2max >= 26.14) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(6) td:nth-child(3)";
                } else if (vo2max <= 31.21 && vo2max >= 28.87) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(6) td:nth-child(4)";
                } else if (vo2max <= 34.11 && vo2max >= 31.22) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(6) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(6) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 45 && age <= 49:
                if (vo2max <= 25.14) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(7) td:nth-child(2)";
                } else if (vo2max <= 28.04 && vo2max >= 25.15) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(7) td:nth-child(3)";
                } else if (vo2max <= 30.28 && vo2max >= 28.05) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(7) td:nth-child(4)";
                } else if (vo2max <= 32.77 && vo2max >= 30.29) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(7) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(7) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 50 && age <= 54:
                if (vo2max <= 24.12) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(8) td:nth-child(2)";
                } else if (vo2max <= 27.04 && vo2max >= 24.13) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(8) td:nth-child(3)";
                } else if (vo2max <= 29.31 && vo2max >= 27.05) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(8) td:nth-child(4)";
                } else if (vo2max <= 32.16 && vo2max >= 29.32) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(8) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(8) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 55 && age <= 59:
                if (vo2max <= 23.73) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(9) td:nth-child(2)";
                } else if (vo2max <= 26.40 && vo2max >= 23.74) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(9) td:nth-child(3)";
                } else if (vo2max <= 28.74 && vo2max >= 26.41) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(9) td:nth-child(4)";
                } else if (vo2max <= 31.45 && vo2max >= 28.75) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(9) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(9) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 60 && age <= 64:
                if (vo2max <= 23.13) {
                    pr = "PR1-20";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(10) td:nth-child(2)";
                } else if (vo2max <= 25.60 && vo2max >= 23.14) {
                    pr = "PR21-40";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(10) td:nth-child(3)";
                } else if (vo2max <= 27.92 && vo2max >= 25.61) {
                    pr = "PR41-60";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(10) td:nth-child(4)";
                } else if (vo2max <= 30.37 && vo2max >= 27.93) {
                    pr = "PR61-80";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(10) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "table:nth-of-type(2) tr:nth-child(10) td:nth-child(6)";
                }
                break;
        }
        
        result2_2.textContent = pr;

        // 移除之前亮起來的格子樣式
        if (previousHighlightedCell) {
            previousHighlightedCell.style.backgroundColor = "";
            previousHighlightedCell.classList.remove("highlighted-cell");
        }

        // 亮起此次評等的格子
        var targetCell = document.querySelector(targetCellSelector);
        if (targetCell) {
            targetCell.classList.add("highlighted-cell"); 
            previousHighlightedCell = targetCell;
        }

    } else { // 銀髮族
        result2_2.textContent = "轉換方式尚未制定";
    }
    
    // 載入google chart繪製折線圖
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
        drawChart(age, num1, num2, num3, num4, num5);
    });
}

function validationPart1(height, weight, bodyfat) {
    if (height < 100 || height > 250) {
        alert("身高：請輸入有效的數字。");
        return false;
    }

    if (weight < 20 || weight > 130) {
        alert("體重：請輸入有效的數字。");
        return false;
    }

    if (bodyfat > 100) {
        alert("全身體脂肪重：請輸入有效的數字。");
        return false;
    }

    return true;
}

function validationPart2_1(height, weight, bodyfat, num1, num2, num3, num4, num5) { // 成年人
    if (!validationPart1(height, weight, bodyfat)) {
        return false;
    }

    if (!Number.isInteger(num1) || !Number.isInteger(num2) || !Number.isInteger(num3) || !Number.isInteger(num4) || !Number.isInteger(num5)) {
        alert("漸進式原地抬膝踏步心率：請確認數字皆為整數。");
        return false;
    }

    if (num1 < 50 || num1 > 220 || num2 < 50 || num2 > 220 || num3 < 50 || num3 > 220 || num4 < 50 || num4 > 220 || num5 < 50 || num5 > 220) {
        alert("漸進式原地抬膝踏步心率：請輸入有效的數字。");
        return false;
    }

    return true;
}

function validationPart2_2(height, weight, bodyfat, num1, num2, num3, num5) { // 銀髮族
    if (!validationPart1(height, weight, bodyfat)) {
        return false;
    }

    if (!Number.isInteger(num1) || !Number.isInteger(num2) || !Number.isInteger(num3) || !Number.isInteger(num5)) {
        alert("漸進式原地抬膝踏步心率：請確認數字皆為整數。");
        return false;
    }

    if (num1 < 50 || num1 > 220 || num2 < 50 || num2 > 220 || num3 < 50 || num3 > 220 || num5 < 50 || num5 > 220) {
        alert("漸進式原地抬膝踏步心率：請輸入有效的數字。");
        return false;
    }

    return true;
}


function drawChart(age, num1, num2, num3, num4, num5) {
    // 建立數據表並添加到列
    var data = new google.visualization.DataTable();
    data.addColumn("string", "時段");
    data.addColumn("number", "心率");

    // 數據表中添加數據行
    data.addRow(["運動第0分鐘", num1]);
    data.addRow(["運動1分鐘後", num2]);
    data.addRow(["運動2分鐘後", num3]);
    data.addRow(["運動3分鐘後", num4]);
    data.addRow(["結束1分鐘後", num5]);


    // 创建一个数组来表示水平线数据
    var maxHeartRate = 220 - age; // 最大心率

    var horizontalLineData = [
        ["運動第0分鐘", maxHeartRate],
        ["結束1分鐘後", maxHeartRate]
    ];

    // 建立一个数据表用于水平线数据
    var horizontalLineDataTable = new google.visualization.DataTable();
    horizontalLineDataTable.addColumn("string", "時段");
    horizontalLineDataTable.addColumn("number", "最大心率");

    // 向水平线数据表中添加数据行
    for (var i = 0; i < horizontalLineData.length; i++) {
        horizontalLineDataTable.addRow(horizontalLineData[i]);
    }

    // 設定圖表
    var options = {
        title: '心率變化',
        curveType: 'function',
        legend: { position: 'bottom' },
        
        series: {
            0: { color: 'blue' }, // 心率曲线的颜色
            1: { color: 'red', lineWidth: 2, lineDashStyle: [4, 4], visibleInLegend: false }
        }
    };

    // 創建一個新的折線圖實例，並在id為'chart_div'的<div>元素中相關圖表
    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    chart.draw(horizontalLineDataTable, options);
}

window.addEventListener("load", start1, false);
window.addEventListener("load", start2, false);