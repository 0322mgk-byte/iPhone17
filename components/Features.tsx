"use client";

import { Container, Grid, Card, Image, Text, Title, BackgroundImage } from '@mantine/core';
import css from './Features.module.css';

export function Features() {
    return (
        <section className={css.section} id="features">
            <Container size="xl">
                <Title className={css.sectionTitle}>Highlights.</Title>
                <Grid gutter="md">
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Card className={css.card} radius="lg" padding={0}>
                            <BackgroundImage src="/apples-a19-pro-beats-ryzen-9-9950x-in-single-thread-v0-vzh5z0Eo-8yTQnTa84maiajkCk3O_rRf9TRilW1zDnQ.webp" className={css.bgImage} radius="lg">
                                <div className={css.cardContent}>
                                    <Text className={css.cardLabel}>A19 Pro</Text>
                                    <Title order={3} className={css.cardTitle}>
                                        The monster of chips.
                                    </Title>
                                </div>
                            </BackgroundImage>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card className={css.card} radius="lg" padding={0}>
                            <BackgroundImage src="/titanium.png" className={css.bgImage} radius="lg">
                                <div className={css.cardContent}>
                                    <Text className={css.cardLabel}>Titanium</Text>
                                    <Title order={3} className={css.cardTitle}>
                                        Stronger.<br />Lighter.
                                    </Title>
                                </div>
                            </BackgroundImage>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Card className={css.card} radius="lg" padding={0} style={{ minHeight: '400px' }}>
                            <BackgroundImage src="/hero-image.webp" className={css.bgImage} radius="lg">
                                <div className={css.cardContent} style={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Text className={css.cardLabel}>Camera</Text>
                                    <Title order={3} className={css.cardTitle}>
                                        48MP Main.<br />Detail driven.
                                    </Title>
                                </div>
                            </BackgroundImage>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </section>
    );
}
