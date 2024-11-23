export default (sequelize, Sequelize) => {
    const AquaGSM = sequelize.define('aquagsm', {
        TC: {
            type: Sequelize.STRING
        },
        GSM: {
            type: Sequelize.STRING
        },
    });

    return AquaGSM;
};
