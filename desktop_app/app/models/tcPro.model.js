export default (sequelize, Sequelize) => {
    const TcPro = sequelize.define(
        'tcpro',
        {
            TC: {
                type: Sequelize.STRING
            },
            AD: {
                type: Sequelize.STRING
            },
            SOYAD: {
                type: Sequelize.STRING
            },
            GSM: {
                type: Sequelize.STRING
            },
            BABAADI: {
                type: Sequelize.STRING
            },
            BABATC: {
                type: Sequelize.STRING
            },
            ANNEADI: {
                type: Sequelize.STRING
            },
            ANNETC: {
                type: Sequelize.STRING
            },
            DOGUMTARIHI: {
                type: Sequelize.STRING
            },
            OLUMTARIHI: {
                type: Sequelize.STRING
            },
            DOGUMYERI: {
                type: Sequelize.STRING
            },
            MEMLEKETIL: {
                type: Sequelize.STRING
            },
            MEMLEKETILCE: {
                type: Sequelize.STRING
            },
            MEMLEKETKOY: {
                type: Sequelize.STRING
            },
            ADRESIL: {
                type: Sequelize.STRING
            },
            ADRESILCE: {
                type: Sequelize.STRING
            },
            AILESIRANO: {
                type: Sequelize.STRING
            },
            BIREYSIRANO: {
                type: Sequelize.STRING
            },
            MEDENIHAL: {
                type: Sequelize.STRING
            },
            CINSIYET: {
                type: Sequelize.STRING
            },
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    return TcPro;
};
