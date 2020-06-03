// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/Kk8I3zFKJ/';
let model, webcam, labelContainer, maxPredictions, conceptType;
function selectType(type) {
    conceptType = type;
}
// Load the image model and setup the webcam
async function init_귀멸의칼날() {
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
async function predict_귀멸의칼날() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById('face-image');
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    switch (prediction[0].className) {
        case 'tan':
            resultMessage = '탄지로';
            break;
        case 'zen':
            resultMessage = '젠이츠';
            break;
        case 'ino':
            resultMessage = '이노스케';
            break;
    }
    $('.resultMessage').html(resultMessage);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
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
                init_귀멸의칼날().then(() => {
                    predict_귀멸의칼날();
                    $('#loading').hide();
                });
                break;
            default : 
                alert('컨셉을 선택하세요')
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
}
$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
});