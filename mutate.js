import { pointToBinary, binaryToPoint } from "./utils.js";

export function mutate(point) {
    // Convert the point to a binary string
    const binary = pointToBinary(point);
    
    // Flip a random bit
    const mutationPoint = Math.floor(Math.random() * binary.length);
    const mutatedBinary =
        binary.substring(0, mutationPoint) +
        (binary[mutationPoint] === "0" ? "1" : "0") +
        binary.substring(mutationPoint + 1);
    
    // Convert the binary string back to a point
    const mutatedPoint = binaryToPoint(mutatedBinary);
    
    return mutatedPoint;
}

//console.log(mutate([14, 23, 61])); // [14, 23, 60]