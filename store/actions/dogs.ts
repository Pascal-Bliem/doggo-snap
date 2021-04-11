import { Dispatch } from "redux";
import * as FileSystem from "expo-file-system";
import { SQLResultSet } from "expo-sqlite";
import { insertDog, fetchDogs } from "../../db/db";
//@ts-ignore
import { parseString } from "react-native-xml2js";

export const ADD_DOG = "ADD_PLACE";
export const REMOVE_DOG = "REMOVE_DOG";
export const LOAD_DOGS = "LOAD_DOGS";

export interface NominatimResponse {
  reversegeocode: {
    addressparts: {
      house_number: string[];
      road: string[];
      city?: string[];
      village: string[];
      country: string[];
    }[];
  };
}

export const addDog = (
  breed: string,
  name: string,
  imageUri: string,
  latitude: number,
  longitude: number
) => {
  return async (dispatch: Dispatch) => {
    // request to a reverse geocoding API that will return a
    // readable address matching the latitude and longitude
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&accept-language=en`
    );

    if (!response.ok) {
      throw new Error("Error in response of reverse geocoding API");
    }

    // parsing the XML that we get back from OSM
    const resText: string = await response.text();
    let resData: NominatimResponse = {
      reversegeocode: {
        addressparts: [
          {
            house_number: [""],
            road: [""],
            city: [""],
            village: [""],
            country: [""],
          },
        ],
      },
    };
    await parseString(
      resText,
      { trim: true },
      (err: Error, result: NominatimResponse) => {
        if (err) {
          console.log(err);
          throw err;
        }
        resData = result;
      }
    );

    // construct an address from the data
    const addressParts = resData["reversegeocode"]["addressparts"][0];
    const houseNumber = addressParts["house_number"]
      ? addressParts["house_number"][0]
      : "";
    const road = addressParts["road"][0];
    const cityOrVillage = addressParts["city"]
      ? addressParts["city"][0]
      : addressParts["village"]
      ? addressParts["village"][0]
      : "";
    const country = addressParts["country"][0];
    const address =
      houseNumber + " " + road + ", " + cityOrVillage + ", " + country;

    const fileName = imageUri.split("/").pop();
    const newPath =
      FileSystem.documentDirectory && fileName
        ? FileSystem.documentDirectory + fileName
        : "";

    try {
      FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult: SQLResultSet = await insertDog(
        breed,
        name,
        newPath,
        address,
        latitude,
        longitude
      );

      dispatch({
        type: ADD_DOG,
        dogData: {
          id: dbResult.insertId,
          breed: breed,
          name: name,
          imageUri: newPath,
          address: address,
          latitude: latitude,
          longitude: longitude,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadDogs = () => {
  return async (dispatch: Dispatch) => {
    try {
      const dbResult: SQLResultSet = await fetchDogs();

      dispatch({
        type: LOAD_DOGS,
        //@ts-ignore
        dogs: dbResult.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
