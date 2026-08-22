import { createContext, useContext, useState } from "react";

const FarmContext = createContext(null);

const initialFarmData = {
    crop: "",
    growthStage: "",
    location: "",

    soil: {
        soilType: "",
        ph: "",
        ec: "",
        organicCarbon: "",
        nitrogen: "",
        phosphorus: "",
        potassium: ""
    },

    weather: {
        connected: false,
        location: "",
        temperature: "",
        feelsLike: "",
        humidity: "",
        rainfall: "",
        windSpeed: "",
        condition: "",
        forecast: []
    },

    diagnosis: {
        crop: "",
        disease: "",
        confidence: "",
        severity: "",
        symptoms: "",
        cause: "",
        organicTreatment: "",
        chemicalTreatment: "",
        prevention: "",
        recommendation: ""
    }
};


export function FarmProvider({ children }) {

    const [farmData, setFarmData] = useState(initialFarmData);


    // =====================================================
    // GENERAL FARM DATA
    // =====================================================

    function updateFarmData(data) {

        setFarmData(previous => ({
            ...previous,
            ...data
        }));

    }


    // =====================================================
    // SOIL DATA
    // =====================================================

    function updateSoilData(data) {

        setFarmData(previous => ({

            ...previous,

            soil: {
                ...previous.soil,
                ...data
            }

        }));

    }


    // =====================================================
    // WEATHER DATA
    // =====================================================

    function updateWeatherData(data) {

        setFarmData(previous => ({

            ...previous,

            location:
                data.location ||
                previous.location,

            weather: {

                ...previous.weather,

                ...data,

                connected: true

            }

        }));

    }


    // =====================================================
    // DIAGNOSIS DATA
    // =====================================================

    function updateDiagnosisData(data) {

        setFarmData(previous => ({

            ...previous,

            diagnosis: {

                ...previous.diagnosis,

                ...data

            }

        }));

    }


    return (

        <FarmContext.Provider
            value={{
                farmData,
                updateFarmData,
                updateSoilData,
                updateWeatherData,
                updateDiagnosisData
            }}
        >

            {children}

        </FarmContext.Provider>

    );

}


export function useFarm() {

    const context = useContext(FarmContext);

    if (!context) {

        throw new Error(
            "useFarm must be used inside FarmProvider"
        );

    }

    return context;

}