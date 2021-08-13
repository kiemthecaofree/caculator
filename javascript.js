let buttons = document.querySelectorAll('button');
let operators = document.querySelectorAll('.operator');
let nums = document.querySelectorAll('.num');
var result = document.querySelector('#result');
let clear = document.querySelector('#clear');
let equal = document.querySelector('#equal');
let dot = document.querySelector('#dot');

// var chuoi = "21226+35.5*3*2+2-2-2*10070"; // 20 + 30 = 50 => 50*2 = 100 => 100 + 100 = 200 => 400 => 2x400 = 800

var getGiaTri
var ketqua = '';
var giaTri = 0;

var search_Value_First = (ketqua) =>{ // Giá trị đầu tiên 12.2
    var x = '';
    for(var i = 0; i < ketqua.length; i++)
    {
        console.log("iii "+ ketqua[i]);
        if(Number(ketqua[i]) >= 0 || Number(ketqua[i]) <= 0 || ketqua[i] == '.')
        {
            x += ketqua[i];
            console.log("X = "+x);
            if(i == ketqua.length - 1)
                return Number(x);
        }  
        else
        {
            return Number(x);
        }       
    }
}

var search_Value_End = (ketqua) =>{ // Giá trị đầu tiên 12.2
    var x = '';
    for(var i = ketqua.length -1; i>= 0; i--)
    {
        console.log("iii "+ ketqua[i]);
        if(Number(ketqua[i]) >= 0 || Number(ketqua[i]) <= 0 || ketqua[i] == '.')
        {
            x += ketqua[i];
            console.log("X = "+x);
            if(i == 0)
                return x;
        }  
        else
        {
            return x;
        }       
    }
}

// console.log("CUOI = "+ search_Value_End('15+12.2'));

console.log("SUM = "+ search_Value_First('12.5+5'));

let Sum = (chuoi) =>{ // Tính tổng
    console.log("CHUOI KQ = "+ chuoi);
    let tong = search_Value_First(chuoi);
    console.log("SUM = "+ search_Value_First(chuoi));
    for(var i = 0; i < chuoi.length; i++)
    {
        if(chuoi[i] === '+' || chuoi[i] === '-' || chuoi[i] === '*' || chuoi[i] === '/')
        {
            var y = '';
            for(var k = i+1; k< chuoi.length; k++)
            {
                if(Number(chuoi[k]) >= 0 || Number(chuoi[k]) <= 0  || ketqua[k] === '.')
                    y = y + chuoi[k];
                else
                    break;
            }
            console.log("YYYYY = "+y);
            if(chuoi[i] === '+') tong = tong + Number(y);
            if(chuoi[i] === '-') tong = tong - Number(y);
            if(chuoi[i] === '*') tong = tong * Number(y);
            if(chuoi[i] === '/') tong = tong / Number(y);
        } 
    }
    return tong;
}
// console.log("Tong = "+Sum(ketqua));


var checkNumber = (number) =>{
    if(Number(number) >= 0 || Number(number) <= 0)
    {
        return 'la_so';
    }
    else if(number == '+' || number == '-' || number == '*' || number == '/' )
    {
        return 'la_phep_toan';
    }
    else if(number == '.')
    {
        return 'la_dau_cham';
    }
}



// var getGiaTri
// var ketqua = '';
// var giaTri = 0;
var chobam_daucham = false;
var choban_so = false;
var hienThi = (number) => {
    console.log(number + "  "+ checkNumber(number));
    var kq_one = ketqua;
    if(number == '.' && search_Value_End(ketqua).includes('.'))
        return; // Đã có dấu . trước đó
    if(number == '.' && ketqua.length == 0)
    {
        console.log("IF 0: Xử lý nếu ký tự '.' ở đầu");
        ketqua = `0.${ketqua}`;
        result.innerHTML = ketqua;
        return;
    }     
    if(number == '.' && (ketqua[ketqua.length - 1].includes('.') || checkNumber(ketqua[ketqua.length - 1]) === 'la_phep_toan'))
    {
        console.log("IF 1: Không thể tính phép toán + với dấu .");
        ketqua = kq_one;
        result.innerHTML = ketqua;
        return;
    }        
    if(ketqua.length == 0 && (number == '*' || number == '/'))
    {
        console.log("IF 2: Ko được bắt dầu bằng * hoặc /");
        ketqua = kq_one;
        result.innerHTML = '0';
        return;
    }
    if(( /*number == '+' || number == '-' || */ number == '*' || number == '/') && (ketqua[ketqua.length - 1] == '+' 
    || ketqua[ketqua.length - 1] == '-'
    || ketqua[ketqua.length - 1] == '*'
    || ketqua[ketqua.length - 1] == '/' 
    || ketqua[ketqua.length - 1] == '.'))
    {
        console.log("IF 3: Nếu trước đó là phép toàn thì sau không thể là phếp toán hoặc dấu chấm thì ko phép toán");
        ketqua = kq_one;
        result.innerHTML = ketqua;
        return;
    }
    ketqua = kq_one + number;
    console.log("KQ = "+ketqua);
    result.innerHTML = ketqua;
}

var nhanPhim = () =>{
    nums.forEach(num => {
        num.addEventListener('click', () =>{
            hienThi(num.value);
        })
    });

    operators.forEach(operator => {
        operator.addEventListener('click', () =>{
            hienThi(operator.value);
        })
    });

    clear.addEventListener('click', () =>{
        resetAll();
    });

    dot.addEventListener('click', () =>{
        hienThi(dot.value);
    });

    equal.addEventListener('click', () =>{
        ShowResult();
    });

}

var resetAll = () =>{
    result.innerHTML = "0";
    ketqua = '';
}

var ShowResult = () =>{
    if(ketqua.length === 0 || ( ketqua.length === 1 && (ketqua[0] === '+' || ketqua[0] === '-' || ketqua[0] === '0.')))
    {
        return;
    }
    result.innerHTML = `${Sum(ketqua)}`;
    ketqua = `${Sum(ketqua)}`;
}
nhanPhim();








