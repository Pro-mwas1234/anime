// ═══════════════════════════════════════════════════════════════
// 🎌 ANIME WELCOME BOT
// Telegram Welcome Bot with Media Support
// Owner: @jamespydev2
// ═══════════════════════════════════════════════════════════════

const TelegramBot = require('node-telegram-bot-api');
const config = require('./settings');
const utils = require('./utils');

// ═══════════════════════════════════════════
// Initialize Bot
// ═══════════════════════════════════════════

const bot = new TelegramBot(config.BOT_TOKEN, { 
    polling: true,
    filepath: false
});

// ═══════════════════════════════════════════
// Global Variables
// ═══════════════════════════════════════════

const startTime = new Date();

// ═══════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════

function getUserMention(user) {
    const name = user.first_name || 'User';
    return `[${name}](tg://user?id=${user.id})`;
}

function formatWelcomeMessage(user) {
    const fullName = utils.getFullName(user);
    const username = user.username ? `@${user.username}` : 'No username';
    
    return config.MESSAGES.welcome
        .replace('{name}', getUserMention(user))
        .replace('{id}', user.id)
        .replace('{username}', username)
        .replace('{fullname}', fullName);
}

function formatLeaveMessage(user) {
    const fullName = utils.getFullName(user);
    
    return config.MESSAGES.leave
        .replace('{name}', fullName)
        .replace('{id}', user.id);
}

function formatStartMessage(user) {
    return config.MESSAGES.start
        .replace('{name}', user.first_name)
        .replace('{owner}', config.OWNER.username);
}

function formatHelpMessage() {
    return config.MESSAGES.help
        .replace('{owner}', config.OWNER.username);
}

// ═══════════════════════════════════════════
// Keyboard Buttons
// ═══════════════════════════════════════════

function getWelcomeKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: config.BUTTONS.owner, url: `https://t.me/${config.OWNER.username.replace('@', '')}` },
                { text: config.BUTTONS.channel, url: config.LINKS.channel }
            ],
            [
                { text: config.BUTTONS.group, url: config.LINKS.group },
                { text: config.BUTTONS.database, url: config.LINKS.database }
            ]
        ]
    };
}

function getStartKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: config.BUTTONS.owner, url: `https://t.me/${config.OWNER.username.replace('@', '')}` },
                { text: config.BUTTONS.help, callback_data: 'help' }
            ],
            [
                { text: config.BUTTONS.channel, url: config.LINKS.channel },
                { text: config.BUTTONS.group, url: config.LINKS.group }
            ],
            [
                { text: config.BUTTONS.database, url: config.LINKS.database }
            ]
        ]
    };
}

function getHelpKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: '🔙 Back', callback_data: 'start' },
                { text: config.BUTTONS.owner, url: `https://t.me/${config.OWNER.username.replace('@', '')}` }
            ]
        ]
    };
}

// ═══════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════

// Handle New Members
bot.on('new_chat_members', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const newMembers = msg.new_chat_members;
        
        // Delete service message if configured
        if (config.SETTINGS.deleteServiceMessage) {
            setTimeout(() => {
                bot.deleteMessage(chatId, msg.message_id).catch(() => {});
            }, config.SETTINGS.deleteDelay);
        }
        
        // Welcome each new member
        for (const member of newMembers) {
            // Skip if bot itself joins
            if (member.is_bot && member.id === bot.options.polling.params.id) {
                continue;
            }
            
            const welcomeText = formatWelcomeMessage(member);
            const keyboard = getWelcomeKeyboard();
            
            // Send welcome message with image
            if (config.WELCOME_IMAGE.url) {
                await bot.sendPhoto(chatId, config.WELCOME_IMAGE.url, {
                    caption: welcomeText,
                    parse_mode: 'Markdown',
                    reply_markup: keyboard
                });
            } else {
                await bot.sendMessage(chatId, welcomeText, {
                    parse_mode: 'Markdown',
                    reply_markup: keyboard
                });
            }
            
            console.log(`✅ Welcomed user: ${utils.getFullName(member)} (${member.id}) in chat: ${chatId}`);
        }
    } catch (error) {
        console.error('❌ Error in new_chat_members handler:', error.message);
    }
});

// Handle Left Members
bot.on('left_chat_member', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const leftMember = msg.left_chat_member;
        
        // Delete service message if configured
        if (config.SETTINGS.deleteServiceMessage) {
            setTimeout(() => {
                bot.deleteMessage(chatId, msg.message_id).catch(() => {});
            }, config.SETTINGS.deleteDelay);
        }
        
        // Skip if bot itself leaves
        if (leftMember.is_bot && leftMember.id === bot.options.polling.params.id) {
            return;
        }
        
        const leaveText = formatLeaveMessage(leftMember);
        
        // Send goodbye message with image
        if (config.LEAVE_IMAGE.url) {
            await bot.sendPhoto(chatId, config.LEAVE_IMAGE.url, {
                caption: leaveText,
                parse_mode: 'Markdown'
            });
        } else {
            await bot.sendMessage(chatId, leaveText, {
                parse_mode: 'Markdown'
            });
        }
        
        console.log(`👋 User left: ${utils.getFullName(leftMember)} (${leftMember.id}) from chat: ${chatId}`);
    } catch (error) {
        console.error('❌ Error in left_chat_member handler:', error.message);
    }
});

// ═══════════════════════════════════════════
// Command Handlers
// ═══════════════════════════════════════════

// /start command
bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        // Only respond in private chats or when mentioned
        if (msg.chat.type !== 'private') {
            return;
        }
        
        const startText = formatStartMessage(user);
        const keyboard = getStartKeyboard();
        
        await bot.sendMessage(chatId, startText, {
            parse_mode: 'Markdown',
            reply_markup: keyboard
        });
        
        console.log(`📱 /start command from: ${utils.getFullName(user)} (${user.id})`);
    } catch (error) {
        console.error('❌ Error in /start handler:', error.message);
    }
});

// /help command
bot.onText(/\/help/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        const helpText = formatHelpMessage();
        const keyboard = getHelpKeyboard();
        
        await bot.sendMessage(chatId, helpText, {
            parse_mode: 'Markdown',
            reply_markup: keyboard
        });
        
        console.log(`❓ /help command from: ${utils.getFullName(user)} (${user.id})`);
    } catch (error) {
        console.error('❌ Error in /help handler:', error.message);
    }
});

// /stats command (Owner only)
bot.onText(/\/stats/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        // Check if user is owner
        if (user.username !== config.OWNER.username.replace('@', '') && user.id !== config.OWNER.id) {
            return;
        }
        
        const uptime = utils.getUptime(startTime);
        const stats = `
╔═══════════════════════════════╗
║     📊 BOT STATISTICS 📊      ║
╚═══════════════════════════════╝

⏱️ **Uptime:** ${uptime}
🤖 **Bot:** @${(await bot.getMe()).username}
👨‍💻 **Owner:** ${config.OWNER.username}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Bot is running smoothly!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, stats, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('❌ Error in /stats handler:', error.message);
    }
});

// ═══════════════════════════════════════════
// Callback Query Handlers
// ═══════════════════════════════════════════

bot.on('callback_query', async (query) => {
    try {
        const chatId = query.message.chat.id;
        const messageId = query.message.message_id;
        const data = query.data;
        const user = query.from;
        
        // Answer callback to remove loading state
        await bot.answerCallbackQuery(query.id);
        
        if (data === 'help') {
            const helpText = formatHelpMessage();
            const keyboard = getHelpKeyboard();
            
            await bot.editMessageText(helpText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
        } else if (data === 'start') {
            const startText = formatStartMessage(user);
            const keyboard = getStartKeyboard();
            
            await bot.editMessageText(startText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
        }
    } catch (error) {
        console.error('❌ Error in callback_query handler:', error.message);
    }
});

// ═══════════════════════════════════════════
// Error Handling
// ═══════════════════════════════════════════

bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.message);
});

bot.on('error', (error) => {
    console.error('❌ Bot error:', error.message);
});

// ═══════════════════════════════════════════
// Startup
// ═══════════════════════════════════════════

async function startBot() {
    try {
        const botInfo = await bot.getMe();
        console.log('\n' + '═'.repeat(50));
        console.log('🎌 ANIME WELCOME BOT STARTED 🎌');
        console.log('═'.repeat(50));
        console.log(`🤖 Bot Username: @${botInfo.username}`);
        console.log(`🆔 Bot ID: ${botInfo.id}`);
        console.log(`👨‍💻 Owner: ${config.OWNER.username}`);
        console.log(`⏰ Started at: ${startTime.toLocaleString()}`);
        console.log('═'.repeat(50));
        console.log('✅ Bot is running! Waiting for events...\n');
    } catch (error) {
        console.error('❌ Failed to start bot:', error.message);
        process.exit(1);
    }
}

// Start the bot
startBot();

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Bot stopped by user');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Bot stopped');
    process.exit(0);
});
