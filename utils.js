import { fn } from "./fitness.js";

export function log(population) {
  // number of ittems
  console.log("Population stats:")
  console.log("    Number of items", population.length);

  const fitness = population
    .map((individual) => {
      return [individual, fn(individual[0], individual[1], individual[2])];
    })
    .sort((a, b) => {
      return b[1] - a[1];
    });

  // min and max fitness
  console.log("    Min fitness", fitness[fitness.length - 1][1]);
  console.log("    Max fitness", fitness[0][1]);
}

// Define a function to convert a point to a binary string
export function pointToBinary(point) {
    // Extract the x, y, and z coordinates
    const [x, y, z] = point;

    // Convert each coordinate to a 7-bit binary string
    const xBinary = x.toString(2).padStart(7, '0');
    const yBinary = y.toString(2).padStart(7, '0');
    const zBinary = z.toString(2).padStart(7, '0');

    // Concatenate the binary strings
    const binary = xBinary + yBinary + zBinary;

    return binary;
}

// Define a function to convert a binary string to a point
export function binaryToPoint(binary) {
    // Split the binary string into three segments of 7 bits each
    const xBinary = binary.substring(0, 7);
    const yBinary = binary.substring(7, 14);
    const zBinary = binary.substring(14);

    // Convert each segment to a decimal number
    const x = parseInt(xBinary, 2);
    const y = parseInt(yBinary, 2);
    const z = parseInt(zBinary, 2);

    // Create an array with the coordinates
    const point = [x, y, z];

    return point;
}

export function bruteforceMaxValue() {
  let max = 0;
  let maxPoint = [];
  for (let x = 0; x <= 63; x++) {
    for (let y = 0; y <= 63; y++) {
      for (let z = 0; z <= 63; z++) {
        const value = fn(x, y, z);
        if ((value !== Infinity) && value > max) {
          max = value;
          maxPoint = [x, y, z];
        }
      }
    }
  }

  console.log("First brutforce calculated max value", max, maxPoint);
}

export function findMaxFitnessValues(population) {
  const sortedByFitness = population.sort((a, b) => {
    return fn(b[0], b[1], b[2]) - fn(a[0], a[1], a[2]);
  });
  
  console.log("3 best individuals", sortedByFitness.slice(0, 3).map((individual) => {
    return [individual, fn(individual[0], individual[1], individual[2])];
  }));
}

export function generateFistPopulation(numberOfIndividuals) {
  let population = [];
  while (population.length < numberOfIndividuals) {
    let individual = [];
    for (let j = 0; j < 3; j++) {
      individual.push(Math.floor(Math.random() * 64) );
    }
    if (fn(...individual) !== Infinity) {
      population.push(individual);
    }
  }
  return population;
}


export function isInBounds(point) {
  const [x, y, z] = point;
  return x >= 0 && x <= 63 && y >= 0 && y <= 63 && z >= 0 && z <= 63;
}