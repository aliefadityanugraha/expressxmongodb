const btnRead = document.getElementById("btnReadMore");

btnRead.addEventListener('click',function(){
  readMore();
});

function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnRead = document.getElementById("btnReadMore");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnRead.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnRead.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}