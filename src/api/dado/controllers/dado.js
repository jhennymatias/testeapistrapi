'use strict';

/**
 *  dado controller
 */

const {createCoreController} = require('@strapi/strapi').factories;


module.exports = createCoreController('api::dado.dado', ({strapi}) => ({
  async realizar_conta(ctx) {
    const id_user = ctx.state.user.id; //getting the id from the user with the jwt token sent by the request

    const {tempo_de_plantacao,vazao,preparacao_do_solo,gasto_de_agua,regiao,volume,hectares} = ctx.request.body; //getting the body of the request

    var dateTime = new Date(); //getting the current datetime to be used in the query

    //aqui estamos upando o novo dado e associando ele com o usuario que o upou
    const up = await strapi.entityService.create('api::dado.dado', {
      data: {
        data_insercao: dateTime,
        Regiao: regiao,
        Volume: volume,
        user: id_user,
        Hectares: hectares,
        Tempo_de_plantacao: tempo_de_plantacao,
        Vazao: vazao,
        Preparacao_do_solo: preparacao_do_solo,
        Gasto_de_agua: gasto_de_agua
      }
    });

    

    const up_user = await strapi.entityService.update('plugin::users-permissions.user', id_user, {
      data: {
        dados: {
          id : up.id,
        }
      }
    });

    return {status : 'ok'};
  },

  async find_list_dados(ctx) {
    const id_user = ctx.state.user.id; 

    const dados = await strapi.entityService.findMany('api::dado.dado', {
      fields: ['id', 'data_insercao', 'Regiao', 'Volume', 'Hectares', 'Tempo_de_plantacao', 'Vazao', 'Preparacao_do_solo', 'Gasto_de_agua'],
      filters: {user : id_user}
    });

    return dados;
  }

}));
