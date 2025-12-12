"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment, Float, Stars } from "@react-three/drei";
import { IPhoneModel } from "../../components/IPhoneModel";
import { Button, Container, Text, Title, Box } from "@mantine/core";
import Link from "next/link";
import { IconArrowLeft, IconRotate360 } from "@tabler/icons-react";
import { BlurFade } from "../../components/magicui/blur-fade";

export default function ShowroomPage() {
    return (
        <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000", position: "relative", overflow: 'hidden' }}>

            {/* UI Overlay */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10, padding: "120px 2rem 2rem", pointerEvents: 'none' }}>
                <Container size="xl">
                    <BlurFade delay={0.2} inView>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <Title style={{ color: "white", fontSize: "3rem", lineHeight: 1.1 }}>
                                    Titanium.<br />Up Close.
                                </Title>
                                <Text c="dimmed" mt="sm">
                                    Experience the refined finish of iPhone 17 Pro.
                                </Text>
                                <Link href="/" style={{ pointerEvents: 'auto', display: 'inline-block', marginTop: '2rem' }}>
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        leftSection={<IconArrowLeft size={16} />}
                                        style={{ color: 'white' }}
                                    >
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>

                            <Box style={{ textAlign: 'right', opacity: 0.7 }}>
                                <IconRotate360 size={32} color="white" />
                                <Text c="white" size="xs" mt={5}>Drag to rotate</Text>
                                <Text c="white" size="xs">Scroll to zoom</Text>
                            </Box>
                        </div>
                    </BlurFade>
                </Container>
            </div>

            {/* 3D Canvas */}
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
                <fog attach="fog" args={["#000", 5, 20]} />
                <color attach="background" args={["#000"]} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Lighting & Environment */}
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />

                {/* Model */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <IPhoneModel />
                </Float>

                {/* Controls */}
                <OrbitControls
                    makeDefault
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    minDistance={10}
                    maxDistance={100}
                    autoRotate
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    );
}
