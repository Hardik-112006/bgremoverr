let fileinput = document.getElementById("filepicker");
let innerimage = document.querySelector(".inneruploadimage")
let image = null;
let inputimage = document.getElementById("inputimage")
let icon = document.querySelector("#icon")
let span = document.querySelector("span")
let url = null;
let uploadbtn = document.querySelector("#btn")
let originalimage = document.querySelector(".resultimg1 img")
let generatedimage = document.querySelector(".resultimg2 img")
let style2 = document.querySelector(".style2")
let result = document.querySelector(".result")
let loading = document.querySelector("#loading")
let downloadbtn = document.querySelector("#download")
let resetbtn = document.querySelector("#reset")



function handleupload(){
    const formdata = new FormData();
    const Apikey = "MvRyRWJAaYNG5t7bgU7cBunH"
    formdata.append("image_file",image);
    formdata.append("size","auto");
    fetch("https://api.remove.bg/v1.0/removebg",{
       method: "POST",
    headers: { "X-Api-Key": Apikey },
    body: formdata
    })
    .then(function(response){
        return response.blob();
    })
    .then(function(blob){
        loading.style.display = "none"
        style2.style.display = "none"
        result.style.display = "flex"
        url = URL.createObjectURL(blob);
        generatedimage.src = url;
    })
    .catch()
}

innerimage.addEventListener("click",()=>{
    fileinput.click();
})

fileinput.addEventListener("change",()=>{
    image = fileinput.files[0];
    if(!fileinput)return;
    let reader = new FileReader();
    reader.onload=(e)=>{
         console.log(e)
         inputimage.src = `data:${fileinput.type};base64,${e.target.result.split(",")[1]}`
         inputimage.style.display = "block";
         icon.style.display = "none"
         span.style.display = "none"
         originalimage.src = `data:${fileinput.type};base64,${e.target.result.split(",")[1]}`

    }
    reader.readAsDataURL(image);
})

uploadbtn.addEventListener("click",()=>{
    handleupload();
    loading.style.display = "block"
})

function download(){
  fetch(url)
  .then(res=>res.blob())
  .then(file=>{
   let a = document.createElement("a");
   a.href = URL.createObjectURL(file)
   a.download = new Date().getTime();
   a.click();
  })
  .catch()
}

downloadbtn.addEventListener("click",()=>{
    download();
})

resetbtn.addEventListener("click",()=>{
    window.location.reload();
})