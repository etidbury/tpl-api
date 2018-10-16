
// For more info on customEntityProps():
// @link https://github.com/etidbury/tpl-api-helpers/blob/master/docs/sequelize.md

const { customEntityProps } = require('tpl-api-helpers/util/sequelize')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define(
        'User',
        customEntityProps({
            username: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal(
                    'CURRENT_TIMESTAMP' 
                    // ' ON UPDATE CURRENT_TIMESTAMP' not supported by SQLite
                )
            }
        }),
        { timestamps: true }
    )

    User.associate = function(models) {

        // models.User.hasMany(models.ArtistPreset, {
        //     // onDelete: 'CASCADE',
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })

    }

    return User
}
