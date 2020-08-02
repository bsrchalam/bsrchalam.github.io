

function changeYear(year) {
    loadandFilterDataAndRenderMap(year);
}


var interval; 

function togglePlayPause(altText) {
    var x = document.getElementById("playPauseInput");


    if (altText === 'play') {
        x.alt = 'pause';
        x.title = 'pause';
        x.classList.remove('playinputUrl');
        x.classList.add('pauseinputUrl');

        interval = setInterval(
            function () {
                var year = getSelectedYear();

                year = parseInt(year) + 10;
                if (year.toString() === "2110") {
                    year = "1950";
                }

                document.getElementById(year.toString()).click();

            }, 3000);


    }
    else {
        x.alt = 'play'
        x.title = 'play';
        x.classList.remove('pauseinputUrl');
        x.classList.add('playinputUrl');
        clearInterval(interval);
    }
}


function getSelectedYear() {
    var ele = document.getElementsByName('year');

    for (var i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].id;
        }
    }
}
