CREATE VIEW `tents_search` AS
SELECT sku, LOWER(CONCAT(brand," ",name," ",JSON_EXTRACT(highlights, '$')," ",JSON_EXTRACT(keywords, '$'))) as searchable_text
FROM products
WHERE active = TRUE;