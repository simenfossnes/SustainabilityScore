setTimeout(readFlightElements, 20000);

var images = [
    "https://i.imgur.com/3TMbVmw.png",
    "https://i.imgur.com/lWUkFJX.png",
    "https://i.imgur.com/I6QnEa4.png"
];

function readFlightElements() {
    // get all elements
    let elements = document.getElementsByClassName('col-sm-2 sm-border-left-dashed price-per-traveller-container');

    console.log(elements);

    // render elements
    for (var item of elements) {
        
        // calculate
        var calculatedSustainabilityScore = images[(Math.floor(Math.random() * (+3 - +0)) + +0)];

        // create placeholder image
        var x = document.createElement("IMG");
        x.setAttribute("src", `${calculatedSustainabilityScore}`);
        x.setAttribute("width", "120");
        x.setAttribute("height", "80");
        x.setAttribute("style", "transform: translate(10px, -60px)");
        x.setAttribute("alt", "The Pulpit Rock");

        item.appendChild(x);
    }
}

console.log('finished');