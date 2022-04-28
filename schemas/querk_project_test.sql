drop database if exists queues_project_test;
create database queues_project_test;
use queues_project_test;

create table customers (
customer_id		int primary key auto_increment,
user_id			int not null,
`name`			varchar(50) not null,
phone_num		char(10) not null,
email			varchar(80) null
);

create table restaurants (
restaurant_id	int primary key auto_increment,
`name`			varchar(50) not null,
address			varchar(100) not null,
est				time null
);

create table items (
item_id			int primary key auto_increment,
restaurant_id	int not null,
`name`			varchar(50),
category		varchar(50),
price			bigint not null,
`description`	varchar(100) null,

constraint fk_item_list_restaurant foreign key (restaurant_id) references restaurants(restaurant_id)
);

create table restaurants_customers (

entry_id			int primary key auto_increment,
restaurant_id		int not null,
customer_id			int not null,
create_time			datetime not null,
ordered_ahead		boolean not null,
expired				boolean not null,

constraint fk_restaurants_customers foreign key (restaurant_id) references restaurants(restaurant_id),
constraint fk_customers_restaurants foreign key (customer_id) references customers(customer_id)
); 


create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

delimiter //
create procedure set_known_good_state()
begin

	delete from customers;
    alter table customers auto_increment = 1;
    delete from restaurants;
    alter table restaurants auto_increment = 1;
    delete from items;
    alter table items auto_increment = 1;
    
    insert into customers (`name`, phone_num, email) values 
		("roddy", "1231231234", "roddy@gamil.com" ),
        ("kayleen", "9876543210", "kayleen@gmail.com" ),
        ("erwyn", "9173886944", "erwyn@gmail.com");
        
	insert into restaurants (`name`, address, est) values
		("burrito restaurant", "300 burrito lane", "00:20:00.0000000"),
        ("Ichiran", "132 W 31st St, New York, NY 10001", "01:00:00.0000000"),
        ("Hyun", "10 E 33rd St, New York, NY 10016", "00:45:15.0000000");
    
    insert into restaurants_customers (customer_id, restaurant_id, create_time, ordered_ahead, expired) values
		(1, 1, "2011-01-01 01:11:00.0000000", true, false),
        (1, 2, "2012-02-02 02:12:00.0000000", false, true),
        (1, 3, "2013-03-03 03:13:00.0000000", false, true),
        (2, 1, "2014-04-04 04:14:00.0000000", true, false),
        (2, 2, "2015-05-05 05:15:00.0000000", false, true),
        (2, 3, "2016-06-06 06:16:00.0000000", false, true),
        (3, 1, "2017-07-07 07:17:00.0000000", false, true),
        (3, 2, "2018-08-08 08:18:00.0000000", false, true),
        (3, 3, "2019-09-09 09:19:00.0000000", false, true);
        
	insert into items ( restaurant_id, `name`, category, price, `description`) values
		(1, "Small burrito", "entree", 7.43, "Burrito"),
        (1, "Super burrito", "entree", 10.68, "enhanced burrito w/Cheesy-Salsa"),
        (1, "dessert burrito", "dessert", 10.00, "a burrito but dessert"),
        (2, "Ramen Kae-Dama", "entree", 30.00, "Specialized Ramen Noodle Soup"),
        (2, "Matcha Ice Cream", "dessert", 35.00, "Matcha(Green) IceCream"),
        (3, "Wagyu", "entree", 7.43, "Expensive beef but Hey its good beef"),
        (3, "Taiyaki", "dessert", 7.00, "A fried delicacy with Ice Cream");
        
end //
-- 4. Change the statement terminator back to the original.
delimiter ;
    
        
    -- How do we test the queues table?
   --  
--     insert into restaurants_customers 
-- 		(customer_id, restaurant_id , create_time, ordered_ahead, expired)
--     select
--         customers.customer_id,                       
--         restaurants.restaurant_id
--     from customers
--     inner join restaurants;
--     
    

    
    
    
    
