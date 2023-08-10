var btn = document.querySelector("#toggle");

var menu1 = document.querySelector(".menu1");
var flag = 0;
btn.addEventListener("click", function () {
 if(flag==0){
    menu1.style.top = 0;
    btn.innerHTML = '<i class="ri-close-line"></i>';
   flag = 1;
 }
 else{
    menu1.style.top="-100%";
    btn.innerHTML ='<i class="ri-menu-line"></i>';
    flag = 0;
 }
});





// if (h2.style.display === "none") {
//    h2.style.display = "block";
//  } else {
//    h2.style.display = "none";
//  }
