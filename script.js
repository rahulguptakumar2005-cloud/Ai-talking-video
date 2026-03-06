const imageUpload = document.getElementById("imageUpload");
const avatar = document.getElementById("avatar");
const mouth = document.getElementById("mouth");
const textInput = document.getElementById("text");
const downloadBtn = document.getElementById("downloadBtn");

let recorder;
let chunks = [];

imageUpload.addEventListener("change", function(){

const file = imageUpload.files[0];
avatar.src = URL.createObjectURL(file);

});

function startTalking(){

const text = textInput.value;

if(text === ""){
alert("Please write text");
return;
}

const speech = new SpeechSynthesisUtterance(text);

speech.onstart = () => {
mouth.classList.add("talking");
startRecording();
};

speech.onend = () => {
mouth.classList.remove("talking");
stopRecording();
};

speechSynthesis.speak(speech);

}

function startRecording(){

const stream = document.body.captureStream(30);

recorder = new MediaRecorder(stream);

recorder.ondataavailable = e=>{
chunks.push(e.data);
};

recorder.onstop = exportVideo;

recorder.start();

}

function stopRecording(){

recorder.stop();

}

function exportVideo(){

const blob = new Blob(chunks,{type:"video/webm"});
chunks=[];

const url = URL.createObjectURL(blob);

downloadBtn.href = url;
downloadBtn.download = "avatar-video.webm";

}
