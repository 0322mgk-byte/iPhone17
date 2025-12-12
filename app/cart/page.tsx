"use client";

import { Container, Title, Text, Button, Group, Stack, Box } from '@mantine/core';
import { useCart } from '../../context/CartContext';
import NextImage from 'next/image';
import Link from 'next/link';
import { BlurFade } from '../../components/magicui/blur-fade';

import { IconTrash } from '@tabler/icons-react';
import css from './CartPage.module.css';

export default function CartPage() {
    const { items, removeFromCart, total } = useCart();

    return (
        <div className={css.container}>
            <Container size="md">
                <BlurFade delay={0.1}>
                    <Title className={css.title}>Your Bag</Title>
                </BlurFade>

                {items.length === 0 ? (
                    <BlurFade delay={0.2}>
                        <div className={css.emptyCart}>
                            <Text mb="xl">Your bag is empty.</Text>
                            <Link href="/buy" style={{ textDecoration: 'none' }}>
                                <Button size="lg" radius="xl" color="blue">
                                    Shop iPhone
                                </Button>
                            </Link>
                        </div>
                    </BlurFade>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                        {/* Cart Items List */}
                        <div className={css.cartList}>
                            <Stack>
                                {items.map((item, index) => (
                                    <BlurFade key={item.id} delay={0.1 * (index + 1)}>
                                        <div className={css.item}>
                                            <div style={{ display: 'flex', gap: '20px' }}>
                                                <Box className={css.itemImage} style={{ width: 100, height: 100, position: 'relative', overflow: 'hidden' }}>
                                                    <NextImage
                                                        src={item.color.image}
                                                        alt={item.model}
                                                        fill
                                                        style={{ objectFit: 'contain', padding: '10px' }}
                                                    />
                                                </Box>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <div>
                                                            <Text className={css.itemName}>{item.model}</Text>
                                                            <Text className={css.itemDetail}>{item.color.name}</Text>
                                                            <Text className={css.itemDetail}>{item.storage}</Text>
                                                        </div>
                                                        <Text className={css.itemPrice}>${item.price.toLocaleString()}</Text>
                                                    </div>
                                                    <Group justify="flex-end" mt="md">
                                                        <Button
                                                            variant="subtle"
                                                            color="red"
                                                            size="xs"
                                                            leftSection={<IconTrash size={14} />}
                                                            onClick={() => removeFromCart(item.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Group>
                                                </div>
                                            </div>
                                        </div>
                                    </BlurFade>
                                ))}
                            </Stack>
                        </div>

                        {/* Summary */}
                        <div>
                            <BlurFade delay={0.3}>
                                <div className={css.summary}>
                                    <div className={css.summaryRow}>
                                        <Text>Subtotal</Text>
                                        <Text>${total.toLocaleString()}</Text>
                                    </div>
                                    <div className={css.summaryRow}>
                                        <Text>Shipping</Text>
                                        <Text>Free</Text>
                                    </div>
                                    <div className={css.totalRow}>
                                        <Text>Total</Text>
                                        <Text>${total.toLocaleString()}</Text>
                                    </div>

                                    <Button
                                        fullWidth
                                        size="xl"
                                        radius="xl"
                                        color="blue"
                                        className={css.checkoutButton}
                                    >
                                        Check Out
                                    </Button>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
