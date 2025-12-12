"use client";

import { Container, Title, Text, Button, Group, Image, Box } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import NextImage from 'next/image';
import Link from 'next/link';
import { BlurFade } from './magicui/blur-fade';
import { AuroraText } from './magicui/aurora-text';
import { ShinyButton } from './magicui/shiny-button';
import css from './Hero.module.css';

export function Hero() {
    const { ref, entry } = useIntersection({
        threshold: 0.5,
    });

    return (
        <section className={css.hero}>
            <Container size="xl" className={css.inner} style={{ zIndex: 10, position: 'relative' }}>
                <div className={css.content}>
                    <BlurFade delay={0.25} inView>
                        <Title className={css.title}>iPhone 17 Pro</Title>
                    </BlurFade>

                    <AuroraText className={css.auroraSubtitle}>
                        Titanium. So strong. So light.
                    </AuroraText>

                    <Group className={css.controls}>
                        <Link href="/buy" style={{ textDecoration: 'none' }}>
                            <ShinyButton className="text-lg px-10 py-4">
                                Buy
                            </ShinyButton>
                        </Link>
                        <Link href="/showroom" style={{ textDecoration: 'none' }}>
                            <Button size="lg" radius="xl" variant="outline" className={css.secondaryButton}>
                                Learn more
                            </Button>
                        </Link>
                    </Group>
                </div>

                <Box className={css.imageWrapper}>
                    <NextImage
                        src="/highlights_design_endframe__flnga0hibmeu_large.jpg"
                        alt="iPhone 17 Pro"
                        width={1920}
                        height={1080}
                        priority
                        className={css.image}
                    />
                </Box>
            </Container>
        </section>
    );
}
