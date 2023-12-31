// IMAGES
import manBeach from '../images/man-beach-sm.png'
import manSki from '../images/man-on-ski.png'
import manHandsUp from '../images/man-hands-up.png'
import manSmiles from '../images/man-smiles-sm.png'
import manCries from '../images/man-cries-sm.png'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// COMPONENTS
import ChangeLocation from './ChangeLocation'
import Temperature from './Temperature'
import Weather from './Weather'

// HOOKS
import { useState, useEffect } from 'react'
import { fahrenheitToCelcius, celciusToFahrenheit } from '../utils/ convertTemperature'


export default function CurrentWeather( {  resetInputs, icon, temperature, setTemperature, tempScale, setTempScale, weather, humidity, date, fullRegion, setRegion, setMustBeHotter }) {

  function changeScale(){
    if (tempScale === 'F'){
      setTemperature(fahrenheitToCelcius(temperature))
      setTempScale('C')
    } else if (tempScale === 'C'){
      setTemperature(celciusToFahrenheit(temperature))
      setTempScale('F')
    }
  }
  
  return (
    <>
      <Container>
        <Row>
          <Col md="4" className="weather-details-left">
            <h3 className="full-location">{fullRegion}</h3>
            <h3>{date}</h3>
          </Col>
          <Col md="4">
            <div className="answer">
              {!temperature ?
                <img src={manBeach} alt="Man on the beach waiting for forecast." />
                :
                <>
                  {((tempScale === 'F' && temperature > 68) || (tempScale === 'C' && temperature > 20)) ?
                    <>
                      <p>YES!</p>
                      <img src={manSmiles} alt="Man smiles becuase it's beach weather." />
                      
                    </>
                    :
                    <>
                      <p>NO!</p>
                      <img src={manCries} alt="Man cries because it's no beach weather." />
                    </>
                  }
                  {/* {setShowError && <img src={manHandsUp} alt="Man on the beach waiting for forecast." />} */}
                </>
              }
              
            </div>
          </Col>
          <Col md="4" className="weather-details-right">
            {temperature ?
              <Temperature 
                temp = {temperature}
                tempScale = {tempScale}
                changeScale={changeScale}
              />
              : <></>
            }
            {humidity ?
              <h3>Humidity: {humidity}%</h3>
              : <></>
            }
            {weather ?
              <Weather 
                weather={weather}
                icon={icon}
              />
              : <></>
            }
            {((tempScale === 'F' && temperature < 68) || (tempScale === 'C' && temperature < 20)) ?
              <ChangeLocation
                setRegion={setRegion}
                setMustBeHotter={setMustBeHotter}
                resetInputs={resetInputs}
              />
              :
              <div></div>
            }
          </Col>
        </Row>
      </Container>
    </>

  )
}