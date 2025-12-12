"use client";

import { useState } from 'react';
import { Container, Title, Text, Button, Box, Group, Stack } from '@mantine/core';
import { useCart } from '../../context/CartContext';
import NextImage from 'next/image';
import css from './BuyPage.module.css';

const COLORS = [
    { id: 'titanium', name: 'Natural Titanium', hex: '#BEBDAE', image: '/iphone_natural.png' },
    { id: 'blue', name: 'Blue Titanium', hex: '#2F3C4D', image: '/iphone_blue.png' },
    { id: 'white', name: 'White Titanium', hex: '#F2F1ED', image: '/iphone_white.png' },
    { id: 'black', name: 'Black Titanium', hex: '#1C1C1E', image: '/iphone_black.png' },
];

const STORAGE = [
    { size: '128GB', price: 0 },
    { size: '256GB', price: 100 },
    { size: '512GB', price: 300 },
    { size: '1TB', price: 500 },
];

const BASE_PRICE = 999;

export default function BuyPage() {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = useState(COLORS[2]); // Default to White based on image
    const [selectedStorage, setSelectedStorage] = useState(STORAGE[1]); // Default to 256GB based on image

    const currentPrice = BASE_PRICE + selectedStorage.price;

    return (
        <div className={css.container}>
            <Container size="lg">
                <div className={css.grid}>
                    {/* Left: Image */}
                    <div className={css.imageSection}>
                        <NextImage
                            src={selectedColor.image}
                            alt={`iPhone 17 Pro - ${selectedColor.name}`}
                            width={400}
                            height={800}
                            className={css.image}
                            priority
                        />
                        <Text className={css.imageLabel}>{selectedColor.name}</Text>
                    </div>

                    {/* Right: Configuration */}
                    <div className={css.configSection}>
                        <div className={css.header}>
                            <Title className={css.title}>iPhone 17 Pro</Title>
                            <Text className={css.basePrice}>From ${BASE_PRICE}</Text>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <Text className={css.sectionTitle}>Color</Text>
                            <div className={css.colorGrid}>
                                {COLORS.map((color) => (
                                    <div
                                        key={color.id}
                                        className={css.colorOption}
                                        data-selected={selectedColor.id === color.id}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        <div
                                            className={css.colorCircle}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Storage Selection */}
                        <div>
                            <Text className={css.sectionTitle}>Storage</Text>
                            <div className={css.storageGrid}>
                                {STORAGE.map((option) => (
                                    <div
                                        key={option.size}
                                        className={css.storageOption}
                                        data-selected={selectedStorage.size === option.size}
                                        onClick={() => setSelectedStorage(option)}
                                    >
                                        <Text className={css.storageSize}>{option.size}</Text>
                                        <Text className={css.storagePrice}>
                                            {option.price === 0 ? 'Base Price' : `+$${option.price}`}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer / Add to Cart */}
                        <div className={css.footer}>
                            <Text className={css.totalPrice}>${currentPrice}</Text>
                            <Button
                                size="xl"
                                radius="xl"
                                fullWidth
                                color="blue"
                                onClick={() => {
                                    addToCart({
                                        id: crypto.randomUUID(),
                                        model: 'iPhone 17 Pro',
                                        color: selectedColor,
                                        storage: selectedStorage.size,
                                        price: currentPrice
                                    });
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Text className={css.addToCartInfo}>
                                Free shipping. Get delivery dates.
                            </Text>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
