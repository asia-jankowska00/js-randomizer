const app = document.getElementsByClassName('app')[0];
const colorBox = document.getElementsByClassName('color-box')[0];
const textarea = document.getElementsByTagName('textarea')[0];
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const presetBtns = document.getElementsByClassName('preset-btn');
const giveOneBtn = document.getElementById('giveOneBtn');
const giveTwoBtn = document.getElementById('giveTwoBtn');
const giveFiveBtn = document.getElementById('giveFiveBtn');
const giveManyBtn = document.getElementById('giveManyBtn');
const giveManyInput = document.getElementById('giveManyInput');
const inputsList = document.getElementById('inputsList');
const numberOfItems = document.getElementById('numberOfItems')
const randomizedList = document.getElementById('randomizedList')
let value = textarea.value;
let splitValue = value.split('\n'); // array containing all items in list
let splitValueText = document.createTextNode(splitValue);
// let newSplitValue;
let result;
// let newSplitValueText;

function init() {
    setRandomBgColor();
    resetElemHeight();
    setUpListeners();
    renderInputListLoop(splitValue);
}

function setUpListeners() {
    //set up Add and Clear list buttons
    clearBtn.addEventListener('click', clearList);
    addBtn.addEventListener('click', addItems);
    // set up buttons for 1, 2, 5 and custom amount
    for (let i = 0; i < presetBtns.length; i++) {
        presetBtns[i].addEventListener('click', function() {
            //error logic
            if (splitValue.length === 0) {
                renderError()      
                throw '0 args';          
            } 
            else {
                if(presetBtns[i].getAttribute('data-num')) {
                    console.log('clicked')
                    let num = presetBtns[i].getAttribute('data-num');
                    console.log('num is ' + num);
                    randomizedList.innerHTML = '';
                    for(let i = 0; i<num; i++){
                        renderRandom(splitValue);
                    }
                    resetElemHeight()
                } 
                else {
                    let num = giveManyInput.value;
                    randomizedList.innerHTML = '';
                    for(let i = 0; i<num; i++){
                        renderRandom(splitValue);
                }
                resetElemHeight()
                }
                
            }
        })
    }
}

function addItems() {
    value = textarea.value;
    if (value) {
        splitValue = splitValue.concat(value.split('\n'));
        console.log(splitValue);
        renderInputListLoop(splitValue);
        console.log('rendered new split value');
    }
    // newSplitValueText = document.createTextNode(splitValue);
    // renderInputList(newSplitValueText)
}

function clearList() {
    // textarea.value = '';
    splitValue = [];
    renderInputListLoop(splitValue)
}

function renderInputListLoop(array) {
    inputsList.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        inputsList.innerHTML += array[i] + ', '
    }
    numberOfItems.innerHTML = array.length;
    console.log('finished render input list loop')
}

function randomNumber(array) {
    let result = Math.floor(Math.random() * array.length);
    console.log('random number is ' + result);
    return result
}

function returnRandom(array) {
    let randomizedIndex = array[randomNumber(array)];
    console.log(randomizedIndex);
    return randomizedIndex
}

function renderRandom(array) {
    // randomizedList.innerHTML = '';
    let randomizedItem = returnRandom(array);
    let itemLi = document.createElement('li');
    itemLi.innerHTML = randomizedItem;
    randomizedList.appendChild(itemLi)
}

function renderError() {
    randomizedList.innerHTML = '';
    let errorLi = document.createElement('li');
    errorLi.setAttribute('class', 'error');
    errorLi.innerHTML = 'You didn\'t add anything to your list!';
    randomizedList.appendChild(errorLi);
}



// color randomizer for fun
function randomColor() {
    // pick a "red" value from 0 to 255
    var r = Math.floor(Math.random() * 256)
    // pick a "green" value from 0 to 255
    var g = Math.floor(Math.random() * 256)
    // pick a "blue" value from 0 to 255
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

function setRandomBgColor() {
    colorBox.style.backgroundColor = randomColor();
}

function resetElemHeight() {

    let body = document.body;
    let html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    // let bodyHeight = document.body.clientHeight;
    app.style.height = height + 'px'
    colorBox.style.height = height + 'px'
    console.log(height)
}

init()

// alternative method for rendering input list, without array loop

// function renderInputList(value) {
//     // renders the contents of the splitValue array
//     inputsList.appendChild(value);
//     inputsList.innerHTML += ',';
//     console.log(splitValueText);
// }

// renderInputList()