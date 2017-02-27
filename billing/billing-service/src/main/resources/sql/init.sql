DROP TABLE IF EXISTS CD_CLIENT;

/*==============================================================*/
/* Table: CD_CLIENT                                             */
/*==============================================================*/
CREATE TABLE CD_CLIENT
(
  ID             VARCHAR(40) NOT NULL
  COMMENT '客户唯一标识 ',
  CLIENT_NAME    VARCHAR(64) NOT NULL
  COMMENT '客户名称',
  BALANCE        FLOAT COMMENT '用户充值单位元 精确到分',
  DES            VARCHAR(128) COMMENT '描述信息',
  GAP_ID         VARCHAR(40) NOT NULL
  COMMENT 'GAP 系统ID',
  GAP_NAME       VARCHAR(50),
  STATE          SMALLINT    NOT NULL DEFAULT 2
  COMMENT '客户状态：1启用2禁用3未知',
  VERSION_NUM    INT,
  IS_DEL         TINYINT COMMENT '0未删除1删除',
  CREATE_TIME    DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID VARCHAR(40),
  UPDATE_TIME    TIMESTAMP   NOT NULL,
  UPDATE_USER_ID VARCHAR(40),
  TIMESTAMP      TIMESTAMP,
  PRIMARY KEY (ID),
  KEY GAP_ID (GAP_ID)
)
  ENGINE = INNODB;


DROP TABLE IF EXISTS CD_CLIENT_CHILD;

/*==============================================================*/
/* Table: CD_CLIENT_CHILD                                       */
/*==============================================================*/
CREATE TABLE CD_CLIENT_CHILD
(
  ID             VARCHAR(40) NOT NULL,
  CLIENT_ID      VARCHAR(40) NOT NULL,
  CLIENT_NAME    VARCHAR(64) NOT NULL
  COMMENT '客户名称',
  PRODUCT_ID     VARCHAR(40) NOT NULL,
  NAME           VARCHAR(64),
  BALANCE        FLOAT COMMENT '用户充值单位元 精确到分',
  VERSION_NUM    INT,
  IS_DEL         TINYINT COMMENT '0未删除1删除',
  CREATE_TIME    DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID VARCHAR(40),
  UPDATE_TIME    TIMESTAMP   NOT NULL,
  UPDATE_USER_ID VARCHAR(40),
  TIMESTAMP      TIMESTAMP,
  PRIMARY KEY (ID)
)
  ENGINE = INNODB
  COMMENT = '客户针对每一个产品创建一个子账号';

ALTER TABLE CD_CLIENT_CHILD
  ADD CONSTRAINT CD_CLIENT FOREIGN KEY (CLIENT_ID)
REFERENCES CD_CLIENT (ID);


DROP TABLE IF EXISTS CD_CLIENT_REF;

/*==============================================================*/
/* Table: CD_CLIENT_REF                                         */
/*==============================================================*/
CREATE TABLE CD_CLIENT_REF
(
  ID             VARCHAR(40) NOT NULL,
  CLIENT_ID      VARCHAR(40) NOT NULL,
  CLIENT_NAME    VARCHAR(64) NOT NULL
  COMMENT '客户名称',
  ROLE           VARCHAR(32) COMMENT '角色',
  NAME           VARCHAR(64),
  PHONE          VARCHAR(32),
  STATE          TINYINT COMMENT '1内部0外部',
  VERSION_NUM    INT,
  IS_DEL         TINYINT COMMENT '0未删除1删除',
  CREATE_TIME    DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID VARCHAR(40),
  UPDATE_TIME    TIMESTAMP   NOT NULL,
  UPDATE_USER_ID VARCHAR(40),
  TIMESTAMP      TIMESTAMP,
  PRIMARY KEY (ID)
)
  ENGINE = INNODB;

ALTER TABLE CD_CLIENT_REF
  ADD CONSTRAINT CD_CLIENT_ID FOREIGN KEY (CLIENT_ID)
REFERENCES CD_CLIENT (ID);

DROP TABLE IF EXISTS CD_PRODUCT_INSTANCE;

/*==============================================================*/
/* Table: CD_PRODUCT_INSTANCE                                   */
/*==============================================================*/
CREATE TABLE CD_PRODUCT_INSTANCE
(
  ID                VARCHAR(40) NOT NULL
  COMMENT '商品实例ID',
  PRODUCT_ID        VARCHAR(40) NOT NULL,
  PRODUCT_NAME      VARCHAR(64) NOT NULL,
  TYPE              INT COMMENT '价格计划类型：1固定总价 2按面积 3按户数',
  UNIT_PRICE        FLOAT COMMENT '如果TYPE是1（按总价）UNIT_PRICE是总价 是2（按面积）UNIT_PRICE是单位面积价格 是3（按户数）UNIT_PRICE是每户价格',
  TOTAL             FLOAT COMMENT '总价（这个字段暂时保留）',
  COUNT             INT COMMENT 'TYPE是1 数量默认1 TYPE是2 面积数 TYPE是3户数',
  STATE             TINYINT     NOT NULL DEFAULT 0
  COMMENT '0未激活 1激活',
  CLIENT_CHILD_ID   VARCHAR(40) NOT NULL,
  CLIENT_CHILD_NAME VARCHAR(64) COMMENT '冗余字段 方便查询',
  CLIENT_ID         VARCHAR(40) NOT NULL,
  CLIENT_NAME       VARCHAR(64) COMMENT '冗余字段 方便查询',
  VERSION_NUM       INT,
  IS_DEL            TINYINT COMMENT '0未删除1删除',
  CREATE_TIME       DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID    VARCHAR(40),
  UPDATE_TIME       TIMESTAMP   NOT NULL,
  UPDATE_USER_ID    VARCHAR(40),
  TIMESTAMP         TIMESTAMP,
  PRIMARY KEY (ID),
  KEY CLIENT_CHILD_ID (CLIENT_CHILD_ID)
)
  ENGINE = INNODB
  COMMENT = '商品实例（用户可以购买的商品）';

ALTER TABLE CD_PRODUCT_INSTANCE
  ADD CONSTRAINT CD_CLIENT_CHILD_ID FOREIGN KEY (CLIENT_CHILD_ID)
REFERENCES CD_CLIENT_CHILD (ID);


DROP TABLE IF EXISTS CD_PRODUCT;

/*==============================================================*/
/* Table: CD_PRODUCT                                            */
/*==============================================================*/
CREATE TABLE CD_PRODUCT
(
  ID             VARCHAR(40) NOT NULL,
  NAME           VARCHAR(64) NOT NULL,
  DESCRIPTION    VARCHAR(128),
  VERSION_NUM    INT,
  IS_DEL         TINYINT COMMENT '0未删除1删除',
  CREATE_TIME    DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID VARCHAR(40),
  UPDATE_TIME    TIMESTAMP   NOT NULL,
  UPDATE_USER_ID VARCHAR(40),
  TIMESTAMP      TIMESTAMP,
  PRIMARY KEY (ID)
)
  ENGINE = INNODB;


DROP TABLE IF EXISTS CD_ORDER;

/*==============================================================*/
/* Table: CD_ORDER                                              */
/*==============================================================*/
CREATE TABLE CD_ORDER
(
  ID                  VARCHAR(40) NOT NULL,
  PRODUCT_INSTANCE_ID VARCHAR(40) NOT NULL,
  CLIENT_CHILD_ID     VARCHAR(40) NOT NULL,
  CLIENT_CHILD_NAME   VARCHAR(64) COMMENT '冗余字段 方便查询',
  CLIENT_ID           VARCHAR(40) NOT NULL,
  CLIENT_NAME         VARCHAR(64) COMMENT '冗余字段 方便查询',
  PAY_COUNT           FLOAT COMMENT '充值金额',
  START_TIME          DATETIME COMMENT '计费开始时间',
  END_TIME            DATETIME COMMENT '计费结束时间',
  STATE               TINYINT COMMENT '0未激活1激活',
  VERSION_NUM         INT,
  IS_DEL              TINYINT COMMENT '0未删除1删除',
  CREATE_TIME         DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID      VARCHAR(40),
  UPDATE_TIME         TIMESTAMP   NOT NULL,
  UPDATE_USER_ID      VARCHAR(40),
  TIMESTAMP           TIMESTAMP,
  PRIMARY KEY (ID),
  KEY CD_CLIENT_CHILD_ID (CLIENT_CHILD_ID),
  KEY CD_PRODUCT_INSTANCE_ID (PRODUCT_INSTANCE_ID)
)
  ENGINE = INNODB;

ALTER TABLE CD_ORDER
  ADD CONSTRAINT CD_CLIENT_CHILD FOREIGN KEY (CLIENT_CHILD_ID)
REFERENCES CD_CLIENT_CHILD (ID);


DROP TABLE IF EXISTS CD_BILL_DETAIL;

/*==============================================================*/
/* Table: CD_BILL_DETAIL                                        */
/*==============================================================*/
CREATE TABLE CD_BILL_DETAIL
(
  ID                    VARCHAR(40) NOT NULL,
  ORDER_ID              VARCHAR(40) NOT NULL,
  PRODUCT_INSTANCE_ID   VARCHAR(40) NOT NULL,
  PRODUCT_INSTANCE_NAME VARCHAR(64)          DEFAULT NULL,
  CLIENT_CHILD_ID       VARCHAR(40) NOT NULL,
  CLIENT_CHILD_NAME     VARCHAR(64) COMMENT '冗余字段 方便查询',
  CLIENT_ID             VARCHAR(40) NOT NULL,
  CLIENT_NAME           VARCHAR(64) COMMENT '冗余字段 方便查询',
  PRODUCT_ID            VARCHAR(40) NOT NULL,
  PRODUCT_NAME          VARCHAR(64)          DEFAULT NULL,
  PAY                   FLOAT                DEFAULT NULL
  COMMENT '当月费用',
  PAY_STATE             INT(11)              DEFAULT NULL
  COMMENT '支付状态 1未欠费2欠费',
  START_TIME            TIMESTAMP   NOT NULL,
  END_TIME              TIMESTAMP   NOT NULL,
  VERSION_NUM           INT,
  IS_DEL                TINYINT COMMENT '0未删除1删除',
  CREATE_TIME           DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID        VARCHAR(40),
  UPDATE_TIME           TIMESTAMP   NOT NULL,
  UPDATE_USER_ID        VARCHAR(40),
  TIMESTAMP             TIMESTAMP,
  PRIMARY KEY (ID)
)
  ENGINE = INNODB
  COMMENT = '出账明细';


DROP TABLE IF EXISTS CD_LOGINFO;

/*==============================================================*/
/* Table: CD_LOGINFO                                            */
/*==============================================================*/
CREATE TABLE CD_LOGINFO
(
  ID                  VARCHAR(40) NOT NULL,
  ACTION              VARCHAR(32) COMMENT '动作说明：1、充值',
  PAYMENT             FLOAT COMMENT '充值金额',
  CLIENT_CHILD_ID     VARCHAR(40),
  PRODUCT_INSTANCE_ID VARCHAR(40),
  STATE               INT COMMENT '动作状态：1完成2失败',
  ORDER_ID            VARCHAR(40),
  VERSION_NUM         INT,
  IS_DEL              TINYINT COMMENT '0未删除1删除',
  CREATE_TIME         DATETIME    NOT NULL DEFAULT NOW(),
  CREATE_USER_ID      VARCHAR(40),
  UPDATE_TIME         TIMESTAMP   NOT NULL,
  UPDATE_USER_ID      VARCHAR(40),
  TIMESTAMP           TIMESTAMP,
  PRIMARY KEY (ID)
);