import { Vector3 } from "three"

export const randomRadian = () => Math.random() * 2 * Math.PI

export const randomPositionInCylinder = (
  radius: number,
  height: number
): Vector3 => {
  const randomPosInCircle = randomPositionInCircle(radius)
  const randomPosY = randomFloat(0, height) - height / 2
  randomPosInCircle.y = randomPosY
  return randomPosInCircle
}

export const randomPositionInCircle = (radius: number): Vector3 => {
  const angle = Math.random() * 2 * Math.PI
  const distance = Math.sqrt(Math.random()) * radius
  const x = distance * Math.cos(angle)
  const z = distance * Math.sin(angle)

  return new Vector3(x, 0, z)
}

export const randomPositionInSphere = (radius: number): Vector3 => {
  const u = Math.random() // Random value for controlling distance
  const theta = Math.random() * 2 * Math.PI // Random angle in the XY plane (azimuthal angle)
  const phi = Math.acos(2 * Math.random() - 1) // Random polar angle

  const distance = Math.cbrt(u) * radius // Random distance from center, scaled by radius

  // Convert spherical coordinates to Cartesian coordinates
  const x = distance * Math.sin(phi) * Math.cos(theta)
  const y = distance * Math.sin(phi) * Math.sin(theta)
  const z = distance * Math.cos(phi)

  return new Vector3(x, y, z)
}

// ducko stuff

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
 * @param xBiasFactor - A factor to increase bias towards the X-axis (default is 0.5, adjust for more/less bias).
 * @returns A 3D vector representing the random position with X-axis bias.
 */
export const getRandomPositionInSphereWithXBias = (
  minRadius: number,
  maxRadius: number,
  xBias: number = 0.5
): Vector3 => {
  const randomRadius = Math.random() * (maxRadius - minRadius) + minRadius
  const theta = Math.random() * Math.PI * 2 // Random angle in the XY plane
  const phi = Math.acos(2 * Math.random() - 1) // Random angle from the Z-axis

  // Convert spherical to Cartesian coordinates
  let x = randomRadius * Math.sin(phi) * Math.cos(theta)
  let y = randomRadius * Math.sin(phi) * Math.sin(theta)
  let z = randomRadius * Math.cos(phi)

  // Apply bias to the X-axis by scaling up the x value
  x *= xBias

  return new Vector3(x, y, z)
}
