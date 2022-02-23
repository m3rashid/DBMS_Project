-- SIGNIN
-- get user and avatar details
select *
from jmi_connect.user,
      jmi_connect.avatar
where jmi_connect.user.userName = 'getUserName()'
      AND jmi_connect.user.password = 'getUserPassword()';
-- 
-- get all friends of this user
-- 
select *
from jmi_connect.friendship
where `to` = (
            select userID
            from jmi_connect.user
      )
      OR `from` = (
            select userID
            from jmi_connect.user
      );
-- 'from' and 'to' are a reserved keywords in sql that's why backticks are necessary