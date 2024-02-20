Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

//select options populate  
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr =document.querySelector(".from select");
const ToCurr =document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
   for(currcode in countryList ){
    let newOption =document.createElement(("option"));  //option add in dropdown option
    newOption.innerText = currcode;   
    newOption.value= currcode;       //we assign currcode value in created element 
    if(select.name ==="from" && currcode ==="USD"){
        newOption.selected = "selected";;  
    }else if(select.name ==="To" && currcode ==="INR"){
        newOption.selected = "selected";;
    }
    select.append(newOption);        //adding newoption into select class
   }

   select.addEventListener("change" ,  (evt) =>{
    updateFlag(evt.target);
   })
}
const updateExchangeRate =async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if( amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value =1;
    }
    
   // console.log(fromCurr.value, ToCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
    let response =await fetch(URL);
    let data =await response.json();
    let rate = data[ToCurr.value.toLowerCase()];
    let finalAmt = rate * amount.value; 
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt}${ToCurr.value}`;
    console.log(rate);
}


const updateFlag =(element) =>{
    let currcode =element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
};


button.addEventListener("click", (evt)=>{
    evt.preventDefault(); 
    updateExchangeRate();
})


window.addEventListener("load" , () =>{
    updateExchangeRate();
})



