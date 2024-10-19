import { Vector3 } from "three";

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomFloat = (min: number, max: number) => {
  const randomNumber = Math.random() * (max - min) + min;
  return parseFloat(randomNumber.toFixed(3));
};

export const randomRadian = () => Math.random() * 2 * Math.PI;

export const randomPositionInCylinder = (
  radius: number,
  height: number
): Vector3 => {
  const randomPosInCircle = randomPositionInCircle(radius);
  const randomPosY = randomFloat(0, height) - height / 2;
  randomPosInCircle.y = randomPosY;
  return randomPosInCircle;
};

export const randomPositionInCircle = (radius: number): Vector3 => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.sqrt(Math.random()) * radius;
  const x = distance * Math.cos(angle);
  const z = distance * Math.sin(angle);

  return new Vector3(x, 0, z);
};

export const randomPositionInSphere = (radius: number): Vector3 => {
  const u = Math.random(); // Random value for controlling distance
  const theta = Math.random() * 2 * Math.PI; // Random angle in the XY plane (azimuthal angle)
  const phi = Math.acos(2 * Math.random() - 1); // Random polar angle

  const distance = Math.cbrt(u) * radius; // Random distance from center, scaled by radius

  // Convert spherical coordinates to Cartesian coordinates
  const x = distance * Math.sin(phi) * Math.cos(theta);
  const y = distance * Math.sin(phi) * Math.sin(theta);
  const z = distance * Math.cos(phi);

  return new Vector3(x, y, z);
};
