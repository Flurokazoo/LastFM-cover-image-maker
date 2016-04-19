//DOM ready
$(init);

function init()
{
    $('canvas').myLastFmBackground({
        width: screen.width,
        height: screen.height,
        imageMeasurement: "timesacross",
        imageSize: 6,
        userName: 'lenndk14',
        listeningPeriod: 'overall',
        excludeArtists: [],
        shuffle: true
    });
}