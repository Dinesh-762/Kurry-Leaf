// Kurry Leaf - Complete Menu Catalog
// Categories arranged in serving order. Signature picks (with photos) shown first.

export const menuCategories = [
  { id: 'signature', name: 'Signature', tagline: "Chef's Selection" },
  { id: 'krispy-bites', name: 'Krispy Bites', tagline: 'Crisp & Savoury Beginnings' },
  { id: 'soups', name: 'Soups', tagline: 'Warm Comforting Bowls' },
  { id: 'klaypot-starters', name: 'Klay Pot Starters', tagline: 'Tandoor Crafted Delights' },
  { id: 'early-kravings', name: 'Early Kravings', tagline: 'Indo-Chinese Indulgence' },
  { id: 'soul-maharashtra', name: 'Soul of Maharashtra', tagline: 'Authentic Marathi Flavours' },
  { id: 'paneer-cellar', name: 'Paneer Cellar', tagline: 'Cottage Cheese Classics' },
  { id: 'northern-kurries', name: 'Northern Kurries', tagline: 'Royal Indian Gravies' },
  { id: 'dal-legacy', name: 'Dal Legacy', tagline: 'Slow-cooked Lentils' },
  { id: 'phulka-friends', name: 'Phulka Friends', tagline: 'Breads from the Tandoor' },
  { id: 'rice-beyond', name: 'Rice & Beyond', tagline: 'Biryani, Pulao & Noodles' },
  { id: 'joyful-endings', name: 'Joyful Endings', tagline: 'Sweet Indulgences' },
  { id: 'icecreams', name: 'Ice Creams', tagline: 'Scoops of Happiness' },
  { id: 'beverage', name: 'Beverages', tagline: 'Refreshing Sips' },
];

// Helper to generate sequential IDs per category
const mk = (startId) => {
  let n = startId;
  return (name, price, hindi, opts = {}) => ({
    id: n++,
    name,
    description: hindi || '',
    price,
    ...opts,
  });
};

// ---------- SIGNATURE (with photos) ----------
const sig = mk(101);
const signature = [
  sig('Veg Lanchar', 260, 'व्हेज लंचर', {
    image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/9go17kxb_sig%201%20.jpeg',
    isChefSpecial: true,
    blurb: 'Herbed spinach patty with artistic plating & drizzle',
  }),
  sig('Paneer Matka Kebab', 330, 'पनीर मटका कबाब', {
    image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/iya2nc0g_sig%202.jpeg',
    isChefSpecial: true,
    blurb: 'Slow-cooked paneer kebab served in a traditional clay pot',
  }),
  sig('Paneer Kurchan', 280, 'पनीर कुरचन', {
    image: 'https://customer-assets.emergentagent.com/job_ac65c625-03b2-4167-85de-6caf2daabc02/artifacts/c04h7ml7_sig%203%20.jpeg',
    isChefSpecial: true,
    blurb: 'Rich creamy paneer in spiced tomato gravy with fresh cream',
  }),
];

// ---------- KRISPY BITES ----------
const kb = mk(201);
const krispyBites = [
  kb('Roasted Papad', 35, 'रोस्टेड पापड'),
  kb('Fried Papad', 40, 'फ्राईड पापड'),
  kb('Roasted Masala Papad', 45, 'रोस्टेड मसाला पापड'),
  kb('Masala Papad', 55, 'मसाला पापड'),
  kb('Sindhi / Khichha Papad', 80, 'सिंधी पापड / खिचा पापड'),
  kb('Onion Rings', 85, 'ओनियन रिंग्स'),
  kb('Butter Cheese Papad', 95, 'बटर चीज पापड'),
  kb('Khicha Churi', 95, 'खिचा चुरी'),
  kb('Papad Churi', 95, 'पापड चुरी'),
  kb('French Fries Salted', 125, 'फ्रेंच फ्राईज सॉल्टेड'),
  kb('Peri Peri Fries', 145, 'पेरी पेरी फ्राईज'),
  kb('Soya Chilli', 155, 'सोया चिली'),
  kb('Lasoon Fry', 170, 'लसून फ्राय'),
  kb('Paneer Pakoda', 170, 'पनीर पकोडा'),
  kb('Cheese Pakoda', 180, 'चीज पकोडा'),
  kb('Cheese French Fries', 195, 'चीज फ्रेंच फ्राईज'),
];

// ---------- SOUPS ----------
const sp = mk(301);
const soups = [
  sp('Tomato Soup', 130, 'टोमॅटो सूप'),
  sp('Hot & Sour Soup', 130, 'हॉट अँड सॉर सूप'),
  sp('Manchow Soup', 135, 'मंचाव सूप'),
  sp('Lemon Coriander Soup', 140, 'लेमन कोरिएंडर सूप'),
  sp('Dal Shorba', 145, 'दाल शोरबा'),
  sp('Tomato Shorba', 155, 'टोमॅटो शोरबा'),
];

// ---------- KLAY POT STARTERS ----------
const kp = mk(401);
const klaypotStarters = [
  kp('Hara Bara Kebab', 195, 'हरा भरा कबाब'),
  kp('Tandoori Mushroom Tikka', 220, 'तंदूरी मशरूम टिक्का'),
  kp('Tandoori Paneer Tikka', 285, 'तंदूरी पनीर टिक्का'),
  kp('Paneer Banjara', 285, 'पनीर बंजारा'),
  kp('Tandoori Broccoli', 295, 'तंदूरी ब्रोकोली'),
  kp('Paneer Pahadi', 295, 'पनीर पहाडी'),
  kp('Burnt Garlic Cheese Paneer Tikka', 320, 'बर्न्ट गार्लिक चीज पनीर टिक्का'),
  kp('Paneer Matka Kebab', 330, 'पनीर मटका कबाब'),
  kp('Tandoori Platter', 555, 'तंदूरी प्लेटर', { isChefSpecial: true }),
];

// ---------- EARLY KRAVINGS ----------
const ek = mk(501);
const earlyKravings = [
  ek('Krispy Bhendi', 155, 'क्रिस्पी भेंडी'),
  ek('Veg Manchurian', 205, 'व्हेज मंचूरियन'),
  ek('Veg Krispy', 205, 'वेज क्रिस्पी'),
  ek('Paneer Krispy', 255, 'पनीर क्रिस्पी'),
  ek('Veg Lollipop', 260, 'वेज लॉलीपॉप'),
  ek('Veg Lanchar', 260, 'व्हेज लंचर'),
  ek('Paneer Chilly', 280, 'पनीर चिली'),
  ek('Cheese Corn Balls', 285, 'चीज़ कॉर्न बॉल्स'),
  ek('Spicy Paneer Terriyaki', 295, 'स्पायसी पनीर तेरियाकी'),
  ek('Cheese Cigar Roll', 310, 'चीज़ सिगार रोल'),
  ek('Paneer Sathe', 330, 'पनीर साठे'),
];

// ---------- SOUL OF MAHARASHTRA ----------
const sm = mk(601);
const soulMaharashtra = [
  sm('Tawa Theccha', 80, 'तवा ठेचा'),
  sm('Shev Bhaji', 230, 'शेव भाजी'),
  sm('Shevga Fry', 230, 'शेवगा फ्राई'),
  sm('Tawa Besan', 235, 'तवा बेसन'),
  sm('Bhendi Fry', 240, 'भेंडी फ्राई'),
  sm('Shevga Maratha', 240, 'शेवगा मराठा'),
  sm('Veg Maratha', 245, 'व्हेज मराठा'),
  sm('Methi Masala', 245, 'मेथी मसाला'),
  sm('Bhendi Masala', 245, 'भेंडी मसाला'),
  sm('Yesar Wadi', 255, 'येसर वडी'),
  sm('Lasooni Methi', 255, 'लसूनी मेथी'),
  sm('Methi Besan', 255, 'मेथी बेसन'),
  sm('Akkha Masoor', 255, 'अक्खा मसूर'),
  sm('Mushroom Maratha', 270, 'मशरूम मराठा'),
  sm('Umar Handi', 290, 'उमर हंडी'),
];

// ---------- PANEER CELLAR ----------
const pc = mk(701);
const paneerCellar = [
  pc('Paneer Masala', 260, 'पनीर मसाला'),
  pc('Palak Paneer', 260, 'पालक पनीर'),
  pc('Paneer Butter Masala', 270, 'पनीर बटर मसाला'),
  pc('Paneer Mutter Masala', 270, 'पनीर मटर मसाला'),
  pc('Paneer Tikka Masala', 275, 'पनीर टिक्का मसाला'),
  pc('Tawa Paneer', 275, 'तवा पनीर'),
  pc('Paneer Lababdar', 280, 'पनीर लबाबदार'),
  pc('Paneer Kurchan', 280, 'पनीर कुरचन'),
  pc('Paneer Rajwada', 285, 'पनीर राजवाड़ा'),
  pc('Kaju Paneer', 285, 'काजू पनीर'),
  pc('Paneer Pahadi Masala', 290, 'पनीर पहाड़ी मसाला'),
  pc('Paneer Cheese Roll Masala', 295, 'पनीर चीज़ रोल मसाला'),
];

// ---------- NORTHERN KURRIES ----------
const nk = mk(801);
const northernKurries = [
  nk('Aloo Mutter', 225, 'आलू मटर'),
  nk('Lasooni Palak', 225, 'लसूनी पालक'),
  nk('Green Peas Masala', 235, 'ग्रीन पीस मसाला'),
  nk('Mix Veg', 240, 'मिक्स व्हेज'),
  nk('Veg Kolhapuri', 255, 'व्हेज कोल्हापुरी'),
  nk('Veg Kadhai', 260, 'व्हेज कढ़ाई'),
  nk('Veg Bhoona Masala', 260, 'व्हेज भूना मसाला'),
  nk('Mushroom Masala', 260, 'मशरूम मसाला'),
  nk('Veg Jalfrezi', 260, 'व्हेज जलफ्रेजी'),
  nk('Deewani Handi', 270, 'दिवानी हंडी'),
  nk('Veg Kofta', 270, 'व्हेज कोफ्ता'),
  nk('Kaju Masala', 275, 'काजू मसाला'),
  nk('Kaju Kurry', 280, 'काजू करी'),
  nk('Malai Kofta', 280, 'मलाई कोफ्ता'),
  nk('Veg Patiala', 285, 'व्हेज पटियाला'),
  nk("Kurry Leaf's Special", 385, 'करी लीफ स्पेशल', { isChefSpecial: true }),
];

// ---------- DAL LEGACY ----------
const dl = mk(901);
const dalLegacy = [
  dl('Dal Fry', 190, 'दाल फ्राय'),
  dl('Dal Tadka', 210, 'दाल तडका'),
  dl('Dal Kolhapuri', 210, 'दाल कोल्हापुरी'),
  dl('Dal Palak', 210, 'दाल पालक'),
  dl('Dal Methi', 215, 'दाल मेथी'),
];

// ---------- PHULKA FRIENDS (Breads) ----------
const pf = mk(1001);
const phulkaFriends = [
  pf('Chapati', 35, 'चपाती'),
  pf('Tandoor Roti', 35, 'तंदूर रोटी'),
  pf('Wheat Roti', 35, 'व्हीट रोटी'),
  pf('Butter Chapati', 45, 'बटर चपाती'),
  pf('Ghee Chapati', 45, 'घी चपाती'),
  pf('Butter Tandoor Roti', 45, 'बटर तंदूर रोटी'),
  pf('Butter Wheat Roti', 45, 'बटर व्हीट रोटी'),
  pf('Missi Roti', 55, 'मिस्सी रोटी'),
  pf('Garlic Roti', 55, 'गार्लिक रोटी'),
  pf('Naan', 65, 'नान'),
  pf('Laccha Paratha', 70, 'लच्चा पराठा'),
  pf('Butter Naan', 80, 'बटर नान'),
  pf('Methi Paratha', 80, 'मेथी पराठा'),
  pf('Garlic Naan', 85, 'गार्लिक नान'),
  pf('Cheese Naan', 90, 'चीज नान'),
  pf('Chili Garlic Naan', 95, 'चिली गार्लिक नान'),
  pf('Cheese Garlic Naan', 105, 'चीज गार्लिक नान'),
  pf('Aloo Paratha', 105, 'आलू पराठा'),
  pf('Theccha Paratha', 130, 'ठेचा पराठा'),
  pf('Paneer Paratha', 135, 'पनीर पराठा'),
];

// ---------- RICE & BEYOND ----------
const rb = mk(1101);
const riceBeyond = [
  rb('Steam Rice', 135, 'स्टीम राईस'),
  rb('Plain Indrayani Rice', 140, 'प्लेन इंद्रायानी राईस'),
  rb('Jeera Rice', 140, 'जीरा राईस'),
  rb('Ghee Rice', 145, 'घी राईस'),
  rb('Curd Rice', 160, 'दही राईस'),
  rb('Peas Pulao', 195, 'मटर पुलाव'),
  rb('Hakka Noodles', 205, 'हक्का नूडल्स'),
  rb('Schezwan Noodles', 210, 'शेज़वान नूडल्स'),
  rb('Veg Pulao', 210, 'व्हेज पुलाव'),
  rb('Burnt Garlic Fried Rice', 225, 'बर्न्ट गार्लिक फ्राईड राईस'),
  rb('Paneer Pulao', 230, 'पनीर पुलाव'),
  rb('Palak Khichadi', 235, 'पालक खिचडी'),
  rb('Manchurian Noodles', 240, 'मंचूरियन नूडल्स'),
  rb('Chilli Garlic Noodles', 255, 'चिली गार्लिक नूडल्स'),
  rb('Terriyaki Noodles', 270, 'तेरीयाकी नूडल्स'),
  rb('Triple Schezwan Rice & Noodles', 270, 'ट्रिपल शेजवान फ्राइड राइस अँड नूडल्स'),
  rb('Matka Dum Biryani', 310, 'मटका दम बिरयानी', { isChefSpecial: true }),
  rb('Fried Rice', 310, 'फ्राईड राईस'),
  rb('Schezwan Fried Rice', 325, 'शेज़वान फ्राइड राइस'),
  rb('Paneer Tikka Biryani', 325, 'पनीर टिक्का बिरयानी'),
  rb('Dal Khichadi', 330, 'दाल खिचड़ी'),
];

// ---------- JOYFUL ENDINGS (Desserts) ----------
const je = mk(1201);
const joyfulEndings = [
  je('Jamun Shots', 50, 'जामून शॉट्स'),
  je('Gulab Jamun (2 pcs)', 90, 'गुलाब जामुन'),
  je('Rasgulla (2 pcs)', 95, 'रसगुल्ला'),
  je('Tall Glory', 160, 'टॉल ग्लोरी'),
  je('Funny Bunny', 170, 'फनी बनी'),
  je('Mango Exotica', 180, 'मँगो एक्सोटिका'),
  je('Titanic', 180, 'टायटॅनिक'),
  je('Blueberry Cheesecake', 250, 'ब्लूबेरी चीजकेक'),
  je('Nutella Cheesecake', 270, 'न्यूटेला चीजकेक'),
];

// ---------- ICE CREAMS ----------
const ic = mk(1301);
const icecreams = [
  ic('Mango', 80, 'मँगो'),
  ic('Butterscotch', 80, 'बटरस्कॉच'),
  ic('Vanilla', 80, 'व्हॅनिला'),
  ic('Chocolate', 90, 'चॉकलेट'),
  ic('Strawberry', 90, 'स्ट्रॉबेरी'),
  ic('Chocolate Brownie', 95, 'चॉकलेट ब्राउनी'),
  ic('Cookies & Cream', 95, 'कुकीज अँड क्रीम'),
  ic('Afghan Dry Fruit', 105, 'अफगाण ड्रायफ्रूट'),
  ic('Falooda Ice Cream', 110, 'फालुदा आईस्क्रीम'),
];

// ---------- BEVERAGES ----------
const bv = mk(1401);
const beverage = [
  bv('Mineral Water', 20, 'मिनरल वॉटर'),
  bv('Fresh Lime Water (Sweet/Salt)', 30, 'फ्रेश लाईम वॉटर (स्वीट/सॉल्टी)'),
  bv('Fresh Lime Soda (Sweet/Salt)', 40, 'फ्रेश लाईम सोडा (स्वीट/सॉल्टी)'),
  bv('Masala Buttermilk', 45, 'मसाला ताक'),
];

export const menuItems = {
  signature,
  'krispy-bites': krispyBites,
  soups,
  'klaypot-starters': klaypotStarters,
  'early-kravings': earlyKravings,
  'soul-maharashtra': soulMaharashtra,
  'paneer-cellar': paneerCellar,
  'northern-kurries': northernKurries,
  'dal-legacy': dalLegacy,
  'phulka-friends': phulkaFriends,
  'rice-beyond': riceBeyond,
  'joyful-endings': joyfulEndings,
  icecreams,
  beverage,
};
