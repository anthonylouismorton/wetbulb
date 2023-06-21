import React from 'react';
import { Box, Typography } from '@mui/material';
import FAQs from './FAQs';

export default function About() {
  const faqs = [
    {
      question: 'What is a Wet Bulb Globe Temperature (WBGT)',
      answer: 'WBGT is a measure of the heat stress in direct sunlight, which takes into account: temperature, humidity, wind speed, sun angle, and cloud cover (solar radiation). This differs from the heat index, which takes into consideration temperature and humidity and is calculated for shady areas. For more background info on WBGT',
      source: 'https://www.weather.gov/tsa/wbgt',
      sourceText: 'National Weather Service'
    },
    {
      question: 'How is the WBGT Calculated',
      answer: 'WBGT is calculated as the weighted sum of natural wet bulb temperature (Tnwb), globe temperature (Tg), and dry bulb/ambient temperature (Ta): WBGT = 0.7Tnwb + 0.2Tg + 0.1Ta.',
      source: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7240860/#:~:text=Outdoor%20WBGT%20is%20calculated%20as,T%20g%20%2B%200.1%20T%20a%20',
      sourceText: 'National Institutes of Health'
    },
    {
      question: 'Does this Calculator give the true WBGT for my location or is it an estimate?',
      answer: 'This calculator is only an estimate. We gather the most up to date weather for your location and we estimate your WBGT using the heat and mass transfer algorithm of Liljegren et al. (2008)',
      source: 'https://www.tandfonline.com/doi/full/10.1080/15459620802310770',
      sourceText: 'Journal of Occupational and Environmental Hygiene'
    },
    {
      question: 'Where do you get your weather data?',
      answer: 'We get our weather data from OpenWeather. OpenWeather provides an up to date forecast every 10 minutes.',
      source: 'https://openweathermap.org/',
      sourceText: 'OpenWeather'
    },
    {
      question: 'Limitation and Accuracy Concern #1',
      answer: 'We do not know the weather at your exact location. In order to get the most accurate WBGT for your location, we would need to know the weather at your exact location. We are unable to get weather from your exact location, so we use the OpenWeather location closest to your location. ',
      source: 'https://openweathermap.org/',
      sourceText: 'OpenWeather'
    },
    {
      question: 'Limitation and Accuracy Concern #2',
      answer: 'We estimate the wet bulb temperature for your location. The wet bulb temperature is needed to calculate the WBGT. Unfornately, this is not a measurement provided by OpenWeather and most other weather service providers. Instead we use a formula the uses relative humidity and temperature(dry bulb) to estimate your temperature. This wet bulb estimate is accurate between -1°C to +0.65°C when relative humidity is between 5% and 99%.',
      source: 'https://journals.ametsoc.org/view/journals/apme/50/11/jamc-d-11-0143.1.xml',
      sourceText: 'Journal of Applied Meteorology and Climatology'
    },
    {
      question: `Are there more accurate ways to get obtain my location's WBGT?`,
      answer: 'Yes, there are many companies that sell stationary or hand held equipment designed to measure the WBGT wherever the equipment is located. Accuracy is dependent on the make and model of the equipment. Please consult manufacturer specifications for more information.',
      source: 'https://www.3m.co.id/3M/en_ID/p/d/v000075578/',
      sourceText: '3M™ QUESTemp™ 46 Heat Stress Monitor (We are not affliated with 3M nor do we endorse their products. This eqiupment is linked for informational purposes only).'
    },
  ];

  return (
  <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
    <Box sx={{ marginBottom: '5px' }}>
      <Typography variant="h4">Contact Us</Typography>
    </Box>
    <Box sx={{ marginBottom: '5px' }}>
      <Typography variant="h6">Prestige Worldwide Web Design LLC</Typography>
    </Box>
    <Box sx={{ marginBottom: '5px' }}>
      <Typography>Email: prestigeworldwidewebdesignllc@gmail.com</Typography>
    </Box>
    <Box sx={{ marginTop: '35px' }}>
      <Typography variant="h4">Frequently Asked Questions</Typography>
      <Box sx={{ margin: '35px 200px' }}>
        <FAQs faqs={faqs} />
      </Box>
    </Box>
  </Box>
  );
}
