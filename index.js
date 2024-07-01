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
    image: "🍕",
    price: "$15.99",
    ingredients: "Dough, tomato sauce, cheese, pepperoni",
  },
  {
    name: "Hamburger",
    image: "🍔",
    price: "$8.99",
    ingredients: "Bun, beef patty, lettuce, tomato, onion",
  },
  {
    name: "Sushi",
    image: "🍣",
    price: "$12.99",
    ingredients: "Rice, seaweed, raw fish, vegetables",
  },
  {
    name: "Pasta",
    image: "🍝",
    price: "$10.99",
    ingredients: "Noodles, tomato sauce, meatballs",
  },
  {
    name: "Salad",
    image: "🥗",
    price: "$7.99",
    ingredients: "Lettuce, tomato, cucumber, carrots, dressing",
  },
];

// Drink menu with name, price, and ingredients

const drinkMenu = [
  {
    name: "Coke",
    image: "🥤",
    price: "$2.99",
    size: "12oz",
  },
  {
    name: "IcedTea",
    image: "🍹",
    price: "$2.50",
    size: "16oz",
  },
  {
    name: "Coffee",
    image: "☕",
    price: "$3.25",
    size: "8oz",
  },
  {
    name: "Water",
    image: "💧",
    price: "$1.99",
    size: "20oz",
  },
  {
    name: "Beer",
    image: "🍺",
    price: "$4.99",
    size: "12oz",
  },
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! What are you looking for today")
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
    bot.sendMessage(
      chatId,
      `
      *${selectedFood.name}*
      Image: ${selectedFood.image}
      Price: ${selectedFood.price}
      Ingredients: ${selectedFood.ingredients}
    `,
      {
        parse_mode: "Markdown",
      }
    );
  } else if (selectedDrink) {
    console.log("Selected drink:", selectedDrink);
    bot.sendMessage(
      chatId,
      `
    *${selectedDrink.name}*
      Image: ${selectedDrink.image}
      Price: ${selectedDrink.price}
      Size: ${selectedDrink.size}
    `,
      {
        parse_mode: "Markdown",
      }
    );
  } else {
    bot.sendMessage(chatId, `Sorry, we don't have "${itemName}" on the menu.`);
  }
});
