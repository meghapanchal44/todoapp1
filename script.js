let text=document.getElementById("myInput");
let btn=document.getElementById("add_button");
let result=document.getElementById("result");
let cont=document.getElementById("myUl");
let array=[];
let markArray=[];
if(array.length==0);
{
    result.innerHTML='<h4 class="white">nothing to show</h4>';
}
showElement();
btn.addEventListener('click',()=>{
    if(text.value.trim()=== ""){
        alert("please enter something");
    }
    else{
        let tasks=localStorage.getItem("tasks");
        if(tasks==null){
            array=[];
        }
        else{
            array=JSON.parse(tasks);
        }
        array.push(text.value);
        localStorage.setItem("tasks",JSON.stringify(array));
        text.value=" ";
        showElement();
    }

});
text.addEventListener('keyup',(event)=>{
    if(event.keyCode ===13){
        event.preventDefault();
        btn.click();
    }
});
function showElement(){
    let tasks=localStorage.getItem("tasks");
    if(tasks == null)
    {
        array=[];
    }
    else{
        array=JSON.parse(tasks);
    }
   
    let html="";
    array.forEach((element,index) => {
        html +=`<div id="elem" class="elem${index}">
        <div id="${index}" class="col store">${element}</div>
        
        <div class="col">
        <button id="btn2" onclick="editdiv(${index})" class="btn btn2 btn-info"> <i class="fa fa-pencil"></i></button> 
        
        <button id="btn3" onclick="delettask(${index})" class="btn btn3 btn-info"><i class="fa fa-trash"></i></button>
        </div></div>`;
        //<h2 class="white remove">${index+1}</h2>`;
        console.log(html);
        
    });
    let checks=localStorage.getItem("checks");
    if(checks==null)
    {
        markArray=[];
    }
    else{
        markArray=JSON.parse(checks);

    }
    for(let i=0;i<array.length;i++)
    {
        markArray.push('none');
    }
    localStorage.setItem("checks",JSON.stringify(markArray));
    if(array.length != 0)
    {
        result.innerHTML=html;
    }
    else{
        result.innerHTML='<h4 class="white">nothing to show</h4>';  
    }
    for(let i=0;i<markArray.length;i++)
    {
        let checkboxvar= document.getElementById(`$cd{i}`); 
        if(markArray[i]=='line-through'){
            markTask(i);
            checkboxvar.checked=true;
        }
    }
};
function delettask(index){
    if(confirm("you want to delete task")){
        let tasks=localStorage.getItem("tasks")
        if(tasks==null)
        {
            markArray=[];
        }
        else{
            markArray=JSON.parse(tasks);
        }
        array.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(array));
        let checks=localStorage.getItem("checks");
        if(checks==null){
            markArray=[];
        }
        else{
            markArray=JSON.parse(checks);
        }
        array.splice(index,1);
        localStorage.setItem("checks",JSON.stringify(markArray));
        showElement();
    }
}
function markTask(index){
    let store = document.getElementById(`${index}`);
    if(store.style.textDecoration === "none"){
        store.style.textDecoration="line-through";
        let checks=localStorage.getItem("checks");
        if(checks==null){
            markArray=[];
        }
        else{
            markArray=JSON.parse(checks);
        }
        markArray.splice(index,1,store.style.textDecoration);
        localStorage.setItem("checks",JSON.stringify(markArray));
        //showElement();
    }
    else{
        store.style.textDecoration="none";
        let checks=localStorage.getItem("checks");
        if(checks==null)
        {
            markArray=[];
        }
        else{
            markArray=JSON.parse(checks);
        }
        markArray.splice(index,1,store.style.textDecoration);
            localStorage.setItem("checks",json.stringify(markArray));
    }

}
function editdiv(index){
    let noofTextArea = document.getElementsByClassName("textarea").length;
    let store= document.getElementById(`${index}`);
    if(noofTextArea === 0){
        let html=store.innerHTML.trim();
        store.innerHTML=`<textarea class="textarea" id="textarea" row=5>${html}</textarea>`;
    }
    let textarea=document.querySelector(".textarea");
    textarea.focus();
    textarea.addEventListener('blur',()=>{
        if(textarea.value.trim===0){
            alert("enter something");
        }
        else{
            store.innerHTML=textarea.value;
            let tasks=localStorage.getItem("tasks");
            if(tasks==null)
            {
                array=[];
            }
            else{
                array=JSON.parse(tasks);
            }
            array.splice(index,1,textarea.value);
            localStorage.setItem("tasks",JSON.stringify(array));
        }
    });

}
function deleteAll(){
    if(localStorage.tasks == null){
        alert("Nothing to delete! You can add your task.");
    }
    else{
        if(confirm("You want delete your all task?")){
            localStorage.clear();
            showElement();
        }
    }
}