export default (sequelize, Sequelize) => {
    const AquaGSM = sequelize.define(
        'aquagsm',
        {
            TC: {
                type: Sequelize.STRING
            },
            GSM: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    return AquaGSM;
};
