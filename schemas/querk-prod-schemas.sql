drop database if exists queues_project;
create database queues_project;
use queues_project;


create table app_user (
    app_user_id 	int primary key auto_increment,
    username 		varchar(50) not null unique,
    password_hash 	varchar(2048) not null,
    disabled 		bit not null default(0)
);


create table customers (
customer_id		int primary key auto_increment,
user_id			int null,
`name`			varchar(50) not null,
phone_num		char(10) not null,
email			varchar(80) null,

constraint fk_customers_app_user foreign key (customer_id) references app_user(app_user_id)
);

create table restaurants (
restaurant_id	int primary key auto_increment,
user_id			int null,
`name`			varchar(50) not null,
address			varchar(100) not null,
est				int null,

constraint fk_restaurants_app_user foreign key (restaurant_id) references app_user(app_user_id)
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

create table app_role (
    app_role_id 	int primary key auto_increment,
    `name` 			varchar(50) not null unique
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

insert into app_role (`name`) values
    ('ADMIN'),
    ('OWNER'),
	('CUSTOMER')
;

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, disabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('jane@doe.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);
    
	
insert into app_user_role
    values
    (1, 2),
    (2, 1),
    (3,3);
    
insert into customers (`name`, user_id, phone_num, email) values 
		("roddy", 1, "1231231234", "roddy@gamil.com" ),
        ("kayleen", 2, "9876543210", "kayleen@gmail.com" ),
        ("erwyn", 3, "9173886944", "erwyn@gmail.com");
        
-- select * from app_user au inner join customers c on c.user_id = au.app_user_id;

	insert into restaurants (`name`, user_id, address, est) values
		("Burrito Restaurant", 4, "300 Burrito Lane", "20"),
        ("Ichiran", 5, "132 W 31st St, New York, NY 10001", "60"),
        ("Hyun", 6, "10 E 33rd St, New York, NY 10016", "45");
    
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
        (1, "Super burrito", "entree", 10.68, "Enhanced burrito w/Cheesy-Salsa"),
        (1, "Dessert burrito", "dessert", 10.00, "A burrito but dessert"),
        (2, "Ramen Kae-Dama", "entree", 30.00, "Specialized Ramen Noodle Soup"),
        (2, "Matcha Ice Cream", "dessert", 35.00, "Matcha(Green) IceCream"),
        (3, "Wagyu", "entree", 7.43, "Expensive beef but Hey its good beef"),
        (3, "Taiyaki", "dessert", 7.00, "A fried delicacy with Ice Cream");



