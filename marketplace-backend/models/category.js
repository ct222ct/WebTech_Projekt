// Exportiert eine Funktion, die das Sequelize-Modell 'Category' definiert
module.exports = (sequelize, DataTypes) => {
  // Erstellt das 'Category'-Modell mit seinen Attributen
  const Category = sequelize.define('Category', {
    // Primärschlüssel der Kategorie mit automatischer ID-Inkrementierung
    id: {
      type: DataTypes.INTEGER,  // Datentyp: Ganzzahl
      primaryKey: true,         // Setzt das Feld als Primärschlüssel
      autoIncrement: true,      // Automatische Inkrementierung der ID-Werte
    },
    // Name der Kategorie (einzigartig und darf nicht null sein)
    name: {
      type: DataTypes.STRING,   // Datentyp: Zeichenkette
      allowNull: false,         // Erfordert einen Wert (darf nicht leer sein)
      unique: true,             // Name muss einzigartig sein
    },
  });

  // Definiert die Beziehungen (Assoziationen) zu anderen Modellen
  Category.associate = (models) => {
    // Eine Kategorie kann viele Marken (Mark) haben
    // Verknüpft mit 'Mark' über 'categoryId' als Fremdschlüssel
    Category.hasMany(models.Mark, { foreignKey: 'categoryId', as: 'categoryMarks' });

    // Eine Kategorie kann viele Typen (Type) haben
    Category.hasMany(models.Type, { foreignKey: 'categoryId', as: 'categoryTypes' });

    // Eine Kategorie kann viele Fahrzeuge (Vehicle) haben
    Category.hasMany(models.Vehicle, { foreignKey: 'categoryId', as: 'vehicles' });
  };

  // Gibt das definierte Modell zurück
  return Category;
};
