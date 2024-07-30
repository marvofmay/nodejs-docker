const blacklistedTokens = new Set();

const addTokenToBlacklist = (token) => {
    blacklistedTokens.add(token);
};

const isTokenBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

module.exports = {
    addTokenToBlacklist,
    isTokenBlacklisted,
};