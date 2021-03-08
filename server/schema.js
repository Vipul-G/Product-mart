const connection = require('./index')

const table_queries = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id int PRIMARY KEY AUTO_INCREMENT,
      hash_password varchar(100) NOT NULL,
      name varchar(20) NOT NULL,
      contact varchar(10) NOT NULL UNIQUE,
      email varchar(20) NOT NULL UNIQUE,
      address varchar(30) NOT NULL,
      role enum('customer', 'admin') default 'admin'
    )
  `,
  products: `
    CREATE TABLE IF NOT EXISTS products (
      id int PRIMARY KEY AUTO_INCREMENT,
      name varchar(20) NOT NULL,
      image_path varchar(100),
      price int NOT NULL,
      available BOOLEAN DEFAULT 1,
      description varchar(1000)
    )
  `,
  cart: `
  CREATE TABLE IF NOT EXISTS CART (
    user_id int,
      product_id int,
      quantity int not null,
      primary key (user_id, product_id),
      foreign key (user_id) references users (id) ON DELETE CASCADE ON UPDATE CASCADE,
      foreign key (product_id) references products (id) ON DELETE CASCADE ON UPDATE CASCADE
  );
  `,
  payments: `
    CREATE TABLE IF NOT EXISTS PAYMENTS (
        id int primary key auto_increment,
        user_id int not null,
        amount int not null,
        payment_mode varchar(10) not null,
        payment_status boolean not null,
        foreign key (user_id) references users (id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `,
  orders: `
  CREATE TABLE IF NOT EXISTS orders (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int not null,
    payment_id int not null,
    order_time DATETIME DEFAULT NOW(),
    estimate_delivery DATETIME,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES payments (id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `,

  // many-to-many
  orders_products : `
    CREATE TABLE IF NOT EXISTS orders_products (
      order_id int,
      product_id int,
      quantity int DEFAULT 1,
      primary key (order_id, product_id),
      foreign key (order_id) references orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
      foreign key (product_id) references products (id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `,
  dropProcedure: 'DROP PROCEDURE IF EXISTS placeOrder;',

  // placeOrderProcedure: `
  // create procedure placeOrder(IN userId int, IN amount int, IN paymentMode varchar(10), IN paymentStatus boolean, IN productId int, IN quantity int)
  // BEGIN
  //   DECLARE paymentId, orderId int;
  //     DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  //      BEGIN
  //          rollback;
  //          SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
  //       END;
  //   set autocommit=0;
  //   INSERT INTO payments(user_id, amount, payment_mode, payment_status) VALUE(userId, amount, paymentMode, paymentStatus);
  //     SELECT MAX(id) INTO paymentId FROM payments WHERE user_id=userId;
  //     INSERT INTO orders(user_id, payment_id, order_time) VALUE(userId, paymentId, NOW());
  //     SELECT id INTO orderId FROM orders WHERE user_id=userId AND payment_id=paymentId;
  //     INSERT INTO orders_products(order_id, product_id, quantity) VALUE(orderId, productId, quantity);
  //     set autocommit=1;
  //     commit;
  // END
  // `

}

Object.values(table_queries).forEach(async (query) => {
  try {
    await connection.query(query)
  } catch (err) {
    console.log('Error while performing the schema query')
    console.log(`Error code: ${err.code}`)
    console.log(`Error message: ${err.message}`)
  }
})


