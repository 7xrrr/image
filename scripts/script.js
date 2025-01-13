/// elements variables

var submitbtn = document.getElementById("submit"),
  resetbtn = document.getElementById("reset"),
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
  colorinput = document.getElementById("colorinput"),
  pelment = document.getElementsByTagName("p")[0];
/////
const form = document.querySelector('form[id="files"]'),
  filesInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");
const fileInput = document.querySelector("input");

document.addEventListener("DOMContentLoaded", () => {
  const tr = new Konva.Transformer({
    rotateEnabled: false,
  });

  /// disappear wong message
  iconcross.addEventListener("click", (event) => {
    wrongmsg.style.display = "none";
  });
  /// chek if imge url input is wrong
  submitbtn.addEventListener("click", async (clickevent) => {
    // get image info
    let imgurl = imageurlinput.value;
    let verifyImage = await verifyImageURL(imgurl);
    if (imgurl.length < 1 || verifyImage.error == false) {
      wrongmsg.style.display = "block";
      imageurlinput.style.animation += "shake2 .5s ease-in-out";
      setTimeout(() => {
        imageurlinput.style.animation = "";
      }, 500);
      setTimeout(() => {
        wrongmsg.style.display = "none";
      }, 7000);
      return;
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
    const { height, width } = calculateRation(
      verifyImage.width,
      verifyImage.height
    );

    submitbtn.style.display = "none";
    imageurlinput.style.display = "none";
    filesdiv.style.display = "none";
    pelment.style.display = "none";
    /// appear dashboard elements
    resetbtn.style.display = "block";
    toggles[0].style.display = "inline-flex";
    toggles[1].style.display = "inline-flex";
    copydiv.style.display = "flex";
    savebtn.style.display = "block";
    copytext.value = window.btoa(
      `{ "backwidth" : ${width}, "backheight" : ${height}}`
    );

    (welcomedata.backwidth = width), (welcomedata.backheight = height);
    // new kovna background image controle lib
    var stage = new Konva.Stage({
      container: "finaldiv",
      width: width,
      height: height,
      "max-width": "100%",
    });
    var layer = new Konva.Layer();
    var backimg = new Konva.Image({
      width: width,
      height: height,
      Image: verifyImage.img,
      draggable: false,
    });
    const config = stage.toJSON();
    stage.add(layer);
    layer.add(backimg);
    Konvas.Stage = stage;
    Konvas.layer = layer;
    Konvas.backimage = backimg;
  });
  /// reset btn to disappear mwelcome image and back to inputs page

  resetbtn.addEventListener("click", async (event) => {
    /// c inputs elements
    submitbtn.style.display = "block";
    imageurlinput.style.display = "block";
    filesdiv.style.display = "block";
    pelment.style.display = "block";
    /// disappear dashboard elements
    if (Usernametoggle.checked) Usernametoggle.click();
    if (Useravatartoggle.checked) Useravatartoggle.click();
    resetbtn.style.display = "none";
    toggles[0].style.display = "none";
    toggles[1].style.display = "none";
    copydiv.style.display = "none";
    savebtn.style.display = "none";

    /// destroy stage
    Konvas.Stage.destroy();
  });

  // appear (create) user avatar
  Useravatartoggle.addEventListener("change", (event) => {
    if (Useravatartoggle.checked) {
      let img = new Image();
      const originalHeight = 125;
      const originalWidth = 125;
      img.src = "https://cdn.discordapp.com/embed/avatars/0.png?size=1024";
      var usersavatar = new Konva.Image({
        width: 125,
        height: 125,
        Image: img,
        y: 0,
        x: 0,
        stroke: "black",
        draggable: false,
        offsetX: 0,
        offsetY: 0,
      });

      usersavatar.lineJoin("round");
      var group = new Konva.Group({
        clipFunc: function (ctx) {
          ctx.arc(62, 63, 60, 0, Math.PI * 2, false);
        },
        draggable: true,
        x: 0,
        y: 0,
        offsetX: 0,
        offsetY: 0,
      });

      group.add(usersavatar);
      Konvas.layer.add(group);
      Konvas.layer.add(tr);
      Konvas.avgroupe = group;
      useravatar.url = img.src;
      useravatar.height = 125;
      useravatar.width = 125;
      useravatar.avatar = usersavatar;
      useravatar.x = 68;
      useravatar.y = 67;
      (welcomedata.avawidth = useravatar.width),
        (welcomedata.avaheight = useravatar.height),
        (welcomedata.avaX = useravatar.x),
        (welcomedata.avaY = useravatar.y),
        (welcomedata.avapear = true);
      group.on("xChange", (events) => {
        // Get the original x position
        const konvaConfig = JSON.parse(Konvas.Stage.toJSON());
        const imagePath =
          konvaConfig?.children[0]?.children
            ?.find((e) => e.className === "Group")
            ?.children?.find((e) => e.className === "Image")?.attrs?.x || 0;

        // Apply scaling to adjust position (position is affected by scale)
        welcomedata.avaX =
          konvaConfig?.children[0]?.children?.find(
            (e) => e.className === "Group"
          )?.attrs?.x + imagePath || 0;
        const children = konvaConfig?.children[0]?.children;

        // Find the index of the first "Group" element
        const groupIndex = children?.findIndex((e) => e.className === "Group");

        // Look for the "Transformer" before the found "Group"
        const transformer = (
          children[groupIndex + 1]?.className === "Transformer"
        ).attrs?.x
          ? children[groupIndex + 1]
          : children[groupIndex];

        console.log(transformer);

        const x = transformer?.attrs?.x;
        welcomedata.avaX = x;
        console.log(`x: ${x}`);
        console.log(welcomedata.avaX);

        //console.log( welcomedata.avaY )
      });

      group.on("yChange", (events) => {
        const konvaConfig = JSON.parse(Konvas.Stage.toJSON());
        const imagePath =
          konvaConfig?.children[0]?.children
            ?.find((e) => e.className === "Group")
            ?.children?.find((e) => e.className === "Image")?.attrs?.y || 0;

        welcomedata.avaY =
          konvaConfig?.children[0]?.children?.find(
            (e) => e.className === "Group"
          )?.attrs?.y + imagePath || 0;

        const children = konvaConfig?.children[0]?.children;

        // Find the index of the first "Group" element
        const groupIndex = children?.findIndex((e) => e.className === "Group");

        // Look for the "Transformer" before the found "Group"
        const transformer = (
          children[groupIndex + 1]?.className === "Transformer"
        ).attrs?.y
          ? children[groupIndex + 1]
          : children[groupIndex];

        const y = transformer?.attrs?.y;
        welcomedata.avaY = y;
        console.log(`y: ${y}`);
        // console.log( welcomedata.avaY )
      });
      group.on("mouseup", (event) => {
        tr.nodes([group]);
      });
      group.on("touchstart", (event) => {
        tr.nodes([group]);
      });
      Konvas.backimage.on("mouseup", (event) => {
        tr.nodes([]);
      });
      Konvas.backimage.on("touchstart", (event) => {
        tr.nodes([]);
      });
      Konvas.layer.on("mousemove", (event) => {
        welcomedata.avawidth = originalWidth * group.attrs.scaleX;
        welcomedata.avaheight = originalHeight * group.attrs.scaleY;
      });
    } else {
      tr.nodes([]);
      Konvas.avgroupe.destroy();
      welcomedata.avapear = false;
    }
  });

  Usernamelabel.addEventListener("change", (event) => {
    if (Usernametoggle.checked) {
      welcomedata.userapear = true;
      colorpick.style.display = "flex";
      let username = new Konva.Text({
        align: "center",
        text: "User",
        fontSize: 25,
        fontStyle: "bold",
        draggable: true,
        ellipsis: true,
        x: 0,
        y: 0,
      });

      Konvas.layer.add(username);
      Konvas.layer.add(tr);
      Konvas.username = username;
      username.on("click", (e) => {
        tr.nodes([username]);
      });
      username.on("touchstart", (event) => {
        tr.nodes([username]);
      });
      Konvas.backimage.on("mouseup", (event) => {
        tr.nodes([]);
      });
      Konvas.backimage.on("touchstart", (event) => {
        tr.nodes([]);
      });
      Konvas.layer.on("mousemove", async (event) => {
        welcomedata.userY = username.getAttr("y");
        welcomedata.userX = username.getAttr("x");
        welcomedata.user_W = username.getAttr("scaleX");
        welcomedata.user_H = username.getAttr("scaleY");
        welcomedata.user_fill = username.getAttr("fill");
        welcomedata.userSize = username.getAttr("fontSize");
      });
    } else {
      tr.nodes([]);
      welcomedata.userapear = false;
      colorpick.style.display = "none";
      Konvas.username.destroy();
    }
  });
  colorinput.addEventListener("input", (event) => {
    Konvas.username.attrs.fill = colorinput.value;
    Konvas.username.draw();
  });

  savebtn.addEventListener("click", (event) => {
    copytext.value = window.btoa(JSON.stringify(welcomedata));

    document.getElementById("tetx").innerText = "Saved";
    copied.style.display = "block";
    setTimeout(() => {
      copied.style.display = "none";
    }, 3000);
  });

  function verifyImageURL(url) {
    var img = new Image();
    img.src = url;
    return new Promise((resolve, reject) => {
      img.onload = function () {
        resolve({
          error: true,
          width: this.width,
          height: this.height,
          img: img,
        });
      };
      img.onerror = function (error) {
        resolve({ error: false });
      };
    });
  }

  function calculateRation(originalWidth, originalHeight) {
    const MaxWidth = 550 > window.innerWidth ? window.innerWidth - 50 : 550;
    const MaxHeight = 350;

    const widthRatio = MaxWidth / originalWidth;
    const heightRatio = MaxHeight / originalHeight;

    if (widthRatio >= 1 && heightRatio >= 1) {
      return {
        width: originalWidth,
        height: originalHeight,
        ratio: 1,
      };
    } else {
      const ratio = Math.min(widthRatio, heightRatio);
      return {
        width: Math.round(originalWidth * ratio),
        height: Math.round(originalHeight * ratio),
        ratio,
      };
    }
  }
});

function copy(id) {
  var input = document.getElementById(id);
  input.select();
  navigator.clipboard.writeText(input.value);
  document.getElementById("tetx").innerText = "Welcome image data copied";
  copied.style.display = "block";
  setTimeout(() => {
    copied.style.display = "none";
  }, 3000);
}
