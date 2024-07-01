const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Replace YOUR_BOT_TOKEN with the token provided by the BotFather
const token = process.env.token;

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });

// Food menu with name, price, and ingredients
const foodMenu = [
  {
    name: "Pizza",
    image:
      "https://www.pizzaexpress.vn/wp-content/uploads/2018/08/123rf_74137223_super-e1533621422385-780x435.jpg",
    price: "450 ETB",
    ingredients: "Dough, tomato sauce, cheese, pepperoni",
  },
  {
    name: "Hamburger",
    image:
      "https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg",
    price: "570 ETB",
    ingredients: "Bun, beef patty, lettuce, tomato, onion",
  },
  {
    name: "DoroWet",
    image:
      "https://ethiopianfood.wordpress.com/wp-content/uploads/2013/11/doroethiopia.jpg",
    price: "$580 ETB",
    ingredients: "Rice, seaweed, raw fish, vegetables",
  },
  {
    name: "Pasta",
    image:
      "https://www.foodandwine.com/thmb/wKe5ZkGmhqXHiCow-SwRqJmygoY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cacio-e-plantain-FT-RECIPE0721-d750051665df4a84a9a305475f98948c.jpg",
    price: "$360 ETB",
    ingredients: "Noodles, tomato sauce, meatballs",
  },
  {
    name: "Salad",
    image:
      "https://healthy-kids.com.au/wp-content/uploads/2020/11/Basic-Green-Salad-scaled.jpg",
    price: "$280 ETB",
    ingredients: "Lettuce, tomato, cucumber, carrots, dressing",
  },
];

// Drink menu with name, price, and ingredients

const drinkMenu = [
  {
    name: "Coke",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkyKnoYAutRiXYcq6bve8QWgX138Af_wHzbQ&s",
    price: "$2.99",
    size: "12oz",
  },
  {
    name: "IcedTea",
    image:
      "https://www.ohhowcivilized.com/wp-content/uploads/2019/05/0519-iced-tea-8-1.jpg",
    price: "180 ETB",
    size: "16oz",
  },
  {
    name: "Coffee",
    image:
      "https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg",
    price: "100 ETB",
    size: "8oz",
  },
  {
    name: "Smothies",
    image:
      "https://i.pinimg.com/564x/96/32/d6/9632d6e213d420facfdd06894c7756c1.jpg",
    price: "150 ETB",
    size: "20oz",
  },
  {
    name: "Macchiato",
    image:
      "https://fandbrecipes.com/wp-content/uploads/2022/07/Espresso-Macchiato_Step-By-Step-Recipe.png",
    price: "120 ETB",
    size: "12oz",
  },
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! What are you looking for today");
});

bot.onText(/\/choose/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Would you like to see food or drink options?", {
    reply_markup: {
      keyboard: [["food"], ["drink"]],
      one_time_keyboard: true,
    },
  });
});

// Handle the /start command
bot.onText(/food/, (msg) => {
  const chatId = msg.chat.id;
  const foodOptions = foodMenu.map((food) => `${food.name}`);
  bot.sendMessage(chatId, "What kind of food would you like to eat?", {
    reply_markup: {
      keyboard: [foodOptions],
      one_time_keyboard: true,
    },
  });
});

// Handle the /start command
bot.onText(/drink/, (msg) => {
  const chatId = msg.chat.id;
  const drinkOptions = drinkMenu.map((drink) => `${drink.name}`);
  bot.sendMessage(chatId, "What kind of Drink would you want today?", {
    reply_markup: {
      keyboard: [drinkOptions],
      one_time_keyboard: true,
    },
  });
});

bot.onText(/^(\w+)$/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemName = match[1];
  const selectedFood = foodMenu.find((food) => food.name === itemName);
  const selectedDrink = drinkMenu.find((drink) => drink.name === itemName);

  if (selectedFood) {
    console.log("Selected food:", selectedFood);
    bot.sendPhoto(chatId, selectedFood.image, {
      caption: `
        *${selectedFood.name}*
        Price: ${selectedFood.price}
        Size: ${selectedFood.ingredients}
      `,
      parse_mode: "Markdown",
    });
  } else if (selectedDrink) {
    console.log("Selected drink:", selectedDrink);
    bot.sendPhoto(chatId, selectedDrink.image, {
      caption: `
        *${selectedDrink.name}*
        Price: ${selectedDrink.price}
        Size: ${selectedDrink.size}
      `,
      parse_mode: "Markdown",
    });
  } else {
    bot.sendMessage(chatId, `Sorry, we don't have "${itemName}" on the menu.`);
  }
});
