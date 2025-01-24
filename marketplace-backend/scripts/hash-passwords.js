const bcrypt = require('bcrypt');
const { User } = require('../models'); // Passe den Pfad an dein Projekt an

async function hashPasswords() {
    try {
        const users = await User.findAll();
        for (const user of users) {
            if (!user.password.startsWith('$2b$')) { // Überprüfen, ob das Passwort bereits gehasht ist
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                await user.save();
                console.log(`Password for user ${user.email} has been hashed.`);
            }
        }
        console.log('All passwords have been hashed.');
        process.exit();
    } catch (error) {
        console.error('Error hashing passwords:', error);
        process.exit(1);
    }
}

hashPasswords();
