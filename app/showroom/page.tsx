"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Environment, Float, Stars } from "@react-three/drei";
import { IPhoneModel } from "../../components/IPhoneModel";
import { Button, Container, Text, Title, Box } from "@mantine/core";
import Link from "next/link";
import { IconArrowLeft, IconRotate360 } from "@tabler/icons-react";
import { BlurFade } from "../../components/magicui/blur-fade";
import { useMediaQuery } from '@mantine/hooks';

import css from './ShowroomPage.module.css';

export default function ShowroomPage() {
    // Media query to detect mobile devices
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={css.container}>

            {/* UI Overlay */}
            <div className={css.uiOverlay}>
                <Container size="xl">
                    <BlurFade delay={0.2} inView>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <Title className={css.title}>
                                    Titanium.<br />Up Close.
                                </Title>
                                <Text c="dimmed" mt="sm" className={css.description}>
                                    Experience the refined finish of iPhone 17 Pro.
                                </Text>
                                <Link href="/" className={css.homeButton}>
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

                            <Box className={css.controlsHint}>
                                <IconRotate360 size={32} color="white" />
                                <Text c="white" size="xs" mt={5}>Drag to rotate</Text>
                                <Text c="white" size="xs">Scroll to zoom</Text>
                            </Box>
                        </div>
                    </BlurFade>
                </Container>
            </div>

            {/* 3D Canvas */}
            <div className={css.canvasContainer}>
                {/* Initial Zoom: Further (11) on mobile, Intermediate (12) on desktop */}
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, isMobile ? 11 : 12], fov: 45 }}>
                    <fog attach="fog" args={["#000", 5, 20]} />
                    <color attach="background" args={["#000"]} />

                    {/* Stars: Responsive settings - Intense on mobile, calmer on desktop */}
                    <Stars
                        radius={100}
                        depth={50}
                        count={isMobile ? 7000 : 3000}
                        factor={isMobile ? 7 : 3}
                        saturation={0}
                        speed={0}
                    />

                    {/* Lighting & Environment */}
                    <Environment preset="city" />
                    {/* Much brighter lights as requested */}
                    <ambientLight intensity={3} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={200} castShadow />

                    {/* Model: Start showing the back (rotation) */}
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <IPhoneModel rotation={[0, Math.PI, 0]} />
                    </Float>

                    {/* Controls */}
                    <OrbitControls
                        makeDefault
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        minDistance={5}
                        maxDistance={100}
                        autoRotate
                        autoRotateSpeed={1.5}
                    />
                </Canvas>
            </div>
        </div>
    );
}
