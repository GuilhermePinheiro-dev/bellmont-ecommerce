import BellmontNoirEssence from "@/assets/img/product-perfume-1.png";
import BellmontGoldenElixir from "@/assets/img/product-perfume-2.png";
import BellmontImperialOud from "@/assets/img/product-perfume-3.png";
import BellmontChronos from "@/assets/img/product-relogio-1.png";
import BellmontHeritageGold from "@/assets/img/product-relogio-2.png";
import BellmontEclipse from "@/assets/img/product-relogio-3.png";
import BellmontRoyalRing from "@/assets/img/product-acessorio-1.png";
import BellmontSignatureChain from "@/assets/img/product-acessorio-2.png";
import BellmontPremiumPolo from "@/assets/img/product-roupa-1.png";
import BellmontEssentialShirt from "@/assets/img/product-roupa-2.png";

export const products = [
  {
    id: 1,
    name: "Bellmont Noir Essence",
    description:
      "Uma fragrância intensa e sofisticada com notas amadeiradas, couro e âmbar dourado. Criado para homens elegantes e marcantes.",
    price: 489.9,
    images: [BellmontNoirEssence],
    sizes: ["50ml"],
    categoryId: 1,
    slug: "bellmont-noir-essence",
    stock: 12,
    active: true,
    color: "Preto Fosco",
  },
  {
    id: 2,
    name: "Bellmont Golden Elixir",
    description:
      "Perfume premium com toque cítrico refinado, lavanda francesa e fundo quente de baunilha e musk.",
    price: 529.9,
    images: [BellmontGoldenElixir],
    sizes: ["50ml"],
    categoryId: 1,
    slug: "bellmont-golden-elixir",
    stock: 10,
    active: true,
    color: "Dourado Champagne",
  },
  {
    id: 3,
    name: "Bellmont Imperial Oud",
    description:
      "Fragrância luxuosa inspirada no oriente moderno, misturando oud, especiarias nobres e madeira escura.",
    price: 649.9,
    images: [BellmontImperialOud],
    sizes: ["100ml"],
    categoryId: 1,
    slug: "bellmont-imperial-oud",
    stock: 8,
    active: true,
    color: "Marrom Espresso",
  },
  {
    id: 4,
    name: "Bellmont Chronos",
    description:
      "Relógio minimalista com caixa premium em aço escovado e pulseira em couro legítimo preto.",
    price: 1299.9,
    images: [BellmontChronos],
    sizes: ["Único"],
    categoryId: 2,
    slug: "bellmont-chronos",
    stock: 6,
    active: true,
    color: "Preto Ônix",
  },
  {
    id: 5,
    name: "Bellmont Heritage Gold",
    description:
      "Elegância clássica com acabamento dourado champagne e mostrador sofisticado inspirado na alta relojoaria.",
    price: 1499.9,
    images: [BellmontHeritageGold],
    sizes: ["Único"],
    categoryId: 2,
    slug: "bellmont-heritage-gold",
    stock: 5,
    active: true,
    color: "Dourado Fosco",
  },
  {
    id: 6,
    name: "Bellmont Eclipse",
    description:
      "Design moderno com pulseira metálica premium e detalhes minimalistas para um visual sofisticado.",
    price: 1799.9,
    images: [BellmontEclipse],
    sizes: ["Único"],
    categoryId: 2,
    slug: "bellmont-eclipse",
    stock: 4,
    active: true,
    color: "Grafite Escuro",
  },
  {
    id: 7,
    name: "Bellmont Royal Ring",
    description:
      "Anel sofisticado com acabamento polido e design minimalista inspirado em joias clássicas europeias.",
    price: 389.9,
    images: [BellmontRoyalRing],
    sizes: ["16", "17", "18"],
    categoryId: 3,
    slug: "bellmont-royal-ring",
    stock: 9,
    active: true,
    color: "Dourado Premium",
  },
  {
    id: 8,
    name: "Bellmont Signature Chain",
    description:
      "Colar refinado com corrente delicada e pingente exclusivo Bellmont para compor um visual luxuoso.",
    price: 459.9,
    images: [BellmontSignatureChain],
    sizes: ["45cm"],
    categoryId: 3,
    slug: "bellmont-signature-chain",
    stock: 7,
    active: true,
    color: "Ouro Champagne",
  },
  {
    id: 9,
    name: "Bellmont Premium Polo",
    description:
      "Polo premium confeccionada em tecido macio de alta qualidade com caimento elegante e minimalista.",
    price: 279.9,
    images: [BellmontPremiumPolo],
    sizes: ["P", "M", "G"],
    categoryId: 4,
    slug: "bellmont-premium-polo",
    stock: 11,
    active: true,
    color: "Marrom Café",
  },
  {
    id: 10,
    name: "Bellmont Essential Shirt",
    description:
      "Camisa sofisticada com modelagem moderna e tecido leve, perfeita para ocasiões elegantes e casuais.",
    price: 349.9,
    images: [BellmontEssentialShirt],
    sizes: ["P", "M", "G"],
    categoryId: 4,
    slug: "bellmont-essential-shirt",
    stock: 10,
    active: true,
    color: "Bege Areia",
  },
];
