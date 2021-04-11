import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";

const db = SQLite.openDatabase("dogs.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS dogs (id INTEGER PRIMARY KEY NOT NULL, breed TEXT NOT NULL, name TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL)",
        [],
        () => {
          resolve(true);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const insertDog = (
  breed: string,
  name: string,
  imageUri: string,
  address: string,
  latitude: number,
  longitude: number
): Promise<SQLResultSet> => {
  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO dogs (breed, name, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)",
        [breed, name, imageUri, address, latitude, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const fetchDogs = (): Promise<SQLResultSet> => {
  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM dogs",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};
