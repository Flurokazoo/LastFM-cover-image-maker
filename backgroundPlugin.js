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
                data: {user: settings.userName},
                success: methods.drawImage
            });
        },

        drawImage: function (data) {
            var imgSize = Math.ceil(settings.width / settings.imageSize);
            var leftover = settings.height % imgSize;
            canvas.width = settings.width;
            canvas.height = settings.height;
            var offset = imgSize - (leftover /2);
            var x = 0;
            shuffle(data);
            var y = 0 - offset;
            $.each(data, function (i, dataEntry) {
                var img = new Image();
                img.src = dataEntry.img;
                img.onload = function () {
                    ctx.drawImage(this, x, y, imgSize, imgSize);
                    if (x >= settings.width) {
                        x = 0;
                        y = y + imgSize;
                    } else {
                        console.log(settings.imageSize);
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