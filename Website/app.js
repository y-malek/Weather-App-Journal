/* Global Variables */
const API_ROOT = "http://localhost:3000";

const API_KEY = "1035f0d69ee273f1d3a92d4a10ebbb6e";
const zipCodeInput = document.getElementById("zip");
const feelingInput = document.getElementById("feelings");

const dateElemnet = document.getElementById("date");
const tempElemnet = document.getElementById("temp");
const contentElemnet = document.getElementById("content");
// Create a new date instance dynamically with JS
const generateDate = () => {
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  return newDate;
};
const catchError = (error) => console.error("Some ErrorHas Been => ", error);

// Generate Button 
document.getElementById("generate").addEventListener("click", onGenerate);

/** Post Data To API */
async function onGenerate() {
  let data = {
    zipCode: zipCodeInput.value,
    content: feelingInput.value,
    date: generateDate(),
  };

  //Post Data To Api For Get Zip Code Information
  fetchWeatherData(data.zipCode)
    .then((zipInfo) => {
      // Return And Show Alert If City Is Not Found
      if (zipInfo.cod != 200) return alert(zipInfo.message);

      // Now Post Data To Server For Saving And Display In Holder Section
      data.temp = zipInfo.main.temp;
      postWeatherEntry(data);
    })
    .catch(catchError);
}

/** Get Zip Code Information From Api */
async function fetchWeatherData(zipCode) {
  return await (
    await fetch(
      `https:/api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${API_KEY}`
    )
  ).json();
}

/** Post Data To Server For Saving  */
async function postWeatherEntry(data) {
  fetch(`${API_ROOT}/watherEntry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Process Not Successfuly");
        return;
      }

      return response.json().then((data) => {
        if (response.ok) console.log(data);
        this.updateMostRecentEntry();
      });
    })
    .catch((err) => {
      alert("Error");
      console.error(err);
    });
}

/** Update UI */
async function updateMostRecentEntry() {
  let response = await fetch(`${API_ROOT}/getWeatherData`);
  try {
    response
      .json()
      .then((dataRes) => {
        let data = dataRes[Object.keys(dataRes).pop()];
        dateElemnet.innerHTML = `Date Is: ${data.date}`;
        tempElemnet.innerHTML = `Temp Is: ${data.temp}`;
        contentElemnet.innerHTML = `My Feelings Is: ${data.content}`;
      })
      .catch(catchError);
  } catch (error) {
    catchError(error);
  }
}
