let capture;
let BotID = 'bot941539918:AAEA-WBRpCLWYgPKokrjsdJqjoykIe2CElc'

function setup() {
  // createCanvas(480, 480);
  capture = createCapture(VIDEO);
  capture.hide();
  c = createCanvas(1280, 720);
  
}

function mouseClicked(){
  console.log(capture.get());
  // image(capture, 0, 0, width, width * capture.height / capture.width);
  image(capture.get(), 0, 0, capture.width, capture.height);
  // image(img, x, y, [width], [height])
  //tgSendMessage(BotID,'@testtp','HelloThereP5Function');
  // tgSendPhoto(BotID,'@testtp',capture.get());
  saveFrames('out', 'jpg', 0, 0, ImageSnapshot => { 
    // console.log(ImageSnapshot[0]);
   ImageData = String(ImageSnapshot[0].imageData);
    // console.log(multipartFormData(ImageData));
    tgSendPhoto(BotID,'@testtp',multipartFormData(ImageData));
  });
  
}

function draw() {

}

function tgSendMessage(tgbotToken, tgchatID, message){
    let url = 'https://api.telegram.org/'+tgbotToken+'/sendMessage?chat_id='+tgchatID+'&text='+message;
      httpGet(url, function(response) {
    // when the HTTP request completes, populate the variable that holds the
    // earthquake data used in the visualization.
    console.log(response);
  });
}

function tgSendPhoto(tgbotToken, tgchatID, imageFormData){

  let url = 'https://api.telegram.org/'+tgbotToken+'/sendMessage?chat_id='+tgchatID;
  // console.log(String(imageFormData.content));
  httpDo(
      url,
      {
        method: 'POST',
        // Other Request options, like special headers for apis
        content: imageFormData.content , //FormData
        headers: imageFormData.headers
      },
      function(res) {
        console.log(res);
      }
    );
}

//=========== Library =======================
function doHTTPGet(){
//   httpGet(path, [datatype], [data], [callback], [errorCallback])
// httpGet(path, data, [callback], [errorCallback])
// httpGet(path, callback, [errorCallback])
  //pre-installed function
  let url = 'https://api.telegram.org/bot941539918:AAEA-WBRpCLWYgPKokrjsdJqjoykIe2CElc/sendMessage?chat_id=@testtp&text=HelloFromBotandFromP5';
  httpGet(url, function(response) {
    // when the HTTP request completes, populate the variable that holds the
    // earthquake data used in the visualization.
    console.log(response);
  });
}

function doHTTPPost(){
  let url = 'https://jsonplaceholder.typicode.com/posts';
  httpPost(
    url,
    'json',
    {name: 1, title: 'HelloWorld'},
    function(result){
      console.log(result);
    }
  );
}

function doHTTPDoPost(){
  saveFrames('out', 'png', 1, 25, data => {
    //print(data);
  });
  let url = 'https://api.telegram.org/'+tgbotToken+'/sendMessage?chat_id='+tgchatID;
  console.log(data);
  httpDo(
    url,
    {
      method: 'POST',
      // Other Request options, like special headers for apis
      body: formdata ,
      headers: { authorization: 'Bearer secretKey' }
    },
    function(res) {
      earthquakes = res;
    }
  );
}

function multipartFormData (inImage) {
  var boundary = '----'+(new Date()).getTime();
  var bodyString = [];
  bodyString.push(
    '--' + boundary,
    'Content-Disposition: form-data; name="' + "file" + '";' + 'filename="' + "my_file.jpg" + '"',
	'Content-Type: ' + "image/octet-stream",
	'Content-Transfer-Encoding: base64','', //need /r/n twice here
	 inImage.substring(31) //remove the data:image/jpeg;base64,
  );  
  
  bodyString.push('--' + boundary + '--','');

  var content = bodyString.join('\r\n');
  return {
    content: content,
    headers: {
      'Content-Type': 'multipart/form-data; boundary='+boundary,
		'Content-Length': content.length
    }
  }
}
