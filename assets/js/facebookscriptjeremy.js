//DOM ready
$(init);

function init()
{
    $('canvas').myLastFmBackground({
        width: 828 ,
        height: 315,
        imageMeasurement: "timesacross",
        imageSize: 6,
        userName: 'thementaldoctor',
        listeningPeriod: '1month',
        excludeArtists: [],
        shuffle: true
    });
}