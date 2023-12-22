import './Index.css';
import axios from 'axios';
import { useState } from 'react';
export default function App() {
	const date = new Date();
	const [ data, setData ] = useState({
		search:"",
		city:"...",
		cnt:"...",
		temp:"0",
		img:"https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-1024.png",
		time:date.toLocaleTimeString(),
		link:"",
		place:"",
		ws:"0",
		di:"0",
		gu:"0",
		weat:"Cloudy"
	});
	const validate =()=> {
		if (Number(data.search)) {
			alert("Numbers are not allowed!");
			setData({...data, search:""});
		}
	}
	const handleSearch = (e)=>{
		setData({...data, [e.target.name]:e.target.value});
	}
	const showdata =()=> {
		let apikey = "6c145ad58f7eb4d8dd184acead953325";
		let apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${data.search}&appid=${apikey}`;
		let placeURL = `https://www.google.com/search?q=best places to visit in ${data.search}`;
		if (data.search==='') {
			alert("Please enter any location name!");
		}
		else {
			axios.get(apiurl).then((res)=>{
				const rd = res.data;
				setData({
					...data, 
					city:rd.name, 
					place:rd.name, 
					cnt:rd.country, 
					img:`http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
					temp:parseInt(rd.main.temp),
					link:placeURL,
					weat:rd.weather[0].main,
					time:date.toLocaleTimeString(),
					ws:rd.wind.speed,
					di:rd.wind.deg,
					gu:rd.wind.gust
				});
			}).catch(()=>{
				setData({
					city:"Location not found!",
					cnt:"...", 
					img:`https://clipartcraft.com/images/thinking-clipart-transparent.png`,
					temp:"0",
					place:"",
					link:placeURL,
					weat:"Cloudy",
					ws:"0",
					di:"0",
					gu:"0"
				});
			});
		}
	}
  return (
	  <div className="container">
			<div className="weather">
				<div className="cityname">
					<h2>Location- <span id="city">{data.city}</span></h2>
					<p>Country- <span id="country">{data.cnt}</span></p>
				</div>
				<div className="search">
					<input autoFocus type="text" name="search" onKeyUp={validate} id="txt" value={data.search} onChange={handleSearch} placeholder="Search city..."/><input type="button" value="Search" onClick={showdata}/>
				</div>
				<div className="img">
					<img src={data.img} id="img" alt="icon"/>
				</div>
				<div className="temp">
					<h3 id="temp">{data.temp}°C</h3>
					<h3 id="weat">{data.weat}</h3>
					<h3>Time:- <span id="time">{data.time}</span></h3>
					<a href={data.link} target="blank" id="place">The best places to visit in: - <span id="placecity">{data.place}</span></a>
				</div>
				<div className="previous">
					<div className="box">
						<h3><i className="fa-solid fa-wind"></i> Speed</h3>
						<h4 id="ws">{data.ws} kmph</h4>
					</div>
					<div className="box">
						<h3><i className="fa-solid fa-wind"></i> Direction</h3>
						<h4 id="di">{data.di} deg</h4>
					</div>
					<div className="box">
						<h3><i className="fa-solid fa-wind"></i> Gust</h3>
						<h4 id="gu">{data.gu} gust</h4>
					</div>
				</div>
			</div>
		</div>
  );
}