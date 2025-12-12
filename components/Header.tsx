"use client";

import { Box, Container, Group, Text, Button, Burger, rem } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { IconBrandApple, IconShoppingBag } from '@tabler/icons-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import css from './Header.module.css';

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [scroll] = useWindowScroll();
    const isScrolled = scroll.y > 500;
    const { count } = useCart();

    const links = [
        { link: '/', label: 'Overview' },
        { link: '/buy', label: 'Buy' },
    ];

    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={css.link}
        >
            {link.label}
        </Link>
    ));

    return (
        <Box
            component="header"
            className={css.header}
            data-visible={isScrolled}
        >
            <Container size="xl" className={css.inner} style={{ position: 'relative' }}>
                {/* Left: Title */}
                <Text fw={600} size="sm" c="white" style={{ cursor: 'default' }}>
                    iPhone 17 Pro
                </Text>

                {/* Center: Links */}
                <Group gap={5} visibleFrom="xs" className={css.centeredGroup}>
                    {items}
                </Group>

                {/* Right: Cart */}
                <Group gap="xs">
                    <Link href="/cart" style={{ textDecoration: 'none' }}>
                        <Box style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <IconShoppingBag size={20} style={{ color: '#f5f5f7' }} />
                            {count > 0 && (
                                <Box
                                    style={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        backgroundColor: '#0071e3',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '16px',
                                        height: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        fontWeight: 700,
                                    }}
                                >
                                    {count}
                                </Box>
                            )}
                        </Box>
                    </Link>
                </Group>

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            </Container>
        </Box>
    );
}
