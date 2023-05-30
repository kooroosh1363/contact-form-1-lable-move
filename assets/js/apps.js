const inputs= document.querySelectorAll(".one-input");


function funcFocus(){
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function funcBlur(){
    let parent = this.parentNode;
    if(this.value ==""){
        parent.classList.remove("focus");
    }
    
}

inputs.forEach((input) => {
    input.addEventListener("focus", funcFocus);
    input.addEventListener("blur", funcBlur);
});