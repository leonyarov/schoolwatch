/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: false,
    images: {
        domains: ['zqukpsdhalevncsbtkyr.supabase.co'],
    },
}
module.exports = nextConfig
