import Bolsa from "../assets/products/Bolsa.webp";
import Boné from "../assets/products/Boné.webp";
import Calça from "../assets/products/Calça.webp";
import CalçaLeve from "../assets/products/CalçaLeve.webp";
import Casaco from "../assets/products/Casaco.webp";
import Casaco2 from "../assets/products/Casaco2.webp";
import Sapato from "../assets/products/Sapato.webp";
import SapatoSocial from "../assets/products/SapatoSocial.webp";
import CintoNoir from "../assets/products/Cinto Noir.webp";
import Jaqueta from "../assets/products/Jaqueta.webp";
import CamisaSocial from "../assets/products/CamisaSocial.webp";
import CamisaSocial2 from "../assets/products/CamisaSocial2.webp";

export const products = [
  {
    id: "Casaco",
    name: "Noir Essential Jacket",
    slug: "noir-essential-jacket",
    description:
      "Jaqueta de corte contemporâneo com acabamento minimalista para composições urbanas.",
    price: 349.9,
    category: "Jaquetas",
    image: Casaco,
    stock: 12,
    featured: true,
    isNew: true,
  },

  {
    id: "Casaco2",
    name: "Midnight Bomber",
    slug: "midnight-bomber",
    description:
      "Jaqueta bomber de estética urbana desenvolvida para combinações casuais e sofisticadas.",
    price: 429.9,
    category: "Jaquetas",
    image: Casaco2,
    stock: 8,
    featured: true,
    isNew: true,
  },

  {
    id: "CamisaSocial2",
    name: "Shadow Overshirt",
    slug: "shadow-overshirt",
    description:
      "Overshirt estruturada com visual versátil e acabamento inspirado na estética noturna de Nova York.",
    price: 289.9,
    category: "Camisas",
    image: CamisaSocial2,
    stock: 15,
    featured: false,
    isNew: true,
  },

  {
    id: "CamisaSocial",
    name: "Noir Classic Shirt",
    slug: "noir-classic-shirt",
    description:
      "Camisa de corte clássico com design minimalista para produções elegantes e contemporâneas.",
    price: 219.9,
    category: "Camisas",
    image: CamisaSocial,
    stock: 20,
    featured: true,
    isNew: false,
  },

  {
    id: "Calça",
    name: "Urban Tailored Pants",
    slug: "urban-tailored-pants",
    description:
      "Calça de alfaiataria contemporânea combinando estrutura, conforto e estética urbana.",
    price: 279.9,
    category: "Calças",
    image: Calça,
    stock: 10,
    featured: false,
    isNew: false,
  },

  {
    id: "CalçaLeve",
    name: "Noir Straight Pants",
    slug: "noir-straight-pants",
    description:
      "Calça de corte reto com visual discreto e versátil para diferentes composições.",
    price: 239.9,
    category: "Calças",
    image: CalçaLeve,
    stock: 18,
    featured: false,
    isNew: true,
  },

  {
    id: "SapatoSocial",
    name: "Midnight Runner",
    slug: "midnight-runner",
    description:
      "Tênis de inspiração urbana com linhas minimalistas e acabamento contemporâneo.",
    price: 389.9,
    category: "Calçados",
    image: SapatoSocial,
    stock: 7,
    featured: true,
    isNew: true,
  },

  {
    id: "Sapato",
    name: "Noir Street Sneaker",
    slug: "noir-street-sneaker",
    description:
      "Tênis versátil desenvolvido para complementar produções urbanas do dia a dia.",
    price: 329.9,
    category: "Calçados",
    image: Sapato,
    stock: 14,
    featured: false,
    isNew: false,
  },

  {
    id: "Cinto Noir",
    name: "Noir Leather Belt",
    slug: "noir-leather-belt",
    description:
      "Cinto de couro com acabamento minimalista e design pensado para composições sofisticadas.",
    price: 149.9,
    category: "Acessórios",
    image: CintoNoir,
    stock: 25,
    featured: false,
    isNew: false,
  },

  {
    id: "Bolsa",
    name: "Midnight Leather Bag",
    slug: "midnight-leather-bag",
    description:
      "Bolsa estruturada de design contemporâneo para complementar produções urbanas.",
    price: 459.9,
    category: "Acessórios",
    image: Bolsa,
    stock: 6,
    featured: true,
    isNew: true,
  },

  {
    id: "Boné",
    name: "Noir Minimal Cap",
    slug: "noir-minimal-cap",
    description:
      "Boné minimalista com identidade visual discreta e acabamento inspirado na estética Noir.",
    price: 99.9,
    category: "Acessórios",
    image: Boné,
    stock: 30,
    featured: false,
    isNew: false,
  },

  {
    id: "Jaqueta",
    name: "After Dark Jacket",
    slug: "after-dark-jacket",
    description:
      "Jaqueta de presença marcante criada para produções noturnas e composições contemporâneas.",
    price: 499.9,
    category: "Jaquetas",
    image: Jaqueta,
    stock: 0,
    featured: true,
    isNew: false,
  },
];