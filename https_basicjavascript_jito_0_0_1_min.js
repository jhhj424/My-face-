// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
// var URL = 'https://teachablemachine.withgoogle.com/models/Kk8I3zFKJ/';

var conceptType, URL
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
                URL = 'https://teachablemachine.withgoogle.com/models/Kk8I3zFKJ/';
                runModel();
                break;
            case '방탄소년단':                
                URL = 'https://teachablemachine.withgoogle.com/models/oIiRQ3XBR/';
                runModel();
                break;
            case '동물상여자':
                URL = 'https://teachablemachine.withgoogle.com/models/bB3YHn5r/';
                runModel();
                break;
            case '동물상남자':
                URL = 'https://teachablemachine.withgoogle.com/models/o9D1N5TN/';
                runModel();
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

function runModel() {
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel

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
            case "dog":
                resultMessage = "귀여운 순둥이 강아지상"
                break;
            case "cat":
                resultMessage = "츤데레 매력쟁이 고양이상"
                break;
            case "rabbit":
                resultMessage = "상큼발랄한 매력의 토끼상"
                break;
            case "deer":
                resultMessage = "온순하고 우아한 사슴상"
                break;
            case "fox":
                resultMessage = "섹시한 밀당고수 여우상"
                break;
            case "dog":
                resultMessage = "귀여운 순둥이 강아지상"
                break;
            case "cat":
                resultMessage = "츤데레 매력쟁이 고양이상"
                break;
            case "rabbit":
                resultMessage = "천진난만한 매력의 토끼상"
                break;
            case "dinosaur":
                resultMessage = "따뜻한 나쁜남자 공룡상"
                break;
            case "bear":
                resultMessage = "포근한 매력의 곰상"
                break;
            default:
                resultMessage = '알수없음';
        }
        // $('.resultMessage').html(resultMessage);
        for (var i = 0; i < maxPredictions; i++) {            
            switch (prediction[i].className) {
                case 'tan':
                    resultTitle = '카마도 탄지로';
                    break;
                case 'zen':
                    resultTitle = '아가츠마 젠이츠';
                    break;
                case 'ino':
                    resultTitle = '하시비라 이노스케';
                    break;                
                case 'Rm':
                    resultTitle = 'RM';
                    break;
                case 'Jin':
                    resultTitle = '진';
                    break;
                case 'Sugar':
                    resultTitle = '슈가';
                    break;
                case 'Jhop':
                    resultTitle = '제이홉';
                    break;
                case 'Jimin':
                    resultTitle = '지민';
                    break;
                case 'V':
                    resultTitle = '뷔';
                    break;
                case 'Junguk':
                    resultTitle = '정국';
                    break;                
                case "dog":
                    resultTitle = "귀여운 순둥이 강아지상"
                    break;
                case "cat":
                    resultTitle = "츤데레 매력쟁이 고양이상"
                    break;
                case "rabbit":
                    resultTitle = "상큼발랄한 매력의 토끼상"
                    break;
                case "deer":
                    resultTitle = "온순하고 우아한 사슴상"
                    break;
                case "fox":
                    resultTitle = "섹시한 밀당고수 여우상"
                    break;
                case "dog":
                    resultTitle = "귀여운 순둥이 강아지상"
                    break;
                case "cat":
                    resultTitle = "츤데레 매력쟁이 고양이상"
                    break;
                case "rabbit":
                    resultTitle = "천진난만한 매력의 토끼상"
                    break;
                case "dinosaur":
                    resultTitle = "따뜻한 나쁜남자 공룡상"
                    break;
                case "bear":
                    resultTitle = "포근한 매력의 곰상"
                    break;
                default:
                    resultTitle = '알수없음';
            }                    
            var classPrediction =
                resultTitle + ': ' + (prediction[i].probability.toFixed(3)*100).toFixed() +'%';
            labelContainer.childNodes[i].innerHTML = classPrediction;
            $('.resultMessage').html(resultMessage + '  ' + (prediction[0].probability.toFixed(3)*100).toFixed() + '%');
        }
    }
}

function 귀멸의칼날() {
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    // const URL = 'https://teachablemachine.withgoogle.com/models/Kk8I3zFKJ/';

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