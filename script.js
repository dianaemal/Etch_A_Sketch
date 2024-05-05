var div = document.getElementById("container");
var resize = document.getElementById("resize");
var rainbow = document.getElementById("rainbow");
var deFault =  document.getElementById("default");
var shadow =  document.getElementById("Shadow");

var number = 16;
var israinbow = false;
var isShadow = false;

//the grid function takes 3 parameters: the number of grids, the colorFunction that determains whether the mode
//-is default or rainbow, the opacity function which is called when the shadow mode is on.
function grid(number=16, colorFunction = ()=> "black", opaCity = ()=> 1)
{
    //to make a new grid everytime the function is called
    div.innerHTML = "";
   
    for (var i = 0; i < number; i++) {
       
        newRow = document.createElement("div"); 
        newRow.classList.add("row");
        
        div.appendChild(newRow); 
       
        for (var j = 0; j < number; j++) {        
            var newDiv = document.createElement("div");
            
            newDiv.classList.add("col"); 
            newRow.appendChild(newDiv); 
           
            //Add an eventlistener to each div
            newDiv.addEventListener("mouseover", function(){
                // this refers to the HTML element that received the event
                this.style.backgroundColor = colorFunction();
                this.style.border = "1px solid white";
                this.style.opacity = opaCity(this);
                
            });
                
                
        }
    }

}
grid()


function opacity(element) {
    //When the function is called in rainbow mode, the opacity for-
    //-each div will start with 0.1 and go up to 0.9 with every hover
    if (element.style.opacity <= 0.9) {
       
        element.style.opacity =+ element.style.opacity + 0.1;
        console.log(element.style.opacity)
    }
}

function rainBow()
{
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}
resize.addEventListener("click", function(){
    //ask the user for a grid size
    var size = prompt("Write a grid size from 1 to 100: ")
    if (size > 0 && size <= 100) 
    {
       
        number = size;
        //if the mode is not rainbow and shadow then the default grid will be created with new size
        if(!israinbow && !isShadow){
            grid(number);
        }
        //if the mode is rainbow then the new grid created must remain in rainbow mode
        else if(israinbow){
            grid(number, rainBow);
        }
        //if the mode is shadow then it should remain shadow even after resizing
        else{
            grid(number, ()=> "black", opacity );
        }
        
        
    }
    else{
        alert("Please enter a number between 1 and 100.")
    }
   
})
rainbow.addEventListener("click", function(){
    grid(number, rainBow)
    israinbow = true;
    isShadow = false;
   
})
deFault.addEventListener("click", function(){
    isShadow = false;
    israinbow = false;
    grid(number, ()=> "black")
   
})
shadow.addEventListener("click", function(){
    isShadow = true;
    israinbow = false;
    grid(number, ()=> "black", opacity)
})




