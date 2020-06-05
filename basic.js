// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
// var URL = 'https://teachablemachine.withgoogle.com/models/Kk8I3zFKJ/';


var conceptType
function selectType(val) {
    conceptType = val
    $('#dropText').text(val)
    removeUpload();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            // $('.image-title').html(input.files[0].name);
            $('.image-title').html('다시하기');
        };
        reader.readAsDataURL(input.files[0]);
        switch (conceptType) {
            case '귀멸의칼날':
                귀멸의칼날();
                break;
            case '방탄소년단':
                방탄소년단();
                break;
            default:
                alert('컨셉을 선택하세요');
                location.reload(true);
        }
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    $('#label-container').children().remove();
    $('.resultMessage').html('');
}
$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
});

function 귀멸의칼날() {
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = 'https://teachablemachine.withgoogle.com/models/Kk8I3zFKJ/';

    let model, webcam, labelContainer, maxPredictions;

    init().then(() => {
        predict();
        $('#loading').hide();
    });

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById('label-container');
        for (let i = 0; i < maxPredictions; i++) {
            // and class labels
            labelContainer.appendChild(document.createElement('div'));
        }
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        var image = document.getElementById('face-image');
        var prediction = await model.predict(image, false);
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        switch (prediction[0].className) {
            case 'tan':
                resultMessage = '카마도 탄지로';
                break;
            case 'zen':
                resultMessage = '아가츠마 젠이츠';
                break;
            case 'ino':
                resultMessage = '하시비라 이노스케';
                break;
            default:
                resultMessage = '없음';
        }
        $('.resultMessage').html(resultMessage);
        for (var i = 0; i < maxPredictions; i++) {
            var classPrediction =
                prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
}

function 방탄소년단() {
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = 'https://teachablemachine.withgoogle.com/models/oIiRQ3XBR/';

    let model, webcam, labelContainer, maxPredictions;

    init().then(() => {
        predict();
        $('#loading').hide();
    });

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById('label-container');
        for (let i = 0; i < maxPredictions; i++) {
            // and class labels
            labelContainer.appendChild(document.createElement('div'));
        }
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        var image = document.getElementById('face-image');
        var prediction = await model.predict(image, false);
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        switch (prediction[0].className) {
            case 'Rm':
                resultMessage = 'RM';
                break;
            case 'Jin':
                resultMessage = '진';
                break;
            case 'Sugar':
                resultMessage = '슈가';
                break;
            case 'Jhop':
                resultMessage = '제이홉';
                break;
            case 'Jimin':
                resultMessage = '지민';
                break;
            case 'V':
                resultMessage = '뷔';
                break;
            case 'Junguk':
                resultMessage = '정국';
                break;
            default:
                resultMessage = '없음';
        }
        $('.resultMessage').html(resultMessage);
        for (var i = 0; i < maxPredictions; i++) {
            var classPrediction =
                prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
}