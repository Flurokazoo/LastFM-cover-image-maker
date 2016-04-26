//DOM ready
$(init);

function init()
{
    $('canvas').myLastFmBackground({
        width: screen.width,
        height: screen.height,
        imageMeasurement: "timesacross",
        imageSize: 6,
        userName: 'antwanvdm',
        listeningPeriod: '1month',
        excludeArtists: [],
        shuffle: true
    });
}