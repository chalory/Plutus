VanillaTilt.init(document.querySelector("#card"), {
    max: 30,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    perspective: 1000
});

document.getElementById("card").onmousemove = (e) => {
    document.getElementById("shadow").style.transform = document.getElementById(
        "card"
    ).style.transform;
    document.getElementById("glare").style.background = `
     linear-gradient(${e.clientX}deg, rgba(127,127,127,1) 17%, rgba(57,91,100,0) 100%)`;
};
