import http from 'http';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/products' && req.method === 'GET') {
    try {
      const sqlQuery = `
        SELECT 
          p.id,
          p.name,
          p.image_url AS image,
          p.price_cents AS priceCents,
          p.rating_stars AS ratingStars,
          p.rating_count AS ratingCount,
          GROUP_CONCAT(c.slug) AS keywords
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        LEFT JOIN categories c ON pc.category_id = c.id
        GROUP BY p.id;
      `;

      const [rows] = await pool.query(sqlQuery);

      const formattedProducts = rows.map((product) => ({
        id: product.id,
        image: product.image,
        name: product.name,
        rating: {
          stars: Number(product.ratingStars),
          count: product.ratingCount
        },
        priceCents: product.priceCents,
        keywords: product.keywords ? product.keywords.split(',') : []
      }));

      res.writeHead(200, {
        ...corsHeaders,
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(formattedProducts));
      return;
    } catch (error) {
      console.error('Database query error:', error.message);
      res.writeHead(500, {
        ...corsHeaders,
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
      return;
    }
  }

  res.writeHead(404, {
    ...corsHeaders,
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});