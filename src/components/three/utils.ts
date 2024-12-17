import { Group, Vector3 } from "three"
import { lerp } from "three/src/math/MathUtils.js"

export const randomFloat = (min: number, max: number) => {
  const randomNumber = Math.random() * (max - min) + min
  return parseFloat(randomNumber.toFixed(3))
}

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

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

const getScalar = (scalar: number) => new Vector3(scalar, scalar, scalar)
const minSize = getScalar(0.5)
const center = getScalar(0)

const getOpacityFromDistanceToCenter = (positionObj: Vector3) =>
  0.8 - positionObj.distanceTo(center) / 20

export const animateShardsHidden = (group: Group) => {
  group.scale.lerpVectors(group.scale, minSize, 0.15)
  group.traverse((child) => {
    if (child.isSprite) {
      child.material.opacity = lerp(child.material.opacity, 0, 0.17)
    }
  })
}

export const animateShardsVisible = (group: Group, delta: number) => {
  group.rotateY(delta / 40)

  group.traverse((child) => {
    if (child.isSprite) {
      child.material.opacity = lerp(
        child.material.opacity,
        getOpacityFromDistanceToCenter(child.position),
        0.03
      )
    }
  })
}

export const turnSzeneAway = (group: Group) => {
  group.rotation.y = Math.PI / -2.5
  group.traverse((child) => {
    if (child.isMesh || child.isSprite) {
      child.material.opacity = 0
    }
  })
}

export const animateSzeneVisible = (
  rotateGroup: Group,
  animateOpacityGroup: Group
) => {
  rotateGroup.rotation.y = lerp(rotateGroup.rotation.y, 0, 0.03)
  animateOpacityGroup.traverse((child) => {
    if (child.isMesh) {
      child.material.opacity = lerp(child.material.opacity, 1, 0.03)
    }
  })
}

export const animateAmpImpact = (group: Group, amp: number) => {
  group.scale.lerpVectors(group.scale, getScalar(1 + amp), 0.15)
}
