// ═══════════════════════════════════════════
// 🎌 ANIME WELCOME BOT - CONFIGURATION
// ═══════════════════════════════════════════

module.exports = {
    // Bot Configuration
    BOT_TOKEN: "8224016343:AAHMQxQOO92H_8xyvIqJ0TQucp8M7al", // Get from @BotFather
    
    // Owner Information
    OWNER: {
        username: "@jamespydev2",
        name: "James",
        id: 8163806202// Optional: Add your Telegram user ID
    },
    
    // Links Configuration
    LINKS: {
        channel: "https://t.me/JamesBotzInc2", // Your channel link
        group: "https://t.me/+Ss0DZuqEgXEzZmZk",     // Your group link
        database: "https://t.me/+-d024FkX5aQyZjBk"    // Database/website link
    },
    
    // Welcome Image Configuration
    WELCOME_IMAGE: {
        url: "https://files.catbox.moe/rtr4zd.jpg", // Default anime welcome image
        // Or use local file: "./images/welcome.jpg"
    },
    
    // Leave Image Configuration (optional)
    LEAVE_IMAGE: {
        url: "https://files.catbox.moe/p6bjc6.jpg", // Default anime goodbye image
    },
    
    // Messages Configuration
    MESSAGES: {
        welcome: `
╔═══════════════════════╗
║   🎌 WELCOME! 🎌      ║
╚═══════════════════════╝

👋 Welcome {name}!
🆔 User ID: {id}
👤 Username: {username}
📝 Full Name: {fullname}

━━━━━━━━━━━━━━━━━━━━━━
✨ Thanks for joining our group!
🌸 Enjoy your stay and have fun!
━━━━━━━━━━━━━━━━━━━━━━
`,
        
        leave: `
╔═══════════════════════╗
║   👋 GOODBYE! 👋      ║
╚═══════════════════════╝

💔 {name} has left the group
🆔 User ID: {id}

━━━━━━━━━━━━━━━━━━━━━━
👋 We'll miss you!
━━━━━━━━━━━━━━━━━━━━━━
`,
        
        start: `
╔═══════════════════════════════╗
║  🎌 ANIME WELCOME BOT 🎌      ║
╚═══════════════════════════════╝

👋 Hello {name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💫 **How to use:**
1. Add me to your group
2. Make me admin (to detect members)
3. I'll automatically welcome new members!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Owner: {owner}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
        
        help: `
╔═══════════════════════════════╗
║      📚 HELP MENU 📚          ║
╚═══════════════════════════════╝

🔰 **Bot Commands:**
/start - Start the bot
/help - Show this help menu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ **Auto Features:**
✅ Welcomes new members with image
✅ Shows user details (ID, username, name)
✅ Goodbye message when someone leaves
✅ Quick access buttons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 **Tips:**
• Make bot admin to detect join/leave
• Customize in settings.js
• Use anime themed images

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Owner: {owner}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
    },
    
    // Button Styles
    BUTTONS: {
        owner: "👨‍💻 Owner",
        channel: "📢 Channel",
        group: "👥 Group",
        database: "🗄️ Database",
        help: "❓ Help"
    },
    
    // Bot Settings
    SETTINGS: {
        deleteJoinMessage: false,  // Delete "X joined" system messages
        deleteLeaveMessage: false, // Delete "X left" system messages
        deleteServiceMessage: false, // Delete service messages after delay
        deleteDelay: 5000,         // Delay before deleting (ms)
    }
};
