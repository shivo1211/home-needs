/**
 * HOME NEEDS - Product Catalog
 * Complete product database with categories and emojis
 */

const PRODUCTS = [
  // ========================================
  // PANTRY STAPLES
  // ========================================
  {
    id: "atta-aashirvaad",
    name: "Wheat Flour (Atta)",
    brand: "Aashirvaad",
    category: "Pantry Staples",
    sizes: ["5kg", "10kg"],
    icon: "🌾",
    popular: true
  },
  {
    id: "atta-pillsbury",
    name: "Wheat Flour (Atta)",
    brand: "Pillsbury",
    category: "Pantry Staples",
    sizes: ["5kg", "10kg"],
    icon: "🌾"
  },
  {
    id: "rice-basmati-daawat",
    name: "Basmati Rice",
    brand: "Daawat",
    category: "Pantry Staples",
    sizes: ["1kg", "5kg"],
    icon: "🍚",
    popular: true
  },
  {
    id: "rice-basmati-indiagate",
    name: "Basmati Rice",
    brand: "India Gate",
    category: "Pantry Staples",
    sizes: ["1kg", "5kg"],
    icon: "🍚"
  },
  {
    id: "rice-kolam",
    name: "Kolam Rice (Daily Use)",
    brand: "Local",
    category: "Pantry Staples",
    sizes: ["5kg", "10kg", "25kg"],
    icon: "🍚"
  },
  {
    id: "rice-sona-masoori",
    name: "Sona Masoori Rice",
    brand: "Local",
    category: "Pantry Staples",
    sizes: ["5kg", "10kg", "25kg"],
    icon: "🍚"
  },
  {
    id: "toor-dal",
    name: "Toor Dal (Arhar)",
    brand: "Tata Sampann",
    category: "Pantry Staples",
    sizes: ["500g", "1kg", "2kg"],
    icon: "🫘",
    popular: true
  },
  {
    id: "moong-dal",
    name: "Moong Dal (Yellow)",
    brand: "Tata Sampann",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🫘"
  },
  {
    id: "chana-dal",
    name: "Chana Dal",
    brand: "Fortune",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🫘"
  },
  {
    id: "urad-dal",
    name: "Urad Dal (White/Split)",
    brand: "Tata Sampann",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🫘"
  },
  {
    id: "masoor-dal",
    name: "Masoor Dal (Red)",
    brand: "Fortune",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🫘"
  },
  {
    id: "kabuli-chana",
    name: "Kabuli Chana (Chickpeas)",
    brand: "Fortune",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🫘"
  },
  {
    id: "rajma",
    name: "Rajma (Kidney Beans)",
    brand: "Tata Sampann",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🫘"
  },
  {
    id: "besan",
    name: "Besan (Gram Flour)",
    brand: "Fortune",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🌾"
  },
  {
    id: "maida",
    name: "Maida (Refined Flour)",
    brand: "Pillsbury",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🌾"
  },
  {
    id: "rava-sooji",
    name: "Rava / Sooji",
    brand: "Fortune",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🌾"
  },
  {
    id: "poha",
    name: "Poha (Flattened Rice)",
    brand: "Local",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🍚"
  },
  {
    id: "sugar",
    name: "Sugar",
    brand: "Madhur",
    category: "Pantry Staples",
    sizes: ["1kg", "5kg"],
    icon: "🍬",
    popular: true
  },
  {
    id: "salt-tata",
    name: "Iodised Salt",
    brand: "Tata Salt",
    category: "Pantry Staples",
    sizes: ["1kg"],
    icon: "🧂"
  },
  {
    id: "jaggery",
    name: "Jaggery (Gud)",
    brand: "Local",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "🍯"
  },
  {
    id: "peanuts",
    name: "Peanuts (Raw)",
    brand: "Local",
    category: "Pantry Staples",
    sizes: ["250g", "500g"],
    icon: "🥜"
  },
  {
    id: "sabudana",
    name: "Sabudana (Sago)",
    brand: "Local",
    category: "Pantry Staples",
    sizes: ["500g", "1kg"],
    icon: "⚪"
  },

  // ========================================
  // COOKING OILS & GHEE
  // ========================================
  {
    id: "sunflower-oil-fortune",
    name: "Sunflower Oil",
    brand: "Fortune",
    category: "Cooking Oils",
    sizes: ["1L", "5L"],
    icon: "🌻",
    popular: true
  },
  {
    id: "sunflower-oil-saffola",
    name: "Sunflower Oil",
    brand: "Saffola",
    category: "Cooking Oils",
    sizes: ["1L", "5L"],
    icon: "🌻"
  },
  {
    id: "mustard-oil-dhara",
    name: "Mustard Oil",
    brand: "Dhara",
    category: "Cooking Oils",
    sizes: ["1L", "5L"],
    icon: "🫒"
  },
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    brand: "Fortune",
    category: "Cooking Oils",
    sizes: ["1L", "5L"],
    icon: "🥜"
  },
  {
    id: "ghee-amul",
    name: "Pure Ghee",
    brand: "Amul",
    category: "Cooking Oils",
    sizes: ["500ml", "1L"],
    icon: "🧈",
    popular: true
  },
  {
    id: "ghee-gowardhan",
    name: "Pure Ghee",
    brand: "Gowardhan",
    category: "Cooking Oils",
    sizes: ["500ml", "1L"],
    icon: "🧈"
  },
  {
    id: "olive-oil-figaro",
    name: "Olive Oil",
    brand: "Figaro",
    category: "Cooking Oils",
    sizes: ["250ml", "500ml"],
    icon: "🫒"
  },

  // ========================================
  // SPICES (MASALAS)
  // ========================================
  {
    id: "turmeric-powder",
    name: "Turmeric Powder (Haldi)",
    brand: "Everest",
    category: "Spices",
    sizes: ["100g", "200g", "500g"],
    icon: "🟡",
    popular: true
  },
  {
    id: "red-chilli-powder",
    name: "Red Chilli Powder",
    brand: "Everest",
    category: "Spices",
    sizes: ["100g", "200g", "500g"],
    icon: "🌶️",
    popular: true
  },
  {
    id: "coriander-powder",
    name: "Coriander Powder (Dhania)",
    brand: "Everest",
    category: "Spices",
    sizes: ["100g", "200g"],
    icon: "🌿"
  },
  {
    id: "cumin-seeds",
    name: "Cumin Seeds (Jeera)",
    brand: "Everest",
    category: "Spices",
    sizes: ["100g", "200g"],
    icon: "🌰"
  },
  {
    id: "mustard-seeds",
    name: "Mustard Seeds (Rai)",
    brand: "Everest",
    category: "Spices",
    sizes: ["100g", "200g"],
    icon: "🟤"
  },
  {
    id: "garam-masala",
    name: "Garam Masala",
    brand: "MDH",
    category: "Spices",
    sizes: ["50g", "100g"],
    icon: "🫙",
    popular: true
  },
  {
    id: "chicken-masala",
    name: "Chicken/Meat Masala",
    brand: "Everest",
    category: "Spices",
    sizes: ["50g", "100g"],
    icon: "🍗"
  },
  {
    id: "sambhar-masala",
    name: "Sambhar Masala",
    brand: "MTR",
    category: "Spices",
    sizes: ["100g", "200g"],
    icon: "🫙"
  },
  {
    id: "pav-bhaji-masala",
    name: "Pav Bhaji Masala",
    brand: "Everest",
    category: "Spices",
    sizes: ["50g", "100g"],
    icon: "🫙"
  },
  {
    id: "hing",
    name: "Hing (Asafoetida)",
    brand: "LG",
    category: "Spices",
    sizes: ["10g", "25g"],
    icon: "✨"
  },
  {
    id: "ginger-garlic-paste",
    name: "Ginger Garlic Paste",
    brand: "Smith & Jones",
    category: "Spices",
    sizes: ["200g", "500g"],
    icon: "🧄"
  },

  // ========================================
  // BREAKFAST & DAIRY
  // ========================================
  {
    id: "milk-amul-taaza",
    name: "Full Cream Milk",
    brand: "Amul Taaza",
    category: "Breakfast & Dairy",
    sizes: ["500ml", "1L"],
    icon: "🥛",
    popular: true
  },
  {
    id: "butter-amul",
    name: "Butter",
    brand: "Amul",
    category: "Breakfast & Dairy",
    sizes: ["100g", "500g"],
    icon: "🧈",
    popular: true
  },
  {
    id: "cheese-amul",
    name: "Cheese Slices",
    brand: "Amul",
    category: "Breakfast & Dairy",
    sizes: ["100g", "200g"],
    icon: "🧀"
  },
  {
    id: "bread-britannia",
    name: "White Bread",
    brand: "Britannia",
    category: "Breakfast & Dairy",
    sizes: ["400g"],
    icon: "🍞"
  },
  {
    id: "eggs",
    name: "Eggs (Tray)",
    brand: "Farm Fresh",
    category: "Breakfast & Dairy",
    sizes: ["6 pcs", "12 pcs", "30 pcs"],
    icon: "🥚",
    popular: true
  },
  {
    id: "paneer-amul",
    name: "Paneer (Fresh)",
    brand: "Amul",
    category: "Breakfast & Dairy",
    sizes: ["200g", "500g"],
    icon: "🧀"
  },
  {
    id: "cornflakes-kelloggs",
    name: "Corn Flakes",
    brand: "Kellogg's",
    category: "Breakfast & Dairy",
    sizes: ["250g", "500g"],
    icon: "🥣"
  },
  {
    id: "oats-quaker",
    name: "Rolled Oats",
    brand: "Quaker",
    category: "Breakfast & Dairy",
    sizes: ["400g", "1kg"],
    icon: "🥣"
  },
  {
    id: "jam-kissan",
    name: "Mix Fruit Jam",
    brand: "Kissan",
    category: "Breakfast & Dairy",
    sizes: ["200g", "500g"],
    icon: "🍓"
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    brand: "Pintola",
    category: "Breakfast & Dairy",
    sizes: ["350g"],
    icon: "🥜"
  },
  {
    id: "honey-dabur",
    name: "Honey",
    brand: "Dabur",
    category: "Breakfast & Dairy",
    sizes: ["250g", "500g"],
    icon: "🍯",
    popular: true
  },

  // ========================================
  // BEVERAGES
  // ========================================
  {
    id: "tea-redlabel",
    name: "Tea (Loose Granules)",
    brand: "Red Label",
    category: "Beverages",
    sizes: ["250g", "500g", "1kg"],
    icon: "🍵",
    popular: true
  },
  {
    id: "tea-tata",
    name: "Tea Gold",
    brand: "Tata Tea",
    category: "Beverages",
    sizes: ["250g", "500g"],
    icon: "🍵"
  },
  {
    id: "green-tea-tetley",
    name: "Green Tea",
    brand: "Tetley",
    category: "Beverages",
    sizes: ["25 bags", "50 bags"],
    icon: "🍃"
  },
  {
    id: "coffee-nescafe",
    name: "Instant Coffee",
    brand: "Nescafe Classic",
    category: "Beverages",
    sizes: ["50g", "100g", "200g"],
    icon: "☕",
    popular: true
  },
  {
    id: "coffee-bru",
    name: "Instant Coffee Gold",
    brand: "Bru",
    category: "Beverages",
    sizes: ["50g", "100g"],
    icon: "☕"
  },
  {
    id: "bournvita",
    name: "Health Drink",
    brand: "Bournvita",
    category: "Beverages",
    sizes: ["500g", "1kg"],
    icon: "🍫"
  },
  {
    id: "horlicks",
    name: "Health Drink",
    brand: "Horlicks",
    category: "Beverages",
    sizes: ["500g", "1kg"],
    icon: "🍫"
  },
  {
    id: "juice-real",
    name: "Fruit Juice",
    brand: "Real",
    category: "Beverages",
    sizes: ["1L"],
    icon: "🧃"
  },
  {
    id: "juice-tropicana",
    name: "Fruit Juice",
    brand: "Tropicana",
    category: "Beverages",
    sizes: ["1L"],
    icon: "🧃"
  },
  {
    id: "rooh-afza",
    name: "Rose Syrup",
    brand: "Rooh Afza",
    category: "Beverages",
    sizes: ["750ml"],
    icon: "🌹"
  },

  // ========================================
  // BISCUITS & SNACKS
  // ========================================
  {
    id: "parle-g",
    name: "Glucose Biscuits",
    brand: "Parle-G",
    category: "Snacks",
    sizes: ["80g", "250g"],
    icon: "🍪",
    popular: true
  },
  {
    id: "oreo",
    name: "Cream Biscuits",
    brand: "Oreo",
    category: "Snacks",
    sizes: ["120g", "300g"],
    icon: "🍪"
  },
  {
    id: "dark-fantasy",
    name: "Choco Filled Cookies",
    brand: "Dark Fantasy",
    category: "Snacks",
    sizes: ["75g", "150g"],
    icon: "🍪"
  },
  {
    id: "good-day",
    name: "Butter Biscuits",
    brand: "Good Day",
    category: "Snacks",
    sizes: ["75g", "200g"],
    icon: "🍪"
  },
  {
    id: "marie-gold",
    name: "Marie Biscuits",
    brand: "Britannia",
    category: "Snacks",
    sizes: ["150g", "300g"],
    icon: "🍪"
  },
  {
    id: "maggi-noodles",
    name: "Instant Noodles",
    brand: "Maggi",
    category: "Snacks",
    sizes: ["70g", "420g (6 pack)"],
    icon: "🍜",
    popular: true
  },
  {
    id: "yippee-noodles",
    name: "Instant Noodles",
    brand: "Yippee",
    category: "Snacks",
    sizes: ["70g", "420g"],
    icon: "🍜"
  },
  {
    id: "pasta-bambino",
    name: "Pasta (Macaroni)",
    brand: "Bambino",
    category: "Snacks",
    sizes: ["250g", "500g"],
    icon: "🍝"
  },
  {
    id: "ketchup-kissan",
    name: "Tomato Ketchup",
    brand: "Kissan",
    category: "Snacks",
    sizes: ["200g", "500g", "1kg"],
    icon: "🍅",
    popular: true
  },
  {
    id: "chips-lays",
    name: "Potato Chips",
    brand: "Lays",
    category: "Snacks",
    sizes: ["52g", "95g"],
    icon: "🥔"
  },
  {
    id: "namkeen-haldirams",
    name: "Bhujia Sev",
    brand: "Haldiram's",
    category: "Snacks",
    sizes: ["200g", "400g"],
    icon: "🥨"
  },
  {
    id: "popcorn-act2",
    name: "Instant Popcorn",
    brand: "Act II",
    category: "Snacks",
    sizes: ["60g"],
    icon: "🍿"
  },
  {
    id: "dairy-milk",
    name: "Chocolate Bar",
    brand: "Cadbury Dairy Milk",
    category: "Snacks",
    sizes: ["22g", "50g", "110g"],
    icon: "🍫"
  },
  {
    id: "almonds",
    name: "Almonds (Badam)",
    brand: "Premium",
    category: "Snacks",
    sizes: ["100g", "250g", "500g"],
    icon: "🌰",
    offer: true
  },
  {
    id: "cashews",
    name: "Cashews (Kaju)",
    brand: "Premium",
    category: "Snacks",
    sizes: ["100g", "250g", "500g"],
    icon: "🥜",
    offer: true
  },

  // ========================================
  // PERSONAL CARE
  // ========================================
  {
    id: "soap-dettol",
    name: "Bathing Soap (4-pack)",
    brand: "Dettol",
    category: "Personal Care",
    sizes: ["75g x 4"],
    icon: "🧼",
    popular: true
  },
  {
    id: "soap-dove",
    name: "Bathing Soap",
    brand: "Dove",
    category: "Personal Care",
    sizes: ["100g", "100g x 3"],
    icon: "🧼"
  },
  {
    id: "handwash-dettol",
    name: "Hand Wash",
    brand: "Dettol",
    category: "Personal Care",
    sizes: ["200ml", "750ml Refill"],
    icon: "🧴"
  },
  {
    id: "shampoo-dove",
    name: "Shampoo",
    brand: "Dove",
    category: "Personal Care",
    sizes: ["180ml", "340ml"],
    icon: "🧴"
  },
  {
    id: "shampoo-hns",
    name: "Anti-Dandruff Shampoo",
    brand: "Head & Shoulders",
    category: "Personal Care",
    sizes: ["180ml", "340ml"],
    icon: "🧴"
  },
  {
    id: "hair-oil-parachute",
    name: "Coconut Hair Oil",
    brand: "Parachute",
    category: "Personal Care",
    sizes: ["100ml", "300ml", "500ml"],
    icon: "🥥",
    popular: true
  },
  {
    id: "toothpaste-colgate",
    name: "Toothpaste Strong Teeth",
    brand: "Colgate",
    category: "Personal Care",
    sizes: ["100g", "200g"],
    icon: "🦷",
    popular: true
  },
  {
    id: "toothpaste-sensodyne",
    name: "Sensitive Toothpaste",
    brand: "Sensodyne",
    category: "Personal Care",
    sizes: ["80g", "150g"],
    icon: "🦷"
  },
  {
    id: "toothbrush-colgate",
    name: "Toothbrush (Pack)",
    brand: "Colgate",
    category: "Personal Care",
    sizes: ["2 pack", "4 pack"],
    icon: "🪥"
  },
  {
    id: "facewash-himalaya",
    name: "Neem Face Wash",
    brand: "Himalaya",
    category: "Personal Care",
    sizes: ["100ml", "200ml"],
    icon: "🧴"
  },
  {
    id: "cream-nivea",
    name: "Moisturizing Cream",
    brand: "Nivea",
    category: "Personal Care",
    sizes: ["100ml", "200ml"],
    icon: "🧴"
  },
  {
    id: "deo-fogg",
    name: "Body Spray",
    brand: "Fogg",
    category: "Personal Care",
    sizes: ["120ml", "150ml"],
    icon: "🌸"
  },
  {
    id: "sanitary-whisper",
    name: "Sanitary Pads",
    brand: "Whisper",
    category: "Personal Care",
    sizes: ["8 pads", "15 pads"],
    icon: "📦"
  },
  {
    id: "diapers-mamypoko",
    name: "Baby Diapers Pants",
    brand: "MamyPoko",
    category: "Personal Care",
    sizes: ["M", "L", "XL"],
    icon: "👶"
  },

  // ========================================
  // HOME CARE
  // ========================================
  {
    id: "detergent-surf",
    name: "Washing Powder",
    brand: "Surf Excel",
    category: "Home Care",
    sizes: ["1kg", "2kg", "4kg"],
    icon: "🧺",
    popular: true
  },
  {
    id: "detergent-ariel",
    name: "Washing Powder",
    brand: "Ariel",
    category: "Home Care",
    sizes: ["1kg", "2kg"],
    icon: "🧺"
  },
  {
    id: "liquid-detergent-surf",
    name: "Liquid Detergent (Matic)",
    brand: "Surf Excel Matic",
    category: "Home Care",
    sizes: ["500ml", "1L", "2L"],
    icon: "🧴"
  },
  {
    id: "dishwash-vim-bar",
    name: "Dishwash Bar",
    brand: "Vim",
    category: "Home Care",
    sizes: ["155g", "300g"],
    icon: "🍽️",
    popular: true
  },
  {
    id: "dishwash-vim-liquid",
    name: "Dishwash Liquid",
    brand: "Vim Gel",
    category: "Home Care",
    sizes: ["250ml", "500ml"],
    icon: "🧴"
  },
  {
    id: "floor-cleaner-lizol",
    name: "Floor Cleaner",
    brand: "Lizol",
    category: "Home Care",
    sizes: ["500ml", "1L", "2L"],
    icon: "🪣"
  },
  {
    id: "toilet-cleaner-harpic",
    name: "Toilet Cleaner",
    brand: "Harpic",
    category: "Home Care",
    sizes: ["500ml", "1L"],
    icon: "🚽",
    popular: true
  },
  {
    id: "mosquito-goodknight",
    name: "Mosquito Repellent Refill",
    brand: "Good Knight",
    category: "Home Care",
    sizes: ["45ml"],
    icon: "🦟"
  },
  {
    id: "air-freshener-odonil",
    name: "Bathroom Air Freshener",
    brand: "Odonil",
    category: "Home Care",
    sizes: ["50g", "75g"],
    icon: "🌸"
  },
  {
    id: "scrubber-scotchbrite",
    name: "Scrub Pad (3-pack)",
    brand: "Scotch-Brite",
    category: "Home Care",
    sizes: ["3 pcs"],
    icon: "🧽"
  },
  {
    id: "garbage-bags",
    name: "Garbage Bags (Medium)",
    brand: "Local",
    category: "Home Care",
    sizes: ["30 bags"],
    icon: "🗑️"
  },
  {
    id: "tissue-paper",
    name: "Facial Tissues",
    brand: "Origami",
    category: "Home Care",
    sizes: ["100 pulls", "200 pulls"],
    icon: "🧻"
  },
  {
    id: "toilet-roll",
    name: "Toilet Roll (4-pack)",
    brand: "Origami",
    category: "Home Care",
    sizes: ["4 rolls"],
    icon: "🧻"
  },

  // ========================================
  // SAUCES & CONDIMENTS
  // ========================================
  {
    id: "mayo-funfoods",
    name: "Mayonnaise (Veg)",
    brand: "Funfoods",
    category: "Sauces",
    sizes: ["250g", "450g"],
    icon: "🥫"
  },
  {
    id: "schezwan-chutney",
    name: "Schezwan Chutney",
    brand: "Ching's",
    category: "Sauces",
    sizes: ["250g"],
    icon: "🌶️"
  },
  {
    id: "soy-sauce",
    name: "Soy Sauce (Dark)",
    brand: "Ching's",
    category: "Sauces",
    sizes: ["200g"],
    icon: "🥫"
  },
  {
    id: "vinegar",
    name: "White Vinegar",
    brand: "Local",
    category: "Sauces",
    sizes: ["200ml", "500ml"],
    icon: "🍾"
  },
  {
    id: "pickle-mango",
    name: "Mango Pickle",
    brand: "Mother's Recipe",
    category: "Sauces",
    sizes: ["200g", "500g"],
    icon: "🥭",
    popular: true
  },
  {
    id: "pickle-lime",
    name: "Lime Pickle",
    brand: "Priya",
    category: "Sauces",
    sizes: ["200g", "500g"],
    icon: "🍋"
  },
  {
    id: "papad-lijjat",
    name: "Urad Papad",
    brand: "Lijjat",
    category: "Sauces",
    sizes: ["200g"],
    icon: "🫓"
  },

  // ========================================
  // FROZEN & INSTANT
  // ========================================
  {
    id: "frozen-peas",
    name: "Frozen Green Peas",
    brand: "Safal",
    category: "Frozen & Instant",
    sizes: ["500g", "1kg"],
    icon: "🟢",
    offer: true
  },
  {
    id: "frozen-corn",
    name: "Frozen Sweet Corn",
    brand: "Safal",
    category: "Frozen & Instant",
    sizes: ["500g"],
    icon: "🌽"
  },
  {
    id: "french-fries",
    name: "French Fries (Frozen)",
    brand: "McCain",
    category: "Frozen & Instant",
    sizes: ["450g"],
    icon: "🍟",
    offer: true
  },
  {
    id: "aloo-tikki",
    name: "Aloo Tikki (Frozen)",
    brand: "McCain",
    category: "Frozen & Instant",
    sizes: ["400g"],
    icon: "🥔"
  },
  {
    id: "soup-knorr",
    name: "Instant Soup (Tomato)",
    brand: "Knorr",
    category: "Frozen & Instant",
    sizes: ["11g", "44g"],
    icon: "🥣"
  },
  {
    id: "ready-dal-makhani",
    name: "Ready to Eat Dal Makhani",
    brand: "MTR",
    category: "Frozen & Instant",
    sizes: ["300g"],
    icon: "🍛"
  },
  {
    id: "soya-chunks",
    name: "Soya Chunks",
    brand: "Nutrela",
    category: "Frozen & Instant",
    sizes: ["200g", "500g"],
    icon: "🫘"
  },
  {
    id: "vermicelli",
    name: "Vermicelli (Sevai)",
    brand: "Bambino",
    category: "Frozen & Instant",
    sizes: ["400g"],
    icon: "🍝"
  },
  {
    id: "gulab-jamun-mix",
    name: "Gulab Jamun Mix",
    brand: "Gits",
    category: "Frozen & Instant",
    sizes: ["100g", "200g"],
    icon: "🍩",
    offer: true
  },

  // ========================================
  // BAKING
  // ========================================
  {
    id: "baking-powder",
    name: "Baking Powder",
    brand: "Weikfield",
    category: "Baking",
    sizes: ["50g", "100g"],
    icon: "🧁"
  },
  {
    id: "baking-soda",
    name: "Baking Soda",
    brand: "Local",
    category: "Baking",
    sizes: ["100g"],
    icon: "🥄"
  },
  {
    id: "cocoa-powder",
    name: "Cocoa Powder",
    brand: "Hershey's",
    category: "Baking",
    sizes: ["225g"],
    icon: "🍫"
  },
  {
    id: "vanilla-essence",
    name: "Vanilla Essence",
    brand: "Weikfield",
    category: "Baking",
    sizes: ["20ml"],
    icon: "🌿"
  },
  {
    id: "custard-powder",
    name: "Custard Powder (Vanilla)",
    brand: "Weikfield",
    category: "Baking",
    sizes: ["75g", "200g"],
    icon: "🍮"
  },
  {
    id: "corn-flour",
    name: "Corn Flour",
    brand: "Weikfield",
    category: "Baking",
    sizes: ["100g", "200g"],
    icon: "🌽"
  },

  // ========================================
  // PUJA & MISC
  // ========================================
  {
    id: "agarbatti",
    name: "Incense Sticks",
    brand: "Cycle",
    category: "Puja & Misc",
    sizes: ["20 sticks", "50 sticks"],
    icon: "🪔"
  },
  {
    id: "camphor",
    name: "Camphor (Kapoor)",
    brand: "Mangaldeep",
    category: "Puja & Misc",
    sizes: ["10g", "25g"],
    icon: "⚪"
  },
  {
    id: "matchbox",
    name: "Match Box (Pack)",
    brand: "Homelite",
    category: "Puja & Misc",
    sizes: ["10 boxes"],
    icon: "🔥"
  },
  {
    id: "cotton-wicks",
    name: "Cotton Wicks (Baati)",
    brand: "Local",
    category: "Puja & Misc",
    sizes: ["50 pcs", "100 pcs"],
    icon: "🕯️"
  },
  {
    id: "batteries",
    name: "AA Batteries (4-pack)",
    brand: "Duracell",
    category: "Puja & Misc",
    sizes: ["4 pcs"],
    icon: "🔋"
  }
];

// Get unique categories
const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

// Category icons for filter pills
const CATEGORY_ICONS = {
  "Pantry Staples": "🌾",
  "Cooking Oils": "🫒",
  "Spices": "🌶️",
  "Breakfast & Dairy": "🥛",
  "Beverages": "☕",
  "Snacks": "🍪",
  "Personal Care": "🧴",
  "Home Care": "🧺",
  "Sauces": "🥫",
  "Frozen & Instant": "❄️",
  "Baking": "🧁",
  "Puja & Misc": "🪔"
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS, CATEGORIES, CATEGORY_ICONS };
}
