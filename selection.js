import { fn } from "./fitness.js";

export function tournamentSelection(population = [], tournamentSize = 2) {
  let tournament = [];
  for (let i = 0; i < tournamentSize; i++) {
    tournament.push(population[Math.floor(Math.random() * population.length)]);
  }

  let best = tournament[0];
  for (let i = 1; i < tournament.length; i++) {
    if (
      fn(tournament[i][0], tournament[i][1], tournament[i][2]) >
      fn(best[0], best[1], best[2])
    ) {
      best = tournament[i];
    }
  }

  return best;
}

export function selection(population = [], strategyFn, numberOfParents = 2) {
  let parents = [];
  for (let i = 0; i < numberOfParents; i++) {
    parents.push(strategyFn(population));
  }
  return parents;
}
