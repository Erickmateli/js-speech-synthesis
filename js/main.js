const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

//select the text on text area to be default

msg.text = document.querySelector('[name = "text"]').value;

//use speachsynthesis function provided by the browser to enable speaking by listening to an event
function populatevoice(){
  voices  = this.getVoices();
  //made to select the languages
  const voiceOptions = voices
                  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.name})</option>`)
                  .join('');
                  voicesDropdown.innerHTML = voiceOptions;
}
function setvoice(){
  msg.voice =  voices.find(voice => voice.name === this.value);
}
function toggle() {
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}
function setoption(){
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}
speechSynthesis.addEventListener('voiceschanged',populatevoice);
voicesDropdown.addEventListener('change',setvoice);
options.forEach(option => option.addEventListener('change',setoption));
speakButton.addEventListener('click',toggle);
stopButton.addEventListener('click',function(){speechSynthesis.cancel();});
