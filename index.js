import { tournamentSelection, selection } from "./selection.js";
import {
  findMaxFitnessValues,
  isInBounds,
  log,
  generateFistPopulation,
} from "./utils.js";
import {
  binaryCrossover,
  onePointCrossover,
  twoPointCrossover,
} from "./crossover.js";
import { mutate } from "./mutate.js";
import { bruteforceMaxValue } from "./utils.js";
import { fn } from "./fitness.js";

function performEvolution({
  numberOfIndividuals,
  numberOfGenerations,
  mutationRate,
  selectionOperator,
  crossoverOperator,
}) {
  const crossoverFn = crossoverOperator[0];
  const crossoverArgs = crossoverOperator.slice(1);

  const selectionFn = selectionOperator[0];
  const selectionArgs = selectionOperator.slice(1);

  let population = generateFistPopulation(numberOfIndividuals);
  console.log("First gen");
  log(population);
  findMaxFitnessValues(population);

  for (let generation = 0; generation < numberOfGenerations; generation++) {
    // select parents from population using tournament selection
    const nextParents = selection(
      population,
      selectionFn,
      numberOfIndividuals / 2,
      ...selectionArgs
    );

    // create an empty array for the offspring
    const nextGeneration = [];

    // loop until the offspring size is equal to the population size
    while (nextGeneration.length < numberOfIndividuals) {
      // randomly pick two parents from the nextParents array
      const parent1 =
        nextParents[Math.floor(Math.random() * nextParents.length)];
      const parent2 =
        nextParents[Math.floor(Math.random() * nextParents.length)];

      // apply crossover and mutation operators to produce two offspring
      let [child1, child2] = crossoverFn(parent1, parent2, ...crossoverArgs);

      // apply mutation to the offspring
      if (Math.random() < mutationRate) {
        let temp;
        do {
          temp = mutate(child1);
        } while (!isInBounds(temp));

        child1 = temp;
      }

      if (Math.random() < mutationRate) {
        let temp;
        do {
          temp = mutate(child2);
        } while (!isInBounds(temp));

        child2 = temp;
      }
      if (fn(...child1) !== Infinity) {
        nextGeneration.push(child1);
      }
      if (fn(...child2) !== Infinity) {
        nextGeneration.push(child2);
      }
    }

    // replace the population with the nextGeneration
    population = nextGeneration;
  }

  console.log("Last gen");
  log(population);
  findMaxFitnessValues(population);
}

function runner({ runs }) {
  console.log("Maximizing best value of", fn.toString());
  bruteforceMaxValue();

  for (let run of runs) {
    console.log(
      `=========\n>>> New evolution (Number of individuals: ${run.numberOfIndividuals}, Number of generations: ${run.numberOfGenerations}, Mutation rate: ${run.mutationRate})`
    );
    performEvolution(run);
  }
}

const config = {
  runs: [
    {
      numberOfIndividuals: 150,
      numberOfGenerations: 30,
      mutationRate: 0.01,
      selectionOperator: [tournamentSelection],
      crossoverOperator: [onePointCrossover, 2],
    },
    {
      numberOfIndividuals: 150,
      numberOfGenerations: 30,
      mutationRate: 0.01,
      selectionOperator: [tournamentSelection],
      crossoverOperator: [twoPointCrossover, 2],
    },
    {
      numberOfIndividuals: 150,
      numberOfGenerations: 30,
      mutationRate: 0.01,
      selectionOperator: [tournamentSelection],
      crossoverOperator: [binaryCrossover, 2],
    },
  ],
};

runner(config);
