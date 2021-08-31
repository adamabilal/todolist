const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const horlogeElement = document.getElementById("horloge");
const input = document.getElementById("input");
const element = document.getElementById("element");


function addToDo(toDo) {
    const text = `<li class="item">
        <i class="co fa fa-circle-thin" job="complete"></i>
        <p class="text"> ${toDo} </p>
        <i class="de fa fa-trash-o" job="delete"></i>
    </li>`
    const position = "beforeend";
    list.insertAdjacentHTML(position,text);
}


 document.addEventListener("keyup", function(event){
     if (event.keyCode == 13){
         const toDo = input.value;
         if(toDo){
             addToDo(toDo);
         }
         input.value = "";
     }
     
});
let LIST = [];
let id = 0;

LIST = [{} , {}];

LIST[0] = {
    name: "Drink Coffee",
    id:0,
    done : false,
    trash : false
}
LIST[1] = {
    name:"Workout",
    id:1,
    done : true,
    trash : false
}

document.addEventListener("keyup",function(event){
   
    
    if (event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo,id, false,false);
            
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash:false
            });
            input.value = "";
            id++;
        }
        
    }
});

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
function addToDo(toDo,id,done,trash){
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const text = `<li class="item">
                    <i class="fa  ${DONE}  complete" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
                  </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position,text);
}

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
  
}

function removeToDo (element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
const list = document.getElementById("list");

list.addEventListener("click", function (event){
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;
    if(elementJOB == "complete"){
        completeToDo(element);
    } else if (elementJOB == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
});
  let data = localStorage.getItem("TODO");
  if (data){
      LIST = JSON.parse(data);
     loadToDo(LIST);
     id = LIST.length;
 } else {
     LIST = [];
     id = 0;
 }
function loadToDo(array){
    array.forEach(function(item){
            addToDo(item.name, item.id, item.done, item.trash);      
    });
 }

 clear.addEventListener('click', function(){
     localStorage.clear();
     location.reload();
 });

 let options = {weekday:'long',month:'short', day:'numeric', year:'numeric'};
 let option = { timeZoneName: "short"};
 let today = new Date();
 dateElement.innerHTML = today.toLocaleDateString("fr", options);
 horlogeElement.innerHTML = today.toLocaleTimeString("fr",option);

