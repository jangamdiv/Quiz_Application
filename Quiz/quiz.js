
let details = JSON.parse(localStorage.getItem("details"));
let quizuser = JSON.parse(localStorage.getItem("quizuser"));
let body = document.querySelector("body");
console.log(details, quizuser);

if(quizuser){
    if(quizuser.quiz){
         body.innerHTML = `Test Already Completed to see result <a href="./result.html">click me</a>`;
    }
    else{
          mainFunction();
    }   
}else{
    alert("Login First");
    window.location.href ="./login.html"
}

function mainFunction(){
let storage=[
    {
        quesID:"1",
        question:"In what year did the Great October Socialist Revolution take place?",
        options:["1917","1923","1914","1920"],
        crctAnswer:"1917",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"2",
        question:"What is the largest lake in the world?",
        options:["Caspian Sea","Baikal","Lake Superior","Ontario"],
        crctAnswer:"Baikal",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"3",
        question:"Which planet in the solar system is known as the “Red Planet”?",
        options:["Venus","Earth","Mars","Jupiter"],
        crctAnswer:"Jupiter",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"4",
        question:"Who wrote the novel “War and Peace”?",
        options:["Anton Chekhov","Fyodor Dostoevsky","Leo Tolstoy","Ivan Turgenev"],
        crctAnswer:"Ivan Turgenev",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"5",
        question:"What is the capital of Japan?",
        options:["Beijing","Tokyo","Seoul","Bangkok"],
        crctAnswer:"Tokyo",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"6",
        question:"Which river is the longest in the world?",
        options:["Amazon","Mississippi","Nile","Yangtze"],
        crctAnswer:"Nile",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"7",
        question:"What gas is used to extinguish fires?",
        options:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],
        crctAnswer:"Nitrogen",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"8",
        question:" In what year did the Berlin Wall fall?",
        options:["1961","1989","1991","2000"],
        crctAnswer:"1989",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"9",
        question:"Which sea lies between Asia and Africa?",
        options:["Caspian","Red","Mediterranean","Dead"],
        crctAnswer:"Mediterranean",
        userAnser:null,
        visited:false,
    },
    {
        quesID:"10",
        question:"Which planet in the solar system is known as the “Planet of Love”",
        options:["Venus","Mars","Earth","Jupiter"],
        crctAnswer:"Venus",
        userAnser:null,
        visited:false,
    }
];


let questionCont=document.querySelector("#actual-ques");
let optionCont=document.querySelector("#actual-option");
let btnCont=document.querySelector("#actual-btn");
let footer=document.querySelector("footer");
let previousBtn=footer.querySelectorAll("button")[0];
let nextBtn=footer.querySelectorAll("button")[1];
let saveBtn=footer.querySelectorAll("button")[2];
let submitBtn=footer.querySelectorAll("button")[3];
let index=0;

console.log(
questionCont,
optionCont,
btnCont,
footer,
previousBtn,
nextBtn,
saveBtn,
submitBtn
);

//btn creation
function btnCreation()
{
storage.forEach((e)=>
{
let btn=document.createElement("button");
btn.id=e.quesID;
btn.innerHTML=e.quesID;
btnCont.append(btn);
});
}
btnCreation()
let allBtn=btnCont.querySelectorAll("button")

//function Display
function display()
 {
questionCont.innerHTML= storage[index].question;
storage[index].visited = true;
 
   optionCont.innerHTML="";
storage[index].options.map((e)=>
{
let opt=document.createElement("input");
opt.value=e;

opt.name="option"
opt.type="radio";
let label=document.createElement("label");
label.innerHTML=e
if(storage[index].userAnser==opt.value)
{
    opt.checked=true
}
optionCont.append(opt,label)

});
allBtn.forEach((btn)=>
    {
        if(btn.id-1==index)
            {
            btn.style.backgroundColor="hotpink";
            }
    })
}
display();

//next btn
nextBtn.addEventListener("click",()=>
{   savAns();
    notsave();
    index=(index+1)%storage.length;
    display();
    legends();
})

previousBtn.addEventListener("click",()=>
    {   savAns() 
        notsave()
        index=(index-1+storage.length)%storage.length;
        display();
        legends();
    })
    
saveBtn.addEventListener("click",()=>
        {   savAns();
            notsave();
            index=(index+1)%storage.length;
            display();
            legends();
        });
         


    // let allBtn=btnCont.querySelectorAll("button")
    console.log(allBtn);
//all each btn questions
  function individualBtn() {
    allBtn.forEach((btn)=>
        {
    btn.addEventListener("click",()=>{
        notsave()
      index=btn.id-1
    display();
       
    })
    });
  }
    
  individualBtn();



  function savAns() 
  {
  
    let opt=document.querySelectorAll("input");
console.log(opt);
opt.forEach((individualOpt)=>
{
    if(individualOpt.checked)
    {
        // console.log(individualOpt.value);
        storage[index].userAnser=individualOpt.value;
        console.log(storage);
        
        allBtn.forEach((btn)=>
        {
            if(btn.id-1==index)
            {
            btn.style.backgroundColor="lightgreen";
            }
        })

    }

})
  }

//Not_Save
function notsave() {
    storage[index].visited=true;
    if(!storage[index].userAnser)
    {

       allBtn.forEach((btn)=>
    {
        if(btn.id-1==index)
            {
            btn.style.backgroundColor="plum";
            }
    })
    }
}

// for not answer and answer
function legends(){
     let legendCont = document.querySelector("#legends");
     let answer = legendCont.querySelectorAll("span")[0];
     let notAnswer =   legendCont.querySelectorAll("span")[1];
     let marked =  legendCont.querySelectorAll("span")[2];
     let notvisited = legendCont.querySelectorAll("span")[3];
     let answerCount  =  0;
     let notAnswerCount = storage.length;
     let markedCount = 0;
     let notVisitedCount =  storage.length;

     storage.map((e)=>{
            if(e.userAnser){
                 answerCount++;
                 notAnswerCount--;
            } 
            if(e.visited){
                notVisitedCount--; 
            }
            if(e.visited && !e.userAnser){
                markedCount++;
            }      
     })
     answer.innerHTML = answerCount;
     notAnswer.innerHTML = notAnswerCount;
     marked.innerHTML = markedCount;
     notvisited.innerHTML = notVisitedCount;
}
legends();

function timer(){
    let header = document.querySelector("header");
    let hr   = header.querySelectorAll("span")[0];
    let min =   header.querySelectorAll("span")[1];
    let sec =  header.querySelectorAll("span")[2];
   
    let duration = 2*60*60;

    let interval =  setInterval((e)=>{
          duration--;
          hr.innerHTML =` ${Math.floor(duration/ 3600)}`;
          min.innerHTML = `${Math.floor((duration % 3600) /60)}`;
          sec.innerHTML =  `${Math.floor((duration %3600) % 60)}` ;
          if(duration == 0){
            clearInterval(interval);
            if(conf){
                quizuser.quiz = storage;
                localStorage.setItem("quizuser", JSON.stringify(quizuser));
                details = details.filter((e)=>{
                    if(e.phone != quizuser.phone){
                     return e;   
                    }
                });
                details.push(quizuser);
                localStorage.setItem("details", JSON.stringify(details));
                 window.location.href = "./result.html";
            }
          }
     },1000);

}
timer();

submitBtn .addEventListener("click", (e)=>{
    let conf = confirm("Are you sure you want to submit?");
    if(conf){
        quizuser.quiz = storage;
        localStorage.setItem("quizuser", JSON.stringify(quizuser));
        details = details.filter((e)=>{
            if(e.phone != quizuser.phone){
            
             console.log(e);
             return e;
               
            }
        });
        details.push(quizuser);
        localStorage.setItem("details", JSON.stringify(details));
         window.location.href = "./result.html";

    }
});

};



