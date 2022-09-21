import { useGLTF } from '@react-three/drei'; // this will allow us to use the gltf loader
import { Canvas } from '@react-three/fiber'; // this will allow us to use the canvas renderer
import { motion } from 'framer-motion/three';
import { degreesToRadians } from 'popmotion'; // this will be used to convert degrees to radians

export function StarIcon({ isLiked, isHover }) {

  const { nodes } = useGLTF('/star-icon.glb'); // this will load the gltf file

  const lights = [
    [2, 1, 4, 1],
    [8, 0, 4, 1],
  ];

  const animate = [isLiked ? 'liked' : 'unliked', isHover ? 'hover' : ''];
  const variants = {
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
        rotateZ: { duration: 1.5, ease: 'linear', repeat: Infinity }, // this will rotate the mesh in a circle
      },
    },
  };

  return (
    <Canvas
      resize={{ offsetSize: true }} // this will allow us to resize the canvas
      dpr={[1, 2]} // this will allow us to render at a higher resolution
      camera={{
        position: [0, 0, 5.5], // x, y, z
        fov: 45, // the field of view of the camera, in degrees
      }}
    >

      {lights.map(([x, y, z, intensity], i) => (
        <pointLight
          key={i}
          intensity={intensity} // the intensity of the light
          position={[x / 8, y / 8, z / 8]} // x, y, z position of the light
          color="white" // the color of the light
        />
      ))}
      <group // a group is a container for other objects in the scene
        dispose={null} /* dispose is a function that will be called when the 
                          group is removed from the scene, 
                        that is why we set it to null, so it won't be called */
      >

        <motion.mesh // a mesh is not more than a single geometry + material combination
          geometry={nodes.Star.geometry} // a geometry is a collection of vertices and faces
          rotation={
            // this references the eulerAngles property of the mesh
            [
              Math.PI / 2, // representing the tilt of the star in radians ( 90 degrees ) x axis
              0, // y axis - in this case ,
              degreesToRadians(360), // representing the spin of the star in radians ( 360 degrees ) z axis
            ]
          }
          scale={1}
          animate={animate} // this will animate the mesh
          variants={variants}
        >
          <meshPhongMaterial // the material for the mesh
            color="#343434" // the color of the mesh
            emissive="#343434" // Emissive (light) color of the material, essentially a solid color unaffected by other lighting. Default is black.
            specular="#fff" // This defines how shiny the material is and the color of its shine.
            shininess="10" // the shininess of the mesh (0 is matte, 100 is shiny)
          />
        </motion.mesh>

      </group>
    </Canvas>
  );
}
