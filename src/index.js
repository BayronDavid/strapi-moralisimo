'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });

    const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
      where: {
        action: { $in: ['api::product.product.find', 'api::product.product.findOne'] },
        role: publicRole.id
      }
    });

    if (permissions.length === 0) {
      await strapi.query('plugin::users-permissions.permission').createMany({
        data: [
          { action: 'api::product.product.find', role: publicRole.id },
          { action: 'api::product.product.findOne', role: publicRole.id }
        ]
      });
      console.log('✅ Permisos públicos configurados para productos');
    }
  },
};
