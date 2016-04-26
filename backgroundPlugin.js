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
    //Global variables
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var $selector;

    //Methods
    var methods = {
        init: function (selector) {
            $selector = selector;
            methods.getLastFmMostPlayedAlbums()
        },

        /**
         * Makes an AJAX call to the php file which communicates with the Last.fm API
         */
        getLastFmMostPlayedAlbums: function () {
            $.ajax({
                dataType: "json",
                url: 'GetLastFmData.php',
                data: {user: settings.userName, period: settings.listeningPeriod},
                success: methods.setupImages
            });
        },

        /**
         * Sets everything in motion to draw all images on canvas (this includes arranging data in an array and an
         * image loader)
         * @param data
         */
        setupImages: function (data) {
            console.log(data);
            var imgSize = Math.ceil(settings.width / settings.imageSize);
            var yCount = settings.height / imgSize;
            if (yCount != parseInt(yCount, 10)) {
                yCount = Math.floor(yCount) + 2;
            }
            var dataArray = [];
            var arrayLength = (yCount * settings.imageSize);
            var entryCount = 0;
            for (i = 0; i < arrayLength; i++) {
                if (data[i]) {
                    entryCount++;
                    dataArray[i] = data[i];
                } else {
                    dataArray[i] = dataArray[i - entryCount];
                }
            }
            shuffle(dataArray);
            var images = [];
            var loadedImages = 0;
            $.each(dataArray, function (i, dataEntry) {
                images[i] = new Image();
                images[i].src = dataEntry.img;
                images[i].onload = function () {
                    if (++loadedImages >= dataArray.length - 1) {
                        methods.drawLoadedImages(images, imgSize);
                    }
                };
            });
        },

        /**
         * Draws the images on the canvas
         * @param images
         * @param imgSize
         */
        drawLoadedImages: function (images, imgSize) {
            //Sets the height and width to the user's height and width
            canvas.width = settings.width;
            canvas.height = settings.height;
            //Calculates how much rest space is left at the top and bottom of the screen after filling the screen with
            //whole images
            var leftover = settings.height % imgSize;
            //Divides the offset so that there's an equal amount of space at the top and bottom
            var offset = imgSize - (leftover / 2);
            //Declares our x and y variables which determine the location of the image
            var x = 0;
            var y;
            //Sets y to zero if images can fit across the y axis so none of the images fall off
            if (offset == imgSize) {
                y = 0;
            } else {
                y = 0 - offset;
            }
            //Draws the images on the screen
            $.each(images, function (i, img) {
                ctx.drawImage(img, x, y, imgSize, imgSize);
                //Determines if next image should come on the next row
                if (x >= settings.width - imgSize) {
                    x = 0;
                    y = y + imgSize;
                } else {
                    x = x + imgSize;
                }
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