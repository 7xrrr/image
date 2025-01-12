/// avatar info variables
var backgroundimg = {width  : null, height: null , url: null},
    useravatar    = {width  : null, height: null , x : null ,y:null , url: null , avatar : null},
    username      = {width  : null, height: null , x : null ,y:null , url: null},
    Konvas   = {Stage  : null, layer : null , backimage : null, useravatar : null , avgroupe : null, username : null }
    welcomedata = {backwidth : null,backheight : null ,avawidth :  null , avaheight :  null , avaX :  null ,avaY : null  ,userY : null,userX : null,user_W : null,user_H : null, user_fill : null , userSize : null,userapear : false, avapear : false}
/// elements variables

var submitbtn = document.getElementById("submit"),
    resetbtn = document.getElementById('reset'),
    savebtn = document.getElementById("save"),
    imageurlinput = document.getElementById("imageurl"),
    filesform = document.getElementById("files"),
    filesdiv = document.getElementById("filesdiv"),
    wrongmsg = document.getElementById("wrongmsg"),
    copied = document.getElementById("copied"),
    toggles = document.getElementsByClassName("toggle"),
    Usernametoggle = document.getElementById("Usernametoggle"),
    Useravatartoggle = document.getElementById("Useravatartoggle"),
    Usernamelabel = document.getElementById("Usernamelabel"),
    Useravatarlabel = document.getElementById("Useravatarlabel"),
    dashinfo = document.getElementById("results"),
    iconcross = document.getElementsByClassName("icon cross")[0],
    copydiv = document.getElementsByClassName("copydiv")[0],
    copytext = document.getElementById("copytext"),
    colorpick = document.getElementById("colorspick"),
    colorinput = document.getElementById('colorinput'),
    pelment = document.getElementsByTagName("p")[0];
/////
const form = document.querySelector("form[id=\"files\"]"),
filesInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");
const fileInput = document.querySelector("input");
/// disappear wong message 
iconcross.addEventListener("click" , (event) => {wrongmsg.style.display="none"})
/// chek if imge url input is wrong
submitbtn.addEventListener("click" , async (clickevent)=>{
    // get image info
    let imgurl = imageurlinput.value
    let verifyImage = await verifyImageURL(imgurl)
    if(imgurl.length < 1   || verifyImage.error == false) {
    wrongmsg.style.display="block"
    imageurlinput.style.animation += "shake2 .5s ease-in-out"
    setTimeout(() => {
    imageurlinput.style.animation = ""
    }, 500);
    setTimeout(() => {
    wrongmsg.style.display="none"
    }, 7000);
    return
}
//cheking image width & height is more than 500
/*
    if(verifyImage.width > 500 || verifyImage.height > 500) {
    let lenght = verifyImage.height
    if(verifyImage.width > verifyImage.height)lenght = verifyImage.width
    let Percentage = 1 - (((lenght) - 500) / (lenght))
    if(verifyImage.width > 500) verifyImage.width = verifyImage.width * Percentage
    if( verifyImage.height > 500) verifyImage.height = verifyImage.height * Percentage
    }*/
    /// c inputs elements 
    submitbtn.style.display = "none"
    imageurlinput.style.display = "none"
    filesdiv.style.display = "none"
    pelment.style.display = "none"
    /// appear dashboard elements 
    resetbtn.style.display = "block"
    toggles[0].style.display = "inline-flex"
    toggles[1].style.display = "inline-flex"
    copydiv.style.display = "flex"
    savebtn.style.display = "block"
    copytext.value = `{ "backwidth" : ${verifyImage.width}, "backheight" : ${verifyImage.height}}`
    welcomedata.backwidth = verifyImage.width,
    welcomedata.backheight = verifyImage.height 
    // new kovna background image controle lib
    var stage = new Konva.Stage({
        container: 'finaldiv',
        width: verifyImage.width,
        height: verifyImage.height,
        "max-width" : "100%",
    });
    var layer = new Konva.Layer();
    var backimg = new Konva.Image({
        width: verifyImage.width,
        height: verifyImage.height,
        Image : verifyImage.img,
        draggable : false
    });
    stage.add(layer)
    layer.add(backimg);   
    Konvas.Stage = stage
    Konvas.layer = layer
    Konvas.backimage = backimg
    
})
/// reset btn to disappear mwelcome image and back to inputs page

resetbtn.addEventListener("click" ,async (event) => {
      /// c inputs elements 
      submitbtn.style.display = "block"
      imageurlinput.style.display = "block"
      filesdiv.style.display = "block"
      pelment.style.display = "block"
      /// disappear dashboard elements 
      if(Usernametoggle.checked) Usernametoggle.click()
      if(Useravatartoggle.checked) Useravatartoggle.click()
      resetbtn.style.display = "none"
      toggles[0].style.display = "none"
      toggles[1].style.display = "none"
      copydiv.style.display = "none"
      savebtn.style.display = "none"

      /// destroy stage
      Konvas.Stage.destroy()
})

//// appear (create) user avatar 
Useravatartoggle.addEventListener("change" , (event)=>{
    if(Useravatartoggle.checked) { 
        let img = new Image()
                img.src= "https://cdn.discordapp.com/embed/avatars/0.png?size=1024"
                var usersavatar = new Konva.Image({
                    width: 125,
                    height: 125,
                    Image : img,
                    y :67,
                    x :68,
                    stroke: 'black',
                    draggable : false
                });
                var tr = new Konva.Transformer({
                    rotateEnabled : false
                  });
                usersavatar.lineJoin('round');
                var group = new Konva.Group({
                    clipFunc: function(ctx) {
                      ctx.arc(130 , 130, 60, 0, Math.PI * 2, false);
                    },
                    draggable : true
                  });
                  group.add(usersavatar)
                  Konvas.layer.add(group);
                  Konvas.layer.add(tr);
                  Konvas.avgroupe = group
                  useravatar.url = img.src
                  useravatar.height = 125
                  useravatar.width = 125
                  useravatar.avatar = usersavatar
                  useravatar.x = 68
                  useravatar.y = 67
                  welcomedata.avawidth =  useravatar.width ,
                  welcomedata. avaheight =  useravatar.height , 
                  welcomedata.avaX =  useravatar.x ,
                  welcomedata.avaY = useravatar.y ,
                  welcomedata.avapear = true
                  group.on("xChange" , (events) => {
                    welcomedata.avaX = (events.currentTarget.attrs.x + (60 * events.currentTarget.attrs.scaleX))
                })
                  group.on("yChange" , (events) => {
                    welcomedata.avaY = (events.currentTarget.attrs.y + (60 * events.currentTarget.attrs.scaleY))
                })  
                group.on("mouseup" , (event)=>{
                tr.nodes([group])
                })
                Konvas.backimage.on("mouseup" , (event)=>{
                    tr.nodes([])
                })
                Konvas.layer.on("mousemove" , (event)=> {
                welcomedata.avaheight =  group.attrs.scaleY
                welcomedata.avawidth = group.attrs.scaleX
            })
    } else {
        Konvas.avgroupe.destroy()
        welcomedata.avapear = false
    }
})

Usernamelabel.addEventListener("change" , (event) => {
    if(Usernametoggle.checked) { 
    welcomedata.userapear = true
    colorpick.style.display = "flex"
    let username = new Konva.Text({
        align: 'center',
        text:"User",
      fontSize: 25,
      fontStyle : "bold",
      draggable : true,
      ellipsis : true,
      })     
       var tr = new Konva.Transformer({
        rotateEnabled : false
      });
      Konvas.layer.add(username)
      Konvas.layer.add(tr)
      Konvas.username = username
      username.on("click" , (e) => {
        tr.nodes([username]);
      })
      Konvas.backimage.on("mouseup" , (event)=>{
        tr.nodes([])
    })
    Konvas.layer.on("mousemove" , async (event) => {
        welcomedata.userY     = username.getAttr('y')
        welcomedata.userX     = username.getAttr('x')
        welcomedata.user_W    = username.getAttr('scaleX')
        welcomedata.user_H    = username.getAttr('scaleY')
        welcomedata.user_fill = username.getAttr('fill')
        welcomedata.userSize  = username.getAttr('fontSize')
      })
    } else {
        welcomedata.userapear = false
        colorpick.style.display = "none"
        Konvas.username.destroy()
    }
})
colorinput.addEventListener("input" , (event)=> {
    Konvas.username.attrs.fill =  colorinput.value
  })


  savebtn.addEventListener("click" , (event) => {
    console.log(welcomedata)
    copytext.value = JSON.stringify(welcomedata)
    document.getElementById("tetx").innerText = "Saved"
    copied.style.display = "block"
    setTimeout(() => {
    copied.style.display = "none"
    }, 3000);
    })













function copy(id){
    var input= document.getElementById(id);
    input.select();
    navigator.clipboard.writeText(btoa(input.value));
    document.getElementById("tetx").innerText = "Welcome image data copied"
    copied.style.display = "block"
    setTimeout(() => {
    copied.style.display = "none"
    }, 3000);
    
}

function verifyImageURL(url) {
    var img = new Image();
    img.src = url;
    return new Promise((resolve, reject) => {
    img.onload = function () {  
        resolve({error : true, width : this.width , height :  this.height , img : img})
    };
    img.onerror = function (error) {
        resolve({error : false});
    };
})
}

