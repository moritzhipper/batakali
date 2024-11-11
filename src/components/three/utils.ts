import { Vector3 } from "three"

export const getRandomSprites = (
  innerRadius: number,
  outerRadius: number,
  amount: number
) => {
  let sprites = []

  for (let i = 0; i < amount; i++) {
    const randomPos = getRandomPositionInCircleLeaveInner(
      outerRadius,
      innerRadius
    )
    sprites.push({
      ...randomPos,
      rotation: 0,
      type: ["shard1", "shard2", "feather"][randomInt(0, 3)]
    })
  }
  return sprites
}

export const randomFloat = (min: number, max: number) => {
  const randomNumber = Math.random() * (max - min) + min
  return parseFloat(randomNumber.toFixed(3))
}

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

const getRandomPositionInCircleLeaveInner = (
  outerRadius: number,
  innerRadius: number
) => {
  const angle = Math.random() * 2 * Math.PI

  const distance = Math.sqrt(
    Math.random() * (outerRadius ** 2 - innerRadius ** 2) + innerRadius ** 2
  )

  const x = distance * Math.cos(angle)
  const y = distance * Math.sin(angle)

  return { x, y }
}

/**
 * Generates a random position inside a sphere with a bias towards the X-axis.
 * @param minRadius - The minimum distance from the origin.
 * @param maxRadius - The maximum distance from the origin.
 * @param yBias - A factor to increase bias towards the Y-axis. Range os 0 - 1.
 * @returns A 3D vector representing the random position with X-axis bias.
 */
export const getRandomPositionInSphereWithXBias = (
  minRadius: number,
  maxRadius: number,
  yBias: number
): Vector3 => {
  const scaledMinRadius = minRadius * yBias
  const randomRadius =
    Math.random() * (maxRadius - scaledMinRadius) + scaledMinRadius
  const theta = Math.random() * Math.PI * 2 // Random angle in the XY plane
  const phi = Math.acos(2 * Math.random() - 1) // Random angle from the Z-axis

  // Convert spherical to Cartesian coordinates
  let x = randomRadius * Math.sin(phi) * Math.cos(theta)
  let y = randomRadius * Math.sin(phi) * Math.sin(theta)
  let z = randomRadius * Math.cos(phi)

  // Apply bias to the X-axis by scaling up the x value
  y *= yBias

  return new Vector3(x, y, z)
}
