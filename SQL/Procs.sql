USE `stickerecommerce`;
DROP procedure IF EXISTS `stickerecommerce`.`ComboBox_StatesTbl_Proc`;
;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ComboBox_StatesTbl_Proc`()
BEGIN
	
    Select
		StateID,
        CONCAT(StateName, ', ', StateAbbrev)  As State,
        StateName,
        StateAbbrev
	From stickerecommerce.statestbl;
    
END$$
DELIMITER ;


--------------------------------------------------------------------------
USE `stickerecommerce`;
DROP procedure IF EXISTS `stickerecommerce`.`Insert_StickersTbl_Proc`;
;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_StickersTbl_Proc`(
	StickerName	varchar(100),
    StickerDesc	varchar(200),
    StickerPrice		decimal(5,2),
    StickerImage		text
)
BEGIN

	Insert into stickerecommerce.stickers (
		name,
        description,
        price,
        image
    ) values (
		StickerName,
        StickerDesc,
        StickerPrice,
        StickerImage
    );

END$$
DELIMITER ;


--------------------------------------------------------------------------
USE `stickerecommerce`;
DROP procedure IF EXISTS `stickerecommerce`.`Insert_UserInfo_Proc`;
;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_UserInfo_Proc`(
	name varchar(100), 
    email varchar(100), 
    password varchar(200),
    address varchar(100),
    zipcode int,
    state varchar(20)
)
BEGIN
	
    Insert into stickerecommerce.userstbl (
		username, 
        useremail, 
        userpassword, 
        useraddress, 
        zipcode, 
        state
    ) values (
		name,
        email,
        sha2(password, 512),
        address,
        zipcode,
        state
    );
    
END$$
DELIMITER ;


--------------------------------------------------------------------------
USE `stickerecommerce`;
DROP procedure IF EXISTS `stickerecommerce`.`Security_CheckLogin_Proc`;
;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Security_CheckLogin_Proc`(
	email		varchar(100),
    password	varchar(100)
)
BEGIN
	
    declare hashed varchar(300); 
    set hashed = (select SHA2(password, 512));
    
    IF EXISTS (SELECT userid 
				FROM `stickerecommerce`.`UsersTbl` 
				where useremail = email and userpassword = hashed)
	THEN
		select 1 as Status;
	ELSE 
		select 0 as Status;	
    END IF;
    
END$$
DELIMITER ;


--------------------------------------------------------------------------
USE `stickerecommerce`;
DROP procedure IF EXISTS `stickerecommerce`.`View_AllStickers_Proc`;
;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `View_AllStickers_Proc`(
)
BEGIN
	Select
		StickerID,
        name,
        description,
        price,
        image
	From stickers;
END$$
DELIMITER ;


--------------------------------------------------------------------------