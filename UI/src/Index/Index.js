import './Index.css';
import axios from 'axios';
import { useState } from 'react';
function App() {
	// let time = new Date();
	// document.getElementById('time').innerHTML =time.toLocaleTimeString();
	const [search, setSearch] = useState("");
	const [city, setCity] = useState("...");
	const [cnt, setCnt] = useState("...");
	const [temp, setTemp] = useState("0");
	const [ws, setWs] = useState("0");
	const [di, setDi] = useState("0");
	const [gu, setGu] = useState("0");
	const [weat, setWeat] = useState("Cloudy");
	const validate =()=> {
		if (Number(search)) {
			alert("Numbers are not allowed!");
			setSearch("");
		}
	}
	const showdata =()=> {
		let apikey = "6c145ad58f7eb4d8dd184acead953325";
		let apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${search}&appid=${apikey}`;
		if (search==='') {
			alert("Please enter any location name!");
		}
		else {
			axios.get(apiurl).then((res)=>{
				setCity(res.data.name);
				setCnt(res.data.sys.country);
				setTemp(parseInt(res.data.main.temp));
				setWeat(res.data.weather[0].main);
				setWs(res.data.wind.speed);
				setDi(res.data.wind.deg);
				setGu(res.data.wind.gust);
				console.log(res);
			}).catch(()=>{
				setCity("Location not found!");
				setCnt("...");
				setTemp("0");
				setWeat("Cloudy");
				setWs("0");
				setDi("0");
				setGu("0");
			});
		}
		// let ct = document.getElementById('city');
		// let cntry = document.getElementById('country');
		// let img = document.getElementById('img');
		// let temp = document.getElementById('temp');
		// let weat = document.getElementById('weat');
		// let tm = document.getElementById('time');
		// let ws = document.getElementById('ws');
		// let di = document.getElementById('di');
		// let gu = document.getElementById('gu');
		// fetch(apiurl).then((resp)=>{
		// 	return resp.json();
		// }).then((data)=>{
		// 	cntry.innerHTML=data.sys.country;
		// 	ct.innerHTML=data.name;
		// 	let tempe =parseInt(data.main.temp);
		// 	if (tempe < 35) {
		// 		weat.innerHTML="Sunny!";
		// 	}
		// 	else if (tempe < 30) {
		// 		weat.innerHTML="Cloudy!"
		// 	}
		// 	else if (tempe < 25) {
		// 		weat.innerHTML="Rainny!"
		// 	}
		// 	else if (tempe < 20) {
		// 		weat.innerHTML="Coldy!"
		// 	}
		// 	else {
		// 		weat.innerHTML="Snow Fall!"
		// 	}
		// 	temp.innerHTML=tempe+'°C';
		// 	ws.innerHTML=`${data.wind.speed} kmph`;
		// 	di.innerHTML=`${data.wind.deg} deg`;
		// 	gu.innerHTML=`${data.wind.gust} gust`;
		// 	console.log(data)
		// }).catch((err)=>{
		// 	cntry.innerHTML="NA";
		// 	ct.innerHTML="<br>Location not found!</br>";
		// 	temp.innerHTML=0+'°C';
		// 	ws.innerHTML=`0 km/h`;
		// 	di.innerHTML=`0 deg`;
		// 	gu.innerHTML=`0 gust`;
		// });
		// let date = new Date();
		// tm.innerHTML=date.toLocaleTimeString();
	}
  return (
    <div className="container">
		<div className="weather">
			<div className="cityname">
				<h2>Location- <span id="city">{city}</span></h2>
				<p>Country- <span id="country">{cnt}</span></p>
			</div>
			<div className="search">
				<input autoFocus type="text" onKeyUp={validate} id="txt" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search city..."/><input type="button" value="Search" onClick={showdata}/>
			</div>
			<div className="img">
				<img src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-1024.png" id="img" alt="cloudy"/>
			</div>
			<div className="temp">
				<h3 id="temp">{temp}°C</h3>
				<h3 id="weat">{weat}</h3>
				<h3>Time:- <span id="time"></span></h3>
			</div>
			<div className="previous">
				<div className="box">
					<h3><i className="fa-solid fa-wind"></i> Speed</h3>
					<h4 id="ws">{ws} kmph</h4>
				</div>
				<div className="box">
					<h3><i className="fa-solid fa-wind"></i> Direction</h3>
					<h4 id="di">{di} deg</h4>
				</div>
				<div className="box">
					<h3><i className="fa-solid fa-wind"></i> Gust</h3>
					<h4 id="gu">{gu} gust</h4>
				</div>
			</div>
		</div>
	</div>
  );
}

export default App;
