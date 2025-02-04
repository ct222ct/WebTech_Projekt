const { sequelize, User } = require('./models');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Verbindung erfolgreich!');

        const user = await User.findByPk(1); // Teste die Funktionalität
        console.log('Benutzer gefunden:', user);
    } catch (error) {
        console.error('Fehler:', error);
    } finally {
        await sequelize.close();
    }
})();
