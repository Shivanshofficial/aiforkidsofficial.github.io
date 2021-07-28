// FUNCTIONS
//////////////////////////////////////......................//////////////////////////////

// DARK MODE

var theme_switch_icon = document.getElementById("theme_switch_icon");


if (localStorage.getItem("theme") == null ) {
  localStorage.setItem("theme", "light");
}

let localData = localStorage.getItem("theme");
console.log(localData);

if(localData == "light")
{
  theme_switch_icon.src = "/images/moon.png";
  document.body.classList.remove("dark-theme");
}
else if(localData == "dark")
{
  theme_switch_icon.src = "/images/sun.png";
  document.body.classList.add("dark-theme");
}


  theme_switch_icon.onclick = function(){
    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme"))
    {
      
      theme_switch_icon.src = "/images/sun.png"
      localStorage.setItem("theme","dark")

    }else{
      theme_switch_icon.src = "/images/moon.png"
      localStorage.setItem("theme", "light");
    }
  }

// ANCHOR JS
// anchors.options'
anchors.options.visible = 'always';
anchors.options.class = 'icon-grunticon-link';
anchors.add("h1")
anchors.add("h2")
anchors.add(".anchor")
anchors.remove(".no-anchor")

// Header Selector 

// let el = $('.switch');
// let cur = el.find('.current');
// let options = el.find('.options li');
// let content = $('main.content');

// Open language dropdown panel

// el.on('click', function(e) {
//   el.addClass('show-options');
  
//   setTimeout(function() {
//     el.addClass('anim-options');
//   }, 50);
  
//   setTimeout(function() {
//     el.addClass('show-shadow');
//   }, 200);
// });


// Close language dropdown panel

// options.on('click', function(e) {
//   e.stopPropagation();
//   el.removeClass('anim-options');
//   el.removeClass('show-shadow');
  
//   let newLang = $(this).data('lang');
  
//   cur.find('span').text(newLang);
//   content.attr('class', newLang);
  
//   setLang(newLang);
  
//   options.removeClass('selected');
//   $(this).addClass('selected');
  
//   setTimeout(function() {
//     el.removeClass('show-options');
//   }, 600);
// });


// Save selected options into Local Storage

// function getLang() {
//   let lang;
//   if (localStorage.getItem('currentLang') === null) {
//     lang = cur.find('span').text();
//   } else {
//     lang = JSON.parse(localStorage.getItem('currentLang')).toLowerCase();
//   }
  

//   cur.find('span').text(lang);
//   options.parent().find(`li[data-lang="${lang}"]`).addClass('selected');
  
//   content.attr('class', lang);
// }

// getLang();

// function setLang(newLang) {
//     localStorage.setItem('currentLang', JSON.stringify(newLang).toLowerCase());
  
//   content.attr('class', newLang);
  
// }

// $(document).ready(function(){
//   $(".testimonial .indicators li").click(function(){
//     var i = $(this).index();
//     var targetElement = $(".testimonial .tabs li");
//     targetElement.eq(i).addClass('active');
//     targetElement.not(targetElement[i]).removeClass('active');
//             });
//             $(".testimonial .tabs li").click(function(){
//                 var targetElement = $(".testimonial .tabs li");
//                 targetElement.addClass('active');
//                 targetElement.not($(this)).removeClass('active');
//             });
//         });
// $(document).ready(function(){
//     $(".slider .swiper-pagination span").each(function(i){
//         $(this).text(i+1).prepend("0");
//     });
// });

//////////////////////////////////////////////////////////////////
// faq

const btns = document.querySelectorAll(".acc-btn");

// fn
function accordion() {
  // this = the btn | icon & bg changed
  this.classList.toggle("is-open");

  // the acc-content
  const content = this.nextElementSibling;

  // IF open, close | else open
  if (content.style.maxHeight) content.style.maxHeight = null;
  else content.style.maxHeight = content.scrollHeight + "px";
}

// event
btns.forEach((el) => el.addEventListener("click", accordion));


///////////////////////////////////////////////////////////////////////////////
// Hugo Copy btn
function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
  addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(":last-child > pre > code").innerText;
  try {
    result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    }
  } catch (_) {
    copyCodeBlockExecCommand(codeToCopy, highlightDiv);
  }
  finally {
    codeWasCopied(button);
  }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = 'true'
  textArea.readOnly = 'false'
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange()
  range.selectNodeContents(textArea)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
  textArea.setSelectionRange(0, 999999)
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function() {
    button.innerText = "Copy";
  }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
  const wrapper = document.createElement("div");
  wrapper.className = "highlight-wrapper";
  highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
  wrapper.appendChild(highlightDiv);
}

document.querySelectorAll(".highlight")
  .forEach(highlightDiv => createCopyButton(highlightDiv));

  
$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
  } else {
      $('#back-to-top').fadeOut();
  }
});
// scroll body to 0px on click
$('#back-to-top').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 400);
  return false;
});

function menuToggle() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}