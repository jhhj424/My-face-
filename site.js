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