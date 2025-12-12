"use client";

import { Container, Title, Text, SimpleGrid, Divider, Group } from '@mantine/core';
import css from './TechSpecs.module.css';

const specs = [
    { label: 'Display', value: '6.9” Super Retina XDR display' },
    { label: 'Chip', value: 'A19 Pro chip with 6-core GPU' },
    { label: 'Camera', value: 'Pro camera system. 48MP Main | Ultra Wide | Telephoto' },
    { label: 'Material', value: 'Titanium with textured matte glass back' },
    { label: 'Connector', value: 'USB-C supporting USB 3' },
];

export function TechSpecs() {
    return (
        <section className={css.section} id="specs">
            <Container size="md">
                <Title className={css.title}>Tech Specs</Title>
                <div className={css.list}>
                    {specs.map((item, index) => (
                        <div key={index}>
                            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="xs" className={css.row}>
                                <Text className={css.label}>{item.label}</Text>
                                <Text className={css.value}>{item.value}</Text>
                            </SimpleGrid>
                            {index !== specs.length - 1 && <Divider color="dark.6" my="lg" />}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
