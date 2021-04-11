import Dog from "../../models/dog";
import { ADD_DOG, REMOVE_DOG, LOAD_DOGS } from "../actions/dogs";

export interface DogsState {
  dogs: Dog[];
}

const initialState: DogsState = {
  dogs: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_DOG:
      const data = action.dogData;
      const newDog = new Dog(
        data.id,
        data.breed,
        data.name,
        data.imageUri,
        data.address,
        data.latitude,
        data.longitude
      );
      return {
        dogs: state.dogs.concat(newDog),
      };
    case REMOVE_DOG:
      return state;
    case LOAD_DOGS:
      return {
        dogs: action.dogs.map(
          (dog: Dog) =>
            new Dog(
              dog.id,
              dog.breed,
              dog.name,
              dog.imageUri,
              dog.address,
              dog.latitude,
              dog.longitude
            )
        ),
      };
    default:
      return state;
  }
};
