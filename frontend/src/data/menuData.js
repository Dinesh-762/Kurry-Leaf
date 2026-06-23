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
  { id: 'biryani',   name: 'Biryani' },
  { id: 'mocktails', name: 'Mocktails' },
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
  ],

  // -------------------- BIRYANI --------------------
  biryani: [
    {
      id: 10,
      name: 'Veg Dum Biryani',
      description: 'Layered rice with seasonal vegetables',
      price: 280,
      image: 'https://images.unsplash.com/photo-1633945274417-ab205ae69d10?w=400',
      isSpicy: true,
    },
    {
      id: 11,
      name: 'Paneer Biryani',
      description: 'Fragrant rice with spiced cottage cheese',
      price: 320,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400',
    },
  ],

  // -------------------- MOCKTAILS --------------------
  mocktails: [
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
  ],

};
