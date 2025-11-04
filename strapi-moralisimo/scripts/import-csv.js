/*
  Script: import-csv.js
  Usage: node ./scripts/import-csv.js <path-to-csv>
  This boots Strapi programmatically and creates entries in the product collection type.
*/

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { createStrapi } = require('@strapi/strapi');

async function main() {
  const csvPath = process.argv[2] || path.join(__dirname, '..', 'Final_inventario_desde_factura_woocommerce.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found:', csvPath);
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  });

  // Boot Strapi
  // Boot Strapi programmatically using createStrapi() factory.
  const strapi = await createStrapi().load();

  console.log(`Loaded Strapi, importing ${records.length} rows...`);

  for (const row of records) {
    try {
      const data = mapRowToProduct(row);
      await strapi.entityService.create('api::product.product', { data });
      console.log('Imported:', data.name || data.sku || '<no name>');
    } catch (err) {
      console.error('Error importing row', row, err);
    }
  }

  console.log('Import finished.');
  // graceful shutdown
  await strapi.destroy();
}

function parseBool(val) {
  if (val === undefined || val === null || val === '') return false;
  const v = String(val).toLowerCase();
  return v === 'yes' || v === 'true' || v === '1';
}

function mapRowToProduct(row) {
  // Map the CSV columns to the content-type fields. Adjust names as needed.
  const images = (row.images || '').split(',').map(s=>s.trim()).filter(Boolean);
  const attributes = {};
  if (row['attributes:name']) {
    attributes[row['attributes:name']] = row['attributes:value(s)'];
  }

  return {
    type: row.type || null,
    name: row.name || null,
    sku: row.sku || null,
    regular_price: row.regular_price ? Number(row.regular_price) : null,
    sale_price: row.sale_price ? Number(row.sale_price) : null,
    manage_stock: parseBool(row.manage_stock),
    stock: row.stock ? parseInt(row.stock, 10) : null,
    backorders: row.backorders || null,
    stock_status: row.stock_status || null,
    categories: row.categories || null,
    tags: row.tags || null,
    short_description: row.short_description || null,
    description: row.description || null,
    images: images.length ? images : null,
    attributes: Object.keys(attributes).length ? attributes : null,
    parent_id: row.parent_id || null
  };
}

main().catch(err=>{
  console.error(err);
  process.exit(1);
});
