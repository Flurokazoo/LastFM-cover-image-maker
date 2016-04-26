(function ($) {
    //Default settings
    var settings = {
        width: screen.width,
        height: screen.height,
        imageMeasurement: "timesacross",
        imageSize: 6,
        userName: 'japperman',
        listeningPeriod: 'overall',
        excludeArtists: [],
        shuffle: true
    };
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var $selector;

    //Methods
    var methods = {
        init: function (selector) {
            $selector = selector;
            console.log(this);
            methods.getLastFmMostPlayedAlbums()
        },

        getLastFmMostPlayedAlbums: function () {
            $.ajax({
                dataType: "json",
                url: 'GetLastFmData.php',
                data: {user: settings.userName, period: settings.listeningPeriod},
                success: methods.drawImage
            });
        },

        drawImage: function (data) {
            var imgSize = Math.ceil(settings.width / settings.imageSize);
            var yCount = settings.height / imgSize;

            if (yCount != parseInt(yCount, 10)) {
                yCount = Math.floor(yCount) + 2;
            }

            var dataArray = [];
            var arrayLength = (yCount * settings.imageSize);
            console.log(arrayLength + " is arrayLength");
            var x = 0;
            var y;


            for (i = 0; i < arrayLength; i++) {
                dataArray[i] = data[i];
            }

            var leftover = settings.height % imgSize;
            canvas.width = settings.width;
            canvas.height = settings.height;
            var offset = imgSize - (leftover / 2);

            shuffle(dataArray);

            if (offset == imgSize) {
                y = 0;
            } else {
                y = 0 - offset;
            }
            console.log(imgSize + " is imagesize");
            console.log(dataArray);
            $.each(dataArray, function (i, dataEntry) {
                var img = new Image();
                console.log(dataEntry);
                img.src = dataEntry.img;
                img.onload = function () {
                    ctx.drawImage(this, x, y, imgSize, imgSize);
                    console.log(x + "x" + y + "y");
                    if (x >= settings.width - imgSize) {
                        x = 0;
                        y = y + imgSize;
                    } else {
                        x = x + imgSize;
                    }

                };
            });
        }

    };
    $.fn.myLastFmBackground = function (options) {
        //If additional options are given, it will override existing options
        if (options) {
            settings = $.extend(settings, options);
        }
        //Initializes the plugin with the set scope
        methods.init(this);

        //Return this for jQuery chaining
        return this;
    };

})(jQuery);