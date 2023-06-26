class Weather {
  lat = null;
  lon = null;
  cityName = null;

  async init(city = "moscow") {
    try {
      const url_location = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.VUE_APP_KEY}`;
      const location = await fetch(url_location);
      const data = await location.json();

      this.cityName = data[0].local_names["ru"];
      this.lat = data[0].lat;
      this.lon = data[0].lon;

      return this.getWeather();
    } catch (error) {
      alert("..упс, нет такого города");
      return this.init();
    }
  }
  async getWeather() {
    const weatherFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&lang=ru&appid=${process.env.VUE_APP_KEY}&units=metric`,
    );

    const weather = await weatherFetch.json();

    return {
      city: this.cityName,
      icon: weather.weather[0].icon,
      temp: weather.main.temp,
      feels_like: weather.main.feels_like,
      humidity: weather.main.humidity,
      grnd_level: weather.main.pressure,
      wind_speed: weather.wind.speed,
      wind_deg: weather.wind.deg,
      visibility: weather.visibility,
      desc: weather.weather[0].description,
      image: this.backgroundImage(weather.weather[0].description),
      imageWind: this.backgroundWind(weather.wind.speed),
    };
  }

  backgroundImage(desc) {
    switch (desc) {
      case "ясно":
        return "https://media.giphy.com/media/3SwvKYqfHVM7bUMAlc/giphy.gif";

      case "облачно с прояснениями":
        return "https://media.giphy.com/media/3VSM58Eu7kR4A/giphy.gif";

      case "пасмурно":
        return "https://media.giphy.com/media/E2d2tsgz7iHo4/giphy.gif";

      case "небольшой дождь":
        return "https://media.giphy.com/media/39fj7g99qyD72/giphy.gif";

      case "сильный дождь":
        return "https://media.giphy.com/media/129BtnUUD6Lrzi/giphy.gif";

      case "переменная облачность":
        return "https://media.giphy.com/media/cAyJEOus3l1BTLUbg6/giphy.gif";

      default:
        return "https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif";
    }
  }
  backgroundWind(speed) {
    if (speed < 10.8) {
      return "https://media.giphy.com/media/CiTLZWskt7Fu/giphy.gif";
    } else if (13.8 < speed < 20.7) {
      return "https://media.giphy.com/media/xBaMqnZ4KS36sUS9Jb/giphy.gif";
    } else {
      return "https://media.giphy.com/media/9MJ5ozdayMWT7QuA19/giphy.gif";
    }
  }
}

export default new Weather();
