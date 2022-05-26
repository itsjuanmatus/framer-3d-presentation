import { motion } from 'framer-motion/three';
import { degreesToRadians } from 'popmotion'; // this will be used to convert degrees to radians
import { useGLTF } from '@react-three/drei'; // this will allow us to use the gltf loader
import { Canvas } from '@react-three/fiber'; // this will allow us to use the canvas renderer

export function StarIcon({ isLiked, isHover }) {
  const { nodes } = useGLTF('/star-icon.glb');

  const lights = [
    [2, 1, 4, 1],
    [8, 0, 4, 1],
  ];

  return (
    <Canvas
      resize={{ offsetSize: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
    >
      {lights.map(([x, y, z, intensity], i) => (
        <pointLight
          key={i}
          intensity={intensity}
          position={[x / 8, y / 8, z / 8]}
          color="white"
        />
      ))}
      <group // a group is a container for other objects in the scene
        dispose={null} /* dispose is a function that will be called when the 
                         group is removed from the scene, 
                        that is why we set it to null, so it won't be called */
      >
        <motion.mesh // a mesh is not more than a single geometry + material combination
          geometry={nodes.Star.geometry} // a geometry is a collection of vertices and faces
          rotation={[
            // this references the eulerAngles property of the mesh
            Math.PI / 2, // representing the tilt of the star in radians ( 90 degrees ) x axis
            0, // y axis - in this case ,
            degreesToRadians(360), // representing the spin of the star in radians ( 360 degrees ) z axis
          ]}
          scale={1}
          animate={[isLiked ? 'liked' : 'unliked', isHover ? 'hover' : '']} // this will animate the mesh
          variants={{
            unliked: {
              x: [0, 0],
              y: [0, 0],
              scale: 0.9,
            },
            liked: {
              x: 4,
              y: [0, -1.5, 2], // this is a spring animation that will move the mesh down and up over time
              scale: 0.9,
              transition: { duration: 0.5 },
            },
            hover: {
              rotateZ: 0,
              rotateY: 0.3,
              scale: 1.3,
              transition: {
                rotateZ: { duration: 1.5, ease: 'linear', repeat: Infinity },
              },
            },
          }}
        >
          <meshPhongMaterial // the material for the mesh
            color="#ffdd00" // the color of the mesh
            emissive="#ffdd00" // Emissive (light) color of the material, essentially a solid color unaffected by other lighting. Default is black.
            specular="#fff" // This defines how shiny the material is and the color of its shine.
            shininess="100" // the shininess of the mesh (0 is matte, 100 is shiny)
          />
        </motion.mesh>
      </group>
    </Canvas>
  );
}
