import { doc, getDoc } from "firebase/firestore";
import { usersCollectionRef } from "../utils/users";
import toast from "react-hot-toast";
import { IProfilePayload } from "../interfaces/components/profile";
import { getFirebaseErrorMessage } from "../utils/errorHandler";

export const getUserById = async (userId: string) => {
  try {
    const userDocRef = doc(usersCollectionRef, userId);

    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // Document does not exist
      return null;
    }

    const userData: IProfilePayload = userDocSnapshot.data();

    return userData;
  } catch (error: any) {
    console.error("Error retrieving user:", { message: error.message }, error);
    const newError = getFirebaseErrorMessage(error.message);
    toast.error(newError);
    throw error;
  }
};
