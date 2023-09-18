function factorial(num) {
    if (num < 1) {
        return 1
    }
    return (num != 1) ? num * factorial(num - 1) : 1;
}

function butOne() {
    var m = document.getElementById('btn_one_1').value;
    var n = document.getElementById('btn_one_2').value;
    if (m != "" && n != "") {
        if (Number(m) > Number(n)) {
            alert('Пожалуйста, введите числа правильно')
        }
        else {
            m = Number(m);
            n = Number(n);
            document.getElementById('index_up_m_1').innerHTML = m;
            document.getElementById('index_up_n_1').innerHTML = n;
            document.getElementById('up_one_1').innerHTML = `${n}!`;
            document.getElementById('up_one_2').innerHTML = `(${n}-${m})!×${m}!`;
            up_value = factorial(n);
            document.getElementById('up_one_3').innerHTML = up_value;
            down_value = factorial((n-m))*factorial(m);
            document.getElementById('up_one_4').innerHTML = down_value;
            document.getElementById('ans_1').innerHTML = up_value / down_value;
            document.getElementById('block_1').style.display = '';
        }
    }
}
function butTwo() {
    var m = document.getElementById('btn_two_1').value;
    var n = document.getElementById('btn_two_2').value;
    if (m != "" && n != "") {
        m = Number(m);
        n = Number(n);
        document.getElementById('index_up_m_2').innerHTML = m;
        document.getElementById('index_up_n_2').innerHTML = n;
        document.getElementById('up_two_1').innerHTML = `(${n}+${m}-1)!`;
        document.getElementById('up_two_2').innerHTML = `(${n}-1)!×${m}!`;
        up_value = factorial((n+m-1));
        document.getElementById('up_two_3').innerHTML = up_value;
        down_value = factorial((n-1))*factorial(m);
        document.getElementById('up_two_4').innerHTML = down_value;
        document.getElementById('ans_2').innerHTML = up_value / down_value;
        document.getElementById('block_2').style.display = '';
    }

}
function butThree() {
    var m = document.getElementById('btn_three_1').value;
    var n = document.getElementById('btn_three_2').value;
    if (m != "" && n != "") {
        if (Number(m) > Number(n)) {
            alert('Пожалуйста, введите числа правильно')
        }
        else {
            m = Number(m);
            n = Number(n);
            document.getElementById('index_up_m_3').innerHTML = m;
            document.getElementById('index_up_n_3').innerHTML = n;
            document.getElementById('up_three_1').innerHTML = `${n}!`;
            document.getElementById('up_three_2').innerHTML = `(${n}-${m})!`;
            up_value = factorial(n);
            document.getElementById('up_three_3').innerHTML = up_value;
            down_value = factorial((n-m));
            document.getElementById('up_three_4').innerHTML = down_value;
            document.getElementById('ans_3').innerHTML = up_value / down_value;
            document.getElementById('block_3').style.display = '';
        }
    }
}
function butFour() {
    var m = document.getElementById('btn_four_1').value;
    var n = document.getElementById('btn_four_2').value;
    if (m != "" && n != "") {
        m = Number(m);
        n = Number(n);
        document.getElementById('index_up_m_4').innerHTML = m;
        document.getElementById('index_up_n_4').innerHTML = n;
        document.getElementById('up_four_1').innerHTML = n;
        document.getElementById('up_four_2').innerHTML = m;
        res_value = n**m;
        document.getElementById('ans_4').innerHTML = res_value;
        document.getElementById('block_4').style.display = '';
    }
}
function butFive() {
    var n = document.getElementById('btn_five_1').value;
    if (n != "") {
        n = Number(n);
        document.getElementById('index_up_n_5').innerHTML = n;
        document.getElementById('up_five_1').innerHTML = `${n}!`;
        res_value = factorial(n);
        document.getElementById('ans_5').innerHTML = res_value;
        document.getElementById('block_5').style.display = '';
    }
}

function butSix() {
    var val = document.getElementsByClassName('numbers');
    var nv = document.getElementById('num_val').value;
    var up = '(';
    var down = '';
    var up_value = 0;
    var down_value = 1;
        for (let i = 0; i < val.length; i++) {
            if (val[i].value == "") {
                alert('Введите все значения');
                return;
            }
            if (Number(val[i].value) < 1 || Number(val[i].value) > 20){
                alert('0 < n < 20');
                return;
            }
            if ((i+1) != val.length) {
                up += `${val[i].value}+`;
                down += `${val[i].value}!×`;
            }
            else{
                up += `${val[i].value})!`;
                down += `${val[i].value}!`;
            }
            up_value += Number(val[i].value);
            down_value *= factorial(Number(val[i].value));
    }
    document.getElementById('up_six_1').innerHTML = up;
    document.getElementById('up_six_2').innerHTML = down;
    document.getElementById('up_six_3').innerHTML = factorial(up_value);
    document.getElementById('up_six_4').innerHTML = down_value;
    document.getElementById('ans_6').innerHTML = factorial(up_value) / down_value;
    document.getElementById('block_6').style.display = '';
}

function numValues() {
    var nv = document.getElementById('num_val').value;
    if (nv == "") {
        alert('Введите количество значений');
        return;
    }
    if(Number(nv) < 0 || Number(nv) > 50){
        alert('0 < n < 50');
        return;
    }
    var input_text = document.getElementById('input_val');
    input_text.style.display = ''
    var val = document.getElementById('values');
    val.innerHTML = '';
    let num = document.createElement('div');
    let confirm = document.createElement('div');
    confirm.style.width = '112px';
    confirm.innerHTML = '<button class="but_calculate" onclick="butSix()">Вычислить</button>';
    num.className = 'example val_num';
    num.innerHTML = '<input id="btn_six_1" min="1" max="50" type="number" class="values">';
    for (let i = 0; i < Number(nv); i++){
        var s
        if (i<9) {
            s = `${i+1}&nbsp;&nbsp;&nbsp;`
        }
        else {
            s = `${i+1}&nbsp;`
        }
        num.innerHTML = `n${s}<input min="1" max="50" type="number" class="values numbers">`;
        val.appendChild(num.cloneNode(true));
    }
    val.appendChild(confirm);
}
