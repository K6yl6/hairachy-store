export const LAUNCH_DISCOUNT_AMOUNT = 5;

export const productColors = [
  {
    name: "Jet Black",
    code: "1",
    label: "Jet Black — 1",
  },
  {
    name: "Natural Black",
    code: "1B",
    label: "Natural Black — 1B",
  },
  {
    name: "Dark Brown",
    code: "2",
    label: "Dark Brown — 2",
  },
  {
    name: "Medium Brown",
    code: "4",
    label: "Medium Brown — 4",
  },
  {
    name: "Honey Blonde",
    code: "27",
    label: "Honey Blonde — 27",
  },
  {
    name: "Copper Brown",
    code: "30",
    label: "Copper Brown — 30",
  },
  {
    name: "Burgundy",
    code: "99J",
    label: "Burgundy — 99J",
  },
  {
    name: "Black/Copper Ombré",
    code: "T1B/30",
    label: "Black/Copper Ombré — T1B/30",
  },
];

function applyLaunchDiscount(price) {
  const originalPrice = Number(price);

  return {
    originalPrice,
    price: Math.max(
      0,
      originalPrice - LAUNCH_DISCOUNT_AMOUNT
    ),
    discountAmount: LAUNCH_DISCOUNT_AMOUNT,
  };
}

const baseProducts = [
  {
    id: "spiral",
    name: "Spiral",
    category: "Curly Hair",
    price: 50,
    image: "/products/catalog/spiral.png",
    colors: productColors,
    description:
      "Spiral-textured extension hair available in classic, blonde and ombré shades.",
  },

  {
    id: "outre",
    name: "Outré",
    category: "Braiding Hair",
    price: 40,
    image: "/products/catalog/outre.png",
    colors: productColors,
    description:
      "Outré braiding hair available in a selection of classic and statement colors.",
  },

  {
    id: "uniqueness-kinky",
    name: "Uniqueness Kinky",
    category: "Kinky Hair",
    price: 50,
    image:
      "/products/catalog/uniqueness-kinky.png",
    colors: productColors,
    description:
      "Kinky-textured extension hair available in multiple color options.",
  },

  {
    id: "queensky-kinky",
    name: "Queensky Kinky",
    category: "Kinky Hair",
    price: 50,
    image:
      "/products/catalog/queensky-kinky.png",
    colors: productColors,
    description:
      "Queensky kinky extension hair available in several selectable colors.",
  },

  {
    id: "river-locs",
    name: "River Locs",
    category: "Locs",
    price: 85,
    image:
      "/products/catalog/river-locs.png",
    colors: productColors,
    description:
      "River loc extensions available in natural, brown, blonde, copper and burgundy shades.",
  },

  {
    id: "oak-locs",
    name: "Oak Locs",
    category: "Locs",
    price: 100,
    image: "/products/catalog/oak-locs.png",
    colors: productColors,
    description:
      "Oak loc extensions available across the complete Hairachy color selection.",
  },

  {
    id: "soft-butterfly-locs",
    name: "Soft Butterfly Locs",
    category: "Locs",
    price: 85,
    image:
      "/products/catalog/soft-butterfly-locs.png",
    colors: productColors,
    description:
      "Soft butterfly loc extensions offered in eight selectable colors.",
  },

  {
    id: "italian-curls",
    name: "Italian Curls",
    category: "Curly Hair",
    price: 50,
    image:
      "/products/catalog/italian-curls.png",
    colors: productColors,
    description:
      "Italian curl extensions available in natural and expressive color options.",
  },

  {
    id: "bone-straight",
    name: "Bone Straight",
    category: "Straight Hair",
    price: 50,
    image:
      "/products/catalog/bone-straight.png",
    colors: productColors,
    description:
      "Straight extension hair offered in the complete Hairachy color selection.",
  },

  {
    id: "body-wave",
    name: "Body Wave",
    category: "Wavy Hair",
    price: 50,
    image:
      "/products/catalog/body-wave.png",
    colors: productColors,
    description:
      "Body-wave extension hair available in eight selectable colors.",
  },

  {
    id: "darling-kinky",
    name: "Darling Kinky",
    category: "Kinky Hair",
    price: 45,
    image:
      "/products/catalog/darling-kinky.png",
    colors: productColors,
    description:
      "Darling kinky extension hair available in all eight Hairachy color options.",
  },

  {
    id: "darling-passion-twist",
    name: "Darling Passion Twist",
    category: "Twist Hair",
    price: 80,
    image:
      "/products/catalog/darling-passion-twist.png",
    colors: productColors,
    description:
      "Darling Passion Twist extensions available in the Hairachy color selection.",
  },
];

const products = baseProducts.map(
  (product) => ({
    ...product,
    ...applyLaunchDiscount(
      product.price
    ),
  })
);

export default products;