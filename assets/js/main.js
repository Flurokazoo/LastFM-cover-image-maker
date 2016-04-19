$(init);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = screen.width;
var height = screen.height;
var imgSize = Math.ceil(width / 6);
var leftover = height % imgSize;
console.log('leftover space: ' +leftover);
console.log('image size: '+ imgSize);
console.log('height: '+ height);

function init() {
    getLastFmMostPlayedAlbums()
}

function getLastFmMostPlayedAlbums() {
    $.ajax({
        dataType: "json",
        url: 'GetLastFmData.php',
        data: {user: "japperman"},
        success: drawImage
    });
}

function drawImage(data) {

    canvas.width = width;
    canvas.height = height;
    var offset = imgSize - (leftover /2);
    console.log(imgSize);
    var x = 0;
    shuffle(data);
    var y = 0 - offset;
    $.each(data, function (i, dataEntry) {
        var img = new Image();
        img.src = dataEntry.img;
        img.onload = function () {
            ctx.drawImage(this, x, y, imgSize, imgSize);
            if (x >= width) {
                x = 0;
                y = y + imgSize;
            } else {
                x = x + imgSize;
            }
        };
    });
}
