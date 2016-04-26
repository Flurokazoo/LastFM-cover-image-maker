//DOM ready
$(init);

function init()
{
    $('canvas').myLastFmBackground({
        width: 2200,
        height: 900,
        imageMeasurement: "timesacross",
        imageSize: 2,
        userName: 'japperman',
        listeningPeriod: 'overall',
        excludeArtists: [],
        shuffle: true
    });
}