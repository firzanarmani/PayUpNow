import {
  Bot,
  type Context,
  session,
  type SessionFlavor,
  webhookCallback,
} from "grammy";
import { type UserFromGetMe } from "grammy/types";
// import {
//   type ConversationFlavor,
//   conversations,
// } from "@grammyjs/conversations";
import { createMiddleware } from "hono/factory";
import { type HonoAppType } from "../types/hono";

type BotType = Context & SessionFlavor<{ key: string }>;
// & ConversationFlavor;

export const createBot = (
  botToken: string,
  stringifiedBotInfo: string
): Bot<BotType> => {
  const bot = new Bot<BotType>(botToken, {
    botInfo: JSON.parse(stringifiedBotInfo) as UserFromGetMe,
  });

  bot.use(session({ initial: () => ({ key: "" }) }));
  // bot.use(conversations());

  return bot;
};

export const botMiddleware = createMiddleware<HonoAppType>((c) => {
  const bot = createBot(c.env.BOT_TOKEN, c.env.BOT_INFO);

  bot
    .chatType(["group"])
    .command("create", async (ctx: Context) => {
      await ctx.reply("Creating in group");
    })
    .command("edit", async (ctx: Context) => {
      await ctx.reply("Editing");
    })
    .command("delete", async (ctx: Context) => {
      await ctx.reply("Deleting");
    })
    .command("list", async (ctx: Context) => {
      await ctx.reply("Listing in group");
    });

  bot
    .chatType(["private"])
    .command("create", async (ctx: Context) => {
      await ctx.reply("Telling the bot to create a new one");
    })
    .command("edit", async (ctx: Context) => {
      await ctx.reply("Editing");
    })
    .command("delete", async (ctx: Context) => {
      await ctx.reply("Deleting");
    })
    .command("list", async (ctx: Context) => {
      await ctx.reply("Telling the bot to list out everything");
    });

  return webhookCallback(bot, "hono")(c);
});
