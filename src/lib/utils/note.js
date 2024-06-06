// const response = await openai.images.generate({
//   model: "dall-e-2", // default dall-e-2
//   prompt: prompt, //required
//   n: 1, //default 1
//   size: "1024x1024", //default 1024x1024
//   style: "vivid", //default vivid (other option: natural)
//   response_format: "url", //default url
// });
// if (!response) {
//   throw new Error("Request failed!");
// }
// return response.data[0].url;

//or use b64 format for the img without expiration
// response_format: 'b64_json'
// `<img src="data:image/png;base64,${response.data[0].b64_json}">`
