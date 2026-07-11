/* ============================================================================
   KURRY LEAF — MENU DATA
   ----------------------------------------------------------------------------
   This is the ONLY file the restaurant owner needs to edit to update the
   dish-showcase menu on the website. You do NOT need to touch any other file.

   You can update:
     • Dish name
     • Description
     • Price (numbers only, no ₹ symbol)
     • Image URL
     • Category tabs (the buttons users click)
     • Mark a dish as Chef's Special (gold badge) or Spicy (red badge)

   ----------------------------------------------------------------------------
   HOW TO EDIT — quick rules
   ----------------------------------------------------------------------------
   1. Keep every comma, quote (' or "), and curly brace { } exactly as shown.
   2. `id` MUST be unique for every dish — never repeat a number.
   3. `price` is a number (e.g. 280) — do NOT add ₹ or quotes.
   4. `image` must be a direct image URL (https://...). Upload to your hosting
      first, then paste the link here.
   5. To add a new dish: copy an entire `{ ... },` block, paste below it, and
      change the values.
   6. To remove a dish: delete the entire `{ ... },` line including the comma.
   7. To add a NEW category: add an item to `menuCategories` AND add a new
      key with that same `id` in `menuItems`.

   After saving, the website updates automatically — no rebuild needed in dev.
   For production, ask the developer to redeploy.
   ============================================================================ */


// ---------------------------------------------------------------------------
// CATEGORY TABS — order shown on the website (left → right)
// ---------------------------------------------------------------------------
// `id` must match the key used in menuItems below.
// `name` is the label shown on the tab button.
// ---------------------------------------------------------------------------
export const menuCategories = [
  { id: 'signature', name: 'Signature' },
  { id: 'starters',  name: 'Starters' },
  { id: 'mains',     name: 'Main Course' },
  { id: 'rice-beyond', name: 'Rice & Beyond' },
  { id: 'desserts-mocktails', name: 'Desserts & Mocktails' },
];


// ---------------------------------------------------------------------------
// DISHES — grouped by category id
// ---------------------------------------------------------------------------
// Each dish has:
//   id            (required, unique number)
//   name          (required, text)
//   description   (required, short tagline shown under the name)
//   price         (required, number in ₹ — no symbol, no quotes)
//   image         (required, direct image URL)
//   isChefSpecial (optional, true/false — shows gold "Chef's Special" badge)
//   isSpicy       (optional, true/false — shows red "Spicy" badge)
// ---------------------------------------------------------------------------
export const menuItems = {

  // -------------------- SIGNATURE --------------------
  signature: [
    {
      id: 1,
      name: 'Veg Lanchar',
      description: 'Herbed spinach patty with artistic plating & drizzle',
      price: 260,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/9go17kxb_sig%201%20.jpeg',
      isChefSpecial: true,
    },
    {
      id: 2,
      name: 'Paneer Matka Kebab',
      description: 'Slow-cooked paneer kebab served in a traditional clay pot',
      price: 330,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/iya2nc0g_sig%202.jpeg',
      isChefSpecial: true,
    },
    {
      id: 3,
      name: 'Paneer Kurchan',
      description: 'Rich creamy paneer in a spiced tomato gravy with fresh cream',
      price: 280,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/c04h7ml7_sig%203%20.jpeg',
      isChefSpecial: true,
    },

    // ----- Chef's Specials (text-only, no photos yet) -----
    { id: 51, name: 'Manchow Soup',                    price: 135 },
    { id: 52, name: 'Dal Shorba',                      price: 145 },
    { id: 53, name: 'Burnt Garlic Cheese Paneer Tikka', price: 320 },
    { id: 54, name: 'Tandoori Platter',                price: 555 },
    { id: 55, name: 'Cheese Cigar Roll',               price: 310 },
    { id: 56, name: 'Paneer Chilli',                   price: 280 },
    { id: 57, name: 'Paneer Sathe',                    price: 330 },
    { id: 58, name: 'Yesar Wadi',                      price: 255 },
    { id: 59, name: 'Umar Handi',                      price: 290 },
    { id: 60, name: 'Paneer Rajwada',                  price: 285 },
    { id: 61, name: 'Paneer Cheese Roll Masala',       price: 295 },
    { id: 62, name: 'Kaju Masala',                     price: 275 },
    { id: 63, name: 'Veg Jalfrezi',                    price: 260 },
    { id: 64, name: "Kurry Leaf's Special",            price: 385 },
  ],

  // -------------------- STARTERS --------------------
  starters: [
    {
      id: 4,
      name: 'Veg Lolypop',
      description: 'Crispy spiced vegetable lollipops served with tangy dipping sauce',
      price: 260,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/wjl9vo3g_starter%201%20.jpeg',
    },
    {
      id: 5,
      name: 'Cheese Ciga Role',
      description: 'Golden crispy rolls stuffed with melted cheese & herbs',
      price: 310,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/9iqbbbbe_starter%203.jpeg',
    },

    // ----- Krispy Bites -----
    { id: 101, name: 'Roasted Papad',            price: 35  },
    { id: 102, name: 'Fried Papad',              price: 40  },
    { id: 103, name: 'Roasted Masala Papad',     price: 45  },
    { id: 104, name: 'Masala Papad',             price: 55  },
    { id: 105, name: 'Sindhi / Khichha Papad',   price: 80  },
    { id: 106, name: 'Onion Rings',              price: 85  },
    { id: 107, name: 'Butter Cheese Papad',      price: 95  },
    { id: 108, name: 'Khicha Churi',             price: 95  },
    { id: 109, name: 'Papad Churi',              price: 95  },
    { id: 110, name: 'French Fries Salted',      price: 125 },
    { id: 111, name: 'Peri Peri Fries',          price: 145 },
    { id: 112, name: 'Paneer Pakoda',            price: 170 },
    { id: 113, name: 'Soya Chilli',              price: 155 },
    { id: 114, name: 'Cheese French Fries',      price: 195 },
    { id: 115, name: 'Cheese Pakoda',            price: 180 },
    { id: 116, name: 'Lasoon Fry',               price: 170 },

    // ----- Soups -----
    { id: 131, name: 'Tomato Soup',              price: 130 },
    { id: 132, name: 'Manchow Soup',             price: 135 },
    { id: 133, name: 'Hot & Sour Soup',          price: 130 },
    { id: 134, name: 'Lemon Coriander Soup',     price: 140 },
    { id: 135, name: 'Dal Shorba',               price: 145 },
    { id: 136, name: 'Tomato Shorba',            price: 155 },

    // ----- Klay Pot Starters -----
    { id: 151, name: 'Tandoori Broccoli',                price: 295 },
    { id: 152, name: 'Tandoori Paneer Tikka',            price: 285 },
    { id: 153, name: 'Hara Bara Kebab',                  price: 195 },
    { id: 154, name: 'Paneer Pahadi',                    price: 295 },
    { id: 155, name: 'Paneer Banjara',                   price: 285 },
    { id: 156, name: 'Burnt Garlic Cheese Paneer Tikka', price: 320 },
    { id: 157, name: 'Tandoori Mushroom Tikka',          price: 220 },
    { id: 158, name: 'Paneer Matka Kebab',               price: 330 },
    { id: 159, name: 'Tandoori Platter',                 price: 555 },

    // ----- Early Kravings -----
    { id: 171, name: 'Cheese Cigar Roll',        price: 310 },
    { id: 172, name: 'Cheese Corn Balls',        price: 285 },
    { id: 173, name: 'Spicy Paneer Terriyaki',   price: 295 },
    { id: 174, name: 'Paneer Chilly',            price: 280 },
    { id: 175, name: 'Veg Manchurian',           price: 205 },
    { id: 176, name: 'Paneer Krispy',            price: 255 },
    { id: 177, name: 'Veg Krispy',               price: 205 },
    { id: 178, name: 'Veg Lollipop',             price: 260 },
    { id: 179, name: 'Krispy Bhendi',            price: 155 },
    { id: 180, name: 'Paneer Sathe',             price: 330 },
    { id: 181, name: 'Veg Lanchar',              price: 260 },
  ],

  // -------------------- MAIN COURSE --------------------
  mains: [
    {
      id: 7,
      name: 'Veg Patiyala',
      description: 'Rich Patiala-style gravy with cream drizzle & fresh herbs',
      price: 285,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/5qcsiiwx_main%20c%201%20.jpeg',
    },
    {
      id: 8,
      name: 'Paneer Kurchan',
      description: 'Herbed spinach paneer with artistic plating & garnish',
      price: 280,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/fy86szrd_main%201%20.jpeg',
    },

    // ----- Soul of Maharashtra -----
    { id: 301, name: 'Veg Maratha',         price: 245 },
    { id: 302, name: 'Shevga Maratha',      price: 240 },
    { id: 303, name: 'Shev Bhaji',          price: 230 },
    { id: 304, name: 'Shevga Fry',          price: 230 },
    { id: 305, name: 'Yesar Wadi',          price: 255 },
    { id: 306, name: 'Methi Masala',        price: 245 },
    { id: 307, name: 'Lasooni Methi',       price: 255 },
    { id: 308, name: 'Tawa Besan',          price: 235 },
    { id: 309, name: 'Bhendi Fry',          price: 240 },
    { id: 310, name: 'Bhendi Masala',       price: 245 },
    { id: 311, name: 'Methi Besan',         price: 255 },
    { id: 312, name: 'Akkha Masoor',        price: 255 },
    { id: 313, name: 'Umar Handi',          price: 290 },
    { id: 314, name: 'Mushroom Maratha',    price: 270 },
    { id: 315, name: 'Tawa Theccha',        price: 80  },

    // ----- Paneer Cellar -----
    { id: 331, name: 'Paneer Lababdar',           price: 280 },
    { id: 332, name: 'Paneer Masala',             price: 260 },
    { id: 333, name: 'Palak Paneer',              price: 260 },
    { id: 334, name: 'Paneer Butter Masala',      price: 270 },
    { id: 335, name: 'Paneer Tikka Masala',       price: 275 },
    { id: 336, name: 'Paneer Kurchan',            price: 280 },
    { id: 337, name: 'Paneer Rajwada',            price: 285 },
    { id: 338, name: 'Paneer Pahadi Masala',      price: 290 },
    { id: 339, name: 'Kaju Paneer',               price: 285 },
    { id: 340, name: 'Paneer Mutter Masala',      price: 270 },
    { id: 341, name: 'Paneer Cheese Roll Masala', price: 295 },
    { id: 342, name: 'Tawa Paneer',               price: 275 },

    // ----- Northern Kurries -----
    { id: 361, name: 'Mix Veg',              price: 240 },
    { id: 362, name: 'Veg Kolhapuri',        price: 255 },
    { id: 363, name: 'Veg Kadhai',           price: 260 },
    { id: 364, name: 'Veg Patiala',          price: 285 },
    { id: 365, name: 'Veg Bhoona Masala',    price: 260 },
    { id: 366, name: 'Deewani Handi',        price: 270 },
    { id: 367, name: 'Kaju Kurry',           price: 280 },
    { id: 368, name: 'Kaju Masala',          price: 275 },
    { id: 369, name: 'Green Peas Masala',    price: 235 },
    { id: 370, name: 'Mushroom Masala',      price: 260 },
    { id: 371, name: 'Aloo Mutter',          price: 225 },
    { id: 372, name: 'Lasooni Palak',        price: 225 },
    { id: 373, name: 'Veg Kofta',            price: 270 },
    { id: 374, name: 'Malai Kofta',          price: 280 },
    { id: 375, name: 'Veg Jalfrezi',         price: 260 },
    { id: 376, name: "Kurry Leaf's Special", price: 385 },

    // ----- Phulka Friends -----
    { id: 401, name: 'Chapati',              price: 35  },
    { id: 402, name: 'Butter Chapati',       price: 45  },
    { id: 403, name: 'Ghee Chapati',         price: 45  },
    { id: 404, name: 'Tandoor Roti',         price: 35  },
    { id: 405, name: 'Butter Tandoor Roti',  price: 45  },
    { id: 406, name: 'Wheat Roti',           price: 35  },
    { id: 407, name: 'Butter Wheat Roti',    price: 45  },
    { id: 408, name: 'Naan',                 price: 65  },
    { id: 409, name: 'Butter Naan',          price: 80  },
    { id: 410, name: 'Garlic Naan',          price: 85  },
    { id: 411, name: 'Cheese Naan',          price: 90  },
    { id: 412, name: 'Cheese Garlic Naan',   price: 105 },
    { id: 413, name: 'Chili Garlic Naan',    price: 95  },
    { id: 414, name: 'Laccha Paratha',       price: 70  },
    { id: 415, name: 'Methi Paratha',        price: 80  },
    { id: 416, name: 'Missi Roti',           price: 55  },
    { id: 417, name: 'Aloo Paratha',         price: 105 },
    { id: 418, name: 'Paneer Paratha',       price: 135 },
    { id: 419, name: 'Theccha Paratha',      price: 130 },
    { id: 420, name: 'Garlic Roti',          price: 55  },

    // ----- Dal Legacy -----
    { id: 441, name: 'Dal Fry',        price: 190 },
    { id: 442, name: 'Dal Tadka',      price: 210 },
    { id: 443, name: 'Dal Kolhapuri',  price: 210 },
    { id: 444, name: 'Dal Palak',      price: 210 },
    { id: 445, name: 'Dal Methi',      price: 215 },
  ],

  // -------------------- BIRYANI --------------------
  // (Removed — category no longer shown on the site)

  // -------------------- RICE & BEYOND --------------------
  'rice-beyond': [
    { id: 501, name: 'Steam Rice',                        price: 135 },
    { id: 502, name: 'Plain Indrayani Rice',              price: 140 },
    { id: 503, name: 'Jeera Rice',                        price: 140 },
    { id: 504, name: 'Curd Rice',                         price: 160 },
    { id: 505, name: 'Ghee Rice',                         price: 145 },
    { id: 506, name: 'Veg Pulao',                         price: 210 },
    { id: 507, name: 'Peas Pulao',                        price: 195 },
    { id: 508, name: 'Paneer Pulao',                      price: 230 },
    { id: 509, name: 'Matka Dum Biryani',                 price: 310 },
    { id: 510, name: 'Dal Khichadi',                      price: 330 },
    { id: 511, name: 'Palak Khichadi',                    price: 235 },
    { id: 512, name: 'Hakka Noodles',                     price: 205 },
    { id: 513, name: 'Schezwan Noodles',                  price: 210 },
    { id: 514, name: 'Manchurian Noodles',                price: 240 },
    { id: 515, name: 'Chilli Garlic Noodles',             price: 255 },
    { id: 516, name: 'Terriyaki Noodles',                 price: 270 },
    { id: 517, name: 'Fried Rice',                        price: 310 },
    { id: 518, name: 'Schezwan Fried Rice',               price: 325 },
    { id: 519, name: 'Triple Schezwan Fried Rice & Noodles', price: 270 },
    { id: 520, name: 'Paneer Tikka Biryani',              price: 325 },
    { id: 521, name: 'Burnt Garlic Fried Rice',           price: 225 },
  ],

  // -------------------- DESSERTS & MOCKTAILS --------------------
  'desserts-mocktails': [
    {
      id: 20,
      name: 'Virgin Mojito',
      description: 'Classic lime & mint cooler with a refreshing fizz',
      price: 70,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/lkejt919_mocktail2.jpeg',
    },
    {
      id: 21,
      name: 'Kalakhatta Mojito',
      description: 'Tangy berry-spiced mojito with a desi twist',
      price: 120,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/as1xmpvs_mocktail%201.jpeg',
    },
    {
      id: 22,
      name: 'Watermelon Mojito',
      description: 'Fresh watermelon blended with mint & lime',
      price: 130,
      image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/kwfp49ky_mocktail3.jpeg',
    },

    // ----- Joyful Endings (Desserts) -----
    { id: 601, name: 'Tall Glory',            price: 160 },
    { id: 602, name: 'Funny Bunny',           price: 180 },
    { id: 603, name: 'Mango Exotica',         price: 170 },
    { id: 604, name: 'Titanic',               price: 180 },
    { id: 605, name: 'Blueberry Cheesecake',  price: 250 },
    { id: 606, name: 'Nutella Cheesecake',    price: 270 },
    { id: 607, name: 'Gulab Jamun (2 pcs)',   price: 90  },
    { id: 608, name: 'Rasgulla (2 pcs)',      price: 95  },
    { id: 609, name: 'Jamun Shots',           price: 50  },

    // ----- Beverage -----
    { id: 621, name: 'Mineral Water',                    price: 20 },
    { id: 622, name: 'Fresh Lime Soda (Sweet/Salt)',     price: 40 },
    { id: 623, name: 'Fresh Lime Water (Sweet/Salt)',    price: 30 },
    { id: 624, name: 'Masala Buttermilk',                price: 45 },

    // ----- Ice Creams -----
    { id: 641, name: 'Mango Ice Cream',          price: 80  },
    { id: 642, name: 'Chocolate Ice Cream',      price: 90  },
    { id: 643, name: 'Butterscotch Ice Cream',   price: 80  },
    { id: 644, name: 'Strawberry Ice Cream',     price: 90  },
    { id: 645, name: 'Vanilla Ice Cream',        price: 80  },
    { id: 646, name: 'Chocolate Brownie',        price: 95  },
    { id: 647, name: 'Cookies and Cream',        price: 95  },
    { id: 648, name: 'Afghan Dry Fruit',         price: 105 },
    { id: 649, name: 'Falooda Ice Cream',        price: 110 },

    // ----- Mocktails & Smoothies -----
    { id: 661, name: 'Berry Melon Spritz',       price: 230 },
    { id: 662, name: 'Hot Mess',                 price: 170 },
    { id: 663, name: 'Black and Blue',           price: 170 },
    { id: 664, name: 'Cranberry Mojito',         price: 140 },
    { id: 665, name: 'Watermelon / Strawberry / Kiwi / Green Apple Mojito', price: 140 },
    { id: 666, name: "Devil's Eye",              price: 210 },
    { id: 667, name: 'Cold Coffee',              price: 120 },
    { id: 668, name: 'Chocolate Cold Coffee',    price: 140 },
    { id: 669, name: 'Oreo Shake',               price: 180 },
    { id: 670, name: 'Kit Kat Shake',            price: 180 },
    { id: 671, name: 'Strawberry Smoothie',      price: 220 },

    // ----- Milkshakes -----
    { id: 681, name: 'Pineapple Milkshake',      price: 160 },
    { id: 682, name: 'Mango Milkshake',          price: 160 },
    { id: 683, name: 'Strawberry Milkshake',     price: 170 },
    { id: 684, name: 'Chocolate Milkshake',      price: 170 },
    { id: 685, name: 'Butterscotch Milkshake',   price: 180 },
    { id: 686, name: 'Blue Lagoon',              price: 190 },
    { id: 687, name: 'Pinacolada',               price: 230 },
  ],

};
