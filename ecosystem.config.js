// PM2 Ecosystem Config — used to start the app in production
// Usage: pm2 start ecosystem.config.js
module.exports = {
    apps: [
        {
            name: "speed-maths",
            script: "node_modules/.bin/next",
            args: "start",
            cwd: "./",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "512M",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
            },
        },
    ],
}
