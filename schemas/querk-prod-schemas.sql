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

constraint fk_customer_app_user foreign key (customer_id) references app_user(app_user_id)
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




insert into restaurants_customers (restaurant_id,customer_id,create_time,ordered_ahead,expired) 
values (1,1,"0001-01-01 00:00:00.0000000", true, false),
(1,1,"0001-01-02 00:00:00.0000000", true, false);

select * from restaurants_customers order by queue_create_time asc;



