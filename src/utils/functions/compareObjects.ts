export const CompareObjects = (
  obj1: { [key: string]: any },
  obj2: { [key: string]: any },
) => {
  const keys = Object.keys(obj1);

  for (let key of keys) {
    if (obj1[key] === obj2[key]) {
      return false;
    }
  }
  return true;
};

export const IsObjectsEquals = (
  obj1: { [key: string]: any },
  obj2: { [key: string]: any },
) => {
  if (
    typeof obj1 === "object" &&
    obj1 !== null &&
    typeof obj2 === "object" &&
    obj2 !== null
  ) {
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if they have the same number of keys
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Check if the values for each key are equal
    for (let key of keys1) {
      // Use recursion for deep comparison
      if (!IsObjectsEquals(obj1[key], obj2[key])) {
        return false;
      }
    }

    // If all values match
    return true;
  } else {
    // If not objects or null, compare the values directly (handles primitive values)
    return obj1 === obj2;
  }
};

export const IsSubmittedObject = (obj: { [key: string]: any }) => {
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === "") {
      return true;
    }
  }
  return false;
};
