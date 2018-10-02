# lat-cms

### 檔案規劃

```
/lat_cms/
├── docker
│   ├── app
│   └── dbdata
│   └── conf
│       └── nginx
│       └── php 
├── docker-compose.yml
├── conf
│   └── nginx
│   └── php
└── application
    └── common
    └── view
    └── library
    
```

### 初始化

1.  git checkout 到 develop
2.  composer install
3.  docker-compose up --build

### Docker快捷指令

```
//docker環境初始化
init:
	docker-compose up --build

up:
	docker-compose up -d

down:
	docker-compose down

ps:
	docker-compose ps

logs:
	docker-compose logs -f

du:
	docker-compose down && docker-compose up -d

dul:
	docker-compose down && docker-compose up -d && docker-compose logs -f
    
```

###檔案初始路徑

```
/lat_cms/
└── conf
    └── nginx
        └── conf.d
            └── 000_default.conf
            
# Nginx configuration
            
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /project/application/public;
    
```

### 新增／建立资料表

1.  複製一份 project/sql_migration/phinx.yml.sample 在project/sql_migration/的资料夹里，并命名为phinx.yml 且更改裡面的db連線
2.  新增一個migrations ../vendor/bin/phinx create [檔案名稱]
3.  執行migrations ../vendor/bin/phinx migrate 

參考 http://docs.phinx.org/en/latest/index.html

