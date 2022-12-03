// VanillaTilt.init(document.querySelector("#card"), {
//     max: 30,
//     speed: 400,
//     glare: true,
//     "max-glare": 0.5,
//     perspective: 1000,
// });

// document.getElementById("card").onmousemove = e => {
//     document.getElementById("shadow").style.transform =
//         document.getElementById("card").style.transform;
//     document.getElementById("glare").style.background = `
//      linear-gradient(${e.clientX}deg, rgba(127,127,127,1) 17%, rgba(57,91,100,0) 100%)`;
// };

const wordsForm = document.querySelector(".words-form");
const dropZone = document.querySelector("#dropZone");
const animalsContainer = document.querySelector("#animals");
const animals = document.querySelectorAll(".animal-img");
const dropBoxes = document.querySelectorAll(".drop-box");
const draggableItemsList = document.getElementById("draggableItemsList");

// function appendList(e) {
//     e.preventDefault();
//     let liElement = document.createElement("li");
//     let pElement = document.createElement("p");
//     pElement.textContent = thoughtInput.value;
//     pElement.draggable = "true";
//     pElement.id = thoughtInput.value;
//     pElement.addEventListener("dragstart", e => {
//         console.log(e.target);
//         drag(e);
//     });

//     liElement.appendChild(pElement);
//     draggableItemsList.appendChild(liElement);
//     thoughtInput.value = "";
// }

if (dropZone) {
    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        console.log(event.target.id);
        event.dataTransfer.setData("text", event.target.id);
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    }
}

(function ($) {
    $(document).ready(function () {
        var s = $(".slider"),
            sWrapper = s.find(".slider-wrapper"),
            sItem = s.find(".slide"),
            btn = s.find(".slider-link"),
            sWidth = sItem.width(),
            sCount = sItem.length,
            slide_date = s.find(".slide-date"),
            slide_title = s.find(".slide-title"),
            slide_text = s.find(".slide-text"),
            slide_more = s.find(".slide-more"),
            slide_image = s.find(".slide-image img"),
            sTotalWidth = sCount * sWidth;

        sWrapper.css("width", sTotalWidth);
        sWrapper.css("width", sTotalWidth);

        var clickCount = 0;

        btn.on("click", function (e) {
            e.preventDefault();

            if ($(this).hasClass("next")) {
                clickCount < sCount - 1 ? clickCount++ : (clickCount = 0);
            } else if ($(this).hasClass("prev")) {
                clickCount > 0 ? clickCount-- : (clickCount = sCount - 1);
            }
            TweenMax.to(sWrapper, 0.4, { x: "-" + sWidth * clickCount });

            //CONTENT ANIMATIONS

            var fromProperties = { autoAlpha: 0, x: "-50", y: "-10" };
            var toProperties = { autoAlpha: 0.8, x: "0", y: "0" };

            TweenLite.fromTo(slide_image, 1, { autoAlpha: 0, y: "40" }, { autoAlpha: 1, y: "0" });
            TweenLite.fromTo(slide_date, 0.4, fromProperties, toProperties);
            TweenLite.fromTo(slide_title, 0.6, fromProperties, toProperties);
            TweenLite.fromTo(slide_text, 0.8, fromProperties, toProperties);
            TweenLite.fromTo(slide_more, 1, fromProperties, toProperties);
        });
    });
})(jQuery);

$(".overlay").addClass("overlay-blue");
