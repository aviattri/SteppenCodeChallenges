
SELECT
    c.name,
    COUNT(distinct o.order_id) AS num_orders,
    SUM(od.unit_price*od.quantity) AS total_order_value,
    (SELECT FLOOR(SUM(od.unit_price*od.quantity)/COUNT(distinct o.order_id)) ) AS avg_order_value

FROM orders o, customers c, order_line_items od
WHERE  c.customer_id = o.customer_id and o.order_id = od.order_id
GROUP BY o.customer_id
ORDER BY avg_order_value DESC; 

 