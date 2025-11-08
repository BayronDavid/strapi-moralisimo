const fs = require('fs');
const { parse } = require('csv-parse/sync');

async function bootstrap() {
  const Strapi = require('@strapi/strapi');
  const app = await Strapi.createStrapi().load();
  await app.start();
  
  const csv = fs.readFileSync('Final_inventario_desde_factura_woocommerce.csv', 'utf-8');
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  for (const record of records) {
    const images = record.images ? record.images.split(',').map(url => url.trim()) : [];
    
    const data = {
      type: record.type,
      name: record.name,
      sku: record.sku,
      regular_price: record.regular_price || null,
      sale_price: record.sale_price || null,
      manage_stock: record.manage_stock === 'yes',
      stock: parseInt(record.stock) || 0,
      backorders: record.backorders,
      stock_status: record.stock_status,
      categories: record.categories,
      tags: record.tags,
      short_description: record.short_description,
      description: record.description,
      images: images,
      attributes_name: record['attributes:name'],
      attributes_value: record['attributes:value(s)'],
      attributes_visible: record['attributes:visible'] === '1',
      attributes_taxonomy: record['attributes:taxonomy'] === '1',
      parent_id: record.parent_id,
      publishedAt: new Date()
    };

    const existing = await strapi.db.query('api::product.product').findOne({ where: { sku: record.sku } });
    
    if (existing) {
      await strapi.db.query('api::product.product').update({ where: { id: existing.id }, data });
      console.log(`Updated: ${record.sku}`);
    } else {
      await strapi.db.query('api::product.product').create({ data });
      console.log(`Created: ${record.sku}`);
    }
  }
  
  console.log(`Done: ${records.length} products`);
  await app.destroy();
  process.exit(0);
}

bootstrap();
