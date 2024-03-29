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
    
    // 判斷BMI評等
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

        // 此公式為公司機密因此已修改成範例公式
        vo2max = (60 - 0.2*age + 3.5*genderNum).toFixed(2);
    } else { // 銀髮族
        if (isNaN(age) || isNaN(height) || isNaN(weight) || isNaN(bodyfat) || isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num5)) {
            alert("請確保所有空格都已輸入數字。");
            return;
        }

        if (!validationPart2_2(height, weight, bodyfat, num1, num2, num3, num5)){
            return;
        }

        // 此公式為公司機密因此已修改成範例公式
        vo2max = (55 - 0.3*age + 1.5*genderNum).toFixed(2);
    }
    
    var result2_1 = document.getElementById("result2-1");
    result2_1.textContent = vo2max.toString();
    

    // 換算心肺耐力評等
    var result2_2 = document.getElementById("result2-2");


    // 根據性別顯示常模表格
    var resultDiv = document.getElementById("result2-3");

    if (genderNum == 1) { // male
        resultDiv.innerHTML = ""; // 清空先前內容
        var maleTableHTML = `
            <table id="maleTable">
                <caption>男性落點分析 (23-64歲)</caption>
                <tbody>
                    <tr>
                        <th>五分等級</th><th>PR1-20</th><th>PR21-40</th><th>PR41-60</th><th>PR61-80</th><th>PR81-99</th>
                    </tr>
                    <tr>
                        <td>23-24歲</td><td>~34.25</td><td>34.26~37.09</td><td>37.10~39.44</td><td>39.45~42.80</td><td>42.81~</td>
                    </tr>
                    <tr>
                        <td>25-29歲</td><td>~33.30</td><td>33.31~36.21</td><td>36.22~38.76</td><td>38.77~41.66</td><td>41.67~</td>
                    </tr>
                    <tr>
                        <td>30-34歲</td><td>~32.25</td><td>32.26~35.23</td><td>35.24~37.58</td><td>37.59~40.33</td><td>40.34~</td>
                    </tr>
                    <tr>
                        <td>35-39歲</td><td>~31.04</td><td>31.05~34.21</td><td>34.22~36.49</td><td>36.50~39.58</td><td>39.59~</td>
                    </tr>
                    <tr>
                        <td>40-44歲</td><td>~30.64</td><td>30.65~33.40</td><td>33.41~35.82</td><td>35.83~38.61</td><td>38.62~</td>
                    </tr>
                    <tr>
                        <td>45-49歲</td><td>~30.11</td><td>30.12~32.55</td><td>32.56~34.74</td><td>34.75~38.00</td><td>38.01~</td>
                    </tr>
                    <tr>
                        <td>50-54歲</td><td>~29.62</td><td>29.63~31.82</td><td>31.83~34.01</td><td>34.02~36.77</td><td>36.78~</td>
                    </tr>
                    <tr>
                        <td>55-59歲</td><td>~29.02</td><td>29.03~31.69</td><td>31.70~33.91</td><td>33.92~36.67</td><td>36.68~</td>
                    </tr>
                    <tr>
                        <td>60-64歲</td><td>~28.53</td><td>28.54~30.81</td><td>30.82~32.66</td><td>32.67~35.48</td><td>35.49~</td>
                    </tr>
                </tbody>
            </table>
            `;
        resultDiv.innerHTML = maleTableHTML;
    } else { // female
        resultDiv.innerHTML = ""; // 清空先前內容
        var femaleTableHTML = `
            <table id="femaleTable">
                <caption>女性落點分析 (23-64歲)</caption>
                <tbody>
                    <tr>
                        <th>五分等級</th><th>PR1-20</th><th>PR21-40</th><th>PR41-60</th><th>PR61-80</th><th>PR81-99</th>
                    </tr>
                    <tr>
                        <td>23-24歲</td><td>~28.29</td><td>28.30~31.25</td><td>31.26~33.68</td><td>33.69~36.94</td><td>36.95~</td>
                    </tr>
                    <tr>
                        <td>25-29歲</td><td>~27.29</td><td>27.30~30.48</td><td>30.49~32.98</td><td>32.99~35.78</td><td>35.79~</td>
                    </tr>
                    <tr>
                        <td>30-34歲</td><td>~27.06</td><td>27.07~30.13</td><td>30.14~32.48</td><td>32.49~35.56</td><td>35.57~</td>
                    </tr>
                    <tr>
                        <td>35-39歲</td><td>~26.17</td><td>26.18~29.14</td><td>29.15~31.70</td><td>31.71~34.49</td><td>34.50~</td>
                    </tr>
                    <tr>
                        <td>40-44歲</td><td>~26.13</td><td>26.14~28.86</td><td>28.87~31.21</td><td>31.22~34.11</td><td>34.12~</td>
                    </tr>
                    <tr>
                        <td>45-49歲</td><td>~25.14</td><td>25.15~28.04</td><td>28.05~30.28</td><td>30.29~32.77</td><td>32.78~</td>
                    </tr>
                    <tr>
                        <td>50-54歲</td><td>~24.12</td><td>24.13~27.04</td><td>27.05~29.31</td><td>29.32~32.16</td><td>32.17~</td>
                    </tr>
                    <tr>
                        <td>55-59歲</td><td>~23.73</td><td>23.74~26.40</td><td>26.41~28.74</td><td>28.75~31.45</td><td>31.46~</td>
                    </tr>
                    <tr>
                        <td>60-64歲</td><td>~23.13</td><td>23.14~25.60</td><td>25.61~27.92</td><td>27.93~30.37</td><td>30.38~</td>
                    </tr>
                </tbody>
            </table>
            `;
        resultDiv.innerHTML = femaleTableHTML;
    }


    // 亮起落點的格子
    if (!num4Input.disabled) { // 成年人
        var pr;

        switch (true) {
            // 1. 男性
            case genderNum == 1 && age >= 23 && age <= 24:
                if (vo2max <= 34.25) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(2) td:nth-child(2)";
                } else if (vo2max <= 37.09 && vo2max >= 34.26) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(2) td:nth-child(3)";
                } else if (vo2max <= 39.44 && vo2max >= 37.10) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(2) td:nth-child(4)";
                } else if (vo2max <= 42.80 && vo2max >= 39.45) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(2) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(2) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 25 && age <= 29:
                if (vo2max <= 33.30) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(3) td:nth-child(2)";
                } else if (vo2max <= 36.21 && vo2max >= 33.31) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(3) td:nth-child(3)";
                } else if (vo2max <= 38.76 && vo2max >= 36.22) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(3) td:nth-child(4)";
                } else if (vo2max <= 41.66 && vo2max >= 38.77) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(3) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(3) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 30 && age <= 34:
                if (vo2max <= 32.25) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(4) td:nth-child(2)";
                } else if (vo2max <= 35.23 && vo2max >= 32.26) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(4) td:nth-child(3)";
                } else if (vo2max <= 37.58 && vo2max >= 35.24) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(4) td:nth-child(4)";
                } else if (vo2max <= 40.33 && vo2max >= 37.59) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(4) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(4) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 35 && age <= 39:
                if (vo2max <= 31.04) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(5) td:nth-child(2)";
                } else if (vo2max <= 34.21 && vo2max >= 31.05) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(5) td:nth-child(3)";
                } else if (vo2max <= 36.49 && vo2max >= 34.22) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(5) td:nth-child(4)";
                } else if (vo2max <= 39.58 && vo2max >= 36.50) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(5) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(5) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 40 && age <= 44:
                if (vo2max <= 30.64) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(6) td:nth-child(2)";
                } else if (vo2max <= 33.40 && vo2max >= 30.65) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(6) td:nth-child(3)";
                } else if (vo2max <= 35.82 && vo2max >= 33.41) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(6) td:nth-child(4)";
                } else if (vo2max <= 38.61 && vo2max >= 35.83) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(6) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(6) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 45 && age <= 49:
                if (vo2max <= 30.11) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(7) td:nth-child(2)";
                } else if (vo2max <= 32.55 && vo2max >= 30.12) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(7) td:nth-child(3)";
                } else if (vo2max <= 34.74 && vo2max >= 32.56) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(7) td:nth-child(4)";
                } else if (vo2max <= 38.00 && vo2max >= 34.75) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(7) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(7) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 50 && age <= 54:
                if (vo2max <= 29.62) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(8) td:nth-child(2)";
                } else if (vo2max <= 31.82 && vo2max >= 29.63) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(8) td:nth-child(3)";
                } else if (vo2max <= 34.01 && vo2max >= 31.83) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(8) td:nth-child(4)";
                } else if (vo2max <= 36.77 && vo2max >= 34.02) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(8) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(8) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 55 && age <= 59:
                if (vo2max <= 29.02) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(9) td:nth-child(2)";
                } else if (vo2max <= 31.69 && vo2max >= 29.03) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(9) td:nth-child(3)";
                } else if (vo2max <= 33.91 && vo2max >= 31.70) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(9) td:nth-child(4)";
                } else if (vo2max <= 36.67 && vo2max >= 33.92) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(9) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(9) td:nth-child(6)";
                }
                break;

            case genderNum == 1 && age >= 60 && age <= 64:
                if (vo2max <= 28.53) {
                    pr = "PR1-20";
                    targetCellSelector = "#maleTable tr:nth-child(10) td:nth-child(2)";
                } else if (vo2max <= 30.81 && vo2max >= 28.54) {
                    pr = "PR21-40";
                    targetCellSelector = "#maleTable tr:nth-child(10) td:nth-child(3)";
                } else if (vo2max <= 32.66 && vo2max >= 30.82) {
                    pr = "PR41-60";
                    targetCellSelector = "#maleTable tr:nth-child(10) td:nth-child(4)";
                } else if (vo2max <= 35.48 && vo2max >= 32.67) {
                    pr = "PR61-80";
                    targetCellSelector = "#maleTable tr:nth-child(10) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#maleTable tr:nth-child(10) td:nth-child(6)";
                }
                break;

            // 2. 女性
            case genderNum == 0 && age >= 23 && age <= 24:
                if (vo2max <= 28.29) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(2) td:nth-child(2)";
                } else if (vo2max <= 31.25 && vo2max >= 28.30) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(2) td:nth-child(3)";
                } else if (vo2max <= 33.68 && vo2max >= 31.26) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(2) td:nth-child(4)";
                } else if (vo2max <= 36.94 && vo2max >= 33.69) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(2) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(2) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 25 && age <= 29:
                if (vo2max <= 27.29) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(3) td:nth-child(2)";
                } else if (vo2max <= 30.48 && vo2max >= 27.30) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(3) td:nth-child(3)";
                } else if (vo2max <= 32.98 && vo2max >= 30.49) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(3) td:nth-child(4)";
                } else if (vo2max <= 35.78 && vo2max >= 32.99) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(3) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(3) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 30 && age <= 34:
                if (vo2max <= 27.06) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(4) td:nth-child(2)";
                } else if (vo2max <= 30.13 && vo2max >= 27.07) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(4) td:nth-child(3)";
                } else if (vo2max <= 32.48 && vo2max >= 30.14) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(4) td:nth-child(4)";
                } else if (vo2max <= 35.56 && vo2max >= 32.49) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(4) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(4) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 35 && age <= 39:
                if (vo2max <= 26.17) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(5) td:nth-child(2)";
                } else if (vo2max <= 29.14 && vo2max >= 26.18) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(5) td:nth-child(3)";
                } else if (vo2max <= 31.70 && vo2max >= 29.15) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(5) td:nth-child(4)";
                } else if (vo2max <= 34.49 && vo2max >= 31.71) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(5) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(5) td:nth-child(6)";
                }
                break;
            
            case genderNum == 0 && age >= 40 && age <= 44:
                if (vo2max <= 26.13) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(6) td:nth-child(2)";
                } else if (vo2max <= 28.86 && vo2max >= 26.14) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(6) td:nth-child(3)";
                } else if (vo2max <= 31.21 && vo2max >= 28.87) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(6) td:nth-child(4)";
                } else if (vo2max <= 34.11 && vo2max >= 31.22) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(6) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(6) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 45 && age <= 49:
                if (vo2max <= 25.14) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(7) td:nth-child(2)";
                } else if (vo2max <= 28.04 && vo2max >= 25.15) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(7) td:nth-child(3)";
                } else if (vo2max <= 30.28 && vo2max >= 28.05) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(7) td:nth-child(4)";
                } else if (vo2max <= 32.77 && vo2max >= 30.29) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(7) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(7) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 50 && age <= 54:
                if (vo2max <= 24.12) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(8) td:nth-child(2)";
                } else if (vo2max <= 27.04 && vo2max >= 24.13) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(8) td:nth-child(3)";
                } else if (vo2max <= 29.31 && vo2max >= 27.05) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(8) td:nth-child(4)";
                } else if (vo2max <= 32.16 && vo2max >= 29.32) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(8) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(8) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 55 && age <= 59:
                if (vo2max <= 23.73) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(9) td:nth-child(2)";
                } else if (vo2max <= 26.40 && vo2max >= 23.74) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(9) td:nth-child(3)";
                } else if (vo2max <= 28.74 && vo2max >= 26.41) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(9) td:nth-child(4)";
                } else if (vo2max <= 31.45 && vo2max >= 28.75) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(9) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(9) td:nth-child(6)";
                }
                break;

            case genderNum == 0 && age >= 60 && age <= 64:
                if (vo2max <= 23.13) {
                    pr = "PR1-20";
                    targetCellSelector = "#femaleTable tr:nth-child(10) td:nth-child(2)";
                } else if (vo2max <= 25.60 && vo2max >= 23.14) {
                    pr = "PR21-40";
                    targetCellSelector = "#femaleTable tr:nth-child(10) td:nth-child(3)";
                } else if (vo2max <= 27.92 && vo2max >= 25.61) {
                    pr = "PR41-60";
                    targetCellSelector = "#femaleTable tr:nth-child(10) td:nth-child(4)";
                } else if (vo2max <= 30.37 && vo2max >= 27.93) {
                    pr = "PR61-80";
                    targetCellSelector = "#femaleTable tr:nth-child(10) td:nth-child(5)";
                } else {
                    pr = "PR81-99";
                    targetCellSelector = "#femaleTable tr:nth-child(10) td:nth-child(6)";
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
    google.charts.load("current", {"packages":["corechart"]});
    google.charts.setOnLoadCallback(function() { // 成年人
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

function drawChart(age, num1, num2, num3, num4=null, num5) {
    var maxHeartRate = 220 - age; // 最大心率

    var data = google.visualization.arrayToDataTable([
        ["時段", "心率", { role: "annotation" }, "最大心率 (根據年齡推算)"],
        ["運動第0分鐘", num1, "最大心率百分比：" + (num1 / maxHeartRate * 100).toFixed(1) + "%", maxHeartRate],
        ["運動1分鐘後", num2, (num2 / maxHeartRate * 100).toFixed(1) + "%", maxHeartRate],
        ["運動2分鐘後", num3, (num3 / maxHeartRate * 100).toFixed(1) + "%", maxHeartRate],
    ]);

    // console.log("num4 is:", num4);
    if (isNaN(num4)) {
        num4 = null; 
    }

    if (num4 !== null) { // 成年人
        data.addRow(["運動3分鐘後", num4, (num4 / maxHeartRate * 100).toFixed(1) + "%", maxHeartRate]);
    }

    data.addRow(["結束1分鐘後", num5, (num5 / maxHeartRate * 100).toFixed(1) + "%", maxHeartRate]);

    // 設定圖表
    var options = {
        title: "漸進式原地抬膝踏步心率：心率變化",
        titleTextStyle: {
            fontSize:16,
            bold: true
        },
        curveType: "function", // 平滑線
        legend: { position: "bottom" }
    };

    var chart = new google.visualization.LineChart(document.getElementById("chart_div"));
    chart.draw(data, options);
}

window.addEventListener("load", start1, false);
window.addEventListener("load", start2, false);