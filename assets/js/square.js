//DOM ready
$(init);

function init()
{
    $('canvas').myLastFmBackground({
        width: 1200,
        height: 800,
        imageMeasurement: "timesacross",
        imageSize: 6,
        userName: 'jenzus',
        listeningPeriod: '1month',
        excludeArtists: [],
        shuffle: true
    });
}