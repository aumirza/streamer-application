export const createFakeStream = (numberOfStreams) => {
  const streams = [];
  for (let i = 0; i < numberOfStreams; i++) {
    streams.push({
      id: i,
      title: `Stream ${i}`,
      country: anyCountry(),
      viewers: Math.floor(Math.random() * 1000),
      thumbnail: getRandomImage(),
      isConnected: randomBoolean(),
    });
  }
  return streams;
};
const anyCountry = () => {
  const countries = [
    {
      name: "United States",
      code: "US",
      flag: "https://www.countryflags.io/us/flat/64.png",
    },
    {
      name: "United Kingdom",
      code: "UK",
      flag: "https://www.countryflags.io/gb/flat/64.png",
    },
    {
      name: "India",
      code: "IN",
      flag: "https://www.countryflags.io/in/flat/64.png",
    },
    {
      name: "Germany",
      code: "DE",
      flag: "https://www.countryflags.io/de/flat/64.png",
    },
    {
      name: "Spain",
      code: "ES",
      flag: "https://www.countryflags.io/es/flat/64.png",
    },
    {
      name: "Italy",
      code: "IT",
      flag: "https://www.countryflags.io/it/flat/64.png",
    },
    {
      name: "Canada",
      code: "CA",
      flag: "https://www.countryflags.io/ca/flat/64.png",
    },
  ];
  const countriesShortcode = ["US", "UK", "IN", "DE", "ES", "IT", "CA"];
  const randomCountry =
    countriesShortcode[Math.floor(Math.random() * countriesShortcode.length)];
  return countries.find((country) => country.code === randomCountry);
};

const randomBoolean = () => {
  return Math.random() >= 0.5;
};

// square profile image unsplash
const getRandomImage = () => {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://source.unsplash.com/collection/190727/${randomId}`;
};
