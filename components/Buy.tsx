import Link from 'next/link';
import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import css from './Buy.module.css';

export function Buy() {
    // const { addToCart } = useCart(); // Unused

    return (
        <section id="buy" className={css.section}>
            <Container size="lg">
                <Stack align="center" gap="xl">
                    <Title className={css.title}>iPhone 17 Pro</Title>
                    <Text className={css.price}>From $999 or $41.62/mo. for 24 mo.</Text>

                    <Group>
                        <Link href="/buy" style={{ textDecoration: 'none' }}>
                            <Button size="lg" radius="xl" className={css.buyButton}>
                                Buy
                            </Button>
                        </Link>
                        <Link href="/showroom" style={{ textDecoration: 'none' }}>
                            <Button size="xl" radius="xl" variant="outline" className={css.learnButton}>
                                Learn more
                            </Button>
                        </Link>
                    </Group>
                </Stack>
            </Container>
        </section>
    );
}
