import { pointToBinary, binaryToPoint } from "./utils.js";

export function onePointCrossover(parent1, parent2) {
  // Define the crossover point (assuming 3-dimensional points)
  const crossoverPoint = Math.floor(Math.random() * 3);

  // Perform one-point crossover
  let child1 = [];
  let child2 = [];

  for (let i = 0; i < 3; i++) {
    if (i < crossoverPoint) {
      // Copy the genes from the first parent
      child1.push(parent1[i]);
      child2.push(parent2[i]);
    } else {
      // Swap the genes from the second parent
      child1.push(parent2[i]);
      child2.push(parent1[i]);
    }
  }

  return [child1, child2];
}

export function twoPointCrossover(parent1, parent2) {
  // Define the first crossover point (assuming 3-dimensional points)
  let crossoverPoint1 = Math.floor(Math.random() * 3);

  // Define the second crossover point (different from the first one)
  let crossoverPoint2;
  do {
    crossoverPoint2 = Math.floor(Math.random() * 3);
  } while (crossoverPoint2 === crossoverPoint1);

  // Ensure that the first point is smaller than the second one
  if (crossoverPoint1 > crossoverPoint2) {
    [crossoverPoint1, crossoverPoint2] = [crossoverPoint2, crossoverPoint1];
  }

  // Perform two-point crossover
  let child1 = [];
  let child2 = [];

  for (let i = 0; i < 3; i++) {
    if (i < crossoverPoint1 || i > crossoverPoint2) {
      // Copy the genes from the first parent
      child1.push(parent1[i]);
      child2.push(parent2[i]);
    } else {
      // Swap the genes from the second parent
      child1.push(parent2[i]);
      child2.push(parent1[i]);
    }
  }

  return [child1, child2];
}

export function binaryCrossover(point1, point2, numberOfCrossoverPoints) {
  const binary1 = pointToBinary(point1);
  const binary2 = pointToBinary(point2);

//   console.log({
//     binary1,
//     binary2,
//     numberOfCrossoverPoints,
//   });

  // Randomly select numberOfCrossoverPoints positions in the binary strings
  let crossoverPoints = [];
  for (let i = 0; i < numberOfCrossoverPoints; i++) {
    // Pick a random position that is not already in the crossoverPoints array
    let position;
    do {
      position = Math.floor(Math.random() * binary1.length);
    } while (crossoverPoints.includes(position));

    // Add the position to the crossoverPoints array
    crossoverPoints.push(position);
  }

  // Sort the crossoverPoints array in ascending order
  crossoverPoints.sort((a, b) => a - b);

  // Initialize two empty strings for the offspring
  let offspring1 = "";
  let offspring2 = "";

  // Loop through the binary strings from left to right
  let start = 0; // The start index of the current segment
  let parent = 0; // The parent index (0 or 1) for the current segment
  for (let i = 0; i < crossoverPoints.length; i++) {
    // Get the end index of the current segment
    let end = crossoverPoints[i];

    // Append the segment from the parent to the offspring
    if (parent === 0) {
      offspring1 += binary1.substring(start, end);
      offspring2 += binary2.substring(start, end);
    } else {
      offspring1 += binary2.substring(start, end);
      offspring2 += binary1.substring(start, end);
    }

    // Update the start index and switch the parent index for the next segment
    start = end;
    parent = 1 - parent;
  }

  // Append the remaining segment from the parent to the offspring
  if (parent === 0) {
    offspring1 += binary1.substring(start);
    offspring2 += binary2.substring(start);
  } else {
    offspring1 += binary2.substring(start);
    offspring2 += binary1.substring(start);
  }

  // Convert the offspring strings back to points
  const point3 = binaryToPoint(offspring1);
  const point4 = binaryToPoint(offspring2);

//   console.log({
//     offspring1,
//     offspring2,
//   });

  return [point3, point4];
}

// const parent1 = [14, 23, 61]
// const parent2 = [0, 6, 77]

// console.log(twoPointCrossover(parent1, parent2));
// console.log(twoPointCrossover(parent1, parent2));
// console.log(twoPointCrossover(parent1, parent2));
// console.log(twoPointCrossover(parent1, parent2));

//console.log(binaryCrossover([14, 23, 61], [0, 6, 77], 3));
